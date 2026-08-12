"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import { Link2, ExternalLink, MessageSquareCode } from "lucide-react";

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    import("@/content/team.json").then((data) => {
      setTeamMembers(data.default);
    });
  }, []);

  const coreCommittee = teamMembers.filter((m) => m.category === "Core Committee");
  const advisors = teamMembers.filter((m) => m.category === "Advisory");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-[1280px] mx-auto px-6 md:px-12 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="font-mono text-xs text-mint-500 uppercase tracking-wider mb-3">
            [ Core Committee ]
          </div>
          <h1 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-text-primary mb-6">
            The developers behind VAMINT
          </h1>
          <p className="font-sans text-text-secondary text-base">
            We are student developers, designers, and leads organizing workshops, coding sprints, and coordinating repositories. Hover over cards to reveal local compiler configurations and fun facts.
          </p>
        </div>

        {/* Core Committee Grid */}
        <div className="mb-20">
          <h2 className="font-mono text-xs font-semibold text-text-tertiary tracking-wider uppercase mb-8 border-b border-border-subtle/50 pb-2">
            Admissions & Exec Committee
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreCommittee.map((member) => (
              <Card
                key={member.name}
                className="group relative flex flex-col justify-between h-[360px] overflow-hidden"
              >
                {/* Regular Info */}
                <div className="space-y-4 transition-all duration-300 group-hover:-translate-y-2">
                  <div className="w-16 h-16 rounded bg-bg-surface-raised border border-border-subtle flex items-center justify-center font-display font-semibold text-xl text-text-secondary">
                    {member.name.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-text-primary">
                      {member.name}
                    </h3>
                    <p className="font-mono text-xs text-mint-500 mt-1">{member.role}</p>
                  </div>
                  <p className="font-sans text-xs text-text-secondary leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Fun Fact overlay on hover */}
                <div className="absolute inset-0 bg-bg-surface-raised p-6 flex flex-col justify-between border border-mint-500/30 rounded-lg translate-y-[100%] transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-mint-500">
                      <MessageSquareCode size={16} />
                      <span className="font-mono text-[10px] uppercase tracking-wider">LOCAL_FACT.LOG</span>
                    </div>
                    <p className="font-sans text-xs text-text-primary leading-relaxed italic">
                      &ldquo;{member.funFact}&rdquo;
                    </p>
                  </div>
                  
                  {/* Social links */}
                  <div className="flex space-x-3">
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-text-primary transition-colors"
                      >
                        <Link2 size={16} />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-text-primary transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Social links (visible state in card base) */}
                <div className="flex space-x-3 mt-4 pt-4 border-t border-border-subtle/30">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-text-primary transition-colors"
                    >
                      <Link2 size={16} />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-text-primary transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Advisory / Faculty Section */}
        {advisors.length > 0 && (
          <div>
            <h2 className="font-mono text-xs font-semibold text-text-tertiary tracking-wider uppercase mb-8 border-b border-border-subtle/50 pb-2">
              Advisory Board
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
              {advisors.map((member) => (
                <Card key={member.name} className="flex gap-6 items-start">
                  <div className="w-16 h-16 rounded bg-bg-surface-raised border border-border-subtle flex-shrink-0 flex items-center justify-center font-display font-semibold text-xl text-text-secondary">
                    {member.name.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-display font-semibold text-lg text-text-primary">
                        {member.name}
                      </h3>
                      <p className="font-mono text-xs text-mint-500 mt-0.5">{member.role}</p>
                    </div>
                    <p className="font-sans text-xs text-text-secondary leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
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
