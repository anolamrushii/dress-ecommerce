"use client";

import { useState } from "react";
import Image from "next/image";
import type { DressImage } from "@/lib/types";

export default function DressGallery({ images, name }: { images: DressImage[]; name: string }) {
  const [selected, setSelected] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[3/4] items-center justify-center bg-ivory text-charcoal/30">
        No images yet
      </div>
    );
  }

  const activeImage = images[selected] ?? images[0];

  return (
    <div>
      <div className="relative aspect-[3/4] overflow-hidden bg-ivory">
        <Image
          src={activeImage.image_url}
          alt={activeImage.alt_text ?? name}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 45vw, 100vw"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-3">
          {images.map((image, i) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelected(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={i === selected}
              className={`relative aspect-[3/4] overflow-hidden bg-ivory transition-opacity ${
                i === selected ? "ring-2 ring-gold" : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={image.image_url}
                alt={image.alt_text ?? name}
                fill
                className="object-cover"
                sizes="20vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
