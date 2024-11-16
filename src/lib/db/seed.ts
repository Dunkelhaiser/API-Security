/* eslint-disable no-console */
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { comments, user } from "./schema";
import * as argon2 from "argon2";

const sql = new Pool({
    connectionString: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:${process.env.DATABASE_PORT}/${process.env.DATABASE_DB}`,
});
const db = drizzle(sql);

(async () => {
    await db.insert(user).values([
        {
            email: "doe@mail.com",
            id: "5fbec927-87e4-4fd0-998e-f9db786132ea",
            name: "John Doe",
            password: await argon2.hash("topSecret"),
        },
    ]);

    await db.insert(comments).values([
        {
            id: "f1b57a13-08d6-4b47-ba27-0f5b18ecefda",
            comment: `<script>alert("You have been hacked!")</script>`,
        },
    ]);

    await sql.end();
})();
