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
    category: "About the Club",
    items: [
      {
        question: "What actually is VAMINT?",
        answer: "VAMINT is the official technical coding club of the college. We focus on systems development, compiler logic, modern web stacks, local AI pipelines, and hardware gateways."
      },
      {
        question: "Who can join the club?",
        answer: "Admissions are open to all students across all branches and academic years who have a baseline familiarity with logical thinking and coding."
      }
    ]
  },
  {
    category: "Joining & Recruitment",
    items: [
      {
        question: "What is the recruitment process like?",
        answer: "The process is straightforward: Submit the online application, complete a brief practical task or logical review, and attend a short conversational interview."
      },
      {
        question: "Do I need to be an expert coder to apply?",
        answer: "No. We value curiosity and debugging capacity over existing syntax memorization. We have dedicated mentoring divisions for freshers."
      }
    ]
  },
  {
    category: "Events & Workshops",
    items: [
      {
        question: "Are VAMINT events open to non-members?",
        answer: "Yes, our flagship workshops, algorithm sprints, and national hackathons are open to all students. Registrations can be completed directly on the Events page."
      },
      {
        question: "How often do you coordinate sprints?",
        answer: "We run structured workshops and competitive programming contests every two weeks, with major hackathons happening once per semester."
      }
    ]
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-[800px] mx-auto px-6 w-full">
        {/* Header */}
        <div className="mb-16">
          <div className="font-mono text-xs text-mint-500 uppercase tracking-wider mb-3">
            [ Documentation ]
          </div>
          <h1 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-text-primary mb-6">
            Frequently Asked Questions
          </h1>
          <p className="font-sans text-text-secondary text-base leading-relaxed">
            Quick responses to common inquiries regarding recruitment rounds, eligibility parameters, workshop schedules, and domain criteria.
          </p>
        </div>

        {/* FAQ Groups */}
        <div className="space-y-12">
          {faqData.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-4">
              <h2 className="font-mono text-xs font-semibold text-text-tertiary tracking-wider uppercase border-b border-border-subtle/50 pb-2">
                {group.category}
              </h2>
              <div className="space-y-3">
                {group.items.map((item, itemIdx) => {
                  const key = `${groupIdx}-${itemIdx}`;
                  const isOpen = openItems[key] || false;
                  return (
                    <Card
                      key={itemIdx}
                      className="p-0 border border-border-subtle overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(groupIdx, itemIdx)}
                        className="w-full text-left p-5 flex items-center justify-between text-text-primary hover:text-mint-500 transition-colors focus:outline-none"
                      >
                        <span className="font-display font-semibold text-base">
                          {item.question}
                        </span>
                        {isOpen ? (
                          <Minus size={18} className="text-mint-500" />
                        ) : (
                          <Plus size={18} className="text-text-tertiary" />
                        )}
                      </button>
                      
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
