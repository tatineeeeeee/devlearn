import { MetadataRoute } from "next";
import { getAllTutorials, getAllCategories } from "@/lib/tutorials";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://devlearn.dev";
    const tutorials = getAllTutorials();
    const categories = getAllCategories();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/tutorials`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/categories`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
    ];

    // Category pages
    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
        url: `${baseUrl}/tutorials/${category}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    // Tutorial pages
    const tutorialPages: MetadataRoute.Sitemap = tutorials.map((tutorial) => ({
        url: `${baseUrl}/tutorials/${tutorial.category}/${tutorial.slug}`,
        lastModified: new Date(tutorial.date),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    return [...staticPages, ...categoryPages, ...tutorialPages];
}
