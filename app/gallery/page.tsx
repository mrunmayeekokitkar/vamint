"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { ChevronLeft, ChevronRight, X, Image as ImageIcon } from "lucide-react";

const galleryEvents = [
  {
    id: 0,
    title: "SIH Internal Hackathon",
    category: "Hackathons",
    desc: "Students collaborating and competing during VAMINT's internal hackathon.",
    images: [
      "/gallery/sih/sih_1.jpeg",
      "/gallery/sih/sih_2.jpeg",
      "/gallery/sih/sih_3.jpeg",
      "/gallery/sih/sih_4.jpeg",
      "/gallery/sih/sih_5.jpeg",
    ],
  },

  {
    id: 1,
    title: "Sitecraft 2025",
    category: "Competitions",
    desc: "Participants taking on the website cloning challenge.",
    images: [
      "/gallery/sitecraft/site_1.jpeg",
      "/gallery/sitecraft/site_2.jpeg",
      "/gallery/sitecraft/site_3.jpeg",
      "/gallery/sitecraft/site_4.jpeg",
    ],
  },

  {
    id: 2,
    title: "Technobash 2026",
    category: "Technical Events",
    desc: "Moments from one of the college's biggest technical events.",
    images: [
      "/gallery/technobash/tech_1.jpeg",
      "/gallery/technobash/tech_2.jpeg",
      "/gallery/technobash/tech_3.jpeg",
      "/gallery/technobash/tech_4.jpeg",
      "/gallery/technobash/tech_5.jpeg",
    ],
  },

  {
    id: 3,
    title: "Debate Competition",
    category: "Soft Skills",
    desc: "Students sharing ideas and competing through debate.",
    images: [],
  },

  {
    id: 4,
    title: "VAMINT Community",
    category: "Community",
    desc: "The people behind VAMINT — learning, building, and growing together.",
    images: ["/gallery/committe/committee.jpeg"],
  },
];

export default function Gallery() {
  const [currentImages, setCurrentImages] = useState<Record<number, number>>(
    {},
  );

  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const getCurrentImage = (eventId: number) => {
    return currentImages[eventId] ?? 0;
  };

  const nextImage = (eventId: number, total: number) => {
    setCurrentImages((prev) => {
      const current = prev[eventId] ?? 0;

      return {
        ...prev,
        [eventId]: (current + 1) % total,
      };
    });
  };

  const prevImage = (eventId: number, total: number) => {
    setCurrentImages((prev) => {
      const current = prev[eventId] ?? 0;

      return {
        ...prev,
        [eventId]: (current - 1 + total) % total,
      };
    });
  };

  const openLightbox = (eventIndex: number, imageIndex: number) => {
    setSelectedEvent(eventIndex);
    setSelectedImage(imageIndex);
  };

  const closeLightbox = () => {
    setSelectedEvent(null);
    setSelectedImage(0);
  };

  const handleLightboxNext = () => {
    if (selectedEvent === null) return;

    const images = galleryEvents[selectedEvent].images;

    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const handleLightboxPrev = () => {
    if (selectedEvent === null) return;

    const images = galleryEvents[selectedEvent].images;

    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedEvent === null) return;

      if (e.key === "Escape") {
        closeLightbox();
      }

      if (e.key === "ArrowRight") {
        handleLightboxNext();
      }

      if (e.key === "ArrowLeft") {
        handleLightboxPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedEvent]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-[1280px] mx-auto px-6 md:px-12 w-full">
        {/* HEADER */}

        <div className="max-w-3xl mb-16">
          <div className="font-mono text-xs text-yellow-500 uppercase tracking-wider mb-3">
            [ VAMINT Gallery ]
          </div>

          <h1 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-text-primary mb-6">
            Moments with VAMINT
          </h1>

          <p className="font-sans text-text-secondary text-base leading-relaxed">
            A collection of moments from our hackathons, competitions, technical
            events, and community activities.
          </p>
        </div>

        {/* EVENT CARDS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryEvents.map((event, eventIndex) => {
            const currentIndex = getCurrentImage(event.id);

            return (
              <div
                key={event.id}
                className="bg-bg-surface border border-border-subtle rounded-lg overflow-hidden hover:border-yellow-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                {/* IMAGE CAROUSEL */}

                <div className="relative aspect-video bg-bg-surface-raised overflow-hidden">
                  {event.images.length > 0 ? (
                    <>
                      <Image
                        src={event.images[currentIndex]}
                        alt={`${event.title} image ${currentIndex + 1}`}
                        fill
                        className="object-cover cursor-pointer"
                        onClick={() => openLightbox(eventIndex, currentIndex)}
                      />

                      {/* Previous Image */}

                      {event.images.length > 1 && (
                        <button
                          onClick={() =>
                            prevImage(event.id, event.images.length)
                          }
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={18} />
                        </button>
                      )}

                      {/* Next Image */}

                      {event.images.length > 1 && (
                        <button
                          onClick={() =>
                            nextImage(event.id, event.images.length)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all"
                          aria-label="Next image"
                        >
                          <ChevronRight size={18} />
                        </button>
                      )}

                      {/* Image Counter */}

                      <div className="absolute bottom-3 left-3 bg-black/70 px-2 py-1 rounded text-[10px] font-mono text-white">
                        {currentIndex + 1} / {event.images.length}
                      </div>
                    </>
                  ) : (
                    /* DEBATE - NO PHOTOS YET */

                    <div className="w-full h-full flex flex-col items-center justify-center text-center">
                      <ImageIcon
                        size={42}
                        className="text-text-tertiary mb-3"
                      />

                      <p className="font-mono text-xs text-text-tertiary">
                        [ PHOTOS COMING SOON ]
                      </p>
                    </div>
                  )}

                  {/* CATEGORY */}

                  <span className="absolute bottom-3 right-3 font-mono text-[10px] text-yellow-500 bg-bg-primary px-2 py-1 rounded border border-border-subtle">
                    {event.category}
                  </span>
                </div>

                {/* CARD CONTENT */}

                <div className="p-5">
                  <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
                    {event.title}
                  </h3>

                  <p className="font-sans text-xs text-text-secondary leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* LIGHTBOX */}

      {selectedEvent !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          {/* Close */}

          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-yellow-500 transition-colors z-10"
            aria-label="Close gallery"
          >
            <X size={28} />
          </button>

          {/* Previous */}

          {galleryEvents[selectedEvent].images.length > 1 && (
            <button
              onClick={handleLightboxPrev}
              className="absolute left-4 md:left-10 text-white hover:text-yellow-500 transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={42} />
            </button>
          )}

          {/* MAIN IMAGE */}

          <div className="relative w-full max-w-6xl h-[80vh]">
            <Image
              src={galleryEvents[selectedEvent].images[selectedImage]}
              alt={galleryEvents[selectedEvent].title}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Next */}

          {galleryEvents[selectedEvent].images.length > 1 && (
            <button
              onClick={handleLightboxNext}
              className="absolute right-4 md:right-10 text-white hover:text-yellow-500 transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight size={42} />
            </button>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}
