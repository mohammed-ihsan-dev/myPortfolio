"use client";

import { experienceData } from "@/data/portfolioData";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 border-b border-zinc-900 bg-zinc-950 overflow-hidden px-6 sm:px-12 bg-grid-zinc relative">
      {/* Dynamic background lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/80 to-zinc-950 pointer-events-none" />
      <div className="absolute top-1/2 left-[50%] -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-2.5 text-emerald-450 font-mono text-sm font-semibold uppercase tracking-wider">
            <Briefcase className="w-4.5 h-4.5" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-100 uppercase leading-[0.9] font-sans">
            PROFESSIONAL EXPERIENCE.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed font-sans max-w-2xl">
            A timeline of my professional developer roles, key contributions, and engineering capabilities.
          </p>
        </div>

        {/* Timeline representation */}
        <div className="space-y-10 relative before:absolute before:inset-y-1 before:left-4.5 before:w-[1px] before:bg-gradient-to-b before:from-emerald-500/80 before:via-zinc-800 before:to-zinc-900">
          {experienceData.map((exp, idx) => {
            const techTags = idx === 0 
              ? ["MERN Stack", "RBAC Middleware", "API Optimization", "Agile Flow"] 
              : ["Full Stack", "Database Schemas", "VPS Deployments", "Client SEO"];

            return (
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
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 group-hover:scale-[1.15] transition-transform duration-300" />
                </div>

                {/* Event Card */}
                <div className="p-6 rounded-2xl bg-zinc-900/10 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/20 transition-all duration-300 space-y-4 shadow-lg backdrop-blur-sm">
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-900 pb-3.5">
                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-bold text-zinc-200 font-sans tracking-tight">{exp.role}</h3>
                      <div className="text-sm font-mono font-semibold text-emerald-455 uppercase tracking-widest">{exp.company}</div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 border border-zinc-850/60 bg-zinc-900/30 px-3 py-1.5 rounded-xl">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Responsibilities list */}
                  <ul className="space-y-3 pt-1 text-sm sm:text-base">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="text-zinc-400 flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-zinc-800 shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-sans font-light">{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech context tags */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-900">
                    {techTags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono text-zinc-500 uppercase font-black tracking-widest border border-zinc-900 bg-zinc-950"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
