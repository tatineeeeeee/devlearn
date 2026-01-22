import { Metadata } from "next";
import Link from "next/link";
import { Github, Twitter, Heart, BookOpen, Users, Star, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about DevLearn - an open-source platform for learning modern web development.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          About DevLearn
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          An open-source platform dedicated to helping developers learn modern
          web technologies through high-quality, practical tutorials.
        </p>
      </div>

      {/* Mission */}
      <section className="max-w-4xl mx-auto mb-20">
        <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-white/90 leading-relaxed">
            We believe that quality education should be free and accessible to
            everyone. DevLearn provides comprehensive tutorials that focus on
            real-world applications, helping you build practical skills that
            matter in the industry.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-4xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
          What We Believe In
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: BookOpen,
              title: "Learning by Doing",
              description:
                "Every tutorial includes practical examples and hands-on exercises. Theory is important, but practice makes perfect.",
            },
            {
              icon: Users,
              title: "Community First",
              description:
                "DevLearn is built by developers, for developers. We welcome contributions and value feedback from our community.",
            },
            {
              icon: Star,
              title: "Quality Content",
              description:
                "We focus on creating well-researched, up-to-date content that follows best practices and industry standards.",
            },
            {
              icon: Code,
              title: "Open Source",
              description:
                "All our content and code is open source. Fork it, improve it, and share it with others.",
            },
          ].map((value) => (
            <div
              key={value.title}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700"
            >
              <value.icon className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-4xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
          Built With
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "Next.js 16",
            "React 19",
            "TypeScript",
            "Tailwind CSS",
            "MDX",
            "Shiki",
          ].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Contribute */}
      <section className="max-w-4xl mx-auto mb-20">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-8 sm:p-12 text-center">
          <Heart className="w-12 h-12 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Want to Contribute?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            DevLearn is open source and we welcome contributions! Whether
            it&apos;s writing tutorials, fixing bugs, or improving documentation,
            every contribution helps.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium hover:opacity-90 transition-opacity"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              <Twitter className="w-5 h-5" />
              Follow Updates
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Get in Touch
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Have questions, suggestions, or feedback? We&apos;d love to hear from you.
        </p>
        <Link
          href="mailto:hello@devlearn.dev"
          className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
        >
          hello@devlearn.dev
        </Link>
      </section>
    </div>
  );
}
