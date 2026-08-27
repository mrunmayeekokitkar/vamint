"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "About", path: "/about" },
  { name: "Events", path: "/events" },
  { name: "Projects", path: "/projects" },
  { name: "Team", path: "/team" },
  { name: "Gallery", path: "/gallery" },
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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-bg-surface/90 backdrop-blur-md border-b border-border-subtle py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center group"
          aria-label="VAMINT Home"
        >
        <Image
  src="/logo.jpg"
  alt="VAMINT"
  width={120}
  height={48}
  className="h-16 w-16 object-cover rounded-full border-2 border-yellow-500 p-0.5"
  priority
/>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative font-sans text-base font-semibold tracking-wide transition-colors py-1 ${
                  isActive
                    ? "text-yellow-500"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {item.name}

                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-yellow-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/join"
            className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-bg-primary rounded-md font-sans text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_18px_rgba(244,202,48,0.2)]"
          >
            Join VAMINT
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-[73px] bg-bg-primary z-40 lg:hidden border-t border-border-subtle">
          <nav className="flex flex-col px-8 pt-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-display text-2xl font-semibold tracking-wide py-5 border-b border-border-subtle/50 flex items-center justify-between ${
                    isActive
                      ? "text-yellow-500"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <span>{item.name}</span>

                  {isActive && (
                    <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                  )}
                </Link>
              );
            })}

            <Link
              href="/join"
              onClick={() => setIsOpen(false)}
              className="mt-8 w-full text-center py-4 bg-yellow-500 text-bg-primary rounded-md font-sans font-semibold transition-all duration-200 hover:bg-yellow-400"
            >
              Join VAMINT
            </Link>

            <Link
              href="/legal/code-of-conduct"
              onClick={() => setIsOpen(false)}
              className="mt-5 text-center text-sm text-text-tertiary hover:text-text-secondary transition-colors"
            >
              Code of Conduct
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}