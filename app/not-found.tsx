import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="font-display font-semibold text-5xl md:text-6xl text-mustard-500">
            404
          </h1>
          <h2 className="font-serif text-2xl text-text-primary italic">
            Page not found
          </h2>
          <p className="font-sans text-sm text-text-secondary leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>

        <Button variant="primary" href="/" className="inline-flex items-center gap-2">
          <ArrowLeft size={16} />
          Back to Home
        </Button>
      </div>
    </div>
  );
}
