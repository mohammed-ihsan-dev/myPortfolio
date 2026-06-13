"use client";

import { educationData } from "@/data/portfolioData";
import { GraduationCap, Calendar, Award, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function Education() {
  return (
    <section id="education" className="py-24 md:py-32 border-b border-zinc-900 bg-zinc-950 overflow-hidden px-6 sm:px-12 bg-grid-zinc relative">
      {/* Dynamic background lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/80 to-zinc-950 pointer-events-none" />
      <div className="absolute top-1/2 left-[50%] -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-2.5 text-emerald-450 font-mono text-sm font-semibold uppercase tracking-wider">
            <GraduationCap className="w-4.5 h-4.5" />
            <span>Academic Track</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-100 uppercase leading-[0.9] font-sans">
            EDUCATION.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed font-sans max-w-2xl">
            My foundational computer science academic track, theoretical frameworks, and core certifications.
          </p>
        </div>

        {/* Academic timeline and details */}
        <div className="space-y-10 relative before:absolute before:inset-y-1 before:left-4.5 before:w-[1px] before:bg-gradient-to-b before:from-emerald-500/80 before:via-zinc-800 before:to-zinc-900">
          {educationData.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-12 space-y-3 group"
            >
              {/* Timeline Dot Indicator */}
              <div className="absolute left-1.5 top-1.5 w-[26px] h-[26px] rounded-full bg-zinc-950 border border-zinc-850 flex items-center justify-center z-10 shadow-md group-hover:border-emerald-500/40 transition-colors">
                <GraduationCap className="w-4 h-4 text-zinc-550 group-hover:text-emerald-450 transition-colors duration-300" />
              </div>

              {/* Card Panel */}
              <div className="p-6 rounded-2xl bg-zinc-900/10 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/20 transition-all duration-300 space-y-4 shadow-lg backdrop-blur-sm">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-900 pb-3.5">
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-200 font-sans tracking-tight">
                      {edu.degree}
                    </h3>
                    <div className="text-sm font-mono font-semibold text-emerald-455 uppercase tracking-widest">
                      {edu.institution}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 border border-zinc-850/60 bg-zinc-900/30 px-3 py-1.5 rounded-xl">
                    <Calendar className="w-4 h-4" />
                    <span>{edu.period}</span>
                  </div>
                </div>
                
                <div className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed font-light">
                  Pursuing a Bachelor of Computer Applications at <span className="text-zinc-300 font-medium">Indira Gandhi National Open University (IGNOU)</span>. Gaining essential theoretical frameworks in data structures & algorithms, computational logics, systems design principles, and enterprise database schemas.
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-zinc-900 text-xs font-mono text-emerald-450 uppercase tracking-wider font-bold">
                  <Award className="w-4.5 h-4.5 shrink-0" />
                  <span>Class of 2028 Completion</span>
                  <ChevronRight className="w-4 h-4 text-emerald-450" />
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
