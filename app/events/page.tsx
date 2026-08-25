"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");

  useEffect(() => {
    import("@/content/events.json").then((data) => {
      setEvents(data.default);
    });
  }, []);

  const filteredEvents = events.filter((e) => e.status === filter);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-[1280px] mx-auto px-6 md:px-12 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="font-mono text-xs text-mustard-500 uppercase tracking-wider">
              [ Calendar & Archive ]
            </div>
            <h1 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-text-primary">
              VAMINT Events
            </h1>
            <p className="font-sans text-text-secondary text-base">
              Workshops, sprints, algorithm contests, and campus code hackathons.
            </p>
          </div>

          {/* Toggle Tab */}
          <div className="flex bg-bg-surface border border-border-subtle p-1 rounded-md w-fit h-fit">
            <button
              onClick={() => setFilter("upcoming")}
              className={`px-4 py-1.5 rounded font-sans text-xs font-semibold tracking-wide transition-all ${
                filter === "upcoming"
                  ? "bg-mustard-500/10 text-mustard-500 border border-mustard-500/20"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter("past")}
              className={`px-4 py-1.5 rounded font-sans text-xs font-semibold tracking-wide transition-all ${
                filter === "past"
                  ? "bg-mustard-500/10 text-mustard-500 border border-mustard-500/20"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Past Archive
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Card
                key={event.slug}
                className="flex flex-col justify-between hover:border-mustard-500/30 transition-all duration-300 h-full"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 items-center justify-between">
                    <span className="px-2 py-0.5 bg-mustard-500/10 border border-mustard-500/20 text-mustard-500 text-xs font-mono rounded">
                      {event.type}
                    </span>
                    <div className="flex items-center space-x-1.5 text-xs font-mono text-text-tertiary">
                      <Calendar size={12} />
                      <span>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display font-semibold text-xl text-text-primary mb-2">
                      {event.title}
                    </h3>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-border-subtle/50 flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-1.5 text-xs text-text-secondary font-mono">
                    <MapPin size={14} className="text-text-tertiary" />
                    <span className="truncate max-w-[150px] md:max-w-[200px]">
                      {event.location}
                    </span>
                  </div>

                  <Link
                    href={`/events/${event.slug}`}
                    className="text-text-primary hover:text-mustard-500 transition-colors font-sans text-xs font-semibold flex items-center gap-1 shrink-0"
                  >
                    {filter === "upcoming" ? "Register" : "Recap"} <ArrowRight size={12} />
                  </Link>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-2 py-16 text-center text-text-secondary font-sans border border-dashed border-border-subtle rounded-lg">
              No events in this category right now. Check back soon!
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
