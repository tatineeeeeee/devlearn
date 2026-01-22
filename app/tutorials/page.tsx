import { Metadata } from "next";
import Link from "next/link";
import { TutorialCard, Pagination, ProgressStats } from "@/components";
import { getAllTutorials, getAllCategories, getAllTags } from "@/lib/tutorials";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "All Tutorials",
  description:
    "Browse all tutorials on Next.js, React, Tailwind CSS, TypeScript, and modern web development.",
};

const TUTORIALS_PER_PAGE = 8;

interface TutorialsPageProps {
  searchParams: Promise<{
    category?: string;
    tag?: string;
    difficulty?: string;
    page?: string;
  }>;
}

export default async function TutorialsPage({
  searchParams,
}: TutorialsPageProps) {
  const params = await searchParams;
  const allTutorials = getAllTutorials();
  const categories = getAllCategories();
  const tags = getAllTags();

  let filteredTutorials = allTutorials;

  if (params.category) {
    filteredTutorials = filteredTutorials.filter(
      (t) => t.category.toLowerCase() === params.category!.toLowerCase(),
    );
  }

  if (params.tag) {
    filteredTutorials = filteredTutorials.filter((t) =>
      t.tags.some((tag) => tag.toLowerCase() === params.tag!.toLowerCase()),
    );
  }

  if (params.difficulty) {
    filteredTutorials = filteredTutorials.filter(
      (t) => t.difficulty === params.difficulty,
    );
  }

  // Pagination logic
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const totalTutorials = filteredTutorials.length;
  const totalPages = Math.ceil(totalTutorials / TUTORIALS_PER_PAGE);
  const startIndex = (currentPage - 1) * TUTORIALS_PER_PAGE;
  const endIndex = startIndex + TUTORIALS_PER_PAGE;
  const paginatedTutorials = filteredTutorials.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">
          All Tutorials
        </h1>
        <p className="text-[var(--foreground-muted)] text-lg mb-6">
          {filteredTutorials.length} tutorials available to help you learn
        </p>
        <ProgressStats totalTutorials={totalTutorials} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-8">
            {/* Categories Filter */}
            <div>
              <h3 className="font-semibold text-[var(--foreground)] mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                <Link
                  href="/tutorials"
                  className={cn(
                    "block px-3 py-2 rounded-lg text-sm transition-colors",
                    !params.category
                      ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400"
                      : "text-[var(--foreground-muted)] hover:bg-[var(--surface-hover)]",
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
                        ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400"
                        : "text-[var(--foreground-muted)] hover:bg-[var(--surface-hover)]",
                    )}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <h3 className="font-semibold text-[var(--foreground)] mb-4">
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
                        ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400"
                        : "text-[var(--foreground-muted)] hover:bg-[var(--surface-hover)]",
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
                <h3 className="font-semibold text-[var(--foreground)] mb-4">
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
                          ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400"
                          : "bg-[var(--background-secondary)] text-[var(--foreground-muted)] hover:bg-[var(--surface-hover)]",
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
          {paginatedTutorials.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedTutorials.map((tutorial) => (
                  <TutorialCard
                    key={`${tutorial.category}-${tutorial.slug}`}
                    tutorial={tutorial}
                  />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                No tutorials found
              </h2>
              <p className="text-[var(--foreground-muted)] mb-6">
                Try adjusting your filters or check back later for new content.
              </p>
              <Link
                href="/tutorials"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent-primary)] text-white hover:opacity-90 transition-opacity"
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
