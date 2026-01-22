import Link from "next/link";
import { Github, BookOpen } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--card-bg)]/90 backdrop-blur-xl transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 shadow-md">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[var(--foreground)]">
                DevLearn
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/tutorials"
                className="text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 rounded"
              >
                Tutorials
              </Link>
              <Link
                href="/categories"
                className="text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 rounded"
              >
                Categories
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 rounded"
              >
                About
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <SearchBar />
            <ThemeToggle />
            <a
              href="https://github.com/tatineeeeeee/devlearn"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex p-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
              aria-label="View source on GitHub"
            >
              <Github className="w-5 h-5 text-[var(--foreground-muted)]" />
            </a>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
