import { NextRequest, NextResponse } from 'next/server';

// GET /api/apps - List all apps for authenticated user
export async function GET(request: NextRequest) {
  try {
    // In production, verify authentication and fetch from database
    const apps = [
      {
        id: 1,
        name: 'portfolio-v2',
        framework: 'Next.js',
        status: 'active',
        url: 'portfolio-v2.apphostfast.dev',
        domain: 'myportfolio.com',
        lastDeploy: '2 minutes ago',
      },
      {
        id: 2,
        name: 'api-server',
        framework: 'Express.js',
        status: 'active',
        url: 'api-server.apphostfast.dev',
        domain: null,
        lastDeploy: '1 hour ago',
      },
    ];

    return NextResponse.json(apps);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch apps' },
      { status: 500 }
    );
  }
}

// POST /api/apps - Create a new app
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, framework, repository, envVars } = body;

    // Validation
    if (!name || !framework) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In production:
    // 1. Verify authentication
    // 2. Check user's plan limits
    // 3. Create database entry
    // 4. Start Docker container build
    // 5. Setup webhooks if GitHub connected
    // 6. Configure SSL certificate

    const newApp = {
      id: Math.floor(Math.random() * 1000),
      name,
      framework,
      status: 'deploying',
      url: `${name}.apphostfast.dev`,
      domain: null,
      lastDeploy: 'just now',
    };

    return NextResponse.json(newApp, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create app' },
      { status: 500 }
    );
  }
}
