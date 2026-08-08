'use client';

import React from 'react';
import { Navbar } from '@/components/home/navbar';
import { Hero } from '@/components/home/hero';
import { Categories } from '@/components/home/categories';
import { PopularTools } from '@/components/home/popular-tools';
import { Footer } from '@/components/home/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Categories />
        <PopularTools />
      </main>
      <Footer />
    </div>
  );
}
