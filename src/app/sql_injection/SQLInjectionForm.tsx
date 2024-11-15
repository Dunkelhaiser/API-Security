"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchInput, searchSchema } from "@/lib/schemas/search";
import { useSearch } from "@/lib/api/SQLInjection";

const SQLInjectionForm = () => {
    const searchHandler = useSearch();

    const form = useForm<SearchInput>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            search: "",
        },
    });

    const onSubmit = async (data: SearchInput) => {
        await searchHandler.mutateAsync(data.search);
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Search</FormLabel>
                                <FormControl>
                                    <Input placeholder="Search..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Search</Button>
                </form>
            </Form>
            <div className="mt-4">
                {searchHandler.isPending && <p>Searching...</p>}
                {searchHandler.isError && <p>Error searching</p>}
                {searchHandler.data && <p>{JSON.stringify(searchHandler.data)}</p>}
            </div>
        </>
    );
};
export default SQLInjectionForm;
