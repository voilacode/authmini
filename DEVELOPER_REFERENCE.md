# Developer Reference for AuthMini V2

**Version**: 2.0  
**Application**: AuthMini V2  
**Repository**: [https://github.com/voilacode/authmini/tree/v2](https://github.com/voilacode/authmini/tree/v2)  
**Purpose**: This document serves as a definitive technical guide for developers and LLMs, ensuring consistent, maintainable code for AuthMini V2, an advanced full-stack authentication app built on V1. It emphasizes **service layer architecture**, **basic testing**, **CI/CD deployment**, and **enhanced UX**, providing detailed insights into project structure, user roles, user flows, database schema, API specifications, system architecture, file details, testing protocols, coding standards, and LLM code generation guidelines. Optimized for developers extending the app and LLMs producing uniform code within constrained context windows, it supports scalable learning and development.

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
  - [1. backend/data/db.mjs](#1-backenddatadb.mjs)
  - [2. backend/routes/auth.mjs](#2-backendroutesauth.mjs)
  - [3. backend/routes/users.mjs](#3-backendroutesusers.mjs)
  - [4. backend/services/userService.mjs](#4-backendservicesuserservice.mjs)
  - [5. backend/services/activityService.mjs](#5-backendservicesactivityservice.mjs)
  - [6. frontend/css/styles.css](#6-frontendcssstyles.css)
  - [7. frontend/js/app.js](#7-frontendjsapp.js)
  - [8. frontend/js/auth.js](#8-frontendjsauth.js)
  - [9. frontend/js/profile.js](#9-frontendjsprofile.js)
  - [10. frontend/index.html](#10-frontendindex.html)
  - [11. server.mjs](#11-server.mjs)
  - [12. package.json](#12-package.json)
  - [13. .env](#13-.env)
  - [14. .gitignore](#14-.gitignore)
  - [15. .eslintrc.json](#15-.eslintrc.json)
  - [16. tests/api.test.mjs](#16-testsapitest.mjs)
  - [17. .github/workflows/ci.yml](#17-.githubworkflowsci.yml)
  - [18. README.md](#18-readme.md)
  - [19. LEARNING_GUIDE.md](#19-learning_guidemd)
  - [20. DEVELOPER_REFERENCE.md](#20-developer_referencemd)
- [API Reference](#api-reference)
- [Testing Guidelines](#testing-guidelines)
- [Code Style Guide](#code-style-guide)
- [Deployment and CI/CD](#deployment-and-cicd)
- [LLM Guidelines](#llm-guidelines)
- [Notes](#notes)
- [License](#license)

## Project Introduction

AuthMini V2 is an enhanced full-stack authentication application that builds on V1, designed as an educational tool to teach intermediate web development concepts. It extends V1’s core authentication features (registration, login, logout, admin user listing) with **profile management**, **enhanced admin capabilities**, **improved UX**, **service layer architecture**, **basic testing**, and **CI/CD deployment**. Built with **Fastify** (backend), **Alpine.js** (frontend), **SQLite** (database), and **ES Modules (ESM)**, it maintains a single-server setup hosted at [https://github.com/voilacode/authmini/tree/v2](https://github.com/voilacode/authmini/tree/v2) under the MIT license. AuthMini V2 serves as a stepping stone for learning professional coding practices, testing, and deployment, preparing developers for scalable systems like AuthCloud.

### What is AuthMini V2?

AuthMini V2 is a robust, self-contained web application demonstrating an advanced authentication system. It allows users to register, log in, view/edit profiles, change passwords, and manage settings (e.g., theme preference), while admins can search/filter users, enable/disable accounts, and view activity logs. The app uses a single Fastify server to handle API endpoints (`/api/*`) and a frontend single-page application (SPA) at `/`. Its **20-file structure** (15 from V1 plus 5 new files, including `LEARNING_GUIDE.md`) and additional dependencies (ESLint, Jest, Supertest) balance complexity with accessibility, making it ideal for intermediate learners, developers prototyping features, and LLMs generating consistent code.

### How is AuthMini V2 Used?

AuthMini V2 is used as:

- **A Learning Resource**: Intermediate developers learn service layers, testing (Jest), deployment (Render), CI/CD (GitHub Actions), and UX enhancements (form validation, animations) by studying and extending the code.
- **A Reference Implementation**: It showcases advanced authentication patterns (e.g., service-based logic, JWT authentication, role-based access) adaptable to larger projects.
- **A Development Sandbox**: Developers can add features (e.g., email notifications, multi-factor authentication) or experiment with testing/deployment, using this document for consistency.
- **An LLM Code Generation Template**: LLMs use this document’s guidelines to generate V2-compatible code, ensuring uniform style and functionality.

To use AuthMini V2, developers clone the repository (`v2` branch), install dependencies, configure `.env`, and run the server (`npm start`). They interact via the browser (`http://localhost:3000`) or test APIs with Postman. Automated tests (`npm test`) and linting (`npm run lint`) ensure code quality, while CI/CD automates deployment to a cloud platform (e.g., Render). This document, `README.md`, and `LEARNING_GUIDE.md` guide setup, usage, and extension.

### Why is AuthMini V2 Designed This Way?

AuthMini V2’s design prioritizes:

- **Incremental Learning**: Builds on V1’s simplicity, adding service layers, testing, and deployment to teach professional practices without overwhelming complexity.
- **Moderate Dependencies**: Adds `eslint`, `jest`, `supertest`, and `axios` to V1’s six backend dependencies, keeping the project manageable while introducing testing and linting.
- **Professional Practices**: Introduces **ESLint** for code consistency, **JSDoc** for documentation, **Jest/Supertest** for testing, and **GitHub Actions** for CI/CD, mimicking real-world workflows.
- **Enhanced Features**: Profile management, admin search/disable, and UX improvements (validation, animations) demonstrate practical authentication patterns.
- **Service Layer**: Separates business logic from routes, improving scalability and testability.
- **Portability**: SQLite and single `PORT` configuration ensure easy local setup.
- **Open Source Extensibility**: MIT license and GitHub hosting (`v2` branch) encourage contributions.

This design balances educational value with real-world applicability, making AuthMini V2 ideal for learning, prototyping, and teaching.

## User Roles and Permissions

AuthMini V2 defines two user roles with expanded permissions and access levels, stored in the `users` table (`role` column).

| Role      | Description                                                            | Permissions                                                                                                                                                                                         | Access                                                                                                                                                                                                                                         |
| --------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **User**  | Standard user, default for new registrants.                            | - Register with email/password.<br>- Login to access dashboard.<br>- View/edit profile (display name, bio, avatar).<br>- Change password.<br>- Manage settings (theme, notifications).<br>- Logout. | - `/`: Login/register form.<br>- `/` (post-login): User dashboard (email, profile, settings, logout).<br>- APIs: `POST /api/register`, `POST /api/login`, `POST /api/logout`, `POST /api/profile`, `POST /api/password`, `POST /api/settings`. |
| **Admin** | Privileged user, seeded as `admin@example.com` (password: `admin123`). | - All **User** permissions.<br>- View/search/filter users (emails, roles, join dates, active status).<br>- Enable/disable user accounts.<br>- View activity logs.                                   | - `/`: Login form.<br>- `/` (post-login): Admin dashboard (user list, search, toggle active, logs, logout).<br>- APIs: All **User** APIs, `GET /api/users`, `POST /api/users/:id/toggle`.                                                      |

### Notes

- **Authentication**: JWTs stored in `localStorage` manage sessions.
- **Authorization**: Admin access to `/api/users` and `/api/users/:id/toggle` requires a JWT with `role: 'admin'`, verified in `backend/routes/users.mjs`.
- **Security**: Passwords hashed with `bcrypt`; `JWT_SECRET` in `.env` secures tokens; activity logs track actions.

## User Flows

Key user interactions in AuthMini V2, extending V1 flows with new features.

### 1. User Registration

- **Steps**:
  1. User visits `http://localhost:3000`, sees login/register form (`frontend/index.html`) with validation.
  2. Enters `email` (e.g., `user@example.com`) and `password` (e.g., `user123`, 6+ characters).
  3. Clicks “Register” → `frontend/js/auth.js` validates inputs (email format, password length), sends `POST /api/register` via Axios.
  4. `backend/routes/auth.mjs` calls `userService.getUserByEmail`, hashes password (`bcrypt`), inserts user into `users` table via `backend/data/db.mjs`.
  5. `activityService.logActivity` logs “User registered.”
  6. Returns `201` with `{ message: 'User registered' }`.
  7. UI shows “Registration successful,” prompts login.
- **Outcome**: New user in `users` table (`role: 'user'`), activity logged.

### 2. User Login and Dashboard

- **Steps**:
  1. User enters `email` and `password` in login form with validation.
  2. Clicks “Login” → `frontend/js/auth.js` sends `POST /api/login`.
  3. `backend/routes/auth.mjs` verifies credentials via `userService.getUserByEmail`, checks `is_active`, generates JWT (`jsonwebtoken`).
  4. `activityService.logActivity` logs “User logged in.”
  5. Returns `200` with `{ token, user: { email, role } }`.
  6. `frontend/js/app.js` stores token in `localStorage`, shows dashboard (email, profile edit, settings, logout).
- **Outcome**: User accesses dashboard with profile/settings UI.

### 3. User Profile and Settings Management

- **Steps**:
  1. User clicks “Edit Profile” on dashboard.
  2. `frontend/js/profile.js` loads profile/settings form (`display_name`, `bio`, `avatar_url`, `theme`, `notifications`).
  3. User updates fields, clicks “Save” → `frontend/js/profile.js` sends `POST /api/profile`, `POST /api/settings`, and optionally `POST /api/password`.
  4. `backend/routes/auth.mjs` verifies JWT, calls `userService.updateUserProfile`, `userService.updateUserSettings`, or `userService.changeUserPassword`.
  5. `activityService.logActivity` logs actions (e.g., “Profile updated”).
  6. Returns `200` with `{ message: 'Profile updated' }` (or similar).
  7. UI shows success message, applies settings (e.g., theme).
- **Outcome**: Profile/settings updated, actions logged.

### 4. Admin Login and User Management

- **Steps**:
  1. Admin enters `admin@example.com` and `admin123` in login form.
  2. Clicks “Login” → `frontend/js/auth.js` sends `POST /api/login`.
  3. `backend/routes/auth.mjs` verifies, returns JWT with `role: 'admin'`.
  4. `frontend/js/app.js` stores token, calls `GET /api/users` with search query (e.g., `?search=user`).
  5. `backend/routes/users.mjs` verifies admin token, queries `users` table with filters.
  6. Returns `200` with `{ users: [{ id, email, role, created_at, is_active }, ...] }`.
  7. Admin toggles user status → `frontend/js/app.js` sends `POST /api/users/:id/toggle`.
  8. `backend/routes/users.mjs` calls `userService.toggleUserActive`, logs via `activityService.logActivity`.
  9. UI shows updated user list.
- **Outcome**: Admin manages users, views logs.

### 5. Logout

- **Steps**:
  1. User/admin clicks “Logout” on dashboard.
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

- Diagrams will illustrate UI transitions, API calls, service layer interactions, and database updates.
- To be hosted in the repository (e.g., `/docs/diagrams/`).

## Database Schema and Design

AuthMini V2 uses a single SQLite database (`db/authmini.db`) with four tables: `users`, `profiles`, `settings`, and `activity_logs`.

### Schema

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profiles (
  user_id INTEGER PRIMARY KEY,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE settings (
  user_id INTEGER PRIMARY KEY,
  theme TEXT DEFAULT 'light',
  notifications BOOLEAN DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE activity_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  action TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Column Details

#### users

| Column          | Type      | Constraints                | Description                            |
| --------------- | --------- | -------------------------- | -------------------------------------- |
| `id`            | INTEGER   | PRIMARY KEY, AUTOINCREMENT | Unique user identifier.                |
| `email`         | TEXT      | NOT NULL, UNIQUE           | User’s email, used for login.          |
| `password_hash` | TEXT      | NOT NULL                   | Hashed password (bcrypt).              |
| `role`          | TEXT      | NOT NULL, DEFAULT 'user'   | User role (`user` or `admin`).         |
| `is_active`     | BOOLEAN   | DEFAULT 1                  | Account status (1=active, 0=disabled). |
| `created_at`    | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP  | Account creation time.                 |

#### profiles

| Column         | Type    | Constraints              | Description             |
| -------------- | ------- | ------------------------ | ----------------------- |
| `user_id`      | INTEGER | PRIMARY KEY, FOREIGN KEY | References `users(id)`. |
| `display_name` | TEXT    |                          | User’s display name.    |
| `bio`          | TEXT    |                          | User’s bio.             |
| `avatar_url`   | TEXT    |                          | URL to user’s avatar.   |

#### settings

| Column          | Type    | Constraints              | Description                     |
| --------------- | ------- | ------------------------ | ------------------------------- |
| `user_id`       | INTEGER | PRIMARY KEY, FOREIGN KEY | References `users(id)`.         |
| `theme`         | TEXT    | DEFAULT 'light'          | UI theme (`light` or `dark`).   |
| `notifications` | BOOLEAN | DEFAULT 1                | Notification preference (1=on). |

#### activity_logs

| Column       | Type      | Constraints                | Description                                  |
| ------------ | --------- | -------------------------- | -------------------------------------------- |
| `id`         | INTEGER   | PRIMARY KEY, AUTOINCREMENT | Unique log identifier.                       |
| `user_id`    | INTEGER   | FOREIGN KEY                | References `users(id)`.                      |
| `action`     | TEXT      | NOT NULL                   | Action description (e.g., “User logged in”). |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP  | Log creation time.                           |

### Design Choices

- **Multiple Tables**: Four tables support expanded features (profiles, settings, logs) while keeping the schema simple for learning.
- **SQLite**: Retained for portability and ease of setup, ideal for educational projects.
- **Constraints**:
  - `users`: `NOT NULL`, `UNIQUE` on `email`; `is_active` for enable/disable.
  - `profiles`, `settings`: `user_id` as primary key and foreign key ensures one-to-one mapping with `users`.
  - `activity_logs`: Foreign key links to `users`, allows auditing.
- **Security**: Passwords hashed with `bcrypt`; prepared statements prevent SQL injection.
- **Seeding**: Admin user (`admin@example.com`, `admin123`) seeded in `backend/data/db.mjs`.
- **Scalability**: Service layer (`userService.mjs`, `activityService.mjs`) abstracts database logic for maintainability.

### Usage

- **Initialization**: `backend/data/db.mjs` creates tables and seeds admin user on first run.
- **Queries**:
  - **Insert**: `INSERT INTO users/profiles/settings/activity_logs` for registration, profile updates, settings, logs.
  - **Select**: `SELECT * FROM users WHERE email = ?` (login), `SELECT * FROM profiles WHERE user_id = ?` (profile).
  - **Update**: `UPDATE users SET is_active = ?` (toggle status).
- **Storage**: `db/authmini.db` in `authmini/db/` (excluded by `.gitignore`).

## System Architecture

AuthMini V2 retains V1’s single-server architecture, enhanced with a service layer, testing, and CI/CD.

- **Design**:
  - **Single Server**: `server.mjs` (Fastify) handles API routes (`/api/*`) and serves frontend SPA (`/`).
  - **Backend**: Fastify with SQLite, JWT for authentication, bcrypt for hashing, service layer (`userService.mjs`, `activityService.mjs`) for business logic.
  - **Frontend**: Alpine.js SPA with Tailwind CSS (CDN) for styling, Axios for API requests, custom animations in `styles.css`.
  - **Database**: SQLite with `users`, `profiles`, `settings`, `activity_logs` tables.
  - **Testing**: Jest and Supertest for API integration tests (`tests/api.test.mjs`).
  - **CI/CD**: GitHub Actions for linting, testing, and deployment to Render.
- **Dependencies**:
  - Backend: `better-sqlite3`, `bcrypt`, `dotenv`, `fastify`, `@fastify/static`, `jsonwebtoken`, `axios`.
  - Frontend: Alpine.js (CDN), Axios (CDN), Tailwind CSS (CDN).
  - Dev: `eslint`, `jest`, `supertest`.
- **Data Flow**:
  1. Browser requests `http://localhost:3000` → `server.mjs` serves `frontend/index.html`.
  2. `index.html` loads `styles.css`, `app.js`, `auth.js`, `profile.js`, Alpine.js, Axios.
  3. `app.js` checks token, fetches `/api/users` (admin).
  4. `auth.js` handles `/api/register`, `/api/login`.
  5. `profile.js` manages `/api/profile`, `/api/settings`, `/api/password`.
  6. `server.mjs` routes API requests to `auth.mjs` or `users.mjs`.
  7. Routes call services (`userService.mjs`, `activityService.mjs`), which query SQLite via `db.mjs`.
  8. Responses update UI via Alpine.js.

## Project Folder and File Structure

AuthMini V2 consists of **20 files** (15 from V1, 5 new/modified, including `LEARNING_GUIDE.md`). Below is the directory tree with numbered files for tracking:

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
├── frontend/
│   ├── css/
│   │   └── [6] styles.css
│   ├── js/
│   │   ├── [7] app.js
│   │   ├── [8] auth.js
│   │   └── [9] profile.js
│   └── [10] index.html
├── tests/
│   └── [16] api.test.mjs
├── [11] server.mjs
├── [12] package.json
├── [13] .env
├── [14] .gitignore
├── [15] .eslintrc.json
├── .github/
│   └── workflows/
│       └── [17] ci.yml
├── [18] README.md
├── [19] LEARNING_GUIDE.md
├── [20] DEVELOPER_REFERENCE.md
```

- **File Count**: 20.
- **Notes**:
  - `db/` stores `authmini.db` (created at runtime).
  - `.gitignore` excludes `node_modules`, `.env`, `db/authmini.db`, `.eslintrc.json`, `.github/workflows/ci.yml`.

## File Snapshot

The table summarizes all 20 files, numbered for tracking.

| #   | File                                   | Purpose                                   | Key Variables                     | Key Methods                               |
| --- | -------------------------------------- | ----------------------------------------- | --------------------------------- | ----------------------------------------- |
| 1   | `backend/data/db.mjs`                  | Manages SQLite database, seeds admin user | `db`, `__dirname`                 | `initDb()`, `getDb()`                     |
| 2   | `backend/routes/auth.mjs`              | Defines auth APIs (register, login, etc.) | None                              | `registerRoutes(fastify, options)`        |
| 3   | `backend/routes/users.mjs`             | Defines admin APIs (list, toggle)         | None                              | `registerUserRoutes(fastify, options)`    |
| 4   | `backend/services/userService.mjs`     | User business logic (profile, settings)   | None                              | `getUserByEmail()`, `updateUserProfile()` |
| 5   | `backend/services/activityService.mjs` | Activity log logic                        | None                              | `logActivity()`, `getActivityLogs()`      |
| 6   | `frontend/css/styles.css`              | Custom styles with animations             | None                              | None                                      |
| 7   | `frontend/js/app.js`                   | Manages SPA state, dashboards             | None                              | `app(): init(), logout()`                 |
| 8   | `frontend/js/auth.js`                  | Handles login/register with validation    | None                              | `authComponent(): submit(action)`         |
| 9   | `frontend/js/profile.js`               | Manages profile/settings UI               | None                              | `profileComponent(): saveProfile()`       |
| 10  | `frontend/index.html`                  | SPA entry point, Alpine.js UI             | None                              | None                                      |
| 11  | `server.mjs`                           | Fastify server, serves APIs/frontend      | `fastify`, `__dirname`            | `startServer()`                           |
| 12  | `package.json`                         | Project metadata, dependencies            | None                              | None                                      |
| 13  | `.env`                                 | Environment variables                     | `PORT`, `JWT_SECRET`, `LOG_LEVEL` | None                                      |
| 14  | `.gitignore`                           | Excludes files from Git                   | None                              | None                                      |
| 15  | `.eslintrc.json`                       | ESLint configuration                      | None                              | None                                      |
| 16  | `tests/api.test.mjs`                   | API integration tests                     | None                              | None (Jest tests)                         |
| 17  | `.github/workflows/ci.yml`             | CI/CD pipeline configuration              | None                              | None                                      |
| 18  | `README.md`                            | Quick start, usage overview               | None                              | None                                      |
| 19  | `LEARNING_GUIDE.md`                    | Step-by-step guide to build V2 from V1    | None                              | None                                      |
| 20  | `DEVELOPER_REFERENCE.md`               | Technical reference for consistency       | None                              | None                                      |

## File Details

Detailed information for each file, numbered for reference.

### 1. backend/data/db.mjs

- **Purpose**: Initializes SQLite database, creates `users`, `profiles`, `settings`, `activity_logs` tables, seeds admin user.
- **Key Variables**:
  - `db`: SQLite instance (`better-sqlite3`).
  - `__dirname`: Current directory path.
- **Key Methods**:
  - `initDb()`: Creates tables, seeds admin.
  - `getDb()`: Returns database instance.
- **Connections**:
  - Imports: `better-sqlite3`, `bcrypt`, `path`, `url`.
  - Used by: `userService.mjs`, `activityService.mjs`.
  - Creates: `db/authmini.db`.
- **Notes**: Uses prepared statements, `bcrypt` for admin password.

### 2. backend/routes/auth.mjs

- **Purpose**: Defines API routes for registration, login, logout, profile, password, settings.
- **Key Variables**: None.
- **Key Methods**:
  - `registerRoutes(fastify, options)`: Registers routes (`/register`, `/login`, `/logout`, `/profile`, `/password`, `/settings`).
- **Connections**:
  - Imports: `bcrypt`, `jsonwebtoken`, `dotenv`, `db.mjs`, `userService.mjs`, `activityService.mjs`.
  - Used by: `server.mjs`.
- **Notes**: Uses service layer, logs activities.

### 3. backend/routes/users.mjs

- **Purpose**: Defines admin API routes for user list and status toggle.
- **Key Variables**: None.
- **Key Methods**:
  - `registerUserRoutes(fastify, options)`: Registers `/users`, `/users/:id/toggle`.
- **Connections**:
  - Imports: `jsonwebtoken`, `dotenv`, `db.mjs`, `userService.mjs`, `activityService.mjs`.
  - Used by: `server.mjs`.
- **Notes**: Admin-only, verifies JWT `role: 'admin'`.

### 4. backend/services/userService.mjs

- **Purpose**: Handles user-related business logic (profile, settings, password, status).
- **Key Variables**: None.
- **Key Methods**:
  - `getUserByEmail(email)`: Gets user by email.
  - `updateUserProfile(userId, data)`: Updates profile.
  - `updateUserSettings(userId, data)`: Updates settings.
  - `changeUserPassword(userId, newPassword)`: Changes password.
  - `toggleUserActive(userId, isActive)`: Toggles status.
- **Connections**:
  - Imports: `bcrypt`, `db.mjs`.
  - Used by: `auth.mjs`, `users.mjs`.
- **Notes**: Abstracts database logic, reusable.

### 5. backend/services/activityService.mjs

- **Purpose**: Manages activity log creation and retrieval.
- **Key Variables**: None.
- **Key Methods**:
  - `logActivity(userId, action)`: Logs action.
  - `getActivityLogs(filters)`: Retrieves logs with filters.
- **Connections**:
  - Imports: `db.mjs`.
  - Used by: `auth.mjs`, `users.mjs`.
- **Notes**: Supports admin auditing.

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

- **Purpose**: Manages SPA state, user/admin dashboards, user search/toggle.
- **Key Variables**: None.
- **Key Methods**:
  - `app()`: Alpine.js component with `init()`, `logout()`, `fetchUsers()`, `toggleUser()`.
- **Connections**:
  - Imports: None (uses global `axios`).
  - Loaded by: `index.html`.
- **Notes**: Handles admin dashboard logic.

### 8. frontend/js/auth.js

- **Purpose**: Handles login/register with client-side validation.
- **Key Variables**: None.
- **Key Methods**:
  - `authComponent()`: Alpine.js component with `submit(action)`, `validate()`.
- **Connections**:
  - Imports: None (uses global `axios`).
  - Loaded by: `index.html`.
- **Notes**: Validates email/password.

### 9. frontend/js/profile.js

- **Purpose**: Manages profile/settings UI and API calls.
- **Key Variables**: None.
- **Key Methods**:
  - `profileComponent()`: Alpine.js component with `init()`, `saveProfile()`.
- **Connections**:
  - Imports: None (uses global `axios`).
  - Loaded by: `index.html`.
- **Notes**: Handles profile/settings updates.

### 10. frontend/index.html

- **Purpose**: SPA entry point, defines UI with Alpine.js.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: Loads `styles.css`, `app.js`, `auth.js`, `profile.js`, CDNs.
- **Connections**:
  - Served by: `server.mjs`.
- **Notes**: Uses Tailwind, Alpine.js bindings.

### 11. server.mjs

- **Purpose**: Fastify server, serves APIs and frontend.
- **Key Variables**:
  - `fastify`: Fastify instance.
  - `__dirname`: Directory path.
- **Key Methods**:
  - `startServer()`: Initializes server, registers routes.
- **Connections**:
  - Imports: `Fastify`, `@fastify/static`, `dotenv`, `auth.mjs`, `users.mjs`.
- **Notes**: Uses `LOG_LEVEL` from `.env`.

### 12. package.json

- **Purpose**: Defines metadata, dependencies, scripts.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**:
  - Scripts: `start`, `lint`, `test`, `test:watch`.
  - Dependencies: Adds `axios`, `eslint`, `jest`, `supertest`.
- **Connections**:
  - Used by: `npm install`, `npm start`, `npm test`.

### 13. .env

- **Purpose**: Stores environment variables.
- **Key Variables**: `PORT`, `JWT_SECRET`, `LOG_LEVEL`.
- **Key Methods**: None.
- **Connections**:
  - Read by: `server.mjs`, `auth.mjs`, `users.mjs`.
- **Notes**: Excluded by `.gitignore`.

### 14. .gitignore

- **Purpose**: Excludes files from Git.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: Excludes `node_modules`, `.env`, `db/authmini.db`, `.eslintrc.json`, `.github/workflows/ci.yml`.
- **Connections**:
  - Used by: Git.

### 15. .eslintrc.json

- **Purpose**: Configures ESLint for code consistency.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: Rules for indentation, quotes, semicolons.
- **Connections**:
  - Used by: `npm run lint`.
- **Notes**: Excluded by `.gitignore`.

### 16. tests/api.test.mjs

- **Purpose**: API integration tests with Jest/Supertest.
- **Key Variables**: None.
- **Key Methods**: None (Jest test cases).
- **Content**: Tests for `/api/register`, `/api/login`, `/api/users`.
- **Connections**:
  - Imports: `jest`, `supertest`, `Fastify`, `auth.mjs`, `users.mjs`, `db.mjs`.
- **Notes**: Run with `npm test`.

### 17. .github/workflows/ci.yml

- **Purpose**: Defines CI/CD pipeline for linting/testing.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: Runs `npm install`, `npm run lint`, `npm test` on push/pull request.
- **Connections**:
  - Used by: GitHub Actions.
- **Notes**: Triggers Render deployment.

### 18. README.md

- **Purpose**: Quick start, usage, overview.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: Setup, features, testing, deployment.
- **Connections**:
  - Rendered on: GitHub.

### 19. LEARNING_GUIDE.md

- **Purpose**: Step-by-step guide to build V2 from V1, covering new features, testing, and deployment.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: Instructions for adding service layer, tests, CI/CD, and deployment.
- **Connections**:
  - Linked from: `README.md`.

### 20. DEVELOPER_REFERENCE.md

- **Purpose**: Technical reference for consistency.
- **Key Variables**: None.
- **Key Methods**: None.
- **Content**: Architecture, schema, APIs, guidelines.
- **Connections**:
  - Linked from: `README.md`.

## API Reference

Documented endpoints for testing AuthMini V2 APIs.

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
  - **Error** (400): `{ "error": "Registration failed: Email exists" }`
- **Notes**: Logs “User registered.”

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
      "user": { "email": "user@example.com", "role": "user" }
    }
    ```
  - **Error** (401): `{ "error": "Invalid credentials or account disabled" }`
- **Notes**: Logs “User logged in.”

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
      "display_name": "User",
      "bio": "Bio",
      "avatar_url": ""
    }
    ```
- **Response**:
  - **Success** (200): `{ "message": "Profile updated" }`
  - **Error** (401): `{ "error": "Invalid token" }`
- **Notes**: Logs “Profile updated.”

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
- **Notes**: Logs “Password changed.”

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
- **Notes**: Logs “Settings updated.”

### 7. GET /api/users

- **Description**: Lists users (admin only).
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
          "created_at": "2025-04-28T10:00:00Z",
          "is_active": 1
        }
      ]
    }
    ```
  - **Error** (401/403): `{ "error": "Invalid token" }` or `{ "error": "Admin access required" }`
- **Notes**: Supports search and active status filtering.

### 8. POST /api/users/:id/toggle

- **Description**: Toggles user active status (admin only).
- **Request**:
  - **Method**: POST
  - **URL**: `/api/users/2/toggle`
  - **Headers**: `Authorization: Bearer <admin_token>`, `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "isActive": false
    }
    ```
- **Response**:
  - **Success** (200): `{ "message": "User disabled" }`
  - **Error** (401/403): `{ "error": "Invalid token" }` or `{ "error": "Admin access required" }`
- **Notes**: Logs “User enabled/disabled.”

## Testing Guidelines

Instructions to verify AuthMini V2 functionality.

### 1. Frontend Testing

- **Environment**: Browser (`http://localhost:3000`).
- **Steps**:
  1. Open `http://localhost:3000`, verify login/register form with validation.
  2. **Register**: Enter `user@example.com`, `user123` → Expect “Registration successful.”
  3. **Login**: Use same credentials → Expect dashboard with profile/settings UI.
  4. **Profile**: Edit `display_name`, `bio`, save → Expect success message.
  5. **Settings**: Change `theme`, `notifications`, save → Expect UI update.
  6. **Admin Login**: Use `admin@example.com`, `admin123` → Expect user list, search, toggle buttons.
  7. **Admin Actions**: Search users, toggle status → Expect list updates.
  8. **Logout**: Click logout → Expect login form.
- **Checks**:
  - Console: Verify `app.js`, `auth.js`, `profile.js` loaded.
  - Styling: Animations, form validation, Tailwind classes.
- **Troubleshooting**:
  - **Validation fails**: Check `auth.js`.
  - **API errors**: Verify token in `localStorage`.

### 2. Backend Testing

- **Environment**: Postman or curl.
- **Steps**:
  1. **Register**: `POST /api/register` → Expect `201`.
  2. **Login**: `POST /api/login` → Expect `200`, save token.
  3. **Profile**: `POST /api/profile` with token → Expect `200`.
  4. **Admin Login**: `POST /api/login` with admin credentials → Save admin token.
  5. **List Users**: `GET /api/users?search=user` with admin token → Expect `200`.
  6. **Toggle Status**: `POST /api/users/2/toggle` with admin token → Expect `200`.
- **Checks**:
  - Database: Verify `authmini.db` updates (use SQLite viewer).
  - Logs: Check `fastify.log` for errors.
- **Troubleshooting**:
  - **401/403**: Verify token, admin role.
  - **Database errors**: Check schema in `db.mjs`.

### 3. Automated Testing

- **Environment**: Node.js (`npm test`).
- **Steps**:
  1. Run `npm test` → Expect all tests in `api.test.mjs` to pass.
  2. Run `npm run lint` → Expect no ESLint errors.
- **Checks**:
  - Tests cover `/api/register`, `/api/login`, `/api/users`.
- **Troubleshooting**:
  - **Test failures**: Check `api.test.mjs`, ensure `initDb()` ran.
  - **Lint errors**: Fix per `.eslintrc.json`.

### 4. Database Testing

- **Environment**: SQLite CLI or viewer.
- **Steps**:
  1. Open `db/authmini.db`.
  2. Query: `SELECT * FROM users/profiles/settings/activity_logs;` → Verify data.
- **Checks**:
  - Admin: `email='admin@example.com'`, `role='admin'`.
  - Logs: Actions like “Profile updated” present.
- **Troubleshooting**:
  - **Tables missing**: Restart server to trigger `initDb()`.

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

### SQLite

- **Queries**: Prepared statements.
  ```javascript
  db.prepare('INSERT INTO profiles VALUES (?, ?, ?, ?)').run(...);
  ```

### Error Handling

- **Backend**: HTTP codes, `{ error: 'message' }`.
- **Frontend**: `x-text="error"`.
- **Logging**: `fastify.log` (backend), `console.log` (frontend).

## Deployment and CI/CD

### Deployment

- **Platform**: Render (free tier).
- **Steps**:
  1. Push code to GitHub (`v2` branch).
  2. Create Render Web Service, link GitHub repository.
  3. Configure:
     - Runtime: Node.js.
     - Build: `npm install`.
     - Start: `npm start`.
     - Environment: `PORT`, `JWT_SECRET`, `LOG_LEVEL`.
  4. Deploy, access via Render URL.
- **Notes**: SQLite persists in Render’s file system (ephemeral in free tier).

### CI/CD

- **Tool**: GitHub Actions.
- **Configuration**: `.github/workflows/ci.yml`.
- **Workflow**:
  - Triggers: Push/pull request to `v2` branch.
  - Steps: Install Node.js, run `npm install`, `npm run lint`, `npm test`.
  - Deployment: Render auto-deploys on successful CI.
- **Notes**: Ensures code quality before deployment.

## LLM Guidelines

LLMs must generate consistent AuthMini V2 code using this document.

1. **Adhere to Code Style**:
   - ESM, single quotes, 2-space indentation, semicolons, JSDoc.
2. **Use Templates**:
   - **Fastify Route**:
     ```javascript
     /**
      * [Route description].
      * @module routes/[name]
      */
     import { getDb } from '../data/db.mjs';
     import { serviceMethod } from '../services/[name].mjs';
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
   - **Service**:
     ```javascript
     /**
      * [Service description].
      * @module services/[name]
      */
     import { getDb } from '../data/db.mjs';
     export function methodName(arg) {
       const db = getDb();
       // Logic
       return result;
     }
     ```
   - **Alpine.js Component**:
     ```javascript
     /**
      * [Component description].
      * @module js/[name]
      */
     function componentName() {
       return {
         state: '',
         async method() {
           try {
             await axios.post('/api/path', { data });
           } catch (err) {
             this.error = err.response?.data?.error;
           }
         },
       };
     }
     window.componentName = componentName;
     ```
3. **Match File Structure**:
   - Generate for specified files (e.g., `userService.mjs`).
4. **Validate Output**:
   - Check ESLint rules, JSDoc, service layer usage.
5. **Context**:
   - Use this document as sole context.
   - Generate one file at a time.

## Notes

- Ensures consistent, maintainable code for AuthMini V2.
- Report issues at [https://github.com/voilacode/authmini](https://github.com/voilacode/authmini).

## License

MIT
