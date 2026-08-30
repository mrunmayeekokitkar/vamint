"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import { ArrowRight } from "lucide-react";

const DOMAINS = [
  {
    key: "Web Development",
    label: "Web Development",
    desc: "Frontend, backend, full-stack, and everything in between. Building for the web, one project at a time.",
  },
  {
    key: "Artificial Intelligence",
    label: "Artificial Intelligence",
    desc: "Machine learning, data science, and AI tools. Exploring what's possible when you teach machines to think.",
  },
  {
    key: "Competitive Programming",
    label: "Competitive Programming",
    desc: "Algorithms, data structures, and problem-solving under pressure. Training for contests and sharpening fundamentals.",
  },
  {
    key: "Cybersecurity",
    label: "Cybersecurity",
    desc: "CTFs, ethical hacking, and security concepts. Understanding how systems can be broken, so we can build them better.",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    import("@/content/projects.json").then((data) => {
      setProjects(data.default);
    });
  }, []);

  const categories = ["All", ...DOMAINS.map((d) => d.key)];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // For the domain sections view (when "All" is selected), group by domain
  const showDomainSections = selectedCategory === "All";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-[1280px] mx-auto px-6 md:px-12 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="font-mono text-xs text-yellow-500 uppercase tracking-wider">
              [ Student Projects ]
            </div>
            <h1 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-text-primary">
              Student Projects
            </h1>
            <p className="font-sans text-text-secondary text-base">
              Projects built by VAMINT members across our four focus areas.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-md font-sans text-xs font-semibold tracking-wide transition-all border ${
                  selectedCategory === cat
                    ? "bg-yellow-500/10 border-yellow-500 text-yellow-500"
                    : "bg-bg-surface border-border-subtle text-text-secondary hover:text-text-primary hover:border-border-subtle/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Domain Sections (All view) */}
        {showDomainSections ? (
          <div className="space-y-16">
            {DOMAINS.map((domain) => {
              const domainProjects = projects.filter(
                (p) => p.category === domain.key
              );

              return (
                <div key={domain.key}>
                  {/* Domain heading */}
                  <div className="mb-6 pb-3 border-b border-border-subtle/50">
                    <h2 className="font-display font-semibold text-xl text-text-primary mb-1">
                      {domain.label}
                    </h2>
                    <p className="font-sans text-sm text-text-secondary">
                      {domain.desc}
                    </p>
                  </div>

                  {domainProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {domainProjects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-10 px-6 border border-dashed border-border-subtle rounded-lg text-center">
                      <p className="font-mono text-xs text-text-tertiary uppercase tracking-wider mb-1">
                        [ Coming Soon ]
                      </p>
                      <p className="font-sans text-sm text-text-secondary">
                        No {domain.label} projects listed yet. Check back soon.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Single-domain filtered view */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))
            ) : (
              <div className="col-span-3 py-16 text-center border border-dashed border-border-subtle rounded-lg">
                <p className="font-mono text-xs text-text-tertiary uppercase tracking-wider mb-1">
                  [ Coming Soon ]
                </p>
                <p className="font-sans text-sm text-text-secondary">
                  No projects in this category yet. Check back soon.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <Card hoverGlow className="flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-mono rounded">
            {project.category}
          </span>
        </div>

        <div>
          <h3 className="font-display font-semibold text-xl text-text-primary mb-2">
            {project.title}
          </h3>
          <p className="font-sans text-sm text-text-secondary leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-border-subtle/50 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag: string) => (
            <span key={tag} className="text-[11px] font-mono text-text-tertiary">
              #{tag}
            </span>
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="text-text-primary hover:text-yellow-500 transition-colors font-sans text-xs font-semibold flex items-center gap-1 shrink-0"
        >
          Details <ArrowRight size={12} />
        </Link>
      </div>
    </Card>
  );
}
