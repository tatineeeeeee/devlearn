import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const tutorialsDirectory = path.join(process.cwd(), "content/tutorials");

export interface Tutorial {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  author: string;
  readingTime: string;
  content: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  featured?: boolean;
}

export interface TutorialMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  author: string;
  readingTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  featured?: boolean;
}

export function getAllTutorials(): TutorialMeta[] {
  if (!fs.existsSync(tutorialsDirectory)) {
    return [];
  }

  const categories = fs.readdirSync(tutorialsDirectory);
  const tutorials: TutorialMeta[] = [];

  for (const category of categories) {
    const categoryPath = path.join(tutorialsDirectory, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const files = fs.readdirSync(categoryPath);

    for (const file of files) {
      if (!file.endsWith(".mdx")) continue;

      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);

      tutorials.push({
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        category,
        tags: data.tags || [],
        author: data.author || "DevLearn Team",
        readingTime: stats.text,
        difficulty: data.difficulty || "beginner",
        featured: data.featured || false,
      });
    }
  }

  return tutorials.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getTutorialsByCategory(category: string): TutorialMeta[] {
  return getAllTutorials().filter(
    (tutorial) => tutorial.category.toLowerCase() === category.toLowerCase()
  );
}

export function getFeaturedTutorials(): TutorialMeta[] {
  return getAllTutorials().filter((tutorial) => tutorial.featured);
}

export function getTutorial(
  category: string,
  slug: string
): Tutorial | undefined {
  const fullPath = path.join(tutorialsDirectory, category, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return undefined;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    category,
    tags: data.tags || [],
    author: data.author || "DevLearn Team",
    readingTime: stats.text,
    content,
    difficulty: data.difficulty || "beginner",
    featured: data.featured || false,
  };
}

export function getAllCategories(): string[] {
  if (!fs.existsSync(tutorialsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(tutorialsDirectory)
    .filter((item) =>
      fs.statSync(path.join(tutorialsDirectory, item)).isDirectory()
    );
}

export function getAllTags(): string[] {
  const tutorials = getAllTutorials();
  const tagsSet = new Set<string>();

  tutorials.forEach((tutorial) => {
    tutorial.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

export function searchTutorials(query: string): TutorialMeta[] {
  const tutorials = getAllTutorials();
  const lowerQuery = query.toLowerCase();

  return tutorials.filter(
    (tutorial) =>
      tutorial.title.toLowerCase().includes(lowerQuery) ||
      tutorial.description.toLowerCase().includes(lowerQuery) ||
      tutorial.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      tutorial.category.toLowerCase().includes(lowerQuery)
  );
}
