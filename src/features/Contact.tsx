"use client";

import { useState } from "react";
import { ContactForm } from "@/components/ContactForm";
import { profile } from "@/data/portfolioData";
import { Mail, MessageSquare, Terminal, ChevronRight, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import Image from "next/image";
import { motion } from "framer-motion";

export function Contact() {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="contact" className="py-24 md:py-32 bg-zinc-950 px-6 sm:px-12 overflow-hidden border-t border-zinc-900 relative bg-grid-zinc">
      {/* Background glow filters */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-[1600px] w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Massive Headline, coordinates & branding stamp */}
          <div className="lg:col-span-6 space-y-8 text-left max-w-xl">
            <div className="space-y-6">
              
              {/* Heading Label */}
              <div className="flex items-center gap-2.5 text-emerald-450 font-mono text-sm font-semibold uppercase tracking-wider">
                <MessageSquare className="w-4.5 h-4.5" />
                <span>Contact Channels</span>
              </div>

              {/* Personal Stamp Header (Small photo stamp / monogram) */}
              <div className="flex items-center gap-3.5 pt-2">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 flex items-center justify-center shrink-0 shadow-xl group/stamp cursor-pointer transition-all duration-300 hover:border-emerald-500/30">
                  <div className="absolute inset-0 bg-dots-zinc opacity-10" />
                  {!imageError ? (
                    <Image
                      src="/BgRemovedDP.png"
                      alt="Mohammed Ihsan Stamp"
                      fill
                      sizes="80px"
                      className="object-contain opacity-95 filter contrast-[1.05]"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <span className="font-mono text-xs font-bold text-zinc-550">MI</span>
                  )}
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-zinc-200 uppercase tracking-widest leading-none">
                    M. Ihsan Portfolio
                  </div>
                  <div className="font-mono text-[10px] text-zinc-555 uppercase tracking-wider mt-2 flex items-center gap-1.5 font-semibold">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>MERN Stack Shipped</span>
                  </div>
                </div>
              </div>

              {/* Massive bold agency style call to action */}
              <h2 className="text-4xl sm:text-6xl lg:text-[76px] font-black tracking-tighter text-zinc-100 leading-[0.9] uppercase font-sans">
                READY TO BRING <br />
                YOUR NEXT PRODUCT <br />
                TO LIFE?
              </h2>

              <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed font-sans max-w-xl">
                Whether you&apos;re looking to recruit an intern for your product development team, consult on MERN database schema designs, or build custom RESTful APIs, feel free to drop a line.
              </p>
            </div>

            {/* Direct Channels */}
            <div className="space-y-3 font-mono text-sm text-zinc-400 max-w-xl">
              <h3 className="text-xs uppercase font-black tracking-widest text-zinc-550 flex items-center gap-1.5">
                <span>Secure Channels</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center justify-center gap-3 p-4 rounded-xl bg-zinc-900/10 border border-zinc-900 hover:border-red-500/40 hover:bg-gradient-to-r hover:from-red-950/10 hover:via-blue-950/10 hover:to-emerald-950/10 hover:text-red-400 transition-all duration-300 ease-out group text-center"
                >
                  <Mail className="w-5 h-5 text-zinc-550 group-hover:text-red-400 transition-colors duration-300" />
                  <span className="text-xs uppercase font-bold tracking-wider">Email</span>
                </a>
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 p-4 rounded-xl bg-zinc-900/10 border border-zinc-900 hover:border-purple-500/40 hover:bg-zinc-900/50 hover:text-purple-400 transition-all duration-300 ease-out group text-center"
                >
                  <GithubIcon className="w-5 h-5 text-zinc-555 group-hover:text-purple-400 transition-colors duration-300" />
                  <span className="text-xs uppercase font-bold tracking-wider">GitHub</span>
                </a>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 p-4 rounded-xl bg-zinc-900/10 border border-zinc-900 hover:border-blue-500/40 hover:bg-blue-950/10 hover:text-blue-400 hover:shadow-[0_0_15px_rgba(10,102,194,0.15)] transition-all duration-300 ease-out group text-center"
                >
                  <LinkedinIcon className="w-5 h-5 text-zinc-555 group-hover:text-blue-450 transition-colors duration-300" />
                  <span className="text-xs uppercase font-bold tracking-wider">LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Terminal GPS coordinates */}
            <div className="text-xs font-mono text-zinc-600 flex items-center gap-2 pt-2 border-t border-zinc-900/60 max-w-xl">
              <Terminal className="w-4 h-4 text-zinc-650 animate-pulse" />
              <span>STATION_LOC: GMT+5:30 (Kerala, India) // ACTIVE</span>
            </div>
          </div>

          {/* Right Column: Premium Contact Form */}
          <div className="lg:col-span-6 w-full flex justify-end">
            <div className="max-w-xl lg:max-w-lg w-full relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-emerald-500/5 rounded-full blur-[90px] pointer-events-none" />
              <ContactForm />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
