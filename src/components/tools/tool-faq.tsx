'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface ToolFAQProps {
  title?: string;
  faqs: FAQItem[];
}

export function ToolFAQ({ title = 'Frequently Asked Questions', faqs }: ToolFAQProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-12 border-t border-border/40">
      <div className="mb-10 text-center md:text-left">
        <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Got questions? We have got answers.
        </p>
      </div>

      <div className="mx-auto max-w-4xl space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndexes.includes(index);
          return (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-border/40 bg-card/20 backdrop-blur-sm transition-colors duration-200"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between p-5 text-left font-medium text-foreground hover:bg-muted/10 transition-colors focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-semibold">{faq.question}</span>
                <ChevronDown
                  className={`h-4.5 w-4.5 text-muted-foreground transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-indigo-500' : ''
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100 border-t border-border/20' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
              >
                <p className="p-5 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
