'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

// Mock chart coordinates (x, y) for an animated SVG path
const linePoints = '10,90 40,75 70,80 100,55 130,60 160,40 190,45 220,20 250,30 280,10';
const fillPoints = '10,90 40,75 70,80 100,55 130,60 160,40 190,45 220,20 250,30 280,10 280,100 10,100';

export function PerformanceChart() {
  return (
    <Card className="col-span-full xl:col-span-8 border-border/50 bg-card/50 backdrop-blur-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">Network Throughput</CardTitle>
          <p className="text-xs text-muted-foreground">Real-time bandwidth visualization (GB/s)</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-500">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Optimal performance</span>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {/* SVG Animated Chart */}
        <div className="relative h-64 w-full">
          <svg
            viewBox="0 0 280 100"
            className="h-full w-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1="20" x2="280" y2="20" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="0" y1="50" x2="280" y2="50" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="0" y1="80" x2="280" y2="80" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />

            {/* Area Fill */}
            <motion.polygon
              points={fillPoints}
              fill="url(#chartGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            {/* Animated Path */}
            <motion.polyline
              fill="none"
              stroke="rgb(99, 102, 241)"
              strokeWidth="2.5"
              points={linePoints}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />

            {/* Dynamic Interactive Dot */}
            <motion.circle
              cx="280"
              cy="10"
              r="4"
              fill="rgb(99, 102, 241)"
              stroke="var(--background)"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{ delay: 1.5, duration: 0.5 }}
            />
          </svg>
        </div>

        {/* Chart Legend / Stats */}
        <div className="mt-6 grid grid-cols-3 border-t border-border pt-4 text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Current Peak</span>
            <p className="mt-1 text-lg font-bold text-indigo-500">2.48 GB/s</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Average Speed</span>
            <p className="mt-1 text-lg font-bold">1.82 GB/s</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Growth Trend</span>
            <p className="mt-1 flex items-center justify-center gap-0.5 text-lg font-bold text-emerald-500">
              +14% <ArrowUpRight className="h-4 w-4" />
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
