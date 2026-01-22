import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

interface CalloutProps {
  type?: "info" | "warning" | "error" | "success" | "tip";
  title?: string;
  children: React.ReactNode;
}

const calloutStyles = {
  info: {
    container:
      "bg-blue-50/70 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30",
    icon: Info,
    iconColor: "text-blue-600 dark:text-blue-400",
    title: "text-blue-800 dark:text-blue-300",
  },
  warning: {
    container:
      "bg-amber-50/70 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30",
    icon: AlertTriangle,
    iconColor: "text-amber-600 dark:text-amber-400",
    title: "text-amber-800 dark:text-amber-300",
  },
  error: {
    container:
      "bg-rose-50/70 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30",
    icon: AlertCircle,
    iconColor: "text-rose-600 dark:text-rose-400",
    title: "text-rose-800 dark:text-rose-300",
  },
  success: {
    container:
      "bg-emerald-50/70 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30",
    icon: CheckCircle,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    title: "text-emerald-800 dark:text-emerald-300",
  },
  tip: {
    container:
      "bg-purple-50/70 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/30",
    icon: Lightbulb,
    iconColor: "text-purple-600 dark:text-purple-400",
    title: "text-purple-800 dark:text-purple-300",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const styles = calloutStyles[type];
  const Icon = styles.icon;

  return (
    <div
      className={cn(
        "my-6 flex gap-4 rounded-xl border p-4 backdrop-blur-sm",
        styles.container,
      )}
    >
      <Icon className={cn("w-6 h-6 shrink-0 mt-0.5", styles.iconColor)} />
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className={cn("font-semibold mb-1.5", styles.title)}>{title}</h4>
        )}
        <div className="text-[var(--foreground-muted)] text-sm leading-relaxed [&>p]:m-0 [&>p:not(:last-child)]:mb-2">
          {children}
        </div>
      </div>
    </div>
  );
}
