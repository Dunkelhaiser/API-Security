import { type Config } from "drizzle-kit";

export default {
    schema: "./src/lib/db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:${process.env.DATABASE_PORT}/${process.env.DATABASE_DB}`,
    },
} satisfies Config;
