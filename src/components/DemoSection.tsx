"use client";

interface DemoSectionProps {
  videoSrc?: string;
  posterSrc?: string;
  caption?: string;
  placeholder?: boolean;
}

export default function DemoSection({ videoSrc, posterSrc, caption, placeholder = false }: DemoSectionProps) {
  if (placeholder || !videoSrc) {
    return (
      <div className="w-full aspect-video bg-muted/20 rounded-xl border-2 border-dashed border-border flex items-center justify-center mb-8">
        <div className="text-center text-muted-foreground">
          <div className="text-4xl mb-2">🎬</div>
          <div className="font-mono text-sm">Demo video coming soon</div>
        </div>
      </div>
    );
  }

  return (
    <figure className="mb-8">
      <div className="w-full aspect-video bg-foreground/5 rounded-xl overflow-hidden">
        <video
          src={videoSrc}
          poster={posterSrc}
          className="w-full h-full object-cover"
          controls
          loop
          playsInline
        />
      </div>
      {caption && (
        <figcaption className="text-sm text-muted-foreground text-center mt-3 font-mono">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
