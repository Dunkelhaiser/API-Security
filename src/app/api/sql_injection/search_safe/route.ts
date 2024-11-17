import { searchSchema } from "@/lib/schemas/search";
import { pool } from "@/lib/db";

/**
 * @swagger
 * /api/sql_injection/search_safe:
 *   post:
 *     tags: [SQL Injection]
 *     description: The search term is passed as a parameterized query instead of directly interpolated into the SQL query, preventing SQL injection attacks, as the search term is treated as data and not as part of the query
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
 *              example: "John Doe"
 */
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
