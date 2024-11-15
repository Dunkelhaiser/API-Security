import { signInSchema } from "@/lib/schemas/signIn";
import { db } from "@/server/db";
import { user as userTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import * as argon2 from "argon2";

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password, honeypot } = signInSchema.parse(body);

    if (honeypot) {
        throw new Error("Wrong credentials");
    }

    const user = await db.select().from(userTable).where(eq(userTable.email, email));

    if (user.length === 0) {
        throw new Error("Wrong credentials");
    }

    const verifiedPassword = await argon2.verify(user[0].password, password);

    if (!verifiedPassword) {
        throw new Error("Wrong credentials");
    }

    return Response.json("Signed in successfully");
}
