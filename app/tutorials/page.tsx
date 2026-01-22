import { Metadata } from "next";
import Link from "next/link";
import { TutorialCard } from "@/components";
import { getAllTutorials, getAllCategories, getAllTags } from "@/lib/tutorials";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "All Tutorials",
  description:
    "Browse all tutorials on Next.js, React, Tailwind CSS, TypeScript, and modern web development.",
};

interface TutorialsPageProps {
  searchParams: Promise<{ category?: string; tag?: string; difficulty?: string }>;
}

export default async function TutorialsPage({ searchParams }: TutorialsPageProps) {
  const params = await searchParams;
  const allTutorials = getAllTutorials();
  const categories = getAllCategories();
  const tags = getAllTags();

  let filteredTutorials = allTutorials;

  if (params.category) {
    filteredTutorials = filteredTutorials.filter(
      (t) => t.category.toLowerCase() === params.category!.toLowerCase()
    );
  }

  if (params.tag) {
    filteredTutorials = filteredTutorials.filter((t) =>
      t.tags.some((tag) => tag.toLowerCase() === params.tag!.toLowerCase())
    );
  }

  if (params.difficulty) {
    filteredTutorials = filteredTutorials.filter(
      (t) => t.difficulty === params.difficulty
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          All Tutorials
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {filteredTutorials.length} tutorials available to help you learn
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-8">
            {/* Categories Filter */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                <Link
                  href="/tutorials"
                  className={cn(
                    "block px-3 py-2 rounded-lg text-sm transition-colors",
                    !params.category
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  All Categories
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/tutorials?category=${category}`}
                    className={cn(
                      "block px-3 py-2 rounded-lg text-sm capitalize transition-colors",
                      params.category?.toLowerCase() === category.toLowerCase()
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Difficulty
              </h3>
              <div className="space-y-2">
                {["beginner", "intermediate", "advanced"].map((difficulty) => (
                  <Link
                    key={difficulty}
                    href={`/tutorials?difficulty=${difficulty}${params.category ? `&category=${params.category}` : ""}`}
                    className={cn(
                      "block px-3 py-2 rounded-lg text-sm capitalize transition-colors",
                      params.difficulty === difficulty
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                  >
                    {difficulty}
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags Filter */}
            {tags.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 10).map((tag) => (
                    <Link
                      key={tag}
                      href={`/tutorials?tag=${tag}`}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs transition-colors",
                        params.tag?.toLowerCase() === tag.toLowerCase()
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                      )}
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Tutorial Grid */}
        <div className="flex-1">
          {filteredTutorials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTutorials.map((tutorial) => (
                <TutorialCard
                  key={`${tutorial.category}-${tutorial.slug}`}
                  tutorial={tutorial}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No tutorials found
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your filters or check back later for new content.
              </p>
              <Link
                href="/tutorials"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Clear filters
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
