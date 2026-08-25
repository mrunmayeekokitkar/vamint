"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Code2, BrainCircuit, Terminal, ShieldAlert, Calendar, LayoutGrid } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

// Dynamically load the 3D Scene with no SSR
const BrainBulbScene = dynamic(() => import("@/components/three/BrainBulbScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-bg-primary flex items-center justify-center opacity-30">
      <div className="w-12 h-12 border-4 border-mustard-500/20 border-t-mustard-500 rounded-full animate-spin"></div>
    </div>
  ),
});

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    // Load events and projects
    import("@/content/events.json").then((data) => {
      setEvents(data.default.filter((e: any) => e.status === "upcoming").slice(0, 2));
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
      desc: "Hackathons, coding challenges, and contests that push us to solve problems under pressure.",
    },
    {
      title: "Technical Events",
      icon: <BrainCircuit className="text-mustard-500" size={24} />,
      desc: "Deep-dive sessions on emerging technologies, system architecture, and cutting-edge development practices.",
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
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
        <BrainBulbScene />
        
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 bg-bg-surface border border-border-subtle px-3 py-1 rounded-full text-xs font-mono text-mustard-500 mb-8">
            <span className="w-2 h-2 rounded-full bg-mustard-500 animate-pulse"></span>
            <span>Recruitment Open for 2026-27</span>
          </div>

          <h1 className="font-display font-semibold text-5xl md:text-7xl tracking-tight leading-[1.05] text-text-primary max-w-4xl mb-6">
            Code. Collaborate. <span className="text-mustard-500 text-glow">Evolve.</span>
          </h1>

          <p className="font-serif text-text-secondary text-lg md:text-xl max-w-2xl mb-10 leading-relaxed italic">
            VAMINT is where students come together to build real projects, learn from each other, and grow as developers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-md">
            <Button variant="primary" href="/join" className="w-full sm:w-auto">
              Join VAMINT
            </Button>
            <Button variant="secondary" href="/projects" className="w-full sm:w-auto">
              See what we've built
            </Button>
          </div>
        </div>

        {/* Ambient bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none"></div>
      </section>

      {/* What We Focus On */}
      <section className="py-24 bg-bg-primary border-t border-border-subtle relative z-10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="max-w-xl mb-16">
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-text-primary mb-4">
              What we focus on
            </h2>
            <p className="font-sans text-text-secondary">
              We're more than just a coding club. We build skills, connections, and experiences that last beyond college.
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

      {/* Featured Events */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-text-primary mb-4">
                Upcoming Events
              </h2>
              <p className="font-sans text-text-secondary">
                See what events we have on the calendar. Register to participate.
              </p>
            </div>
            <Link
              href="/events"
              className="text-mustard-500 hover:text-mustard-400 font-sans text-sm font-semibold flex items-center gap-1 w-fit group"
            >
              View all events
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.length > 0 ? (
              events.map((event) => (
                <Card key={event.slug} className="flex flex-col md:flex-row gap-6 hover:border-mustard-500/30 transition-all duration-300">
                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 text-xs font-mono text-mustard-500 mb-2">
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
                    <Button variant="secondary" href={`/events/${event.slug}`} className="w-fit">
                      Register Now
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-text-secondary font-sans col-span-2">
                No upcoming events scheduled. Check back soon!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-bg-surface border-t border-border-subtle">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-text-primary mb-4">
                Student Projects
              </h2>
              <p className="font-sans text-text-secondary">
                We design and ship robust tools. Here is what VAMINT members are coding.
              </p>
            </div>
            <Link
              href="/projects"
              className="text-mustard-500 hover:text-mustard-400 font-sans text-sm font-semibold flex items-center gap-1 w-fit group"
            >
              View all projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.slug} className="flex flex-col justify-between h-full hover:border-mustard-500/30 transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 bg-mustard-500/10 border border-mustard-500/20 text-mustard-500 text-xs font-mono rounded">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-xl text-text-primary">
                    {project.title}
                  </h3>
                  <p className="font-sans text-sm text-text-secondary leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-subtle/50 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="text-[11px] font-mono text-text-tertiary">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-text-primary hover:text-mustard-500 transition-colors font-sans text-xs font-semibold flex items-center gap-1"
                  >
                    Details <ArrowRight size={12} />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 bg-bg-surface border-t border-border-subtle relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 className="font-display font-semibold text-4xl md:text-5xl text-text-primary mb-6 max-w-xl mx-auto">
            Ready to join us?
          </h2>
          <p className="font-serif text-text-secondary max-w-lg mx-auto mb-10 italic">
            We're looking for curious students who want to learn, build, and grow together. No experience required — just enthusiasm.
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
