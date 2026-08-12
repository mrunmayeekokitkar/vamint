"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

const galleryImages = [
  { id: 0, title: "Syntax Showdown 2026", category: "Hackathons", desc: "Collaborating on local WASM translation templates." },
  { id: 1, title: "AI Agent Dev Session", category: "Workshops", desc: "Setting up local transformer API gateways." },
  { id: 2, title: "CP Sprint Winners", category: "Competitions", desc: "Top 3 positions checking algorithm outputs." },
  { id: 3, title: "Sentinel Firmware Deploy", category: "Projects", desc: "ESP32 firmware signing validation check." },
  { id: 4, title: "Annual General Compiles", category: "Gatherings", desc: "End of semester general assembly code reviews." },
  { id: 5, title: "Design Systems Sprint", category: "Workshops", desc: "Typography alignment and color token discussions." }
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Close lightbox on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowRight" && selectedImage !== null) handleNext();
      if (e.key === "ArrowLeft" && selectedImage !== null) handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  const handleNext = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage + 1) % galleryImages.length);
  };

  const handlePrev = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-[1280px] mx-auto px-6 md:px-12 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="font-mono text-xs text-mint-500 uppercase tracking-wider mb-3">
            [ Workspace Gallery ]
          </div>
          <h1 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-text-primary mb-6">
            Inside VAMINT labs
          </h1>
          <p className="font-sans text-text-secondary text-base">
            Photos from our hackathons, design discussions, late-night compiles, and campus workshops.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img.id)}
              className="group cursor-pointer bg-bg-surface border border-border-subtle hover:border-mint-500/30 rounded-lg overflow-hidden transition-all duration-300"
            >
              {/* Graphic Mockup Placeholder */}
              <div className="relative aspect-video bg-bg-surface-raised border-b border-border-subtle flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-mint-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <ImageIcon size={32} className="text-text-tertiary group-hover:text-mint-500 transition-colors" />
                <span className="absolute bottom-3 right-3 font-mono text-[10px] text-text-tertiary bg-bg-primary px-2 py-0.5 rounded border border-border-subtle">
                  {img.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-base text-text-primary mb-1">
                  {img.title}
                </h3>
                <p className="font-sans text-xs text-text-secondary leading-relaxed">
                  {img.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-bg-primary/95 flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-6 p-2 text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
              aria-label="Previous Image"
            >
              <ChevronLeft size={36} />
            </button>

            <div className="max-w-4xl w-full flex flex-col items-center">
              {/* Image Container Mockup */}
              <div className="w-full aspect-video bg-bg-surface border border-border-subtle rounded-lg flex flex-col justify-between p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-mint-500/5 via-transparent to-transparent pointer-events-none"></div>
                
                {/* Simulated window control buttons */}
                <div className="flex items-center space-x-2 border-b border-border-subtle pb-4 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-error-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-mint-500"></span>
                  <span className="text-[10px] font-mono text-text-tertiary pl-4">
                    file:///vamint/gallery/{galleryImages[selectedImage].title.toLowerCase().replace(/ /g, "_")}.jpg
                  </span>
                </div>

                <div className="flex-grow flex items-center justify-center py-12">
                  <div className="text-center space-y-4">
                    <ImageIcon size={64} className="text-mint-500/40 mx-auto animate-pulse" />
                    <p className="font-mono text-xs text-text-tertiary">
                      [ VISUAL SNAPSHOT RENDERED ]
                    </p>
                  </div>
                </div>

                <div className="border-t border-border-subtle pt-4 mt-4 flex items-center justify-between text-xs font-sans">
                  <div>
                    <h3 className="font-display font-semibold text-text-primary">
                      {galleryImages[selectedImage].title}
                    </h3>
                    <p className="text-text-secondary mt-1">
                      {galleryImages[selectedImage].desc}
                    </p>
                  </div>
                  <span className="font-mono text-text-tertiary border border-border-subtle px-2 py-0.5 rounded">
                    {galleryImages[selectedImage].category}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="absolute right-6 p-2 text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
              aria-label="Next Image"
            >
              <ChevronRight size={36} />
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
