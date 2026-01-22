import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  ChevronRight,
  Share2,
  Bookmark,
} from "lucide-react";
import {
  TableOfContents,
  ReadingProgress,
  ProgressTracker,
  BreadcrumbSchema,
  ArticleSchema,
} from "@/components";
import { getTutorial, getAllTutorials } from "@/lib/tutorials";
import { compileMDXContent, extractHeadings } from "@/lib/mdx";
import { formatDate, cn } from "@/lib/utils";

interface TutorialPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: TutorialPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const tutorial = getTutorial(category, slug);

  if (!tutorial) {
    return { title: "Tutorial Not Found" };
  }

  return {
    title: tutorial.title,
    description: tutorial.description,
    openGraph: {
      title: tutorial.title,
      description: tutorial.description,
      type: "article",
      publishedTime: tutorial.date,
      authors: [tutorial.author],
      tags: tutorial.tags,
    },
  };
}

export async function generateStaticParams() {
  const tutorials = getAllTutorials();
  return tutorials.map((tutorial) => ({
    category: tutorial.category,
    slug: tutorial.slug,
  }));
}

const difficultyColors = {
  beginner:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  intermediate:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  advanced: "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
};

export default async function TutorialPage({ params }: TutorialPageProps) {
  const { category, slug } = await params;
  const tutorial = getTutorial(category, slug);

  if (!tutorial) {
    notFound();
  }

  const content = await compileMDXContent(tutorial.content);
  const headings = extractHeadings(tutorial.content);
  const tutorialId = `${category}-${slug}`;

  // Breadcrumb items for schema
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Tutorials", href: "/tutorials" },
    {
      name: category.charAt(0).toUpperCase() + category.slice(1),
      href: `/tutorials/${category}`,
    },
    {
      name: tutorial.title,
      href: `/tutorials/${category}/${slug}`,
    },
  ];

  return (
    <>
      <ReadingProgress />
      <BreadcrumbSchema items={breadcrumbItems} />
      <ArticleSchema
        title={tutorial.title}
        description={tutorial.description}
        datePublished={tutorial.date}
        dateModified={tutorial.date}
        author={tutorial.author}
        category={category}
        tags={tutorial.tags}
        url={`https://devlearn.dev/tutorials/${category}/${slug}`}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--foreground-muted)] mb-8">
          <Link
            href="/tutorials"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Tutorials
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            href={`/tutorials/${category}`}
            className="hover:text-[var(--foreground)] transition-colors capitalize"
          >
            {category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[var(--foreground)] truncate max-w-50">
            {tutorial.title}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <article className="flex-1 min-w-0">
            <Link
              href={`/tutorials/${category}`}
              className="inline-flex items-center gap-2 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {category} tutorials
            </Link>

            {/* Header */}
            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className={cn(
                    "text-xs font-medium px-2.5 py-1 rounded-full capitalize",
                    difficultyColors[tutorial.difficulty],
                  )}
                >
                  {tutorial.difficulty}
                </span>
                {tutorial.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-[var(--background-secondary)] text-[var(--foreground-muted)] rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-6 leading-tight">
                {tutorial.title}
              </h1>

              <p className="text-xl text-[var(--foreground-muted)] mb-6 leading-relaxed">
                {tutorial.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--foreground-muted)] pb-6 border-b border-[var(--border)]">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {tutorial.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(tutorial.date)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {tutorial.readingTime}
                </span>
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none prose-headings:scroll-mt-24">
              {content}
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-[var(--border)]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[var(--foreground-muted)]">
                    Share this tutorial:
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors">
                      <Share2 className="w-5 h-5 text-[var(--foreground-muted)]" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors">
                      <Bookmark className="w-5 h-5 text-[var(--foreground-muted)]" />
                    </button>
                  </div>
                </div>
                <ProgressTracker
                  tutorialId={tutorialId}
                  title={tutorial.title}
                />
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </div>
    </>
  );
}
