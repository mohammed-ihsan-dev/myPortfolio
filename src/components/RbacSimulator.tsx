"use client";

import { useState } from "react";
import { Check, X, Shield, Users, BookOpen, Key, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type Role = "student" | "instructor" | "admin";

interface Permission {
  name: string;
  key: string;
  roles: { student: boolean; instructor: boolean; admin: boolean };
}

const permissions: Permission[] = [
  { name: "Browse Courses", key: "course:read", roles: { student: true, instructor: true, admin: true } },
  { name: "Watch Lecture Videos", key: "course:stream", roles: { student: true, instructor: true, admin: true } },
  { name: "Post Questions & Reviews", key: "course:interact", roles: { student: true, instructor: true, admin: true } },
  { name: "Create & Edit Course Content", key: "course:create", roles: { student: false, instructor: true, admin: true } },
  { name: "Publish Course Drafts", key: "course:publish", roles: { student: false, instructor: true, admin: true } },
  { name: "Manage Enrolled Students", key: "students:manage", roles: { student: false, instructor: true, admin: true } },
  { name: "Access Financial Dashboards", key: "admin:finance", roles: { student: false, instructor: false, admin: true } },
  { name: "Modify User Roles (RBAC Grid)", key: "admin:rbac", roles: { student: false, instructor: false, admin: true } },
];

export function RbacSimulator() {
  const [activeRole, setActiveRole] = useState<Role>("student");

  const getCodeSnippet = (role: Role) => {
    switch (role) {
      case "student":
        return `// Requesting course streams:
// req.user = { id: "std_01", role: "Student", scopes: ["course:read", "course:stream"] }
const hasAccess = checkPermission(req.user, "course:stream");
if (!hasAccess) return res.status(403).json({ error: "Access Denied" });

// STATUS: 200 OK - Loading stream buffer...`;
      case "instructor":
        return `// Requesting to publish a course:
// req.user = { id: "ins_74", role: "Instructor", scopes: ["course:create", "course:publish"] }
const hasAccess = checkPermission(req.user, "course:publish");
if (!hasAccess) return res.status(403).json({ error: "Access Denied" });

// STATUS: 200 OK - Course published successfully.`;
      case "admin":
        return `// Requesting to edit database roles:
// req.user = { id: "adm_99", role: "Admin", scopes: ["admin:rbac", "admin:finance"] }
const hasAccess = checkPermission(req.user, "admin:rbac");
if (!hasAccess) return res.status(403).json({ error: "Access Denied" });

// STATUS: 200 OK - Database RBAC record updated.`;
    }
  };

  return (
    <Card className="bg-zinc-950/70 border-zinc-800 text-zinc-100 backdrop-blur-md overflow-hidden">
      <CardHeader className="border-b border-zinc-800/60 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-500" />
            <CardTitle className="text-base font-semibold">RBAC Authorization Engine</CardTitle>
          </div>
          <Badge variant="outline" className="border-zinc-800 text-zinc-400 bg-zinc-900/60 font-mono text-xs">
            middleware.ts
          </Badge>
        </div>
        <CardDescription className="text-zinc-400 text-xs">
          Simulate how Zinda Learn authorizes server endpoints dynamically depending on user scope payloads.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Role Selectors */}
        <div className="grid grid-cols-3 gap-2">
          {(["student", "instructor", "admin"] as Role[]).map((role) => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`py-2 px-3 rounded-md border text-xs font-medium transition-all duration-200 capitalize flex items-center justify-center gap-1.5 ${
                activeRole === role
                  ? "bg-zinc-800/80 text-white border-zinc-600 shadow-sm"
                  : "bg-zinc-900/40 text-zinc-400 border-zinc-800/60 hover:text-zinc-200 hover:bg-zinc-900/80"
              }`}
            >
              {role === "student" && <BookOpen className="w-3.5 h-3.5" />}
              {role === "instructor" && <Users className="w-3.5 h-3.5" />}
              {role === "admin" && <Key className="w-3.5 h-3.5" />}
              {role}
            </button>
          ))}
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Permission list */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Endpoint Authorization Grid
            </h4>
            <div className="space-y-1.5 max-h-[170px] overflow-y-auto pr-1">
              {permissions.map((perm) => {
                const isAllowed = perm.roles[activeRole];
                return (
                  <div
                    key={perm.key}
                    className={`flex items-center justify-between p-2 rounded text-xs transition-colors ${
                      isAllowed ? "bg-emerald-950/10 border border-emerald-950/20" : "bg-zinc-900/20 border border-transparent"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-zinc-200">{perm.name}</span>
                      <span className="text-xs text-zinc-500 font-mono">{perm.key}</span>
                    </div>
                    <div>
                      {isAllowed ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <X className="w-4 h-4 text-zinc-600" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Console Code Output */}
          <div className="flex flex-col bg-zinc-900/80 border border-zinc-800 rounded-md overflow-hidden font-mono text-xs text-zinc-300">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-zinc-950 border-b border-zinc-800/60 text-zinc-400">
              <Terminal className="w-3 h-3 text-emerald-500" />
              <span>authorization_controller.js</span>
            </div>
            <div className="p-3 flex-1 whitespace-pre overflow-x-auto leading-relaxed text-zinc-400">
              {getCodeSnippet(activeRole).split("\n").map((line, idx) => {
                const isComment = line.trim().startsWith("//");
                const isStatus = line.includes("STATUS:");
                return (
                  <div
                    key={idx}
                    className={
                      isComment
                        ? "text-zinc-600"
                        : isStatus
                        ? "text-emerald-400 font-semibold"
                        : "text-zinc-300"
                    }
                  >
                    {line}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
