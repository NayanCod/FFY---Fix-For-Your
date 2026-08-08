'use client';

import React from 'react';
import { Navbar } from '@/components/home/navbar';
import { Footer } from '@/components/home/footer';
import { ToolHeader } from './tool-header';
import { ToolWorkspace } from './tool-workspace';
import { ToolFeatures, ToolFeatureItem } from './tool-features';
import { ToolFAQ, FAQItem } from './tool-faq';
import { RelatedTools, RelatedToolItem } from './related-tools';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ToolPageProps {
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  showPrivacyBadge?: boolean;
  privacyLabel?: string;
  features: ToolFeatureItem[];
  faqs: FAQItem[];
  relatedTools: RelatedToolItem[];
  children: React.ReactNode;
}

export function ToolPage({
  title,
  description,
  breadcrumbs,
  showPrivacyBadge = true,
  privacyLabel = 'Local & Private',
  features,
  faqs,
  relatedTools,
  children,
}: ToolPageProps) {
  React.useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {/* Tool Header Section */}
          <ToolHeader
            title={title}
            description={description}
            breadcrumbs={breadcrumbs}
            showPrivacyBadge={showPrivacyBadge}
            privacyLabel={privacyLabel}
          />

          {/* Main Interactive Tool Workspace */}
          <ToolWorkspace>
            {children}
          </ToolWorkspace>

          {/* Features / Info Section */}
          {features && features.length > 0 && (
            <ToolFeatures features={features} />
          )}

          {/* FAQ Section */}
          {faqs && faqs.length > 0 && (
            <ToolFAQ faqs={faqs} />
          )}

          {/* Related Tools Section */}
          {relatedTools && relatedTools.length > 0 && (
            <RelatedTools tools={relatedTools} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
