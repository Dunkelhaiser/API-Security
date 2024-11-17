import { updateEmailSchema } from "@/lib/schemas/updateEmail";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq, getTableColumns } from "drizzle-orm";

/**
 * @swagger
 * /api/excessive_data/update_email_safe:
 *   put:
 *     tags: [Excessive Data]
 *     description: When updating a user's email, the API returns the only necessary fields
 *     responses:
 *       200:
 *         description: The updated user object with only necessary fields
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        description: The email to update
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *              example: "mail@example.com"
 */
export async function PUT(request: Request) {
    const data = await request.json();
    const { email } = updateEmailSchema.parse(data);
    const { password, ...userCols } = getTableColumns(user);
    const [updatedUser] = await db
        .update(user)
        .set({ email })
        .where(eq(user.id, "5fbec927-87e4-4fd0-998e-f9db786132ea"))
        .returning(userCols);

    // Raw SQL equivalent:
    // sql`UPDATE ${user} SET ${user.email} = ${email} WHERE ${user.id} = '5fbec927-87e4-4fd0-998e-f9db786132ea' RETURNING ${userCols}`;

    return Response.json(updatedUser);
}
