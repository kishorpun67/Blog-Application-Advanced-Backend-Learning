import { z } from "zod";


export const userResponseSchema = z.object({
    username: z.string(),
    email: z.email(),
    createdAt:z.date()
})


export const authResponseShema = z.object({
    user:userResponseSchema,
    accessToken: z.string(),
    refreshToken: z.string()
})



export type UserResponseDto = z.infer<typeof userResponseSchema>
export type authResponseDTO = z.infer<typeof authResponseShema>
