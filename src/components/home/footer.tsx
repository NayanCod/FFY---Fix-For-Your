'use client';

import React from 'react';
import { Terminal, GitFork, Globe, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20">
                <Terminal className="h-4.5 w-4.5" />
              </div>
              <span className="font-heading text-base font-bold tracking-tight">DevRegistry</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Discover and compare the best developer utilities, libraries, and frameworks. Built by developers, for developers.
            </p>
          </div>

          {/* Directory Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Browse</h4>
            <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Popular Tools</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Latest Submissions</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Tool Categories</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Editor&apos;s Choice</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Resources</h4>
            <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Submit a Tool</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Stay Updated</h4>
            <p className="text-xs text-muted-foreground">Get a weekly digest of the best new developer tools.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="h-9 w-full rounded-lg border border-border bg-background px-3 text-xs outline-none focus:border-indigo-500"
              />
              <button className="h-9 rounded-lg bg-foreground px-4 text-xs font-semibold text-background hover:bg-foreground/90 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} DevRegistry. Made with</span>
            <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
            <span>worldwide.</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground transition-colors"><GitFork className="h-4 w-4" /></a>
            <a href="#" className="hover:text-foreground transition-colors"><Globe className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
