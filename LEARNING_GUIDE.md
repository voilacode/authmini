# Learning Guide for Building AuthMini V1

**Version**: 1.1  
**Application**: AuthMini V1  
**Created by**: Krishna Teja GS  
**Date**: April 29, 2025

## Purpose

This guide is designed to prepare developers for building complex applications like **AuthCloud** by first mastering the fundamentals with **AuthMini V1**.  
It focuses on learning the _right way_ — following a clean project structure, consistent coding style, company-approved practices, and maintainability standards.

**AuthMini V1** is intentionally kept lightweight to teach the essential patterns, modularization techniques, and workflows needed for scaling up to production-grade systems.

We will also leverage **AI** to generate code snippets during development.  
By following this guide, both **developer-written** and **AI-generated** code will stay unified, understandable, and maintainable across the project and future systems.

AuthMini V1 consists of **10 files** (4 backend, 4 frontend, 2 root), focusing on simplicity to prepare your team for larger and more complex applications.

This guide provides a step-by-step approach with code snippets, detailed comments, explanations, and manual testing using **Postman** for backend APIs and a browser for the frontend, all served through a unified **Fastify server** (`server.mjs` at the root).

---

## Pre-requisites

Before you begin, you should have:

- A **basic understanding of JavaScript** fundamentals (variables, functions, modules, promises).
- Familiarity with **how web development works** (basic idea of frontend and backend roles).
- Experience using a **code editor** (like VS Code) and a **terminal** for running commands.

If you need a quick refresher, we recommend reviewing:  
🔗 [MDN Web Docs: Core JavaScript concepts](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting)

---

## Introduction

### Why AuthMini?

AuthMini V1 is an ultra-simplified full-stack authentication app created to teach beginners essential building blocks of modern web development. It supports:

- **User Features**: Register, login, and logout.
- **Admin Feature**: A default admin user (`admin@example.com` / `admin123`) who can view all registered users.
- **Single-Server Setup**: One Fastify server serves both the APIs (`/api/*`) and frontend files (`/`) at `http://localhost:3000`.

By building and testing AuthMini, you’ll learn:

- **Fastify**: A fast, modern Node.js web framework for APIs.
- **Alpine.js**: A lightweight frontend framework for reactivity.
- **ES Modules (ESM)**: The modern JavaScript module system.
- **Testing Fundamentals**: Manual verification using Postman and browser.
- **Single-Server Design**: Simplified development and hosting.
- **Code Cleanliness**: Writing clear, modular, maintainable code aligned with real-world practices.

---

### Why ES Modules?

We use **ES Modules (ESM)** because:

- **Clarity**: Encourages clean `import`/`export` patterns.
- **Modern Practice**: Standard in Node.js 14+ and browsers.
- **Advanced Features**: Top-level `await`, dynamic imports.
- **Future-Ready**: Matches architecture plans for projects like **AuthCloud**.

---

### Why Single-Server Setup?

A single Fastify server:

- **Simplifies Development**: One `npm start` command runs intolerance app.
- **Removes CORS Complexity**: APIs and frontend are served under the same origin.
- **Teaches Full Integration**: Beginners learn backend-to-frontend flow naturally.
- **Accelerates Learning**: No server orchestration, just coding.

---

### Why Manual Testing?

Manual testing using **Postman** and a browser:

- **Immediate Feedback**: See results after each step.
- **Builds Debugging Skills**: Understand real API failures and fixes.
- **Prepares for Real Projects**: Manual API testing remains essential even in automated pipelines.
- **Aligns with AuthCloud Standards**: Manual validation of APIs is an expected skill.

---

### Why Code Standards and AI Guidance?

This guide enforces **strict coding guidelines** so that:

- **Your code remains readable** by any teammate or reviewer.
- **AI-generated code** (e.g., using Claude, ChatGPT, Grok) follows the same structure and style.
- **The project stays maintainable** even as it grows larger.
- **Developer productivity improves** through standardization.

All code should align with:

- Clear modular structure.
- Consistent ESM usage.
- Standardized naming conventions.
- Proper error handling and documentation.

---

### Who Is This Guide For?

This guide is intended for developers who:

- Are beginners in Fastify, Alpine.js, ESM, and API development.
- Know basic JavaScript but want to build real-world full-stack apps.
- Need structured learning without overwhelming complexity.
- Wish to follow **professional coding standards** from Day 1.
- Aim to eventually work on scalable systems.

---

## Learning Objectives

By the end of this guide, you will:

1. Build **AuthMini V1** with a clean 10-file structure using **ES Modules**.
2. Set up a **single Fastify server** (`server.mjs`) that serves both APIs and frontend.
3. Test backend APIs manually with **Postman** and interact with the frontend via the browser at `http://localhost:3000`.
4. Understand basic full-stack patterns (authentication, session handling, admin access).
5. Write **modular, readable, and maintainable code** following company guidelines.
6. Master important nuances like **environment variable usage**, **Alpine.js interactivity**, **JWT handling**, and **proper error responses**.
7. Ensure both **developer code** and **AI-generated code** follow the same style, structure, and conventions.

## Getting Started: Where to Begin?

AuthMini V1 includes a **backend** (Fastify with ESM) and **frontend** (Alpine.js), served from a single Fastify server. Here’s the starting point:

### Step 1: Understand the Requirements

