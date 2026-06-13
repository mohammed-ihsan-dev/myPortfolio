"use client";

import { useState, useRef } from "react";
import { ArrowRight, MessageCircle, Download, Mail } from "lucide-react";
import { profile } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function Hero() {
  const [imageError, setImageError] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Smooth scroll animations for portrait parallax
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-end pb-12 lg:pb-16 bg-zinc-950 overflow-hidden px-6 sm:px-10 lg:px-16 pt-[88px]"
    >
      {/* ───── 1. Glow System & Background Atmosphere (Behind Portrait) ───── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Large green radial glow (Deep ambient backdrop) */}
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.14)_0%,rgba(16,185,129,0.04)_45%,transparent_70%)] rounded-full blur-[110px]" />

        {/* Secondary blurred glow (Brighter pulsing core behind head) */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.10)_0%,rgba(16,185,129,0.02)_55%,transparent_75%)] rounded-full blur-[80px] animate-pulse-glow" />

        {/* Orbital line graphics (Rotational sci-fi/digital rings) */}
        <div className="absolute top-[40%] left-1/2 w-[380px] h-[380px] rounded-full border border-dashed border-emerald-500/12 animate-orbit-slow pointer-events-none" />
        <div className="absolute top-[40%] left-1/2 w-[520px] h-[520px] rounded-full border border-dotted border-emerald-500/8 animate-orbit-reverse pointer-events-none" />
        <div className="absolute top-[40%] left-1/2 w-[680px] h-[680px] rounded-full border border-emerald-500/4 pointer-events-none" />

        {/* Subtle dynamic particles floating around the portrait */}
        {Array.from({ length: 15 }).map((_, i) => {
          const delay = i * 0.5;
          const duration = 10 + (i % 4) * 3;
          const size = 1.5 + (i % 3) * 1.5;
          const opacity = 0.15 + (i % 3) * 0.1;
          const left = 38 + (i % 5) * 6; // Spread 38% to 68% horizontally
          const top = 15 + (i % 4) * 9;   // Spread 15% to 51% vertically
          return (
            <div
              key={i}
              className="absolute rounded-full bg-emerald-400/80"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                opacity: opacity,
                filter: "blur(0.5px)",
                animation: `particle-drift ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* ───── 2. Portrait Centerpiece (Overlapping Layout) ───── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] md:w-[65vw] lg:w-[50vw] max-w-[760px] h-[90vh] lg:h-[114vh] z-10 pointer-events-none flex items-end justify-center overflow-visible">
        <motion.div
          style={{
            y: portraitY,
            scale: portraitScale,
            opacity: portraitOpacity,
          }}
          className="relative w-full h-full flex items-end justify-center"
        >
          {!imageError ? (
            <div
              className="relative w-full h-full select-none"
              style={{
                maskImage: "radial-gradient(ellipse 75% 75% at 50% 40%, black 50%, transparent 95%)",
                WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 40%, black 50%, transparent 95%)",
              }}
            >
              <Image
                src="/BgRemovedDP.png"
                alt="Mohammed Ihsan — Full Stack Developer"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 50vw"
                className="object-contain object-bottom select-none"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="mb-24 w-48 h-72 rounded-3xl border border-zinc-800 bg-zinc-900/40 flex flex-col items-center justify-center p-6 space-y-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center font-mono text-xl font-black text-zinc-500">
                MI
              </div>
              <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                Portrait
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* ───── 3. Foreground Content Grid ───── */}
      <div className="w-full max-w-[1600px] mx-auto relative z-20 grid grid-cols-1 lg:grid-cols-12 items-end gap-8 lg:gap-0">
        
        {/* ── LEFT COLUMN: Main Text & Action CTAs ── */}
        <div className="lg:col-span-5 space-y-7 text-left pb-8 lg:pb-12 relative">
          
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/25 bg-emerald-500/5 text-emerald-400 font-mono text-[10px] font-bold tracking-[0.2em] uppercase"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {profile.hero.badge}
          </motion.div>

          {/* Name & Role Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-[10px] sm:text-xs text-zinc-500 uppercase tracking-[0.25em] font-bold"
          >
            {profile.name} — {profile.role}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[clamp(2.8rem,7vw,5.5rem)] font-black tracking-tight text-zinc-100 leading-[0.92] uppercase font-sans"
          >
            BUILDING<br />
            <span className="text-emerald-400">DIGITAL</span><br />
            PRODUCTS<br />
            THAT MATTER<span className="text-emerald-400">.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm sm:text-base text-zinc-400 max-w-[380px] leading-relaxed font-sans font-light"
          >
            I build scalable web applications and digital products that combine premium user experiences with{" "}
            <em className="text-emerald-400 not-italic font-medium">reliable engineering</em>.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 pt-1"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-mono font-bold uppercase tracking-wider transition-all active:scale-[0.97]"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-zinc-100 text-xs font-mono font-bold uppercase tracking-wider transition-all"
            >
              <span>Let&apos;s Talk</span>
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-zinc-100 text-xs font-mono font-bold uppercase tracking-wider transition-all"
            >
              <span>Resume</span>
              <Download className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Social Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-3 pt-4"
          >
            <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.25em] font-bold block">
              Find me on
            </span>
            <div className="flex items-center gap-5">
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                <GithubIcon className="w-5.5 h-5.5" />
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                <LinkedinIcon className="w-5.5 h-5.5" />
              </a>
              <a href={profile.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                <InstagramIcon className="w-5.5 h-5.5" />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="text-zinc-400 hover:text-zinc-100 transition-colors">
                <Mail className="w-5.5 h-5.5" />
              </a>
            </div>
          </motion.div>

          {/* Scroll Down Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex items-center gap-3 pt-4"
          >
            <div className="w-7 h-11 rounded-full border-2 border-zinc-700 flex items-start justify-center pt-2">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-2 rounded-full bg-emerald-500"
              />
            </div>
            <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.25em] font-bold">
              Scroll Down
            </span>
          </motion.div>
        </div>

        {/* ── MIDDLE COLUMN: Empty space on desktop for centered portrait alignment ── */}
        <div className="lg:col-span-4 hidden lg:block pointer-events-none" />

        {/* ── RIGHT COLUMN: Massive Stat Indicator ── */}
        <div className="lg:col-span-3 hidden lg:flex flex-col items-end justify-end pb-12 lg:pb-16 relative">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-right space-y-2 select-none"
          >
            {/* Stat Title */}
            <span className="font-mono text-[10px] sm:text-xs text-emerald-400 uppercase tracking-[0.25em] font-bold block">
              Projects Shipped
            </span>

            {/* Massive outlined number with depth */}
            <div className="text-[clamp(6rem,14vw,11rem)] font-black leading-[0.8] tracking-tighter text-transparent [-webkit-text-stroke:2px_rgba(16,185,129,0.25)] relative">
              03+
            </div>

            {/* Sub-label */}
            <span className="font-mono text-sm sm:text-base text-emerald-400/70 italic tracking-[0.2em] uppercase block">
              MERN Specialist
            </span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
