"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Comment } from "@/lib/supabase/types";
import { toggleLike, checkUserLikes } from "@/app/actions/comments";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import CommentForm from "./CommentForm";

interface CommentListProps {
  comments: Comment[];
  tutorialSlug: string;
}

// Generate a simple fingerprint for anonymous users
function getUserFingerprint(): string {
  if (typeof window === "undefined") return "";

  let fingerprint = localStorage.getItem("comment_fingerprint");
  if (!fingerprint) {
    fingerprint = crypto.randomUUID();
    localStorage.setItem("comment_fingerprint", fingerprint);
  }
  return fingerprint;
}

export default function CommentList({
  comments,
  tutorialSlug,
}: CommentListProps) {
  const [userLikes, setUserLikes] = useState<Record<string, boolean>>({});
  const [likeDeltas, setLikeDeltas] = useState<Record<string, number>>({});
  const fingerprintRef = useRef("");

  // Get all comment IDs including replies
  const allCommentIds = useMemo(() => {
    const ids: string[] = [];
    comments.forEach((comment) => {
      ids.push(comment.id);
      if (comment.replies) {
        ids.push(...comment.replies.map((r) => r.id));
      }
    });
    return ids;
  }, [comments]);

  // Calculate optimistic like counts
  const optimisticLikes = useMemo(() => {
    const counts: Record<string, number> = {};
    comments.forEach((comment) => {
      counts[comment.id] =
        (comment.like_count || 0) + (likeDeltas[comment.id] || 0);
      comment.replies?.forEach((reply) => {
        counts[reply.id] =
          (reply.like_count || 0) + (likeDeltas[reply.id] || 0);
      });
    });
    return counts;
  }, [comments, likeDeltas]);

  // Fetch user likes on mount and when comments change
  useEffect(() => {
    const fp = getUserFingerprint();
    fingerprintRef.current = fp;

    if (fp && allCommentIds.length > 0) {
      checkUserLikes(allCommentIds, fp).then(setUserLikes);
    }
  }, [allCommentIds]);

  const handleLike = useCallback(
    async (commentId: string) => {
      const fp = fingerprintRef.current;
      if (!fp) return;

      const currentlyLiked = userLikes[commentId];

      // Optimistic update
      setUserLikes((prev) => ({ ...prev, [commentId]: !currentlyLiked }));
      setLikeDeltas((prev) => ({
        ...prev,
        [commentId]: (prev[commentId] || 0) + (currentlyLiked ? -1 : 1),
      }));

      // Server update
      const result = await toggleLike(commentId, fp);

      if (!result.success) {
        // Revert on error
        setUserLikes((prev) => ({ ...prev, [commentId]: currentlyLiked }));
        setLikeDeltas((prev) => ({
          ...prev,
          [commentId]: (prev[commentId] || 0) + (currentlyLiked ? 1 : -1),
        }));
      }
    },
    [userLikes],
  );

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <svg
          className="mx-auto h-12 w-12 mb-4 opacity-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <p>No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          tutorialSlug={tutorialSlug}
          userLikes={userLikes}
          optimisticLikes={optimisticLikes}
          onLike={handleLike}
        />
      ))}
    </div>
  );
}

interface CommentItemProps {
  comment: Comment;
  tutorialSlug: string;
  userLikes: Record<string, boolean>;
  optimisticLikes: Record<string, number>;
  onLike: (commentId: string) => void;
  isReply?: boolean;
}

function CommentItem({
  comment,
  tutorialSlug,
  userLikes,
  optimisticLikes,
  onLike,
  isReply = false,
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  const initials = comment.author_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const likeCount = optimisticLikes[comment.id] ?? comment.like_count ?? 0;
  const hasLiked = userLikes[comment.id] ?? false;
  const replyCount = comment.replies?.length ?? 0;

  return (
    <article className={`${isReply ? "ml-8 md:ml-12" : ""}`}>
      <div
        className={`flex gap-4 p-4 rounded-lg ${
          isReply
            ? "bg-gray-100/50 dark:bg-gray-800/30 border-l-2 border-blue-500"
            : "bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
        }`}
      >
        {/* Avatar */}
        <div className="shrink-0">
          <div
            className={`${isReply ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm"} rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium`}
          >
            {initials}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-900 dark:text-white">
              {comment.author_name}
            </span>
            <span className="text-gray-400 dark:text-gray-500">•</span>
            <time
              dateTime={comment.created_at}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {formatDistanceToNow(new Date(comment.created_at), {
                addSuffix: true,
              })}
            </time>
          </div>

          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap wrap-break-word mb-3">
            {comment.content}
          </p>

          {/* Actions: Like & Reply */}
          <div className="flex items-center gap-4">
            {/* Like Button */}
            <button
              onClick={() => onLike(comment.id)}
              className={`flex items-center gap-1.5 text-sm transition-colors ${
                hasLiked
                  ? "text-red-500 hover:text-red-600"
                  : "text-gray-500 hover:text-red-500 dark:text-gray-400"
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? "fill-current" : ""}`} />
              <span>{likeCount > 0 ? likeCount : "Like"}</span>
            </button>

            {/* Reply Button (only for top-level comments) */}
            {!isReply && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-500 dark:text-gray-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Reply</span>
              </button>
            )}
          </div>

          {/* Reply Form */}
          {showReplyForm && !isReply && (
            <div className="mt-4 pl-4 border-l-2 border-blue-500">
              <CommentForm
                tutorialSlug={tutorialSlug}
                parentId={comment.id}
                onSuccess={() => setShowReplyForm(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      {!isReply && replyCount > 0 && (
        <div className="mt-2">
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline ml-4"
          >
            {showReplies ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            {showReplies ? "Hide" : "Show"} {replyCount}{" "}
            {replyCount === 1 ? "reply" : "replies"}
          </button>

          {showReplies && (
            <div className="mt-3 space-y-3">
              {comment.replies?.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  tutorialSlug={tutorialSlug}
                  userLikes={userLikes}
                  optimisticLikes={optimisticLikes}
                  onLike={onLike}
                  isReply
                />
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
