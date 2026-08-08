'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface PrivacyBadgeProps {
  label?: string;
  className?: string;
}

export function PrivacyBadge({ label = 'Local & Private', className = '' }: PrivacyBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 select-none shadow-sm shadow-emerald-500/5 ${className}`}
    >
      <ShieldCheck className="h-3.5 w-3.5" />
      <span>{label}</span>
    </div>
  );
}
