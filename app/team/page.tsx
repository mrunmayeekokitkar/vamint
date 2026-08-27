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

  const coreCommittee = teamMembers.filter(
    (m) => m.category === "Core Committee"
  );

  const advisors = teamMembers.filter(
    (m) => m.category === "Advisory"
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-[1280px] mx-auto px-6 md:px-12 w-full">

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="font-mono text-xs text-yellow-500 uppercase tracking-wider mb-3">
            [ Meet the Team ]
          </div>

          <h1 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-text-primary mb-6">
            Meet the people behind VAMINT
          </h1>

          <p className="font-sans text-text-secondary text-base leading-relaxed">
            Meet the students behind VAMINT — the people who plan events,
            build projects, organize activities, and help the community grow.
          </p>
        </div>

        {/* Core Committee */}
        <div className="mb-20">
          <h2 className="font-mono text-xs font-semibold text-text-tertiary tracking-wider uppercase mb-8 border-b border-border-subtle/50 pb-2">
            Core Committee
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreCommittee.map((member) => (
              <Card
                key={member.name}
                hoverGlow
                className="flex flex-col h-full"
              >
                {/* Initials */}
                <div className="w-16 h-16 rounded-full bg-bg-surface-raised border border-border-subtle flex items-center justify-center font-display font-semibold text-xl text-text-secondary mb-5">
                  {member.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </div>

                {/* Name and Role */}
                <div className="mb-4">
                  <h3 className="font-display font-semibold text-lg text-text-primary">
                    {member.name}
                  </h3>

                  <p className="font-mono text-xs text-yellow-500 mt-1">
                    {member.role}
                  </p>
                </div>

                {/* Bio */}
                <p className="font-sans text-sm text-text-secondary leading-relaxed">
                  {member.bio}
                </p>

                {/* Fun Fact */}
                {member.funFact && (
                  <div className="mt-5 pt-4 border-t border-border-subtle/50">
                    <div className="flex items-center gap-2 text-yellow-500 mb-2">
                      <MessageSquareCode size={15} />
                      <span className="font-mono text-[10px] uppercase tracking-wider">
                        Fun Fact
                      </span>
                    </div>

                    <p className="font-sans text-xs text-text-secondary italic leading-relaxed">
                      &ldquo;{member.funFact}&rdquo;
                    </p>
                  </div>
                )}

                {/* Social Links */}
                <div className="flex space-x-4 mt-auto pt-5">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-yellow-500 transition-colors"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <Link2 size={17} />
                    </a>
                  )}

                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-yellow-500 transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <ExternalLink size={17} />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Advisory Board */}
        {advisors.length > 0 && (
          <div>
            <h2 className="font-mono text-xs font-semibold text-text-tertiary tracking-wider uppercase mb-8 border-b border-border-subtle/50 pb-2">
              Advisory Board
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
              {advisors.map((member) => (
                <Card
                  key={member.name}
                  hoverGlow
                  className="flex gap-6 items-start"
                >
                  {/* Initials */}
                  <div className="w-16 h-16 rounded-full bg-bg-surface-raised border border-border-subtle flex-shrink-0 flex items-center justify-center font-display font-semibold text-xl text-text-secondary">
                    {member.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </div>

                  <div className="space-y-2">
                    <div>
                      <h3 className="font-display font-semibold text-lg text-text-primary">
                        {member.name}
                      </h3>

                      <p className="font-mono text-xs text-yellow-500 mt-1">
                        {member.role}
                      </p>
                    </div>

                    <p className="font-sans text-sm text-text-secondary leading-relaxed">
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