# Developer Reference for AuthMini V4

**Version**: 4.0  
**Application**: AuthMini V4  
**Repository**: [https://github.com/voilacode/authmini/tree/v4](https://github.com/voilacode/authmini/tree/v4)  
**Purpose**: This document serves as a definitive technical guide for developers and LLMs, ensuring consistent, maintainable code for AuthMini V4, a TypeScript-based authentication app built on V3. It emphasizes **TypeScript integration**, **type safety**, and **basic unit testing** with Vitest, using the enhanced folder structure with backend-contained database components. It provides detailed insights into project structure, TypeScript configuration, user roles, database schema, API specifications, and testing protocols. Optimized for developers extending the app and LLMs producing uniform code within constrained context windows, it supports scalable learning and development.

## Table of Contents

- [Project Introduction](#project-introduction)
- [User Roles and Permissions](#user-roles-and-permissions)
- [User Flows](#user-flows)
- [Database Schema and Design](#database-schema-and-design)
- [System Architecture](#system-architecture)
- [Project Folder and File Structure](#project-folder-and-file-structure)
- [TypeScript Configuration](#typescript-configuration)
- [File Details](#file-details)
  - [1. backend/src/config/env.ts](#1-backendsrcconfigenvts)
  - [2. backend/src/data/prisma-manager.ts](#2-backendsrcdataprisma-managerts)
  - [3. backend/src/middleware/auth-middleware.ts](#3-backendsrcmiddlewareauth-middlewarets)
  - [4. backend/src/routes/auth-routes.ts](#4-backendsrcroutesauth-routests)
  - [5. backend/src/routes/route-registry.ts](#5-backendsrcroutesroute-registryts)
  - [6. backend/src/services/user-service.ts](#6-backendsrcservicesuser-servicets)
  - [7. backend/src/types/model-types.ts](#7-backendsrctypesmodel-typests)
  - [8. backend/db/schema.prisma](#8-backenddbschemaprisma)
  - [9. backend/db/seed-data.ts](#9-backenddbseed-datats)
  - [10. frontend/src/css/styles.css](#10-frontendsrccssstylescss)
  - [11. frontend/src/js/app.ts](#11-frontendsrcjsappts)
  - [12. frontend/src/js/api-client.ts](#12-frontendsrcjsapi-clientts)
  - [13. frontend/src/js/client-types.ts](#13-frontendsrcjsclient-typests)
  - [14. frontend/src/index.html](#14-frontendsrcindexhtml)
  - [15. server.ts](#15-serverts)
  - [16. package.json](#16-packagejson)
  - [17. tsconfig.json](#17-tsconfigjson)
  - [18. backend/backend.tsconfig.json](#18-backendbackendtsconfigjson)
  - [19. frontend/frontend.tsconfig.json](#19-frontendfrontendtsconfigjson)
  - [20. vite.config.ts](#20-viteconfigts)
  - [21. .env](#21-env)
- [API Reference](#api-reference)
- [Testing Guidelines](#testing-guidelines)
- [Debugging TypeScript Applications](#debugging-typescript-applications)
- [Code Style Guide](#code-style-guide)
- [LLM Guidelines](#llm-guidelines)
- [Notes](#notes)
- [License](#license)

## Project Introduction

AuthMini V4 is an enhanced full-stack authentication application that builds on V3, designed as an educational tool to teach TypeScript and unit testing. It extends V3's authentication features and Prisma ORM integration by replacing JavaScript with **TypeScript**, introducing **static type checking**, and implementing **basic unit testing** with Vitest. Built with **Fastify** (backend), **Alpine.js** (frontend), **PostgreSQL** with **Prisma ORM** (database), and **TypeScript**, it maintains a single-server setup hosted at [https://github.com/voilacode/authmini/tree/v4](https://github.com/voilacode/authmini/tree/v4) under the MIT license. AuthMini V4 serves as a stepping stone for learning TypeScript integration, type safety, and testing principles.

### What is AuthMini V4?

AuthMini V4 is a robust, self-contained web application demonstrating an advanced authentication system with TypeScript integration and basic testing. It allows users to register, log in, view their name, and log out; while admins can register, log in, view a list of users, and log out. The app uses a single Fastify server to handle API endpoints (`/api/*`) and a frontend single-page application (SPA) at `/`. Its well-structured folder organization places all database-related code within the backend folder, separates tests by domain, and uses TypeScript configuration at root, backend, and frontend levels, making it ideal for intermediate learners, developers exploring TypeScript, and LLMs generating consistent code.

### How is AuthMini V4 Used?

AuthMini V4 is used as:

- **A Learning Resource**: Developers learn TypeScript integration, interfaces and types definition, type inference, and basic unit testing with Vitest.
- **A Reference Implementation**: It showcases how to add TypeScript to an existing JavaScript codebase, with clear type definitions and testing approach.
- **A Development Sandbox**: Developers can practice TypeScript, add type-safe features, or experiment with type definitions, using this document for consistency.
- **An LLM Code Generation Template**: LLMs use this document's guidelines to generate V4-compatible code, ensuring uniform style and functionality.

To use AuthMini V4, developers clone the repository (`v4` branch), install dependencies, configure `.env` with PostgreSQL connection, run migrations (`npm run migrate`), seed the database (`npm run seed`), and start the server (`npm start`). They interact via the browser (`http://localhost:3000`) or test APIs with Postman. Automated tests (`npm test`, `npm run test:backend`, `npm run test:frontend`) ensure code quality.

### Why is AuthMini V4 Designed This Way?

AuthMini V4's design prioritizes:

- **TypeScript Integration**: Replaces JavaScript with TypeScript to add static type checking, improved IDE support, and self-documenting code.
- **Enhanced Folder Structure**: Places database components in backend folder, separates tests by domain, and maintains clear boundaries between frontend and backend.
- **Type Safety**: Implements interfaces and types for API contracts, service layer, and frontend components.
- **Basic Unit Testing**: Implements tests for backend services, routes, and frontend components.
- **Backend Database Ownership**: Keeps all database-related code within the backend to establish clear domain ownership.
- **Simplified Features**: Focuses on core functionality to highlight TypeScript learning.

This design addresses the lack of type safety in V3 while teaching TypeScript integration and basic testing principles.

## User Roles and Permissions

AuthMini V4 defines two user roles with the same basic permissions as V3, but with simplified functionality to focus on TypeScript learning.

| Role      | Description                                                            | Permissions                                                                                                                   | Access                                                                                                                                                                              |
| --------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **User**  | Standard user, default for new registrants.                            | - Register with email/password/name.<br>- Login to access dashboard.<br>- View name.<br>- Logout.                             | - `/`: Login/register form.<br>- `/` (post-login): User dashboard (welcome message, logout).<br>- APIs: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`. |
| **Admin** | Privileged user, seeded as `admin@example.com` (password: `admin123`). | - All **User** permissions.<br>- View list of users (emails, names, roles).<br>- Additional functionality in future versions. | - `/`: Login form.<br>- `/` (post-login): Admin dashboard (user list, logout).<br>- APIs: All **User** APIs, `GET /api/auth/users`.                                                 |

### Notes

- **Authentication**: JWTs stored in `localStorage` manage sessions.
- **Authorization**: Admin access to user management APIs requires a JWT with `role: 'admin'`, verified in `backend/src/middleware/auth-middleware.ts`.
- **Security**: Passwords hashed with `bcrypt`; `JWT_SECRET` in `.env` secures tokens.
- **Data Storage**: User data stored in PostgreSQL using Prisma ORM with TypeScript integration.
- **Type Safety**: All API interactions, service layer operations, and authentication flows are type-safe with TypeScript interfaces.

## User Flows

Key user interactions in AuthMini V4, simplified from V3 to focus on TypeScript learning.

### 1. User Registration

- **Steps**:
  1. User visits `http://localhost:3000`, sees login/register form with validation.
  2. Enters `email` (e.g., `user@example.com`), `password` (e.g., `user123`), and `name` (e.g., `Test User`).
  3. Clicks "Register" → `frontend/src/js/app.ts` validates inputs, sends `POST /api/auth/register` via Axios.
  4. `backend/src/routes/auth-routes.ts` calls `userService.registerUser`.
  5. `userService.registerUser` hashes password (`bcrypt`), creates user in PostgreSQL via Prisma.
  6. Returns `201` with `{ message: 'User registered successfully' }`.
  7. UI shows success message, prompt for login.
- **Outcome**: New user in `User` table (`role: 'user'`).

### 2. User Login and Dashboard

- **Steps**:
  1. User enters `email` and `password` in login form with validation.
  2. Clicks "Login" → `frontend/src/js/app.ts` sends `POST /api/auth/login`.
  3. `backend/src/routes/auth-routes.ts` calls `userService.loginUser`.
  4. `userService.loginUser` verifies credentials via Prisma, generates JWT.
  5. Returns `200` with `{ token, user: { id, email, name, role } }`.
  6. `frontend/src/js/app.ts` stores token in `localStorage`, shows user dashboard with welcome message and logout button.
- **Outcome**: User accesses simple dashboard.

### 3. Admin Login and User List

- **Steps**:
  1. Admin enters `admin@example.com` and `admin123` in login form.
  2. Clicks "Login" → `frontend/src/js/app.ts` sends `POST /api/auth/login`.
  3. `backend/src/routes/auth-routes.ts` verifies, returns JWT with `role: 'admin'`.
  4. `frontend/src/js/app.ts` stores token, calls `GET /api/auth/users`.
  5. `backend/src/routes/auth-routes.ts` verifies admin token using `auth-middleware.ts`, calls `userService.getUsers`.
  6. `userService.getUsers` queries database using Prisma with type safety.
  7. Returns `200` with `{ users: [{ id, email, name, role }, ...] }`.
  8. Admin sees user list in dashboard.
- **Outcome**: Admin views list of users.

### 4. Logout

- **Steps**:
  1. User/admin clicks "Logout" on dashboard.
  2. `frontend/src/js/app.ts` clears `localStorage` token, sends `POST /api/auth/logout`.
  3. `backend/src/routes/auth-routes.ts` returns `200` with `{ message: 'Logged out successfully' }`.
  4. UI reloads, shows login/register form.
- **Outcome**: Session ends, user redirected to login.

## Database Schema and Design

AuthMini V4 uses the same PostgreSQL database as V3 with Prisma ORM, but adds TypeScript integration. The schema is defined in `backend/db/schema.prisma`.

### Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           Int      @id @default(autoincrement())
  email        String   @unique
  passwordHash String
  name         String
  role         String   @default("user")
}
```

### Table Details

#### User

| Column         | Type   | Constraints                    | Description                    |
| -------------- | ------ | ------------------------------ | ------------------------------ |
| `id`           | Int    | @id, @default(autoincrement()) | Unique user identifier.        |
| `email`        | String | @unique                        | User's email, used for login.  |
| `passwordHash` | String |                                | Hashed password (bcrypt).      |
| `name`         | String |                                | User's name.                   |
| `role`         | String | @default("user")               | User role (`user` or `admin`). |

### Design Choices

- **PostgreSQL**: Maintains database from V3 for persistence and scalability.
- **Prisma ORM**: Provides type-safe queries with TypeScript integration.
- **TypeScript Integration**: Adds type safety to database operations.
- **Simplified Schema**: Focuses on core User entity to highlight TypeScript learning.
- **Security**: Passwords hashed with `bcrypt`; Prisma reduces SQL injection risk.
- **Type Definitions**: Interfaces match Prisma models for consistency.

### Usage

- **Initialization**:
  - `npm run migrate` applies Prisma migrations to PostgreSQL.
  - `npm run seed` populates initial data (admin user).
- **Queries with TypeScript**:
  - **Create**: `prisma.user.create({ data: { email, passwordHash, name } })`
  - **Read**: `prisma.user.findUnique({ where: { email } })`
  - **Update**: `prisma.user.update({ where: { id }, data: { /* data */ } })`
  - **Delete**: `prisma.user.delete({ where: { id } })`
- **Storage**: PostgreSQL database hosted locally or on Render.

## System Architecture

AuthMini V4 maintains a single-server architecture, with TypeScript integration and enhanced folder structure.

- **Design**:
  - **Single Server**: `server.ts` (Fastify) handles API routes (`/api/*`) and serves frontend SPA (`/`).
  - **Backend**: Fastify with PostgreSQL, Prisma ORM, JWT authentication, bcrypt for hashing, service layer for business logic, all in TypeScript.
  - **Frontend**: Alpine.js SPA with TypeScript, Tailwind CSS (CDN) for styling, Axios for API requests.
  - **Database**: PostgreSQL with `User` table managed by Prisma, all database components in backend folder.
  - **Testing**: Vitest for unit tests of backend and frontend components.
  - **TypeScript**: Type definitions, interfaces, and static type checking throughout.
- **Dependencies**:
  - Backend: `@prisma/client`, `bcrypt`, `dotenv`, `fastify`, `@fastify/static`, `jsonwebtoken`, `axios`.
  - Frontend: Alpine.js (CDN), Axios (CDN), Tailwind CSS (CDN).
  - Dev: `typescript`, `eslint`, `vitest`, `prisma`, `@types/*`.
- **Data Flow**:
  1. Browser requests `http://localhost:3000` → `server.ts` serves `frontend/src/index.html`.
  2. `index.html` loads dependencies and Alpine.js components.
  3. `app.ts` checks token, fetches user data or admin dashboard.
  4. API requests from frontend → `server.ts` routes to `auth-routes.ts`.
  5. Routes call services (`user-service.ts`), implementing middleware for authentication.
  6. Services use Prisma client from `prisma-manager.ts` to interact with PostgreSQL.
  7. Responses update UI via Alpine.js.

## Project Folder and File Structure

AuthMini V4 consists of **30 files** (reorganized from V3). Below is the directory tree with numbered files for tracking:

```
authmini/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── [1] env.ts
│   │   ├── data/
│   │   │   └── [2] prisma-manager.ts
│   │   ├── middleware/
│   │   │   └── [3] auth-middleware.ts
│   │   ├── routes/
│   │   │   ├── [4] auth-routes.ts
│   │   │   └── [5] route-registry.ts
│   │   ├── services/
│   │   │   └── [6] user-service.ts
│   │   └── types/
│   │       └── [7] model-types.ts
│   ├── db/
│   │   ├── migrations/
│   │   │   └── (generated files)
│   │   ├── [8] schema.prisma
│   │   └── [9] seed-data.ts
│   ├── tests/
│   │   ├── unit/
│   │   │   └── user-service.test.ts
│   │   └── integration/
│   │       └── auth-routes.test.ts
│   ├── dist/
│   └── [18] backend.tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── css/
│   │   │   └── [10] styles.css
│   │   ├── js/
│   │   │   ├── [11] app.ts
│   │   │   ├── [12] api-client.ts
│   │   │   └── [13] client-types.ts
│   │   └── [14] index.html
│   ├── tests/
│   │   └── unit/
│   │       └── app-ui.test.ts
│   ├── dist/
│   └── [19] frontend.tsconfig.json
├── docs/
│   ├── ARCHITECTURE.md
│   ├── LEARNING_GUIDE.md
│   └── DEVELOPER_REFERENCE.md
├── [15] server.ts
├── server.js
├── [16] package.json
├── [17] tsconfig.json
├── [20] vite.config.ts
├── [21] .env
├── .env.example
├── .eslintrc.json
├── .gitignore
├── README.md
├── .github/
│   └── workflows/
│       └── ci.yml
```

- **File Count**: 30 (including generated files).
- **Notes**:
  - `backend/db/migrations/` stores Prisma migration files (generated).
  - `backend/dist/` and `frontend/dist/` store compiled JavaScript.
  - `.gitignore` excludes `node_modules`, `.env`, `dist/` directories.

## TypeScript Configuration

AuthMini V4 uses multiple TypeScript configuration files to organize compilation settings.

### Root Configuration (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "sourceMap": true,
    "outDir": "./",
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["server.ts"],
  "exclude": ["node_modules"]
}
```

### Backend Configuration (backend/backend.tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "sourceMap": true
  },
  "include": ["src/**/*"]
}
```

### Frontend Configuration (frontend/frontend.tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "skipLibCheck": true,
    "allowJs": true,
    "sourceMap": true
  },
  "include": ["src/**/*"]
}
```

### Design Choices

- **Multiple Configurations**: Separate configurations for root, backend, and frontend to maintain domain-specific settings.
- **Strict Mode**: All configurations enable `strict: true` for maximum type safety.
- **Source Maps**: Generate source maps for debugging TypeScript code.
- **Module System**: Use ESNext modules throughout the application.
- **Target**: Compile to ES2020 for modern JavaScript features.
- **Directory Structure**: Backend and frontend have their own `src` and `dist` directories.

## File Details

Detailed information for each file, numbered for reference.

### 1. backend/src/config/env.ts

- **Purpose**: Validates required environment variables.
- **Key Variables**:
  - `requiredEnvVars`: Array of required environment variables.
- **Key Methods**:
  - `validateEnv()`: Validates that all required variables are set.
- **Connections**:
  - Used by: `server.ts`.
- **Notes**: Prevents runtime errors from missing environment variables.

### 2. backend/src/data/prisma-manager.ts

- **Purpose**: Initializes and manages Prisma client with TypeScript.
- **Key Variables**:
  - `prisma`: PrismaClient instance.
- **Key Methods**:
  - `initDb()`: Initializes Prisma client.
  - `getDb()`: Returns initialized client.
- **Connections**:
  - Imports: `@prisma/client`.
  - Used by: `user-service.ts`.
  - Connects to: PostgreSQL via `DATABASE_URL`.
- **Notes**: Maintains singleton pattern for Prisma client with type safety.

### 3. backend/src/middleware/auth-middleware.ts

- **Purpose**: Authenticates requests and verifies admin role.
- **Key Variables**:
  - `AuthenticatedRequest`: Interface extending FastifyRequest.
- **Key Methods**:
  - `authenticate(request, reply)`: Verifies JWT and adds user to request.
  - `requireAdmin(request, reply)`: Verifies user has admin role.
- **Connections**:
  - Imports: `fastify`, `jsonwebtoken`, `model-types.ts`.
  - Used by: `auth-routes.ts`.
- **Notes**: Implements middleware pattern with TypeScript interfaces.

### 4. backend/src/routes/auth-routes.ts

- **Purpose**: Defines authentication API routes with TypeScript.
- **Key Variables**:
  - `RegisterBody`: Interface for registration request.
  - `LoginBody`: Interface for login request.
- **Key Methods**:
  - `registerAuthRoutes(fastify)`: Registers routes (`/register`, `/login`, `/logout`, `/me`, `/users`).
- **Connections**:
  - Imports: `fastify`, `user-service.ts`, `auth-middleware.ts`, `model-types.ts`.
  - Used by: `route-registry.ts`.
- **Notes**: Uses TypeScript interfaces for request/response types.

### 5. backend/src/routes/route-registry.ts

- **Purpose**: Centralizes route registration with TypeScript.
- **Key Variables**: None.
- **Key Methods**:
  - `registerRoutes(fastify)`: Registers all application routes.
- **Connections**:
  - Imports: `fastify`, `auth-routes.ts`.
  - Used by: `server.ts`.
- **Notes**: Simplifies route registration in server.ts.

### 6. backend/src/services/user-service.ts

- **Purpose**: Implements user-related business logic with TypeScript.
- **Key Variables**: None.
- **Key Methods**:
  - `registerUser(input: UserInput)`: Registers new user.
  - `loginUser(email, password)`: Authenticates user.
  - `getUsers()`: Gets list of users.
  - `getUserById(userId)`: Gets user by ID.
- **Connections**:
  - Imports: `bcrypt`, `jsonwebtoken`, `prisma-manager.ts`, `model-types.ts`.
  - Used by: `auth-routes.ts`.
- **Notes**: Implements type-safe business logic using interfaces.

### 7. backend/src/types/model-types.ts

- **Purpose**: Centralizes TypeScript interfaces and types.
- **Key Variables**:
  - `User`: Interface for User entity.
  - `UserInput`: Interface for user registration input.
  - `LoginResponse`: Interface for login response.
  - `JwtPayload`: Interface for JWT payload.
  - `ErrorResponse`: Interface for error response.
- **Key Methods**: None.
- **Connections**:
  - Used by: `user-service.ts`, `auth-routes.ts`, `auth-middleware.ts`.
- **Notes**: Single source of truth for type definitions.

### 8. backend/db/schema.prisma

- **Purpose**: Defines database schema for Prisma ORM.
- **Key Variables**:
  - `User`: Model for user entity.
- **Key Methods**: None.
- **Connections**:
  - Used by: Prisma client, migrations.
- **Notes**: Central schema definition for Prisma, connects to PostgreSQL via `DATABASE_URL`.

### 9. backend/db/seed-data.ts

- **Purpose**: Seeds database with initial admin user.
- **Key Variables**: None.
- **Key Methods**:
  - `main()`: Seeds admin user.
- **Connections**:
  - Imports: `@prisma/client`, `bcrypt`.
  - Used by: `npm run seed`.
- **Notes**: Creates admin user (`admin@example.com`/`admin123`) using TypeScript.

### 10. frontend/src/css/styles.css

- **Purpose**: Custom styles for forms, buttons, animations.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: Classes like `.form-container`, `.btn-primary`.
- **Connections**:
  - Loaded by: `index.html`.
  - Served by: `server.ts`.
- **Notes**: Complements Tailwind CSS.

### 11. frontend/src/js/app.ts

- **Purpose**: Manages SPA state with TypeScript.
- **Key Variables**:
  - `User`: Interface for user object.
- **Key Methods**:
  - `app()`: Alpine.js component with `init()`, `fetchUsers()`, `logout()`.
  - `authComponent()`: Alpine.js component for authentication.
- **Connections**:
  - Imports: `api-client.ts`, `client-types.ts`.
  - Loaded by: `index.html`.
- **Notes**: Implements Alpine.js with TypeScript.

### 12. frontend/src/js/api-client.ts

- **Purpose**: Type-safe API communication.
- **Key Variables**: None.
- **Key Methods**:
  - `registerUser(userData)`: Registers new user.
  - `loginUser(credentials)`: Authenticates user.
  - `getCurrentUser()`: Gets current user data.
  - `getUsers()`: Gets list of users.
  - `logoutUser()`: Logs out current user.
- **Connections**:
  - Imports: `axios`, `client-types.ts`.
  - Used by: `app.ts`.
- **Notes**: Implements type-safe API client pattern.

### 13. frontend/src/js/client-types.ts

- **Purpose**: Frontend type definitions.
- **Key Variables**:
  - `User`: Interface for user object.
  - `LoginResponse`: Interface for login response.
  - `RegistrationInput`: Interface for registration input.
  - `LoginInput`: Interface for login input.
  - `ApiError`: Interface for API error.
  - `UsersResponse`: Interface for users list response.
- **Key Methods**: None.
- **Connections**:
  - Used by: `app.ts`, `api-client.ts`.
- **Notes**: Frontend equivalent of backend types.

### 14. frontend/src/index.html

- **Purpose**: SPA entry point, defines UI with Alpine.js.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: Loads scripts, defines UI components for:
  - Login/register form
  - User dashboard
  - Admin dashboard with user list
- **Connections**:
  - Loads: `app.ts`, Alpine.js, Axios, Tailwind CSS.
  - Served by: `server.ts`.
- **Notes**: Simplified UI for TypeScript focus.

### 15. server.ts

- **Purpose**: Fastify server with TypeScript.
- **Key Variables**:
  - `fastify`: FastifyInstance.
- **Key Methods**:
  - `startServer()`: Initializes server, registers routes.
- **Connections**:
  - Imports: `fastify`, `@fastify/static`, `path`, `dotenv`, `route-registry.ts`, `prisma-manager.ts`, `env.ts`.
  - Serves: Frontend static files, API routes.
- **Notes**: Uses TypeScript for server configuration.

### 16. package.json

- **Purpose**: Defines metadata, dependencies, scripts.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**:
  - Scripts: `start`, `build`, `build:backend`, `build:frontend`, `build:server`, `lint`, `test`, `test:backend`, `test:frontend`, `migrate`, `seed`.
  - Dependencies: `@prisma/client`, `bcrypt`, `dotenv`, `fastify`, etc.
  - DevDependencies: `typescript`, `eslint`, `vitest`, `prisma`, `@types/*`.
- **Connections**:
  - Used by: npm, TypeScript.
- **Notes**: Added TypeScript-related scripts and dependencies.

### 17. tsconfig.json

- **Purpose**: Root TypeScript configuration.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: TypeScript compiler options for server.ts.
- **Connections**:
  - Used by: `npm run build:server`.
- **Notes**: Configures TypeScript for server entry point.

### 18. backend/backend.tsconfig.json

- **Purpose**: Backend TypeScript configuration.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: TypeScript compiler options for backend code.
- **Connections**:
  - Used by: `npm run build:backend`.
- **Notes**: Configures TypeScript for backend with strict rules.

### 19. frontend/frontend.tsconfig.json

- **Purpose**: Frontend TypeScript configuration.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: TypeScript compiler options for frontend code.
- **Connections**:
  - Used by: `npm run build:frontend`.
- **Notes**: Configures TypeScript for frontend with `allowJs: true`.

### 20. vite.config.ts

- **Purpose**: Configures Vitest for testing TypeScript.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: Sets test environment, file patterns.
- **Connections**:
  - Used by: `npm test`.
- **Notes**: Configured for TypeScript testing.

### 21. .env

- **Purpose**: Stores environment variables.
- **Key Variables**:
  - `PORT`: Server port.
  - `JWT_SECRET`: Secret for JWT signing.
  - `LOG_LEVEL`: Fastify logging level.
  - `NODE_ENV`: Environment (development, production).
  - `DATABASE_URL`: PostgreSQL connection string.
- **Key Methods**: None.
- **Connections**:
  - Read by: `server.ts`, `auth-routes.ts`, Prisma.
- **Notes**: Includes database connection for PostgreSQL.

## API Reference

Documented endpoints for testing AuthMini V4 APIs.

### 1. POST /api/auth/register

- **Description**: Registers a new user.
- **Request**:
  - **Method**: POST
  - **URL**: `/api/auth/register`
  - **Headers**: `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "user123",
      "name": "Test User"
    }
    ```
- **Response**:
  - **Success** (201): `{ "message": "User registered successfully" }`
  - **Error** (400): `{ "error": "Email already exists" }`
- **Notes**: Simple registration without profile/settings.

### 2. POST /api/auth/login

- **Description**: Authenticates user, returns JWT.
- **Request**:
  - **Method**: POST
  - **URL**: `/api/auth/login`
  - **Headers**: `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "user123"
    }
    ```
- **Response**:
  - **Success** (200):
    ```json
    {
      "token": "<jwt_token>",
      "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "Test User",
        "role": "user"
      }
    }
    ```
  - **Error** (401): `{ "error": "Invalid credentials" }`
- **Notes**: Returns user data with token.

### 3. POST /api/auth/logout

- **Description**: Logs out user (client-side).
- **Request**:
  - **Method**: POST
  - **URL**: `/api/auth/logout`
  - **Headers**: None
  - **Body**: None
- **Response**:
  - **Success** (200): `{ "message": "Logged out successfully" }`
- **Notes**: Clears `localStorage` token.

### 4. GET /api/auth/me

- **Description**: Gets current user data.
- **Request**:
  - **Method**: GET
  - **URL**: `/api/auth/me`
  - **Headers**: `Authorization: Bearer <token>`
  - **Body**: None
- **Response**:
  - **Success** (200):
    ```json
    {
      "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "Test User",
        "role": "user"
      }
    }
    ```
  - **Error** (401): `{ "error": "No token provided" }` or `{ "error": "Invalid token" }`
- **Notes**: Requires authentication middleware.

### 5. GET /api/auth/users

- **Description**: Lists all users (admin only).
- **Request**:
  - **Method**: GET
  - **URL**: `/api/auth/users`
  - **Headers**: `Authorization: Bearer <admin_token>`
  - **Body**: None
- **Response**:
  - **Success** (200):
    ```json
    {
      "users": [
        {
          "id": 1,
          "email": "admin@example.com",
          "name": "Admin",
          "role": "admin"
        },
        {
          "id": 2,
          "email": "user@example.com",
          "name": "Test User",
          "role": "user"
        }
      ]
    }
    ```
  - **Error** (401/403): `{ "error": "No token provided" }` or `{ "error": "Admin access required" }`
- **Notes**: Requires authentication and admin middleware.

## Testing Guidelines

AuthMini V4 implements a basic testing strategy with unit and integration tests for backend and frontend.

### 1. Backend Unit Tests

- **Purpose**: Test backend services in isolation.
- **Files**: `backend/tests/unit/*.test.ts`
- **Command**: `npm run test:backend`
- **Components Tested**:
  - `user-service.ts`: User registration, login, retrieval with mocked dependencies.
- **Example** (`backend/tests/unit/user-service.test.ts`):

```typescript
it('should register a new user', async () => {
  // Create a unique email for this test
  const uniqueEmail = `new${Date.now()}@example.com`;

  const result = await registerUser({
    email: uniqueEmail,
    password: 'password123',
    name: 'New User',
  });

  // Verify user was created
  expect(result.id).toBeDefined();
  expect(typeof result.id).toBe('number');

  // Clean up created user
  await db.user.delete({ where: { id: result.id } });
});
```

### 2. Backend Integration Tests

- **Purpose**: Test API routes with actual service layer.
- **Files**: `backend/tests/integration/*.test.ts`
- **Command**: `npm run test:backend`
- **Components Tested**:
  - `auth-routes.ts`: Authentication routes with actual service implementation.
- **Example** (`backend/tests/integration/auth-routes.test.ts`):

```typescript
it('should register a new user', async () => {
  const response = await fastify.inject({
    method: 'POST',
    url: '/register',
    payload: {
      email: testUser.email,
      password: testUser.password,
      name: testUser.name,
    },
  });

  // Verify response
  expect(response.statusCode).toBe(201);
  expect(JSON.parse(response.payload)).toEqual({
    message: 'User registered successfully',
  });

  // Verify user was created in database
  const createdUser = await db.user.findUnique({
    where: { email: testUser.email },
  });

  expect(createdUser).not.toBeNull();
  if (createdUser) {
    testUserId = createdUser.id;
  }
});
```

### 3. Frontend Unit Tests

- **Purpose**: Test frontend components with mocked API.
- **Files**: `frontend/tests/unit/*.test.ts`
- **Command**: `npm run test:frontend`
- **Components Tested**:
  - `app.ts`: Alpine.js components with mocked API responses.
- **Example** (`frontend/tests/unit/app-ui.test.ts`):

```typescript
it('should check for existing session on init', async () => {
  // Mock localStorage with token
  localStorageMock.setItem('token', 'fake-token');

  // Mock getCurrentUser
  const mockUser = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    role: 'user',
  };
  (getCurrentUser as any).mockResolvedValue({ user: mockUser });

  // Load the app script
  const { app } = require('../../src/js/app');

  // Create app component
  const appComponent = app();

  // Call init
  await appComponent.init();

  // Verify getCurrentUser was called
  expect(getCurrentUser).toHaveBeenCalled();
  expect(appComponent.user).toEqual(mockUser);
});
```

### 4. Running All Tests

- **Command**: `npm test`
- **Output**: Runs all backend and frontend tests.
- **Configuration**: Defined in `vite.config.ts`.
- **Notes**: Tests use Vitest with TypeScript support.

### 5. Testing Best Practices

- **Type Safety**: Tests leverage TypeScript for type checking.
- **Isolation**: Unit tests mock dependencies to test components in isolation.
- **Fixtures**: Before/after hooks set up and clean test data.
- **Cleaning**: Tests clean up after themselves to avoid test pollution.
- **Coverage**: Tests cover happy paths and error cases.

## Debugging TypeScript Applications

AuthMini V4 includes configuration for debugging TypeScript code.

### 1. Source Maps

- All TypeScript configurations enable source maps with `"sourceMap": true`.
- This allows debugging TypeScript code directly, even though the runtime executes JavaScript.

### 2. VS Code Configuration

- `.vscode/launch.json` provides debugging configurations:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Server",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/server.js",
      "preLaunchTask": "npm: build",
      "outFiles": ["${workspaceFolder}/**/*.js"],
      "sourceMaps": true,
      "env": {
        "NODE_ENV": "development"
      }
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Run Tests",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/node_modules/vitest/vitest.mjs",
      "args": ["run", "${relativeFile}"],
      "sourceMaps": true
    }
  ]
}
```

- `.vscode/tasks.json` defines build task:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "npm",
      "script": "build",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "problemMatcher": ["$tsc"],
      "label": "npm: build"
    }
  ]
}
```

### 3. Debugging Workflow

1. Set breakpoints in TypeScript files.
2. Start debugging session using F5 or Debug panel.
3. Examine variables, call stack in Debug Console.
4. Use conditional breakpoints for complex logic.

### 4. Common Issues

- **Module Resolution**: Ensure `moduleResolution` is set to `node` in tsconfig.
- **Missing Source Maps**: Verify `sourceMap` is enabled in tsconfig.
- **Path Mapping**: Use `outFiles` to help VS Code locate compiled files.
- **Async Debugging**: Use `await` in Debug Console to inspect Promises.

## Code Style Guide

Standards for consistent, maintainable TypeScript code, enforced by ESLint.

### General

- **Language**: TypeScript with ES Modules (ESM).
- **File Extensions**: `.ts` (TypeScript), `.js` (compiled JavaScript).
- **Encoding**: UTF-8.
- **Indentation**: 2 spaces, no tabs.
- **Line Length**: Max 100 characters.
- **Semicolons**: Always use.
- **Quotes**: Single quotes (`'`) for strings.
- **Comments**: JSDoc for modules/functions, inline for logic.

### Naming Conventions

- **Files**: Lowercase, kebab-case (e.g., `user-service.ts`).
- **Variables/Functions**: camelCase (e.g., `updateUser`).
- **Interfaces/Types**: PascalCase (e.g., `UserInput`).
- **Constants**: UPPER_SNAKE_CASE (e.g., `JWT_SECRET`).

### TypeScript

- **Explicit Types**: Use explicit return types for functions.
  ```typescript
  function getUserById(id: number): Promise<User> { ... }
  ```
- **Interfaces**: Define shapes of objects.
  ```typescript
  interface UserInput {
    email: string;
    password: string;
    name: string;
  }
  ```
- **Type Aliases**: Use for unions or complex types.
  ```typescript
  type UserRole = 'user' | 'admin';
  ```
- **No Any**: Avoid `any` type when possible.
- **Optional Properties**: Use `?` for optional properties.
  ```typescript
  interface Profile {
    displayName?: string;
    bio?: string;
  }
  ```
- **Type Assertions**: Use sparingly, only when necessary.
  ```typescript
  const user = result as User;
  ```

### Prisma with TypeScript

- **Schema**: Defined in `schema.prisma`, using Prisma syntax.
- **Client**: Singleton pattern in `prisma-manager.ts`.
- **Queries**: Use Prisma client methods with TypeScript.
  ```typescript
  const user = await db.user.findUnique({
    where: { email },
  });
  ```
- **Type Safety**: Leverage Prisma's generated types.
  ```typescript
  import { User } from '@prisma/client';
  ```

### Fastify with TypeScript

- **Route Registration**:
  ```typescript
  export async function registerAuthRoutes(fastify: FastifyInstance): Promise<void> {
    fastify.post<{ Body: RegisterBody }>(
      '/register',
      async (request, reply) => { ... }
    );
  }
  ```
- **Request/Reply Typing**:
  ```typescript
  interface RegisterBody {
    email: string;
    password: string;
    name: string;
  }
  ```

### Alpine.js with TypeScript

- **Components**:
  ```typescript
  function app() {
    return {
      user: null as User | null,
      async init(): Promise<void> { ... }
    };
  }
  ```
- **Type Definitions**:
  ```typescript
  declare global {
    interface Window {
      Alpine: any;
    }
  }
  ```

### Testing with TypeScript

- **Test Structure**: `describe`, `it`, `expect` with types.
  ```typescript
  describe('User Service', () => {
    it('should register a new user', async () => {
      const result = await registerUser(userData);
      expect(result.id).toBeDefined();
    });
  });
  ```
- **Mocking**: `vi.mock()`, `vi.fn()` with TypeScript.
  ```typescript
  vi.mock('../../src/data/prisma-manager', () => ({
    getDb: vi.fn().mockReturnValue({
      user: {
        create: vi.fn().mockResolvedValue({ id: 1 }),
      },
    }),
  }));
  ```
- **Type Assertions in Tests**: Use TypeScript assertions.
  ```typescript
  const user = result as User;
  expect(user.email).toBe('test@example.com');
  ```

## LLM Guidelines

LLMs must generate consistent AuthMini V4 code using this document.

1. **Adhere to Code Style**:
   - TypeScript, single quotes, 2-space indentation, semicolons, JSDoc.
2. **Use Templates**:

   - **TypeScript Interface**:

     ```typescript
     /**
      * [Interface description].
      */
     export interface InterfaceName {
       /** Property description */
       property: Type;
       /** Optional property description */
       optionalProperty?: Type;
     }
     ```

   - **Fastify Route with TypeScript**:

     ```typescript
     /**
      * [Route description].
      */
     import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
     import { serviceMethod } from '../services/service-name';
     import { RequestBody, ResponseType } from '../types/model-types';

     /**
      * [Interface description].
      */
     interface RouteBody {
       property: Type;
     }

     /**
      * Register routes for [module].
      * @param {FastifyInstance} fastify - Fastify instance.
      * @returns {Promise<void>}
      */
     export async function registerRoutes(
       fastify: FastifyInstance
     ): Promise<void> {
       fastify.post<{ Body: RouteBody }>('/path', async (request, reply) => {
         try {
           const { property } = request.body;
           const result = await serviceMethod(property);
           return reply.send(result);
         } catch (err: any) {
           return reply.code(400).send({ error: err.message });
         }
       });
     }
     ```

   - **Service with TypeScript and Prisma**:

     ```typescript
     /**
      * [Service description].
      */
     import { getDb } from '../data/prisma-manager';
     import { ResultType, InputType } from '../types/model-types';

     /**
      * [Method description].
      * @param {InputType} input - [description].
      * @returns {Promise<ResultType>} [description].
      * @throws {Error} If [condition].
      */
     export async function methodName(input: InputType): Promise<ResultType> {
       const db = getDb();

       try {
         const result = await db.model.operation({
           where: {
             /* conditions */
           },
           data: {
             /* data */
           },
         });

         return result;
       } catch (err: any) {
         throw new Error(`Operation failed: ${err.message}`);
       }
     }
     ```

   - **Vitest Test with TypeScript**:

     ```typescript
     /**
      * [Test description].
      */
     import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
     import { methodToTest } from '../../src/services/service-name';
     import { InputType, ResultType } from '../../src/types/model-types';

     describe('[Component] Tests', () => {
       beforeAll(() => {
         // Setup
       });

       afterAll(() => {
         // Cleanup
       });

       it('should [expected behavior]', async () => {
         // Arrange
         const input: InputType = {
           /* test data */
         };

         // Act
         const result = await methodToTest(input);

         // Assert
         expect(result).toEqual(/* expected output */);
       });
     });
     ```

3. **Follow TypeScript Best Practices**:

   - Use interfaces for object shapes.
   - Use type aliases for unions or complex types.
   - Avoid `any` type when possible.
   - Use explicit return types for functions.
   - Use optional properties with `?` when appropriate.
   - Use type assertions sparingly.

4. **Testing Strategies**:

   - Use TypeScript in tests.
   - Write testable code with dependency injection.
   - Mock dependencies with typed mocks.
   - Test both happy paths and error cases.

5. **Match File Structure**:

   - Generate for specified files (e.g., `user-service.ts`).
   - Follow V4 project structure with TypeScript files.

6. **Validate Output**:

   - Check TypeScript compatibility, ESLint rules, JSDoc.
   - Ensure type safety throughout the code.

7. **Context**:
   - Use this document as sole context.
   - Generate one file at a time.
   - Refer to related files when necessary.

## Notes

- Ensures consistent, maintainable TypeScript code for AuthMini V4.
- Addresses lack of type safety from V3 with TypeScript integration.
- Implements basic unit testing for backend and frontend.
- Places database components in backend folder for clear domain ownership.
- Report issues at [https://github.com/voilacode/authmini](https://github.com/voilacode/authmini).

## License

MIT
