import { TutorialGridSkeleton } from "@/components/Skeleton";

export default function TutorialsLoading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Skeleton */}
      <div className="mb-12">
        <div className="h-10 w-48 bg-[var(--border)] rounded animate-pulse mb-4" />
        <div className="h-6 w-64 bg-[var(--border)] rounded animate-pulse" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Skeleton */}
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-8">
            {/* Categories Filter Skeleton */}
            <div>
              <div className="h-5 w-24 bg-[var(--border)] rounded animate-pulse mb-4" />
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 bg-[var(--border)] rounded-lg animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* Difficulty Filter Skeleton */}
            <div>
              <div className="h-5 w-20 bg-[var(--border)] rounded animate-pulse mb-4" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 bg-[var(--border)] rounded-lg animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* Tags Skeleton */}
            <div>
              <div className="h-5 w-28 bg-[var(--border)] rounded animate-pulse mb-4" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-7 w-16 bg-[var(--border)] rounded-full animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Tutorial Grid Skeleton */}
        <div className="flex-1">
          <TutorialGridSkeleton count={6} />
        </div>
      </div>
    </div>
  );
}
