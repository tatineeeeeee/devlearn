"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";

interface SearchResult {
  slug: string;
  title: string;
  description: string;
  category: string;
}

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const searchTutorials = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(searchTutorials, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--foreground-muted)] bg-[var(--background-secondary)] rounded-lg hover:bg-[var(--surface-hover)] border border-[var(--border)] transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search tutorials...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-[var(--card-bg)] border border-[var(--border)] rounded">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full max-w-xl mx-4 bg-[var(--card-bg)] rounded-xl shadow-2xl border border-[var(--border)] overflow-hidden">
            <div className="flex items-center gap-3 p-4 border-b border-[var(--border)]">
              <Search className="w-5 h-5 text-[var(--foreground-muted)]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tutorials, topics, or tags..."
                className="flex-1 bg-transparent outline-none text-[var(--foreground)] placeholder-[var(--foreground-muted)]"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-[var(--surface-hover)] rounded"
              >
                <X className="w-5 h-5 text-[var(--foreground-muted)]" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {isLoading && (
                <div className="p-8 text-center text-[var(--foreground-muted)]">
                  Searching...
                </div>
              )}

              {!isLoading && query.length >= 2 && results.length === 0 && (
                <div className="p-8 text-center text-[var(--foreground-muted)]">
                  No tutorials found for &quot;{query}&quot;
                </div>
              )}

              {!isLoading && results.length > 0 && (
                <ul className="p-2">
                  {results.map((result) => (
                    <li key={`${result.category}-${result.slug}`}>
                      <Link
                        href={`/tutorials/${result.category}/${result.slug}`}
                        onClick={() => {
                          setIsOpen(false);
                          setQuery("");
                        }}
                        className="flex flex-col gap-1 p-3 rounded-lg hover:bg-[var(--surface-hover)] transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded capitalize">
                            {result.category}
                          </span>
                          <span className="font-medium text-[var(--foreground)]">
                            {result.title}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--foreground-muted)] line-clamp-1">
                          {result.description}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {!isLoading && query.length < 2 && (
                <div className="p-8 text-center text-[var(--foreground-muted)]">
                  Type at least 2 characters to search
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
