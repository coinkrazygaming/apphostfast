'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Zap } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGitHubLogin = async () => {
    setLoading(true);
    setError('');
    window.location.href = '/api/auth/github/start';
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Redirect to dashboard
          window.location.href = '/dashboard';
        }
      } else {
        try {
          const data = await response.json();
          setError(data.error || 'Failed to sign in');
        } catch {
          setError('Failed to sign in');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="p-4 sm:p-6">
        <Link href="/" className="flex items-center gap-2 font-black text-xl">
          <Zap className="w-6 h-6 text-primary" />
          <span className="gradient-text">AppHostFast</span>
        </Link>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground mb-8">
              Sign in to your AppHostFast account
            </p>

            {error && (
              <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* GitHub OAuth */}
            <Button
              onClick={handleGitHubLogin}
              disabled={loading}
              className="w-full mb-4 flex items-center justify-center gap-2"
              variant="outline"
            >
              <Github className="w-5 h-5" />
              Login with GitHub
            </Button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-800 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full btn-primary"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            {/* Forgot Password */}
            <div className="text-center mt-4">
              <Link href="#forgot" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Sign Up Link */}
            <p className="text-center mt-6 text-sm">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-primary font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
