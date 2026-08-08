import type { Metadata } from 'next';
import React from 'react';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Free Image Compressor – Compress JPG, PNG & WebP | FixForYou',
  description:
    'Compress JPG, PNG and WebP images online for free. Reduce image file size quickly with private, browser-based compression. Your images never leave your device.',
  alternates: {
    canonical: `${SITE_URL}/tools/image-compressor`,
  },
};

export default function ImageCompressorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Breadcrumb schema for Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: `${SITE_URL}/#tools`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Image Compressor',
        item: `${SITE_URL}/tools/image-compressor`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
