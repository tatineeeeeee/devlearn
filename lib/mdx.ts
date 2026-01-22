import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import { mdxComponents } from "@/components/mdx-components";

export async function compileMDXContent(content: string) {
    const { content: mdxContent } = await compileMDX({
        source: content,
        options: {
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                    rehypeSlug,
                    [rehypePrism, { ignoreMissing: true }],
                    [
                        rehypeAutolinkHeadings,
                        {
                            behavior: "wrap",
                            properties: {
                                className: ["anchor-link"],
                            },
                        },
                    ],
                ],
            },
        },
        components: mdxComponents,
    });

    return mdxContent;
}

export function extractHeadings(content: string) {
    const headingRegex = /^#{1,3}\s+(.+)$/gm;
    const headings: { level: number; text: string; id: string }[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[0].indexOf(" ");
        const text = match[1].trim();
        const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        headings.push({ level, text, id });
    }

    return headings;
}
