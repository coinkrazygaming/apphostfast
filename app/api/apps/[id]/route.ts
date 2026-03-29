import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// GET /api/apps/[id] - Get a specific app
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const app = await prisma.app.findUnique({
      where: { id: params.id },
      include: {
        deployments: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        logs: {
          orderBy: { createdAt: 'desc' },
          take: 100,
        },
      },
    });

    if (!app) {
      return NextResponse.json(
        { error: 'App not found' },
        { status: 404 }
      );
    }

    // Verify ownership
    if (app.userId !== session.userId) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    return NextResponse.json(app);
  } catch (error) {
    console.error('Error fetching app:', error);
    return NextResponse.json(
      { error: 'Failed to fetch app' },
      { status: 500 }
    );
  }
}

// PATCH /api/apps/[id] - Update an app
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check ownership
    const app = await prisma.app.findUnique({
      where: { id: params.id },
    });

    if (!app) {
      return NextResponse.json(
        { error: 'App not found' },
        { status: 404 }
      );
    }

    if (app.userId !== session.userId) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, buildCommand, startCommand, envVars, customDomain } = body;

    // Update app
    const updated = await prisma.app.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(buildCommand !== undefined && { buildCommand }),
        ...(startCommand !== undefined && { startCommand }),
        ...(envVars && { envVars: JSON.stringify(envVars) }),
        ...(customDomain !== undefined && { customDomain }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating app:', error);
    return NextResponse.json(
      { error: 'Failed to update app' },
      { status: 500 }
    );
  }
}

// DELETE /api/apps/[id] - Delete an app
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check ownership
    const app = await prisma.app.findUnique({
      where: { id: params.id },
    });

    if (!app) {
      return NextResponse.json(
        { error: 'App not found' },
        { status: 404 }
      );
    }

    if (app.userId !== session.userId) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Delete app
    await prisma.app.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting app:', error);
    return NextResponse.json(
      { error: 'Failed to delete app' },
      { status: 500 }
    );
  }
}
