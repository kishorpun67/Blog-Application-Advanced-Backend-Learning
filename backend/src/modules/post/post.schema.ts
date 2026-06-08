import {z} from "zod"

export const createPostSchema = z.object({
    title: z.string().min(1,'Post title can not be empty'),
    description: z.string().min(10, "Post description must be at least 20 charters long")
}).strict()

export const updatePostSchema = z.object({
    title: z.string().min(1,'Post title can not be empty'),
    description: z.string().min(10, "Post description must be at least 20 charters long")
    
}).strict()

export type createPostDTO = z.infer<typeof createPostSchema>
export type updatePostDTO = z.infer<typeof updatePostSchema>
