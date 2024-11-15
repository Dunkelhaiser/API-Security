import { z as zod } from "zod";

export const signInSchema = zod.object({
    email: zod.string().min(1),
    password: zod.string().min(1),
    honeypot: zod.string().nullish(),
});

export type SignInInput = zod.infer<typeof signInSchema>;
