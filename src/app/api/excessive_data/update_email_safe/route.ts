import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { eq, getTableColumns } from "drizzle-orm";

export async function PUT(request: Request) {
    const { email } = await request.json();
    const { password: passwordCol, ...userCols } = getTableColumns(user);
    const [updatedUser] = await db
        .update(user)
        .set({ email })
        .where(eq(user.id, "5fbec927-87e4-4fd0-998e-f9db786132ea"))
        .returning(userCols);

    return Response.json(updatedUser);
}
