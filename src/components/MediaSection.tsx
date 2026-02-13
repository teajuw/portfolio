"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

interface MediaItem {
  type: "image" | "video";
  src: string;
  alt: string;
  caption?: string;
}

interface MediaSectionProps {
  items: MediaItem[];
  columns?: 1 | 2 | 3;
}

export default function MediaSection({ items, columns = 2 }: MediaSectionProps) {
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);

  const colClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  }[columns];

  return (
    <>
      <div className={`grid ${colClass} gap-4 my-8`}>
        {items.map((item, i) => (
          <figure
            key={i}
            className="relative group cursor-pointer overflow-hidden rounded-lg bg-muted/20"
            onClick={() => setLightboxItem(item)}
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="relative w-full h-48 bg-foreground/5 flex items-center justify-center">
                <video
                  src={item.src}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
              </div>
            )}
            {item.caption && (
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-3 pt-8">
                <span className="text-sm text-white font-medium">
                  {item.caption}
                </span>
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setLightboxItem(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            onClick={() => setLightboxItem(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            {lightboxItem.type === "image" ? (
              <img
                src={lightboxItem.src}
                alt={lightboxItem.alt}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
            ) : (
              <video
                src={lightboxItem.src}
                className="max-w-full max-h-[85vh] rounded-lg"
                controls
                autoPlay
                loop
              />
            )}
            {lightboxItem.caption && (
              <p className="text-white text-center mt-4 font-medium">
                {lightboxItem.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
