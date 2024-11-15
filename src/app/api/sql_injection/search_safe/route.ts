import { searchSchema } from "@/lib/schemas/search";
import { pool } from "@/server/db";

export async function POST(request: Request) {
    const data = await request.json();
    const { search } = searchSchema.parse(data);

    const query = `
        SELECT name, email
        FROM public.user
        WHERE name ILIKE $1
    `;

    const users = await pool.query(query, [`%${search}%`]);

    return Response.json(users.rows);
}
