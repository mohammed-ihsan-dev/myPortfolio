import { detailedProjectsData } from "@/data/portfolioData";
import { ArrowLeft, ExternalLink, ShieldCheck, Cpu, Award, AlertTriangle, Lightbulb } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/features/Navbar";
import { Footer } from "@/components/Footer";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [
    { id: "zinda-learn" },
    { id: "baeby-store" },
    { id: "personal-portfolio" }
  ];
}

import Image from "next/image";

const projectThumbnails: Record<string, string> = {
  "zinda-learn": "/zindalearnopen.png",
  "baeby-store": "/baebyopen.png",
  "personal-portfolio": "/portfolioopen.png",
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = detailedProjectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col antialiased">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 space-y-10 text-left">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Case Study Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
              {project.category}
            </span>
            {project.highlights.map((highlight, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-full bg-zinc-900/40 border border-zinc-850 text-[10px] text-zinc-400 font-medium font-mono"
              >
                {highlight}
              </span>
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-100 leading-tight">
              {project.title}
            </h1>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code</span>
              </a>
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-zinc-200 transition"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
            {project.shortDesc}
          </p>
        </div>

        {/* Big Visual Screenshot Header Card */}
        <div className={`w-full h-56 sm:h-72 rounded-2xl bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center border border-zinc-900 shadow-2xl group`}>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-[0.05] pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent pointer-events-none z-10" />
          
          {projectThumbnails[project.id] ? (
            <Image
              src={projectThumbnails[project.id]}
              alt={`${project.title} Case Study Preview`}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover object-top opacity-55 group-hover:scale-102 transition duration-500"
            />
          ) : (
            <div className="absolute w-44 h-44 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          )}
          
          <span className="font-mono text-xs sm:text-sm font-bold text-white/70 bg-black/60 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/10 uppercase tracking-widest relative z-20 select-none">
            {project.title} System Design
          </span>
        </div>

        {/* Content Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          {/* Main Case Study Information */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <div className="space-y-3">
              <h3 className="text-sm font-mono font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-900 pb-1">
                Project Overview
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-sans whitespace-pre-line">
                {project.overview}
              </p>
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/20 border border-zinc-900 space-y-2">
                <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span>The Problem</span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">{project.problem}</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/20 border border-zinc-900 space-y-2">
                <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4 text-emerald-500" />
                  <span>The Solution</span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">{project.solution}</p>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h3 className="text-sm font-mono font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-900 pb-1">
                Key Features & Workflows
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {project.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/10 border border-zinc-900/60">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-zinc-400 leading-relaxed font-sans">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture */}
            <div className="space-y-3">
              <h3 className="text-sm font-mono font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-900 pb-1">
                System Architecture
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                {project.architecture}
              </p>
            </div>

            {/* Technical Challenges */}
            <div className="space-y-3">
              <h3 className="text-sm font-mono font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-900 pb-1">
                Technical Challenges & Compromises
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                {project.challenges}
              </p>
            </div>
          </div>

          {/* Sticky Meta Information Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-20 space-y-5">
            {/* Tech stack box */}
            <div className="p-4 rounded-xl bg-zinc-900/10 border border-zinc-900 space-y-3">
              <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-zinc-900 pb-2">
                <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                <span>Technologies Used</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.technologiesUsed.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300 font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="p-4 rounded-xl bg-zinc-900/10 border border-zinc-900 space-y-3">
              <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-zinc-900 pb-2">
                <Award className="w-3.5 h-3.5 text-sky-500" />
                <span>Project Metadata</span>
              </h4>
              <div className="space-y-2 text-[10px] font-mono text-zinc-400">
                <div className="flex justify-between">
                  <span className="text-zinc-500">ID:</span>
                  <span>{project.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Release:</span>
                  <span>Production Ready</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Scale:</span>
                  <span>Segmented Core</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
