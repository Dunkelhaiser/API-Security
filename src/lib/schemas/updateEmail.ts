import { z as zod } from "zod";

export const updateEmailSchema = zod.object({
    email: zod.string().email(),
});

export type UpdateEmailInput = zod.infer<typeof updateEmailSchema>;
