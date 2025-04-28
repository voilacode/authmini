# Learning Guide for Building AuthMini V1

**Version**: 1.1  
**Application**: AuthMini V1  
**Date**: April 28, 2025  
**Purpose**: This guide is designed for developers new to **Fastify**, **Alpine.js**, and **JavaScript** to build **AuthMini V1**, a minimal authentication system using **ES Modules (ESM)**. It provides a step-by-step approach with code snippets, detailed comments, explanations, and manual testing using **Postman** for the backend and a browser for the frontend, all served from a single Fastify server (`server.mjs` in the root directory). AuthMini includes **10 files** (4 backend, 4 frontend, 2 root), focusing on simplicity to prepare your team for larger systems like AuthCloud.

## Introduction

### Why AuthMini?

AuthMini V1 is a simplified authentication app designed to teach beginners full-stack development. It supports:

- **User Features**: Register, login, and logout.
- **Admin Feature**: A default admin user (`admin@example.com`, `admin123`) who can view a list of registered users.
- **Single-Server Setup**: One Fastify server serves APIs (`/api/*`) and frontend files (`/`) at `http://localhost:3000`.

By building and testing AuthMini, you’ll learn:

- **Fastify**: A fast Node.js framework for RESTful APIs.
- **Alpine.js**: A lightweight framework for reactive frontends.
- **ES Modules (ESM)**: Modern JavaScript module syntax.
- **Single-Server Setup**: Simplifies development and deployment.
- **Testing**: Manual verification with Postman and browser.
- **Coding Basics**: Writing clean, modular code.

### Why ES Modules?

ES Modules are the standard for modern JavaScript, offering:

- **Clarity**: Explicit `import`/`export` syntax.
- **Future Compatibility**: Supported by Node.js 14+ and browsers.
- **Features**: Top-level `await`, dynamic imports.
- **Alignment with AuthCloud**: Prepares for modern stacks.

### Why Single-Server Setup?

Using one Fastify server:

- **Simplifies Workflow**: One command (`npm start`) runs everything.
- **Eliminates CORS**: Same-origin requests avoid complexity.
- **Reduces Learning Curve**: Beginners focus on coding, not server management.
- **Teaches Integration**: Combines backend and frontend seamlessly.

### Why Manual Testing?

Manual testing with **Postman** and browser:

- **Validates Progress**: Ensures each step works.
- **Teaches Debugging**: Identifies issues (e.g., wrong credentials).
- **Builds Confidence**: Beginners see immediate results.
- **Aligns with AuthCloud**: Manual testing is common in API development.

### Who Is This Guide For?

This guide is for developers who:

- Are new to Fastify, Alpine.js, ESM, and testing.
- Have basic JavaScript knowledge but want to learn full-stack basics.
- Need clear explanations and minimal complexity.
- Want to prepare for complex systems like AuthCloud.

### Learning Objectives

By the end of this guide, you’ll:

1. Build AuthMini V1 using ESM with a single server (`server.mjs` in root).
2. Test backend APIs with Postman and frontend UI at `http://localhost:3000`.
3. Understand a minimal 10-file structure.
4. Apply basic coding principles like modularity and error handling.
5. Adopt a consistent code style for Fastify, Alpine.js, and CSS.
6. Master nuances like ESM imports, environment variables, and single-server workflows.

## Getting Started: Where to Begin?

AuthMini V1 includes a **backend** (Fastify with ESM) and **frontend** (Alpine.js, Tailwind CSS), served from a single Fastify server. Here’s the starting point:

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
  │   │   └── styles.css       # CSS styles
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
  - **Frontend**: SPA with one component, styled with CSS and Tailwind.
- **Nuance**: `db/` is distinct from `backend/data/` to avoid confusion.
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
- **Nuance**: `.env` should be added to `.gitignore`.

### Step 3: Check System Requirements

