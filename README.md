<h3>Description of Role</h3>
I chose the <strong>Product Engineer</strong> role because it aligns well with my interests and skill set. In this role, I am responsible for both the frontend and backend of the application I built. My focus has been on usability, UI/UX, functionality, maintainability, and user flow. I implemented responsive UI components using React and TypeScript, integrated APIs, and aimed to create a great developer experience through well-structured and tested code.

<h3>Description of Project</h3>
This project is a full-stack, lightweight car rental management application designed to showcase my skills as a product engineer. It enables users to create and manage users, cars, and rentals, including renting cars to specific users. The app connects to a backend API running on Bun with Prisma and Postgres, which serves data about cars, users, and rentals to the frontend. Additionally, I implemented a filtering feature to help users easily find what they need.

<h3>Possible improvements</h3>

- IDs currently increment only and never reset — adding a system to save previous users to track car previously booking history.

- Add authentication

- Implement more thorough data validation

- Create a view file for all endpoints

- Clean up and improve the UI

<h3>Get project started</h3>
There are two folders: <strong>Frontend</strong> and <strong>Backend</strong>

<h3>Startup Guide</h3>

1. Run the backend API

- `cd backend`

- `bun install`

- `brew install postgresql` # (if not installed)

- Create a .env file, and specific the database entrypoint.

Example: DATABASE_URL="postgresql://postgres:secret@localhost:5432/postgres?schema=public"

It should be running on port: 6543 since I use a postgres database

- `bun run index.ts`

<strong>The API is now running.</strong>

2.  Run the frontend

- `Cd frontend`
- `bun install`
- `bun run start`

<strong>The frontend is now running. </strong>

3.  I am using docker to run database services, and docker compose to gather them. You can run your postgreSQL database as you usually do.

- Usually i use:
  `docker compose up`

- When you have established a connection to the DB, it is time to populate the database. In the backend directory, type the following two commands:
  `npx prisma generate` and `npx prisma migrate dev`

<h3>Tests</h3>

- There are tests for both the frontend and the backend. Go into the appropriate directory and run `bun test index.test.ts`
