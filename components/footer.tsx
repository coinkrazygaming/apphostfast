'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-black text-lg mb-2">
              <Zap className="w-5 h-5 text-primary" />
              <span>AppHostFast</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Production-ready web app hosting with automatic deployments and managed services.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <nav className="space-y-2 text-sm">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="#security" className="text-muted-foreground hover:text-foreground transition-colors">
                Security
              </Link>
              <Link href="#status" className="text-muted-foreground hover:text-foreground transition-colors">
                Status
              </Link>
            </nav>
          </div>

          {/* Developers */}
          <div>
            <h4 className="font-semibold mb-4">Developers</h4>
            <nav className="space-y-2 text-sm">
              <Link href="#docs" className="text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
              <Link href="#api" className="text-muted-foreground hover:text-foreground transition-colors">
                API Reference
              </Link>
              <Link href="#cli" className="text-muted-foreground hover:text-foreground transition-colors">
                CLI Tool
              </Link>
              <Link href="#github" className="text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <nav className="space-y-2 text-sm">
              <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="#blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="#privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} AppHostFast. All rights reserved. Open source and community-driven.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#twitter" className="hover:text-foreground transition-colors">
              Twitter
            </Link>
            <Link href="#github" className="hover:text-foreground transition-colors">
              GitHub
            </Link>
            <Link href="#discord" className="hover:text-foreground transition-colors">
              Discord
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
