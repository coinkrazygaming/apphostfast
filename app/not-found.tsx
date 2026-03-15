'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Code2 } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="text-center max-w-md">
        <Code2 className="w-20 h-20 text-primary mx-auto mb-6 opacity-50" />
        <h1 className="text-6xl font-black gradient-text mb-4">404</h1>
        <p className="text-2xl font-bold mb-2">Page Not Found</p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link href="/">
          <Button className="btn-primary gap-2">
            <Home className="w-5 h-5" />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
