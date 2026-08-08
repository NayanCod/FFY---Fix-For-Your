import React from 'react';
import { UploadCloud, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CompressorWorkspaceProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  isProcessing: boolean;
  isDragActive: boolean;
  handleDrag: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onButtonClick: () => void;
}

export function CompressorWorkspace({
  fileInputRef,
  isProcessing,
  isDragActive,
  handleDrag,
  handleDrop,
  handleFileChange,
  onButtonClick,
}: CompressorWorkspaceProps) {
  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg, image/png, image/webp"
        onChange={handleFileChange}
        className="hidden"
        id="file-uploader"
      />

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
    </>
  );
}
