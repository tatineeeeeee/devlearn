import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { Clock, Calendar, User, ArrowRight } from "lucide-react";
import type { TutorialMeta } from "@/lib/tutorials";

interface TutorialCardProps {
  tutorial: TutorialMeta;
  featured?: boolean;
}

const difficultyColors = {
  beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  intermediate: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const categoryColors: Record<string, string> = {
  nextjs: "bg-black text-white dark:bg-white dark:text-black",
  react: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  tailwind: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  typescript: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  javascript: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
};

export function TutorialCard({ tutorial, featured }: TutorialCardProps) {
  return (
    <Link
      href={`/tutorials/${tutorial.category}/${tutorial.slug}`}
      className={cn(
        "group block p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10",
        featured && "md:col-span-2 md:flex md:gap-8"
      )}
    >
      <div className={cn("flex-1", featured && "md:flex md:flex-col md:justify-center")}>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className={cn(
              "text-xs font-medium px-2.5 py-1 rounded-full capitalize",
              categoryColors[tutorial.category.toLowerCase()] || "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            )}
          >
            {tutorial.category}
          </span>
          <span
            className={cn(
              "text-xs font-medium px-2.5 py-1 rounded-full capitalize",
              difficultyColors[tutorial.difficulty]
            )}
          >
            {tutorial.difficulty}
          </span>
        </div>

        <h3
          className={cn(
            "font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2",
            featured ? "text-2xl" : "text-lg"
          )}
        >
          {tutorial.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {tutorial.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
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
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-1 mt-4 text-blue-600 dark:text-blue-400 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          Read tutorial <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
