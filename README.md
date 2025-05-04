# AuthMini V4 - Typescript

A production-ready authentication application that builds on **AuthMini V3**, using **TypeScript**, **Fastify**, **Alpine.js**, **PostgreSQL**, **Prisma ORM**, and **ES Modules (ESM)**. Designed for developers to learn **TypeScript integration**, **type safety**, and **basic unit testing** with Vitest, while maintaining a robust authentication system.

**Repository**: [https://github.com/voilacode/authmini/tree/v4](https://github.com/voilacode/authmini/tree/v4)

## Overview

AuthMini V4 enhances V3's authentication app by replacing JavaScript with **TypeScript** for both frontend and backend, implementing **static type checking** throughout the codebase, and introducing **basic unit testing** with Vitest. It maintains a single Fastify server serving APIs (`/api/*`) and a frontend SPA (`/`) at `http://localhost:3000` locally or a dynamic port on Render.

## Features

AuthMini V4 adds to V3's features:

- **TypeScript Integration**: Full-stack TypeScript implementation for enhanced type safety
- **Type-Safe API Contracts**: Consistent interfaces between frontend and backend
- **Enhanced Folder Structure**: Database components contained within backend folder
- **Basic Unit Testing**: Type-safe tests for backend services, routes, and frontend components
- **Backend Database Ownership**: Clear domain boundaries and ownership
- **Multiple TypeScript Configurations**: Separate configurations for root, backend, and frontend

While maintaining V3 features:

- User registration and authentication with JWT
- PostgreSQL database with Prisma ORM
- Admin dashboard with user management
- Simplified functionality to focus on TypeScript learning

## Documentation

- [Quick Start and Usage](#setup)
- [Architecture](./ARCHITECTURE.md): System architecture, component relationships, and technical choices.
- [Developer Reference](./DEVELOPER_REFERENCE.md): Detailed file information, TypeScript configurations, and code style guide.
- [Learning Guide](./LEARNING_GUIDE.md): Step-by-step guide to build V4 from V3, covering TypeScript integration and testing.

## Prerequisites

- **Node.js**: 20.15.1 (exact version for Render compatibility). Check: `node --version`.
- **npm**: 6+ (e.g., `10.8.2`). Check: `npm --version`.
- **PostgreSQL**: Local installation or Render service.
- **Git**: To clone the repository and use CI/CD.
- **Postman**: For API testing.
- **Code editor**: VS Code with TypeScript and Prisma extensions recommended.

## Setup

1. **Clone the Repository (V4 Branch)**:

   ```bash
   git clone -b v4 https://github.com/voilacode/authmini.git
   cd authmini
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment**:

   - Create `authmini/.env`:
     ```
     PORT=3000
     JWT_SECRET=your_jwt_secret_here
     LOG_LEVEL=info
     NODE_ENV=development
     DATABASE_URL=postgresql://user:password@localhost:5432/authmini?schema=public
     ```
   - Generate a secret: `openssl rand -base64 32`.
   - Update `DATABASE_URL` with your PostgreSQL credentials.

4. **Setup Database**:

   ```bash
   npm run migrate
   npm run seed
   ```

5. **Start Server**:

   ```bash
   npm start
   ```

   - Access: `http://localhost:3000` (frontend).

6. **Run Linting and Tests**:
   - Lint: `npm run lint`
   - All tests: `npm test`
   - Backend tests: `npm run test:backend`
   - Frontend tests: `npm run test:frontend`

## Usage

1. **Frontend**:

   - Open `http://localhost:3000` in a browser.
   - **Register**: Enter email (`user@example.com`), password (`user123`, 6+ characters), and name.
   - **Login**: Use registered credentials → User dashboard with name and logout button.
   - **Admin Login**: Use `admin@example.com`, `admin123` → Admin dashboard with user list and logout button.
   - **Logout**: Returns to login form.

2. **Backend APIs** (Test with Postman):
   - **Register**: `POST http://localhost:3000/api/auth/register`
     ```json
     { "email": "user@example.com", "password": "user123", "name": "Test User" }
     ```
   - **Login**: `POST http://localhost:3000/api/auth/login`
     ```json
     { "email": "user@example.com", "password": "user123" }
     ```
   - **Current User**: `GET http://localhost:3000/api/auth/me`
     - Header: `Authorization: Bearer <token>`
   - **List Users**: `GET http://localhost:3000/api/auth/users`
     - Header: `Authorization: Bearer <admin_token>`
   - **Logout**: `POST http://localhost:3000/api/auth/logout`

## TypeScript Configuration

AuthMini V4 uses multiple TypeScript configurations:

1. **Root Configuration** (`tsconfig.json`):

   - Configures TypeScript for the server entry point.

2. **Backend Configuration** (`backend/backend.tsconfig.json`):

   - Configures TypeScript for backend components with strict rules.

3. **Frontend Configuration** (`frontend/frontend.tsconfig.json`):
   - Configures TypeScript for frontend components with `allowJs: true`.

Key TypeScript features:

- **Static Type Checking**: Catch type errors during development.
- **Interfaces**: Define shapes of objects and API contracts.
- **Type-Safe API Client**: Ensures consistent communication between frontend and backend.
- **Type-Safe Database Queries**: Leverage Prisma's TypeScript integration.

## Testing

AuthMini V4 implements a basic testing strategy with Vitest:

1. **Backend Unit Tests**:

   - Test backend services in isolation.
   - Files: `backend/tests/unit/*.test.ts`
   - Run: `npm run test:backend`

2. **Backend Integration Tests**:

   - Test API routes with actual service layer.
   - Files: `backend/tests/integration/*.test.ts`
   - Run: `npm run test:backend`

3. **Frontend Unit Tests**:

   - Test frontend components with mocked API.
   - Files: `frontend/tests/unit/*.test.ts`
   - Run: `npm run test:frontend`

4. **All Tests**:
   - Run all test suites: `npm test`

## Debugging TypeScript

1. **Source Maps**:

   - All TypeScript configurations enable source maps with `"sourceMap": true`.
   - Debug TypeScript code directly, even though runtime executes JavaScript.

2. **VS Code Configuration**:
   - `.vscode/launch.json` provides debugging configurations.
   - Set breakpoints in TypeScript files.
   - Start debugging session using F5 or Debug panel.

## File Structure

AuthMini V4 consists of 30 files with a reorganized structure from V3:

- **Root** (5 files + configuration):
  - `server.ts`: Fastify server with TypeScript, serves APIs and frontend.
  - `package.json`: Dependencies, scripts (build, start, test, migrate, seed).
  - `tsconfig.json`: Root TypeScript configuration.
  - `.env`: Environment variables.
  - `vite.config.ts`: Vitest configuration for TypeScript.
- **Backend** (19 files + tests):
  - `backend/src/config/env.ts`: Environment validation.
  - `backend/src/data/prisma-manager.ts`: Prisma client with TypeScript.
  - `backend/src/middleware/auth-middleware.ts`: Authentication middleware.
  - `backend/src/routes/auth-routes.ts`: Authentication APIs with TypeScript.
  - `backend/src/routes/route-registry.ts`: Route registration.
  - `backend/src/services/user-service.ts`: User business logic with TypeScript.
  - `backend/src/types/model-types.ts`: TypeScript interfaces.
  - `backend/db/schema.prisma`: Prisma schema.
  - `backend/db/seed-data.ts`: Seed script with TypeScript.
  - `backend/tests/unit/*.test.ts`: Unit tests for services.
  - `backend/tests/integration/*.test.ts`: Integration tests for routes.
  - `backend/backend.tsconfig.json`: Backend TypeScript configuration.
- **Frontend** (6 files + tests):
  - `frontend/src/css/styles.css`: Custom styles.
  - `frontend/src/js/app.ts`: Alpine.js components with TypeScript.
  - `frontend/src/js/api-client.ts`: Type-safe API client.
  - `frontend/src/js/client-types.ts`: Frontend type definitions.
  - `frontend/src/index.html`: SPA entry point.
  - `frontend/tests/unit/*.test.ts`: Frontend component tests.
  - `frontend/frontend.tsconfig.json`: Frontend TypeScript configuration.

## Deployment

1. **Set Up PostgreSQL on Render**:

   - Create a PostgreSQL service on Render.
   - Note the connection string.

2. **Deploy Web Service to Render**:

   - Create a Web Service linked to your GitHub repository.
   - Configure:
     - Runtime: Node.js
     - Build Command: `npm install && npm run build && npx prisma generate`
     - Start Command: `npm run migrate && npm run seed && node server.js`
     - Environment Variables:
       - `PORT`: Leave blank (Render assigns)
       - `NODE_ENV`: `production`
       - `JWT_SECRET`: Your secret key
       - `DATABASE_URL`: The connection string from your Render PostgreSQL service
   - Deploy and access via provided URL.

3. **CI/CD**:
   - GitHub Actions runs TypeScript compilation, linting, migration, seeding, and testing with PostgreSQL.
   - For automatic deployment, add `RENDER_API_KEY` and `RENDER_SERVICE_ID` to GitHub repository secrets.

## Notes

- AuthMini V4 addresses the lack of type safety in V3 by implementing TypeScript throughout the stack.
- The enhanced folder structure places all database components within the backend folder.
- Basic unit testing demonstrates testing TypeScript applications with Vitest.
- Functionality is simplified to focus on TypeScript integration and learning.
- For production, consider adding more comprehensive testing, email verification, logging, monitoring, and advanced security features.
- Report issues or contribute at [https://github.com/voilacode/authmini](https://github.com/voilacode/authmini).

## License

MIT
