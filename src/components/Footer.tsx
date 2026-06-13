import { profile } from "@/data/portfolioData";
import { Terminal } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 py-8 text-zinc-500 font-mono text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: copyright & name */}
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-zinc-700" />
          <span>
            © {currentYear} {profile.name}. All Rights Reserved.
          </span>
        </div>

        {/* Center/Right: engineering parameters */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-zinc-600 justify-center">
          <span>Stack: Next.js 15+, React 19, TS</span>
          <span className="hidden sm:inline">|</span>
          <span>A11y Compliant</span>
          <span className="hidden sm:inline">|</span>
          <span>SEO Optimized (100)</span>
        </div>
      </div>
    </footer>
  );
}
