"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";

const navItems = [
  { name: "About", path: "/about" },
  { name: "Events", path: "/events" },
  { name: "Projects", path: "/projects" },
  { name: "Team", path: "/team" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync theme with DOM
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light") {
        setIsLight(true);
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark");
      } else {
        setIsLight(false);
        document.documentElement.classList.remove("light-mode");
        document.documentElement.classList.add("dark");
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.documentElement.classList.remove("light-mode");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsLight(false);
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsLight(true);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-bg-surface/90 backdrop-blur-md border-b border-border-subtle py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Typographic Logo */}
        <Link href="/" className="flex items-center space-x-1 group">
          <span className="font-display font-semibold text-lg tracking-wider text-text-primary">
            [ vamint ]
          </span>
          <span className="w-1.5 h-4 bg-mustard-500 animate-blink"></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative font-sans text-sm font-medium tracking-wide transition-colors py-1 ${
                  isActive
                    ? "text-mustard-500"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-mustard-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
            aria-label="Toggle Theme"
          >
            {isLight ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Link
            href="/join"
            className="px-4 py-2 border border-mustard-500/30 hover:border-mustard-500 bg-mustard-500/5 hover:bg-mustard-500/15 text-mustard-500 rounded-md font-sans text-sm font-semibold transition-all duration-200"
          >
            Join Us
          </Link>
        </div>

        {/* Mobile Nav Button */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
            aria-label="Toggle Theme"
          >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[73px] bg-bg-primary/98 z-40 md:hidden flex flex-col justify-between p-8 border-t border-border-subtle">
          <nav className="flex flex-col space-y-6 mt-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-display text-2xl font-medium tracking-wide py-2 border-b border-border-subtle/50 flex justify-between items-center ${
                    isActive ? "text-mustard-500" : "text-text-secondary"
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="w-2 h-2 bg-mustard-500 rounded-full" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col space-y-4 mb-16">
            <Link
              href="/join"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-4 bg-mustard-500 text-bg-primary rounded-md font-sans font-semibold transition-all duration-200 hover:bg-mustard-400"
            >
              Join VAMINT
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
