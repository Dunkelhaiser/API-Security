import { createCommentSchema } from "@/lib/schemas/createComment";
import { db } from "@/server/db";
import { comments as commentsTable } from "@/server/db/schema";

export async function POST(request: Request) {
    const data = await request.json();
    const { comment } = createCommentSchema.parse(data);

    const createdComment = await db.insert(commentsTable).values({ comment }).returning();

    return Response.json(createdComment);
}
