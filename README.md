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
