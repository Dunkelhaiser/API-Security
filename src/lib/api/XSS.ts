"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetComments = () => {
    return useQuery({
        queryKey: ["comments"],
        queryFn: async () => {
            const res = await fetch("/api/xss/comments");
            const data = await res.json();
            return data;
        },
    });
};

export const useCreateComment = () => {
    const queryClient = useQueryClient();

    const unsafeUrl = "/api/xss/create_comment_vulnerable";
    const _safeUrl = "/api/xss/create_comment_safe";

    return useMutation({
        mutationFn: async (comment: string) => {
            const res = await fetch(unsafeUrl, {
                method: "POST",
                body: JSON.stringify({ comment }),
            });
            const data = await res.json();
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments"] });
        },
    });
};
