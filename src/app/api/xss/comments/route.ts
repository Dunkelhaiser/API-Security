import { db } from "@/lib/db";
import { comments as commentsTable } from "@/lib/db/schema";

export async function GET() {
    const comments = await db.select().from(commentsTable);

    return Response.json(comments);
}
