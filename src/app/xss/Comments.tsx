"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetComments } from "@/lib/api/XSS";

const Comments = () => {
    const { data } = useGetComments();

    return (
        <Card className="mx-auto mb-4 mt-6 max-w-xl">
            <CardHeader>
                <CardTitle>XSS</CardTitle>
            </CardHeader>
            <CardContent>
                {data?.map((comment: { comment: string; id: string }) => (
                    <div key={comment.id} dangerouslySetInnerHTML={{ __html: comment.comment }} />
                ))}
            </CardContent>
        </Card>
    );
};
export default Comments;
