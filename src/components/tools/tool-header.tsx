'use client';

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { PrivacyBadge } from './privacy-badge';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ToolHeaderProps {
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  showPrivacyBadge?: boolean;
  privacyLabel?: string;
}

export function ToolHeader({
  title,
  description,
  breadcrumbs,
  showPrivacyBadge = true,
  privacyLabel = 'Local & Private',
}: ToolHeaderProps) {
  // Default breadcrumbs if none provided
  const items = breadcrumbs || [
    { label: 'Home', href: '/' },
    { label: 'Tools', href: '/#tools' },
    { label: title },
  ];

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-60 shrink-0" />}
              {isLast || !item.href ? (
                <span className="truncate text-foreground max-w-[150px] sm:max-w-xs">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center gap-1 hover:text-foreground hover:underline transition-colors truncate"
                >
                  {item.label === 'Home' && <Home className="h-3 w-3 shrink-0" />}
                  <span>{item.label}</span>
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      {/* Header Info */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h1>
          {showPrivacyBadge && (
            <div className="self-start sm:self-auto">
              <PrivacyBadge label={privacyLabel} />
            </div>
          )}
        </div>
        <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
