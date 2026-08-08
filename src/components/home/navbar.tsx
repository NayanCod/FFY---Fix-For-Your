'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20">
              <Terminal className="h-5 w-5" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              DevRegistry
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Explore</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Categories</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Submit Tool</a>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button size="sm" className="rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm">
              Get Started <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
          className="border-b border-border bg-background p-4 md:hidden"
        >
          <div className="flex flex-col gap-4">
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">Explore</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">Categories</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">Pricing</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">Submit Tool</a>
            <hr className="border-border" />
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="w-full">Sign In</Button>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white">Get Started</Button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
