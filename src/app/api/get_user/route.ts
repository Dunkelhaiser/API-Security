import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { eq, getTableColumns } from "drizzle-orm";

export async function GET() {
    const { password: passwordCol, ...userCols } = getTableColumns(user);
    const [selectedUser] = await db
        .select(userCols)
        .from(user)
        .where(eq(user.id, "5fbec927-87e4-4fd0-998e-f9db786132ea"));

    return Response.json(selectedUser);
}
