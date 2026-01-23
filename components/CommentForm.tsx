"use client";

import { useActionState } from "react";
import { createComment, CommentFormState } from "@/app/actions/comments";
import { useEffect, useRef } from "react";

interface CommentFormProps {
  tutorialSlug: string;
  parentId?: string;
  onSuccess?: () => void;
}

const initialState: CommentFormState = {
  success: false,
  message: "",
};

export default function CommentForm({
  tutorialSlug,
  parentId,
  onSuccess,
}: CommentFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const createCommentWithSlug = createComment.bind(null, tutorialSlug);
  const [state, formAction, isPending] = useActionState(
    createCommentWithSlug,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      onSuccess?.();
    }
  }, [state.success, onSuccess]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      {parentId && <input type="hidden" name="parentId" value={parentId} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="authorName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Name *
          </label>
          <input
            type="text"
            id="authorName"
            name="authorName"
            required
            minLength={2}
            maxLength={100}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-colors duration-200"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="authorEmail"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email *
          </label>
          <input
            type="email"
            id="authorEmail"
            name="authorEmail"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-colors duration-200"
            placeholder="your@email.com"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Your email won&apos;t be published
          </p>
        </div>
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Comment *
        </label>
        <textarea
          id="content"
          name="content"
          required
          minLength={10}
          maxLength={2000}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-colors duration-200 resize-y"
          placeholder="Write your comment..."
        />
      </div>

      {state.message && (
        <div
          className={`p-3 rounded-lg text-sm ${
            state.success
              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
          }`}
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 
                 text-white font-medium rounded-lg transition-colors duration-200
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                 dark:focus:ring-offset-gray-900"
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Posting...
          </span>
        ) : (
          "Post Comment"
        )}
      </button>
    </form>
  );
}
