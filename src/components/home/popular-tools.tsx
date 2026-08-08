'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const tools = [
  {
    name: 'Image Compressor',
    description: 'Reduce image file size instantly without losing quality. Perfect for email and websites.',
    category: 'Images',
    features: ['Free', 'No Signup'],
    href: '/tools/image-compressor',
  },
  {
    name: 'PDF Merger',
    description: 'Combine multiple PDF documents into a single organized file in seconds.',
    category: 'PDF',
    features: ['Fast', 'Free'],
    href: '#',
  },
  {
    name: 'Background Remover',
    description: 'Automatically erase image backgrounds using high-accuracy AI in one click.',
    category: 'AI / Images',
    features: ['Unlimited', 'Free'],
    href: '#',
  },
  {
    name: 'QR Code Generator',
    description: 'Create customized QR codes for URLs, WiFi networks, text, or contact cards.',
    category: 'Productivity',
    features: ['Free', 'No Limits'],
    href: '#',
  },
  {
    name: 'Image Converter',
    description: 'Convert images to PNG, JPG, WebP, or SVG format quickly and securely.',
    category: 'Images / Files',
    features: ['Fast', 'Free'],
    href: '#',
  },
  {
    name: 'Word Counter',
    description: 'Count characters, words, sentences, and paragraphs in real-time with readability analytics.',
    category: 'Text',
    features: ['Free', 'No Signup'],
    href: '#',
  },
];

export function PopularTools() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Popular Tools</h2>
            <p className="text-sm text-muted-foreground mt-1.5">Free and simple web utilities for everyday tasks</p>
          </div>
          <Button variant="outline" className="h-9 rounded-full text-xs font-semibold self-start md:self-end">
            View All Tools
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
              <Link href={tool.href} className="block h-full">
                <Card className="group relative overflow-hidden border-border/50 bg-card/40 backdrop-blur-md transition-all duration-300 hover:border-indigo-500/30 hover:shadow-md hover:shadow-indigo-500/5 h-full flex flex-col justify-between cursor-pointer">
                  <CardContent className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider bg-indigo-500/10 px-2 py-0.5 rounded-full">
                          {tool.category}
                        </span>
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
                    <div className="mt-6 flex items-center gap-2 border-t border-border/40 pt-4 text-[10px] font-semibold text-muted-foreground/80">
                      <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500/20" />
                      <span>{tool.features.join('  •  ')}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
