import Link from "next/link";
import { Github, Twitter, BookOpen, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background-secondary)] transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 shadow-md">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[var(--foreground)]">
                DevLearn
              </span>
            </Link>
            <p className="text-[var(--foreground-muted)] mb-4 max-w-md">
              Learn modern web development with hands-on tutorials covering
              Next.js, React, Tailwind CSS, TypeScript, and more.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/tatineeeeeee/devlearn"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors"
              >
                <Github className="w-5 h-5 text-[var(--foreground-muted)]" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors"
              >
                <Twitter className="w-5 h-5 text-[var(--foreground-muted)]" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--foreground)] mb-4">
              Tutorials
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/tutorials/nextjs"
                  className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  Next.js
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials/react"
                  className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  React
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials/tailwind"
                  className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  Tailwind CSS
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials/typescript"
                  className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  TypeScript
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--foreground)] mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/tatineeeeeee/devlearn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/tatineeeeeee/devlearn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  Contribute
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <p className="text-center text-[var(--foreground-muted)] text-sm flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by
            the DevLearn community. Open source on{" "}
            <a
              href="https://github.com/tatineeeeeee/devlearn"
              className="text-[var(--accent-primary)] hover:underline"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
