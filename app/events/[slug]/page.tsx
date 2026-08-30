"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import {
  Calendar,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  Users,
  Trophy,
  Sparkles,
} from "lucide-react";

// ─── FORM VALIDATION ─────────────────────────────────────────────

const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  rollNo: z.string().min(4, "Invalid roll number"),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export default function EventDetail() {
  const params = useParams();
  const router = useRouter();

  const slug = params?.slug as string;

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  });

  // ─── LOAD EVENT DATA ───────────────────────────────────────────

  useEffect(() => {
    if (!slug) return;

    import("@/content/events.json").then((data) => {
      const match = data.default.find((e: any) => e.slug === slug);

      if (match) {
        setEvent(match);
      } else {
        router.push("/not-found");
      }

      setLoading(false);
    });
  }, [slug, router]);

  // ─── RSVP SUBMISSION ───────────────────────────────────────────

  const onSubmit = async () => {
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setRegSuccess(true);
    reset();
  };

  // ─── LOADING ───────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-mint-500/20 border-t-mint-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!event) return null;

  const isUpcoming = event.status === "upcoming";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-[1000px] mx-auto px-6 w-full">
        {/* BACK LINK */}
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors font-sans text-sm mb-8"
        >
          <ArrowLeft size={16} />
          Back to events
        </Link>

        {/* EVENT HEADER */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 bg-mint-500/10 border border-mint-500/20 text-mint-500 text-xs font-mono rounded">
              {event.type}
            </span>

            <span className="text-text-tertiary">|</span>

            <div className="flex items-center space-x-1 text-xs font-mono text-text-secondary">
              <Calendar size={12} />

              <span>
                {event.slug === "technobash-2026"
                  ? "February 13-14, 2026"
                  : new Date(event.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
              </span>
            </div>
          </div>

          <h1 className="font-display font-semibold text-3xl md:text-5xl text-text-primary">
            {event.title}
          </h1>

          <div className="flex items-center space-x-2 text-sm text-text-secondary font-mono">
            <MapPin size={16} className="text-text-tertiary" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* ─── PAST EVENT RECAP ─── */}

        {!isUpcoming && (
          <div className="space-y-10">
            {/* OVERVIEW */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-mint-500" />

                <h2 className="font-display font-semibold text-xl text-text-primary">
                  About the Event
                </h2>
              </div>

              <Card className="border border-border-subtle">
                <p className="font-sans text-sm text-text-secondary leading-relaxed">
                  {event.description}
                </p>
              </Card>
            </section>

            {/* HIGHLIGHTS */}
            {event.highlights && (
              <section>
                <div className="flex items-center gap-2 mb-5">
                  <Trophy size={18} className="text-mint-500" />

                  <h2 className="font-display font-semibold text-xl text-text-primary">
                    Event Highlights
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {event.highlights.map(
                    (
                      highlight: { value: string; label: string },
                      index: number,
                    ) => (
                      <Card key={index} hoverGlow className="text-center py-7">
                        <div className="font-display font-semibold text-2xl md:text-3xl text-mint-500 mb-2">
                          {highlight.value}
                        </div>

                        <div className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary">
                          {highlight.label}
                        </div>
                      </Card>
                    ),
                  )}
                </div>
              </section>
            )}

            {/* EVENT RECAP */}
            {event.outcome && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 size={18} className="text-mint-500" />

                  <h2 className="font-display font-semibold text-xl text-text-primary">
                    Event Recap
                  </h2>
                </div>

                <Card className="border border-mint-500/20 bg-bg-surface">
                  <p className="font-sans text-sm text-text-secondary leading-relaxed">
                    {event.outcome}
                  </p>
                </Card>
              </section>
            )}

            {/* ORGANIZERS */}
            {event.organizers && event.organizers.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Users size={18} className="text-mint-500" />

                  <h2 className="font-display font-semibold text-xl text-text-primary">
                    Organized By
                  </h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  {event.organizers.map((organizer: string, index: number) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-bg-surface border border-border-subtle rounded-md font-sans text-sm text-text-secondary"
                    >
                      {organizer}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* BACK TO EVENTS */}
            <div className="pt-4 border-t border-border-subtle">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-sm font-semibold text-mint-500 hover:text-text-primary transition-colors"
              >
                <ArrowLeft size={16} />
                Explore more events
              </Link>
            </div>
          </div>
        )}

        {/* ─── UPCOMING EVENT PAGE ─── */}

        {isUpcoming &&
          (event.slug === "orientation-2026-27" ? (
            <div className="max-w-3xl space-y-8 font-sans text-text-secondary leading-relaxed">
              <div className="space-y-4">
                <h3 className="font-display font-semibold text-lg text-text-primary border-b border-border-subtle/50 pb-2">
                  Overview
                </h3>
                <p className="text-sm">{event.description}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
              {/* MAIN CONTENT */}
              <div className="md:col-span-3 space-y-8 font-sans text-text-secondary leading-relaxed">
                <div className="space-y-4">
                  <h3 className="font-display font-semibold text-lg text-text-primary border-b border-border-subtle/50 pb-2">
                    Overview
                  </h3>

                  <p className="text-sm">{event.description}</p>
                </div>

                {event.prerequisites && (
                  <div className="space-y-2">
                    <h4 className="font-display font-semibold text-sm text-text-primary">
                      Prerequisites
                    </h4>

                    <p className="text-xs">{event.prerequisites}</p>
                  </div>
                )}

                {event.whatToBring && (
                  <div className="space-y-2">
                    <h4 className="font-display font-semibold text-sm text-text-primary">
                      What to Bring
                    </h4>

                    <p className="text-xs">{event.whatToBring}</p>
                  </div>
                )}
              </div>

              {/* RSVP */}
              <div className="md:col-span-2">
                <Card className="border border-border-subtle">
                  {regSuccess ? (
                    <div className="text-center py-8 space-y-4">
                      <CheckCircle2
                        className="text-mint-500 mx-auto"
                        size={40}
                      />

                      <h4 className="font-display font-semibold text-lg text-text-primary">
                        Registration Complete
                      </h4>

                      <p className="text-xs text-text-secondary">
                        Your attendance confirmation has been processed.
                        We&apos;ll see you at the event!
                      </p>

                      <Button
                        variant="secondary"
                        onClick={() => setRegSuccess(false)}
                        className="w-full"
                      >
                        Done
                      </Button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <h3 className="font-mono text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                        RSVP Registration
                      </h3>

                      {/* NAME */}
                      <div className="space-y-1.5">
                        <label className="block font-mono text-[10px] text-text-secondary uppercase">
                          Name
                        </label>

                        <input
                          type="text"
                          className="w-full bg-bg-primary border border-border-subtle rounded px-3 py-2 text-xs text-text-primary focus:border-mint-500 focus:outline-none"
                          placeholder="Your name"
                          {...register("name")}
                        />

                        {errors.name && (
                          <p className="text-[10px] text-error-500">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* EMAIL */}
                      <div className="space-y-1.5">
                        <label className="block font-mono text-[10px] text-text-secondary uppercase">
                          Email
                        </label>

                        <input
                          type="email"
                          className="w-full bg-bg-primary border border-border-subtle rounded px-3 py-2 text-xs text-text-primary focus:border-mint-500 focus:outline-none"
                          placeholder="you@college.edu"
                          {...register("email")}
                        />

                        {errors.email && (
                          <p className="text-[10px] text-error-500">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* ROLL NUMBER */}
                      <div className="space-y-1.5">
                        <label className="block font-mono text-[10px] text-text-secondary uppercase">
                          Roll Number
                        </label>

                        <input
                          type="text"
                          className="w-full bg-bg-primary border border-border-subtle rounded px-3 py-2 text-xs text-text-primary focus:border-mint-500 focus:outline-none"
                          placeholder="24CSE0123"
                          {...register("rollNo")}
                        />

                        {errors.rollNo && (
                          <p className="text-[10px] text-error-500">
                            {errors.rollNo.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting
                          ? "Registering..."
                          : "Register Attendance"}
                      </Button>
                    </form>
                  )}
                </Card>
              </div>
            </div>
          ))}
      </main>

      <Footer />
    </div>
  );
}
