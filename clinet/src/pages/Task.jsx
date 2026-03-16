import { motion } from "framer-motion";
import { staggerContainer, listItem, fadeUp } from "../lib/animations";

const tasks = [
  { title: "Update website homepage design", priority: "high", status: "in progress", dueDate: "3/19/2026" },
  { title: "Q1 Marketing Campaign Planning", priority: "urgent", status: "pending", dueDate: "3/14/2026" },
  { title: "Customer Database Migration", priority: "medium", status: "waiting review", dueDate: "3/24/2026" },
  { title: "Employee Onboarding Process Review", priority: "low", status: "completed", dueDate: "3/9/2026" },
  { title: "Sales Report Analysis", priority: "high", status: "in progress", dueDate: "3/17/2026" },
  { title: "Monthly Performance Review", priority: "medium", status: "pending", dueDate: "3/30/2026" },
  { title: "Server Maintenance", priority: "urgent", status: "in progress", dueDate: "3/18/2026" },
];

const priorityStyles = {
  high: "bg-destructive/10 text-destructive",
  urgent: "bg-accent/10 text-accent",
  medium: "bg-warning/10 text-warning",
  low: "bg-success/10 text-success",
};

const statusStyles = {
  "in progress": "bg-info/10 text-info",
  pending: "bg-warning/10 text-warning",
  "waiting review": "bg-accent/10 text-accent",
  completed: "bg-success/10 text-success",
};

export default function Task() {
  return (
    <motion.div variants={fadeUp} initial="initial" animate="animate" exit="exit" className="card-surface">
      <div className="card-inner min-h-[500px]">
        <header className="mb-4 flex items-center justify-between">
          <span className="label-caps">All Tasks</span>
          <span className="font-mono-data text-xs text-muted-foreground">
            {tasks.length} items
          </span>
        </header>
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-0"
        >
          {tasks.map((task, i) => (
            <motion.div
              variants={listItem}
              key={i}
              className="flex items-center justify-between border-b border-border/50 py-3 last:border-0 transition-all duration-200 hover:bg-muted/50 -mx-2 px-4 rounded-lg cursor-pointer hover:-translate-y-0.5"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${priorityStyles[task.priority]}`}>
                    {task.priority}
                  </span>
                  <span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${statusStyles[task.status]}`}>
                    {task.status}
                  </span>
                </div>
              </div>
              <span className="font-mono-data ml-4 shrink-0 text-xs text-muted-foreground">
                <span className="hidden sm:inline">Due: </span>{task.dueDate}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
