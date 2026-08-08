'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ToolPage } from '@/components/tools/tool-page';
import { Button } from '@/components/ui/button';
import {
  UploadCloud,
  Zap,
  Image as ImageIcon,
  ShieldCheck,
  FileText,
  RefreshCw,
  QrCode,
  Lock,
  Trash2,
  Download,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import imageCompression from 'browser-image-compression';
import JSZip from 'jszip';

interface CompressorFile {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  compressedSize?: number;
  compressedBlob?: Blob;
  originalUrl: string;
  compressedUrl?: string;
  dimensions?: { width: number; height: number };
  status: 'pending' | 'compressing' | 'completed' | 'failed';
  progress: number;
  error?: string;
}

// Utility function to format bytes to human readable format
function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export default function ImageCompressorPage() {
  const [files, setFiles] = useState<CompressorFile[]>([]);
  const [quality, setQuality] = useState<number>(80);
  const [isDragActive, setIsDragActive] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isZipGenerating, setIsZipGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const filesRef = useRef<CompressorFile[]>([]);

  // Keep filesRef updated
  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      filesRef.current.forEach((file) => {
        if (file.originalUrl) URL.revokeObjectURL(file.originalUrl);
        if (file.compressedUrl) URL.revokeObjectURL(file.compressedUrl);
      });
    };
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const validateAndAddFiles = (selectedFiles: FileList) => {
    setGlobalError(null);
    const newFiles: CompressorFile[] = [];
    const maxFileSize = 20 * 1024 * 1024; // 20 MB

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

      // Check format
      if (!allowedMimeTypes.includes(file.type) && !allowedExtensions.includes(extension)) {
        setGlobalError(`Unsupported format: ${file.name}. Only JPG, PNG, and WEBP are supported.`);
        continue;
      }

      // Check size
      if (file.size > maxFileSize) {
        setGlobalError(`File too large: ${file.name}. Maximum size allowed is 20 MB.`);
        continue;
      }

      // Check empty
      if (file.size === 0) {
        setGlobalError(`Empty file: ${file.name} cannot be compressed.`);
        continue;
      }

      const id = `${file.name}-${crypto.randomUUID()}-${i}`;
      const originalUrl = URL.createObjectURL(file);

      newFiles.push({
        id,
        file,
        name: file.name,
        originalSize: file.size,
        originalUrl,
        status: 'pending',
        progress: 0,
      });
    }

    if (newFiles.length > 0) {
      setFiles((prev) => [...prev, ...newFiles]);
      // Start compression automatically
      triggerCompression(newFiles);
    }

    // Reset input so selecting the same file again works
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndAddFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndAddFiles(e.target.files);
    }
  };

  const triggerCompression = async (targetFiles: CompressorFile[]) => {
    setIsProcessing(true);

    const promises = targetFiles.map(async (item) => {
      // Set status to compressing
      setFiles((prev) =>
        prev.map((f) => (f.id === item.id ? { ...f, status: 'compressing', progress: 10 } : f))
      );

      // Load dimensions
      let dimensions: { width: number; height: number } | undefined;
      try {
        dimensions = await getImageDimensions(item.originalUrl);
      } catch (e) {
        // Silently catch dimension errors
      }

      const options = {
        maxSizeMB: 20, // max size constraint
        maxWidthOrHeight: undefined, // preserve original dimensions by default
        useWebWorker: true,
        initialQuality: quality / 100,
        onProgress: (progressVal: number) => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === item.id
                ? { ...f, progress: Math.min(95, Math.round(progressVal)) }
                : f
            )
          );
        },
      };

      try {
        const compressedBlob = await imageCompression(item.file, options);
        const compressedUrl = URL.createObjectURL(compressedBlob);

        setFiles((prev) =>
          prev.map((f) =>
            f.id === item.id
              ? {
                  ...f,
                  status: 'completed',
                  progress: 100,
                  compressedSize: compressedBlob.size,
                  compressedBlob,
                  compressedUrl,
                  dimensions,
                }
              : f
          )
        );
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : 'Compression failed';
        setFiles((prev) =>
          prev.map((f) =>
            f.id === item.id
              ? {
                  ...f,
                  status: 'failed',
                  progress: 0,
                  error: errMsg,
                }
              : f
          )
        );
      }
    });

    await Promise.all(promises);
    setIsProcessing(false);
  };

  const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = () => reject(new Error('Failed to load image for dimensions'));
      img.src = url;
    });
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove) {
        if (fileToRemove.originalUrl) URL.revokeObjectURL(fileToRemove.originalUrl);
        if (fileToRemove.compressedUrl) URL.revokeObjectURL(fileToRemove.compressedUrl);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleClearAll = () => {
    files.forEach((file) => {
      if (file.originalUrl) URL.revokeObjectURL(file.originalUrl);
      if (file.compressedUrl) URL.revokeObjectURL(file.compressedUrl);
    });
    setFiles([]);
    setGlobalError(null);
    setIsProcessing(false);
  };

  const handleDownloadAll = async () => {
    const completedFiles = files.filter((f) => f.status === 'completed' && f.compressedBlob);
    if (completedFiles.length === 0) return;

    setIsZipGenerating(true);
    try {
      const zip = new JSZip();
      completedFiles.forEach((file) => {
        if (file.compressedBlob) {
          zip.file(file.name, file.compressedBlob);
        }
      });

      const zipContent = await zip.generateAsync({ type: 'blob' });
      const zipUrl = URL.createObjectURL(zipContent);
      
      const link = document.createElement('a');
      link.href = zipUrl;
      link.download = 'ffy-compressed-images.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => URL.revokeObjectURL(zipUrl), 100);
    } catch (err) {
      setGlobalError('ZIP generation failed. Please try downloading files individually.');
    } finally {
      setIsZipGenerating(false);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Re-run compression for all files if quality slider changes
  const handleQualityChange = (newVal: number) => {
    setQuality(newVal);
    // If we have files, re-trigger compression using the updated quality
    if (files.length > 0) {
      const targetFiles = files.map((f) => ({
        ...f,
        status: 'pending' as const,
        progress: 0,
      }));
      setFiles(targetFiles);
      triggerCompression(targetFiles);
    }
  };

  // Summary Metrics
  const completedCount = files.filter((f) => f.status === 'completed').length;
  const totalOriginalBytes = files.reduce((acc, curr) => acc + curr.originalSize, 0);
  const totalCompressedBytes = files.reduce(
    (acc, curr) => acc + (curr.compressedSize || curr.originalSize),
    0
  );
  const totalSavedBytes = totalOriginalBytes - totalCompressedBytes;
  const savedPercent = totalOriginalBytes > 0 ? (totalSavedBytes / totalOriginalBytes) * 100 : 0;

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
      question: 'Are my images uploaded to any server?',
      answer: 'Absolutely not. All image compression and optimization processes run entirely locally within your browser using modern web technologies. Your files never leave your computer.',
    },
    {
      question: 'Which image formats do you support?',
      answer: 'We support JPG, JPEG, PNG, and WEBP image compression. You can import any of these formats and compress them.',
    },
    {
      question: 'Is there a limit to the file size or number of images?',
      answer: 'Since the compression utilizes your local machine resources, we support a generous file size up to 20 MB per file, and you can process batches completely free of charge.',
    },
    {
      question: 'Does local compression reduce the image quality?',
      answer: 'You have full control over the quality settings with the slider. Setting it to 80% offers the best compromise between visual fidelity and small file sizes.',
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
      title="Free Image Compressor – Compress Images Online | FixForYou"
      description="Compress JPG, PNG and WebP images quickly and privately. Your images are processed locally in your browser and never uploaded."
      features={features}
      faqs={faqs}
      relatedTools={relatedTools}
    >
      <div className="flex flex-col items-center justify-center py-4 sm:py-8 w-full max-w-4xl mx-auto">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg, image/png, image/webp"
          onChange={handleFileChange}
          className="hidden"
          id="file-uploader"
        />

        {/* Global Error Display */}
        {globalError && (
          <div className="mb-6 w-full flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500" role="alert">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <div>{globalError}</div>
          </div>
        )}

        {/* Privacy Notice Banner */}
        <div className="mb-6 w-full flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium">
            <Lock className="h-4 w-4 shrink-0 text-emerald-500" />
            <span>Your images never leave your device.</span>
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            Processed locally in your browser
          </span>
        </div>

        {/* Quality Controls */}
        <div className="mb-8 w-full rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="quality-slider" className="text-sm font-bold text-foreground">
                  Compression Quality
                </label>
                <span className="text-sm font-extrabold text-indigo-500 dark:text-indigo-400">{quality}%</span>
              </div>
              <input
                id="quality-slider"
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => handleQualityChange(Number(e.target.value))}
                disabled={isProcessing}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-valuemin={10}
                aria-valuemax={100}
                aria-valuenow={quality}
              />
            </div>
            <div className="sm:max-w-xs text-xs text-muted-foreground flex flex-col justify-center border-t sm:border-t-0 sm:border-l border-border/60 pt-4 sm:pt-0 sm:pl-6 gap-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Higher quality = larger file
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Lower quality = smaller file
              </span>
            </div>
          </div>
        </div>

        {/* Drag & Drop Area */}
        <div
          onDragEnter={isProcessing ? undefined : handleDrag}
          onDragOver={isProcessing ? undefined : handleDrag}
          onDragLeave={isProcessing ? undefined : handleDrag}
          onDrop={isProcessing ? undefined : handleDrop}
          onClick={isProcessing ? undefined : onButtonClick}
          className={`group flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-300 ${
            isProcessing ? 'opacity-60 cursor-not-allowed border-border/40' : 'cursor-pointer'
          } ${
            isDragActive
              ? 'border-indigo-500 bg-indigo-500/5 scale-[0.99]'
              : 'border-border/60 hover:border-indigo-500/40 hover:bg-muted/10'
          }`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (isProcessing) return;
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onButtonClick();
            }
          }}
          aria-label="Upload images or drag and drop files here"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 group-hover:scale-105 transition-transform duration-300">
            <UploadCloud className="h-7 w-7" />
          </div>

          <h3 className="mb-1 text-base sm:text-lg font-bold text-foreground">
            Drag & drop your images here
          </h3>
          <p className="mb-4 text-xs sm:text-sm text-muted-foreground">
            or click to browse your files
          </p>

          <Button
            type="button"
            className="rounded-full bg-indigo-600 px-6 font-semibold text-white shadow-md hover:bg-indigo-500 transition-colors"
          >
            Browse Files
          </Button>

          <div className="mt-8 w-full border-t border-border/20 pt-6">
            <div className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground/80">Supported Formats: </span>
              <span>JPG, JPEG, PNG, WEBP (Max 20MB per file)</span>
            </div>
          </div>
        </div>

        {/* Results Area */}
        {files.length > 0 && (
          <div className="mt-8 w-full space-y-6">
            {/* Header / Actions summary */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/60 pb-4">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <span>Workspace</span>
                <span className="text-xs font-normal bg-muted px-2.5 py-0.5 rounded-full text-muted-foreground">
                  {files.length} {files.length === 1 ? 'file' : 'files'}
                </span>
              </h3>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearAll}
                  className="rounded-lg text-muted-foreground border-border hover:text-red-500 hover:bg-red-500/5"
                  aria-label="Clear all files"
                >
                  Clear All
                </Button>
                {completedCount > 1 && (
                  <Button
                    size="sm"
                    onClick={handleDownloadAll}
                    disabled={isZipGenerating}
                    className="rounded-lg bg-indigo-600 hover:bg-indigo-500 font-medium text-white shadow-sm flex items-center gap-2"
                  >
                    {isZipGenerating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    <span>Download All (.zip)</span>
                  </Button>
                )}
              </div>
            </div>

            {/* List of File Cards */}
            <div className="grid grid-cols-1 gap-4">
              {files.map((file) => {
                const savedRatio =
                  file.compressedSize && file.originalSize
                    ? ((file.originalSize - file.compressedSize) / file.originalSize) * 100
                    : 0;

                return (
                  <div
                    key={file.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card p-4 hover:border-border transition-all"
                  >
                    {/* Left side: Thumbnail + Name */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border/80 bg-muted/30 flex items-center justify-center relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={file.originalUrl}
                          alt={file.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-foreground" title={file.name}>
                          {file.name}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs text-muted-foreground">
                          {file.dimensions && (
                            <span className="font-semibold text-foreground/70">
                              {file.dimensions.width} × {file.dimensions.height}
                            </span>
                          )}
                          {file.dimensions && <span className="text-border/80">•</span>}
                          <span>Original: {formatBytes(file.originalSize)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Progress / Compression Details */}
                    <div className="flex-1 w-full sm:w-auto sm:max-w-xs flex flex-col justify-center">
                      {file.status === 'compressing' && (
                        <div className="space-y-1.5 w-full">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-indigo-400 flex items-center gap-1.5">
                              <Loader2 className="h-3 w-3 animate-spin" /> Compressing...
                            </span>
                            <span className="text-muted-foreground">{file.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-indigo-500 transition-all duration-300"
                              style={{ width: `${file.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {file.status === 'completed' && file.compressedSize && (
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                          <div>
                            <span className="text-muted-foreground block">Compressed</span>
                            <span className="font-bold text-foreground">
                              {formatBytes(file.compressedSize)}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block">Saved</span>
                            <span className="font-extrabold text-emerald-500">
                              {savedRatio > 0 ? `${savedRatio.toFixed(1)}%` : '0%'}
                            </span>
                          </div>
                        </div>
                      )}

                      {file.status === 'failed' && (
                        <div className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{file.error || 'Compression failed'}</span>
                        </div>
                      )}

                      {file.status === 'pending' && (
                        <span className="text-xs text-muted-foreground">Queued...</span>
                      )}
                    </div>

                    {/* Right side: Action buttons */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-border/40">
                      {file.status === 'completed' && file.compressedUrl && (
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="rounded-lg border-emerald-500/20 bg-emerald-500/5 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500"
                        >
                          <a
                            href={file.compressedUrl}
                            download={`compressed-${file.name}`}
                            aria-label={`Download compressed version of ${file.name}`}
                          >
                            <Download className="h-4 w-4 mr-1.5" />
                            <span>Download</span>
                          </a>
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveFile(file.id)}
                        className="rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/5"
                        aria-label={`Remove ${file.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary Statistics Card */}
            {completedCount > 0 && (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 mt-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h4 className="text-base font-bold text-foreground">Compression Summary</h4>
                      <p className="text-xs text-muted-foreground">
                        {completedCount} of {files.length} {files.length === 1 ? 'image' : 'images'} successfully compressed
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-emerald-500/10">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                          Original Size
                        </span>
                        <span className="text-sm sm:text-base font-bold text-foreground">
                          {formatBytes(totalOriginalBytes)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                          Compressed Size
                        </span>
                        <span className="text-sm sm:text-base font-bold text-foreground">
                          {formatBytes(totalCompressedBytes)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                          Total Saved
                        </span>
                        <span className="text-sm sm:text-base font-extrabold text-emerald-500">
                          {formatBytes(totalSavedBytes)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                          Reduction Ratio
                        </span>
                        <span className="text-sm sm:text-base font-extrabold text-emerald-500">
                          {savedPercent.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolPage>
  );
}
