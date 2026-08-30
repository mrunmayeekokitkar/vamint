"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Code2, BrainCircuit, Terminal, ShieldAlert, Calendar, LayoutGrid } from "lucide-react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const TerminalScene = dynamic(
  () => import("@/components/three/TerminalScene"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />
      </div>
    ),
  }
);

export default function Home() {
  const [events, setEvents] = useState<{ slug: string; title: string; date: string; description: string; status: string }[]>([]);
  const [projects, setProjects] = useState<{ slug: string; title: string; description: string; category: string; tags: string[] }[]>([]);

  useEffect(() => {
    import("@/content/events.json").then((data) => {
      setEvents(data.default.filter((e) => e.status === "upcoming").slice(0, 2));
    });
    import("@/content/projects.json").then((data) => {
      setProjects(data.default.slice(0, 3));
    });
  }, []);

  const focusAreas = [
    {
      title: "Community Events",
      icon: <Calendar className="text-mustard-500" size={24} />,
      desc: "Building connections through meetups, tech talks, and informal gatherings where ideas flow freely.",
    },
    {
      title: "Workshops",
      icon: <Code2 className="text-mustard-500" size={24} />,
      desc: "Hands-on learning sessions where we dive into practical skills together, from web dev to AI tools.",
    },
    {
      title: "Competitions",
      icon: <Terminal className="text-mustard-500" size={24} />,
      desc: "Hackathons, coding challenges, and contests that push us to solve real problems under pressure.",
    },
    {
      title: "Technical Events",
      icon: <BrainCircuit className="text-mustard-500" size={24} />,
      desc: "Deep-dive sessions on emerging technologies, system design, and cutting-edge development practices.",
    },
    {
      title: "Soft-Skills Events",
      icon: <LayoutGrid className="text-mustard-500" size={24} />,
      desc: "Communication, teamwork, and leadership development through debates, presentations, and collaborative projects.",
    },
  ];


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

     {/* Hero Section */}
<section
  id="hero-section"
  className="relative min-h-[90vh] pt-28 overflow-hidden flex items-center"
>
  <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 w-full">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

      {/* LEFT — Hero Content */}
      <div className="relative z-10 flex flex-col items-start">

        <div className="inline-flex items-center gap-2 bg-bg-surface border border-border-subtle px-4 py-2 rounded-full text-xs font-mono text-yellow-500 mb-8">
          <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
          <span>Recruitment Open for 2026–27</span>
        </div>

        <h1 className="font-display font-bold text-5xl md:text-6xl xl:text-7xl tracking-tight leading-[1.05] text-text-primary mb-6">
          Where students come to{" "}
          <span className="text-yellow-500 text-glow">
            build things
          </span>{" "}
          that matter.
        </h1>

        <p className="font-sans text-text-secondary text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
          VAMINT is GSMCOE&apos;s student tech community, a place to
          learn, experiment, build real projects, compete, and grow together.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
          <Button
            variant="primary"
            href="/join"
            className="w-full sm:w-auto"
          >
            Join VAMINT
          </Button>

          <Button
            variant="secondary"
            href="/events"
            className="w-full sm:w-auto"
          >
            See our events
          </Button>
        </div>
      </div>

      {/* RIGHT — 3D Terminal */}
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[580px]">
        <TerminalScene />
      </div>

    </div>
  </div>
</section>

        {/* Ambient bottom gradient */}
        <section>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none"></div>
      </section>

 {/* What We Focus On */}
      <section className="py-24 bg-bg-primary border-t border-border-subtle relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-xl mb-16">
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-text-primary mb-4">
              What we do
            </h2>
            <p className="font-sans text-text-secondary">
              We&apos;re more than a coding club. We run events that build skills, friendships, and experiences that last beyond college.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {focusAreas.map((area, i) => (
              <Card key={i} hoverGlow className="flex flex-col space-y-4">
                <div className="p-3 bg-bg-surface-raised border border-border-subtle rounded-md w-fit">
                  {area.icon}
                </div>
                <h3 className="font-display font-semibold text-xl text-text-primary">
                  {area.title}
                </h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">
                  {area.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Upcoming Events */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-text-primary mb-4">
                Upcoming Events
              </h2>
              <p className="font-sans text-text-secondary">
                See what we have on the calendar.
              </p>
            </div>
            <Link
              href="/events"
              className="text-yellow-500 hover:text-yellow-400 font-sans text-sm font-semibold flex items-center gap-1 w-fit group"
            >
              View all events
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.length > 0 ? (
              events.map((event) => (
                <Card key={event.slug} className="flex flex-col md:flex-row gap-6 hover:border-yellow-500/30 transition-all duration-300">
                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 text-xs font-mono text-yellow-500 mb-2">
                        <Calendar size={14} />
                        <span>{new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      </div>
                      <h3 className="font-display font-semibold text-xl text-text-primary mb-2">
                        {event.title}
                      </h3>
                      <p className="font-sans text-sm text-text-secondary leading-relaxed line-clamp-3">
                        {event.description}
                      </p>
                    </div>
                    <Link
                      href={`/events/${event.slug}`}
                      className="text-yellow-500 hover:text-yellow-400 font-sans text-xs font-semibold flex items-center gap-1 w-fit"
                    >
                      Learn more <ArrowRight size={12} />
                    </Link>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-text-secondary font-sans col-span-2">
                No upcoming events right now. Check back soon!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="py-24 bg-bg-surface border-t border-border-subtle">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <h2 className="font-display font-semibold text-3xl md:text-4xl text-text-primary mb-4">
                  Student Projects
                </h2>
                <p className="font-sans text-text-secondary">
                  Things VAMINT members are building.
                </p>
              </div>
              <Link
                href="/projects"
                className="text-yellow-500 hover:text-yellow-400 font-sans text-sm font-semibold flex items-center gap-1 w-fit group"
              >
                View all projects
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.slug} className="flex flex-col justify-between h-full hover:border-yellow-500/30 transition-all duration-300">
                  <div className="space-y-4">
                    <span className="px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-mono rounded">
                      {project.category}
                    </span>
                    <h3 className="font-display font-semibold text-xl text-text-primary">
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border-subtle/50 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[11px] font-mono text-text-tertiary">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-text-primary hover:text-yellow-500 transition-colors font-sans text-xs font-semibold flex items-center gap-1"
                    >
                      Details <ArrowRight size={12} />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="py-24 bg-bg-surface border-t border-border-subtle relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 text-center relative z-10">
          <h2 className="font-display font-semibold text-4xl md:text-5xl text-text-primary mb-6 max-w-xl mx-auto">
            Ready to build something?
          </h2>
          <p className="font-sans text-text-secondary max-w-lg mx-auto mb-10">
            We&apos;re looking for curious students who want to learn, create, and grow together. No experience required, just bring your enthusiasm.
          </p>
          <Button variant="primary" href="/join">
            Apply to Join VAMINT
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
