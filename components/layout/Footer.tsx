import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-primary border-t border-border-subtle mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">

          {/* Brand */}
          <div className="md:col-span-1 flex flex-col space-y-4">
            <Link href="/" aria-label="VAMINT Home">
              <Image
                src="/logo.jpg"
                alt="VAMINT"
                width={100}
                height={40}
                className="h-12 w-12 object-cover rounded-full border border-yellow-500/70 p-0.5"
              />
            </Link>

            <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-[240px]">
              Code. Collaborate. Evolve. A student tech community building
              together and learning together.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-text-tertiary tracking-wider uppercase mb-4">
              Navigation
            </h4>

            <ul className="space-y-3 font-sans text-sm">
              <li>
                <Link href="/about" className="text-text-secondary hover:text-yellow-500 transition-colors">
                  About
                </Link>
              </li>

              <li>
                <Link href="/events" className="text-text-secondary hover:text-yellow-500 transition-colors">
                  Events
                </Link>
              </li>

              <li>
                <Link href="/projects" className="text-text-secondary hover:text-yellow-500 transition-colors">
                  Projects
                </Link>
              </li>

              <li>
                <Link href="/team" className="text-text-secondary hover:text-yellow-500 transition-colors">
                  Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-text-tertiary tracking-wider uppercase mb-4">
              Resources
            </h4>

            <ul className="space-y-3 font-sans text-sm">
              <li>
                <Link href="/gallery" className="text-text-secondary hover:text-yellow-500 transition-colors">
                  Gallery
                </Link>
              </li>

              <li>
                <Link href="/faq" className="text-text-secondary hover:text-yellow-500 transition-colors">
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  href="/join"
                  className="text-text-secondary hover:text-yellow-500 transition-colors flex items-center gap-1"
                >
                  Join VAMINT
                  <ExternalLink size={12} className="text-yellow-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-text-tertiary tracking-wider uppercase mb-4">
              Connect
            </h4>

            <div className="flex flex-col space-y-3 mb-5">

              <a
                href="https://www.linkedin.com/company/vamint-community/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-text-secondary hover:text-yellow-500 transition-colors"
              >
                LinkedIn
              </a>

              <a
                href="https://www.instagram.com/vamintcommunity/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-text-secondary hover:text-yellow-500 transition-colors"
              >
                Instagram
              </a>

            </div>

            <p className="font-sans text-xs text-text-secondary">
              Email:{" "}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=vamintcommunity@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary hover:text-yellow-500 transition-colors"
              >
                vamintcommunity@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border-subtle/50 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-text-secondary gap-4">
          <p>&copy; {currentYear} VAMINT. All rights reserved.</p>

          <Link
            href="/legal"
            className="hover:text-yellow-500 transition-colors"
          >
            Code of Conduct &amp; Privacy
          </Link>
        </div>

      </div>
    </footer>
  );
}