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
import { TableOfContents } from "@/components";
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
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  intermediate:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default async function TutorialPage({ params }: TutorialPageProps) {
  const { category, slug } = await params;
  const tutorial = getTutorial(category, slug);

  if (!tutorial) {
    notFound();
  }

  const content = await compileMDXContent(tutorial.content);
  const headings = extractHeadings(tutorial.content);

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
        <Link
          href={`/tutorials/${category}`}
          className="hover:text-gray-900 dark:hover:text-white capitalize"
        >
          {category}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 dark:text-white truncate max-w-50">
          {tutorial.title}
        </span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <article className="flex-1 min-w-0">
          <Link
            href={`/tutorials/${category}`}
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
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
                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {tutorial.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {tutorial.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
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
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:text-sm prose-pre:p-0 prose-pre:bg-transparent">
            {content}
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Share this tutorial:
                </span>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <Bookmark className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0">
          <TableOfContents headings={headings} />
        </aside>
      </div>
    </div>
  );
}
