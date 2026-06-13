import { FolderGit2, Database, ShieldAlert, Cpu } from "lucide-react";

const stats = [
  { label: "Products Built", value: "3+ Projects", desc: "Production & MERN case studies", icon: FolderGit2, color: "text-emerald-400" },
  { label: "MERN Stack Specialist", value: "React & Node", desc: "E-commerce & LMS architectures", icon: Database, color: "text-sky-400" },
  { label: "Current Placement", value: "Intern Role", desc: "Software developer at Bridgeon", icon: ShieldAlert, color: "text-amber-400" },
  { label: "Operational Capability", value: "Freelance", desc: "Custom client deployments & support", icon: Cpu, color: "text-purple-400" },
];

export function Stats() {
  return (
    <section className="bg-zinc-950 border-b border-zinc-900 py-10 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-xl bg-zinc-900/10 border border-zinc-900 hover:border-zinc-850 transition duration-300 flex flex-col justify-between gap-3 text-left group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                    {stat.label}
                  </span>
                  <Icon className={`w-4 h-4 ${stat.color} opacity-80 group-hover:scale-105 transition-transform`} />
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-black tracking-tight text-zinc-100 font-mono">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono leading-tight">
                    {stat.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
