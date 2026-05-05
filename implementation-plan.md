# Backend Implementation Plan (Interim Assessment)

## Goal
Build a Node.js + MongoDB backend with JWT auth and crypto data endpoints, ready for frontend integration and deployment.

## Project Decisions
- Auth uses HTTP-only cookies for JWT storage.
- Register/Login should be POST endpoints (even if README mentions GET).
- Backend lives at repo root unless you choose a /backend folder.
- Each milestone must include tests before moving to the next one.

## Milestones and Tasks

### 1) Project setup
- Initialize Node project and add dependencies.
- Add scripts: dev (nodemon) and start.
- Create base server entry file.
- Test gate: add Jest + Supertest setup and confirm test runner works.

### 2) App foundation
- Express config: JSON parsing, CORS, cookie-parser, logging.
- MongoDB connection with env-based URI.
- Health check route.
- Test gate: integration test for health check and DB connection (or mocked DB).

### 3) Data models
- User: name, email (unique), password hash, timestamps.
- Crypto: name, symbol, price, image, change24h, createdAt.
- Test gate: model validation tests (required fields, unique email).

### 4) Auth system
- Register: create user with hashed password.
- Login: validate credentials, issue JWT, set HTTP-only cookie.
- Logout: clear cookie.
- Auth middleware: verify token, attach user to request.
- Test gate: auth flow tests (register, login, logout, unauthorized access).

### 5) Protected profile
- GET /profile returns authenticated user data.
- Redirect behavior handled by frontend; API returns 401 when unauthenticated.
- Test gate: profile access tests (authenticated vs unauthenticated).

### 6) Crypto endpoints
- GET /crypto (all)
- GET /crypto/gainers (sorted by change24h desc)
- GET /crypto/new (sorted by createdAt desc)
- POST /crypto (validate + create)
- Test gate: crypto endpoint tests (list, sort order, create, validation errors).

### 7) Error handling and validation
- Central error handler with consistent JSON payload.
- Input validation for required fields and types.
- Handle duplicate email errors cleanly.
- Test gate: error response tests for invalid input and duplicate email.

### 8) Deployment prep
- .env.example with required variables.
- CORS origin configurable for frontend URL.
- Secure cookie settings in production.
- Test gate: smoke test in production-like config (env, CORS, cookies).

## Suggested Issue Breakdown
- Issue 1: Initialize Node project and base server setup.
- Issue 2: MongoDB connection + env config.
- Issue 3: User and Crypto models.
- Issue 4: Auth endpoints + JWT middleware.
- Issue 5: Profile endpoint (protected).
- Issue 6: Crypto endpoints (all/gainers/new/create).
- Issue 7: Error handling + validation.
- Issue 8: Deployment readiness + documentation.

## Verification Checklist
- MongoDB connection succeeds on start.
- Register/Login returns expected responses and sets cookie.
- /profile returns 401 when unauthenticated.
- Crypto endpoints return valid data and sorts correctly.
- Test suite passes before each milestone is marked complete.
