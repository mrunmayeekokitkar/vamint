import Link from "next/link";
import { Terminal } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-md">
        {/* Terminal Header icon */}
        <div className="p-4 bg-bg-surface border border-border-subtle rounded-full w-fit mx-auto">
          <Terminal size={32} className="text-error-500" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs text-error-500 tracking-wider">
            [ EXIT_CODE: 404_PAGE_NOT_FOUND ]
          </span>
          <h1 className="font-display font-semibold text-3xl md:text-4xl text-text-primary">
            Route compile failed
          </h1>
          <p className="font-sans text-sm text-text-secondary leading-relaxed">
            The target URL path could not be resolved by the system router. It may have been moved, deleted, or pointer dereferencing failed.
          </p>
        </div>

        <Button variant="primary" href="/">
          Return to root directory
        </Button>
      </div>
    </div>
  );
}
