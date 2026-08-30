"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import { GraduationCap, Users2, Rocket } from "lucide-react";

export default function About() {
  const [highlights, setHighlights] = useState<{ title: string; description: string; year: string; }[]>([]);

  useEffect(() => {
    import("@/content/achievements.json").then((data) => {
      setHighlights(data.default);
    });
  }, []);

  const founders = [
    { name: "Sumit Patil", linkedin: "https://www.linkedin.com/in/timepassislife/" },
    { name: "Soham Patil", linkedin: "https://www.linkedin.com/in/soham-patil-363115251/" },
    { name: "Vedant Badve", linkedin: "https://www.linkedin.com/in/vedantbadve/" },
    { name: "Pritam Tambe", linkedin: "https://www.linkedin.com/in/pritamtambe/" },
    { name: "Pravin Tambe", linkedin: "https://www.linkedin.com/in/pravintambe01/" },
    { name: "Vaibhav Patil", linkedin: "https://www.linkedin.com/in/vaibhav-patil-1b37b3359/" },
  ];

  const milestones = [
    {
      date: "31 July 2025",
      title: "VAMINT Founded",
      desc: "VAMINT was officially founded at GSMCOE, initially serving the Computer Engineering department. A group of final-year CE students came together with a shared goal: build a real student tech community, not just another club on paper.",
    },
    {
      date: "Late 2025",
      title: "Doors Open to the Whole College",
      desc: "VAMINT expanded beyond Computer Engineering and opened up to students from all departments across GSMCOE.",
    },
    {
      date: "17 September 2025",
      title: "SIH Internal Hackathon",
      desc: "Ran our first large-scale internal hackathon with 160+ participants across 25+ teams as the college's internal selection round for Smart India Hackathon 2025.",
    },
    {
      date: "3 November 2025",
      title: "Sitecraft 2025",
      desc: "Hosted Sitecraft, a 2-hour website-cloning competition open to the whole college, structured in phases with increasing difficulty and a few fun twists.",
    },
    {
      date: "13-14 February 2026",
      title: "Technobash 2026",
      desc: "Co-organized the college's main 2-day technical fest alongside the Computer Department, covering challenges, activities, and technical events open to every student on campus.",
    },
    {
      date: "7 April 2026",
      title: "Debate Competition",
      desc: "Hosted a standalone inter-college debate competition focused on soft skills: communication, structured argumentation, and confident public speaking on topics at the intersection of technology and society.",
    },
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
          <p className="font-sans text-text-secondary text-lg leading-relaxed mb-6">
            VAMINT is GSMCOE&apos;s student tech community. We run events, workshops, competitions, and soft-skills programs to help students grow in all directions, not just technically. Whether you&apos;re building your first project or preparing for a hackathon, there&apos;s a place for you here.
          </p>

          {/* Founding Story */}
          <div className="border-l-2 border-yellow-500/40 pl-6 space-y-4">
            <p className="font-sans text-text-secondary text-base leading-relaxed">
              VAMINT was founded in 2025 by final-year students from the Computer Engineering department at GSMCOE. It started as something they wished had existed when they were in first year — a community where students could actually build things together and learn from each other.
            </p>
            <div>
              <p className="font-mono text-xs text-yellow-500 uppercase tracking-wider mb-3">Founders</p>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {founders.map((f) => (
                  <a
                    key={f.name}
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-text-secondary hover:text-yellow-500 transition-colors underline underline-offset-2"
                  >
                    {f.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mission / Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-24">
          <Card hoverGlow className="flex flex-col space-y-3">
            <Rocket className="text-yellow-500 mb-2" size={24} />
            <h3 className="font-display font-semibold text-lg text-text-primary">Peer Learning</h3>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              We bridge experience gaps by pairing students who want to learn with those who want to teach, because both sides grow in the process.
            </p>
          </Card>
          <Card hoverGlow className="flex flex-col space-y-3">
            <GraduationCap className="text-yellow-500 mb-2" size={24} />
            <h3 className="font-display font-semibold text-lg text-text-primary">Practical Events</h3>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              From hackathons to web-dev competitions to debates, every event is hands-on. We&apos;re not here for theory; we&apos;re here to do things.
            </p>
          </Card>
          <Card hoverGlow className="flex flex-col space-y-3">
            <Users2 className="text-yellow-500 mb-2" size={24} />
            <h3 className="font-display font-semibold text-lg text-text-primary">Real Community</h3>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              We&apos;re friendly, inclusive, and informal. No gatekeeping, no jargon for its own sake, just students helping each other get better.
            </p>
          </Card>
        </div>

        {/* Timeline Section */}
        <div className="mb-24" id="milestones">
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-text-primary mb-12">
            Timeline &amp; Milestones
          </h2>
          <div className="relative border-l border-border-subtle pl-6 md:pl-10 space-y-12">
            {milestones.map((m, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <span className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3 h-3 rounded-full bg-yellow-500 ring-4 ring-bg-primary"></span>
                <span className="font-mono text-xs text-yellow-500 mb-1 block">{m.date}</span>
                <h3 className="font-display font-semibold text-lg text-text-primary mb-2">{m.title}</h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-xl">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights from JSON */}
        {highlights.length > 0 && (
          <div>
            <h2 className="font-display font-semibold text-2xl md:text-3xl text-text-primary mb-12">
              Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {highlights.map((a, i) => (
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
