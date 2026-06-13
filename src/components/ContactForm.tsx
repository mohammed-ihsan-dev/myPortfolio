"use client";

import { useState } from "react";
import { Terminal, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = () => {
    const tempErrors: typeof errors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      tempErrors.message = "Message cannot be empty.";
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // Simulate sending email/message to server
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-zinc-950/40 border border-zinc-850/80 rounded-xl overflow-hidden backdrop-blur-md">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-950 border-b border-zinc-850/80 text-[11px] font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-emerald-500" />
          <span>contact_handler.sh</span>
        </div>
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500/60" />
          <span className="w-2 h-2 rounded-full bg-amber-500/60" />
          <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
        </div>
      </div>

      <div className="p-5">
        {status === "success" ? (
          <div className="text-center py-6 space-y-3">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-500">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-sm font-semibold text-zinc-200 font-mono">Transmission Complete</h4>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
              Your message was packetized and delivered. Mohammed Ihsan will process your request shortly.
            </p>
            <Button
              onClick={() => setStatus("idle")}
              variant="outline"
              className="mt-2 text-xs border-zinc-800 hover:bg-zinc-900/60 hover:text-zinc-100 font-mono"
            >
              Send Another Packet
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            {/* Input field: Name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-zinc-400 block text-[10px] uppercase tracking-wider font-semibold">
                Sender Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., Jane Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={status === "submitting"}
                className={`bg-zinc-900/40 border-zinc-800 focus-visible:ring-1 focus-visible:ring-zinc-600 focus-visible:border-zinc-700 text-zinc-200 placeholder:text-zinc-600 text-xs ${
                  errors.name ? "border-red-900/60 focus-visible:ring-red-950" : ""
                }`}
              />
              {errors.name && (
                <span className="text-[10px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </span>
              )}
            </div>

            {/* Input field: Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-zinc-400 block text-[10px] uppercase tracking-wider font-semibold">
                Return Path (Email)
              </label>
              <Input
                id="email"
                type="email"
                placeholder="e.g., jane@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={status === "submitting"}
                className={`bg-zinc-900/40 border-zinc-800 focus-visible:ring-1 focus-visible:ring-zinc-600 focus-visible:border-zinc-700 text-zinc-200 placeholder:text-zinc-600 text-xs ${
                  errors.email ? "border-red-900/60 focus-visible:ring-red-950" : ""
                }`}
              />
              {errors.email && (
                <span className="text-[10px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </span>
              )}
            </div>

            {/* Textarea field: Message */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="text-zinc-400 block text-[10px] uppercase tracking-wider font-semibold">
                Payload (Message)
              </label>
              <Textarea
                id="message"
                placeholder="Describe your project, timeline, or engineering opportunity..."
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                disabled={status === "submitting"}
                className={`bg-zinc-900/40 border-zinc-800 focus-visible:ring-1 focus-visible:ring-zinc-600 focus-visible:border-zinc-700 text-zinc-200 placeholder:text-zinc-600 text-xs leading-relaxed ${
                  errors.message ? "border-red-900/60 focus-visible:ring-red-950" : ""
                }`}
              />
              {errors.message && (
                <span className="text-[10px] text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.message}
                </span>
              )}
            </div>

            {status === "error" && (
              <div className="p-3 bg-red-950/20 border border-red-900/30 rounded text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Error packaging payload. Please try again.</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-950 text-xs font-semibold py-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {status === "submitting" ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                  <span>Transmitting Payload...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Message</span>
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
