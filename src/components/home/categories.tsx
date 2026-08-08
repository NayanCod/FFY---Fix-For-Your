'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Database, Eye, Globe, Shield, Terminal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  { name: 'CLI & Shell', icon: Terminal, count: 18, color: 'text-violet-500 bg-violet-500/10' },
  { name: 'AI & ML', icon: Cpu, count: 24, color: 'text-indigo-500 bg-indigo-500/10' },
  { name: 'Databases', icon: Database, count: 12, color: 'text-emerald-500 bg-emerald-500/10' },
  { name: 'Security', icon: Shield, count: 8, color: 'text-rose-500 bg-rose-500/10' },
  { name: 'Monitoring', icon: Eye, count: 15, color: 'text-amber-500 bg-amber-500/10' },
  { name: 'Hosting', icon: Globe, count: 21, color: 'text-blue-500 bg-blue-500/10' },
];

export function Categories() {
  return (
    <section className="py-12 border-y border-border/40 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-8">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Explore Categories</h2>
            <p className="text-xs text-muted-foreground mt-1">Browse developer tools categorized by target capability</p>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;

            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Card className="cursor-pointer border-border/50 bg-card hover:border-indigo-500/30 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${cat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="mt-4 text-sm font-semibold tracking-tight">{cat.name}</span>
                    <span className="text-[10px] text-muted-foreground mt-1">{cat.count} tools</span>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
