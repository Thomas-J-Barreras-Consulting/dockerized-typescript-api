# dockerized-typescript-api

A minimal TypeScript REST API containerized with Docker and wired to a
GitHub Actions CI pipeline.

A production-ready setup with typed source code, automated tests, a
linter, a multi-stage Docker image, and a CI workflow that enforces all
of the above on every push and pull request — including building the
Docker image as a final verification step.

## Background

This project builds on a previous CI-focused example by adding
Docker-based containerization and a container-aware CI workflow. The
app runs locally via Docker Compose and the image is built and verified
in CI on every commit.

---

## Stack

| Tool | Role |
|------|------|
| Node.js 20 | Runtime |
| TypeScript | Type-safe JavaScript |
| Express | HTTP server |
| Jest + supertest | Unit and integration tests |
| ESLint + typescript-eslint | Static analysis and style enforcement |
| Docker | Containerization (multi-stage build) |
| Docker Compose | Local container orchestration |
| GitHub Actions | Continuous integration |

---

## Project Layout

```
src/
  app.ts          — Creates the Express app (no listen call — testable)
  server.ts       — Entry point; calls app.listen()
  routes/
    health.ts     — GET / and GET /health handlers
test/
  health.test.ts  — Tests for both endpoints
Dockerfile        — Multi-stage build (builder → slim production image)
docker-compose.yml — Runs the container locally on port 3000
.github/
  workflows/
    ci.yml        — GitHub Actions workflow (lint → test → build → docker build)
```

---

## API Endpoints

### `GET /`

Returns service metadata.

```json
{
  "service": "typescript-api-github-actions-ci",
  "version": "1.0.0",
  "environment": "development"
}
```

### `GET /health`

Returns a liveness check. Used by load balancers and monitoring tools
to confirm the service is running.

```json
{
  "status": "ok",
  "service": "typescript-api-github-actions-ci",
  "timestamp": "2026-03-18T22:15:00.000Z"
}
```

---

## Local Setup

### Without Docker

**Prerequisites:** Node.js 20 (use `nvm use` if you have nvm installed)

```bash
# Install dependencies
npm install

# Start the development server (uses ts-node, no build step needed)
npm run dev

# Run tests
npm test

# Run the linter
npm run lint

# Compile TypeScript to dist/
npm run build

# Run the compiled output
npm start
```

### With Docker

**Prerequisites:** Docker Desktop (or Docker Engine + Compose plugin)

```bash
# Build and run the container (available at http://localhost:3000)
docker compose up --build

# Stop the container
docker compose down
```

To build the image manually without Compose:

```bash
docker build -t typescript-api .
docker run -p 3000:3000 typescript-api
```

The Dockerfile uses a **multi-stage build**: a full `node:20` image
compiles the TypeScript source, then only the compiled `dist/` output
and production dependencies are copied into a lean `node:20-slim`
production image.

---

## CI Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs on
every push to `main` and on every pull request targeting `main`.

**Steps:**

1. Check out the code
2. Set up Node.js 20 (version read from `.nvmrc`, with npm caching)
3. Install dependencies with `npm ci`
4. Lint with ESLint
5. Run tests with Jest
6. Build with `tsc`
7. Build the Docker image with `docker build`

A pull request cannot be merged until all seven steps pass. Step 7
ensures the Dockerfile is always valid and the image can be built from
a clean checkout — catching container-level breakage the same way steps
4–6 catch code-level breakage.

---

## License

MIT
