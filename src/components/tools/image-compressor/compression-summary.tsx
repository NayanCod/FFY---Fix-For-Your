import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { CompressorFile } from '@/types/tools';
import { formatBytes } from '@/lib/tools/image-compression';

interface CompressionSummaryProps {
  files: CompressorFile[];
  completedCount: number;
}

export function CompressionSummary({ files, completedCount }: CompressionSummaryProps) {
  if (completedCount === 0) return null;

  const totalOriginalBytes = files.reduce((acc, curr) => acc + curr.originalSize, 0);
  const totalCompressedBytes = files.reduce(
    (acc, curr) => acc + (curr.compressedSize || curr.originalSize),
    0
  );
  const totalSavedBytes = totalOriginalBytes - totalCompressedBytes;
  const savedPercent = totalOriginalBytes > 0 ? (totalSavedBytes / totalOriginalBytes) * 100 : 0;

  return (
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
  );
}
