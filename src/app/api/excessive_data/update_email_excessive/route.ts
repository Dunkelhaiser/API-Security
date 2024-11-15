import { updateEmailSchema } from "@/lib/schemas/updateEmail";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(request: Request) {
    const data = await request.json();
    const { email } = updateEmailSchema.parse(data);
    const [updatedUser] = await db
        .update(user)
        .set({ email })
        .where(eq(user.id, "5fbec927-87e4-4fd0-998e-f9db786132ea"))
        .returning();

    // Raw SQL equivalent:
    // sql`UPDATE ${user} SET ${user.email} = ${email} WHERE ${user.id} = '5fbec927-87e4-4fd0-998e-f9db786132ea' RETURNING *`;

    return Response.json(updatedUser);
}
