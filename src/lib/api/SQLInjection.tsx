import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSearch = () => {
    const queryClient = useQueryClient();

    const unsafeUrl = "/api/sql_injection/search_vulnerable";
    const _safeUrl = "/api/sql_injection/search_safe";

    return useMutation({
        mutationFn: async (search: string) => {
            const res = await fetch(unsafeUrl, {
                method: "POST",
                body: JSON.stringify({ search }),
            });
            const data = await res.json();
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["search"] });
        },
    });
};
