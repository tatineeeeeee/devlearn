import Link from "next/link";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  headings: { level: number; text: string; id: string }[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 p-5 bg-[var(--card-bg)] rounded-xl border border-[var(--border)] shadow-[var(--card-shadow)]">
      <h3 className="font-semibold text-[var(--foreground)] mb-4 pb-3 border-b border-[var(--border)]">
        On This Page
      </h3>
      <ul className="space-y-2.5">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              heading.level === 2 && "ml-0",
              heading.level === 3 &&
                "ml-4 border-l-2 border-[var(--border)] pl-3",
            )}
          >
            <Link
              href={`#${heading.id}`}
              className="text-sm text-[var(--foreground-muted)] hover:text-[var(--accent-primary)] transition-colors block py-0.5"
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
