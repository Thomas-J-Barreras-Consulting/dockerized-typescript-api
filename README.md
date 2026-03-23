# dockerized-typescript-api

A minimal TypeScript REST API wired to a GitHub Actions CI pipeline.

The project exists to demonstrate a clean, production-ready project
setup: typed source code, automated tests, a linter, and a CI workflow
that enforces all three on every push and pull request.

## Background

This project builds on a previous CI-focused example by adding Docker-based containerization and container-aware CI workflows.

---

## Stack

| Tool | Role |
|------|------|
| Node.js 20 | Runtime |
| TypeScript | Type-safe JavaScript |
| Express | HTTP server |
| Jest + supertest | Unit and integration tests |
| ESLint + typescript-eslint | Static analysis and style enforcement |
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
.github/
  workflows/
    ci.yml        — GitHub Actions workflow
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

A pull request cannot be merged until all six steps pass.

---

## License

MIT
