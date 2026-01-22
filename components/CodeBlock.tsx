interface CodeBlockProps {
  children: string;
  language: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  children,
  language,
  filename,
  showLineNumbers,
}: CodeBlockProps) {
  const lines = children.split("\n");

  return (
    <div className="group relative my-6 rounded-xl overflow-hidden border border-[var(--border)] shadow-[var(--card-shadow)] transition-shadow hover:shadow-[var(--card-shadow-hover)]">
      {/* Header with filename and language badge */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--background-secondary)] border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          {filename && (
            <span className="text-sm text-[var(--foreground-muted)] font-mono">
              {filename}
            </span>
          )}
        </div>
        <span className="text-xs font-medium px-2 py-0.5 rounded bg-[var(--card-bg)] text-[var(--foreground-muted)] border border-[var(--border)]">
          {language}
        </span>
      </div>

      {/* Code content */}
      <div className="relative">
        <pre className="p-4 overflow-x-auto bg-[var(--code-bg)] text-sm leading-relaxed">
          {showLineNumbers ? (
            <code className={`language-${language} grid`}>
              {lines.map((line, i) => (
                <span key={i} className="table-row">
                  <span className="table-cell pr-4 text-right text-[var(--foreground-muted)] opacity-50 select-none w-8">
                    {i + 1}
                  </span>
                  <span className="table-cell">{line}</span>
                </span>
              ))}
            </code>
          ) : (
            <code className={`language-${language}`}>{children}</code>
          )}
        </pre>
      </div>
    </div>
  );
}
