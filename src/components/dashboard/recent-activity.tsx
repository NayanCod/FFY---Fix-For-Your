'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch, Globe, Server, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const activities = [
  {
    id: 1,
    title: 'Pipeline build success',
    description: 'aura-dashboard/main #182',
    time: '2 mins ago',
    icon: Server,
    color: 'bg-emerald-500/10 text-emerald-500',
    type: 'success',
  },
  {
    id: 2,
    title: 'Domain verified',
    description: 'console.auracloud.sh',
    time: '24 mins ago',
    icon: Globe,
    color: 'bg-blue-500/10 text-blue-500',
    type: 'info',
  },
  {
    id: 3,
    title: 'PR #42 merged',
    description: 'docs: update deployment guidelines',
    time: '1 hr ago',
    icon: GitBranch,
    color: 'bg-indigo-500/10 text-indigo-500',
    type: 'neutral',
  },
  {
    id: 4,
    title: 'Collaborator added',
    description: 'github/sarah-connor',
    time: '3 hrs ago',
    icon: UserPlus,
    color: 'bg-violet-500/10 text-violet-500',
    type: 'info',
  },
];

// If there is no Badge component, we can define a custom styled div or import it. Let's see if we have Badge or we should write a simple badge style directly.
// Writing a custom inline styled element makes the component self-contained and avoids registry fetch errors.
export function RecentActivity() {
  return (
    <Card className="col-span-full xl:col-span-4 border-border/50 bg-card/50 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-base font-semibold">System Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((act, index) => {
            const Icon = act.icon;

            return (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                key={act.id}
                className="flex items-start justify-between gap-4"
              >
                <div className="flex gap-3">
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${act.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">{act.title}</p>
                    <p className="text-[11px] text-muted-foreground">{act.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-[10px] text-muted-foreground">{act.time}</span>
                  <div className="flex items-center gap-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        act.type === 'success' ? 'bg-emerald-400' : act.type === 'info' ? 'bg-blue-400' : 'bg-gray-400'
                      }`}></span>
                      <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                        act.type === 'success' ? 'bg-emerald-500' : act.type === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                      }`}></span>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
