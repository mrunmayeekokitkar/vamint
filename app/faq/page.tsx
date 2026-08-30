"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQGroup {
  category: string;
  items: FAQItem[];
}

const faqData: FAQGroup[] = [
  {
    category: "About VAMINT",
    items: [
      {
        question: "What is VAMINT?",
        answer:
          "VAMINT is GSMCOE's student tech community. We bring students together through technical events, competitions, workshops, projects, and activities so students can learn, build, collaborate, and grow.",
      },
      {
        question: "Who can join VAMINT?",
        answer:
          "VAMINT is open to students who are interested in learning, technology, creativity, and being part of a student community. You do not need to be an expert or have advanced technical skills to get involved.",
      },
    ],
  },
  {
    category: "Joining VAMINT",
    items: [
      {
        question: "How can I join VAMINT?",
        answer:
          "You can apply through the Join page on our website when recruitment is open. Follow our social media and announcements for updates about upcoming recruitment opportunities.",
      },
      {
        question: "Do I need coding experience to join?",
        answer:
          "No. Curiosity and willingness to learn are more important than existing experience. VAMINT welcomes students at different skill levels.",
      },
      {
        question: "Can students from any branch join?",
        answer:
          "Yes. Students from different branches and academic years are welcome to participate in the VAMINT community.",
      },
    ],
  },
  {
    category: "Events & Activities",
    items: [
      {
        question: "What kind of events does VAMINT organize?",
        answer:
          "We organize technical events, competitions, hackathons, workshops, community activities, and soft-skills events such as debates and collaborative sessions.",
      },
      {
        question: "Are VAMINT events open to everyone?",
        answer:
          "Many of our events are open to students beyond the VAMINT community. Event details and eligibility information will always be mentioned on the individual event page.",
      },
      {
        question: "Where can I find upcoming events?",
        answer:
          "You can visit the Events page on our website to see upcoming events and explore our past event archive.",
      },
    ],
  },
  {
    category: "Projects & Community",
    items: [
      {
        question: "Can I showcase my project through VAMINT?",
        answer:
          "Yes. VAMINT encourages students to build and share projects. Student projects can be featured through our community and showcased on the website.",
      },
      {
        question: "How can I stay updated with VAMINT?",
        answer:
          "You can follow VAMINT on LinkedIn and Instagram, and check our website regularly for updates about events, projects, recruitment, and community activities.",
      },
    ],
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const key = `${categoryIndex}-${itemIndex}`;

    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-[800px] mx-auto px-6 w-full">
        {/* Header */}
        <div className="mb-16">
          <div className="font-mono text-xs text-yellow-500 uppercase tracking-wider mb-3">
            [ Frequently Asked Questions ]
          </div>

          <h1 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-text-primary mb-6">
            Got questions?
          </h1>

          <p className="font-sans text-text-secondary text-base leading-relaxed max-w-2xl">
            Find answers to common questions about VAMINT, joining the
            community, our events, projects, and student activities.
          </p>
        </div>

        {/* FAQ Groups */}
        <div className="space-y-12">
          {faqData.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-4">
              {/* Category */}
              <h2 className="font-mono text-xs font-semibold text-text-tertiary tracking-wider uppercase border-b border-border-subtle/50 pb-3">
                {group.category}
              </h2>

              <div className="space-y-3">
                {group.items.map((item, itemIdx) => {
                  const key = `${groupIdx}-${itemIdx}`;
                  const isOpen = openItems[key] || false;

                  return (
                    <Card
                      key={itemIdx}
                      className="p-0 border border-border-subtle overflow-hidden hover:border-yellow-500/30 transition-colors duration-300"
                    >
                      {/* Question */}
                      <button
                        onClick={() => toggleItem(groupIdx, itemIdx)}
                        className="w-full text-left p-5 flex items-center justify-between gap-6 text-text-primary hover:text-yellow-500 transition-colors focus:outline-none"
                        aria-expanded={isOpen}
                      >
                        <span className="font-display font-semibold text-base">
                          {item.question}
                        </span>

                        <span className="shrink-0">
                          {isOpen ? (
                            <Minus size={18} className="text-yellow-500" />
                          ) : (
                            <Plus size={18} className="text-text-tertiary" />
                          )}
                        </span>
                      </button>

                      {/* Answer */}
                      {isOpen && (
                        <div className="px-5 pb-5 border-t border-border-subtle/30 pt-4 bg-bg-surface-raised/30">
                          <p className="font-sans text-sm text-text-secondary leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
