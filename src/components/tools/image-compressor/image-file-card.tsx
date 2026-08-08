import React from 'react';
import { Download, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CompressorFile } from '@/types/tools';
import { formatBytes } from '@/lib/tools/image-compression';

interface ImageFileCardProps {
  file: CompressorFile;
  handleRemoveFile: (id: string) => void;
}

export function ImageFileCard({ file, handleRemoveFile }: ImageFileCardProps) {
  const savedRatio =
    file.compressedSize && file.originalSize
      ? ((file.originalSize - file.compressedSize) / file.originalSize) * 100
      : 0;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card p-4 hover:border-border transition-all">
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
}
