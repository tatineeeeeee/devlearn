import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Callout } from "./Callout";
import { CopyButton } from "./CopyButton";
import { FileCode } from "lucide-react";

// Custom Pre component for code blocks with syntax highlighting
function Pre({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement> & { children?: React.ReactNode }) {
  return (
    <pre
      className="relative overflow-x-auto rounded-lg bg-[var(--code-bg)] p-4 text-sm leading-relaxed"
      {...props}
    >
      {children}
    </pre>
  );
}

// Custom Code component
function Code({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) {
  const isInline = !className?.includes("language-");

  if (isInline) {
    return (
      <code
        className="px-1.5 py-0.5 rounded-md bg-[var(--code-bg)] border border-[var(--border)] text-sm font-mono text-[var(--foreground)]"
        {...props}
      >
        {children}
      </code>
    );
  }

  // Extract language from className
  const language = className?.replace("language-", "") || "text";
  const codeString = typeof children === "string" ? children : "";

  return (
    <div className="group relative">
      {/* Language badge */}
      <div className="absolute right-3 top-3 flex items-center gap-2 z-10">
        <span className="text-xs font-medium px-2 py-0.5 rounded bg-[var(--background-secondary)] text-[var(--foreground-muted)] border border-[var(--border)]">
          {language}
        </span>
        <CopyButton code={codeString} />
      </div>
      <code className={cn("block font-mono", className)} {...props}>
        {children}
      </code>
    </div>
  );
}

// Enhanced code block wrapper
function CodeBlockWrapper({
  children,
  filename,
}: {
  children: React.ReactNode;
  filename?: string;
}) {
  return (
    <div className="my-6 rounded-xl overflow-hidden border border-[var(--border)] shadow-[var(--card-shadow)]">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--background-secondary)] border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <span className="text-sm text-[var(--foreground-muted)] font-mono flex items-center gap-2">
              <FileCode className="w-4 h-4" />
              {filename}
            </span>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

// Custom heading components with anchor links
function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const HeadingComponent = ({
    children,
    id,
    className,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement> & {
    children?: React.ReactNode;
  }) => {
    const baseStyles = "font-bold text-[var(--foreground)] scroll-mt-24";
    const sizeStyles = {
      1: "text-4xl mt-8 mb-4",
      2: "text-2xl mt-10 mb-4 pb-2 border-b border-[var(--border)]",
      3: "text-xl mt-8 mb-3",
      4: "text-lg mt-6 mb-2",
      5: "text-base mt-4 mb-2",
      6: "text-sm mt-4 mb-2",
    };

    const combinedClassName = cn(baseStyles, sizeStyles[level], className);

    return React.createElement(
      `h${level}`,
      { id, className: combinedClassName, ...props },
      children,
    );
  };

  HeadingComponent.displayName = `Heading${level}`;
  return HeadingComponent;
}

// Custom paragraph
function P({
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & {
  children?: React.ReactNode;
}) {
  return (
    <p
      className="my-4 leading-relaxed text-[var(--foreground-muted)]"
      {...props}
    >
      {children}
    </p>
  );
}

// Custom strong/bold
function Strong({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) {
  return (
    <strong className="font-semibold text-[var(--foreground)]" {...props}>
      {children}
    </strong>
  );
}

// Custom lists
function Ul({
  children,
  ...props
}: React.HTMLAttributes<HTMLUListElement> & { children?: React.ReactNode }) {
  return (
    <ul
      className="my-4 ml-6 list-disc space-y-2 text-[var(--foreground-muted)] marker:text-[var(--accent-primary)]"
      {...props}
    >
      {children}
    </ul>
  );
}

function Ol({
  children,
  ...props
}: React.HTMLAttributes<HTMLOListElement> & { children?: React.ReactNode }) {
  return (
    <ol
      className="my-4 ml-6 list-decimal space-y-2 text-[var(--foreground-muted)] marker:text-[var(--accent-primary)] marker:font-semibold"
      {...props}
    >
      {children}
    </ol>
  );
}

function Li({
  children,
  ...props
}: React.HTMLAttributes<HTMLLIElement> & { children?: React.ReactNode }) {
  return (
    <li className="leading-relaxed pl-2" {...props}>
      {children}
    </li>
  );
}

// Custom blockquote
function Blockquote({
  children,
  ...props
}: React.HTMLAttributes<HTMLQuoteElement> & { children?: React.ReactNode }) {
  return (
    <blockquote
      className="my-6 border-l-4 border-[var(--accent-primary)] bg-[var(--background-secondary)] rounded-r-lg px-6 py-4 italic text-[var(--foreground)]"
      {...props}
    >
      {children}
    </blockquote>
  );
}

// Custom link
function A({
  children,
  href,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: React.ReactNode;
}) {
  const isExternal = href?.startsWith("http");

  return (
    <a
      href={href}
      className="text-[var(--accent-primary)] font-medium hover:underline underline-offset-2"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}

// Custom horizontal rule
function Hr({ ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className="my-8 border-none h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"
      {...props}
    />
  );
}

// Custom table components
function Table({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableElement> & { children?: React.ReactNode }) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  );
}

function Th({
  children,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement> & {
  children?: React.ReactNode;
}) {
  return (
    <th
      className="px-4 py-3 text-left font-semibold text-[var(--foreground)] bg-[var(--background-secondary)] border-b-2 border-[var(--border)]"
      {...props}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> & {
  children?: React.ReactNode;
}) {
  return (
    <td
      className="px-4 py-3 text-[var(--foreground-muted)] border-b border-[var(--border)]"
      {...props}
    >
      {children}
    </td>
  );
}

// Image component - using next/image for optimization
function Img({
  src,
  alt,
  width,
  height,
}: {
  src?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
}) {
  // Check if it's an external URL
  const isExternal = typeof src === "string" && src.startsWith("http");

  if (!src || typeof src !== "string") return null;

  return (
    <figure className="my-8">
      {isExternal ? (
        // For external images, use unoptimized to avoid domain config issues
        <Image
          src={src}
          alt={alt || ""}
          width={Number(width) || 800}
          height={Number(height) || 450}
          className="rounded-lg border border-[var(--border)] shadow-[var(--card-shadow)] mx-auto"
          unoptimized
        />
      ) : (
        // For local images, use Next.js image optimization
        <Image
          src={src}
          alt={alt || ""}
          width={Number(width) || 800}
          height={Number(height) || 450}
          className="rounded-lg border border-[var(--border)] shadow-[var(--card-shadow)] mx-auto"
        />
      )}
      {alt && (
        <figcaption className="mt-3 text-center text-sm text-[var(--foreground-muted)]">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

// Export all MDX components
export const mdxComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  p: P,
  strong: Strong,
  ul: Ul,
  ol: Ol,
  li: Li,
  blockquote: Blockquote,
  a: A,
  hr: Hr,
  pre: Pre,
  code: Code,
  table: Table,
  th: Th,
  td: Td,
  img: Img,
  // Custom components
  Callout,
  CodeBlock: CodeBlockWrapper,
};
