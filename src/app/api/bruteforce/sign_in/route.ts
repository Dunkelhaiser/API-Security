import { signInSchema } from "@/lib/schemas/signIn";
import { db } from "@/lib/db";
import { user as userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import * as argon2 from "argon2";
import rateLimitMiddleware from "../rateLimiter";

/**
 * @swagger
 * /api/bruteforce/sign_in:
 *   post:
 *     tags: [Bruteforce]
 *     description: Contains honeypot field to prevent bots from brute-forcing, if the honeypot field is filled, the request will be rejected. Rate limited to 5 requests per minute.
 *     responses:
 *       200:
 *         description: Signed in successfully
 *       400:
 *         description: Wrong credentials
 *       429:
 *         description: Too many requests
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        description: The email and password to sign in
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *              example: "mail@example.com"
 *            password:
 *              type: string
 *              example: "password123"
 */
async function signIn(request: Request) {
    const body = await request.json();
    const { email, password, honeypot } = signInSchema.parse(body);

    if (honeypot) {
        return Response.json("Wrong credentials", { status: 400 });
    }

    const user = await db.select().from(userTable).where(eq(userTable.email, email));

    if (user.length === 0) {
        return Response.json("Wrong credentials", { status: 400 });
    }

    const verifiedPassword = await argon2.verify(user[0].password, password);

    if (!verifiedPassword) {
        return Response.json("Wrong credentials", { status: 400 });
    }

    return Response.json("Signed in successfully");
}

export const POST = rateLimitMiddleware(signIn);
