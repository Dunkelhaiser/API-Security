"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateComment } from "@/lib/api/XSS";
import { CreateCommentInput, createCommentSchema } from "@/lib/schemas/createComment";

const CreateCommentForm = () => {
    const createCommentHandler = useCreateComment();

    const form = useForm<CreateCommentInput>({
        resolver: zodResolver(createCommentSchema),
        defaultValues: {
            comment: "",
        },
    });

    const onSubmit = async (data: CreateCommentInput) => {
        await createCommentHandler.mutateAsync(data.comment);
        form.reset();
    };

    return (
        <Card className="mx-auto mb-4 mt-6 max-w-xl">
            <CardHeader />
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Comment</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
export default CreateCommentForm;
