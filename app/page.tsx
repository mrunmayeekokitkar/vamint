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
const NetworkScene = dynamic(() => import("@/components/three/NetworkScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-bg-primary flex items-center justify-center opacity-30">
      <div className="w-12 h-12 border-4 border-mint-500/20 border-t-mint-500 rounded-full animate-spin"></div>
    </div>
  ),
});

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  
  // Stats counter state
  const [stats, setStats] = useState({ members: 0, projects: 0, events: 0 });

  useEffect(() => {
    // Load events and projects
    import("@/content/events.json").then((data) => {
      setEvents(data.default.filter((e: any) => e.status === "upcoming").slice(0, 2));
    });
    import("@/content/projects.json").then((data) => {
      setProjects(data.default.slice(0, 3));
    });

    // Animate stats
    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setStats({
        members: Math.floor((120 / steps) * step),
        projects: Math.floor((15 / steps) * step),
        events: Math.floor((30 / steps) * step),
      });

      if (step >= steps) {
        clearInterval(timer);
        setStats({ members: 120, projects: 15, events: 30 });
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const domains = [
    {
      title: "Web Development",
      icon: <Code2 className="text-mint-500" size={24} />,
      desc: "Building highly interactive interfaces, standardizing framework modules, and serving compilation APIs.",
    },
    {
      title: "Artificial Intelligence",
      icon: <BrainCircuit className="text-mint-500" size={24} />,
      desc: "Optimizing fine-tunes, agent pipelines, local transformers, and web WASM inference engines.",
    },
    {
      title: "Competitive Programming",
      icon: <Terminal className="text-mint-500" size={24} />,
      desc: "Analyzing algorithms, tree structures, dynamic programming constraints, and time complexities.",
    },
    {
      title: "Cybersecurity",
      icon: <ShieldAlert className="text-mint-500" size={24} />,
      desc: "Hardening firmware gateways, securing local tunnels, encrypting signed keys, and threat modeling.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
        <NetworkScene />
        
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 bg-bg-surface border border-border-subtle px-3 py-1 rounded-full text-xs font-mono text-mint-500 mb-8">
            <span className="w-2 h-2 rounded-full bg-mint-500 animate-pulse"></span>
            <span>SYSTEM ACTIVE — ADMISSIONS OPEN</span>
          </div>

          <h1 className="font-display font-semibold text-5xl md:text-7xl tracking-tight leading-[1.05] text-text-primary max-w-4xl mb-6">
            Where curious minds compile into a <span className="text-mint-500 text-glow">community</span>
          </h1>

          <p className="font-sans text-text-secondary text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            We turn late-night bugs into working code. VAMINT is the technical coding club dedicated to deep systems, compilers, web tech, and robust execution.
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

      {/* Core Domains */}
      <section className="py-24 bg-bg-primary border-t border-border-subtle relative z-10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="max-w-xl mb-16">
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-text-primary mb-4">
              What we focus on
            </h2>
            <p className="font-sans text-text-secondary">
              VAMINT operates across specialized divisions designed to foster peer learning and build production-grade solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {domains.map((domain, i) => (
              <Card key={i} hoverGlow className="flex flex-col space-y-4">
                <div className="p-3 bg-bg-surface-raised border border-border-subtle rounded-md w-fit">
                  {domain.icon}
                </div>
                <h3 className="font-display font-semibold text-xl text-text-primary">
                  {domain.title}
                </h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">
                  {domain.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter Strip */}
      <section className="py-12 bg-bg-surface border-y border-border-subtle">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="font-display text-4xl md:text-5xl font-semibold text-mint-500 text-glow">
                {stats.members}+
              </div>
              <div className="font-mono text-xs text-text-tertiary uppercase tracking-wider mt-2">
                Active Members
              </div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-semibold text-mint-500 text-glow">
                {stats.projects}+
              </div>
              <div className="font-mono text-xs text-text-tertiary uppercase tracking-wider mt-2">
                Projects Shipped
              </div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl font-semibold text-mint-500 text-glow">
                {stats.events}+
              </div>
              <div className="font-mono text-xs text-text-tertiary uppercase tracking-wider mt-2">
                Events & Contests
              </div>
            </div>
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
              className="text-mint-500 hover:text-mint-400 font-sans text-sm font-semibold flex items-center gap-1 w-fit group"
            >
              View all events
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.length > 0 ? (
              events.map((event) => (
                <Card key={event.slug} className="flex flex-col md:flex-row gap-6 hover:border-mint-500/30 transition-all duration-300">
                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 text-xs font-mono text-mint-500 mb-2">
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
              className="text-mint-500 hover:text-mint-400 font-sans text-sm font-semibold flex items-center gap-1 w-fit group"
            >
              View all projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.slug} className="flex flex-col justify-between h-full hover:border-mint-500/30 transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 bg-mint-500/10 border border-mint-500/20 text-mint-500 text-xs font-mono rounded">
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
                    className="text-text-primary hover:text-mint-500 transition-colors font-sans text-xs font-semibold flex items-center gap-1"
                  >
                    Details <ArrowRight size={12} />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Member Testimonials */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="max-w-xl mb-16 text-center mx-auto">
            <h2 className="font-display font-semibold text-3xl md:text-4xl text-text-primary mb-4">
              Member Voices
            </h2>
            <p className="font-sans text-text-secondary">
              What it feels like to compile, ship, and lead with our crew.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="flex flex-col justify-between space-y-6">
              <p className="font-sans text-text-secondary italic leading-relaxed">
                &ldquo;VAMINT isn't just about syntax; it's about systems. I joined as a sophomore web developer and left with a deep understanding of compiled WASM architectures.&rdquo;
              </p>
              <div>
                <h4 className="font-display font-semibold text-text-primary">Mrunmayee Kokitkar</h4>
                <p className="font-mono text-xs text-text-tertiary">Vice President — Class of 27</p>
              </div>
            </Card>
            <Card className="flex flex-col justify-between space-y-6">
              <p className="font-sans text-text-secondary italic leading-relaxed">
                &ldquo;Admissions allowed me to collaborate with seniors on real cryptography and hardware routing. It bridges academic ideas with functional code.&rdquo;
              </p>
              <div>
                <h4 className="font-display font-semibold text-text-primary">Rohan Deshmukh</h4>
                <p className="font-mono text-xs text-text-tertiary">Senior Contributor — Class of 26</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 bg-bg-surface border-t border-border-subtle relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 className="font-display font-semibold text-4xl md:text-5xl text-text-primary mb-6 max-w-xl mx-auto">
            Build the systems of tomorrow
          </h2>
          <p className="font-sans text-text-secondary max-w-lg mx-auto mb-10">
            Admissions for the upcoming academic cycle are now open. Challenge your coding limits.
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
