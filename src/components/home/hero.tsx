'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';

export function Hero() {
  const examples = [
    "Compress an image",
    "Merge PDFs",
    "Remove a background",
    "Convert a file"
  ];

  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute top-20 left-1/4 h-[300px] w-[300px] rounded-full bg-violet-500/5 blur-3xl" />

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400"
        >
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span>⚡ Quick digital fixes</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-6 font-heading text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground"
        >
          Whatever you need to fix, <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-cyan-400">
            there&apos;s a tool for it.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto mt-6 max-w-xl text-base md:text-lg text-muted-foreground"
        >
          Free, fast and simple tools for everyday digital problems.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mx-auto mt-10 max-w-xl"
        >
          <div className="relative group">
            <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="What do you need help with?"
              className="h-14 w-full rounded-full border border-border/80 bg-background/50 pl-12 pr-6 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-indigo-500 focus:bg-background focus:ring-2 focus:ring-indigo-500/10 shadow-sm"
            />
          </div>

          {/* Try search tags */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>Try:</span>
            {examples.map((example, i) => (
              <button
                key={i}
                className="cursor-pointer rounded-full border border-border/60 bg-muted/20 px-3 py-1 hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all text-xs"
              >
                {example}...
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
