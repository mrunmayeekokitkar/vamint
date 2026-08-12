"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ArrowLeft, Link2, ExternalLink, Users } from "lucide-react";

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    import("@/content/projects.json").then((data) => {
      const match = data.default.find((p: any) => p.slug === slug);
      if (match) {
        setProject(match);
      } else {
        router.push("/not-found");
      }
      setLoading(false);
    });
  }, [slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-mint-500/20 border-t-mint-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-[900px] mx-auto px-6 w-full">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors font-sans text-sm mb-8"
        >
          <ArrowLeft size={16} /> Back to projects
        </Link>

        {/* Header */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 bg-mint-500/10 border border-mint-500/20 text-mint-500 text-xs font-mono rounded">
              {project.category}
            </span>
          </div>

          <h1 className="font-display font-semibold text-3xl md:text-5xl text-text-primary">
            {project.title}
          </h1>

          <p className="font-sans text-text-secondary text-base">
            {project.description}
          </p>

          {/* Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-bg-surface border border-border-subtle hover:border-mint-500/30 text-text-secondary hover:text-text-primary rounded-md font-sans text-xs font-semibold transition-all"
              >
              <Link2 size={14} />
                View Repository
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-mint-500/10 border border-mint-500/20 hover:border-mint-500 text-mint-500 rounded-md font-sans text-xs font-semibold transition-all"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main description */}
          <div className="md:col-span-2 space-y-6">
            <Card className="space-y-4">
              <h3 className="font-mono text-xs font-semibold text-text-tertiary uppercase tracking-wider border-b border-border-subtle/50 pb-2">
                About This Project
              </h3>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                {project.longDescription}
              </p>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <Card className="space-y-3">
              <h4 className="font-mono text-[10px] font-semibold text-text-tertiary uppercase tracking-wider border-b border-border-subtle/50 pb-2">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-bg-surface-raised border border-border-subtle rounded text-xs font-mono text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>

            {/* Contributors */}
            {project.contributors && (
              <Card className="space-y-3">
                <h4 className="font-mono text-[10px] font-semibold text-text-tertiary uppercase tracking-wider border-b border-border-subtle/50 pb-2 flex items-center gap-1.5">
                  <Users size={12} className="text-mint-500" />
                  Contributors
                </h4>
                <ul className="space-y-2">
                  {project.contributors.map((c: string) => (
                    <li key={c} className="font-sans text-xs text-text-secondary flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-bg-surface-raised border border-border-subtle flex items-center justify-center text-[10px] font-display text-text-tertiary">
                        {c.split(" ").map((n: string) => n[0]).join("")}
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
