import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { TutorialCard } from "@/components";
import { getTutorialsByCategory, getAllCategories } from "@/lib/tutorials";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  return {
    title: `${formattedCategory} Tutorials`,
    description: `Learn ${formattedCategory} with our comprehensive tutorials and guides.`,
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({ category }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const tutorials = getTutorialsByCategory(category);

  if (tutorials.length === 0 && !getAllCategories().includes(category)) {
    notFound();
  }

  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
        <Link
          href="/tutorials"
          className="hover:text-gray-900 dark:hover:text-white"
        >
          Tutorials
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 dark:text-white capitalize">
          {category}
        </span>
      </nav>

      <div className="mb-12">
        <Link
          href="/tutorials"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          All tutorials
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {formattedCategory} Tutorials
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {tutorials.length} tutorials to help you master {formattedCategory}
        </p>
      </div>

      {tutorials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <TutorialCard
              key={`${tutorial.category}-${tutorial.slug}`}
              tutorial={tutorial}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No tutorials yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We&apos;re working on creating tutorials for this category.
          </p>
          <Link
            href="/tutorials"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Browse all tutorials
          </Link>
        </div>
      )}
    </div>
  );
}
