import React from 'react';

interface CompressionSettingsProps {
  quality: number;
  isProcessing: boolean;
  handleQualityChange: (val: number) => void;
}

export function CompressionSettings({
  quality,
  isProcessing,
  handleQualityChange,
}: CompressionSettingsProps) {
  return (
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
  );
}
