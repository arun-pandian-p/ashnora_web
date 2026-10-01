import { motion } from "framer-motion";
import { Clock, CheckCircle2, ChefHat, Bell, UtensilsCrossed, Receipt, CreditCard, Sparkles } from "lucide-react";

const STEPS = [
  { key: "pending", label: "Placed", icon: Clock },
  { key: "confirmed", label: "Confirmed", icon: CheckCircle2 },
  { key: "preparing", label: "Preparing", icon: ChefHat },
  { key: "ready", label: "Ready", icon: Bell },
  { key: "served", label: "Served", icon: UtensilsCrossed },
  { key: "bill_requested", label: "Bill Sent", icon: Receipt },
  { key: "paid", label: "Paid", icon: CreditCard },
  { key: "completed", label: "Completed", icon: Sparkles },
] as const;

interface OrderStatusPipelineProps {
  currentStatus: string | null;
  timestamps?: Record<string, string | null>;
}

export function OrderStatusPipeline({ currentStatus, timestamps }: OrderStatusPipelineProps) {
  const normalizedStatus = (currentStatus || 'pending').toLowerCase();
  let currentIdx = STEPS.findIndex((s) => s.key === normalizedStatus);
  if (currentIdx === -1) {
    if (normalizedStatus === 'billed' || normalizedStatus === 'payment_pending') currentIdx = 5;
    else currentIdx = 0;
  }
  const activeIdx = currentIdx;

  return (
    <div className="w-full py-4 select-none">
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-5 left-4 right-4 h-0.5 bg-zinc-200 dark:bg-zinc-800" />

        {/* Active progress line */}
        <motion.div
          className="absolute top-5 left-4 h-0.5 bg-emerald-500"
          initial={{ width: 0 }}
          animate={{
            width: `calc(${(activeIdx / (STEPS.length - 1)) * 100}% - 32px)`,
          }}
          transition={{ duration: 0.5 }}
        />

        {STEPS.map((step, idx) => {
          const StepIcon = step.icon;
          const isActive = idx <= activeIdx;
          const isCurrent = idx === activeIdx;

          return (
            <div
              key={step.key}
              className="relative z-10 flex flex-col items-center gap-1.5"
            >
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all shadow-xs ${
                  isActive
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-400"
                }`}
                animate={isCurrent ? { scale: [1, 1.12, 1] } : {}}
                transition={
                  isCurrent
                    ? { duration: 1.5, repeat: Infinity }
                    : undefined
                }
              >
                <StepIcon className="w-3.5 h-3.5" />
              </motion.div>
              <span
                className={`text-[9px] font-bold text-center leading-tight ${
                  isActive ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
