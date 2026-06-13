"use client";

import { useState } from "react";
import { detailedProjectsData } from "@/data/portfolioData";
import { ExternalLink, FolderGit2, ArrowRight, AlertTriangle, Lightbulb, Play, Layers } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { RbacSimulator } from "@/components/RbacSimulator";
import { StateFlowVisualizer } from "@/components/StateFlowVisualizer";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const projectThumbnails: Record<string, string> = {
  "zinda-learn": "/zindalearnopen.png",
  "baeby-store": "/baebyopen.png",
  "personal-portfolio": "/portfolioopen.png",
};

export function Projects() {
  // Toggle states for visual side ("mockup" vs "interactive")
  const [activeViews, setActiveViews] = useState<Record<string, "mockup" | "interactive">>({
    "zinda-learn": "mockup",
    "baeby-store": "mockup",
    "personal-portfolio": "mockup",
  });

  const toggleView = (projectId: string, view: "mockup" | "interactive") => {
    setActiveViews((prev) => ({ ...prev, [projectId]: view }));
  };

  return (
    <section id="projects" className="py-24 md:py-32 border-b border-zinc-900 bg-zinc-950 overflow-hidden px-6 sm:px-12 bg-grid-zinc">
      {/* Immersive background fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950 pointer-events-none" />

      <div className="max-w-[1600px] w-full mx-auto relative z-10 space-y-20">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl text-left">
          <div className="flex items-center gap-2 text-emerald-450 font-mono text-sm font-semibold uppercase tracking-wider">
            <FolderGit2 className="w-4.5 h-4.5" />
            <span>Product Launches</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[64px] font-black tracking-tight text-zinc-100 uppercase leading-[0.9] font-sans">
            FEATURED SHIPPED PRODUCTS.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed font-sans max-w-xl">
            Selected MERN stack web products designed, engineered, and optimized for real-world production.
          </p>
        </div>

        {/* Shipped Projects Showcase */}
        <div className="space-y-36">
          {detailedProjectsData.map((project, idx) => {
            const isEven = idx % 2 === 0;
            const currentView = activeViews[project.id] || "mockup";

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12 lg:gap-16 items-stretch`}
              >
                {/* Visual Panel / Simulator Container */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                  {/* Selector Controls (Mockup vs Live Simulator) */}
                  <div className="flex items-center gap-2.5 self-start font-mono text-xs font-bold uppercase tracking-wider bg-zinc-900/60 border border-zinc-850 p-1 rounded-xl">
                    <button
                      onClick={() => toggleView(project.id, "mockup")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition cursor-pointer ${
                        currentView === "mockup"
                          ? "bg-zinc-805 bg-zinc-800 text-zinc-100"
                          : "text-zinc-500 hover:text-zinc-350"
                      }`}
                    >
                      <Layers className="w-4 h-4" />
                      <span>Showcase Image</span>
                    </button>
                    <button
                      onClick={() => toggleView(project.id, "interactive")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition cursor-pointer ${
                        currentView === "interactive"
                          ? "bg-zinc-805 bg-zinc-800 text-zinc-100"
                          : "text-zinc-500 hover:text-zinc-350"
                      }`}
                    >
                      <Play className="w-4 h-4 text-emerald-400" />
                      <span>Architecture Simulator</span>
                    </button>
                  </div>

                  {/* Body Content Area */}
                  <div className="flex-1 min-h-[400px] relative rounded-3xl bg-zinc-900/10 border border-zinc-900 overflow-hidden shadow-2xl backdrop-blur-sm flex flex-col justify-center">
                    {currentView === "mockup" ? (
                      // Mockup View: Cinematic screenshot or gradient fallback
                      <div className="absolute inset-0 select-none h-full w-full relative">
                        {projectThumbnails[project.id] ? (
                          <div className="relative w-full h-full overflow-hidden group/thumb">
                            {/* Subtle dark gradient overlay to ensure text/controls have breathing room */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/10 to-zinc-950/50 z-10 transition duration-500 group-hover/thumb:opacity-40" />
                            
                            <Image
                              src={projectThumbnails[project.id]}
                              alt={`${project.title} Screenshot Mockup`}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover object-top transition duration-500 group-hover/thumb:scale-[1.03]"
                            />
                            
                            {/* Visual metadata overlay on top of the image */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between z-20 text-left">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[10px] text-zinc-350 uppercase tracking-widest bg-zinc-950/70 px-2.5 py-1 rounded-md border border-zinc-800/50 backdrop-blur-sm">
                                  System View // {project.id}
                                </span>
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                              </div>

                              <div className="space-y-1">
                                <h4 className="text-[11px] font-mono text-zinc-350 font-bold uppercase tracking-[0.2em]">
                                  {project.title}
                                </h4>
                                <span className="block text-2xl sm:text-3xl font-black text-zinc-50 uppercase tracking-tight leading-none">
                                  {project.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex flex-col justify-between p-8 text-left select-none h-full">
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-[0.08]`} />
                            <div className="absolute inset-0 bg-dots-zinc opacity-20" />
                            
                            <div className="flex items-center justify-between z-10">
                              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                                Product System View // {project.id}
                              </span>
                              <span className="h-2 w-2 rounded-full bg-zinc-800" />
                            </div>

                            <div className="relative z-10 space-y-2">
                              <h4 className="text-base font-mono text-zinc-400 font-bold uppercase tracking-widest">
                                {project.title}
                              </h4>
                              <span className="block text-3xl sm:text-4xl font-black text-zinc-100 uppercase tracking-tight font-sans">
                                {project.category}
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-2 z-10">
                              {project.highlights.slice(0, 3).map((hl, hlIdx) => (
                                <span
                                  key={hlIdx}
                                  className="px-3.5 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-850 text-xs font-mono font-bold text-zinc-450 uppercase tracking-wider"
                                >
                                  {hl}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      // Interactive Simulator View
                      <div className="p-4 flex-1 flex flex-col justify-center h-full">
                        {project.id === "zinda-learn" && <RbacSimulator />}
                        {project.id === "baeby-store" && <StateFlowVisualizer />}
                        {project.id === "personal-portfolio" && <LighthouseAuditSimulator />}
                      </div>
                    )}
                  </div>
                </div>

                {/* Shipped Product Narrative details */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between gap-6 text-left py-2">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap font-mono text-xs font-bold text-zinc-500 uppercase tracking-widest">
                        <span>{project.category}</span>
                        <span>•</span>
                        <span className="text-emerald-450">{project.highlights.join(" // ")}</span>
                      </div>

                      <Link href={`/projects/${project.id}`} className="block group/title">
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-100 group-hover/title:text-zinc-200 transition-colors uppercase leading-[0.9] font-sans">
                          {project.title}
                        </h3>
                      </Link>
                    </div>

                    <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-sans font-light">
                      {project.shortDesc}
                    </p>

                    {/* Problem and Resolution Split Boxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                      <div className="space-y-2 p-5 rounded-2xl bg-zinc-900/20 border border-zinc-900">
                        <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs font-bold uppercase tracking-wider">
                          <AlertTriangle className="w-4.5 h-4.5 text-red-500/80" />
                          <span>The Challenge</span>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-450 leading-relaxed font-sans font-light">
                          {project.problem}
                        </p>
                      </div>

                      <div className="space-y-2 p-5 rounded-2xl bg-zinc-900/20 border border-zinc-900">
                        <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs font-bold uppercase tracking-wider">
                          <Lightbulb className="w-4.5 h-4.5 text-emerald-500/80" />
                          <span>MERN Resolution</span>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-450 leading-relaxed font-sans font-light">
                          {project.solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack and Deploy CTAs */}
                  <div className="space-y-6 pt-4 border-t border-zinc-900">
                    <div className="flex flex-wrap gap-2">
                      {project.technologiesUsed.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-850 text-xs font-mono text-zinc-450 font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <Link
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center gap-2 text-sm font-mono font-bold text-emerald-455 hover:text-emerald-450 transition-colors uppercase tracking-wider"
                      >
                        <span>Case Study Details</span>
                        <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>

                      <div className="flex items-center gap-2.5">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub Repository for ${project.title}`}
                          className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-850 hover:border-zinc-750 text-xs font-mono font-bold text-zinc-400 hover:text-zinc-200 transition"
                        >
                          <GithubIcon className="w-5 h-5" />
                          <span>Codebase</span>
                        </a>
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Live Demo URL for ${project.title}`}
                          className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl bg-zinc-100 text-zinc-950 text-xs font-mono font-bold hover:bg-zinc-200 transition"
                        >
                          <span>Live Site</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
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

// Inline custom Lighthouse / PageSpeed verification simulator for the Portfolio Project
function LighthouseAuditSimulator() {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(false);

  const runAudit = () => {
    setRunning(true);
    setProgress(0);
    setResults(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setRunning(false);
          setResults(true);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  return (
    <div className="bg-zinc-950 border border-zinc-850 rounded-2xl overflow-hidden backdrop-blur-md text-left text-zinc-100 flex flex-col h-full min-h-[340px] shadow-lg">
      {/* Console titlebar */}
      <div className="flex items-center justify-between px-4.5 py-3 bg-zinc-950 border-b border-zinc-850 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>lighthouse_audit_agent.sh</span>
        </div>
        <span className="text-[10px] text-zinc-600">v4.1.0</span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between gap-5 font-mono text-xs sm:text-sm">
        {!running && !results ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-full border border-zinc-850 flex items-center justify-center bg-zinc-900/60 text-emerald-450 text-lg">
              ⚡
            </div>
            <div className="space-y-1">
              <h4 className="text-zinc-250 font-bold text-sm uppercase tracking-wider">Performance Audit Core</h4>
              <p className="text-zinc-500 text-xs max-w-xs leading-normal font-light">
                Trigger a live runtime bundle diagnostic to verify Lighthouse scores and INP levels.
              </p>
            </div>
            <button
              onClick={runAudit}
              className="px-5 py-2.5 rounded-xl bg-zinc-100 text-zinc-950 hover:bg-zinc-200 transition text-xs font-bold tracking-wider uppercase cursor-pointer"
            >
              Execute Audit
            </button>
          </div>
        ) : running ? (
          <div className="flex-1 flex flex-col justify-center space-y-4 py-4">
            <div className="flex justify-between text-xs text-zinc-500 uppercase tracking-widest">
              <span>Auditing critical render path...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all duration-150" style={{ width: `${progress}%` }} />
            </div>
            <div className="text-xs text-zinc-650 space-y-1 max-h-[60px] overflow-hidden leading-normal">
              {progress >= 20 && <div>&gt; Loading server-rendered DOM nodes</div>}
              {progress >= 40 && <div>&gt; Compiling tailwind variables and @utility layers</div>}
              {progress >= 60 && <div>&gt; Auditing Next.js layout metadata claims</div>}
              {progress >= 80 && <div>&gt; Inspecting accessibility keyboard tabs</div>}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-between py-1 space-y-4">
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-xl bg-emerald-950/10 border border-emerald-900/20">
                <div className="text-lg font-bold text-emerald-450">100</div>
                <div className="text-[9px] text-zinc-500 uppercase font-semibold mt-1">Perf</div>
              </div>
              <div className="p-2 rounded-xl bg-emerald-950/10 border border-emerald-900/20">
                <div className="text-lg font-bold text-emerald-450">100</div>
                <div className="text-[9px] text-zinc-500 uppercase font-semibold mt-1">A11y</div>
              </div>
              <div className="p-2 rounded-xl bg-emerald-950/10 border border-emerald-900/20">
                <div className="text-lg font-bold text-emerald-450">100</div>
                <div className="text-[9px] text-zinc-500 uppercase font-semibold mt-1">Best Prac</div>
              </div>
              <div className="p-2 rounded-xl bg-emerald-950/10 border border-emerald-900/20">
                <div className="text-lg font-bold text-emerald-450">100</div>
                <div className="text-[9px] text-zinc-500 uppercase font-semibold mt-1">SEO</div>
              </div>
            </div>

            <div className="space-y-1.5 border-t border-zinc-900/80 pt-3 text-xs sm:text-sm text-zinc-400">
              <div className="flex justify-between">
                <span className="text-zinc-500">First Contentful Paint:</span>
                <span className="text-emerald-400 font-bold">0.4s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Interaction to Next Paint (INP):</span>
                <span className="text-emerald-400 font-bold">12ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Cumulative Layout Shift:</span>
                <span className="text-emerald-400 font-bold">0.00</span>
              </div>
            </div>

            <button
              onClick={runAudit}
              className="w-full py-2.5 border border-zinc-850 hover:bg-zinc-900/40 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-350 transition"
            >
              Re-run Audit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
