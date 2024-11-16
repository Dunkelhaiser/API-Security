### Requirements

#### With Docker

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

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
