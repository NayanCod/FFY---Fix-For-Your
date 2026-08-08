'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="border-border/40 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Wordmark */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-heading from-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-lg font-bold tracking-tight">
              FixForYou <span className="text-xs font-semibold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full ml-1">FFY</span>
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden items-center gap-6 md:flex">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Tools
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Submit Tool
            </a>
          </div>

          {/* Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="border-border bg-background border-b p-4 md:hidden"
        >
          <div className="flex flex-col gap-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm font-medium"
            >
              Tools
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm font-medium"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm font-medium"
            >
              Submit Tool
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
