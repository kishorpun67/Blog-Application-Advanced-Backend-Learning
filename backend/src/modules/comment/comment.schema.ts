import z from 'zod'


export const createCommentSchema = z.object({
    comment: z.string().min(1,"Comment cann't be empty"),
}).strict()
export const udpateCommentSchema = z.object({
    comment: z.string().min(1,"Comment cann't be empty")
}).strict()

export type  createCommentDTO = z.infer<typeof createCommentSchema>
export type  updateCommentDTO = z.infer<typeof udpateCommentSchema>
