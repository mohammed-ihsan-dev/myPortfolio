"use client";

import { useState, useCallback, useMemo, useEffect, useRef, memo } from "react";
import { Cpu, ArrowRight, Layers, Terminal } from "lucide-react";
import { skillsData } from "@/data/portfolioData";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ReactIcon, NextjsIcon, TypescriptIcon, JavascriptIcon, 
  Html5Icon, Css3Icon, TailwindIcon, NodejsIcon, 
  ExpressIcon, MongodbIcon, GitIcon, GithubTechIcon, 
  PostmanIcon, VSCodeIcon, AWSIcon 
} from "@/components/tech-icons";
import { Webhook, Fingerprint, Database, Zap } from "lucide-react";

// Mappings from Skill Title to official SVG / Lucide Icon
const skillIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "React": ReactIcon,
  "Next.js": NextjsIcon,
  "TypeScript": TypescriptIcon,
  "JavaScript": JavascriptIcon,
  "HTML5": Html5Icon,
  "CSS3": Css3Icon,
  "Tailwind CSS": TailwindIcon,
  "Node.js": NodejsIcon,
  "Express.js": ExpressIcon,
  "REST APIs": Webhook,
  "Auth & JWT": Fingerprint,
  "MongoDB": MongodbIcon,
  "Mongoose": Database,
  "Caching": Zap,
  "Git": GitIcon,
  "GitHub": GithubTechIcon,
  "Postman": PostmanIcon,
  "VS Code": VSCodeIcon,
  "AWS": AWSIcon
};

// High-fidelity descriptive sublabels and detailed bulleted capabilities
const skillCapabilities: Record<string, string[]> = {
  "React": ["Component Architecture", "Hooks Lifecycle Model", "State Management (Redux/Context)"],
  "Next.js": ["App Router Directory", "SSR & SSG Static rendering", "Server Actions Middleware"],
  "TypeScript": ["Strict Type Compiler", "Interfaces & Assertions", "Generics & Utility Types"],
  "JavaScript": ["Async/Await Promises", "ES6+ Modern Spec", "DOM Modifiers & APIs"],
  "HTML5": ["Semantic Page Markup", "WAI-ARIA accessibility", "SEO Structure Optimization"],
  "CSS3": ["Grid & Flexbox systems", "Custom Keyframe Motion", "Responsive Query Rules"],
  "Tailwind CSS": ["Utility-First compiling", "Config Theme Customization", "Arbitrary Class design"],
  "Node.js": ["Non-blocking Async OS", "npm packages tooling", "FS & Network Streams"],
  "Express.js": ["Middleware Pipeline", "API Route Controllers", "Global Error handlers"],
  "REST APIs": ["HTTP verbs endpoints", "Payload validations", "JSON Contract Schemas"],
  "Auth & JWT": ["JWT Token encryption", "Role authorization rules", "Bcrypt password hash"],
  "MongoDB": ["NoSQL collections design", "Aggregation queries", "Index rules validation"],
  "Mongoose": ["Schema structural rules", "Validation middleware", "Model virtual populate"],
  "Caching": ["In-memory Cache Store", "Expiry invalidation rules", "Latency optimizations"],
  "Git": ["Local Branch merges", "Conflict resolution flow", "Commit history audits"],
  "GitHub": ["Pull Request reviews", "Actions CI/CD triggers", "Organization workflows"],
  "Postman": ["API Endpoint verifications", "Automated Collections", "Environment configurations"],
  "VS Code": ["Workspace task configurations", "Debugger setups", "Git CLI utility extensions"],
  "AWS": ["S3 File uploads", "EC2 Hosting Deploy", "IAM Policy assignments"]
};