- **Why**: Ensures necessary tools are installed.
- **How**: Verify Node.js, npm, and SQLite.
- **Steps**:
  1. **Check Node.js** (14+ for ESM):
     - Run: `node --version`
     - Expected: `v14.x.x` or higher (e.g., `v20.17.0`).
     - If missing: Install from [nodejs.org](https://nodejs.org).
  2. **Check npm**:
     - Run: `npm --version`
     - Expected: `6.x.x` or higher (e.g., `10.8.2`).
     - If missing: Reinstall Node.js.
  3. **Check SQLite** (bundled with `better-sqlite3`):
     - Run: `sqlite3 --version`
     - Expected: `3.x.x` or not installed (okay, as `better-sqlite3` includes it).
     - If needed: Install from [sqlite.org](https://www.sqlite.org).
- **Testing**:
  - Run `node --version`, `npm --version`, `sqlite3 --version`.
  - Expected: Node.js 14+, npm 6+, SQLite (or not installed).
  - Common Issues: PATH issues, missing build tools (`python3`, `make`, `g++`).

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
- **Code Example** (`.env`):
  ```
  PORT=3000
  JWT_SECRET=your_jwt_secret_here
  ```
- **Steps**:
  1. Create `package.json` and `.env` in `authmini/`.
  2. Update `JWT_SECRET` (e.g., `openssl rand -base64 32`).
  3. Run: `npm install`.
- **Testing**:
  - Verify `node_modules/` exists.
  - Common Issues: Permission errors, missing Node.js.

## Snapshot of AuthMini Files

| File                       | Purpose                    | Key Variables          | Key Methods (Arguments)                |
| -------------------------- | -------------------------- | ---------------------- | -------------------------------------- |
| `server.mjs`               | Fastify server entry point | `fastify`, `__dirname` | `startServer()`                        |
| `package.json`             | Dependencies and scripts   | None                   | None                                   |
| `.env`                     | Environment variables      | `PORT`, `JWT_SECRET`   | None                                   |
| `backend/data/db.mjs`      | SQLite database            | `db`, `__dirname`      | `initDb()`, `getDb()`                  |
| `backend/routes/auth.mjs`  | Auth routes                | None                   | `registerRoutes(fastify, options)`     |
| `backend/routes/users.mjs` | Admin route                | None                   | `registerUserRoutes(fastify, options)` |
| `frontend/index.html`      | SPA entry point            | None                   | None                                   |
| `frontend/css/styles.css`  | Styles UI                  | None                   | None                                   |
| `frontend/js/app.js`       | SPA state/navigation       | None                   | `app()`: `init()`, `logout()`          |
| `frontend/js/auth.js`      | Login/register logic       | None                   | `authComponent()`: `submit(action)`    |

## Development Process

### Step 5: Set Up Fastify Server

- **Why**: Creates the server for APIs and frontend.
- **How**: Implement `server.mjs` with Fastify, static serving, and routes.
- **Code Example** (`server.mjs`):

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
    await fastify.register(fastifyStatic, {
      root: join(__dirname, 'frontend'),
      prefix: '/',
      setHeaders: (res) => {
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.setHeader('Content-Type', 'text/css'); // Ensure CSS MIME type
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
  - Serves `frontend/` for HTML, CSS, JS.
  - Sets `Content-Type: text/css` for CSS files.
  - Registers API routes under `/api`.
- **Testing**:
  - Run: `npm start`.
  - Browser: `http://localhost:3000` → Should serve `index.html` (empty for now).
  - Postman: `GET http://localhost:3000` → `200 OK`.

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

    // Seed admin user
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

- **Testing**:
  - Create a test script (`test-db.mjs`):
    ```javascript
    import { initDb } from './backend/data/db.mjs';
    initDb();
    console.log('Database initialized');
    ```
  - Run: `node test-db.mjs`.
  - Check: `authmini/db/authmini.db` exists, `users` table has admin user.

### Step 7: Add Authentication Routes

- **Why**: Implements register, login, logout APIs.
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
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
          throw new Error('Invalid credentials');
        }
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

- **Testing**:
  - Postman:
    - `POST http://localhost:3000/api/register` with `{"email":"user@example.com","password":"user123"}` → `201 Created`.
    - `POST http://localhost:3000/api/login` with `{"email":"admin@example.com","password":"admin123"}` → `200 OK` with token.
    - `POST http://localhost:3000/api/logout` → `200 OK`.

### Step 8: Add Admin Route

- **Why**: Allows admin to list users.
- **How**: Create `backend/routes/users.mjs` (minified version from earlier).
- **Code Example** (`backend/routes/users.mjs`):
  ```javascript
  // backend/routes/users.mjs
  import jwt from 'jsonwebtoken';
  import { config } from 'dotenv';
  import { getDb } from '../data/db.mjs';
  config();
  export async function registerUserRoutes(fastify, options) {
    fastify.get('/users', async (request, reply) => {
      const token = request.headers.authorization?.replace('Bearer ', '');
      if (!token) return reply.code(401).send({ error: 'No token provided' });
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin')
          return reply.code(403 | 'Admin access required');
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
- **Testing**:
  - Postman:
    - `GET http://localhost:3000/api/users` with `Authorization: Bearer <admin_token>` → `200 OK` with `{ users: [...] }`.
    - Without token or non-admin token → `401` or `403`.

### Step 9: Test Backend End-to-End

- **Why**: Ensures APIs work together.
- **How**: Simulate user and admin flows in Postman.
- **Steps**:
  1. Register: `POST /api/register` (`user@example.com`, `user123`) → `201`.
  2. Login: `POST /api/login` (`user@example.com`, `user123`) → `200`, save token.
  3. Admin Login: `POST /api/login` (`admin@example.com`, `admin123`) → `200`, save admin token.
  4. List Users: `GET /api/users` with admin token → `200`, includes `user@example.com`.
  5. Logout: `POST /api/logout` → `200`.

### Step 10: Build the Frontend

- **Why**: Creates the SPA for user interaction.
- **How**: Implement `index.html`, `styles.css`, `app.js`, `auth.js`.
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
      <link rel="stylesheet" href="/css/styles.css" />
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
            class="w-full p-2 mb-4 rounded bg-gray-800 text-white"
          />
          <input
            x-model="password"
            type="password"
            placeholder="Password"
            class="w-full p-2 mb-4 rounded bg-gray-800 text-white"
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

      <!-- Scripts -->
      <script src="/js/app.js" defer></script>
      <script src="/js/auth.js" defer></script>
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

- **Code Example** (`frontend/css/styles.css`):

  ```css
  /* frontend/css/styles.css */
  .form-container {
    background-color: #4b5563;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    max-width: 28rem;
    width: 100%;
    color: #ffffff;
  }

  .btn-primary {
    background-color: #374151;
    color: #ffffff;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
  }

  .btn-primary:hover {
    background-color: #6b7280;
  }
  ```

- **Code Example** (`frontend/js/app.js`):

  ```javascript
  // frontend/js/app.js
  /**
   * SPA state and navigation.
   * @module js/app
   */
  console.log('app.js loaded');

  function app() {
    return {
      user: null,
      users: [],
      async init() {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            this.user = { email: payload.email, role: payload.role };
            if (this.user.role === 'admin') {
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
      logout() {
        localStorage.removeItem('token');
        window.location.reload();
      },
    };
  }

  window.app = app;
  ```

- **Code Example** (`frontend/js/auth.js`):

  ```javascript
  // frontend/js/auth.js
  /**
   * Authentication component.
   * @module js/auth
   */
  console.log('auth.js loaded');

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

- **Testing**:
  - Browser: Open `http://localhost:3000`.
  - Console: Check for `app.js loaded`, `auth.js loaded`.
  - UI:
    - Initial: Login/register form (dark gray background, white text).
    - Register: `user@example.com`, `user123` → “Registration successful.”
    - Login: `user@example.com`, `user123` → User dashboard.
    - Admin Login: `admin@example.com`, `admin123` → Admin dashboard with user list.
    - Logout: Returns to login form.
  - Network: Verify `200 OK` for `css/styles.css`, `js/app.js`, `js/auth.js`, Axios, Alpine.js.
  - Common Issues:
    - Styles missing: Clear cache (`Ctrl+Shift+R`), check `Content-Type: text/css`.
    - Errors: Inspect console, verify paths.

### Step 11: Test Frontend End-to-End

- **Why**: Ensures frontend integrates with backend.
- **How**: Test user and admin flows in browser.
- **Steps**:
  1. Open `http://localhost:3000`.
  2. Register (`user@example.com`, `user123`) → Success message.
  3. Login (`user@example.com`, `user123`) → User dashboard.
  4. Logout → Login form.
  5. Admin Login (`admin@example.com`, `admin123`) → Admin dashboard.
  6. Verify user list includes `user@example.com`.

### Step 12: Debug and Refine

- **Why**: Catch edge cases.
- **How**: Test invalid inputs, network failures.
- **Examples**:
  - Register with existing email → `400` error.
  - Login with wrong password → `401` error.
  - Access `/api/users` without token → `401` error.
- **Frontend**:
  - Clear `localStorage` and reload → Login form.
  - Check console for errors during async calls.

## Conclusion

You’ve built AuthMini V1, a minimal full-stack app with:

- **Backend**: Fastify, SQLite, JWT, ESM.
- **Frontend**: Alpine.js, Tailwind CSS, Axios.
- **Testing**: Postman for APIs, browser for UI.
- **Structure**: 10 files, single server.

This prepares you for AuthCloud by teaching:

- Modular code with ESM.
- API and SPA integration.
- Manual testing workflows.

**Next Steps**:

- Explore Fastify plugins for additional features.
- Add unit tests with `tap` or `jest`.
- Extend AuthMini with password reset or OAuth.
