I'll create an updated Developer Reference document for AuthMini V3 based on the learning guide and V2 developer reference you provided. Here's the updated document:

# Developer Reference for AuthMini V3

**Version**: 3.0  
**Application**: AuthMini V3  
**Repository**: [https://github.com/voilacode/authmini/tree/v3](https://github.com/voilacode/authmini/tree/v3)  
**Purpose**: This document serves as a definitive technical guide for developers and LLMs, ensuring consistent, maintainable code for AuthMini V3, an advanced full-stack authentication app built on V2. It emphasizes **production-ready database practices** with **PostgreSQL**, **Prisma ORM**, **migrations**, **seeding**, and **comprehensive testing** using a **test-driven development** approach. It provides detailed insights into project structure, user roles, user flows, database schema, API specifications, system architecture, file details, testing protocols, coding standards, and LLM code generation guidelines. Optimized for developers extending the app and LLMs producing uniform code within constrained context windows, it supports scalable learning and development.

## Table of Contents

- [Project Introduction](#project-introduction)
- [User Roles and Permissions](#user-roles-and-permissions)
- [User Flows](#user-flows)
- [User Flow Diagram Links](#user-flow-diagram-links)
- [Database Schema and Design](#database-schema-and-design)
- [System Architecture](#system-architecture)
- [Project Folder and File Structure](#project-folder-and-file-structure)
- [File Snapshot](#file-snapshot)
- [File Details](#file-details)
  - [1. backend/data/db.mjs](#1-backenddatadbmjs)
  - [2. backend/routes/auth.mjs](#2-backendroutesauthmjs)
  - [3. backend/routes/users.mjs](#3-backendroutesusersmjs)
  - [4. backend/services/userService.mjs](#4-backendservicesuserservicemjs)
  - [5. backend/services/activityService.mjs](#5-backendservicesactivityservicemjs)
  - [6. frontend/css/styles.css](#6-frontendcssstylescss)
  - [7. frontend/js/app.js](#7-frontendjsappjs)
  - [8. frontend/js/auth.js](#8-frontendjsauthjs)
  - [9. frontend/js/profile.js](#9-frontendjsprofilejs)
  - [10. frontend/index.html](#10-frontendindexhtml)
  - [11. db/schema.prisma](#11-dbschemaprisma)
  - [12. db/seed.mjs](#12-dbseedmjs)
  - [13. server.mjs](#13-servermjs)
  - [14. package.json](#14-packagejson)
  - [15. vite.config.js](#15-viteconfigjs)
  - [16. .env](#16-env)
  - [17. .gitignore](#17-gitignore)
  - [18. .eslintrc.json](#18-eslintrcjson)
  - [19. tests/unit/db.test.mjs](#19-testsunitdbtestmjs)
  - [20. tests/unit/userService.test.mjs](#20-testsunituserservicetestmjs)
  - [21. tests/unit/activityService.test.mjs](#21-testsunitactivityservicetestmjs)
  - [22. tests/routes/auth.test.mjs](#22-testsroutesauthtestmjs)
  - [23. tests/routes/users.test.mjs](#23-testsroutesuerstestmjs)
  - [24. tests/api.test.mjs](#24-testsapitestmjs)
  - [25. .github/workflows/ci.yml](#25-githubworkflowsciyml)
  - [26. README.md](#26-readmemd)
  - [27. LEARNING_GUIDE.md](#27-learning_guidemd)
  - [28. DEVELOPER_REFERENCE.md](#28-developer_referencemd)
- [API Reference](#api-reference)
- [Testing Guidelines](#testing-guidelines)
- [Code Style Guide](#code-style-guide)
- [Deployment and CI/CD](#deployment-and-cicd)
- [LLM Guidelines](#llm-guidelines)
- [Notes](#notes)
- [License](#license)

## Project Introduction

AuthMini V3 is an enhanced full-stack authentication application that builds on V2, designed as an educational tool to teach production-ready database practices. It extends V2's authentication features and service layer architecture by replacing SQLite with **PostgreSQL** and implementing **Prisma ORM**, **migrations**, **seeding**, and **comprehensive testing** following the testing pyramid approach. Built with **Fastify** (backend), **Alpine.js** (frontend), **PostgreSQL** (database), and **ES Modules (ESM)**, it maintains a single-server setup hosted at [https://github.com/voilacode/authmini/tree/v3](https://github.com/voilacode/authmini/tree/v3) under the MIT license. AuthMini V3 serves as a stepping stone for learning production database practices, test-driven development, and enterprise-level coding practices, preparing developers for scalable systems like AuthCloud.

### What is AuthMini V3?

AuthMini V3 is a robust, self-contained web application demonstrating an advanced authentication system with production-ready database practices. It allows users to register, log in, view/edit profiles, change passwords, and manage settings (e.g., theme preference), while admins can search/filter users, enable/disable accounts, and view activity logs. The app uses a single Fastify server to handle API endpoints (`/api/*`) and a frontend single-page application (SPA) at `/`. Its **24-file structure** (expanded from V2 with additional Prisma files and test files) balances complexity with accessibility, making it ideal for intermediate learners, developers prototyping features, and LLMs generating consistent code.

### How is AuthMini V3 Used?

AuthMini V3 is used as:

- **A Learning Resource**: Developers learn production database practices with PostgreSQL, Prisma ORM, migrations, seeding, and comprehensive testing (unit, integration, API) using Vitest.
- **A Reference Implementation**: It showcases advanced authentication patterns with a production-ready database approach adaptable to larger projects.
- **A Development Sandbox**: Developers can add features or experiment with database practices, using this document for consistency.
- **An LLM Code Generation Template**: LLMs use this document's guidelines to generate V3-compatible code, ensuring uniform style and functionality.

To use AuthMini V3, developers clone the repository (`v3` branch), install dependencies, configure `.env` with PostgreSQL connection, run migrations (`npm run migrate`), seed the database (`npm run seed`), and start the server (`npm start`). They interact via the browser (`http://localhost:3000`) or test APIs with Postman. Automated tests (`npm test`, `npm run test:unit`, `npm run test:routes`, `npm run test:api`) ensure code quality, while CI/CD automates testing and deployment to Render. This document, `README.md`, and `LEARNING_GUIDE.md` guide setup, usage, and extension.

### Why is AuthMini V3 Designed This Way?

AuthMini V3's design prioritizes:

- **Production Database Practices**: Replaces SQLite with PostgreSQL to address data persistence issues, implements Prisma ORM for type-safe queries, migrations for schema management, and seeding for consistent data initialization.
- **Comprehensive Testing**: Implements a testing pyramid with unit tests (isolated components), route tests (API routes with mocked services), and API integration tests (complete flows), using Vitest for modern testing.
- **Enhanced Features**: Retains V2's profile management and admin capabilities while adding comprehensive CRUD operations and improving database interactions.
- **Service Layer Architecture**: Continues V2's separation of business logic into service layer, now using Prisma for database operations.
- **CI/CD Integration**: Updates CI/CD pipeline to include migration and seeding steps for PostgreSQL.
- **Deploy to Render**: Configures deployment with PostgreSQL database hosted on Render for persistence.

This design addresses the SQLite limitation from V2 (data persistence issues when `authmini.db` was included in Git) while teaching production-ready database practices and comprehensive testing approaches.

## User Roles and Permissions

AuthMini V3 defines two user roles with the same permissions and access levels as V2, but with enhanced database implementation using Prisma, stored in the `User` table (`role` field).

| Role      | Description                                                            | Permissions                                                                                                                                                                                           | Access                                                                                                                                                                                                                                                             |
| --------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **User**  | Standard user, default for new registrants.                            | - Register with email/password.<br>- Login to access dashboard.<br>- View/edit profile (displayName, bio, avatarUrl).<br>- Change password.<br>- Manage settings (theme, notifications).<br>- Logout. | - `/`: Login/register form.<br>- `/` (post-login): User dashboard (email, profile, settings, logout).<br>- APIs: `POST /api/register`, `POST /api/login`, `POST /api/logout`, `POST /api/profile`, `POST /api/password`, `POST /api/settings`.                     |
| **Admin** | Privileged user, seeded as `admin@example.com` (password: `admin123`). | - All **User** permissions.<br>- View/search/filter users (emails, roles, join dates, active status).<br>- Enable/disable user accounts.<br>- Delete users.<br>- View activity logs.                  | - `/`: Login form.<br>- `/` (post-login): Admin dashboard (user list, search, toggle active, delete, logs, logout).<br>- APIs: All **User** APIs, `GET /api/users`, `GET /api/users/:id`, `PATCH /api/users/:id/active`, `DELETE /api/users/:id`, `GET /api/logs`. |

### Notes

- **Authentication**: JWTs stored in `localStorage` manage sessions.
- **Authorization**: Admin access to user management APIs requires a JWT with `role: 'admin'`, verified in `backend/routes/users.mjs`.
- **Security**: Passwords hashed with `bcrypt`; `JWT_SECRET` in `.env` secures tokens; activity logs track actions.
- **Data Storage**: User data stored in PostgreSQL using Prisma ORM, with proper relations between tables.

## User Flows

Key user interactions in AuthMini V3, maintaining V2 flows with enhanced database operations.

### 1. User Registration

- **Steps**:
  1. User visits `http://localhost:3000`, sees login/register form (`frontend/index.html`) with validation.
  2. Enters `email` (e.g., `user@example.com`) and `password` (e.g., `user123`, 6+ characters).
  3. Clicks "Register" → `frontend/js/auth.js` validates inputs (email format, password length), sends `POST /api/register` via Axios.
  4. `backend/routes/auth.mjs` calls `userService.registerUser`.
  5. `userService.registerUser` hashes password (`bcrypt`), creates user in PostgreSQL via Prisma.
  6. `activityService.logActivity` logs "User registered."
  7. Returns `201` with `{ message: 'User registered' }`.
  8. UI shows "Registration successful," prompts login.
- **Outcome**: New user in `User` table (`role: 'user'`), activity logged.

### 2. User Login and Dashboard

- **Steps**:
  1. User enters `email` and `password` in login form with validation.
  2. Clicks "Login" → `frontend/js/auth.js` sends `POST /api/login`.
  3. `backend/routes/auth.mjs` calls `userService.loginUser`.
  4. `userService.loginUser` verifies credentials via Prisma, checks `is_active`, generates JWT.
  5. `activityService.logActivity` logs "User logged in."
  6. Returns `200` with `{ token, user: { id, email, role } }`.
  7. `frontend/js/app.js` stores token in `localStorage`, shows dashboard (email, profile edit, settings, logout).
- **Outcome**: User accesses dashboard with profile/settings UI.

### 3. User Profile and Settings Management

- **Steps**:
  1. User clicks "Edit Profile" on dashboard.
  2. `frontend/js/profile.js` loads profile/settings form (`displayName`, `bio`, `avatarUrl`, `theme`, `notifications`).
  3. User updates fields, clicks "Save" → `frontend/js/profile.js` sends `POST /api/profile`, `POST /api/settings`, and optionally `POST /api/password`.
  4. `backend/routes/auth.mjs` verifies JWT, calls `userService.updateUserProfile`, `userService.updateUserSettings`, or `userService.changeUserPassword`.
  5. Services perform operations via Prisma ORM, handling relations between tables.
  6. `activityService.logActivity` logs actions (e.g., "Profile updated").
  7. Returns `200` with `{ message: 'Profile updated' }` (or similar).
  8. UI shows success message, applies settings (e.g., theme).
- **Outcome**: Profile/settings updated, actions logged.

### 4. Admin Login and User Management

- **Steps**:
  1. Admin enters `admin@example.com` and `admin123` in login form.
  2. Clicks "Login" → `frontend/js/auth.js` sends `POST /api/login`.
  3. `backend/routes/auth.mjs` verifies, returns JWT with `role: 'admin'`.
  4. `frontend/js/app.js` stores token, calls `GET /api/users` with search query (e.g., `?search=user&active=true`).
  5. `backend/routes/users.mjs` verifies admin token, calls `userService.getUsers` with filters.
  6. `userService.getUsers` queries database using Prisma.
  7. Returns `200` with `{ users: [{ id, email, role, createdAt, is_active, profile }, ...] }`.
  8. Admin can:
     - View user details with `GET /api/users/:id`
     - Toggle user status with `PATCH /api/users/:id/active`
     - Delete users with `DELETE /api/users/:id`
     - View activity logs with `GET /api/logs`
  9. UI updates to reflect changes.
- **Outcome**: Admin manages users, views logs.

### 5. Logout

- **Steps**:
  1. User/admin clicks "Logout" on dashboard.
  2. `frontend/js/app.js` clears `localStorage` token, sends `POST /api/logout`.
  3. `backend/routes/auth.mjs` returns `200` with `{ message: 'Logged out' }`.
  4. UI reloads, shows login/register form.
- **Outcome**: Session ends, user redirected to login.

## User Flow Diagram Links

Placeholder links for user flow diagrams (to be added later):

- **User Registration Flow**: [Placeholder - Registration Diagram]()
- **User Login and Dashboard Flow**: [Placeholder - Login Diagram]()
- **User Profile/Settings Flow**: [Placeholder - Profile Diagram]()
- **Admin Login and User Management Flow**: [Placeholder - Admin Diagram]()
- **Logout Flow**: [Placeholder - Logout Diagram]()

### Notes

- Diagrams will illustrate UI transitions, API calls, service layer interactions, and database updates using Prisma ORM.
- To be hosted in the repository (e.g., `/docs/diagrams/`).

## Database Schema and Design

AuthMini V3 replaces SQLite with PostgreSQL and uses Prisma ORM for database interactions. The schema is defined in `db/schema.prisma`.

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
  id           Int          @id @default(autoincrement())
  email        String       @unique
  passwordHash String
  role         String       @default("user")
  is_active    Boolean      @default(true)
  createdAt    DateTime     @default(now())
  profile      Profile?
  settings     Settings?
  activityLogs ActivityLog[]
}

model Profile {
  userId      Int     @id
  displayName String?
  bio         String?
  avatarUrl   String?
  user        User    @relation(fields: [userId], references: [id])
}

model Settings {
  userId       Int     @id
  theme        String  @default("light")
  notifications Boolean @default(true)
  user         User    @relation(fields: [userId], references: [id])
}

model ActivityLog {
  id        Int      @id @default(autoincrement())
  userId    Int
  action    String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
}
```

### Table Details

#### User

| Column         | Type     | Constraints                    | Description                                   |
| -------------- | -------- | ------------------------------ | --------------------------------------------- |
| `id`           | Int      | @id, @default(autoincrement()) | Unique user identifier.                       |
| `email`        | String   | @unique                        | User's email, used for login.                 |
| `passwordHash` | String   |                                | Hashed password (bcrypt).                     |
| `role`         | String   | @default("user")               | User role (`user` or `admin`).                |
| `is_active`    | Boolean  | @default(true)                 | Account status (true=active, false=disabled). |
| `createdAt`    | DateTime | @default(now())                | Account creation time.                        |

#### Profile

| Column        | Type    | Constraints    | Description           |
| ------------- | ------- | -------------- | --------------------- |
| `userId`      | Int     | @id, @relation | References `User.id`. |
| `displayName` | String? |                | User's display name.  |
| `bio`         | String? |                | User's bio.           |
| `avatarUrl`   | String? |                | URL to user's avatar. |

#### Settings

| Column          | Type    | Constraints       | Description                        |
| --------------- | ------- | ----------------- | ---------------------------------- |
| `userId`        | Int     | @id, @relation    | References `User.id`.              |
| `theme`         | String  | @default("light") | UI theme (`light` or `dark`).      |
| `notifications` | Boolean | @default(true)    | Notification preference (true=on). |

#### ActivityLog

| Column      | Type     | Constraints                    | Description                                  |
| ----------- | -------- | ------------------------------ | -------------------------------------------- |
| `id`        | Int      | @id, @default(autoincrement()) | Unique log identifier.                       |
| `userId`    | Int      | @relation                      | References `User.id`.                        |
| `action`    | String   |                                | Action description (e.g., "User logged in"). |
| `createdAt` | DateTime | @default(now())                | Log creation time.                           |

### Design Choices

- **PostgreSQL**: Replaces SQLite for persistence, scalability, and production readiness.
- **Prisma ORM**: Provides type-safe queries, simplifies database operations, reduces errors.
- **Relations**:
  - One-to-one: `User` to `Profile`, `User` to `Settings`
  - One-to-many: `User` to `ActivityLog`
- **Migrations**: Managed through Prisma migrations for schema version control.
- **Seeding**: Uses Prisma seeding to initialize admin user and sample data.
- **Security**: Passwords hashed with `bcrypt`; Prisma reduces SQL injection risk.
- **Scalability**: Maintains service layer architecture for business logic independence.

### Usage

- **Initialization**:
  - `npm run migrate` applies Prisma migrations to PostgreSQL.
  - `npm run seed` populates initial data (admin, sample users).
- **Queries**:
  - **Create**: `prisma.user.create({ data: { email, passwordHash } })`
  - **Read**: `prisma.user.findUnique({ where: { email }, include: { profile: true } })`
  - **Update**: `prisma.user.update({ where: { id }, data: { is_active } })`
  - **Delete**: `prisma.user.delete({ where: { id } })`
- **Storage**: PostgreSQL database hosted locally or on Render.

## System Architecture

AuthMini V3 maintains a single-server architecture, replacing SQLite with PostgreSQL and implementing Prisma ORM, migrations, seeding, and comprehensive testing.

- **Design**:
  - **Single Server**: `server.mjs` (Fastify) handles API routes (`/api/*`) and serves frontend SPA (`/`).
  - **Backend**: Fastify with PostgreSQL, Prisma ORM, JWT authentication, bcrypt for hashing, service layer for business logic.
  - **Frontend**: Alpine.js SPA with Tailwind CSS (CDN) for styling, Axios for API requests, custom animations in `styles.css`.
  - **Database**: PostgreSQL with `User`, `Profile`, `Settings`, `ActivityLog` tables managed by Prisma.
  - **Testing**: Vitest for unit, route, and API integration tests.
  - **CI/CD**: GitHub Actions for linting, testing, migrations, and deployment to Render.
- **Dependencies**:
  - Backend: `@prisma/client`, `bcrypt`, `dotenv`, `fastify`, `@fastify/static`, `jsonwebtoken`, `axios`.
  - Frontend: Alpine.js (CDN), Axios (CDN), Tailwind CSS (CDN).
  - Dev: `eslint`, `vitest`, `prisma`, `supertest`.
- **Data Flow**:
  1. Browser requests `http://localhost:3000` → `server.mjs` serves `frontend/index.html`.
  2. `index.html` loads dependencies and Alpine.js components.
  3. `app.js` checks token, fetches user data or admin dashboard.
  4. API requests from frontend → `server.mjs` routes to `auth.mjs` or `users.mjs`.
  5. Routes call services (`userService.mjs`, `activityService.mjs`).
  6. Services use Prisma client from `db.mjs` to interact with PostgreSQL.
  7. Responses update UI via Alpine.js.

## Project Folder and File Structure

AuthMini V3 consists of **28 files** (expanded from V2). Below is the directory tree with numbered files for tracking:

```
authmini/
├── backend/
│   ├── data/
│   │   └── [1] db.mjs
│   ├── routes/
│   │   ├── [2] auth.mjs
│   │   └── [3] users.mjs
│   ├── services/
│   │   ├── [4] userService.mjs
│   │   └── [5] activityService.mjs
├── db/
│   ├── migrations/
│   │   └── (generated files)
│   ├── [11] schema.prisma
│   └── [12] seed.mjs
├── frontend/
│   ├── css/
│   │   └── [6] styles.css
│   ├── js/
│   │   ├── [7] app.js
│   │   ├── [8] auth.js
│   │   └── [9] profile.js
│   └── [10] index.html
├── tests/
│   ├── unit/
│   │   ├── [19] db.test.mjs
│   │   ├── [20] userService.test.mjs
│   │   └── [21] activityService.test.mjs
│   ├── routes/
│   │   ├── [22] auth.test.mjs
│   │   └── [23] users.test.mjs
│   └── [24] api.test.mjs
├── [13] server.mjs
├── [14] package.json
├── [15] vite.config.js
├── [16] .env
├── [17] .gitignore
├── [18] .eslintrc.json
├── .github/
│   └── workflows/
│       └── [25] ci.yml
├── [26] README.md
├── [27] LEARNING_GUIDE.md
├── [28] DEVELOPER_REFERENCE.md
```

- **File Count**: 28.
- **Notes**:
  - `db/migrations/` stores Prisma migration files (generated).
  - `.gitignore` excludes `node_modules`, `.env`, `dev.db` (Prisma's local dev DB).

## File Snapshot

The table summarizes key files, numbered for tracking.

| #   | File                                   | Purpose                                   | Key Variables                                      | Key Methods                                                                                                                                                              |
| --- | -------------------------------------- | ----------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | `backend/data/db.mjs`                  | Initializes Prisma client                 | `prisma`                                           | `initDb()`, `getDb()`                                                                                                                                                    |
| 2   | `backend/routes/auth.mjs`              | Defines auth APIs (register, login, etc.) | None                                               | `registerRoutes(fastify, options)`                                                                                                                                       |
| 3   | `backend/routes/users.mjs`             | Defines admin APIs (CRUD operations)      | None                                               | `verifyAdmin(token)`, `registerUserRoutes(fastify, options)`                                                                                                             |
| 4   | `backend/services/userService.mjs`     | User business logic with Prisma           | None                                               | `registerUser()`, `loginUser()`, `getUsers()`, `getUserById()`, `updateUserProfile()`, `updateUserSettings()`, `changeUserPassword()`, `setUserActive()`, `deleteUser()` |
| 5   | `backend/services/activityService.mjs` | Activity log logic with Prisma            | None                                               | `logActivity()`, `getActivityLogs()`                                                                                                                                     |
| 6   | `frontend/css/styles.css`              | Custom styles with animations             | None                                               | None                                                                                                                                                                     |
| 7   | `frontend/js/app.js`                   | Manages SPA state, dashboards             | `user`, `users`, `logs`, `error`                   | `app(): init()`, `fetchUsers()`, `fetchLogs()`, `viewUser()`, `closeUserDetails()`, `toggleUserActive()`, `deleteUser()`, `logout()`                                     |
| 8   | `frontend/js/auth.js`                  | Handles login/register with validation    | `email`, `password`, `errors`                      | `authComponent(): validate()`, `submit(action)`                                                                                                                          |
| 9   | `frontend/js/profile.js`               | Manages profile/settings UI               | `profile`, `settings`, `password`                  | `profileComponent(): init()`, `saveProfile()`                                                                                                                            |
| 10  | `frontend/index.html`                  | SPA entry point, Alpine.js UI             | None                                               | None                                                                                                                                                                     |
| 11  | `db/schema.prisma`                     | Defines database schema for Prisma        | `User`, `Profile`, `Settings`, `ActivityLog`       | None                                                                                                                                                                     |
| 12  | `db/seed.mjs`                          | Seeds database with initial data          | `prisma`                                           | `main()`                                                                                                                                                                 |
| 13  | `server.mjs`                           | Fastify server, serves APIs/frontend      | `fastify`                                          | `startServer()`                                                                                                                                                          |
| 14  | `package.json`                         | Project metadata, dependencies            | `scripts`, `dependencies`                          | None                                                                                                                                                                     |
| 15  | `vite.config.js`                       | Vitest configuration                      | `test`                                             | None                                                                                                                                                                     |
| 16  | `.env`                                 | Environment variables                     | `PORT`, `JWT_SECRET`, `DATABASE_URL`               | None                                                                                                                                                                     |
| 17  | `.gitignore`                           | Excludes files from Git                   | None                                               | None                                                                                                                                                                     |
| 18  | `.eslintrc.json`                       | ESLint configuration                      | `rules`                                            | None                                                                                                                                                                     |
| 19  | `tests/unit/db.test.mjs`               | Tests database client                     | None                                               | Test cases for `initDb()`, `getDb()`                                                                                                                                     |
| 20  | `tests/unit/userService.test.mjs`      | Tests user service                        | `db`, `testUserId`                                 | Test cases for user service methods                                                                                                                                      |
| 21  | `tests/unit/activityService.test.mjs`  | Tests activity service                    | `db`, `testUserId`                                 | Test cases for activity service methods                                                                                                                                  |
| 22  | `tests/routes/auth.test.mjs`           | Tests auth routes                         | `fastify`                                          | Test cases for auth routes                                                                                                                                               |
| 23  | `tests/routes/users.test.mjs`          | Tests user routes                         | `fastify`, `adminToken`, `userToken`               | Test cases for user routes                                                                                                                                               |
| 24  | `tests/api.test.mjs`                   | API integration tests                     | `fastify`, `adminToken`, `userToken`, `testUserId` | Test cases for complete API flows                                                                                                                                        |
| 25  | `.github/workflows/ci.yml`             | CI/CD with PostgreSQL                     | `postgres`, `test`, `deploy` jobs                  | None                                                                                                                                                                     |
| 26  | `README.md`                            | Quick start, usage overview               | None                                               | None                                                                                                                                                                     |
| 27  | `LEARNING_GUIDE.md`                    | Step-by-step guide to build V3 from V2    | None                                               | None                                                                                                                                                                     |
| 28  | `DEVELOPER_REFERENCE.md`               | Technical reference for consistency       | None                                               | None                                                                                                                                                                     |

## File Details

Detailed information for each file, numbered for reference.

### 1. backend/data/db.mjs

- **Purpose**: Initializes Prisma client for database operations.
- **Key Variables**:
  - `prisma`: PrismaClient instance.
- **Key Methods**:
  - `initDb()`: Initializes Prisma client.
  - `getDb()`: Returns initialized client.
- **Connections**:
  - Imports: `@prisma/client`.
  - Used by: `userService.mjs`, `activityService.mjs`.
  - Connects to: PostgreSQL via `DATABASE_URL`.
- **Notes**: Maintains singleton pattern for Prisma client.

### 2. backend/routes/auth.mjs

- **Purpose**: Defines API routes for registration, login, logout, profile, password, settings.
- **Key Variables**: None.
- **Key Methods**:
  - `registerRoutes(fastify, options)`: Registers routes (`/register`, `/login`, `/logout`, `/profile`, `/password`, `/settings`).
- **Connections**:
  - Imports: `jwt`, `dotenv`, `userService.mjs`.
  - Used by: `server.mjs`.
- **Notes**: Delegates logic to service layer, focuses on HTTP concerns.

### 3. backend/routes/users.mjs

- **Purpose**: Defines admin API routes for user CRUD operations.
- **Key Variables**: None.
- **Key Methods**:
  - `registerUserRoutes(fastify, options)`: Registers `/users`, `/users/:id`, `/users/:id/active`, `/users/:id` (DELETE), `/logs`.
  - `verifyAdmin(token)`: Helper to verify admin role.
- **Connections**:
  - Imports: `jwt`, `dotenv`, `userService.mjs`, `activityService.mjs`.
  - Used by: `server.mjs`.
- **Notes**: Admin-only, verifies JWT `role: 'admin'`, includes CRUD operations.

### 4. backend/services/userService.mjs

- **Purpose**: Handles user-related business logic using Prisma ORM.
- **Key Variables**: None.
- **Key Methods**:
  - `registerUser(email, password)`: Registers new user.
  - `loginUser(email, password)`: Authenticates user.
  - `getUsers(filters)`: Gets users with filters.
  - `getUserById(userId)`: Gets user by ID.
  - `updateUserProfile(userId, profileData)`: Updates profile.
  - `updateUserSettings(userId, settingsData)`: Updates settings.
  - `changeUserPassword(userId, newPassword)`: Changes password.
  - `setUserActive(userId, isActive)`: Toggles active status.
  - `deleteUser(userId)`: Deletes user and related records.
- **Connections**:
  - Imports: `bcrypt`, `jwt`, `dotenv`, `db.mjs`, `activityService.mjs`.
  - **Used by**: `auth.mjs`, `users.mjs`.
  - **Notes**: Abstracts database logic, uses Prisma transactions where appropriate, handles relations between tables.

### 5. backend/services/activityService.mjs

- **Purpose**: Manages activity log creation and retrieval using Prisma ORM.
- **Key Variables**: None.
- **Key Methods**:
  - `logActivity(userId, action)`: Logs user action.
  - `getActivityLogs(filters)`: Retrieves logs with optional filters.
- **Connections**:
  - Imports: `db.mjs`.
  - Used by: `userService.mjs`, `auth.mjs`, `users.mjs`.
- **Notes**: Supports admin auditing, uses Prisma queries with relations.

### 6. frontend/css/styles.css

- **Purpose**: Custom styles for forms, buttons, animations.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: Classes like `.form-container`, `.btn-primary`, `.animate-pulse`.
- **Connections**:
  - Loaded by: `index.html`.
  - Served by: `server.mjs`.
- **Notes**: Complements Tailwind CSS, adds animations.

### 7. frontend/js/app.js

- **Purpose**: Manages SPA state, user/admin dashboards, CRUD operations.
- **Key Variables**: None.
- **Key Methods**:
  - `app()`: Alpine.js component with methods:
    - `init()`: Checks auth, loads dashboard.
    - `fetchUsers()`: Gets filtered users for admin.
    - `fetchLogs()`: Gets activity logs for admin.
    - `viewUser(userId)`: Shows user details.
    - `toggleUserActive(userId, isActive)`: Enables/disables users.
    - `deleteUser(userId)`: Deletes user after confirmation.
    - `logout()`: Logs out user.
- **Connections**:
  - Imports: None (uses global `axios`).
  - Loaded by: `index.html`.
- **Notes**: Handles admin dashboard with enhanced CRUD operations.

### 8. frontend/js/auth.js

- **Purpose**: Handles login/register with client-side validation.
- **Key Variables**: None.
- **Key Methods**:
  - `authComponent()`: Alpine.js component with `submit(action)`, `validate()`.
- **Connections**:
  - Imports: None (uses global `axios`).
  - Loaded by: `index.html`.
- **Notes**: Validates email/password, unchanged from V2.

### 9. frontend/js/profile.js

- **Purpose**: Manages profile/settings UI and API calls.
- **Key Variables**: None.
- **Key Methods**:
  - `profileComponent()`: Alpine.js component with `init()`, `saveProfile()`.
- **Connections**:
  - Imports: None (uses global `axios`).
  - Loaded by: `index.html`.
- **Notes**: Handles profile/settings updates, unchanged from V2.

### 10. frontend/index.html

- **Purpose**: SPA entry point, defines UI with Alpine.js.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: Loads scripts, defines UI components for:
  - Login/register form
  - User dashboard with profile editing
  - Admin dashboard with user management (search, view, toggle, delete)
  - Activity logs
  - Modal for user details
- **Connections**:
  - Served by: `server.mjs`.
- **Notes**: Enhanced with CRUD operations UI for admin.

### 11. db/schema.prisma

- **Purpose**: Defines database schema for Prisma ORM.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: Defines models for `User`, `Profile`, `Settings`, `ActivityLog` with relations.
- **Connections**:
  - Used by: Prisma client, migrations.
- **Notes**: Central schema definition for Prisma, connects to PostgreSQL via `DATABASE_URL`.

### 12. db/seed.mjs

- **Purpose**: Seeds database with initial data.
- **Key Variables**: None.
- **Key Methods**:
  - `main()`: Seeds admin user and sample users.
- **Connections**:
  - Imports: `@prisma/client`, `bcrypt`.
  - Used by: `npm run seed`.
- **Notes**: Creates admin user (`admin@example.com`/`admin123`) and sample users with profiles.

### 13. server.mjs

- **Purpose**: Fastify server, serves APIs and frontend.
- **Key Variables**:
  - `fastify`: Fastify instance.
  - `__dirname`: Directory path.
- **Key Methods**:
  - `startServer()`: Initializes server, registers routes.
- **Connections**:
  - Imports: `Fastify`, `@fastify/static`, `path`, `url`, `dotenv`, `auth.mjs`, `users.mjs`, `db.mjs`.
  - Serves: Frontend static files, API routes.
- **Notes**: Initializes Prisma client, configurable via `.env`.

### 14. package.json

- **Purpose**: Defines metadata, dependencies, scripts.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**:
  - Scripts: `start`, `lint`, `test`, `test:unit`, `test:routes`, `test:api`, `migrate`, `seed`.
  - Dependencies: `@prisma/client`, `bcrypt`, `dotenv`, `fastify`, etc.
  - DevDependencies: `eslint`, `vitest`, `prisma`, `supertest`.
  - Node Engine: `"node": "20.15.1"` for Render compatibility.
- **Connections**:
  - Used by: npm, Render.
- **Notes**: Added Prisma and Vitest scripts, removed Jest.

### 15. vite.config.js

- **Purpose**: Configures Vitest for testing.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: Sets test environment, file patterns.
- **Connections**:
  - Used by: `npm test`.
- **Notes**: Configured for ESM compatibility, faster test execution.

### 16. .env

- **Purpose**: Stores environment variables.
- **Key Variables**:
  - `PORT`: Server port.
  - `JWT_SECRET`: Secret for JWT signing.
  - `LOG_LEVEL`: Fastify logging level.
  - `NODE_ENV`: Environment (development, production).
  - `DATABASE_URL`: PostgreSQL connection string.
- **Key Methods**: None.
- **Connections**:
  - Read by: `server.mjs`, `auth.mjs`, `users.mjs`, Prisma.
- **Notes**: Added `DATABASE_URL` for PostgreSQL.

### 17. .gitignore

- **Purpose**: Excludes files from Git.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: Excludes `node_modules`, `.env`, `dev.db` (Prisma local DB).
- **Connections**:
  - Used by: Git.
- **Notes**: Updated to exclude Prisma-related files instead of SQLite.

### 18. .eslintrc.json

- **Purpose**: Configures ESLint for code consistency.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: Rules for indentation, quotes, semicolons.
- **Connections**:
  - Used by: `npm run lint`.
- **Notes**: Unchanged from V2.

### 19. tests/unit/db.test.mjs

- **Purpose**: Tests Prisma database client.
- **Key Variables**: None.
- **Key Methods**: None (Vitest test cases).
- **Content**: Tests for `initDb()`, `getDb()`.
- **Connections**:
  - Imports: `vitest`, `db.mjs`.
- **Notes**: Verifies Prisma client initialization.

### 20. tests/unit/userService.test.mjs

- **Purpose**: Unit tests for user service.
- **Key Variables**: None.
- **Key Methods**: None (Vitest test cases).
- **Content**: Tests for user registration, login, profile management, CRUD operations.
- **Connections**:
  - Imports: `vitest`, `userService.mjs`, `db.mjs`.
- **Notes**: Uses mock for `activityService.mjs`, tests service methods in isolation.

### 21. tests/unit/activityService.test.mjs

- **Purpose**: Unit tests for activity service.
- **Key Variables**: None.
- **Key Methods**: None (Vitest test cases).
- **Content**: Tests for logging activities, retrieving logs.
- **Connections**:
  - Imports: `vitest`, `activityService.mjs`, `userService.mjs`, `db.mjs`.
- **Notes**: Tests activity logging and filtering functionality.

### 22. tests/routes/auth.test.mjs

- **Purpose**: Tests auth routes with mocked services.
- **Key Variables**: None.
- **Key Methods**: None (Vitest test cases).
- **Content**: Tests for route handlers, request/response handling.
- **Connections**:
  - Imports: `vitest`, `Fastify`, `jwt`, `auth.mjs`, `userService.mjs`.
- **Notes**: Uses mock for `userService.mjs`, verifies route handlers.

### 23. tests/routes/users.test.mjs

- **Purpose**: Tests admin user routes with mocked services.
- **Key Variables**: None.
- **Key Methods**: None (Vitest test cases).
- **Content**: Tests for admin routes, authorization, CRUD operations.
- **Connections**:
  - Imports: `vitest`, `Fastify`, `jwt`, `users.mjs`, `userService.mjs`, `activityService.mjs`.
- **Notes**: Uses mocks for services, verifies admin authorization.

### 24. tests/api.test.mjs

- **Purpose**: API integration tests with Supertest.
- **Key Variables**: None.
- **Key Methods**: None (Vitest test cases).
- **Content**: Tests for complete API flows (register, login, profile, admin).
- **Connections**:
  - Imports: `vitest`, `supertest`, `Fastify`, `bcrypt`, `jwt`, `auth.mjs`, `users.mjs`, `db.mjs`.
- **Notes**: Tests end-to-end flows with actual PostgreSQL database.

### 25. .github/workflows/ci.yml

- **Purpose**: Defines CI/CD pipeline with PostgreSQL support.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**:
  - Sets up PostgreSQL service for testing
  - Runs `npm install`, `npm run lint`
  - Generates Prisma client
  - Runs migrations
  - Executes unit, route, and API tests
  - Deploys to Render
- **Connections**:
  - Used by: GitHub Actions.
- **Notes**: Added PostgreSQL service, migration, and Prisma steps.

### 26. README.md

- **Purpose**: Quick start, usage, overview.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: Setup, features, testing, deployment with PostgreSQL.
- **Connections**:
  - Rendered on: GitHub.
- **Notes**: Updated for V3 with PostgreSQL and Prisma.

### 27. LEARNING_GUIDE.md

- **Purpose**: Step-by-step guide to build V3 from V2.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: Instructions for replacing SQLite with PostgreSQL, implementing Prisma, migrations, seeding, testing.
- **Connections**:
  - Linked from: `README.md`.
- **Notes**: Comprehensive guide with code examples, explanations, testing approaches.

### 28. DEVELOPER_REFERENCE.md

- **Purpose**: Technical reference for consistency.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: Architecture, schema, APIs, guidelines for V3.
- **Connections**:
  - Linked from: `README.md`.
- **Notes**: Updated from V2 to reflect V3 changes.

## API Reference

Documented endpoints for testing AuthMini V3 APIs.

### 1. POST /api/register

- **Description**: Registers a new user.
- **Request**:
  - **Method**: POST
  - **URL**: `/api/register`
  - **Headers**: `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "user123"
    }
    ```
- **Response**:
  - **Success** (201): `{ "message": "User registered" }`
  - **Error** (400): `{ "error": "Email already exists" }`
- **Notes**: Logs "User registered."

### 2. POST /api/login

- **Description**: Authenticates user, returns JWT.
- **Request**:
  - **Method**: POST
  - **URL**: `/api/login`
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
      "user": { "id": 1, "email": "user@example.com", "role": "user" }
    }
    ```
  - **Error** (401): `{ "error": "Invalid credentials or account disabled" }`
- **Notes**: Logs "User logged in."

### 3. POST /api/logout

- **Description**: Logs out user (client-side).
- **Request**:
  - **Method**: POST
  - **URL**: `/api/logout`
  - **Headers**: None
  - **Body**: None
- **Response**:
  - **Success** (200): `{ "message": "Logged out" }`
- **Notes**: Clears `localStorage` token.

### 4. POST /api/profile

- **Description**: Updates user profile.
- **Request**:
  - **Method**: POST
  - **URL**: `/api/profile`
  - **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "displayName": "User",
      "bio": "Bio",
      "avatarUrl": ""
    }
    ```
- **Response**:
  - **Success** (200): `{ "message": "Profile updated" }`
  - **Error** (401): `{ "error": "Invalid token" }`
- **Notes**: Logs "Profile updated."

### 5. POST /api/password

- **Description**: Changes user password.
- **Request**:
  - **Method**: POST
  - **URL**: `/api/password`
  - **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "newPassword": "newpass123"
    }
    ```
- **Response**:
  - **Success** (200): `{ "message": "Password updated" }`
  - **Error** (401): `{ "error": "Invalid token" }`
- **Notes**: Logs "Password changed."

### 6. POST /api/settings

- **Description**: Updates user settings.
- **Request**:
  - **Method**: POST
  - **URL**: `/api/settings`
  - **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "theme": "dark",
      "notifications": false
    }
    ```
- **Response**:
  - **Success** (200): `{ "message": "Settings updated" }`
  - **Error** (401): `{ "error": "Invalid token" }`
- **Notes**: Logs "Settings updated."

### 7. GET /api/users

- **Description**: Lists users with optional filtering (admin only).
- **Request**:
  - **Method**: GET
  - **URL**: `/api/users?search=<query>&active=<true/false>`
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
          "role": "admin",
          "createdAt": "2025-04-28T10:00:00Z",
          "is_active": true,
          "profile": {
            "displayName": "Admin User",
            "bio": "System administrator"
          }
        }
      ]
    }
    ```
  - **Error** (401/403): `{ "error": "No token provided" }` or `{ "error": "Admin access required" }`
- **Notes**: Supports search and active status filtering, includes profile information.

### 8. GET /api/users/:id

- **Description**: Gets user by ID with profile (admin only).
- **Request**:
  - **Method**: GET
  - **URL**: `/api/users/2`
  - **Headers**: `Authorization: Bearer <admin_token>`
  - **Body**: None
- **Response**:
  - **Success** (200):
    ```json
    {
      "user": {
        "id": 2,
        "email": "user@example.com",
        "role": "user",
        "createdAt": "2025-04-28T10:00:00Z",
        "is_active": true,
        "profile": {
          "displayName": "Test User",
          "bio": "Regular user"
        },
        "settings": {
          "theme": "light",
          "notifications": true
        }
      }
    }
    ```
  - **Error** (401/403/404): Appropriate error messages.
- **Notes**: Includes profile and settings data.

### 9. PATCH /api/users/:id/active

- **Description**: Updates user active status (admin only).
- **Request**:
  - **Method**: PATCH
  - **URL**: `/api/users/2/active`
  - **Headers**: `Authorization: Bearer <admin_token>`, `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "isActive": false
    }
    ```
- **Response**:
  - **Success** (200):
    ```json
    {
      "message": "User disabled",
      "user": {
        "id": 2,
        "is_active": false
      }
    }
    ```
  - **Error** (401/403/404): Appropriate error messages.
- **Notes**: Logs "User enabled/disabled."

### 10. DELETE /api/users/:id

- **Description**: Deletes a user (admin only).
- **Request**:
  - **Method**: DELETE
  - **URL**: `/api/users/2`
  - **Headers**: `Authorization: Bearer <admin_token>`
  - **Body**: None
- **Response**:
  - **Success** (200): `{ "message": "User with ID 2 deleted successfully" }`
  - **Error** (401/403/404): Appropriate error messages.
- **Notes**: Deletes user and all related records (profile, settings, logs).

### 11. GET /api/logs

- **Description**: Gets activity logs with filters (admin only).
- **Request**:
  - **Method**: GET
  - **URL**: `/api/logs?userId=<id>&startDate=<date>`
  - **Headers**: `Authorization: Bearer <admin_token>`
  - **Body**: None
- **Response**:
  - **Success** (200):
    ```json
    {
      "logs": [
        {
          "id": 1,
          "userId": 2,
          "action": "User logged in",
          "createdAt": "2025-04-28T10:30:00Z",
          "user": {
            "email": "user@example.com"
          }
        }
      ]
    }
    ```
  - **Error** (401/403): Appropriate error messages.
- **Notes**: Supports filtering by userId and startDate.

## Testing Guidelines

AuthMini V3 implements a comprehensive testing strategy with unit, routes, and API integration tests.

### 1. Unit Tests

- **Purpose**: Test individual components in isolation.
- **Files**: `tests/unit/*.test.mjs`
- **Command**: `npm run test:unit`
- **Components Tested**:
  - `db.mjs`: Prisma client initialization.
  - `userService.mjs`: User CRUD operations with mocked dependencies.
  - `activityService.mjs`: Activity logging with real database.
- **Example** (`tests/unit/userService.test.mjs`):

```javascript
it('should register a new user', async () => {
  const result = await registerUser('new-user@example.com', 'password123');
  expect(result.id).toBeDefined();
  expect(logActivity).toHaveBeenCalled();

  // Clean up
  await db.user.delete({ where: { id: result.id } });
});
```

### 2. Route Tests

- **Purpose**: Test route handlers with mocked services.
- **Files**: `tests/routes/*.test.mjs`
- **Command**: `npm run test:routes`
- **Components Tested**:
  - `auth.mjs`: Authentication routes with mocked services.
  - `users.mjs`: Admin routes with mocked services.
- **Example** (`tests/routes/auth.test.mjs`):

```javascript
it('POST /api/register should register a user', async () => {
  const response = await fastify.inject({
    method: 'POST',
    url: '/api/register',
    payload: { email: 'test@example.com', password: 'password123' },
  });

  expect(response.statusCode).toBe(201);
  expect(JSON.parse(response.body)).toEqual({ message: 'User registered' });
  expect(userService.registerUser).toHaveBeenCalledWith(
    'test@example.com',
    'password123'
  );
});
```

### 3. API Integration Tests

- **Purpose**: Test complete API flows with actual database.
- **Files**: `tests/api.test.mjs`
- **Command**: `npm run test:api`
- **Flows Tested**:
  - Authentication Flow: Register, login, me endpoint.
  - User Management Flow: Profile, settings, password updates.
  - Admin Operations: List, view, toggle, delete users, view logs.
- **Example** (`tests/api.test.mjs`):

```javascript
it('should register a new user', async () => {
  const response = await supertest(fastify.server)
    .post('/api/register')
    .send({ email: testEmail, password: testPassword });

  expect(response.statusCode).toBe(201);
  expect(response.body).toEqual({ message: 'User registered' });

  // Get user ID for cleanup
  const db = getDb();
  const user = await db.user.findUnique({ where: { email: testEmail } });
  testUserId = user?.id;
});
```

### 4. Running All Tests

- **Command**: `npm test`
- **Output**: Runs all unit, route, and API tests.
- **Configuration**: Defined in `vite.config.js`.
- **Notes**: Tests use Vitest instead of Jest for better ESM compatibility.

### 5. Testing Best Practices

- **Isolation**: Unit tests mock dependencies to test components in isolation.
- **Fixtures**: Before/after hooks set up and clean test data.
- **Cleaning**: Tests clean up after themselves to avoid test pollution.
- **Coverage**: Tests cover happy paths and error cases.
- **Verbose Logging**: Tests include console logging for debugging.

### 6. Manual Testing

- **Frontend**: Test registration, login, profile/settings, admin dashboard.
- **API Testing**: Use Postman to test APIs directly.
- **Database**: Use Prisma Studio (`npm run prisma:studio`) to inspect data.

## Code Style Guide

Standards for consistent, maintainable code, enforced by ESLint.

### General

- **Language**: JavaScript with ES Modules (ESM).
- **File Extensions**: `.mjs` (backend/tests), `.js` (frontend).
- **Encoding**: UTF-8.
- **Indentation**: 2 spaces, no tabs.
- **Line Length**: Max 100 characters.
- **Semicolons**: Always use.
- **Quotes**: Single quotes (`'`) for strings.
- **Comments**: JSDoc for modules/functions, inline for logic.

### Naming Conventions

- **Files**: Lowercase, kebab-case (e.g., `user-service.mjs`).
- **Variables/Functions**: camelCase (e.g., `updateProfile`).
- **Constants**: UPPER_SNAKE_CASE (e.g., `JWT_SECRET`).
- **Modules**: Match file name (e.g., `userService.mjs` → `@module services/userService`).

### JavaScript (ESM)

- **Imports**: Named, explicit.
  - Example: `import { getDb } from '../data/db.mjs';`
- **Exports**: Named exports.
  - Example: `export function logActivity() { ... }`
- **Async/Await**: Preferred over Promises.
- **Error Handling**: Try-catch, descriptive errors.

### Prisma

- **Schema**: Defined in `schema.prisma`, using Prisma syntax.
- **Client**: Singleton pattern in `db.mjs`.
- **Queries**: Use Prisma client methods.
  ```javascript
  const user = await db.user.findUnique({
    where: { email },
    include: { profile: true },
  });
  ```
- **Relations**: Use Prisma's relation queries.
  ```javascript
  const profile = await db.profile.upsert({
    where: { userId },
    update: profileData,
    create: { userId, ...profileData },
  });
  ```

### Fastify (Backend)

- **Route Registration**:
  ```javascript
  export async function registerRoutes(fastify, options) {
    fastify.post('/path', async (request, reply) => { ... });
  }
  ```
- **Service Layer**:
  ```javascript
  import { updateUserProfile } from '../services/userService.mjs';
  ```

### Alpine.js (Frontend)

- **Components**:
  ```javascript
  function profileComponent() {
    return { profile: {}, saveProfile() { ... } };
  }
  window.profileComponent = profileComponent;
  ```
- **Bindings**: `x-data`, `x-model`, `@click`, `x-show`.

### CSS

- **Tailwind CSS**: Primary styling.
- **Custom CSS**: In `styles.css`, kebab-case, animations.
  ```css
  .btn-primary {
    background-color: #4b5563;
    transition: transform 0.2s ease;
  }
  ```

### Testing (Vitest)

- **Test Structure**: `describe`, `it`, `expect`.
  ```javascript
  describe('User Service', () => {
    it('should register a new user', async () => {
      expect(result.id).toBeDefined();
    });
  });
  ```
- **Mocking**: `vi.mock()`, `vi.fn()`.
  ```javascript
  vi.mock('../../backend/services/activityService.mjs', () => ({
    logActivity: vi.fn().mockResolvedValue({}),
  }));
  ```
- **Lifecycle Hooks**: `beforeAll`, `afterAll`.
  ```javascript
  beforeAll(async () => {
    db = initDb();
    // Setup test data
  });
  ```

### Error Handling

- **Backend**: HTTP codes, `{ error: 'message' }`.
- **Frontend**: `x-text="error"`.
- **Logging**: `fastify.log` (backend), `console.log` (frontend).

## Deployment and CI/CD

### Deployment

- **Platform**: Render (free tier).
- **Services**:
  1. **PostgreSQL Database**:
     - Create PostgreSQL service on Render.
     - Note connection string for `DATABASE_URL`.
  2. **Web Service**:
     - Link GitHub repository.
     - Runtime: Node.js.
     - Build Command: `npm install && npx prisma generate`.
     - Start Command: `npm run migrate && npm run seed && npm start`.
     - Environment Variables:
       - `PORT`: Blank (Render assigns).
       - `NODE_ENV`: `production`.
       - `JWT_SECRET`: Generate with `openssl rand -base64 32`.
       - `DATABASE_URL`: Paste connection string from PostgreSQL service.
- **Notes**: PostgreSQL ensures data persistence across deployments.

### CI/CD

- **Tool**: GitHub Actions.
- **Configuration**: `.github/workflows/ci.yml`.
- **Workflow**:
  - **Setup**: Node.js 20.15.1, PostgreSQL 13 service.
  - **Build**: `npm install`.
  - **Lint**: `npm run lint`.
  - **Database**: Generate Prisma client, run migrations.
  - **Test**: Run unit, route, API tests.
  - **Deploy**: Trigger Render deployment.
- **Notes**: Tests run against PostgreSQL in CI environment.

## LLM Guidelines

LLMs must generate consistent AuthMini V3 code using this document.

1. **Adhere to Code Style**:
   - ESM, single quotes, 2-space indentation, semicolons, JSDoc.
2. **Use Templates**:

   - **Fastify Route**:

     ```javascript
     /**
      * [Route description].
      * @module routes/[name]
      */
     import jwt from 'jsonwebtoken';
     import { config } from 'dotenv';
     import { serviceMethod } from '../services/[name].mjs';

     config();

     export async function registerRoutes(fastify, options) {
       fastify.post('/[path]', async (request, reply) => {
         try {
           const result = await serviceMethod(data);
           reply.send({ message: 'Success' });
         } catch (err) {
           reply.code(400).send({ error: err.message });
         }
       });
     }
     ```

   - **Service with Prisma**:

     ```javascript
     /**
      * [Service description].
      * @module services/[name]
      */
     import { getDb } from '../data/db.mjs';

     /**
      * [Method description].
      * @param {[type]} arg - [description].
      * @returns {Promise<[type]>} [description].
      * @throws {Error} If [condition].
      * @async
      */
     export async function methodName(arg) {
       const db = getDb();

       try {
         const result = await db.[model].[operation]({
           where: { /* conditions */ },
           data: { /* data */ },
           include: { /* relations */ },
         });

         return result;
       } catch (err) {
         throw new Error(`Operation failed: ${err.message}`);
       }
     }
     ```

   - **Vitest Test**:

     ```javascript
     /**
      * [Test description].
      * @module tests/[type]/[name]
      */
     import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
     import { methodToTest } from '../../backend/services/[name].mjs';

     describe('[Component] Tests', () => {
       beforeAll(() => {
         // Setup
       });

       afterAll(() => {
         // Cleanup
       });

       it('should [expected behavior]', async () => {
         // Arrange
         const input = {
           /* test data */
         };

         // Act
         const result = await methodToTest(input);

         // Assert
         expect(result).toEqual(/* expected output */);
       });
     });
     ```

3. **Use Prisma Patterns**:

   - Initialize client: `const db = getDb();`
   - Queries: Use `findUnique`, `findMany`, `create`, `update`, `upsert`, `delete`
   - Relations: Use `include` to fetch related data
   - Transactions: Use `$transaction` for multiple operations
   - Error handling: Check for Prisma error codes (e.g., `P2025` for not found)

4. **Testing Strategies**:

   - Unit tests: Mock dependencies, test in isolation
   - Route tests: Mock services, test HTTP handling
   - API tests: Test complete flows with real database
   - Use `beforeAll`/`afterAll` for setup/cleanup
   - Clean up test data to avoid pollution

5. **Match File Structure**:

   - Generate for specified files (e.g., `userService.mjs`)
   - Follow V3 project structure with Prisma files, tests

6. **Validate Output**:

   - Check ESLint rules, JSDoc, service layer usage
   - Ensure Prisma patterns are followed correctly

7. **Context**:
   - Use this document as sole context
   - Generate one file at a time
   - Refer to related files when necessary

## Notes

- Ensures consistent, maintainable code for AuthMini V3
- Addresses SQLite persistence issues from V2
- Implements production-ready database practices
- Demonstrates comprehensive testing approach
- Report issues at [https://github.com/voilacode/authmini](https://github.com/voilacode/authmini)

## License

MIT
