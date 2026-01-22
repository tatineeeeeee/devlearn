"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

// Helper to safely access localStorage (client-side only)
function getStorageValue(key: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  return localStorage.getItem(key) ?? fallback;
}

interface ProgressTrackerProps {
  tutorialId: string;
  title: string;
}

export function ProgressTracker({ tutorialId }: ProgressTrackerProps) {
  // Use useSyncExternalStore for localStorage to avoid the lint warning
  const isCompleted = useSyncExternalStore(
    // Subscribe function - localStorage doesn't have events, so we use storage event
    (callback) => {
      window.addEventListener("storage", callback);
      return () => window.removeEventListener("storage", callback);
    },
    // Get snapshot (client)
    () =>
      getStorageValue(`tutorial-completed-${tutorialId}`, "false") === "true",
    // Get server snapshot
    () => false,
  );

  const [, forceUpdate] = useState({});

  const toggleComplete = useCallback(() => {
    const newState = !isCompleted;
    localStorage.setItem(`tutorial-completed-${tutorialId}`, String(newState));

    // Track completed tutorials list
    const completedList = JSON.parse(
      localStorage.getItem("completed-tutorials") || "[]",
    );
    if (newState) {
      if (!completedList.includes(tutorialId)) {
        completedList.push(tutorialId);
      }
    } else {
      const index = completedList.indexOf(tutorialId);
      if (index > -1) {
        completedList.splice(index, 1);
      }
    }
    localStorage.setItem("completed-tutorials", JSON.stringify(completedList));

    // Force re-render since useSyncExternalStore won't catch same-window changes
    forceUpdate({});
  }, [isCompleted, tutorialId]);

  return (
    <button
      onClick={toggleComplete}
      className={cn(
        "flex items-center gap-3 w-full p-4 rounded-xl border transition-all duration-200",
        isCompleted
          ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20"
          : "bg-[var(--background-secondary)] border-[var(--border)] hover:border-[var(--accent-primary)]",
      )}
    >
      {isCompleted ? (
        <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
      ) : (
        <Circle className="w-6 h-6 text-[var(--foreground-muted)] shrink-0" />
      )}
      <span
        className={cn(
          "text-sm font-medium text-left",
          isCompleted
            ? "text-emerald-700 dark:text-emerald-400"
            : "text-[var(--foreground-muted)]",
        )}
      >
        {isCompleted ? "Completed! Click to unmark" : "Mark as completed"}
      </span>
    </button>
  );
}

// Component to show progress stats
interface ProgressStatsProps {
  totalTutorials: number;
}

export function ProgressStats({ totalTutorials }: ProgressStatsProps) {
  // Use useSyncExternalStore for localStorage
  const completedCount = useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      return () => window.removeEventListener("storage", callback);
    },
    () => {
      const list = JSON.parse(getStorageValue("completed-tutorials", "[]"));
      return list.length;
    },
    () => 0,
  );

  if (completedCount === 0) return null;

  const percentage = Math.round((completedCount / totalTutorials) * 100);

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--background-secondary)] border border-[var(--border)]">
      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-[var(--foreground)]">
            Your Progress
          </span>
          <span className="text-sm text-[var(--foreground-muted)]">
            {completedCount} / {totalTutorials}
          </span>
        </div>
        <div className="w-full h-2 bg-[var(--border)] rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
