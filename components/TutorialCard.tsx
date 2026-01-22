import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { Clock, Calendar, User, ArrowRight } from "lucide-react";
import type { TutorialMeta } from "@/lib/tutorials";

interface TutorialCardProps {
  tutorial: TutorialMeta;
  featured?: boolean;
}

const difficultyColors = {
  beginner:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  intermediate:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  advanced: "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
};

const categoryColors: Record<string, string> = {
  nextjs: "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
  react: "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
  tailwind: "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400",
  typescript: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  javascript:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
};

export function TutorialCard({ tutorial, featured }: TutorialCardProps) {
  return (
    <Link
      href={`/tutorials/${tutorial.category}/${tutorial.slug}`}
      className={cn(
        "group block p-6 bg-[var(--card-bg)] rounded-2xl border border-[var(--border)] hover:border-[var(--accent-primary)] transition-all duration-300 shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)]",
        featured && "md:col-span-2 md:flex md:gap-8",
      )}
    >
      <div
        className={cn(
          "flex-1",
          featured && "md:flex md:flex-col md:justify-center",
        )}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className={cn(
              "text-xs font-medium px-2.5 py-1 rounded-full capitalize",
              categoryColors[tutorial.category.toLowerCase()] ||
                "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
            )}
          >
            {tutorial.category}
          </span>
          <span
            className={cn(
              "text-xs font-medium px-2.5 py-1 rounded-full capitalize",
              difficultyColors[tutorial.difficulty],
            )}
          >
            {tutorial.difficulty}
          </span>
        </div>

        <h3
          className={cn(
            "font-bold text-[var(--foreground)] group-hover:text-[var(--accent-primary)] transition-colors mb-2",
            featured ? "text-2xl" : "text-lg",
          )}
        >
          {tutorial.title}
        </h3>

        <p className="text-[var(--foreground-muted)] mb-4 line-clamp-2">
          {tutorial.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--foreground-muted)]">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(tutorial.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {tutorial.readingTime}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {tutorial.author}
          </span>
        </div>

        {tutorial.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tutorial.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-[var(--background-secondary)] text-[var(--foreground-muted)] rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-1 mt-4 text-[var(--accent-primary)] font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          Read tutorial <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
