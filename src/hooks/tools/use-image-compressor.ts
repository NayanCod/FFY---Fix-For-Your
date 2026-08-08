import { useState, useRef, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import JSZip from 'jszip';
import { CompressorFile } from '@/types/tools';
import { getImageDimensions } from '@/lib/tools/image-compression';

export function useImageCompressor() {
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
      } catch {
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
    } catch {
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

  return {
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
  };
}
