import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-warm-cream border-t-2 border-ink mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <Link href="/" aria-label="VAMINT Home">
              <span className="font-display font-bold text-2xl text-ink tracking-tight">VAMINT</span>
            </Link>
            <p className="font-serif italic text-base text-text-secondary leading-relaxed max-w-[240px]">
              Code. Collaborate. Evolve.
            </p>
            <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-[280px]">
              The student tech community at our college — building things, breaking things, and learning along the way since July 2025.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs font-bold text-ink tracking-widest uppercase mb-5 border-b-2 border-ink pb-2">
              Site
            </h4>
            <ul className="space-y-3 font-sans text-sm">
              {[
                { label: "About", path: "/about" },
                { label: "Events", path: "/events" },
                { label: "Projects", path: "/projects" },
                { label: "Team", path: "/team" },
                { label: "FAQ", path: "/faq" },
                { label: "Join Us", path: "/join" },
                { label: "Legal", path: "/legal" },
              ].map((l) => (
                <li key={l.path}>
                  <Link href={l.path} className="text-text-secondary hover:text-ink font-medium transition-colors underline-offset-2 hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-mono text-xs font-bold text-ink tracking-widest uppercase mb-5 border-b-2 border-ink pb-2">
              Connect
            </h4>
            <div className="flex flex-col gap-3 mb-6">
              <a
                href="https://www.linkedin.com/company/vamint-community/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-text-secondary hover:text-ink font-medium transition-colors underline-offset-2 hover:underline"
                aria-label="VAMINT on LinkedIn"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://www.instagram.com/vamintcommunity/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-text-secondary hover:text-ink font-medium transition-colors underline-offset-2 hover:underline"
                aria-label="VAMINT on Instagram"
              >
                Instagram ↗
              </a>
            </div>
            <p className="font-mono text-xs text-text-tertiary mb-1">Email us</p>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=vamintcommunity@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-ink font-semibold hover:underline underline-offset-2"
            >
              vamintcommunity@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t-2 border-ink pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-text-secondary gap-3">
          <p className="font-mono">© {currentYear} VAMINT. All rights reserved.</p>
          <Link href="/legal" className="font-mono hover:text-ink transition-colors underline underline-offset-2">
            Code of Conduct &amp; Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
