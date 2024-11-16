# Documentation. Аналіз і захист веб-API: Вивчення загроз та методів захисту

### About

This project is a web application that demonstrates common security vulnerabilities in web APIs and how to protect against them.

#### Technologies

##### Shared (backend and frontend)

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Next.js](https://nextjs.org/)
- [Zod](https://zod.dev/)

##### Backend

- [PostgreSQL](https://www.postgresql.org/)
- [Drizzle](https://orm.drizzle.team/)
- [Argon2](https://www.npmjs.com/package/argon2)

##### Frontend

- [React](https://reactjs.org/)
- [Tanstack Query](https://tanstack.com/query/)
- [Tailwind CSS](https://tailwindcss.com/)

### Requirements

#### With Docker

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

#### Without Docker

- [Node.js](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/installation)
- [PostgreSQL](https://www.postgresql.org/download/)

### Installation

1. Clone the repository:

```shell
git clone https://github.com/Dunkelhaiser/API-Security.git
```

2. Navigate into the project directory:

```shell
cd API-Security
```

3. Set up environment variables in `.env` by copying the `.env.example` and filling in the values:

4. Start the app with Docker Compose:

```shell
docker compose up
```

5. Run the database migrations:

```shell
pnpm run db:migrate # if you have pnpm installed locally

# or

docker compose exec app pnpm run db:migrate # otherwise
```

6. Open the app in your browser at [http://localhost:3000](http://localhost:3000)

### Project structure

```shell
.
├── README.md                       # Documentation
├── drizzle                         # Database migrations
├── src
│   ├── app                         # App Router (client pages and API routes)
│   │   ├── api                     # API routes (following safe/vulnerable pattern + additional routes if needed)
│   │   │   ├── bruteforce          # Brute-force API routes
│   │   │   ├── excessive_data      # Excessive data API routes
│   │   │   ├── sql_injection       # SQL injection API routes
│   │   │   └── xss                 # XSS API routes
│   │   ├── bruteforce              # Brute-force example page and components
│   │   ├── excessive_daata         # Excessive data example page and components
│   │   ├── sql_injection           # SQL injection example page and components
│   │   ├── xss                     # XSS example page and components
│   │   ├── layout.tsx              # App entry point
│   │   ├── page.tsx                # Index page
│   │   └── Providers.tsx           # React Context Providers 
│   ├── components                  # React components
│   └── lib                         
│       ├── api                     # API calls functions
│       ├── db                      # Database connection, schema and seed
│       └── shemas                  # Validation schemas
├── .env                            # Environment variables                     
├── .eslintrc.json                  # Code linter configuration                     
├── .gitignore                     
├── .prettierrc                     # Code formatter configuration
├── components.json                 # Component library configuration
├── docker-compose.yml              # Docker Compose file for Next.js and PostgreSQL
├── Dockerfile                      # Docker image file for Next.js app
├── drizzle.config.ts               # Drizzle ORM configuration
├── next.config.ts                  # Next.js configuration
├── package.json                    # Package manager file with dependencies and scripts
├── pnpm-lock.yaml                  # Package manager lock file
├── postcss.config.mjs              # PostCSS configuration
├── tailwind.config.js              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```

### Architecture

The project is a monolith built with Next.js. The backend is a REST API built with Next.js API routes. It uses PostgreSQL as a database and Drizzle ORM as ORM for it. The frontend is a Next.js app with React components and Tanstack Query for data fetching.

### Overview

The app has four main sections, each demonstrating a common security vulnerability in web APIs:

- Excessive data exposure
- SQL injection
- XSS
- Brute-force

Each section has a safe and a vulnerable API route. The safe route demonstrates how to protect against the vulnerability, while the vulnerable route demonstrates the vulnerability.

#### Excessive data exposure

Excessive data exposure is a vulnerability where an API returns more data than necessary. This can lead to data leakage and privacy issues.

##### Vulnerable

```ts
export async function PUT(request: Request) {
    const data = await request.json();
    const { email } = updateEmailSchema.parse(data);

    const [updatedUser] = await db
        .update(user)
        .set({ email })
        .where(eq(user.id, "5fbec927-87e4-4fd0-998e-f9db786132ea"))
        .returning(); // Returns all columns

    // Raw SQL equivalent:
    // sql`UPDATE ${user} SET ${user.email} = ${email} WHERE ${user.id} = '5fbec927-87e4-4fd0-998e-f9db786132ea' RETURNING *`;

    return Response.json(updatedUser);
}
```

When updating a user's email, the API returns the entire updated user object. This is a vulnerability because it exposes more data than necessary, including user password. The safe route should only return needed data.

##### Safe

```ts
    const { password, ...userCols } = getTableColumns(user); // exclude password column

    const [updatedUser] = await db
        .update(user)
        .set({ email })
        .where(eq(user.id, "5fbec927-87e4-4fd0-998e-f9db786132ea"))
        .returning(userCols); // Returns only necessary columns

    // Raw SQL equivalent:
    // sql`UPDATE ${user} SET ${user.email} = ${email} WHERE ${user.id} = '5fbec927-87e4-4fd0-998e-f9db786132ea' RETURNING ${userCols}`;
```

#### Data Validation

The app uses Zod for data validation. Each API route and client form has a validation schema that defines the expected data structure. The schema is used to validate incoming data and prevent malformed requests.

##### Schemas

```ts
export const createCommentSchema = zod.object({
    comment: zod.string().trim().min(1).max(1000),
});

export const signInSchema = zod.object({
    email: zod.string().min(1),
    password: zod.string().min(1),
    honeypot: zod.string().nullish(),
});

export const updateEmailSchema = zod.object({
    email: zod.string().email(),
});

export const searchSchema = zod.object({
    search: zod.string(),
});
```

##### Usage in API routes

```ts
async function signIn(request: Request) {
    const body = await request.json();
    const { email, password, honeypot } = signInSchema.parse(body);
    // ...
}
```

##### Usage in forms

```tsx
const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
        email: "",
        password: "",
        honeypot: "",
    },
});
```

#### SQL Injection

SQL injection is a vulnerability where an attacker can execute arbitrary SQL queries on the database. This can lead to data leakage, data corruption, and unauthorized access.

##### Vulnerable

```ts
export async function POST(request: Request) {
    const data = await request.json();
    const { search } = searchSchema.parse(data);

    const query = `
        SELECT name, email
        FROM public.user
        WHERE name ILIKE '%${search}%'
    `; // Vulnerable to SQL injection, because search is not sanitized and directly interpolated into the query

    // Search with SQL injection payload: "%'; DROP TABLE public.user; --" will drop the user table

    const users = await pool.query(query);

    return Response.json(users.rows);
}
```

##### Safe

```ts
    const query = `
        SELECT name, email
        FROM public.user
        WHERE name ILIKE $1
    `;

    const users = await pool.query(query, [`%${search}%`]);
```

Here, the search term is passed as a parameterized query instead of directly interpolated into the SQL query. This prevents SQL injection attacks, as the search term is treated as data and not as part of the query.

#### XSS

Cross-site scripting (XSS) is a vulnerability where an attacker can inject malicious scripts into a web application. This can lead to data theft, session hijacking, and other security issues.

##### Vulnerable

```ts
export async function POST(request: Request) {
    const data = await request.json();
    const { comment } = createCommentSchema.parse(data);

    const createdComment = await db.insert(commentsTable).values({ comment }).returning();

    return Response.json(createdComment);
}
```

Here, the comment is stored in the database without any sanitization. If the comment contains HTML or JavaScript code, it will be executed when displayed on the frontend, leading to XSS attacks.

##### Safe

```ts
    const createdComment = await db
        .insert(commentsTable)
        .values({ comment: sanitizeHtml(comment) }) // Sanitize HTML tags
        .returning();
```

Here, the comment is sanitized using a `sanitizeHtml` function before storing it in the database. This prevents any HTML or JavaScript code from being executed when displayed on the frontend.

```ts
export function sanitizeHTML(string: string) {
    return string
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
```

The `sanitizeHtml` function replaces special characters with their HTML entities to treat the comment as plain text and prevent XSS attacks.

#### CORS

Cross-Origin Resource Sharing (CORS) is a security feature that restricts which domains can access a web API, so only trusted domains can make requests to the API, preventing scammers of creating malicious websites that can access the API.

```ts
const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: "/api/:path*", // Match all API routes
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" }, // Allow cookies
                    { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" }, // Allowed domains
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" }, // Allowed methods
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    }, // Allowed headers
                ],
            },
        ];
    },
};
```
