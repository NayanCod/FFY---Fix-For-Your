'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Users, Activity, HardDrive, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const statsData = [
  {
    title: 'Total Active Users',
    value: '12,482',
    change: '+12.3%',
    positive: true,
    icon: Users,
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Deployments (24h)',
    value: '1,208',
    change: '+28.4%',
    positive: true,
    icon: CheckCircle2,
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-500',
  },
  {
    title: 'Storage Used',
    value: '84.2 TB',
    change: '-2.1%',
    positive: false,
    icon: HardDrive,
    color: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-500',
  },
  {
    title: 'Service Uptime',
    value: '99.98%',
    change: '+0.02%',
    positive: true,
    icon: Activity,
    color: 'from-violet-500/20 to-purple-500/20',
    iconColor: 'text-violet-500',
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 100 } },
};

export function Stats() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {statsData.map((stat, idx) => {
        const Icon = stat.icon;

        return (
          <motion.div key={idx} variants={cardVariants}>
            <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-md transition-all duration-300 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {stat.title}
                  </span>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr ${stat.color} shadow-inner`}>
                    <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                  </div>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-2xl font-bold tracking-tight">{stat.value}</span>
                  <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${stat.positive ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stat.positive ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {stat.change}
                  </span>
                </div>

                {/* Subtle bottom line indicator */}
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent" />
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
