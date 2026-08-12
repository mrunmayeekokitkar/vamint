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
import { Calendar, MapPin, ArrowLeft, Send, CheckCircle2, User, Mail, ShieldAlert } from "lucide-react";

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

  const onSubmit = async (data: RegistrationFormValues) => {
    setIsSubmitting(true);
    // Simulate RSVP submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setRegSuccess(true);
    reset();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-mint-500/20 border-t-mint-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!event) return null;

  const isUpcoming = event.status === "upcoming";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-[900px] mx-auto px-6 w-full">
        {/* Back Link */}
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors font-sans text-sm mb-8"
        >
          <ArrowLeft size={16} /> Back to events
        </Link>

        {/* Header Summary */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 bg-mint-500/10 border border-mint-500/20 text-mint-500 text-xs font-mono rounded">
              {event.type}
            </span>
            <span className="text-text-tertiary">|</span>
            <div className="flex items-center space-x-1 text-xs font-mono text-text-secondary">
              <Calendar size={12} />
              <span>
                {new Date(event.date).toLocaleDateString("en-US", {
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

        {/* Content & Action columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Main Description */}
          <div className="md:col-span-3 space-y-8 font-sans text-text-secondary leading-relaxed">
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg text-text-primary border-b border-border-subtle/50 pb-2">
                Overview & Description
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

            {!isUpcoming && event.outcome && (
              <div className="space-y-3 bg-bg-surface border border-border-subtle p-5 rounded-lg">
                <h4 className="font-display font-semibold text-sm text-mint-500">
                  Event Outcomes & Highlights
                </h4>
                <p className="text-xs leading-relaxed">{event.outcome}</p>
              </div>
            )}
          </div>

          {/* Form RSVP */}
          <div className="md:col-span-2">
            {isUpcoming ? (
              <Card className="border border-border-subtle">
                {regSuccess ? (
                  <div className="text-center py-8 space-y-4">
                    <CheckCircle2 className="text-mint-500 mx-auto" size={40} />
                    <h4 className="font-display font-semibold text-lg text-text-primary">
                      Registration Complete
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Your attendance confirmation has been processed. A welcome package will arrive via email.
                    </p>
                    <Button variant="secondary" onClick={() => setRegSuccess(false)} className="w-full">
                      Done
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <h3 className="font-mono text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">
                      RSVP Registration
                    </h3>

                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] text-text-secondary uppercase">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full bg-bg-primary border border-border-subtle rounded px-3 py-1.5 text-xs text-text-primary focus:border-mint-500 focus:outline-none transition-colors"
                        placeholder="Jane Doe"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="font-mono text-[10px] text-error-500 flex items-center gap-1 mt-1">
                          <ShieldAlert size={10} />
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] text-text-secondary uppercase">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full bg-bg-primary border border-border-subtle rounded px-3 py-1.5 text-xs text-text-primary focus:border-mint-500 focus:outline-none transition-colors"
                        placeholder="jane@college.edu"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="font-mono text-[10px] text-error-500 flex items-center gap-1 mt-1">
                          <ShieldAlert size={10} />
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Roll No */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] text-text-secondary uppercase">
                        Roll Number
                      </label>
                      <input
                        type="text"
                        className="w-full bg-bg-primary border border-border-subtle rounded px-3 py-1.5 text-xs text-text-primary focus:border-mint-500 focus:outline-none transition-colors"
                        placeholder="24CSE0123"
                        {...register("rollNo")}
                      />
                      {errors.rollNo && (
                        <p className="font-mono text-[10px] text-error-500 flex items-center gap-1 mt-1">
                          <ShieldAlert size={10} />
                          {errors.rollNo.message}
                        </p>
                      )}
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-1.5">
                          <span className="w-3.5 h-3.5 border-2 border-bg-primary border-t-transparent rounded-full animate-spin"></span>
                          Compiling RSVP...
                        </span>
                      ) : (
                        "Register Attendance"
                      )}
                    </Button>
                  </form>
                )}
              </Card>
            ) : (
              <Card className="border border-border-subtle text-center py-8 space-y-3">
                <p className="font-mono text-[10px] text-text-tertiary uppercase">
                  [ ARCHIVED_EVENT ]
                </p>
                <h4 className="font-display font-semibold text-text-primary">
                  Registrations closed
                </h4>
                <p className="font-sans text-xs text-text-secondary leading-relaxed px-4">
                  This calendar event was successfully compiled in the past. View the details or check upcoming events.
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
