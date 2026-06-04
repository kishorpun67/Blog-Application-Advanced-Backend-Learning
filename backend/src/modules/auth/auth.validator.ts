import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});


export const loginSchema = z.object({
  email: z.email("Email is required"),
  password: z.string("password is requried"),

}); 




export const refeshTokenSchema = z.object({
  token: z.string()
}).strict()

export type loginDTO = z.infer<typeof loginSchema>;
export type refreshTokenDTO = z.infer<typeof refeshTokenSchema>;



