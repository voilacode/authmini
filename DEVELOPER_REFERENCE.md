# Developer Reference for AuthMini V1

**Version**: 1.0  
**Application**: AuthMini V1  
**Repository**: [https://github.com/voilacode/authmini](https://github.com/voilacode/authmini)  
**Purpose**: This document serves as a comprehensive technical reference for developers and LLMs, ensuring code consistency, integrity, and clear system understanding for AuthMini V1, a minimal full-stack authentication app. It includes a detailed project introduction, user roles, user flows, database schema, API reference, system architecture, file details, testing guidelines, coding standards, and LLM guidelines, optimized for developers maintaining the app and LLMs generating uniform code within small context windows.

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
  - [4. frontend/css/styles.css](#4-frontendcssstyles.css)
  - [5. frontend/js/app.js](#5-frontendjsapp.js)
  - [6. frontend/js/auth.js](#6-frontendjsauth.js)
  - [7. frontend/index.html](#7-frontendindex.html)
  - [8. server.mjs](#8-server.mjs)
  - [9. package.json](#9-package.json)
  - [10. .env](#10-.env)
  - [11. .gitignore](#11-.gitignore)
  - [12. README.md](#12-readme.md)
  - [13. DEVELOPER_REFERENCE.md](#13-developer_reference.md)
- [API Reference](#api-reference)
- [Testing Guidelines](#testing-guidelines)
- [Code Style Guide](#code-style-guide)
- [LLM Guidelines](#llm-guidelines)
- [Notes](#notes)
- [License](#license)

## Project Introduction

AuthMini V1 is a purposefully minimal full-stack authentication application designed as an educational tool to teach beginners the essentials of modern web development. Built with **Fastify** (backend), **Alpine.js** (frontend), **SQLite** (database), and **ES Modules (ESM)**, it implements core authentication features—user registration, login, logout, and admin user management—in a single-server setup. Hosted at [https://github.com/voilacode/authmini](https://github.com/voilacode/authmini) under the MIT license, AuthMini serves as a starting point for learning full-stack JavaScript development, emphasizing simplicity, clarity, and practical functionality.

### What is AuthMini V1?

AuthMini V1 is a lightweight, self-contained web application that demonstrates a complete authentication system. It allows users to register and log in to access a personal dashboard displaying their email, while admins (pre-seeded with `admin@example.com`, `admin123`) can log in to view a list of all users’ details (emails, roles, join dates). The app uses a single Fastify server to handle both API endpoints (`/api/*`) and a frontend single-page application (SPA) served at `/`. Its 13-file structure and minimal dependencies make it an accessible project for beginners to understand and extend, while its strict coding standards ensure maintainability and consistency for developers and LLMs.

### How is AuthMini Used?

AuthMini is primarily used as:

- **A Learning Resource**: Beginners can study its code to learn server-side routing (Fastify), client-side interactivity (Alpine.js), database management (SQLite), and authentication (JWT, bcrypt). Developers can use it to teach or prototype concepts.
- **A Reference Implementation**: It provides a working example of authentication patterns (e.g., JWT-based sessions, role-based access) that can be adapted for other projects.
- **A Development Sandbox**: Developers can extend AuthMini by adding features (e.g., new APIs, UI components) or experimenting with its stack, using this document to ensure consistency.
- **An LLM Code Generation Template**: LLMs can use this document’s guidelines and templates to generate AuthMini-compatible code, ensuring uniform style and functionality.

To use AuthMini, developers clone the repository, install dependencies, configure `.env`, and run the server (`npm start`). They can interact with the app via the browser (`http://localhost:3000`) or test APIs with tools like Postman. This document and `README.md` guide setup, usage, and extension.

### Why is AuthMini Designed This Way?

AuthMini’s design prioritizes:

- **Simplicity for Learning**: A single-server architecture (one Fastify instance) reduces complexity, allowing beginners to grasp the entire stack without managing multiple services. The 13-file structure minimizes cognitive load while covering essential components.
- **Minimal Dependencies**: Six backend dependencies (`better-sqlite3`, `bcrypt`, `dotenv`, `fastify`, `@fastify/static`, `jsonwebtoken`) and three frontend CDNs (Alpine.js, Axios, Tailwind CSS) keep the project lightweight, avoiding heavy frameworks.
- **Modern JavaScript (ESM)**: ES Modules ensure compatibility with modern ecosystems, teaching best practices for module-based development.
- **Educational Focus**: Features like registration, login, and admin user listing demonstrate real-world authentication workflows in a simplified context.
- **Code Consistency**: Strict standards (2-space indentation, single quotes, JSDoc) ensure maintainability and LLM compatibility.
- **Portability**: SQLite and a single `PORT` configuration make AuthMini easy to run on any system with Node.js.
- **Open Source Extensibility**: MIT license and GitHub hosting encourage contributions.

This design balances simplicity with functionality, making AuthMini ideal for learning, prototyping, and teaching.

## User Roles and Permissions

AuthMini V1 defines two user roles with distinct permissions and access levels, stored in the `users` table (`role` column).

| Role      | Description                                                            | Permissions                                                                                                             | Access                                                                                                                                                                                                 |
| --------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **User**  | Standard user, default for new registrants.                            | - Register with email and password.<br>- Login to access user dashboard.<br>- View own email on dashboard.<br>- Logout. | - `/`: Login/register form.<br>- `/` (post-login): User dashboard (`email`, logout button).<br>- APIs: `POST /api/register`, `POST /api/login`, `POST /api/logout`.                                    |
| **Admin** | Privileged user, seeded as `admin@example.com` (password: `admin123`). | - All **User** permissions.<br>- View list of all users (emails, roles, join dates) on admin dashboard.                 | - `/`: Login form.<br>- `/` (post-login): Admin dashboard (user list, logout button).<br>- APIs: `POST /api/register`, `POST /api/login`, `POST /api/logout`, `GET /api/users` (requires admin token). |

### Notes

- **Authentication**: JWTs stored in `localStorage` manage sessions.
- **Authorization**: Admin access to `/api/users` requires a JWT with `role: 'admin'`, verified by `backend/routes/users.mjs`.
- **Security**: Passwords hashed with `bcrypt`; `JWT_SECRET` in `.env` secures tokens.

## User Flows

Key user interactions in AuthMini V1.

### 1. User Registration

- **Steps**:
  1. User visits `http://localhost:3000`, sees login/register form (`frontend/index.html`).
  2. Enters `email` (e.g., `user@example.com`) and `password` (e.g., `user123`) in register form.
  3. Clicks “Register” → `frontend/js/auth.js` sends `POST /api/register` via Axios.
  4. `backend/routes/auth.mjs` validates input, hashes password (`bcrypt`), inserts user into `users` table (`backend/data/db.mjs`).
  5. Returns `201` with `{ message: 'User registered' }`.
  6. UI shows “Registration successful,” prompts login.
- **Outcome**: New user in `users` table (`role: 'user'`), ready to log in.

### 2. User Login and Dashboard

- **Steps**:
  1. User enters `email` and `password` in login form.
  2. Clicks “Login” → `frontend/js/auth.js` sends `POST /api/login`.
  3. `backend/routes/auth.mjs` verifies credentials, generates JWT (`jsonwebtoken`).
  4. Returns `200` with `{ token, user: { email, role } }`.
  5. `frontend/js/app.js` stores token in `localStorage`, shows user dashboard (`email`, logout button).
- **Outcome**: User accesses dashboard, sees their email.

### 3. Admin Login and User List

- **Steps**:
  1. Admin enters `admin@example.com` and `admin123` in login form.
  2. Clicks “Login” → `frontend/js/auth.js` sends `POST /api/login`.
  3. `backend/routes/auth.mjs` verifies, returns JWT with `role: 'admin'`.
  4. `frontend/js/app.js` stores token, calls `GET /api/users` (admin only).
  5. `backend/routes/users.mjs` verifies admin token, queries `users` table.
  6. Returns `200` with `{ users: [{ id, email, role, created_at }, ...] }`.
  7. UI shows admin dashboard with user list.
- **Outcome**: Admin views all users’ details.

### 4. Logout

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
- **Admin Login and User List Flow**: [Placeholder - Admin Diagram]()
- **Logout Flow**: [Placeholder - Logout Diagram]()

### Notes

- Diagrams will illustrate frontend UI transitions, API calls, and database interactions.
- To be hosted in the repository (e.g., `/docs/diagrams/`).

## Database Schema and Design

AuthMini V1 uses a single SQLite database (`db/authmini.db`) with one table, `users`, to store user data.

### Schema

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Column Details

| Column          | Type      | Constraints                | Description                    |
| --------------- | --------- | -------------------------- | ------------------------------ |
| `id`            | INTEGER   | PRIMARY KEY, AUTOINCREMENT | Unique user identifier.        |
| `email`         | TEXT      | NOT NULL, UNIQUE           | User’s email, used for login.  |
| `password_hash` | TEXT      | NOT NULL                   | Hashed password (bcrypt).      |
| `role`          | TEXT      | NOT NULL, DEFAULT 'user'   | User role (`user` or `admin`). |
| `created_at`    | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP  | Account creation time.         |

### Design Choices

- **Single Table**: A single `users` table simplifies the database for educational purposes, covering authentication and role-based access without complex relationships.
- **SQLite**: Chosen for portability and ease of setup (no external server required), ideal for local development and learning.
- **Constraints**:
  - `NOT NULL` and `UNIQUE` on `email` ensure valid, unique identifiers.
  - `NOT NULL` on `password_hash` enforces security.
  - `DEFAULT 'user'` on `role` assigns new users the standard role.
  - `DEFAULT CURRENT_TIMESTAMP` on `created_at` tracks registration time.
- **Security**: Passwords are hashed with `bcrypt` (in `backend/data/db.mjs` and `backend/routes/auth.mjs`) to protect user data.
- **Seeding**: Admin user (`admin@example.com`, `admin123`) is seeded in `backend/data/db.mjs` for immediate admin access.
- **Prepared Statements**: Used in `db.mjs` (e.g., `db.prepare()`) to prevent SQL injection.

### Usage

- **Initialization**: `backend/data/db.mjs` creates the `users` table and seeds the admin user on first run.
- **Queries**:
  - **Insert**: `INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)` (register).
  - **Select**: `SELECT * FROM users WHERE email = ?` (login).
  - **Select All**: `SELECT id, email, role, created_at FROM users` (admin user list).
- **Storage**: `db/authmini.db` is created in `authmini/db/` (excluded by `.gitignore`).

## System Architecture

AuthMini V1 uses a single-server architecture for simplicity.

- **Design**:
  - **Single Server**: `server.mjs` (Fastify) handles API routes (`/api/*`) and serves frontend SPA (`/`).
  - **Backend**: Fastify with SQLite (`db/authmini.db`) for data, JWT for authentication, bcrypt for password hashing.
  - **Frontend**: Alpine.js SPA with Tailwind CSS (CDN) for styling, Axios for API requests.
  - **Database**: SQLite with `users` table.
- **Dependencies**:
  - Backend: `better-sqlite3`, `bcrypt`, `dotenv`, `fastify`, `@fastify/static`, `jsonwebtoken`.
  - Frontend: Alpine.js (CDN), Axios (CDN), Tailwind CSS (CDN).
- **Data Flow**:
  1. Browser requests `http://localhost:3000` → `server.mjs` serves `frontend/index.html`.
  2. `index.html` loads `styles.css`, `app.js`, `auth.js`, Alpine.js, Axios.
  3. `app.js` checks token, fetches `/api/users` (admin).
  4. `auth.js` sends `/api/register` or `/api/login` via Axios.
  5. `server.mjs` routes API requests to `auth.mjs` or `users.mjs`.
  6. `auth.mjs` and `users.mjs` query SQLite via `db.mjs`.
  7. Responses update UI via Alpine.js.

## Project Folder and File Structure

AuthMini V1 consists of **13 files** in a minimal structure. Below is the directory tree with numbered files for tracking:

```
authmini/
├── backend/
│   ├── data/
│   │   └── [1] db.mjs
│   ├── routes/
│   │   ├── [2] auth.mjs
│   │   └── [3] users.mjs
├── db/
├── frontend/
│   ├── css/
│   │   └── [4] styles.css
│   ├── js/
│   │   ├── [5] app.js
│   │   └── [6] auth.js
│   └── [7] index.html
├── [8] server.mjs
├── [9] package.json
├── [10] .env
├── [11] .gitignore
├── [12] README.md
├── [13] DEVELOPER_REFERENCE.md
```

- **File Count**: 13.
- **Notes**:
  - `db/` stores `authmini.db` (created at runtime).
  - `.gitignore` excludes `node_modules`, `.env`, `db/authmini.db`.

## File Snapshot

The table summarizes all 13 files, numbered for tracking.

| #   | File                       | Purpose                                   | Key Variables          | Key Methods                            |
| --- | -------------------------- | ----------------------------------------- | ---------------------- | -------------------------------------- |
| 1   | `backend/data/db.mjs`      | Manages SQLite database, seeds admin user | `db`, `__dirname`      | `initDb()`, `getDb()`                  |
| 2   | `backend/routes/auth.mjs`  | Defines authentication APIs               | None                   | `registerRoutes(fastify, options)`     |
| 3   | `backend/routes/users.mjs` | Defines admin user list API               | None                   | `registerUserRoutes(fastify, options)` |
| 4   | `frontend/css/styles.css`  | Custom styles for UI                      | None                   | None                                   |
| 5   | `frontend/js/app.js`       | Manages SPA state, dashboards             | None                   | `app(): init(), logout()`              |
| 6   | `frontend/js/auth.js`      | Handles login/register logic              | None                   | `authComponent(): submit(action)`      |
| 7   | `frontend/index.html`      | SPA entry point, Alpine.js UI             | None                   | None                                   |
| 8   | `server.mjs`               | Fastify server, serves APIs/frontend      | `fastify`, `__dirname` | `startServer()`                        |
| 9   | `package.json`             | Project metadata, dependencies            | None                   | None                                   |
| 10  | `.env`                     | Environment variables                     | `PORT`, `JWT_SECRET`   | None                                   |
| 11  | `.gitignore`               | Excludes files from Git                   | None                   | None                                   |
| 12  | `README.md`                | Quick start, usage overview               | None                   | None                                   |
| 13  | `DEVELOPER_REFERENCE.md`   | Technical reference for code consistency  | None                   | None                                   |

## File Details

Detailed information for each file, numbered for reference.

### 1. backend/data/db.mjs

- **Purpose**: Initializes SQLite database, creates `users` table, seeds admin user (`admin@example.com`, `admin123`).
- **Key Variables**:
  - `db`: SQLite database instance (`sqlite3`).
  - `__dirname`: Current directory path (`dirname(fileURLToPath(import.meta.url))`).
- **Key Methods**:
  - `initDb()`:
    - **Description**: Creates `users` table, seeds admin.
    - **Arguments**: None.
    - **Returns**: Database instance.
    - **Behavior**: Defines table, inserts admin if absent.
  - `getDb()`:
    - **Description**: Returns database instance.
    - **Arguments**: None.
    - **Returns**: Database instance.
    - **Behavior**: Throws error if `db` not initialized.
- **Connections**:
  - Imports: `better-sqlite3`, `bcrypt`, `path`, `url`.
  - Used by: `auth.mjs`, `users.mjs`.
  - Creates: `db/authmini.db`.
- **Notes**: Uses prepared statements, `bcrypt` for admin password.

### 2. backend/routes/auth.mjs

- **Purpose**: Defines API routes for registration, login, logout.
- **Key Variables**: None (uses `fastify`, `db`).
- **Key Methods**:
  - `registerRoutes(fastify, options)`:
    - **Description**: Registers `/register`, `/login`, `/logout` routes.
    - **Arguments**:
      - `fastify`: Fastify instance.
      - `options`: Route options (e.g., `{ prefix: '/api' }`).
    - **Returns**: None (async, registers routes).
    - **Routes**:
      - `POST /register`: Creates user (`email`, `password`).
      - `POST /login`: Authenticates user, returns JWT.
      - `POST /logout`: Clears client-side token.
- **Connections**:
  - Imports: `bcrypt`, `jsonwebtoken`, `dotenv`, `db.mjs`.
  - Used by: `server.mjs`.
  - Calls: `getDb()`, `bcrypt.hash`, `jwt.sign`.
- **Notes**: Returns `400`/`401` for errors, uses `reply.send()`.

### 3. backend/routes/users.mjs

- **Purpose**: Defines admin API route to list users.
- **Key Variables**: None (uses `fastify`, `db`).
- **Key Methods**:
  - `registerUserRoutes(fastify, options)`:
    - **Description**: Registers `/users` route for admin.
    - **Arguments**:
      - `fastify`: Fastify instance.
      - `options`: Route options.
    - **Returns**: None (async, registers route).
    - **Routes**:
      - `GET /users`: Returns user list (admin only).
- **Connections**:
  - Imports: `jsonwebtoken`, `dotenv`, `db.mjs`.
  - Used by: `server.mjs`.
  - Calls: `getDb()`, `jwt.verify`.
- **Notes**: Requires `Authorization: Bearer <admin_token>`, returns `401`/`403`.

### 4. frontend/css/styles.css

- **Purpose**: Custom styles for forms and buttons, complements Tailwind CSS.
- **Key Variables**: None (CSS classes).
- **Key Methods**: None.
- **Content**:
  - Classes: `.form-container` (dark gray, padding), `.btn-primary` (button styling).
- **Connections**:
  - Loaded by: `index.html`.
  - Served by: `server.mjs`.
- **Notes**: Uses kebab-case, avoids `!important`.

### 5. frontend/js/app.js

- **Purpose**: Manages SPA state, handles user/admin dashboards.
- **Key Variables**: None (Alpine.js component).
- **Key Methods**:
  - `app()`:
    - **Description**: Returns Alpine.js component for SPA state.
    - **Arguments**: None.
    - **Returns**: Object with state and methods.
    - **Properties**:
      - `user`: Object (`{ email, role }`) or `null`.
      - `users`: Array of users (admin dashboard).
    - **Methods**:
      - `init()`: Checks token, fetches `/api/users` (admin).
      - `logout()`: Clears token, reloads page.
- **Connections**:
  - Imports: None (uses global `axios`).
  - Loaded by: `index.html`.
  - Calls: `/api/users` (admin).
- **Notes**: Logs `app.js loaded` to console.

### 6. frontend/js/auth.js

- **Purpose**: Handles login/register form logic.
- **Key Variables**: None (Alpine.js component).
- **Key Methods**:
  - `authComponent()`:
    - **Description**: Returns Alpine.js component for auth form.
    - **Arguments**: None.
    - **Returns**: Object with state and methods.
    - **Properties**:
      - `email`: String (form input).
      - `password`: String (form input).
      - `error`: String (error message).
    - **Methods**:
      - `submit(action)`: Sends `/api/register` or `/api/login`.
        - **Arguments**: `action` (`'register'` or `'login'`).
        - **Returns**: None (async).
- **Connections**:
  - Imports: None (uses global `axios`).
  - Loaded by: `index.html`.
  - Calls: `/api/register`, `/api/login`.
- **Notes**: Logs `auth.js loaded` to console.

### 7. frontend/index.html

- **Purpose**: SPA entry point, defines UI with Alpine.js.
- **Key Variables**: None (HTML with Alpine.js bindings).
- **Key Methods**: None.
- **Content**:
  - Loads: Tailwind CSS (CDN), `styles.css`, `app.js`, `auth.js`, Axios (CDN), Alpine.js (CDN).
  - UI: Login/register form, user dashboard, admin dashboard (`x-show`).
  - Bindings: `x-data="app()"`, `x-model`, `@click`, `x-text`.
- **Connections**:
  - Served by: `server.mjs`.
  - Loads: `styles.css`, `app.js`, `auth.js`.
- **Notes**: Uses Tailwind classes, minimal custom CSS.

### 8. server.mjs

- **Purpose**: Fastify server entry point, serves APIs and frontend.
- **Key Variables**:
  - `fastify`: Fastify instance (`Fastify({ logger: true })`).
  - `__dirname`: Current directory path.
- **Key Methods**:
  - `startServer()`:
    - **Description**: Initializes and starts Fastify server.
    - **Arguments**: None.
    - **Returns**: None (async, starts server).
    - **Behavior**: Registers static files (`frontend/`), API routes (`auth.mjs`, `users.mjs`), listens on `PORT`.
- **Connections**:
  - Imports: `Fastify`, `@fastify/static`, `dotenv`, `auth.mjs`, `users.mjs`, `path`, `url`.
  - Serves: `index.html`, `styles.css`, `app.js`, `auth.js`.
  - Routes: `/api/register`, `/api/login`, `/api/logout`, `/api/users`.
- **Notes**: Sets `Content-Type: text/css` for CSS, uses `fastify.log`.

### 9. package.json

- **Purpose**: Defines project metadata, dependencies, scripts.
- **Key Variables**: None (JSON).
- **Key Methods**: None.
- **Content**:
  - `"type": "module"`: Enables ESM.
  - `"scripts": { "start": "node server.mjs" }`: Runs server.
  - Dependencies: `better-sqlite3`, `bcrypt`, `dotenv`, `fastify`, `@fastify/static`, `jsonwebtoken`.
- **Connections**:
  - Used by: `npm install`, `npm start`.
- **Notes**: Version `1.0.0` for release.

### 10. .env

- **Purpose**: Stores environment variables.
- **Key Variables**:
  - `PORT`: Server port (e.g., `3000`).
  - `JWT_SECRET`: JWT signing secret (e.g., `openssl rand -base64 32`).
- **Key Methods**: None.
- **Connections**:
  - Read by: `server.mjs`, `auth.mjs`, `users.mjs` via `dotenv`.
- **Notes**: Excluded by `.gitignore`.

### 11. .gitignore

- **Purpose**: Excludes files from Git.
- **Key Variables**: None (text).
- **Key Methods**: None.
- **Content**:
  - Excludes: `node_modules/`, `.env`, `db/authmini.db`.
- **Connections**:
  - Used by: Git.
- **Notes**: Ensures clean repository.

### 12. README.md

- **Purpose**: Provides quick start, usage, and overview.
- **Key Variables**: None (Markdown).
- **Key Methods**: None.
- **Content**:
  - Sections: Overview, Features, Setup, Usage, File Structure, Testing.
  - Links to: `DEVELOPER_REFERENCE.md`.
- **Connections**:
  - Rendered on: GitHub.
- **Notes**: Entry point for users.

### 13. DEVELOPER_REFERENCE.md

- **Purpose**: Technical reference for code consistency, architecture.
- **Key Variables**: None (Markdown).
- **Key Methods**: None.
- **Content**:
  - Sections: Introduction, Roles, Flows, Diagrams, Schema, Architecture, Structure, Snapshot, File Details, API Reference, Testing, Code Style, LLM Guidelines.
- **Connections**:
  - Linked from: `README.md`.
  - Rendered on: GitHub.
- **Notes**: Guides developers and LLMs.

## API Reference

Documented endpoints for testing AuthMini V1 APIs (use Postman or curl).

### 1. POST /api/register

- **Description**: Registers a new user.
- **Request**:
  - **Method**: POST
  - **URL**: `http://localhost:3000/api/register`
  - **Headers**: `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "user123"
    }
    ```
- **Response**:
  - **Success** (201):
    ```json
    { "message": "User registered" }
    ```
  - **Error** (400):
    ```json
    { "error": "Email already exists" }
    ```
- **Notes**: Creates user with `role: 'user'`.

### 2. POST /api/login

- **Description**: Authenticates a user, returns JWT.
- **Request**:
  - **Method**: POST
  - **URL**: `http://localhost:3000/api/login`
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
  - **Error** (401):
    ```json
    { "error": "Invalid credentials" }
    ```
- **Notes**: Token stored in `localStorage` for frontend.

### 3. POST /api/logout

- **Description**: Logs out a user (client-side token clear).
- **Request**:
  - **Method**: POST
  - **URL**: `http://localhost:3000/api/logout`
  - **Headers**: None
  - **Body**: None
- **Response**:
  - **Success** (200):
    ```json
    { "message": "Logged out" }
    ```
- **Notes**: Frontend clears `localStorage` token.

### 4. GET /api/users

- **Description**: Lists all users (admin only).
- **Request**:
  - **Method**: GET
  - **URL**: `http://localhost:3000/api/users`
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
          "created_at": "2025-04-28T10:00:00Z"
        },
        {
          "id": 2,
          "email": "user@example.com",
          "role": "user",
          "created_at": "2025-04-28T10:01:00Z"
        }
      ]
    }
    ```
  - **Error** (401):
    ```json
    { "error": "Unauthorized" }
    ```
  - **Error** (403):
    ```json
    { "error": "Forbidden: Admin access required" }
    ```
- **Notes**: Requires admin JWT.

## Testing Guidelines

Instructions to verify AuthMini V1 functionality.

### 1. Frontend Testing

- **Environment**: Browser (`http://localhost:3000`).
- **Steps**:
  1. Open `http://localhost:3000`, verify login/register form loads.
  2. **Register**: Enter `user@example.com`, `user123` → Expect “Registration successful.”
  3. **Login**: Use `user@example.com`, `user123` → Expect user dashboard with email, logout button.
  4. **Admin Login**: Use `admin@example.com`, `admin123` → Expect admin dashboard with user list.
  5. **Logout**: Click logout → Expect login/register form.
- **Checks**:
  - Console: Verify `app.js loaded`, `auth.js loaded`.
  - Styling: Dark gray forms, white text (Tailwind + `styles.css`).
- **Troubleshooting**:
  - **Styles missing**: Clear cache (`Ctrl+Shift+R`), check `/css/styles.css`.
  - **Scripts fail**: Check console, verify `/js/app.js`, `/js/auth.js`.

### 2. Backend Testing

- **Environment**: Postman or curl.
- **Steps**:
  1. **Register**: `POST /api/register` with `{"email":"test@example.com","password":"test123"}` → Expect `201`, `{"message":"User registered"}`.
  2. **Login**: `POST /api/login` with `{"email":"test@example.com","password":"test123"}` → Expect `200`, `{"token":"...","user":{...}}`.
  3. **Admin Login**: `POST /api/login` with `{"email":"admin@example.com","password":"admin123"}` → Save admin token.
  4. **List Users**: `GET /api/users` with `Authorization: Bearer <admin_token>` → Expect `200`, `{"users":[...]}`.
  5. **Logout**: `POST /api/logout` → Expect `200`, `{"message":"Logged out"}`.
- **Checks**:
  - Database: Verify `db/authmini.db` contains new users (use SQLite CLI or viewer).
  - Logs: Check `fastify.log` in terminal for errors.
- **Troubleshooting**:
  - **API errors**: Verify `.env` (`JWT_SECRET`), Postman headers.
  - **Database issues**: Check `db.mjs` logs, ensure `db/` writable.

### 3. Database Testing

- **Environment**: SQLite CLI or viewer (e.g., DB Browser for SQLite).
- **Steps**:
  1. Open `db/authmini.db`.
  2. Query: `SELECT * FROM users;` → Expect admin user and registered users.
  3. Verify: `email`, `password_hash`, `role`, `created_at` are correct.
- **Checks**:
  - Admin: `email='admin@example.com'`, `role='admin'`.
  - Users: `role='user'`, unique `email`.
- **Troubleshooting**:
  - **Table missing**: Restart server to trigger `initDb()` in `db.mjs`.
  - **Data missing**: Check API logs for insertion errors.

## Code Style Guide

Standards to ensure consistent, maintainable code. LLMs must adhere strictly.

### General

- **Language**: JavaScript with ES Modules (ESM).
- **File Extensions**: `.mjs` (backend), `.js` (frontend).
- **Encoding**: UTF-8.
- **Indentation**: 2 spaces, no tabs.
- **Line Length**: Max 100 characters.
- **Semicolons**: Always use.
- **Quotes**: Single quotes (`'`) for strings.
- **Comments**: JSDoc for modules/functions, inline for clarity.

### Naming Conventions

- **Files**: Lowercase, kebab-case (e.g., `server.mjs`).
- **Variables/Functions**: camelCase (e.g., `startServer`).
- **Constants**: UPPER_SNAKE_CASE (e.g., `JWT_SECRET`).
- **Modules**: Match file name (e.g., `auth.mjs` → `@module routes/auth`).

### JavaScript (ESM)

- **Imports**: Named, explicit, no defaults.
  - Example: `import { initDb } from '../data/db.mjs';`
- **Exports**: Named exports.
  - Example: `export function getDb() { ... }`
- **Async/Await**: Preferred over Promises.
  - Example: `await fastify.listen({ port });`
- **Error Handling**: Try-catch for async, descriptive errors.
  - Example:
    ```javascript
    try {
      const user = db.prepare('SELECT * FROM users').get(email);
      if (!user) throw new Error('User not found');
    } catch (err) {
      reply.code(400).send({ error: err.message });
    }
    ```

### Fastify (Backend)

- **Route Registration**: Use `fastify.register` with prefix.
  - Example:
    ```javascript
    export async function registerRoutes(fastify, options) {
      fastify.post('/register', async (request, reply) => { ... });
    }
    ```
- **Request/Response**: Use `request.body`, `reply.code()`, `reply.send()`.
- **Logging**: `fastify.log.info/error`.
- **JSDoc**:
  - Example:
    ```javascript
    /**
     * Registers routes for [purpose].
     * @param {FastifyInstance} fastify - Fastify instance.
     * @param {Object} options - Route options.
     */
    ```

### Alpine.js (Frontend)

- **Components**: Functions returning objects, assigned to `window`.
  - Example:
    ```javascript
    function authComponent() {
      return { email: '', submit(action) { ... } };
    }
    window.authComponent = authComponent;
    ```
- **Bindings**: `x-data`, `x-show`, `x-model`, `x-text`, `@click`.
- **Async Calls**: Axios with try-catch.
  - Example:
    ```javascript
    async submit(action) {
      try {
        await axios.post(`/api/${action}`, { email: this.email });
      } catch (err) {
        this.error = err.response?.data?.error || 'Error';
      }
    }
    ```

### CSS

- **Tailwind CSS**: Primary styling via CDN.
- **Custom CSS**: In `styles.css`, kebab-case.
  - Example:
    ```css
    .form-container {
      background-color: #4b5563;
      padding: 2rem;
    }
    ```
- **Specificity**: Avoid `!important`, prefer Tailwind.

### SQLite

- **Queries**: Prepared statements.
  - Example:
    ```javascript
    db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    ```
- **Schema**: See [Database Schema and Design](#database-schema-and-design).

### Error Handling

- **Backend**: HTTP codes (`400`, `401`, `403`), `{ error: 'message' }`.
- **Frontend**: `x-text="error"`.
- **Logging**: `console.log` (frontend), `fastify.log` (backend).

## LLM Guidelines

LLMs must generate consistent AuthMini V1 code using this document.

1. **Adhere to Code Style**:
   - ESM, single quotes, 2-space indentation, semicolons.
   - Naming: camelCase, kebab-case.
   - JSDoc for modules/functions.
2. **Use Templates**:
   - **Fastify Route**:
     ```javascript
     /**
      * [Route description].
      * @module routes/[name]
      */
     import { getDb } from '../data/db.mjs';
     export async function registerRoutes(fastify, options) {
       fastify.[method]('/[path]', async (request, reply) => {
         try {
           // Logic
           reply.send({ data: 'result' });
         } catch (err) {
           reply.code(400).send({ error: err.message });
         }
       });
     }
     ```
   - **Alpine.js Component**:
     ```javascript
     /**
      * [Component description].
      * @module js/[name]
      */
     function [componentName]() {
       return {
         [state]: '',
         async [method]() {
           try {
             const res = await axios.[method]('/api/[path]', { data });
             // Handle success
           } catch (err) {
             this.error = err.response?.data?.error || 'Error';
           }
         },
       };
     }
     window.[componentName] = [componentName];
     ```
3. **Match File Structure**:
   - Generate for specified files only (e.g., `auth.mjs`).
   - Respect file roles and connections.
4. **Validate Output**:
   - Check ESM, imports/exports, error handling, JSDoc.
5. **Context**:
   - Use this document as sole context.
   - Generate one file at a time.

## Notes

- Ensures consistent, maintainable code for AuthMini V1.
- Report issues at [https://github.com/voilacode/authmini](https://github.com/voilacode/authmini).

## License

MIT
