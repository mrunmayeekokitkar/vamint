"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";

// Instagram icon (inline SVG — Lucide doesn't include Instagram)
function InstagramIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// GitHub icon (inline SVG)
function GitHubIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// LinkedIn icon (inline SVG)
function LinkedInIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    import("@/content/team.json").then((data) => {
      setTeamMembers(data.default);
    });
  }, []);

  // Core Leads hold President, Vice President, Secretary, Treasurer, Technical Head
  const coreLeads = teamMembers.filter((m) =>
    ["President", "Vice President", "Secretary", "Treasurer", "Technical Head"].includes(m.role)
  );

  // Committee tier holds the rest of the functional roles
  const committeeMembers = teamMembers.filter((m) =>
    !["President", "Vice President", "Secretary", "Treasurer", "Technical Head"].includes(m.role)
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
            These are the students who plan events, build projects, keep things organized, and help the community grow.
          </p>
        </div>

        {/* Core Leads Tier */}
        {coreLeads.length > 0 && (
          <div className="mb-20">
            <h2 className="font-mono text-xs font-semibold text-text-tertiary tracking-wider uppercase mb-8 border-b border-border-subtle/50 pb-2">
              Core Leads
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coreLeads.map((member, index) => {
                const isAlt = index % 2 === 1;
                // Alternate background tint
                const cardBg = isAlt ? "bg-bg-surface-raised border-yellow-500/10" : "bg-bg-surface";

                return (
                  <Card
                    key={member.name}
                    hoverGlow
                    className={`flex flex-col items-center text-center p-8 md:p-10 min-h-[460px] h-full ${cardBg}`}
                  >
                    {/* Photo / Avatar Placeholder */}
                    <div className="mb-6 flex justify-center w-full">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-24 h-24 rounded-full object-cover border-2 border-yellow-500/20"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-bg-surface-raised border-2 border-border-subtle flex items-center justify-center font-display font-semibold text-2xl text-text-secondary">
                          {member.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </div>
                      )}
                    </div>

                    {/* Name and Role */}
                    <div className="mb-4">
                      <h3 className="font-display font-semibold text-xl md:text-2xl text-text-primary">
                        {member.name}
                      </h3>

                      <p className="font-mono text-xs text-yellow-500 mt-1 uppercase tracking-wider">
                        {member.role}
                      </p>
                    </div>

                    {/* Bio */}
                    <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-md mb-6">
                      {member.bio ?? "Bio coming soon."}
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-4 mt-auto pt-4">
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-secondary hover:text-yellow-500 transition-colors p-1"
                          aria-label={`${member.name}'s GitHub`}
                        >
                          <GitHubIcon size={18} />
                        </a>
                      )}

                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-secondary hover:text-yellow-500 transition-colors p-1"
                          aria-label={`${member.name}'s LinkedIn`}
                        >
                          <LinkedInIcon size={18} />
                        </a>
                      )}

                      {member.instagram && (
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-secondary hover:text-yellow-500 transition-colors p-1"
                          aria-label={`${member.name}'s Instagram`}
                        >
                          <InstagramIcon size={18} />
                        </a>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Committee Tier */}
        {committeeMembers.length > 0 && (
          <div className="mb-20">
            <h2 className="font-mono text-xs font-semibold text-text-tertiary tracking-wider uppercase mb-8 border-b border-border-subtle/50 pb-2">
              Committee
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {committeeMembers.map((member, index) => {
                const isAlt = index % 2 === 1;
                // Alternate background tint
                const cardBg = isAlt ? "bg-bg-surface-raised border-yellow-500/10" : "bg-bg-surface";

                return (
                  <Card
                    key={member.name}
                    hoverGlow
                    className={`flex flex-col items-center text-center p-6 min-h-[380px] h-full ${cardBg}`}
                  >
                    {/* Photo / Avatar Placeholder */}
                    <div className="mb-4 flex justify-center w-full">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-16 h-16 rounded-full object-cover border border-yellow-500/10"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-bg-surface-raised border border-border-subtle flex items-center justify-center font-display font-semibold text-lg text-text-secondary">
                          {member.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </div>
                      )}
                    </div>

                    {/* Name and Role */}
                    <div className="mb-3">
                      <h3 className="font-display font-semibold text-lg text-text-primary">
                        {member.name}
                      </h3>

                      <p className="font-mono text-xs text-yellow-500 mt-1 uppercase tracking-wider">
                        {member.role}
                      </p>
                    </div>

                    {/* Bio */}
                    <p className="font-sans text-xs text-text-secondary leading-relaxed mb-4 max-w-sm">
                      {member.bio ?? "Bio coming soon."}
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-4 mt-auto pt-3">
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-secondary hover:text-yellow-500 transition-colors p-1"
                          aria-label={`${member.name}'s GitHub`}
                        >
                          <GitHubIcon size={17} />
                        </a>
                      )}

                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-secondary hover:text-yellow-500 transition-colors p-1"
                          aria-label={`${member.name}'s LinkedIn`}
                        >
                          <LinkedInIcon size={17} />
                        </a>
                      )}

                      {member.instagram && (
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-secondary hover:text-yellow-500 transition-colors p-1"
                          aria-label={`${member.name}'s Instagram`}
                        >
                          <InstagramIcon size={17} />
                        </a>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}