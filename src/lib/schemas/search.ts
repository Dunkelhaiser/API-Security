import { z as zod } from "zod";

export const searchSchema = zod.object({
    search: zod.string(),
});

export type SearchInput = zod.infer<typeof searchSchema>;
