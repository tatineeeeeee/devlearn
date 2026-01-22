import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Code,
  Sparkles,
  Zap,
  Users,
  Star,
} from "lucide-react";
import { TutorialCard, CategoryGrid } from "@/components";
import {
  getAllTutorials,
  getFeaturedTutorials,
  getAllCategories,
} from "@/lib/tutorials";

export default function Home() {
  const allTutorials = getAllTutorials();
  const featuredTutorials = getFeaturedTutorials();
  const categories = getAllCategories();
  const recentTutorials = allTutorials.slice(0, 6);

  const categoryStats = categories.map((cat) => ({
    name: cat,
    count: allTutorials.filter((t) => t.category === cat).length,
  }));

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-blue-50/50 to-[var(--background)] dark:from-blue-950/20 py-20 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Open-source learning platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-6 leading-tight">
              Learn Modern{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                Web Development
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--foreground-muted)] mb-10 max-w-2xl mx-auto">
              Free, high-quality tutorials covering Next.js, React, Tailwind
              CSS, TypeScript, and more. Built by developers, for developers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/tutorials"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity"
              >
                Browse Tutorials
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] text-[var(--foreground)] font-medium hover:bg-[var(--surface-hover)] transition-colors"
              >
                Explore Categories
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
            {[
              {
                icon: BookOpen,
                label: "Tutorials",
                value: `${allTutorials.length}+`,
              },
              { icon: Code, label: "Code Examples", value: "100+" },
              {
                icon: Users,
                label: "Categories",
                value: categories.length.toString(),
              },
              { icon: Star, label: "Open Source", value: "100%" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center p-6 bg-[var(--card-bg)] rounded-2xl border border-[var(--border)] shadow-[var(--card-shadow)] transition-shadow hover:shadow-[var(--card-shadow-hover)]"
              >
                <stat.icon className="w-8 h-8 text-[var(--accent-primary)] mb-3" />
                <span className="text-2xl font-bold text-[var(--foreground)]">
                  {stat.value}
                </span>
                <span className="text-sm text-[var(--foreground-muted)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tutorials */}
      {featuredTutorials.length > 0 && (
        <section className="py-20 bg-[var(--background-secondary)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">
                  Featured Tutorials
                </h2>
                <p className="text-[var(--foreground-muted)]">
                  Hand-picked tutorials to get you started
                </p>
              </div>
              <Link
                href="/tutorials"
                className="hidden sm:flex items-center gap-1 text-[var(--accent-primary)] font-medium hover:underline"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredTutorials.slice(0, 2).map((tutorial) => (
                <TutorialCard
                  key={`${tutorial.category}-${tutorial.slug}`}
                  tutorial={tutorial}
                  featured
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {categoryStats.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
                Explore by Category
              </h2>
              <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
                Find tutorials organized by technology. From frontend frameworks
                to backend tools, we&apos;ve got you covered.
              </p>
            </div>
            <CategoryGrid categories={categoryStats} />
          </div>
        </section>
      )}

      {/* Recent Tutorials */}
      {recentTutorials.length > 0 && (
        <section className="py-20 bg-[var(--background-secondary)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">
                  Latest Tutorials
                </h2>
                <p className="text-[var(--foreground-muted)]">
                  Fresh content to keep you learning
                </p>
              </div>
              <Link
                href="/tutorials"
                className="hidden sm:flex items-center gap-1 text-[var(--accent-primary)] font-medium hover:underline"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentTutorials.map((tutorial) => (
                <TutorialCard
                  key={`${tutorial.category}-${tutorial.slug}`}
                  tutorial={tutorial}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 to-purple-600 p-8 sm:p-16">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative text-center">
              <Zap className="w-12 h-12 text-white/80 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Want to Contribute?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                DevLearn is open source. Help us create the best learning
                resource for developers by contributing tutorials, fixing bugs,
                or improving documentation.
              </p>
              <a
                href="https://github.com/tatineeeeeee/devlearn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors"
              >
                <Star className="w-5 h-5" />
                Star on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Empty State */}
      {allTutorials.length === 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <BookOpen className="w-16 h-16 text-[var(--foreground-muted)] mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                Tutorials Coming Soon
              </h2>
              <p className="text-[var(--foreground-muted)] max-w-md mx-auto">
                We&apos;re working on creating amazing tutorials. Check back
                soon or contribute your own!
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
