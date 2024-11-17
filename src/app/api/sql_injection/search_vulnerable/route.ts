import { searchSchema } from "@/lib/schemas/search";
import { pool } from "@/lib/db";

/**
 * @swagger
 * /api/sql_injection/search_vulnerable:
 *   post:
 *     tags: [SQL Injection]
 *     description: The search term is passed directly into the SQL query, making it vulnerable to SQL injection attacks
 *     responses:
 *       200:
 *         description: The users that match the search term
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        description: The search term
 *        schema:
 *          type: object
 *          properties:
 *            search:
 *              type: string
 *              example: John'; DROP TABLE public.user; --
 */
export async function POST(request: Request) {
    const data = await request.json();
    const { search } = searchSchema.parse(data);

    const query = `
        SELECT name, email
        FROM public.user
        WHERE name ILIKE '%${search}%'
    `;

    const users = await pool.query(query);

    return Response.json(users.rows);
}
