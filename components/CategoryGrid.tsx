import Link from "next/link";
import {
  BookOpen,
  Layers,
  Palette,
  Code,
  Zap,
  Database,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  name: string;
  slug: string;
  description: string;
  icon: React.ElementType;
  color: string;
  count: number;
}

interface CategoryGridProps {
  categories: { name: string; count: number }[];
}

const categoryMeta: Record<
  string,
  { icon: React.ElementType; color: string; description: string }
> = {
  nextjs: {
    icon: Zap,
    color: "from-black to-gray-700",
    description: "Full-stack React framework for production",
  },
  react: {
    icon: Layers,
    color: "from-cyan-500 to-blue-500",
    description: "Build interactive user interfaces",
  },
  tailwind: {
    icon: Palette,
    color: "from-teal-500 to-cyan-500",
    description: "Utility-first CSS framework",
  },
  typescript: {
    icon: Code,
    color: "from-blue-500 to-indigo-500",
    description: "JavaScript with syntax for types",
  },
  javascript: {
    icon: BookOpen,
    color: "from-yellow-500 to-orange-500",
    description: "The language of the web",
  },
  database: {
    icon: Database,
    color: "from-purple-500 to-pink-500",
    description: "Data storage and management",
  },
};

export function CategoryGrid({ categories }: CategoryGridProps) {
  const enrichedCategories: Category[] = categories.map((cat) => {
    const meta = categoryMeta[cat.name.toLowerCase()] || {
      icon: BookOpen,
      color: "from-gray-500 to-gray-700",
      description: `Learn ${cat.name}`,
    };
    return {
      name: cat.name,
      slug: cat.name.toLowerCase(),
      description: meta.description,
      icon: meta.icon,
      color: meta.color,
      count: cat.count,
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {enrichedCategories.map((category) => {
        const Icon = category.icon;
        return (
          <Link
            key={category.slug}
            href={`/tutorials/${category.slug}`}
            className="group relative overflow-hidden rounded-2xl p-6 bg-linear-to-br transition-transform hover:scale-[1.02] hover:shadow-xl"
          >
            <div
              className={cn(
                "absolute inset-0 bg-linear-to-br opacity-90",
                category.color
              )}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-white/80">
                  {category.count} {category.count === 1 ? "tutorial" : "tutorials"}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 capitalize">
                {category.name}
              </h3>
              <p className="text-white/80 text-sm mb-4">{category.description}</p>
              <div className="flex items-center gap-1 text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Browse tutorials <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
