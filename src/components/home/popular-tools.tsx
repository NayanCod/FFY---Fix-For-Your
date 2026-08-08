'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tools = [
  {
    name: 'Neon DB',
    description: 'Serverless Postgres database built for developers with instant branching and scaling.',
    category: 'Databases',
    stars: '18.4k',
    rating: '4.9',
  },
  {
    name: 'Resend',
    description: 'Modern email API service for developers. Send transactional emails beautifully.',
    category: 'APIs & Mailing',
    stars: '9.2k',
    rating: '4.8',
  },
  {
    name: 'Turborepo',
    description: 'High-performance build system for JavaScript and TypeScript monorepos.',
    category: 'DevOps & Build',
    stars: '24.1k',
    rating: '4.9',
  },
  {
    name: 'Axiom',
    description: 'Serverless log management and analytics. Query gigabytes of logs in milliseconds.',
    category: 'Monitoring',
    stars: '5.8k',
    rating: '4.7',
  },
  {
    name: 'Hono',
    description: 'Small, simple, and ultrafast web framework for Cloudflare Workers, Deno, and Node.js.',
    category: 'Frameworks',
    stars: '16.5k',
    rating: '4.9',
  },
  {
    name: 'Trigger.dev',
    description: 'Open source background jobs framework. Build cron, queues, and workflows easily.',
    category: 'CLI & Background',
    stars: '7.3k',
    rating: '4.6',
  },
];

export function PopularTools() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Popular Developer Tools</h2>
            <p className="text-sm text-muted-foreground mt-1.5">Top rated developer resources voted by the community</p>
          </div>
          <Button variant="outline" className="h-9 rounded-full text-xs font-semibold self-start md:self-end">
            View All Featured Tools
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
            >
              <Card className="group relative overflow-hidden border-border/50 bg-card/40 backdrop-blur-md transition-all duration-300 hover:border-indigo-500/30 hover:shadow-md hover:shadow-indigo-500/5 h-full flex flex-col justify-between">
                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider bg-indigo-500/10 px-2 py-0.5 rounded-full">
                        {tool.category}
                      </span>
                      <button className="text-muted-foreground hover:text-rose-500 transition-colors">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Title */}
                    <h3 className="mt-4 text-lg font-bold tracking-tight flex items-center gap-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {tool.name}
                      <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </h3>

                    {/* Description */}
                    <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  {/* Metadata Footer */}
                  <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-foreground">{tool.rating}</span>
                      <span>rating</span>
                    </div>
                    <div>
                      <span className="font-bold text-foreground">{tool.stars}</span> stars
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
