'use client';

import React from 'react';
import { Sparkles, GitFork, Globe, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-border/40 bg-muted/30 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <span className="font-heading text-base font-bold tracking-tight">
                FixForYou
              </span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Simple tools that fix everyday digital problems. Free, fast, and secure utilities for students, creators, freelancers, and small businesses.
            </p>
          </div>

          {/* Directory Links */}
          <div>
            <h4 className="text-foreground text-xs font-bold tracking-wider uppercase">
              Browse
            </h4>
            <ul className="text-muted-foreground mt-4 space-y-2 text-xs">
              <li>
                <a href="#" className="transition-colors hover:text-indigo-500">
                  Popular Tools
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-indigo-500">
                  New Additions
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-indigo-500">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-indigo-500">
                  Editor&apos;s Picks
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-foreground text-xs font-bold tracking-wider uppercase">
              Support & Info
            </h4>
            <ul className="text-muted-foreground mt-4 space-y-2 text-xs">
              <li>
                <a href="#" className="transition-colors hover:text-indigo-500">
                  Submit a Tool
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-indigo-500">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-indigo-500">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-indigo-500">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h4 className="text-foreground text-xs font-bold tracking-wider uppercase">
              Stay Updated
            </h4>
            <p className="text-muted-foreground text-xs">
              Get updates about new tools and helpful guides.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="border-border bg-background h-9 w-full rounded-lg border px-3 text-xs outline-none focus:border-indigo-500"
              />
              <button className="bg-foreground text-background hover:bg-foreground/90 h-9 rounded-lg px-4 text-xs font-semibold transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-border/40 text-muted-foreground mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs sm:flex-row">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} FixForYou (FFY). Made with</span>
            <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
            <span>worldwide.</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground transition-colors">
              <GitFork className="h-4 w-4" />
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              <Globe className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