- **Why**: Clarifies AuthMini’s purpose.
- **How**: Review the navigation flow:
  ```
  [Unauthenticated]
    - login -> User Dashboard (email display, logout button)
    - admin login (admin@example.com) -> Admin Dashboard (list users)
  ```
  Key features: Register, login, logout, admin user list (hardcoded admin).
- **Nuance**: Keep it simple—no tenant isolation, no caching.

### Step 2: Set Up the Project Structure

- **Why**: A minimal structure reduces complexity.
- **How**: Create the AuthMini folder structure with 10 files (initially empty).
- **Project Structure**:
  ```
  authmini/
  ├── backend/
  │   ├── data/
  │   │   └── db.mjs           # SQLite database management
  │   ├── routes/
  │   │   ├── auth.mjs         # Auth routes (register, login, logout)
  │   │   └── users.mjs        # Admin route (list users)
  ├── db/
  │   └── (authmini.db)        # SQLite database file (created later)
  ├── frontend/
  │   ├── css/
  │   │   └── styles.css       # Tailwind CSS styles
  │   ├── js/
  │   │   ├── app.js           # SPA state and navigation
  │   │   └── auth.js          # Login/register component
  │   └── index.html           # SPA entry point
  ├── server.mjs               # Fastify server entry point
  ├── package.json             # Dependencies and scripts
  └── .env                     # Environment configuration
  ```
  - **Total Files**: 10 (4 backend, 4 frontend, 2 root: `server.mjs`, `package.json`, `.env`).
  - **Explanation**:
    - **Root**: `server.mjs` runs the server, `package.json` manages dependencies, `.env` stores configuration.
    - **Backend**: `data/` for database code, `routes/` for API logic.
    - **Db**: `db/` stores `authmini.db` (created by `db.mjs`).
    - **Frontend**: SPA with one component.
- **Code Example** (Create structure):
  ```bash
  mkdir -p authmini/backend/{data,routes}
  mkdir -p authmini/db
  mkdir -p authmini/frontend/{css,js}
  touch authmini/server.mjs
  touch authmini/backend/data/db.mjs
  touch authmini/backend/routes/{auth.mjs,users.mjs}
  touch authmini/frontend/index.html
  touch authmini/frontend/css/styles.css
  touch authmini/frontend/js/{app.js,auth.js}
  touch authmini/package.json
  touch authmini/.env
  ```
  - **Explanation**: Creates all folders and files, including `db/` for the database.
- **Nuance**: `.env` should be added to `.gitignore` to prevent committing sensitive data.

### Step 3: Check System Requirements

