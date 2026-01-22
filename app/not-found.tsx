import Link from "next/link";
import { Home, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-9xl font-bold text-gray-200 dark:text-gray-800">404</p>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
          Page not found
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have
          been moved or doesn&apos;t exist.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            Go home
          </Link>
          <Link
            href="/tutorials"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Browse tutorials
          </Link>
        </div>
      </div>
    </div>
  );
}
