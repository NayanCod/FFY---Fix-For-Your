'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

interface ToolWorkspaceProps {
  children: React.ReactNode;
  className?: string;
}

export function ToolWorkspace({ children, className = '' }: ToolWorkspaceProps) {
  return (
    <Card className={`relative overflow-hidden border-border/40 bg-card/40 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl shadow-background/20 ${className}`}>
      {/* Decorative ambient background light */}
      <div className="absolute -top-40 -right-40 -z-10 h-72 w-72 rounded-full bg-indigo-500/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 -z-10 h-72 w-72 rounded-full bg-violet-500/5 blur-3xl" />
      
      <div className="relative z-10 w-full">
        {children}
      </div>
    </Card>
  );
}