// Memoized individual Skill Card to prevent redundant rendering cycles
const SkillCard = memo(function SkillCard({
  skill,
  icon: IconComponent,
  capabilities,
}: {
  skill: string;
  icon: React.ComponentType<{ className?: string }>;
  capabilities: string[];
}) {
  return (
    <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition duration-300 flex items-start gap-4 shadow-lg group">
      {/* Icon Container: Gray-to-Color hover transformation */}
      <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 shrink-0 group-hover:border-zinc-700 transition duration-300">
        <IconComponent className="w-6 h-6 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
      </div>

      {/* Name & Capabilities list */}
      <div className="space-y-1 text-left">
        <div className="text-sm font-mono font-bold text-zinc-200 uppercase tracking-wide group-hover:text-emerald-400 transition-colors duration-300">
          {skill}
        </div>
        <ul className="pt-2 space-y-1.5">
          {capabilities.map((cap, cIdx) => (
            <li key={cIdx} className="text-[10.5px] font-mono text-zinc-500 flex items-start gap-2 leading-tight">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 shrink-0 mt-1" />
              <span>{cap}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Monitor scrolling activity to temporarily disable mouseenter triggers
  useEffect(() => {
    const handleScroll = () => {
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Debounced/delayed hover category setter to filter transient cursor movements
  const handleMouseEnter = useCallback((idx: number) => {
    if (isScrollingRef.current) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveCategory(idx);
    }, 60);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  }, []);

  // Immediate category setter on user click
  const handleCategoryClick = useCallback((idx: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveCategory(idx);
  }, []);

  const activeSkills = useMemo(() => {
    return skillsData[activeCategory].skills;
  }, [activeCategory]);

  return (
    <section id="skills" className="py-24 md:py-32 border-b border-zinc-900 bg-zinc-950 overflow-hidden px-6 sm:px-12 bg-grid-zinc relative">
      {/* Visual background overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/80 to-zinc-950 pointer-events-none" />

      <div className="max-w-[1600px] w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Section Intro & Selectors */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-450 font-mono text-sm font-semibold uppercase tracking-wider">
                <Cpu className="w-4.5 h-4.5" />
                <span>Expertise Clusters</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-100 uppercase leading-[0.9] font-sans">
                CORE STACK & TOOLBELT.
              </h2>
              <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed font-sans max-w-md">
                An interactive map of my technical skillset. Hover or select a cluster to inspect the component nodes in my developer toolbelt.
              </p>
            </div>

            {/* Asymmetrical Category Selectors */}
            <div className="space-y-3 max-w-sm pt-2">
              {skillsData.map((cat, idx) => (
                <button
                  key={idx}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleCategoryClick(idx)}
                  className={cn(
                    "w-full p-4.5 rounded-xl border text-left transition-all duration-300 font-mono text-sm flex items-center justify-between group cursor-pointer",
                    activeCategory === idx
                      ? "bg-zinc-900 border-zinc-700 text-zinc-100 shadow-md shadow-zinc-950/50"
                      : "bg-zinc-900/10 border-zinc-900 text-zinc-500 hover:border-zinc-800 hover:text-zinc-300"
                  )}
                >
                  <span className="uppercase tracking-widest font-black">{cat.category} Skills</span>
                  <ArrowRight className={cn(
                    "w-4.5 h-4.5 transition-transform",
                    activeCategory === idx ? "translate-x-1 text-emerald-400" : "text-zinc-700 group-hover:translate-x-0.5"
                  )} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Interactive Technology Nodes Cluster */}
          <div className="lg:col-span-7 min-h-[440px] sm:min-h-[550px] rounded-3xl bg-zinc-900/10 border border-zinc-900 relative overflow-hidden flex flex-col justify-between p-6 shadow-2xl backdrop-blur-sm">
            {/* Visual background dots */}
            <div className="absolute inset-0 bg-dots-zinc opacity-25 pointer-events-none" />

            {/* Background lighting source */}
            <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-emerald-500/5 rounded-full blur-[90px] pointer-events-none" />

            {/* Header bar within panel */}
            <div className="flex items-center justify-between font-mono text-xs text-zinc-500 border-b border-zinc-900 pb-3.5 z-10">
              <div className="flex items-center gap-2 uppercase font-black tracking-widest">
                <Layers className="w-4 h-4 text-zinc-650" />
                <span>active_cluster: {skillsData[activeCategory].category.toLowerCase()}_stack</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-emerald-455 font-bold bg-emerald-950/20 border border-emerald-950/10 px-3 py-1 rounded-lg">
                Verified
              </span>
            </div>

            {/* Central node cluster mapping - items-start & min-height stabilizes layout shifts */}
            <div className="relative flex-1 flex items-start justify-center py-6 min-h-[320px] sm:min-h-[380px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, scale: 0.96, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -5 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl w-full px-2 relative z-10"
                >
                  {activeSkills.map((skill) => {
                    const IconComponent = skillIconMap[skill] || Cpu;
                    const capabilities = skillCapabilities[skill] || ["Production Standard Development", "Industry Best Practices", "Scalable Clean Logic"];
                    
                    return (
                      <SkillCard
                        key={skill}
                        skill={skill}
                        icon={IconComponent}
                        capabilities={capabilities}
                      />
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer console logging */}
            <div className="flex justify-between font-mono text-xs text-zinc-550 border-t border-zinc-900/60 pt-3.5 z-10">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-zinc-700" />
                <span>LOGS: rendering_node_cluster_0{activeCategory + 1}...</span>
              </div>
              <span>Status: Active</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
