import z from 'zod'
import { registerSchema } from "./auth.validator.js";

export type RegisterUserData = z.infer<typeof registerSchema>;