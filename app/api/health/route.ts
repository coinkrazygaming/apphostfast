import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    services: {
      api: 'up',
      database: 'up', // In production, check actual DB connection
      cache: 'up', // Check Redis
      docker: 'up', // Check Docker daemon
    },
  });
}
