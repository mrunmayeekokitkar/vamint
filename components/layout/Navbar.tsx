"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "About", path: "/about" },
  { name: "Events", path: "/events" },
  { name: "Projects", path: "/projects" },
  { name: "Team", path: "/team" },
  { name: "FAQ", path: "/faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-warm-cream border-b-2 border-ink py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo — text wordmark */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="VAMINT Home">
          <span className="font-display font-bold text-xl text-ink tracking-tight leading-none">
            VAMINT
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono text-ink/50 border border-ink/20 px-1 py-0.5 leading-tight">
            v1.0
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative font-sans text-sm font-semibold tracking-wide transition-colors py-1 ${
                  isActive
                    ? "text-ink"
                    : "text-text-secondary hover:text-ink"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-yellow-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/join"
            className="px-4 py-2 bg-yellow-primary text-ink border-2 border-ink font-sans text-sm font-bold neo-shadow neo-shadow-hover"
          >
            Join Us →
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-ink border-2 border-ink bg-warm-cream"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[57px] bg-warm-cream z-40 md:hidden flex flex-col p-8 border-t-2 border-ink">
          <nav className="flex flex-col mt-4">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-display text-2xl font-bold tracking-wide py-4 border-b-2 border-ink flex justify-between items-center ${
                    isActive ? "text-ink" : "text-text-secondary"
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="w-3 h-3 bg-yellow-primary border-2 border-ink" />}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8">
            <Link
              href="/join"
              onClick={() => setIsOpen(false)}
              className="w-full block text-center py-4 bg-yellow-primary text-ink border-2 border-ink font-display font-bold text-lg neo-shadow"
            >
              Join VAMINT →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
