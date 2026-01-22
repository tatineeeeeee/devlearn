import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

interface CalloutProps {
  type?: "info" | "warning" | "error" | "success";
  title?: string;
  children: React.ReactNode;
}

const calloutStyles = {
  info: {
    container:
      "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    icon: Info,
    iconColor: "text-blue-500",
    title: "text-blue-800 dark:text-blue-300",
  },
  warning: {
    container:
      "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
    icon: AlertTriangle,
    iconColor: "text-yellow-500",
    title: "text-yellow-800 dark:text-yellow-300",
  },
  error: {
    container:
      "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    icon: AlertCircle,
    iconColor: "text-red-500",
    title: "text-red-800 dark:text-red-300",
  },
  success: {
    container:
      "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    icon: CheckCircle,
    iconColor: "text-green-500",
    title: "text-green-800 dark:text-green-300",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const styles = calloutStyles[type];
  const Icon = styles.icon;

  return (
    <div
      className={cn("my-6 flex gap-4 rounded-xl border p-4", styles.container)}
    >
      <Icon className={cn("w-6 h-6 shrink-0 mt-0.5", styles.iconColor)} />
      <div className="flex-1">
        {title && (
          <h4 className={cn("font-semibold mb-1", styles.title)}>{title}</h4>
        )}
        <div className="text-gray-700 dark:text-gray-300 text-sm [&>p]:m-0">
          {children}
        </div>
      </div>
    </div>
  );
}
