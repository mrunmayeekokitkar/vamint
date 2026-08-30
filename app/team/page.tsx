"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";

// User/Avatar icon placeholder (inline SVG)
function UserIcon({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

// Instagram icon (inline SVG)
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-4xl mx-auto px-6 w-full">
        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          <div className="font-mono text-xs text-yellow-500 uppercase tracking-wider mb-3">
            [ Meet the Team ]
          </div>

          <h1 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-text-primary mb-6">
            Meet the people behind VAMINT
          </h1>

          <p className="font-sans text-text-secondary text-base leading-relaxed">
            These are the students who plan events, build projects, keep things
            organized, and help the community grow.
          </p>
        </div>

        {/* Team Members List */}
        <div className="flex flex-col gap-6">
          {teamMembers.map((member) => (
            <Card
              key={member.name}
              hoverGlow
              className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left p-6 md:p-8 gap-6 md:gap-8 w-full"
            >
              {/* Left Column: Photo & Name */}
              <div className="flex flex-col items-center flex-shrink-0 w-32">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-bg-surface-raised border border-border-subtle flex items-center justify-center mb-3">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon size={40} className="text-text-secondary" />
                  )}
                </div>
                <h3 className="font-display font-semibold text-lg text-text-primary text-center leading-tight">
                  {member.name}
                </h3>
              </div>

              {/* Right Column: Role/Position, Bio, Socials */}
              <div className="flex flex-col flex-grow w-full md:w-auto min-h-[96px] justify-between">
                <div>
                  <div className="font-mono text-xs text-yellow-500 uppercase tracking-wider mb-2">
                    {member.role}
                  </div>
                  <p className="font-sans text-sm text-text-secondary leading-relaxed mb-4">
                    {member.bio &&
                    typeof member.bio === "string" &&
                    member.bio.trim() !== ""
                      ? member.bio
                      : "Bio coming soon."}
                  </p>
                </div>

                {/* Socials */}
                <div className="flex justify-center md:justify-start space-x-4 mt-auto">
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
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
