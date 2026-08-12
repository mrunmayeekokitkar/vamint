"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import { Award, ShieldAlert, GraduationCap, Trophy, Users2, Rocket } from "lucide-react";

export default function About() {
  const [achievements, setAchievements] = useState<any[]>([]);

  useEffect(() => {
    import("@/content/achievements.json").then((data) => {
      setAchievements(data.default);
    });
  }, []);

  const milestones = [
    { year: "2026", title: "Smart Web Win", desc: "First place at the National Web hackathon compiling offline-first relief map compilers." },
    { year: "2025", title: "GitHub Campus Integration", desc: "Secured formal registry and server credits from GitHub Campus Program." },
    { year: "2024", title: "Club Foundations", desc: "VAMINT is officially established with 15 initial developers aiming to build custom terminal compilers." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Hero Info */}
        <div className="max-w-3xl mb-20">
          <div className="font-mono text-xs text-mint-500 uppercase tracking-wider mb-3">
            [ Origin & Story ]
          </div>
          <h1 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-text-primary mb-6">
            Building digital systems with mechanical precision
          </h1>
          <p className="font-sans text-text-secondary text-lg leading-relaxed">
            VAMINT is the Technical Coding Club. We operate at the intersection of clean user interfaces, fast compilations, local intelligence pipelines, and reliable cybersecurity. We are built for those who prefer shipping actual systems to debating design templates.
          </p>
        </div>

        {/* Mission / Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <Card className="flex flex-col space-y-3">
            <Rocket className="text-mint-500 mb-2" size={24} />
            <h3 className="font-display font-semibold text-lg text-text-primary">Peer Mentorship</h3>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              We bridge academic gaps by teaming junior developers with seniors shipping functional web systems and compiler engines.
            </p>
          </Card>
          <Card className="flex flex-col space-y-3">
            <GraduationCap className="text-mint-500 mb-2" size={24} />
            <h3 className="font-display font-semibold text-lg text-text-primary">Practical Systems</h3>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              No generic theory. Every semester is centered around shipping 2-3 production-grade open-source tools to GitHub campus registry.
            </p>
          </Card>
          <Card className="flex flex-col space-y-3">
            <Users2 className="text-mint-500 mb-2" size={24} />
            <h3 className="font-display font-semibold text-lg text-text-primary">Clean Collaboration</h3>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              We cultivate a community that is confident, quiet, and collaborative. We communicate in pull requests and clean code.
            </p>
          </Card>
        </div>

        {/* Timeline Section */}
        <div className="mb-24">
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-text-primary mb-12">
            Timeline & Milestones
          </h2>
          <div className="relative border-l border-border-subtle pl-6 md:pl-10 space-y-12">
            {milestones.map((m, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <span className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3 h-3 rounded-full bg-mint-500 ring-4 ring-bg-primary"></span>
                <span className="font-mono text-xs text-mint-500 mb-1 block">{m.year}</span>
                <h3 className="font-display font-semibold text-lg text-text-primary mb-2">{m.title}</h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-xl">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div id="achievements" className="mb-24 scroll-mt-24">
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-text-primary mb-8 flex items-center gap-2">
            <Award size={24} className="text-mint-500" />
            Club Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((group, index) => (
              <Card key={index} className="space-y-6">
                <div className="font-mono text-xs font-semibold text-mint-500 border-b border-border-subtle/50 pb-2">
                  Year {group.year}
                </div>
                <div className="space-y-4">
                  {group.achievements.map((a: any, i: number) => (
                    <div key={i} className="space-y-1">
                      <h4 className="font-display font-semibold text-sm text-text-primary flex items-center gap-1.5">
                        <Trophy size={14} className="text-mint-500" />
                        {a.title}
                      </h4>
                      <p className="font-sans text-xs text-text-secondary leading-relaxed pl-5">
                        {a.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Faculty Quote */}
        <div className="bg-bg-surface border border-border-subtle rounded-lg p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
            <div className="w-20 h-20 bg-bg-surface-raised border border-border-subtle rounded-full flex-shrink-0 flex items-center justify-center font-display text-text-secondary font-semibold text-2xl">
              VM
            </div>
            <div className="space-y-4">
              <p className="font-sans text-text-secondary italic leading-relaxed text-base">
                &ldquo;Engineering education requires translation of theory into actual execution. VAMINT gives students the community they need to build real-world systems, compilers, and products early in their developer journey.&rdquo;
              </p>
              <div>
                <h4 className="font-display font-semibold text-text-primary">Dr. Vivek Murthy</h4>
                <p className="font-mono text-xs text-text-tertiary">Faculty Coordinator, CS & Engineering Department</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
