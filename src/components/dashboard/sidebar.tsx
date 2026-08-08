'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FolderGit2,
  Cpu,
  BarChart3,
  Settings,
  Terminal,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'deployments', label: 'Deployments', icon: Cpu },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-card/30 backdrop-blur-xl lg:block">
      <div className="flex h-full flex-col justify-between p-6">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/20">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <span className="font-heading text-lg font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/75 bg-clip-text">
                Aura Cloud
              </span>
              <span className="ml-1 text-[10px] font-medium text-indigo-500 bg-indigo-500/10 px-1.5 py-0.5 rounded-full">
                v1.0
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    'relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors outline-none',
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute inset-0 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/15"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="h-5 w-5 shrink-0 z-10" />
                  <span className="z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer / Info */}
        <div className="rounded-xl border border-border bg-card/50 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-foreground">
              <Terminal className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold">Terminal Ready</p>
              <p className="text-[10px] text-muted-foreground">cli.auracloud.sh</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
