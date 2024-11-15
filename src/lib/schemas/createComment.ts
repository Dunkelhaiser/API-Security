import { z as zod } from "zod";

export const createCommentSchema = zod.object({
    comment: zod.string().trim().min(1).max(1000),
});

export type CreateCommentInput = zod.infer<typeof createCommentSchema>;
