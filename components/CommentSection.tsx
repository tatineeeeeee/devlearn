import { getComments } from "@/app/actions/comments";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

interface CommentSectionProps {
  tutorialSlug: string;
}

export default async function CommentSection({
  tutorialSlug,
}: CommentSectionProps) {
  const comments = await getComments(tutorialSlug);

  // Count total comments including replies
  const totalComments = comments.reduce((acc, comment) => {
    return acc + 1 + (comment.replies?.length || 0);
  }, 0);

  return (
    <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Comments ({totalComments})
      </h2>

      {/* Comment Form */}
      <div className="mb-8 p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Leave a Comment
        </h3>
        <CommentForm tutorialSlug={tutorialSlug} />
      </div>

      {/* Comments List */}
      <CommentList comments={comments} tutorialSlug={tutorialSlug} />
    </section>
  );
}
