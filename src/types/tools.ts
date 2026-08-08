export interface CompressorFile {
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
