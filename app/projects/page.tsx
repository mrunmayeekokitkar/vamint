"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import { ArrowRight, Code } from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    import("@/content/projects.json").then((data) => {
      setProjects(data.default);
    });
  }, []);

  const categories = ["All", "Web Dev", "AI/ML", "Cybersecurity"];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-[1280px] mx-auto px-6 md:px-12 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="font-mono text-xs text-mustard-500 uppercase tracking-wider">
              [ Compilation Registry ]
            </div>
            <h1 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-text-primary">
              Student Projects
            </h1>
            <p className="font-sans text-text-secondary text-base">
              A public repository showcase of compilations and tools built by VAMINT developers.
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
                    ? "bg-mustard-500/10 border-mustard-500 text-mustard-500"
                    : "bg-bg-surface border-border-subtle text-text-secondary hover:text-text-primary hover:border-border-subtle/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Card
                key={project.slug}
                className="flex flex-col justify-between hover:border-mustard-500/30 transition-all duration-300 h-full"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-mustard-500/10 border border-mustard-500/20 text-mustard-500 text-xs font-mono rounded">
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
                    className="text-text-primary hover:text-mustard-500 transition-colors font-sans text-xs font-semibold flex items-center gap-1 shrink-0"
                  >
                    Details <ArrowRight size={12} />
                  </Link>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-3 py-16 text-center text-text-secondary font-sans border border-dashed border-border-subtle rounded-lg">
              No projects compiled in this category yet.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
