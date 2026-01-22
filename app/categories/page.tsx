import { Metadata } from "next";
import { CategoryGrid } from "@/components";
import { getAllTutorials, getAllCategories } from "@/lib/tutorials";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse tutorials by category - Next.js, React, Tailwind CSS, TypeScript, and more.",
};

export default function CategoriesPage() {
  const allTutorials = getAllTutorials();
  const categories = getAllCategories();

  const categoryStats = categories.map((cat) => ({
    name: cat,
    count: allTutorials.filter((t) => t.category === cat).length,
  }));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Categories
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
          Explore tutorials organized by technology. Whether you&apos;re learning
          frontend frameworks, CSS utilities, or TypeScript, find the perfect
          starting point.
        </p>
      </div>

      {categoryStats.length > 0 ? (
        <CategoryGrid categories={categoryStats} />
      ) : (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No categories yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Categories will appear here once tutorials are added.
          </p>
        </div>
      )}
    </div>
  );
}
