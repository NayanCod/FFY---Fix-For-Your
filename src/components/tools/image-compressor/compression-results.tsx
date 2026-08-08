import React from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CompressorFile } from '@/types/tools';
import { ImageFileCard } from './image-file-card';
import { CompressionSummary } from './compression-summary';

interface CompressionResultsProps {
  files: CompressorFile[];
  completedCount: number;
  isZipGenerating: boolean;
  handleClearAll: () => void;
  handleDownloadAll: () => void;
  handleRemoveFile: (id: string) => void;
}

export function CompressionResults({
  files,
  completedCount,
  isZipGenerating,
  handleClearAll,
  handleDownloadAll,
  handleRemoveFile,
}: CompressionResultsProps) {
  if (files.length === 0) return null;

  return (
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
        {files.map((file) => (
          <ImageFileCard
            key={file.id}
            file={file}
            handleRemoveFile={handleRemoveFile}
          />
        ))}
      </div>

      {/* Summary Statistics Card */}
      <CompressionSummary files={files} completedCount={completedCount} />
    </div>
  );
}
