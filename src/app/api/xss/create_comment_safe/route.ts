import { createCommentSchema } from "@/lib/schemas/createComment";
import { sanitizeHTML } from "@/lib/utils";
import { db } from "@/lib/db";
import { comments as commentsTable } from "@/lib/db/schema";

/**
 * @swagger
 * /api/xss/create_comment_safe:
 *   post:
 *     tags: [XSS]
 *     description: The comment is stored in the database with sanitization preventing XSS attacks
 *     responses:
 *       200:
 *         description: The created comment
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        description: The comment to create
 *        schema:
 *          type: object
 *          properties:
 *            comment:
 *              type: string
 *              example: "<script>alert('Hack failed')</script>"
 */
export async function POST(request: Request) {
    const data = await request.json();
    const { comment } = createCommentSchema.parse(data);

    const createdComment = await db
        .insert(commentsTable)
        .values({ comment: sanitizeHTML(comment) })
        .returning();

    return Response.json(createdComment);
}
