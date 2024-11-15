import { useMutation } from "@tanstack/react-query";
import { SignInInput } from "../schemas/signIn";

export const useSignIn = () => {
    return useMutation({
        mutationFn: async (credentials: SignInInput) => {
            const res = await fetch("/api/bruteforce/sign_in", {
                method: "POST",
                body: JSON.stringify(credentials),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data);
            }
            return data;
        },
    });
};
