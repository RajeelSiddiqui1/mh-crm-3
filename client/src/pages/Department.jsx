import { motion } from "framer-motion";
import { staggerContainer, listItem, fadeUp } from "../lib/animations";

export default function Department() {
  const departments = [
    { name: "Engineering", head: "Sarah Johnson", employees: 24, activeProjects: 8 },
    { name: "Marketing", head: "Emily Davis", employees: 12, activeProjects: 5 },
    { name: "Sales", head: "James Wilson", employees: 18, activeProjects: 12 },
    { name: "Human Resources", head: "Amanda Martinez", employees: 6, activeProjects: 2 },
  ];

  return (
    <motion.div variants={fadeUp} initial="initial" animate="animate" exit="exit" className="card-surface">
      <div className="card-inner min-h-[500px]">
        <header className="mb-4 flex items-center justify-between">
          <span className="label-caps">Departments</span>
          <span className="font-mono-data text-xs text-muted-foreground">
            {departments.length} items
          </span>
        </header>
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-0"
        >
          {departments.map((dept, i) => (
            <motion.div
              variants={listItem}
              key={i}
              className="flex items-center justify-between border-b border-border/50 py-3 last:border-0 transition-all duration-200 hover:bg-muted/50 -mx-2 px-4 rounded-lg cursor-pointer hover:-translate-y-0.5"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">{dept.name}</p>
                <div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="bg-secondary/50 px-2 py-0.5 rounded-md">Head: {dept.head}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="bg-secondary/50 px-2 py-0.5 rounded-md">Projects: {dept.activeProjects}</span>
                </div>
              </div>
              <span className="font-mono-data ml-4 shrink-0 text-xs text-primary bg-primary/10 px-3 py-1.5 rounded-full shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                {dept.employees} Employees
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
