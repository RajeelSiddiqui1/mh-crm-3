import { motion } from "framer-motion";
import { staggerContainer, listItem, fadeUp } from "../lib/animations";

export default function User() {
  const users = [
    { name: "Sarah Johnson", email: "sarah.j@company.com", role: "Admin", department: "Engineering", status: "Active" },
    { name: "Michael Chen", email: "m.chen@company.com", role: "Manager", department: "Product", status: "Active" },
    { name: "Emily Davis", email: "edavis@company.com", role: "Employee", department: "Marketing", status: "Offline" },
    { name: "James Wilson", email: "j.wilson@company.com", role: "Employee", department: "Sales", status: "Active" },
    { name: "Amanda Martinez", email: "amanda.m@company.com", role: "Director", department: "HR", status: "Active" },
    { name: "Robert Taylor", email: "rtaylor@company.com", role: "Employee", department: "Engineering", status: "Active" },
  ];

  return (
    <motion.div variants={fadeUp} initial="initial" animate="animate" exit="exit" className="card-surface">
      <div className="card-inner min-h-[500px]">
        <header className="mb-4 flex items-center justify-between">
          <span className="label-caps">Team Members</span>
          <span className="font-mono-data text-xs text-muted-foreground">
            {users.length} items
          </span>
        </header>
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-0"
        >
          {users.map((user, i) => (
            <motion.div
              variants={listItem}
              key={i}
              className="flex items-center justify-between border-b border-border/50 py-3 last:border-0 transition-all duration-200 hover:bg-muted/50 -mx-2 px-4 rounded-lg cursor-pointer hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                  <div className="mt-1 flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] text-muted-foreground hidden sm:inline">{user.email}</span>
                    <span className="inline-flex rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground">
                      {user.role}
                    </span>
                    <span className="inline-flex rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                      {user.department}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0 text-xs">
                <div className={`h-2 w-2 rounded-full ${user.status === 'Active' ? 'bg-success' : 'bg-muted-foreground'}`}></div>
                <span className={`font-mono-data hidden sm:inline ${user.status === 'Active' ? 'text-success' : 'text-muted-foreground'}`}>
                  {user.status}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
