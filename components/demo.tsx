"use client";
import * as React from "react";
import {
  Gallery,
  GalleryGrid,
  GalleryImage,
} from "@/components/ui/shared-element-gallery";

const IMAGES = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
    alt: "Mountain landscape at sunrise",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&q=80",
    alt: "Sunlit forest path",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1400&q=80",
    alt: "Forest in golden hour",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&q=80",
    alt: "Alpine lake reflection",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&q=80",
    alt: "Lakeside mountains",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=80",
    alt: "Rocky mountain peak",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=80",
    alt: "Ocean waves at dusk",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&q=80",
    alt: "Starry night mountain",
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=1400&q=80",
    alt: "Snowy mountain range",
  },
  {
    id: "10",
    src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1400&q=80",
    alt: "Mountain trail",
  },
  {
    id: "11",
    src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1400&q=80",
    alt: "Snow-capped peaks",
  },
  {
    id: "12",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80",
    alt: "Tropical beach",
  },
];

export default function GalleryDemo() {
  React.useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    return () => {
      document.documentElement.style.overflowX = "";
      document.body.style.overflowX = "";
    };
  }, []);

  return (
    <div className="w-full self-start min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <header className="mb-16 space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-primary">
            Curated Spaces
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A premium photo experience with seamless shared-element transitions.
            Tap any image to expand, drag vertically to dismiss.
          </p>
        </header>

        <Gallery>
          <GalleryGrid>
            {IMAGES.map((image) => (
              <GalleryImage
                key={image.id}
                id={image.id}
                src={image.src}
                alt={image.alt}
              />
            ))}
          </GalleryGrid>
        </Gallery>
      </div>
    </div>
  );
}
