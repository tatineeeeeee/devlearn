interface CodeBlockProps {
  children: string;
  language: string;
  filename?: string;
}

export function CodeBlock({ children, language, filename }: CodeBlockProps) {
  return (
    <div className="group relative my-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      {filename && (
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">
            {filename}
          </span>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto bg-gray-50 dark:bg-gray-900 text-sm">
          <code className={`language-${language}`}>{children}</code>
        </pre>
      </div>
    </div>
  );
}
