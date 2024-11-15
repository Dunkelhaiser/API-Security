import { db } from "@/server/db";
import { comments as commentsTable } from "@/server/db/schema";

export async function GET() {
    const comments = await db.select().from(commentsTable);

    return Response.json(comments);
}
