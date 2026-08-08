'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface RelatedToolItem {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

interface RelatedToolsProps {
  title?: string;
  tools: RelatedToolItem[];
}

export function RelatedTools({ title = 'Other Tools You Might Need', tools }: RelatedToolsProps) {
  return (
    <section className="py-12 border-t border-border/40">
      <div className="mb-10 text-center md:text-left">
        <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Explore more client-side tools designed for your workflow.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, index) => (
          <Link
            key={index}
            href={tool.href}
            className="group flex flex-col justify-between rounded-2xl border border-border/40 bg-card/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/5 hover:-translate-y-0.5"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                {tool.icon}
              </div>
              <h3 className="mt-4 font-semibold text-foreground text-base group-hover:text-indigo-400 transition-colors">
                {tool.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {tool.description}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-indigo-500 dark:text-indigo-400 group-hover:text-indigo-400">
              <span>Open Tool</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