- **Why**: Ensures necessary tools are installed to run AuthMini.
- **How**: Verify Node.js, npm, and SQLite are available.
- **Steps**:
  1. **Check Node.js** (version 18+ for ESM support):
     - Run: `node --version`
     - **Expected Output**: `v18.x.x` or higher (e.g., `v20.17.0`).
     - **If Missing**:
       - Download from [nodejs.org](https://nodejs.org/en/download/).
       - Install and add to PATH.
       - Verify: `node --version`.
     - **Common Issues**:
       - **Command not found**: Ensure Node.js is installed and in PATH.
       - **Old version**: Upgrade to Node.js 18+.
  2. **Check npm** (bundled with Node.js):
     - Run: `npm --version`
     - **Expected Output**: `6.x.x` or higher (e.g., `10.8.2`).
     - **If Missing**:
       - Reinstall Node.js (includes npm).
       - Verify: `npm --version`.
     - **Common Issues**:
       - **Command not found**: Reinstall Node.js.
  3. **Check SQLite** (bundled with `better-sqlite3`, but verify for completeness):
     - Run: `sqlite3 --version`
     - **Expected Output**: `3.x.x` or higher (e.g., `3.38.5`), or not installed (okay, as `better-sqlite3` includes it).
     - **If Needed**:
       - Download from [sqlite.org](https://www.sqlite.org/download.html).
       - Install and add to PATH (optional, as `better-sqlite3` handles it).
       - Verify: `sqlite3 --version`.
     - **Common Issues**:
       - **Command not found**: Proceed, as `better-sqlite3` provides SQLite.
       - **Build errors later**: Ensure `python`, `make`, and a C++ compiler are installed (e.g., `sudo apt-get install python3 build-essential` on Ubuntu).
  - **Note**: If all commands return valid versions, skip installation steps.
- **Testing**:
  - **Manual Check**:
    1. Run `node --version`, `npm --version`, `sqlite3 --version`.
    2. **Expected Outcome**: Node.js 18+, npm 6+, SQLite (or not installed).
    - **Common Issues**:
      - **PATH issues**: Add Node.js/SQLite to system PATH.
      - **Build tools missing**: Install `python3`, `make`, `g++`.
  - **Nuance**: Ensures a working environment before installing dependencies.

### Step 4: Install Dependencies and Configure Environment

- **Why**: Dependencies power the app, environment variables secure configuration.
- **How**: Create `package.json`, `.env`, and run `npm install`.
- **Code Example** (`package.json`):
  ```json
  {
    "name": "authmini",
    "version": "1.0.0",
    "type": "module",
    "scripts": {
      "start": "node server.mjs"
    },
    "dependencies": {
      "better-sqlite3": "^8.0.0",
      "bcrypt": "^5.0.0",
      "dotenv": "^16.0.0",
      "fastify": "^4.0.0",
      "@fastify/static": "^6.0.0",
      "jsonwebtoken": "^9.0.0"
    }
  }
  ```
  - **Explanation**:
    - **Dependencies**: Minimal set for Fastify, SQLite, auth, and static serving.
    - **ESM**: `"type": "module"` for ESM support.
    - **Script**: `start` runs the server.
- **Code Example** (`.env`):
  ```
  PORT=3000
  JWT_SECRET=your_jwt_secret_here
  ```
  - **Explanation**:
    - **Purpose**: Stores `PORT` for the server and `JWT_SECRET` for signing tokens.
    - **Why Use `.env`?**:
      - **Security**: Keeps sensitive data out of code and version control.
      - **Flexibility**: Allows environment-specific settings.
      - **Standard Practice**: Common in Node.js apps.
    - **Nuance**: Replace `your_jwt_secret_here` with a strong string (e.g., `openssl rand -base64 32`).
- **Steps**:
  1. Create `package.json` in `authmini/` with the above content.
  2. Create `.env` in `authmini/` with the above content, updating `JWT_SECRET`.
  3. Run `npm install` to install dependencies.
  - **Nuance**: `.env` is not used yet but will be needed for `server.mjs`.
- **Testing**:
  - **Manual Check**:
    1. Verify `package.json` and `.env` exist.
    2. Run `npm install`.
    3. Check for `node_modules/` in `authmini/`.
    4. **Expected Outcome**: Dependencies installed, no errors.
    - **Common Issues**:
      - **Command not found**: Ensure Node.js/npm are installed (Step 3).
      - **Permission errors**: Run `npm install` with appropriate permissions.
  - **Nuance**: Prepares for server setup.

## Snapshot of AuthMini Files

The table below summarizes all 10 files in AuthMini V1, providing a quick reference for their purpose, key variables, and methods.

| File                       | Purpose                                                   | Key Variables          | Key Methods (Arguments)                                                  |
| -------------------------- | --------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------ |
| `server.mjs`               | Fastify server entry point, serves APIs and frontend      | `fastify`, `__dirname` | `startServer()`: Starts server                                           |
| `package.json`             | Defines dependencies and scripts                          | None                   | None                                                                     |
| `.env`                     | Stores environment variables (e.g., `PORT`, `JWT_SECRET`) | `PORT`, `JWT_SECRET`   | None                                                                     |
| `backend/data/db.mjs`      | Manages SQLite database (`authmini.db`)                   | `db`, `__dirname`      | `initDb()`: Initializes database<br>`getDb()`: Returns database instance |
| `backend/routes/auth.mjs`  | Handles auth routes (register, login, logout)             | None                   | `registerRoutes(fastify, options)`: Registers auth routes                |
| `backend/routes/users.mjs` | Handles admin route (list users)                          | None                   | `registerUserRoutes(fastify, options)`: Registers user routes            |
| `frontend/index.html`      | SPA entry point, renders UI                               | None (HTML)            | None                                                                     |
| `frontend/css/styles.css`  | Styles UI with Tailwind CSS                               | None (CSS)             | None                                                                     |
| `frontend/js/app.js`       | Manages SPA state and navigation                          | None                   | `app()`: Returns Alpine.js component with `init()`, `logout()`           |
| `frontend/js/auth.js`      | Handles login/register form logic                         | None                   | `authComponent()`: Returns Alpine.js component with `submit(action)`     |

- **Nuance**: Refer to this table as you progress through the development steps below.

## Development Process: Building AuthMini Step by Step

Below is the step-by-step process with **code snippets**, **comments**, **explanations**, and **testing instructions**.

### Step 5: Set Up Fastify Server

- **Why**: Creates the server to handle requests.
- **How**: Implement a minimal `server.mjs` with Fastify and `dotenv`.
- **Code Example** (`server.mjs`):

  ```javascript
  // server.mjs
  /**
   * Entry point for AuthMini server.
   * @module server
   */
  import Fastify from 'fastify';
  import { config } from 'dotenv';

  config();
  const fastify = Fastify({ logger: true });

  /**
   * Starts the Fastify server.
   * @async
   */
  async function startServer() {
    fastify.get('/', async (request, reply) => {
      reply.send({ message: 'Server running' });
    });

    try {
      await fastify.listen({ port: process.env.PORT || 3000 });
      fastify.log.info(`Server running on port ${process.env.PORT}`);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }

  startServer();
  ```

  - **Explanation**:
    - **Minimal Setup**: Basic Fastify server with a single `/` route.
    - **ESM**: Uses `import` syntax.
    - **Dotenv**: Loads `PORT` from `.env`.
    - **Nuance**: No routes or static serving yet to keep it testable.

- **Testing**:
  - **Browser**:
    1. Run: `npm start`.
    2. Open `http://localhost:3000`.
    3. **Expected Outcome**: JSON response `{ "message": "Server running" }`.
  - **Postman**:
    1. GET `http://localhost:3000`.
    2. **Expected Response**: `200 OK` with `{ "message": "Server running" }`.
    - **Common Issues**:
      - **Port error**: Ensure `.env` has `PORT=3000`.
      - **Module not found**: Verify `npm install` ran.
  - **Nuance**: Confirms server is operational.

### Step 6: Set Up SQLite Database

- **Why**: Stores users and admin data.
- **How**: Create `backend/data/db.mjs` to initialize `authmini.db`.
- **Code Example** (`backend/data/db.mjs`):

  ```javascript
  // backend/data/db.mjs
  /**
   * SQLite database management.
   * @module data/db
   */
  import sqlite3 from 'better-sqlite3';
  import bcrypt from 'bcrypt';
  import { dirname, resolve } from 'path';
  import { fileURLToPath } from 'url';

  const __dirname = dirname(fileURLToPath(import.meta.url));
  let db;

  /**
   * Initializes database with users table and admin user.
   * @returns {Database} Database instance.
   */
  export function initDb() {
    db = sqlite3(resolve(__dirname, '../../db/authmini.db'));
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed admin user if not exists
    const adminExists = db
      .prepare('SELECT id FROM users WHERE email = ?')
      .get('admin@example.com');
    if (!adminExists) {
      const passwordHash = bcrypt.hashSync('admin123', 10);
      db.prepare(
        'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)'
      ).run('admin@example.com', passwordHash, 'admin');
    }

    return db;
  }

  /**
   * Gets database instance.
   * @returns {Database} Database instance.
   */
  export function getDb() {
    if (!db) throw new Error('Database not initialized');
    return db;
  }

  initDb();
  export { db };
  ```

  - **Explanation**:
    - **Single Database**: Creates `authmini.db` in `db/`.
    - **Admin Seeding**: Adds `admin@example.com` with `admin123`.
    - **Nuance**: Uses `db/` to avoid confusion with `backend/data/`.

- **Testing**:
  - **Manual Check**:
    1. Verify `authmini/db/` exists (created in Step 2).
    2. Create a test script (`test-db.mjs` in `authmini/`):
       ```javascript
       import { initDb } from './backend/data/db.mjs';
       initDb();
       console.log('Database initialized');
       ```
    3. Run: `node test-db.mjs`.
    4. Check `authmini/db/` for `authmini.db`.
    5. Verify the database structure and admin user:
    - If using VSCode (recommended): Install the "SQLite" extension by alexcvzz or "SQLite Viewer" extension by Florian Klampfer, then right-click on `authmini/db/authmini.db` in the explorer and select "Open Database" to browse the tables and verify the admin user exists.
    - Alternatively: Use DB Browser for SQLite or another SQLite viewer application if you prefer standalone tools.
    - **Expected Outcome**: `authmini.db` in `db/` with `users` table, one row (`admin@example.com`, `role: admin`).
    - **Common Issues**:
      - **Directory does not exist**: Ensure `authmini/db/` was created in Step 2 (`mkdir -p authmini/db`).
      - **Build errors**: Verify build tools (Step 3).
  - **Nuance**: Confirms database setup without routes.

### Step 7: Add Authentication Routes

- **Why**: Implements register, login, and logout APIs.
- **How**: Create `backend/routes/auth.mjs` and update `server.mjs`.
- **Code Example** (`backend/routes/auth.mjs`):

  ```javascript
  // backend/routes/auth.mjs
  /**
   * Authentication routes.
   * @module routes/auth
   */
  import bcrypt from 'bcrypt';
  import jwt from 'jsonwebtoken';
  import { config } from 'dotenv';
  import { getDb } from '../data/db.mjs';

  config();

  /**
   * Registers auth routes.
   * @param {FastifyInstance} fastify - Fastify instance.
   * @param {Object} options - Route options.
   */
  export async function registerRoutes(fastify, options) {
    fastify.post('/register', async (request, reply) => {
      const { email, password } = request.body;
      try {
        const db = getDb();
        // Hash password for secure storage
        const passwordHash = await bcrypt.hash(password, 10);
        db.prepare(
          'INSERT INTO users (email, password_hash) VALUES (?, ?)'
        ).run(email, passwordHash);
        reply.code(201).send({ message: 'User registered' });
      } catch (err) {
        reply.code(400).send({ error: 'Registration failed: Email exists' });
      }
    });

    fastify.post('/login', async (request, reply) => {
      const { email, password } = request.body;
      try {
        const db = getDb();
        const user = db
          .prepare('SELECT * FROM users WHERE email = ?')
          .get(email);
        // Verify credentials
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
          throw new Error('Invalid credentials');
        }
        // Generate JWT
        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h',
          }
        );
        reply.send({ token, user: { email: user.email, role: user.role } });
      } catch (err) {
        reply.code(401).send({ error: err.message });
      }
    });

    fastify.post('/logout', async (request, reply) => {
      reply.send({ message: 'Logged out' });
    });
  }
  ```

- **Code Example** (Update `server.mjs`):

  ```javascript
  // server.mjs
  /**
   * Entry point for AuthMini server.
   * @module server
   */
  import Fastify from 'fastify';
  import { config } from 'dotenv';
  import { registerRoutes } from './backend/routes/auth.mjs';

  config();
  const fastify = Fastify({ logger: true });

  /**
   * Starts the Fastify server.
   * @async
   */
  async function startServer() {
    await fastify.register(registerRoutes, { prefix: '/api' });

    fastify.get('/', async (request, reply) => {
      reply.send({ message: 'Server running' });
    });

    try {
      await fastify.listen({ port: process.env.PORT || 3000 });
      fastify.log.info(`Server running on port ${process.env.PORT}`);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }

  startServer();
  ```

  - **Explanation**:
    - **Update**: Adds auth routes under `/api`.
    - **Nuance**: Keeps minimal `/` route for testing.

- **Testing**:
  - **Postman**:
    1. Run: `npm start`.
    2. POST `http://localhost:3000/api/register`.
       - Body: `{"email":"user@example.com","password":"user123"}`.
       - **Expected Response**: `201 Created` with `{ message: "User registered" }`.
    3. POST `http://localhost:3000/api/login`.
       - Body: `{"email":"admin@example.com","password":"admin123"}`.
       - **Expected Response**: `200 OK` with `{ token, user: { email, role } }`.
    4. POST `http://localhost:3000/api/logout`.
       - **Expected Response**: `200 OK` with `{ message: "Logged out" }`.
    - **Common Issues**:
      - **401**: Verify admin credentials or `.env` has `JWT_SECRET`.
      - **400**: Check for duplicate email.
      - **Database error**: Ensure `authmini/db/` exists.
  - **Nuance**: Tests auth APIs without frontend.

### Step 8: Add Admin Route

- **Why**: Allows admin to list users.
- **How**: Create `backend/routes/users.mjs` and update `server.mjs`.
- **Code Example** (`backend/routes/users.mjs`):

  ```javascript
  // backend/routes/users.mjs
  /**
   * Admin user list route.
   * @module routes/users
   */
  import jwt from 'jsonwebtoken';
  import { config } from 'dotenv';
  import { getDb } from '../data/db.mjs';

  config();

  /**
   * Registers user routes.
   * @param {FastifyInstance} fastify - Fastify instance.
   * @param {Object} options - Route options.
   */
  export async function registerUserRoutes(fastify, options) {
    fastify.get('/users', async (request, reply) => {
      const token = request.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        reply.code(401).send({ error: 'No token provided' });
        return;
      }
      try {
        // Verify JWT and check admin role
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') {
          reply.code(403).send({ error: 'Admin access required' });
          return;
        }
        const db = getDb();
        const users = db
          .prepare('SELECT id, email, role, created_at FROM users')
          .all();
        reply.send({ users });
      } catch (err) {
        reply.code(401).send({ error: 'Invalid token' });
      }
    });
  }
  ```

- **Code Example** (Update `server.mjs`):

  ```javascript
  // server.mjs
  /**
   * Entry point for AuthMini server.
   * @module server
   */
  import Fastify from 'fastify';
  import { config } from 'dotenv';
  import { registerRoutes } from './backend/routes/auth.mjs';
  import { registerUserRoutes } from './backend/routes/users.mjs';

  config();
  const fastify = Fastify({ logger: true });

  /**
   * Starts the Fastify server.
   * @async
   */
  async function startServer() {
    await fastify.register(registerRoutes, { prefix: '/api' });
    await fastify.register(registerUserRoutes, { prefix: '/api' });

    fastify.get('/', async (request, reply) => {
      reply.send({ message: 'Server running' });
    });

    try {
      await fastify.listen({ port: process.env.PORT || 3000 });
      fastify.log.info(`Server running on port ${process.env.PORT}`);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }

  startServer();
  ```

  - **Explanation**:
    - **Admin Route**: Adds `/api/users` for admin.
    - **Server Update**: Registers user routes.
    - **Nuance**: Verifies admin role via JWT.

- **Testing**:
  - **Postman**:
    1. POST `http://localhost:3000/api/login`.
       - Body: `{"email":"admin@example.com","password":"admin123"}`.
       - Copy `token` from response.
    2. GET `http://localhost:3000/api/users`.
       - Header: `Authorization: Bearer [token]`.
       - **Expected Response**: `200 OK` with `{ users: [...] }`.
    3. Try with no token or user token.
       - **Expected Response**: `401 Unauthorized` or `403 Forbidden`.
    - **Common Issues**:
      - **401**: Verify token or `.env` has `JWT_SECRET`.
      - **403**: Use admin token.
      - **Database error**: Ensure `authmini/db/` exists.
  - **Nuance**: Tests admin API without frontend.

### Step 9: Set Up Frontend UI

- **Why**: Creates the UI for user interaction.
- **How**: Create `frontend/index.html` and `frontend/css/styles.css`, update `server.mjs` for static serving.
- **Code Example** (`frontend/index.html`):
  ```html
  <!-- frontend/index.html -->
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>AuthMini</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="css/styles.css" />
    </head>
    <body class="bg-gray-100 min-h-screen flex items-center justify-center">
      <div class="form-container">
        <h2 class="text-2xl font-bold mb-4 text-white">AuthMini</h2>
        <p class="text-white">Welcome to AuthMini</p>
      </div>
    </body>
  </html>
  ```
- **Code Example** (`frontend/css/styles.css`):
  ```css
  /* frontend/css/styles.css */
  .form-container {
    background-color: #374151; /* bg-gray-700 */
    padding: 2rem; /* p-8 */
    border-radius: 0.5rem; /* rounded-lg */
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3); /* shadow-lg */
    max-width: 28rem; /* max-w-md (28rem = 448px) */
    width: 100%; /* w-full */
    color: #ffffff; /* text-white */
  }
  ```
- **Code Example** (Update `server.mjs`):

  ```javascript
  // server.mjs
  /**
   * Entry point for AuthMini server.
   * @module server
   */
  import Fastify from 'fastify';
  import fastifyStatic from '@fastify/static';
  import { config } from 'dotenv';
  import { registerRoutes } from './backend/routes/auth.mjs';
  import { registerUserRoutes } from './backend/routes/users.mjs';
  import { join, dirname } from 'path';
  import { fileURLToPath } from 'url';

  config();
  const fastify = Fastify({ logger: true });
  const __dirname = dirname(fileURLToPath(import.meta.url));

  /**
   * Starts the Fastify server.
   * @async
   */
  async function startServer() {
    // Serve frontend files
    await fastify.register(fastifyStatic, {
      root: join(__dirname, 'frontend'),
      prefix: '/',
      setHeaders: (res) => {
        res.setHeader('Cache-Control', 'public, max-age=3600');
      },
    });

    await fastify.register(registerRoutes, { prefix: '/api' });
    await fastify.register(registerUserRoutes, { prefix: '/api' });

    try {
      await fastify.listen({ port: process.env.PORT || 3000 });
      fastify.log.info(`Server running on port ${process.env.PORT}`);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }

  startServer();
  ```

  - **Explanation**:
    - **HTML**: Minimal UI with a welcome message.
    - **CSS**: Basic Tailwind styling.
    - **Server Update**: Adds `@fastify/static` to serve `frontend/`.
    - **Nuance**: No JavaScript yet, testable UI.

- **Testing**:
  - **Browser**:
    1. Run: `npm start`.
    2. Open `http://localhost:3000`.
    3. **Expected Outcome**: Page with “AuthMini” heading in a styled gray box.
    - **Common Issues**:
      - **404**: Verify `frontend/` and `@fastify/static` in `server.mjs`.
      - **No styles**: Check `styles.css` path.
  - **Nuance**: Confirms static UI rendering.

### Step 10: Add Frontend Logic

- **Why**: Adds interactivity for login, register, and dashboards.
- **How**: Create `frontend/js/app.js`, `frontend/js/auth.js`, and update `frontend/index.html`.
- **Code Example** (`frontend/js/app.js`):

  ```javascript
  // frontend/js/app.js
  /**
   * SPA state and navigation.
   * @module js/app
   */
  function app() {
    return {
      user: null,
      users: [],
      /**
       * Initializes SPA state based on stored token.
       * @async
       */
      async init() {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            // Decode JWT to set user
            const payload = JSON.parse(atob(token.split('.')[1]));
            this.user = { email: payload.email, role: payload.role };
            if (this.user.role === 'admin') {
              // Fetch users for admin
              const res = await axios.get('/api/users', {
                headers: { Authorization: `Bearer ${token}` },
              });
              this.users = res.data.users;
            }
          } catch (err) {
            localStorage.removeItem('token');
          }
        }
      },
      /**
       * Logs out user and resets UI.
       */
      logout() {
        localStorage.removeItem('token');
        window.location.reload();
      },
    };
  }

  window.app = app;
  ```

  - **Explanation**:
    - **Purpose**: Manages SPA state and navigation using Alpine.js.
    - **Key Functionality**:
      - `init()`: Checks for a stored JWT in `localStorage`, decodes it to set `user`, and fetches the user list for admins via `/api/users`.
      - `logout()`: Clears the token and reloads the page to reset the UI.
    - **Change**: The `app` function is explicitly exposed globally via `window.app = app` to ensure Alpine.js can access it in `index.html` via `x-data="app()"`.
    - **Nuance**: Error handling in `init()` clears invalid tokens to prevent UI issues.

- **Code Example** (`frontend/js/auth.js`):

  ```javascript
  // frontend/js/auth.js
  /**
   * Authentication component.
   * @module js/auth
   */
  function authComponent() {
    return {
      email: '',
      password: '',
      error: '',
      /**
       * Submits register or login request.
       * @param {string} action - 'register' or 'login'.
       * @async
       */
      async submit(action) {
        try {
          const res = await axios.post(`/api/${action}`, {
            email: this.email,
            password: this.password,
          });
          if (action === 'login') {
            // Store token and reload
            localStorage.setItem('token', res.data.token);
            window.location.reload();
          } else {
            this.error = 'Registration successful. Please login.';
          }
        } catch (err) {
          this.error = err.response?.data?.error || 'An error occurred';
        }
      },
    };
  }

  window.authComponent = authComponent;
  ```

  - **Explanation**:
    - **Purpose**: Handles login and register form logic with Alpine.js.
    - **Key Functionality**:
      - `submit(action)`: Sends POST requests to `/api/register` or `/api/login`, stores the token for login, or displays a success message for registration.
      - `error`: Displays API errors or success messages (e.g., “Registration successful”).
    - **Change**: The `authComponent` function is exposed globally via `window.authComponent = authComponent` to support Alpine.js binding in `index.html` via `x-data="authComponent()"`.
    - **Nuance**: Uses Axios for HTTP requests, with error handling for user feedback.

- **Code Example** (Update `frontend/index.html`):

  ```html
  <!-- frontend/index.html -->
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>AuthMini</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="css/styles.css" />
    </head>
    <body
      x-data="app()"
      class="bg-gray-100 min-h-screen flex items-center justify-center"
    >
      <!-- Login/Register Form -->
      <div x-show="!user" class="form-container">
        <div x-data="authComponent()">
          <h2 class="text-2xl font-bold mb-4 text-white">
            AuthMini Login / Register
          </h2>
          <input
            x-model="email"
            type="email"
            placeholder="Email"
            class="w-full text-gray-700 p-2 mb-4 rounded"
          />
          <input
            x-model="password"
            type="password"
            placeholder="Password"
            class="w-full text-gray-700 p-2 mb-4 rounded"
          />
          <button @click="submit('register')" class="btn-primary">
            Register
          </button>
          <button @click="submit('login')" class="btn-primary ml-2">
            Login
          </button>
          <p x-text="error" class="text-red-500 mt-2"></p>
        </div>
      </div>

      <!-- User Dashboard -->
      <div
        x-show="user !== null && user.role === 'user'"
        class="form-container"
      >
        <h2 class="text-2xl font-bold mb-4 text-white">
          Welcome, <span x-text="user?.email || 'User'"></span>
        </h2>
        <button @click="logout()" class="btn-primary">Logout</button>
      </div>

      <!-- Admin Dashboard -->
      <div
        x-show="user !== null && user.role === 'admin'"
        class="form-container"
      >
        <h2 class="text-2xl font-bold mb-4 text-white">Admin Dashboard</h2>
        <h3 class="text-lg font-semibold mb-2 text-white">Users</h3>
        <ul class="mb-4">
          <template x-for="u in users" :key="u.id">
            <li
              class="text-white"
              x-text="`${u.email} (${u.role}) - Joined: ${new Date(u.created_at).toLocaleDateString()}`"
            ></li>
          </template>
        </ul>
        <button @click="logout()" class="btn-primary">Logout</button>
      </div>

      <script src="js/app.js" defer></script>
      <script src="js/auth.js" defer></script>
      <script
        src="https://cdn.jsdelivr.net/npm/axios@1.6.8/dist/axios.min.js"
        defer
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js"
        defer
      ></script>
    </body>
  </html>
  ```

  - **Explanation**:
    - **Purpose**: Serves as the SPA entry point, rendering login/register forms and dashboards.
    - **Key Changes**:
      - **Script Loading**: Removed `type="module"` from script tags and added `defer` to ensure scripts load after the DOM, aligning with modern practices and avoiding module-specific issues in some browsers.
      - **Axios and Alpine.js**: Updated to specific CDN versions (`axios@1.6.8`, `alpinejs@3.14.1`) for reliability.
      - **Input Styling**: Added `text-gray-700` to inputs for better contrast against the white placeholder text.
      - **User Dashboard**: Updated `x-show="user !== null && user.role === 'user'"` and `x-text="user?.email || 'User'"` for null safety and fallback display.
      - **Admin Dashboard**: Used `x-show="user !== null && user.role === 'admin'"` for consistency and clarity.
    - **Nuance**: The `defer` attribute simplifies script loading without requiring `type="module"`, and explicit CDN versions ensure reproducibility.

- **Code Example** (Update `frontend/css/styles.css`):

  ```css
  /* frontend/css/styles.css */
  .form-container {
    background-color: #374151; /* bg-gray-700 */
    padding: 2rem; /* p-8 */
    border-radius: 0.5rem; /* rounded-lg */
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3); /* shadow-lg */
    max-width: 28rem; /* max-w-md (28rem = 448px) */
    width: 100%; /* w-full */
    color: #ffffff; /* text-white */
  }

  .btn-primary {
    background-color: #4b5563; /* bg-gray-600 */
    color: #ffffff; /* text-white */
    padding: 0.5rem 1rem; /* px-4 py-2 */
    border-radius: 0.375rem; /* rounded-md */
    transition: background-color 0.3s ease;
    cursor: pointer;
  }

  .btn-primary:hover {
    background-color: #6b7280; /* hover:bg-gray-500 */
  }
  ```

  - **Explanation**:
    - **Purpose**: Styles the UI with Tailwind CSS classes and custom properties.
    - **Note**: No changes were made to `styles.css` based on the provided files, so it remains as previously defined. Included here for completeness, as it’s referenced in `index.html`.
    - **Nuance**: The CSS supports the updated input styling (`text-gray-700`) in `index.html` for better readability.

- **Testing**:
  - **Browser**:
    1. Run: `npm start`.
    2. Open `http://localhost:3000`.
    3. Register with `user@example.com` and `user123`, then login.
    4. **Expected Outcome**: User dashboard displays “Welcome, user@example.com” with a logout button.
    5. Login as `admin@example.com` with `admin123`.
    6. **Expected Outcome**: Admin dashboard shows a list of users (e.g., “user@example.com (user) - Joined: [date]”).
    7. Click logout from either dashboard.
    8. **Expected Outcome**: Returns to the login/register form.
    - **Common Issues**:
      - **API errors**: Verify backend routes (`/api/register`, `/api/login`, `/api/users`) and `.env` has `JWT_SECRET`.
      - **No dashboard**: Check `localStorage` for `token` in the browser’s developer tools.
      - **Script errors**: Ensure `app.js`, `auth.js`, Axios, and Alpine.js scripts load correctly (check browser console).
      - **UI not updating**: Verify `x-data="app()"` and `x-data="authComponent()"` are set, and global `window.app`/`window.authComponent` are defined.
  - **Nuance**: Tests full frontend functionality, including the updated script loading and null-safe conditions in `index.html`. The `defer` attribute ensures scripts execute in order, and explicit CDN versions prevent version mismatches.

### Step 11: Full Application Testing

- **Why**: Verifies entire app.
- **How**:
  - **Backend** (Postman):
    1. Register user:
       - POST `http://localhost:3000/api/register`.
       - Body: `{"email":"user@example.com","password":"user123"}`.
       - **Expected Response**: `201 Created` with `{ message: "User registered" }`.
    2. Login user:
       - POST `http://localhost:3000/api/login`.
       - Body: `{"email":"user@example.com","password":"user123"}`.
       - **Expected Response**: `200 OK` with `{ token, user: { email, role } }`.
    3. Login admin:
       - POST `http://localhost:3000/api/login`.
       - Body: `{"email":"admin@example.com","password":"admin123"}`.
       - **Expected Response**: `200 OK` with `{ token, user: { email, role } }`.
    4. List users (admin):
       - GET `http://localhost:3000/api/users`.
       - Header: `Authorization: Bearer [admin token]`.
       - **Expected Response**: `200 OK` with `{ users: [...] }`.
    - **Common Issues**:
      - **401/403**: Verify tokens, roles, or `.env` has `JWT_SECRET`.
      - **Database error**: Ensure `authmini/db/` exists.
  - **Frontend** (Browser):
    1. Run: `npm start`.
    2. Open `http://localhost:3000`.
    3. Register `user@example.com`, login, verify user dashboard.
    4. Login as `admin@example.com`, verify admin dashboard with user list.
    5. Logout from either.
    - **Expected Outcome**: Correct dashboards, logout returns to login form.
    - **Common Issues**:
      - **No dashboard**: Check `localStorage` for `token`.
      - **No users**: Verify admin API call and `.env`.
- **Nuance**: Confirms full functionality.

## Nuances and Art of Coding

AuthMini V1 teaches **simplicity** and **clarity**:

1. **Progression**: Files introduced one at a time, testable at each step.
2. **Minimalism**: 10 files, minimal features.
3. **Readability**: JSDoc, clear names, comments.
4. **Error Handling**: Clear messages.
5. **Environment Variables**: Secure configuration.
6. **ESM**: Modern JavaScript practices.

## Commenting Guidelines

To ensure **readability**, **maintainability**, and **consistency** in AuthMini V1, we follow a structured commenting approach using **JSDoc** for documentation and **essential inline comments** for business logic. This aligns with professional standards and ensures both developer-written and AI-generated code are clear to all team members.

### JSDoc Comments

JSDoc comments are used to document modules, functions, and key parameters, providing a high-level overview for developers and tools (e.g., IDEs, documentation generators). They follow these guidelines:

- **Module Documentation**: Every file starts with a `@module` tag to identify its purpose (e.g., `@module server` in `server.mjs`).
- **Function Documentation**: Major functions include a JSDoc block with:
  - A brief description of the function’s purpose.
  - `@param` tags for parameters, specifying type and purpose.
  - `@returns` tags for return values, including type.
  - `@async` tag for asynchronous functions.
  - Example: The `startServer` function in `server.mjs` includes `@async` and a description.
- **Consistency**: Use standard JSDoc tags (e.g., `@param`, `@returns`) and avoid redundant details already clear from the code.
- **Placement**: JSDoc blocks appear immediately before the module or function they document.

### Inline Comments

Inline comments focus on explaining **business logic** and **critical operations**, avoiding clutter from obvious syntax. They adhere to these principles:

- **Purpose**: Clarify "what" and "why" for key steps, such as database operations, API responses, or UI state changes.
  - Example: In `db.mjs`, `// Hash admin password and insert admin user` explains the admin seeding logic.
- **Minimalism**: Comments are concise, used only where logic isn’t self-explanatory (e.g., no comments for trivial assignments like `let x = 1`).
- **Business Focus**: Highlight decisions tied to AuthMini’s functionality, such as:
  - Token verification in `users.mjs` (`// Restrict access to admin role`).
  - Error handling in `auth.js` (`// Display error message from API or fallback`).
- **Format**: Use single-line `//` comments for brevity, placed above or beside the relevant line.
- **Avoid Redundancy**: Don’t repeat what JSDoc or code already conveys (e.g., no comment for `import Fastify from 'fastify'`).

### Why This Approach?

- **Readability**: JSDoc provides structured documentation for tools and newcomers, while inline comments guide developers through complex logic.
- **Maintainability**: Clear comments reduce onboarding time and make future updates easier.
- **AI Compatibility**: Standardized comments ensure AI-generated code (e.g., from Grok) aligns with human-written code.
- **Professionalism**: Matches industry standards for Node.js and frontend development.

### Example

In `auth.mjs`:

```javascript
// Hash password for secure storage
const passwordHash = await bcrypt.hash(password, 10);
// Insert new user into database
db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(
  email,
  passwordHash
);
```

- **JSDoc**: Documents the `registerRoutes` function with parameters and purpose.
- **Inline**: Explains password hashing and user insertion, focusing on security and database operations.

By following these guidelines, AuthMini’s codebase remains clear, consistent, and ready for scaling to projects like AuthCloud.

## Preparing for AuthCloud

AuthMini V1 prepares for AuthCloud by teaching:

- **Basic Auth**: Register, login, role-based access.
- **Modularity**: ESM imports, file structure.
- **Security**: JWTs, password hashing, `.env`.
- **Testing**: Manual verification.
- **Single-Server**: Foundation for deployment.

## Conclusion

AuthMini V1 with ESM, a single server, and progressive development is a beginner-friendly way to learn full-stack development. The snapshot table, code snippets, comments, and testing instructions help your team master Fastify, Alpine.js, and basic practices. Focus on **simplicity**, **readability**, **security**, and **testing**, and use this foundation to explore AuthCloud’s stack.

### Next Steps

- **Build It**: Follow the steps, testing at each.
- **Test It**: Use Postman and `http://localhost:3000`.
- **Experiment**: Add a feature (e.g., password reset).
- **Read More**:
  - [Fastify Guide](https://www.fastify.io/docs/latest/Guides/Getting-Started/)
  - [Alpine.js Documentation](https://alpinejs.dev/)
  - [Node.js ESM](https://nodejs.org/api/esm.html)
  - [Postman Documentation](https://learning.postman.com/docs/getting-started/introduction/)

Happy coding!
