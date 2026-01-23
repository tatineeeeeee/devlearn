export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            comments: {
                Row: {
                    id: string
                    created_at: string
                    updated_at: string
                    tutorial_slug: string
                    author_name: string
                    author_email: string
                    content: string
                    is_approved: boolean
                    parent_id: string | null
                }
                Insert: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    tutorial_slug: string
                    author_name: string
                    author_email: string
                    content: string
                    is_approved?: boolean
                    parent_id?: string | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    tutorial_slug?: string
                    author_name?: string
                    author_email?: string
                    content?: string
                    is_approved?: boolean
                    parent_id?: string | null
                }
            }
            comment_likes: {
                Row: {
                    id: string
                    created_at: string
                    comment_id: string
                    user_fingerprint: string
                }
                Insert: {
                    id?: string
                    created_at?: string
                    comment_id: string
                    user_fingerprint: string
                }
                Update: {
                    id?: string
                    created_at?: string
                    comment_id?: string
                    user_fingerprint?: string
                }
            }
        }
    }
}

// Full comment row (internal use only)
export type CommentRow = Database['public']['Tables']['comments']['Row']

// Public comment (excludes email for security)
export type Comment = Omit<CommentRow, 'author_email'> & {
    like_count?: number
    replies?: Comment[]
    user_has_liked?: boolean
}

export type CommentInsert = Database['public']['Tables']['comments']['Insert']
export type CommentLike = Database['public']['Tables']['comment_likes']['Row']
