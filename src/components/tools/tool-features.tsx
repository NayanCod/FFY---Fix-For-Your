'use client';

import React from 'react';

export interface ToolFeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ToolFeaturesProps {
  title?: string;
  subtitle?: string;
  features: ToolFeatureItem[];
}

export function ToolFeatures({
  title = 'Why use our tool?',
  subtitle = 'Fast, secure, and built for modern needs.',
  features,
}: ToolFeaturesProps) {
  return (
    <section className="py-12 border-t border-border/40">
      <div className="text-center md:text-left mb-10">
        <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 rounded-2xl border border-border/40 bg-card/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/20 hover:bg-indigo-500/5 group"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base">
                {feature.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
