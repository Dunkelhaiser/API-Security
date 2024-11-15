"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInInput, signInSchema } from "@/lib/schemas/signIn";
import { useSignIn } from "@/lib/api/Bruteforce";

const BruteForceForm = () => {
    const signInHandler = useSignIn();

    const form = useForm<SignInInput>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
            honeypot: "",
        },
    });

    const onSubmit = async (data: SignInInput) => {
        await signInHandler.mutateAsync(data);
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mb-3 space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="mail@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="honeypot"
                    render={({ field }) => (
                        <FormItem className="hidden">
                            <FormControl>
                                {/* @ts-expect-error wrong type inheritance */}
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Sign In</Button>
            </form>
            {signInHandler.isError && <p className="font-medium text-red-500">{signInHandler.error.message}</p>}
            {signInHandler.isSuccess && <p className="font-medium text-emerald-700">Signed in successfully</p>}
        </Form>
    );
};
export default BruteForceForm;
