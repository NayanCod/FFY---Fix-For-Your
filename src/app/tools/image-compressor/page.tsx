'use client';

import React from 'react';
import { ToolPage } from '@/components/tools/shared/tool-page';
import { ShieldCheck, Zap, Image as ImageIcon, FileText, RefreshCw, QrCode, AlertCircle } from 'lucide-react';
import { useImageCompressor } from '@/hooks/tools/use-image-compressor';
import { CompressorWorkspace } from '@/components/tools/image-compressor/compressor-workspace';
import { CompressionSettings } from '@/components/tools/image-compressor/compression-settings';
import { CompressionResults } from '@/components/tools/image-compressor/compression-results';
import { ImageCompressorContent } from '@/components/tools/image-compressor/content-sections';

export default function ImageCompressorPage() {
  const {
    files,
    quality,
    isDragActive,
    globalError,
    isProcessing,
    isZipGenerating,
    fileInputRef,
    handleDrag,
    handleDrop,
    handleFileChange,
    handleRemoveFile,
    handleClearAll,
    handleDownloadAll,
    onButtonClick,
    handleQualityChange,
  } = useImageCompressor();

  const completedCount = files.filter((f) => f.status === 'completed').length;

  // Features list
  const features = [
    {
      title: '100% Client-Side',
      description: 'Your images are processed entirely in your web browser. No files are ever uploaded to our servers.',
      icon: <ShieldCheck className="h-5 w-5" />,
    },
    {
      title: 'Ultra-Fast Performance',
      description: 'Zero queue times. Compression runs instantly on your local computer CPU/GPU.',
      icon: <Zap className="h-5 w-5" />,
    },
    {
      title: 'Modern Formats Support',
      description: 'Compress and optimize JPG, PNG, and WEBP images with ease.',
      icon: <ImageIcon className="h-5 w-5" />,
    },
  ];

  // FAQ list
  const faqs = [
    {
      question: 'Is the image compressor free?',
      answer: 'Yes, our image compressor is completely free to use. There are no premium plans, usage limits, or hidden fees. You can compress as many images as you need without signup or subscription.',
    },
    {
      question: 'Are my images uploaded?',
      answer: 'No, your images are never uploaded to any server. All processing runs locally in your browser on your own device using advanced JavaScript libraries. This ensures complete privacy and allows offline functionality.',
    },
    {
      question: 'What image formats are supported?',
      answer: 'We support standard web image formats, specifically JPG (JPEG), PNG, and WebP files. You can upload any mixture of these formats and compress them simultaneously.',
    },
    {
      question: 'Can I compress multiple images?',
      answer: 'Yes, bulk compression is fully supported. You can select and drop multiple images at once to compress them in parallel directly on your machine.',
    },
    {
      question: 'Can I download all compressed images at once?',
      answer: 'Absolutely. After batch-compressing your files, you can download them all as a single, neatly packaged ZIP file in one click, or save them individually.',
    },
    {
      question: 'Does image compression reduce quality?',
      answer: 'Image compression optimizes the file structure and optionally reduces detail to save space. You can use our quality slider to choose the perfect balance of visual clarity and small file size for your needs.',
    },
  ];

  // Related Tools list
  const relatedTools = [
    {
      title: 'PDF Merger',
      description: 'Combine multiple PDF files into a single organized document locally in seconds.',
      href: '/tools/pdf-merger',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: 'Image Converter',
      description: 'Convert images to JPG, PNG, WEBP, or PDF formats without uploads.',
      href: '/tools/image-converter',
      icon: <RefreshCw className="h-5 w-5" />,
    },
    {
      title: 'QR Code Generator',
      description: 'Instantly generate high-quality QR codes for URLs, text, or contact information.',
      href: '/tools/qr-generator',
      icon: <QrCode className="h-5 w-5" />,
    },
  ];

  return (
    <ToolPage
      title="Image Compressor"
      description="Compress JPG, PNG and WebP images quickly and privately. Your images are processed locally in your browser and never uploaded."
      features={features}
      faqs={faqs}
      relatedTools={relatedTools}
    >
      <div className="flex flex-col items-center justify-center py-4 sm:py-8 w-full max-w-4xl mx-auto">
        
        {/* Global Error Display */}
        {globalError && (
          <div className="mb-6 w-full flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500" role="alert">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <div>{globalError}</div>
          </div>
        )}

        {/* Compression slider settings */}
        <CompressionSettings
          quality={quality}
          isProcessing={isProcessing}
          handleQualityChange={handleQualityChange}
        />

        {/* Drag/drop/browse Workspace upload zone */}
        <CompressorWorkspace
          fileInputRef={fileInputRef}
          isProcessing={isProcessing}
          isDragActive={isDragActive}
          handleDrag={handleDrag}
          handleDrop={handleDrop}
          handleFileChange={handleFileChange}
          onButtonClick={onButtonClick}
        />

        {/* Compression list of items results & summaries */}
        <CompressionResults
          files={files}
          completedCount={completedCount}
          isZipGenerating={isZipGenerating}
          handleClearAll={handleClearAll}
          handleDownloadAll={handleDownloadAll}
          handleRemoveFile={handleRemoveFile}
        />

        {/* High-quality educational content for SEO */}
        <ImageCompressorContent />
      </div>
    </ToolPage>
  );
}
