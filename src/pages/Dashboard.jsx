import { CheckCircle2, Clock, TrendingUp, AlertCircle, Users, Building2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, scaleUp } from "../lib/animations";

// Data
const barData = [
  { name: "Engineering", tasks: 3 },
  { name: "Marketing", tasks: 1 },
  { name: "Sales", tasks: 1 },
  { name: "HR", tasks: 1 },
];

const pieData = [
  { name: "Completed", value: 17, color: "hsl(142, 71%, 45%)" },
  { name: "In Progress", value: 33, color: "hsl(199, 89%, 48%)" },
  { name: "Pending", value: 33, color: "hsl(38, 92%, 50%)" },
  { name: "Review", value: 17, color: "hsl(270, 60%, 55%)" },
];

const activityFeed = [
  { user: "SJ", action: "completed a task", time: "2m ago" },
  { user: "AK", action: "added a comment", time: "15m ago" },
  { user: "MR", action: "created a task", time: "1h ago" },
];

function StatCard({ title, value, subtitle, icon, trend, progress }) {
  return (
    <motion.div variants={scaleUp} className="card-surface group">
      <div className="card-inner">
        <header className="mb-3 flex items-center justify-between">
          <span className="label-caps">{title}</span>
          <span className="text-muted-foreground">{icon}</span>
        </header>
        <div className="flex items-end gap-2">
          <span className="font-mono-data text-3xl font-semibold tracking-tight text-foreground">{value}</span>
          {trend && (
            <span className={`font-mono-data mb-1 text-xs font-medium ${trend.positive ? "text-success" : "text-destructive"}`}>
              {trend.positive ? "+" : ""}{trend.value}%
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        {progress !== undefined && (
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-primary"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={fadeUp} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Tasks" value={6} subtitle="Across all departments" icon={<CheckCircle2 className="h-4 w-4" />} trend={{ value: 12, positive: true }} />
        <StatCard title="In Progress" value={2} subtitle="Currently being worked on" icon={<Clock className="h-4 w-4" />} />
        <StatCard title="Completed" value={1} subtitle="17% completion rate" icon={<TrendingUp className="h-4 w-4" />} progress={17} trend={{ value: 17, positive: true }} />
        <StatCard title="Pending" value={2} subtitle="Awaiting assignment" icon={<AlertCircle className="h-4 w-4" />} />
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="card-surface h-full">
            <div className="card-inner h-full">
              <header className="mb-4 flex items-center justify-between">
                <span className="label-caps">Tasks by Department</span>
                <div className="h-2 w-2 animate-pulse-dot rounded-full bg-primary" />
              </header>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: 'hsl(var(--muted)/0.3)'}} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px", boxShadow: "var(--shadow-card)" }} labelStyle={{ color: "hsl(var(--foreground))" }} />
                    <Bar dataKey="tasks" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="card-surface h-full">
            <div className="card-inner h-full">
              <header className="mb-4 flex items-center justify-between">
                <span className="label-caps">Tasks by Status</span>
                <div className="h-2 w-2 animate-pulse-dot rounded-full bg-success" />
              </header>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="value" stroke="none">
                      {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} formatter={(value) => (<span style={{ color: "hsl(var(--muted-foreground))" }}>{value}</span>)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="card-surface h-full">
            <div className="card-inner h-full flex flex-col items-center justify-center p-8 text-center bg-secondary/20">
              <motion.div 
                initial={{ scale: 0.8, rotate: -10 }} 
                animate={{ scale: 1, rotate: 0 }} 
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
              >
                <Building2 className="h-8 w-8 text-primary" />
              </motion.div>
              <h3 className="text-xl font-medium text-foreground tracking-tight">Welcome to TaskFlow CRM</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                Manage your tasks, coordinate with departments, and track team progress all in one place. Navigate using the sidebar to explore.
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-4">
          <div className="card-surface">
            <div className="card-inner bg-secondary/20 border-t-0">
              <header className="mb-3 flex items-center justify-between"><span className="label-caps">Total Users</span><Users className="h-4 w-4 text-muted-foreground" /></header>
              <span className="font-mono-data text-3xl font-semibold text-foreground">5</span>
              <p className="mt-1 text-xs text-muted-foreground">Active employees</p>
            </div>
          </div>
          <div className="card-surface">
            <div className="card-inner">
              <header className="mb-3"><span className="label-caps">Recent Activity</span></header>
              <div className="space-y-3">
                {activityFeed.map((a, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="flex items-center gap-2 text-xs"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">{a.user}</div>
                    <span className="text-muted-foreground truncate">{a.action}</span>
                    <span className="font-mono-data ml-auto shrink-0 text-[10px] text-muted-foreground/60">{a.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
