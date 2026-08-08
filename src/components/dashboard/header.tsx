'use client';

import React from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Bell, GitFork, Menu, Search, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
      {/* Search / Left Side */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative hidden max-w-xs md:block">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Quick search (Ctrl + K)"
            className="h-9 w-64 rounded-full border border-border bg-muted/50 pl-10 pr-4 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-indigo-500 focus:bg-background"
          />
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-3">
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-block"
        >
          <Button variant="ghost" size="icon">
            <GitFork className="h-5 w-5" />
          </Button>
        </a>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-indigo-600" />
        </Button>

        <ThemeToggle />

        <div className="h-8 w-px bg-border hidden sm:block" />

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
        >
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
