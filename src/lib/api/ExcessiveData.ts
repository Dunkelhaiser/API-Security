import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateEmail = () => {
    const queryClient = useQueryClient();

    const unsafeUrl = "/api/excessive_data/update_email_vulnerable";
    const _safeUrl = "/api/excessive_data/update_email_safe";

    return useMutation({
        mutationFn: async (email: string) => {
            const res = await fetch(unsafeUrl, {
                method: "PUT",
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
};
