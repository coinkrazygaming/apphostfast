import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { cookies } from 'next/headers';

// GET /api/apps - List all apps for authenticated user
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch user's apps from database
    const apps = await prisma.app.findMany({
      where: {
        userId: session.userId,
      },
      include: {
        deployments: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    // Format response
    const formattedApps = apps.map((app) => ({
      id: app.id,
      name: app.name,
      framework: app.framework,
      status: app.status,
      subdomain: app.subdomain,
      customDomain: app.customDomain,
      lastDeploy: app.deployments[0]?.createdAt || null,
      deployCount: app.deployCount,
      createdAt: app.createdAt,
    }));

    return NextResponse.json(formattedApps);
  } catch (error) {
    console.error('Error fetching apps:', error);
    return NextResponse.json(
      { error: 'Failed to fetch apps' },
      { status: 500 }
    );
  }
}

// POST /api/apps - Create a new app
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, framework, repositoryUrl, buildCommand, startCommand, envVars } = body;

    // Validation
    if (!name || !framework) {
      return NextResponse.json(
        { error: 'Name and framework are required' },
        { status: 400 }
      );
    }

    // Check if app name already exists for this user
    const existing = await prisma.app.findUnique({
      where: {
        userId_name: {
          userId: session.userId,
          name,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'App name already exists' },
        { status: 409 }
      );
    }

    // Generate unique subdomain
    const subdomain = `${name}-${Date.now()}`.toLowerCase().replace(/[^a-z0-9-]/g, '');

    // Create app in database
    const app = await prisma.app.create({
      data: {
        name,
        framework,
        userId: session.userId,
        subdomain,
        repositoryUrl: repositoryUrl || null,
        buildCommand: buildCommand || null,
        startCommand: startCommand || null,
        envVars: envVars ? JSON.stringify(envVars) : null,
      },
    });

    return NextResponse.json(
      {
        id: app.id,
        name: app.name,
        framework: app.framework,
        status: app.status,
        subdomain: app.subdomain,
        createdAt: app.createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating app:', error);
    return NextResponse.json(
      { error: 'Failed to create app' },
      { status: 500 }
    );
  }
}
