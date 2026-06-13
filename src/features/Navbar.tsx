"use client";

import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/portfolioData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "Projects", href: "/#projects" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Experience", href: "/#experience" },
  { name: "Education", href: "/#education" },
  { name: "Services", href: "/#services" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Optimized Scroll Spy using cached offsets to prevent layout thrashing
  useEffect(() => {
    const sectionIds = ["home", "projects", "about", "skills", "experience", "education", "services", "contact"];
    let sectionOffsets: { id: string; top: number; bottom: number }[] = [];

    const calculateOffsets = () => {
      sectionOffsets = sectionIds.map((id) => {
        const el = document.getElementById(id);
        if (el) {
          let top = 0;
          let currentEl = el;
          while (currentEl) {
            top += currentEl.offsetTop;
            currentEl = currentEl.offsetParent as HTMLElement;
          }
          const height = el.offsetHeight;
          return { id, top, bottom: top + height };
        }
        return { id, top: 0, bottom: 0 };
      });
    };

    // Calculate offsets on load and window resize
    calculateOffsets();
    window.addEventListener("resize", calculateOffsets);
    
    // Fallback delay to handle asynchronous layout renders/image loadings
    const timeoutId = setTimeout(calculateOffsets, 1000);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // Trigger bottom edge override (e.g. Mobile view rubber-banding)
      const isAtBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      // Trigger top edge override
      if (scrollY < 50) {
        setActiveSection("home");
        return;
      }

      // Check current section based on a 40% viewport height focal point
      const focalPoint = scrollY + window.innerHeight * 0.4;
      const active = sectionOffsets.find(
        (sec) => focalPoint >= sec.top && focalPoint < sec.bottom
      );

      if (active) {
        setActiveSection(active.id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("resize", calculateOffsets);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const isHome = pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div
        className={`w-full transition-all duration-500 ${
          scrolled || mobileMenuOpen
            ? "bg-zinc-950/90 border-b border-zinc-900/60 backdrop-blur-xl"
            : "bg-transparent border-b border-transparent"
        } h-[72px] flex items-center justify-between px-6 sm:px-10 lg:px-16`}
      >
        {/* Brand Mark with icon.PNG */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 group-hover:border-emerald-500/30 transition duration-300 shadow-md flex items-center justify-center shrink-0">
            <Image
              src="/icon.PNG"
              alt="Mohammed Ihsan Icon Logo"
              fill
              sizes="40px"
              priority
              className="object-cover"
            />
          </div>
          <div className="hidden sm:flex flex-col text-left font-mono">
            <span className="text-xs font-bold text-zinc-100 leading-none tracking-wider uppercase">Mohammed Ihsan</span>
            <span className="text-[9px] text-zinc-500 uppercase tracking-[0.2em] leading-none mt-1.5">Full Stack MERN Developer</span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, idx) => {
            const sectionId = link.href.split("#")[1] || "";
            const isActive = isHome && activeSection === sectionId;
            
            return (
              <Link
                key={`${link.href}-${idx}`}
                href={link.href}
                className="relative px-4 py-2 group flex items-center justify-center cursor-pointer"
              >
                <span className={`text-[11px] font-mono font-bold uppercase tracking-[0.18em] transition-colors duration-300 relative z-10 ${
                  isActive ? "text-emerald-400" : "text-zinc-500 group-hover:text-zinc-300"
                }`}>
                  {link.name}
                </span>

                {/* Animated active underline bar with green glow */}
                {isActive && (
                  <motion.span
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-emerald-400 rounded-full shadow-[0_0_12px_#10b981,0_0_4px_#10b981]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Gray hover line for non-active links */}
                {!isActive && (
                  <span className="absolute bottom-0 left-[25%] right-[25%] h-[1.5px] bg-zinc-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action CTA Let's Talk */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-zinc-700 hover:border-emerald-500/40 bg-zinc-900/50 hover:bg-zinc-900 text-xs font-mono font-bold text-zinc-300 hover:text-zinc-100 transition-all uppercase tracking-wider"
          >
            <span>Let&apos;s Talk</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-zinc-400 hover:text-zinc-200 transition p-1"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-900 p-5 space-y-1 font-mono text-center shadow-2xl shadow-black/80">
          {navLinks.map((link, idx) => {
            const sectionId = link.href.split("#")[1] || "";
            const isActive = isHome && activeSection === sectionId;
            return (
              <Link
                key={`${link.href}-mobile-${idx}`}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 text-sm uppercase font-bold tracking-[0.15em] rounded-xl transition ${
                  isActive 
                    ? "text-emerald-400 bg-emerald-950/10 border border-emerald-950/20" 
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
