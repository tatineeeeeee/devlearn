"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
          <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-3">
          Oops! Something went wrong
        </h1>
        <p className="text-[var(--foreground-muted)] mb-8 leading-relaxed">
          We apologize for the inconvenience. An unexpected error has occurred.
          Please try again or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent-primary)] text-white font-medium hover:opacity-90 transition-opacity"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--background-secondary)] text-[var(--foreground)] font-medium hover:bg-[var(--surface-hover)] transition-colors border border-[var(--border)]"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>
        {error.digest && (
          <p className="mt-6 text-xs text-[var(--foreground-muted)]">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
