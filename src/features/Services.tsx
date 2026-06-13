import { servicesData } from "@/data/portfolioData";
import { Server, Sparkles, Terminal } from "lucide-react";

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 border-b border-zinc-900 bg-zinc-950 overflow-hidden px-6 sm:px-12 bg-grid-zinc">
      {/* Background fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/80 to-zinc-950 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="flex items-center gap-2.5 text-emerald-450 font-mono text-sm font-semibold uppercase tracking-wider">
              <Server className="w-4.5 h-4.5" />
              <span>Offerings</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-100 uppercase leading-[0.9] font-sans">
              SERVICES & SOLUTIONS.
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed font-sans max-w-md">
              Custom software engineering solutions designed to build robust web systems, optimize database schemas, and create smooth user interfaces.
            </p>
          </div>

          {/* Right Column: Grid Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {servicesData.map((service, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-900/10 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/20 transition-all duration-300 flex flex-col justify-between gap-4 text-left group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                    <div className="flex items-center gap-2.5">
                      <Terminal className="w-4.5 h-4.5 text-emerald-500" />
                      <h3 className="text-sm font-mono font-bold text-zinc-200 uppercase tracking-wider">
                        {service.title}
                      </h3>
                    </div>
                    <Sparkles className="w-4 h-4 text-zinc-700 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans font-light">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
