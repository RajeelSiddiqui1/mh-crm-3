import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, ListTodo, Building2, Users, ChevronLeft,
  Bell, Search, Moon, Sun,
} from "lucide-react";

// ─── THEME TOGGLE ───
function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    typeof window !== "undefined" && document.documentElement.classList.contains("dark")
  );
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
  return (
    <button
      onClick={() => setDark(!dark)}
      className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      aria-label="Toggle theme"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Tasks", icon: ListTodo, path: "/tasks" },
  { title: "Departments", icon: Building2, path: "/departments" },
  { title: "Users", icon: Users, path: "/users" },
];

const telemetryData = [
  "TASKS_ACTIVE: 2", "COMPLETION_RATE: 17%", "AVG_RESPONSE: 2.4h",
  "SLA_COMPLIANCE: 94%", "DEPT_LOAD: ENG:3 MKT:1 SALES:1 HR:1",
  "UPTIME: 99.97%", "QUEUE_DEPTH: 4", "SPRINT_VELOCITY: 12pts",
];

export function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const telemetryStrip = telemetryData.join("  ·  ");

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* ── SIDEBAR ── */}
      <aside className={`flex h-screen flex-col border-r border-border bg-card transition-all duration-300 ${sidebarCollapsed ? "w-16" : "w-64"}`}>
        <div className="flex h-14 items-center gap-3 border-b border-border px-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
            <ListTodo className="h-4 w-4 text-primary-foreground" />
          </div>
          {!sidebarCollapsed && <span className="text-base font-semibold tracking-tight text-foreground">TaskFlow</span>}
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.title}
                to={item.path}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!sidebarCollapsed && <span>{item.title}</span>}
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-border p-3">
          <div className="flex items-center justify-between">
            <ThemeToggle />
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              <ChevronLeft className={`h-4 w-4 transition-transform duration-300 ${sidebarCollapsed ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b border-border bg-card px-6">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground">
              {navItems.find(i => i.path === location.pathname)?.title || "Dashboard"}
            </h1>
            <p className="text-xs text-muted-foreground">Welcome back, Sarah Johnson</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="Search tasks..." className="h-8 w-56 rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <button className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">3</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">SJ</div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-foreground leading-none">Sarah Johnson</p>
                <p className="text-[11px] text-muted-foreground">Employee</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-background/50">
          {children}
        </main>

        {/* Telemetry Strip */}
        <div className="h-6 overflow-hidden border-t border-border bg-card">
          <div className="flex h-full items-center whitespace-nowrap animate-ticker">
            <span className="font-mono-data text-[10px] text-muted-foreground/70 px-4">{telemetryStrip}</span>
            <span className="font-mono-data text-[10px] text-muted-foreground/70 px-4">{telemetryStrip}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
