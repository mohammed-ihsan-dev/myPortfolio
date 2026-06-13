"use client";

import { useState } from "react";
import { profile } from "@/data/portfolioData";
import { User, Terminal, Cpu, GraduationCap, MapPin, Briefcase, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function About() {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="about" className="py-24 md:py-32 border-b border-zinc-900 bg-zinc-950 overflow-hidden px-6 sm:px-12 bg-grid-zinc">
      {/* Immersive radial glow mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-zinc-950 pointer-events-none" />

      <div className="max-w-[1600px] w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Editorial Split Portrait Layout using transparent cutout */}
          <div className="lg:col-span-6 relative w-full h-[500px] sm:h-[620px] flex items-center justify-center">
            
            {/* Background Accent Glass Card */}
            <div className="absolute top-4 left-4 w-[88%] h-[88%] rounded-3xl border border-white/5 bg-zinc-900/10 backdrop-blur-sm pointer-events-none" />
            
            {/* Main Foreground Editorial Card containing cutout */}
            <motion.div 
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative w-[88%] h-[88%] rounded-3xl border border-white/10 shadow-2xl bg-zinc-900/30 group flex items-end justify-center cursor-pointer"
            >
              {/* Card background content (Clipped inside rounded frame) */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                {/* Dots layer */}
                <div className="absolute inset-0 bg-dots-zinc opacity-20" />
                {/* Glow spotlight behind subject */}
                <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-emerald-500/10 blur-[80px] group-hover:bg-emerald-500/20 transition-all duration-750" />
              </div>
              
              {!imageError ? (
                // This wrapper has height 110% to allow the portrait to scale up and overlap the card's top edge
                <div className="absolute -bottom-1 w-[90%] h-[110%] z-10 pointer-events-none">
                  <Image
                    src="/BgRemovedDP.png"
                    alt="Mohammed Ihsan Editorial Portrait"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    className="object-contain object-bottom transition-all duration-750 scale-[1.02] group-hover:scale-[1.07] grayscale contrast-[1.12] brightness-[0.9] group-hover:grayscale-0 group-hover:brightness-[1.0] group-hover:contrast-[1.05]"
                    onError={() => setImageError(true)}
                  />
                  {/* Subtle vignette shadow overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 space-y-4 text-center z-10">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-zinc-850 flex items-center justify-center font-mono text-lg font-bold text-zinc-400">
                    MI
                  </div>
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                    Biographical Centerpiece
                  </span>
                </div>
              )}

              {/* Rotated Vertical Magazine-style Typography Badge */}
              <div className="absolute bottom-8 right-8 font-mono text-xs font-bold text-zinc-550 group-hover:text-emerald-450 transition-colors duration-300 uppercase tracking-[0.25em] rotate-90 origin-bottom-right translate-x-[4px] translate-y-[-10px] select-none flex items-center gap-2.5 whitespace-nowrap z-20">
                <span>Mohammed Ihsan</span>
                <span className="w-4 h-[1px] bg-zinc-700" />
                <span>Product Builder</span>
              </div>

              {/* Glowing card border stroke */}
              <div className="absolute inset-0 border border-white/5 rounded-3xl pointer-events-none group-hover:border-emerald-500/30 transition-colors duration-500 z-20" />
            </motion.div>

          </div>

          {/* Right Side: Narrative Story & JSON profile credentials */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-450 font-mono text-sm font-semibold uppercase tracking-wider">
                <User className="w-4.5 h-4.5" />
                <span>Biography</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-100 uppercase leading-[0.9] font-sans">
                BUILDING PRODUCTS,<br />
                NOT JUST WEBSITES.
              </h2>
            </div>

            {/* Biography Description (18px - 20px readable scale) */}
            <div className="text-lg md:text-[20px] text-zinc-400 space-y-6 leading-relaxed font-sans font-light max-w-2xl">
              {profile.about.story.split("\n\n").map((para, idx) => (
                <p key={idx}>
                  {para}
                </p>
              ))}
            </div>

            {/* Premium Asymmetric JSON properties block (No tiny fonts) */}
            <div className="rounded-2xl bg-zinc-950/80 border border-zinc-850/80 p-6 font-mono text-sm text-zinc-400 space-y-4 max-w-2xl shadow-lg backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <div className="flex items-center gap-2 text-zinc-550">
                  <Terminal className="w-4 h-4 text-emerald-500" />
                  <span>developer_manifest.json</span>
                </div>
                <div className="flex gap-1.5">
                  <Sparkles className="w-4 h-4 text-zinc-700" />
                  <span className="w-2 h-2 rounded-full bg-zinc-855 bg-zinc-800" />
                </div>
              </div>

              {/* Manifest properties */}
              <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                  <div className="w-32 text-zinc-550 uppercase tracking-widest font-black shrink-0 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-zinc-700" />
                    <span>Specialty</span>
                  </div>
                  <div className="text-zinc-300 font-semibold">
                    MERN Stack & Product Engineering (React, Node, Express, MongoDB)
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                  <div className="w-32 text-zinc-550 uppercase tracking-widest font-black shrink-0 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-zinc-700" />
                    <span>Education</span>
                  </div>
                  <div className="text-zinc-300">
                    BCA, Indira Gandhi National Open University (IGNOU)
                    <span className="text-zinc-500 ml-2">// Class of 2028</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                  <div className="w-32 text-zinc-550 uppercase tracking-widest font-black shrink-0 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-zinc-700" />
                    <span>Status</span>
                  </div>
                  <div className="text-zinc-350">
                    Software Developer Intern at <strong className="text-emerald-450 font-bold">Bridgeon Solutions</strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                  <div className="w-32 text-zinc-550 uppercase tracking-widest font-black shrink-0 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-zinc-700" />
                    <span>Location</span>
                  </div>
                  <div className="text-zinc-300">
                    Kerala, India <span className="text-zinc-500 ml-2">// GMT +5:30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
