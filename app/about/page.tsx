"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import { GraduationCap, Users2, Rocket } from "lucide-react";

export default function About() {
  const [achievements, setAchievements] = useState<{ title: string; description: string; year: string; }[]>([]);

  useEffect(() => {
    import("@/content/achievements.json").then((data) => {
      setAchievements(data.default);
    });
  }, []);

  const milestones = [
    { year: "2026", title: "Technobash & Debate Competition", desc: "VAMINT co-organized the college's main technical fest Technobash 2026, and ran a standalone Debate Competition to celebrate soft-skills development." },
    { year: "2025", title: "SIH Internal Hackathon & Sitecraft", desc: "Ran our first internal hackathon with 160+ participants across 25+ teams as an SIH selection round. Followed up with Sitecraft 2025 — a website-cloning challenge." },
    { year: "2024", title: "Club Founded", desc: "VAMINT was officially established with a core group of students committed to building a community around coding, collaboration, and growth." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Hero Info */}
        <div className="max-w-3xl mb-20">
          <div className="font-mono text-xs text-yellow-500 uppercase tracking-wider mb-3">
            [ Origin &amp; Story ]
          </div>
          <h1 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-text-primary mb-6">
            A community that codes, collaborates, and evolves together
          </h1>
          <p className="font-sans text-text-secondary text-lg leading-relaxed">
            VAMINT is our college&apos;s student tech community. We run events, workshops, competitions, and soft-skills programs to help students grow in all directions — not just technically. Whether you&apos;re building your first project or preparing for a hackathon, there&apos;s a place for you here.
          </p>
        </div>

        {/* Mission / Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <Card hoverGlow className="flex flex-col space-y-3">
            <Rocket className="text-yellow-500 mb-2" size={24} />
            <h3 className="font-display font-semibold text-lg text-text-primary">Peer Learning</h3>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              We bridge experience gaps by pairing students who want to learn with those who want to teach — because both sides grow in the process.
            </p>
          </Card>
          <Card hoverGlow className="flex flex-col space-y-3">
            <GraduationCap className="text-yellow-500 mb-2" size={24} />
            <h3 className="font-display font-semibold text-lg text-text-primary">Practical Events</h3>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              From hackathons to web-dev competitions to debates — every event is hands-on. We&apos;re not here for theory; we&apos;re here to do things.
            </p>
          </Card>
          <Card hoverGlow className="flex flex-col space-y-3">
            <Users2 className="text-yellow-500 mb-2" size={24} />
            <h3 className="font-display font-semibold text-lg text-text-primary">Real Community</h3>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              We&apos;re friendly, inclusive, and informal. No gatekeeping, no jargon for its own sake — just students helping each other get better.
            </p>
          </Card>
        </div>

        {/* Timeline Section */}
        <div className="mb-24" id="achievements">
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-text-primary mb-12">
            Timeline &amp; Milestones
          </h2>
          <div className="relative border-l border-border-subtle pl-6 md:pl-10 space-y-12">
            {milestones.map((m, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <span className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3 h-3 rounded-full bg-yellow-500 ring-4 ring-bg-primary"></span>
                <span className="font-mono text-xs text-yellow-500 mb-1 block">{m.year}</span>
                <h3 className="font-display font-semibold text-lg text-text-primary mb-2">{m.title}</h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-xl">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements from JSON */}
        {achievements.length > 0 && (
          <div>
            <h2 className="font-display font-semibold text-2xl md:text-3xl text-text-primary mb-12">
              Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((a, i) => (
                <Card key={i} className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-yellow-500">{a.year}</span>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-text-primary">{a.title}</h3>
                  <p className="font-sans text-sm text-text-secondary leading-relaxed">{a.description}</p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
