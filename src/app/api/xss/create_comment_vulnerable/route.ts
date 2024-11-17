import { createCommentSchema } from "@/lib/schemas/createComment";
import { db } from "@/lib/db";
import { comments as commentsTable } from "@/lib/db/schema";

/**
 * @swagger
 * /api/xss/create_comment_vulnerable:
 *   post:
 *     tags: [XSS]
 *     description: The comment is stored in the database without any sanitization allowing for XSS attacks
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
 *              example: "<script>alert('You have been hacked')</script>"
 */
export async function POST(request: Request) {
    const data = await request.json();
    const { comment } = createCommentSchema.parse(data);

    const createdComment = await db.insert(commentsTable).values({ comment }).returning();

    return Response.json(createdComment);
}
