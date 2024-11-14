"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdateEmailInput, updateEmailSchema } from "@/lib/schemas/updateEmail";
import { useUpdateEmail } from "@/lib/api/ExcessiveData";

const UpdateEmailForm = () => {
    const updateEmailHandler = useUpdateEmail();

    const form = useForm<UpdateEmailInput>({
        resolver: zodResolver(updateEmailSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data: UpdateEmailInput) => {
        await updateEmailHandler.mutateAsync(data.email);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <Button type="submit">Update Email</Button>
            </form>
        </Form>
    );
};
export default UpdateEmailForm;
