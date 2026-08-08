import React from 'react';

export function ImageCompressorContent() {
  return (
    <div className="mt-16 border-t border-border/40 pt-12 space-y-12 max-w-4xl mx-auto text-left">
      <div className="grid gap-8 md:grid-cols-2">
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            What is an image compressor?
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            An image compressor is a tool designed to reduce the file size of digital images (such as JPG, PNG, and WebP) by optimizing their data structure. By eliminating redundant details or using advanced compression algorithms, a compressor allows images to load faster and consume less storage space without visibly compromising their appearance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Why compress images?
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Compressing images is critical for web performance and storage management. Smaller image files ensure pages load quickly, improving user experience and SEO rankings. They also reduce bandwidth consumption for users on limited data plans, make email attachments easier to send, and save valuable disk space on servers and devices.
          </p>
        </section>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            How to compress an image
          </h2>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
            <p>Compressing images on FixForYou is simple, straightforward, and secure:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Drag and drop your images (JPG, PNG, or WebP) or click &quot;Browse Files&quot; to choose files.</li>
              <li>Adjust the compression quality slider to your desired balance of size and visual clarity.</li>
              <li>Click download on individual files, or grab all of them compiled into a single ZIP file.</li>
            </ol>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Is FFY image compression private?
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Yes, it is entirely private. Unlike other online converters, FixForYou does not upload your files to external servers. All operations happen inside your browser using your local device resources. Your photos and data remain exclusively on your computer, making it a safe choice for confidential or personal documents.
          </p>
        </section>
      </div>
    </div>
  );
}
