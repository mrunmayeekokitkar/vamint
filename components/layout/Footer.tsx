import Link from "next/link";
import { Globe, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-primary border-t border-border-subtle mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-1">
              <span className="font-display font-semibold text-lg tracking-wider text-text-primary">
                [ vamint ]
              </span>
              <span className="w-1.5 h-4 bg-mustard-500 animate-blink"></span>
            </Link>
            <p className="font-serif text-xs text-text-secondary leading-relaxed max-w-[240px]">
              Code. Collaborate. Evolve. Building together, learning together.
            </p>
          </div>

          {/* Sitemaps */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-text-tertiary tracking-wider uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-3 font-sans text-sm">
              <li>
                <Link href="/about" className="text-text-secondary hover:text-mustard-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-text-secondary hover:text-mustard-500 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-text-secondary hover:text-mustard-500 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-text-secondary hover:text-mustard-500 transition-colors">
                  Team
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold text-text-tertiary tracking-wider uppercase mb-4">
              Resources
            </h4>
            <ul className="space-y-3 font-sans text-sm">
              <li>
                <Link href="/gallery" className="text-text-secondary hover:text-mustard-500 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-text-secondary hover:text-mustard-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-mustard-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about#achievements" className="text-text-secondary hover:text-mustard-500 transition-colors flex items-center gap-1">
                  Achievements <ExternalLink size={12} className="text-mustard-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect / Socials */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-text-tertiary tracking-wider uppercase mb-4">
              Connect
            </h4>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-bg-surface border border-border-subtle rounded text-text-secondary hover:text-mustard-500 hover:border-mustard-500/30 transition-all duration-200"
                aria-label="GitHub"
              >
                <Globe size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-bg-surface border border-border-subtle rounded text-text-secondary hover:text-mustard-500 hover:border-mustard-500/30 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Globe size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-bg-surface border border-border-subtle rounded text-text-secondary hover:text-mustard-500 hover:border-mustard-500/30 transition-all duration-200"
                aria-label="Instagram"
              >
                <Globe size={18} />
              </a>
            </div>
            <p className="font-sans text-xs text-text-secondary">
              Contact:{" "}
              <a href="mailto:hello@vamint.club" className="text-text-primary hover:text-mustard-500 transition-colors">
                hello@vamint.club
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="border-t border-border-subtle/50 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-text-secondary gap-4">
          <p>&copy; {currentYear} VAMINT Coding Club. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/legal" className="hover:text-text-primary transition-colors">
              Code of Conduct & Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
