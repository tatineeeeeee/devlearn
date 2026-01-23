'use server'

import { createClient } from '@/lib/supabase/server'
import { Comment } from '@/lib/supabase/types'
import { revalidatePath } from 'next/cache'

export interface CommentFormState {
    success: boolean
    message: string
}

export async function createComment(
    tutorialSlug: string,
    prevState: CommentFormState,
    formData: FormData
): Promise<CommentFormState> {
    const authorName = formData.get('authorName') as string
    const authorEmail = formData.get('authorEmail') as string
    const content = formData.get('content') as string
    const parentId = formData.get('parentId') as string | null

    // Validation
    if (!authorName || authorName.trim().length < 2) {
        return { success: false, message: 'Name must be at least 2 characters' }
    }

    if (!authorEmail || !authorEmail.includes('@')) {
        return { success: false, message: 'Please enter a valid email' }
    }

    if (!content || content.trim().length < 10) {
        return { success: false, message: 'Comment must be at least 10 characters' }
    }

    if (content.length > 2000) {
        return { success: false, message: 'Comment must be less than 2000 characters' }
    }

    try {
        const supabase = await createClient()

        const { error } = await supabase.from('comments').insert({
            tutorial_slug: tutorialSlug,
            author_name: authorName.trim(),
            author_email: authorEmail.trim().toLowerCase(),
            content: content.trim(),
            parent_id: parentId || null,
            is_approved: true, // Set to false if you want moderation
        })

        if (error) {
            console.error('Supabase error:', error)
            return { success: false, message: 'Failed to post comment. Please try again.' }
        }

        revalidatePath(`/tutorials/[category]/[slug]`, 'page')

        return { success: true, message: 'Comment posted successfully!' }
    } catch (error) {
        console.error('Error creating comment:', error)
        return { success: false, message: 'An unexpected error occurred' }
    }
}

export async function getComments(tutorialSlug: string): Promise<Comment[]> {
    const supabase = await createClient()

    // Get all comments with like counts (excluding email for security)
    const { data: comments, error } = await supabase
        .from('comments')
        .select('id, created_at, updated_at, tutorial_slug, author_name, content, is_approved, parent_id')
        .eq('tutorial_slug', tutorialSlug)
        .eq('is_approved', true)
        .order('created_at', { ascending: true })

    if (error) {
        console.error('Error fetching comments:', error)
        return []
    }

    // Get like counts for all comments
    const commentIds = comments.map(c => c.id)
    const { data: likes } = await supabase
        .from('comment_likes')
        .select('comment_id')
        .in('comment_id', commentIds)

    // Count likes per comment
    const likeCounts: Record<string, number> = {}
    likes?.forEach(like => {
        likeCounts[like.comment_id] = (likeCounts[like.comment_id] || 0) + 1
    })

    // Add like counts to comments
    const commentsWithLikes = comments.map(comment => ({
        ...comment,
        like_count: likeCounts[comment.id] || 0
    }))

    // Organize into threads (parent comments with replies)
    const parentComments = commentsWithLikes.filter(c => !c.parent_id)
    const replies = commentsWithLikes.filter(c => c.parent_id)

    // Attach replies to their parents
    const threaded = parentComments.map(parent => ({
        ...parent,
        replies: replies.filter(reply => reply.parent_id === parent.id)
    }))

    // Sort by newest first for display
    return threaded.sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
}

export async function toggleLike(commentId: string, userFingerprint: string) {
    const supabase = await createClient()

    // Check if user already liked this comment
    const { data: existingLike } = await supabase
        .from('comment_likes')
        .select('id')
        .eq('comment_id', commentId)
        .eq('user_fingerprint', userFingerprint)
        .single()

    if (existingLike) {
        // Unlike - remove the like
        const { error } = await supabase
            .from('comment_likes')
            .delete()
            .eq('id', existingLike.id)

        if (error) {
            console.error('Error removing like:', error)
            return { success: false, liked: true }
        }

        revalidatePath(`/tutorials/[category]/[slug]`, 'page')
        return { success: true, liked: false }
    } else {
        // Like - add new like
        const { error } = await supabase
            .from('comment_likes')
            .insert({
                comment_id: commentId,
                user_fingerprint: userFingerprint
            })

        if (error) {
            console.error('Error adding like:', error)
            return { success: false, liked: false }
        }

        revalidatePath(`/tutorials/[category]/[slug]`, 'page')
        return { success: true, liked: true }
    }
}

export async function checkUserLikes(commentIds: string[], userFingerprint: string) {
    const supabase = await createClient()

    const { data } = await supabase
        .from('comment_likes')
        .select('comment_id')
        .in('comment_id', commentIds)
        .eq('user_fingerprint', userFingerprint)

    const likedIds = new Set(data?.map(l => l.comment_id) || [])
    return Object.fromEntries(commentIds.map(id => [id, likedIds.has(id)]))
}