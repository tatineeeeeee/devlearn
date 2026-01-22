import Link from "next/link";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  headings: { level: number; text: string; id: string }[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
        On This Page
      </h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              heading.level === 2 && "ml-0",
              heading.level === 3 && "ml-4",
            )}
          >
            <Link
              href={`#${heading.id}`}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
