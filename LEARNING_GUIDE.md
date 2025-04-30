# Learning Guide for Building AuthMini V2

**Version**: 2.0  
**Application**: AuthMini V2  
**Created by**: Krishna Teja GS  
**Date**: April 30, 2025

## Purpose

This guide builds on **AuthMini V1** to enhance developers' skills by introducing **code quality**, **feature enhancements**, **basic testing**, and **deployment concepts** while extending the existing codebase. It prepares developers for advanced systems like **AuthCloud** by focusing on maintainable, well-documented, and testable code.

**AuthMini V2** extends the V1 authentication app by adding features like profile management, enhanced admin capabilities, and improved UX, while introducing **ESLint**, **JSDoc documentation**, a **service layer**, **basic testing**, and **CI/CD deployment**. The goal is to teach professional coding practices, project organization, feature development, and deployment workflows without overwhelming complexity.

We continue leveraging **AI** to generate code snippets, ensuring both **developer-written** and **AI-generated** code align with strict standards for readability, maintainability, and consistency. The single **Fastify server** remains, serving APIs (`/api/*`) and frontend (`/`) at `http://localhost:3000`.

AuthMini V2 adds **6 new files** (2 backend, 2 frontend, 2 root) to the existing 10, for a total of **16 files**, and modifies several V1 files to support new features and standards.

This guide provides a step-by-step approach with **code snippets**, **detailed comments**, **explanations**, and **manual testing** using **Postman** for APIs and a browser for the frontend, alongside introductions to **automated testing** and **deployment**. Essential inline comments have been added to clarify key business logic, making the code more accessible for learning.

---

## Pre-requisites

Before starting, ensure you have:

- **Completed AuthMini V1**: Familiarity with V1’s 10-file structure, Fastify, Alpine.js, SQLite, and ESM.
- **Basic JavaScript Knowledge**: Understanding of promises, async/await, and modules.
- **Familiarity with Web Development**: Basic knowledge of APIs, frontend-backend interaction, and HTTP.
- **Tools Installed**:
  - Node.js 18+ (`node --version`)
  - npm 6+ (`npm --version`)
  - SQLite (`sqlite3 --version`, optional as `better-sqlite3` includes it)
  - Postman for API testing
  - Git (`git --version`, for CI/CD)
  - A code editor (e.g., VS Code) with SQLite extension (e.g., "SQLite" by alexcvzz)
- **AuthMini V1 Codebase**: A working V1 project with all files from the V1 guide.

**Refresher Resources**:

- 🔗 [MDN: Advanced JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- 🔗 [Fastify Documentation](https://www.fastify.io/docs/latest/)
- 🔗 [Alpine.js Documentation](https://alpinejs.dev/)
- 🔗 [Git Documentation](https://git-scm.com/doc)

---

## Introduction

### Why AuthMini V2?

AuthMini V2 enhances V1 by introducing **professional development practices**, **new features**, **testing**, and **deployment** while maintaining simplicity. It builds on V1’s authentication system (register, login, logout, admin user list) by adding:

- **User Features**: Profile view/edit, password change, account settings (e.g., theme preference).
- **Admin Features**: Search/filter users, enable/disable accounts, basic activity logs.
- **Improved UX**: Form validation, better error messages, loading states, and animations.
- **Technical Improvements**:
  - **ESLint** for code consistency.
  - **JSDoc** for documentation.
  - **Service layer** for organized business logic.
  - **Basic testing** with Jest for reliability.
  - **CI/CD pipeline** with GitHub Actions for automated deployment.

**Learning Focus**:

- Writing **maintainable JavaScript** with linting and documentation.
- Organizing code into a **service layer** for scalability.
- Implementing **basic testing** to ensure code quality.
- Enhancing **UX** with client-side validation and animations.
- Understanding **deployment** and **CI/CD** for real-world workflows.

### Why Extend V1?

Extending V1:

- **Reinforces Learning**: Builds on familiar concepts (Fastify, Alpine.js, ESM).
- **Realistic Workflow**: Mimics real-world project evolution.
- **Incremental Growth**: Introduces one major concept at a time (code quality, testing, services, deployment).
- **Maintains Simplicity**: Keeps the single-server setup to focus on learning.

### Why These Enhancements?

- **ESLint**: Enforces consistent code style, catching errors early.
- **JSDoc**: Improves documentation for team collaboration and IDE support.
- **Service Layer**: Separates business logic from routes, improving scalability.
- **Testing**: Ensures code reliability and reduces bugs.
- **CI/CD**: Automates testing and deployment, preparing for production.
- **New Features**: Teach practical implementation of common auth patterns.

### Why Manual Testing Continues?

Manual testing with **Postman** and browser:

- **Reinforces Debugging**: Deepens understanding of API and UI behavior.
- **Complements Basic Tests**: Validates features before automated tests are fully developed.
- **Real-World Skill**: Manual testing remains critical in professional settings.

### Who Is This Guide For?

Developers who:

- Have built AuthMini V1 and understand its structure.
- Want to learn **code quality**, **testing**, **service layers**, and **deployment**.
- Aim to write **professional, maintainable code** for real-world projects.
- Are preparing for scalable systems like **AuthCloud**.
- Seek a **structured, incremental** learning path.

---

## Learning Objectives

By the end of this guide, you will:

1. Extend AuthMini V1 to V2, adding **6 new files** and modifying existing ones for a **16-file structure**.
2. Implement **ESLint** and **JSDoc** for code quality and documentation.
3. Refactor backend to include a **service layer** for organized business logic.
4. Add **new features**: Profile management, enhanced admin capabilities, and UX improvements.
5. Write **basic integration tests** for APIs using Jest and Supertest.
6. Set up a **CI/CD pipeline** with GitHub Actions for automated linting, testing, and deployment.
7. Deploy the app to a cloud platform (e.g., Render) and understand deployment workflows.
8. Test APIs with **Postman** and frontend via browser at `http://localhost:3000`.
9. Ensure **developer and AI-generated code** follow consistent standards.
10. Master **environment variables**, **client-side validation**, **error handling**, **loading states**, and **deployment concepts**.

---

## Getting Started: Where to Begin?

AuthMini V2 extends V1’s single Fastify server, SQLite database, and Alpine.js frontend. Start by reviewing V1’s requirements and structure, then follow these steps to enhance it.

### Step 1: Understand V2 Requirements

- **Why**: Clarifies new features and technical goals.
- **How**: Review the updated navigation flow:
  ```
  [Unauthenticated]
    - Register -> Login -> User Dashboard (view/edit profile, change password, settings)
    - Admin Login (admin@example.com) -> Admin Dashboard (search users, enable/disable, view logs)
  ```
- **New Features**:
  - **User**: Profile view/edit, password change, account settings (e.g., theme preference).
  - **Admin**: Search/filter users, enable/disable accounts, view activity logs.
  - **UX**: Form validation, error messages, loading states, animations.
- **Technical Enhancements**:
  - ESLint for code consistency.
  - JSDoc for documentation.
  - Service layer for business logic.
  - Integration tests for APIs, frontend tests, CI/CD pipeline.
  - Deployment to a cloud platform.
- **Nuance**: Focus on maintainability and incremental additions, avoiding complex patterns like multi-tenancy.

### Step 2: Set Up Extended Project Structure

- **Why**: Organizes new files and updates V1 structure.
- **How**: Add 6 new files and modify V1 files.
- **Updated Project Structure**:
  ```
  authmini/
  ├── backend/
  │   ├── data/
  │   │   └── db.mjs                   # Updated: Add profile/settings tables
  │   ├── routes/
  │   │   ├── auth.mjs                 # Updated: Refactored register/login to use service layer
  │   │   └── users.mjs                # Updated: Add search, enable/disable
  │   ├── services/                    # NEW: Service layer
  │   │   ├── userService.mjs          # NEW: User-related business logic
  │   │   └── activityService.mjs      # NEW: Activity log logic
  ├── db/
  │   └── authmini.db                  # Updated: New tables
  ├── frontend/
  │   ├── css/
  │   │   └── styles.css               # Updated: Add animations, form styles
  │   ├── js/
  │   │   ├── app.js                   # Updated: Handle profile/settings
  │   │   ├── auth.js                  # Updated: Add validation
  │   │   └── profile.js               # NEW: Profile/settings component
  │   └── index.html                   # Updated: Add profile/settings UI
  ├── tests/                           # NEW: Test directory
  │   └── api.test.mjs                 # NEW: Admin account existence test
  ├── server.mjs                       # Updated: Add service routes
  ├── package.json                     # Updated: Add ESLint, Jest, ESM test scripts
  ├── .env                             # Updated: Add new variables
  ├── .eslintrc.json                   # NEW: ESLint configuration
  ├── jest.config.mjs                  # NEW: Jest configuration for ESM
  └── .github/workflows/ci.yml         # NEW: GitHub Actions CI/CD
  ```
- **Total Files**: 16 (6 backend, 5 frontend, 5 root).
- **New Files**:
  - `backend/services/userService.mjs`: User-related business logic.
  - `backend/services/activityService.mjs`: Activity log logic.
  - `frontend/js/profile.js`: Profile/settings component.
  - `tests/api.test.mjs`: Admin account existence test.
  - `.eslintrc.json`: ESLint configuration.
  - `jest.config.mjs`: Jest configuration for ESM support.
  - `.github/workflows/ci.yml`: CI/CD pipeline.
- **Modified Files**:
  - `backend/data/db.mjs`: Add profile/settings tables, activity logs.
  - `backend/routes/auth.mjs`: Refactored to use service layer for register/login.
  - `backend/routes/users.mjs`: Add search, enable/disable.
  - `frontend/css/styles.css`: Add form styles, animations.
  - `frontend/js/app.js`: Handle profile/settings state.
  - `frontend/js/auth.js`: Add client-side validation.
  - `frontend/index.html`: Add profile/settings UI.
  - `server.mjs`: Register new routes, update logging.
  - `package.json`: Add ESLint, Jest, ESM test scripts.
  - `.env`: Add new environment variables.
- **Code Example** (Create new files):
  ```bash
  mkdir -p authmini/backend/services
  mkdir -p authmini/tests
  mkdir -p authmini/.github/workflows
  touch authmini/backend/services/{userService.mjs,activityService.mjs}
  touch authmini/frontend/js/profile.js
  touch authmini/tests/api.test.mjs
  touch authmini/.eslintrc.json
  touch authmini/jest.config.mjs
  touch authmini/.github/workflows/ci.yml
  ```
- **Nuance**: Ensure `.env`, `.eslintrc.json`, `jest.config.mjs`, and `.github/workflows/ci.yml` are added to `.gitignore` for security and cleanliness.

### Step 3: Verify System Requirements

- **Why**: Ensures tools support new dependencies (ESLint, Jest, GitHub Actions).
- **How**: Confirm Node.js, npm, SQLite, and add Git for CI/CD.
- **Steps**:
  1. **Node.js**: `node --version` (18+).
  2. **npm**: `npm --version` (6+).
  3. **SQLite**: `sqlite3 --version` (optional, `better-sqlite3` handles it).
  4. **Git**: `git --version` (for CI/CD).
     - **If Missing**:
       - Install: [git-scm.com](https://git-scm.com/downloads).
       - Verify: `git --version`.
     - **Common Issues**:
       - **Command not found**: Add Git to PATH.
  - **Note**: V1 setup should suffice, but Git is new for CI/CD.
- **Testing**:
  - Run: `node --version`, `npm --version`, `git --version`.
  - **Expected Outcome**: Valid versions, no errors.
  - **Common Issues**:
    - **Build errors**: Ensure `python3`, `make`, `g++` (V1 Step 3).
    - **Git missing**: Install Git for CI/CD.

### Step 4: Install New Dependencies and Configure Environment

- **Why**: Adds ESLint, Jest, and CI/CD tools.
- **How**: Update `package.json`, `.env`, and create `.eslintrc.json`, `jest.config.mjs`.
- **Code Example** (`package.json`):
  ```json
  {
    "name": "authmini",
    "version": "2.0.0",
    "type": "module",
    "scripts": {
      "start": "node server.mjs",
      "lint": "eslint .",
      "test": "node --experimental-vm-modules node_modules/.bin/jest",
      "test:watch": "node --experimental-vm-modules node_modules/.bin/jest --watch"
    },
    "dependencies": {
      "@fastify/static": "^6.0.0",
      "axios": "^1.6.8",
      "bcrypt": "^5.0.0",
      "better-sqlite3": "^8.0.0",
      "dotenv": "^16.0.0",
      "fastify": "^4.0.0",
      "jsonwebtoken": "^9.0.0"
    },
    "devDependencies": {
      "eslint": "^8.0.0",
      "jest": "^29.0.0",
      "supertest": "^6.0.0"
    }
  }
  ```
  - **Explanation**:
    - **New Dependencies**:
      - `eslint`: Linting for code quality.
      - `jest`: Testing framework.
      - `supertest`: API testing with Fastify (unused in new test but retained).
    - **Scripts**:
      - `lint`: Runs ESLint.
      - `test`: Runs Jest with `--experimental-vm-modules` for ESM support.
      - `test:watch`: Runs Jest in watch mode with ESM support.
    - **Note**: Added `axios` to dependencies (used in frontend).
    - **Why `--experimental-vm-modules`?**: Enables Jest to handle ESM modules, critical for `"type": "module"`.
- **Code Example** (`.env`):
  ```
  PORT=3000
  JWT_SECRET=your_jwt_secret_here
  LOG_LEVEL=info
  ```
  - **Explanation**:
    - **New Variable**: `LOG_LEVEL` for Fastify logging.
    - **Nuance**: Keep `JWT_SECRET` secure (e.g., `openssl rand -base64 32`).
- **Code Example** (`.eslintrc.json`):
  ```json
  {
    "env": {
      "browser": true,
      "es2021": true,
      "node": true
    },
    "extends": ["eslint:recommended"],
    "parserOptions": {
      "ecmaVersion": 12,
      "sourceType": "module"
    },
    "rules": {
      "indent": ["error", 2],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "no-console": "warn"
    }
  }
  ```
  - **Explanation**:
    - **Purpose**: Enforces consistent style (2-space indent, single quotes, semicolons).
    - **Rules**: Warns on `console.log`, ignores unused args starting with `_`.
    - **Nuance**: Supports ESM (`sourceType: "module"`).
- **Code Example** (`jest.config.mjs`):
  ```javascript
  /**
   * Jest configuration for AuthMini V2.
   * @module jest.config
   */
  export default {
    // Use Node.js environment for backend testing
    testEnvironment: 'node',
    // Disable transformation for ESM compatibility
    transform: {},
    // Recognize .mjs and .js files
    moduleFileExtensions: ['mjs', 'js'],
    // Match test files in tests/ directory
    testMatch: ['**/tests/**/*.test.mjs'],
    // Treat .mjs files as ESM
    extensionsToTreatAsEsm: ['.mjs'],
  };
  ```
  - **Explanation**:
    - **Purpose**: Configures Jest for ESM support, targeting `.mjs` test files.
    - **Settings**:
      - `testEnvironment`: For backend testing.
      - `transform`: Disabled for native ESM.
      - `extensionsToTreatAsEsm`: Ensures `.mjs` files are ESM.
- **Steps**:
  1. Update `package.json` with new dependencies and scripts.
  2. Update `.env` with `LOG_LEVEL`.
  3. Create `.eslintrc.json` and `jest.config.mjs`.
  4. Run `npm install`.
- **Testing**:
  - Verify `node_modules/` updates.
  - Run `npm run lint` (may show errors, fixed later).
  - Run `npm test` to verify Jest setup.
  - **Common Issues**:
    - **Permission errors**: Use `sudo` or fix permissions.
    - **Module not found**: Ensure `npm install` ran.
    - **Jest errors**: Verify `jest.config.mjs` and `--experimental-vm-modules`.

## Snapshot of AuthMini V2 Files

| File                                   | Purpose                                                   | Key Variables                     | Key Methods (Arguments)                                                                  |
| -------------------------------------- | --------------------------------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------- |
| `server.mjs`                           | Fastify server, serves APIs/frontend                      | `fastify`, `__dirname`            | `startServer()`: Starts server                                                           |
| `package.json`                         | Dependencies, scripts (lint, test)                        | None                              | None                                                                                     |
| `.env`                                 | Environment variables (`PORT`, `JWT_SECRET`, `LOG_LEVEL`) | `PORT`, `JWT_SECRET`, `LOG_LEVEL` | None                                                                                     |
| `.eslintrc.json`                       | ESLint configuration                                      | None                              | None                                                                                     |
| `jest.config.mjs`                      | Jest configuration for ESM                                | None                              | None                                                                                     |
| `.github/workflows/ci.yml`             | CI/CD pipeline (lint, test)                               | None                              | None                                                                                     |
| `backend/data/db.mjs`                  | SQLite database, new tables (profiles, settings, logs)    | `db`, `__dirname`                 | `initDb()`: Initializes database<br>`getDb()`: Returns instance                          |
| `backend/routes/auth.mjs`              | Auth routes (register, login, logout, profile, password)  | None                              | `registerRoutes(fastify, options)`: Registers routes                                     |
| `backend/routes/users.mjs`             | Admin routes (list, search, enable/disable)               | None                              | `registerUserRoutes(fastify, options)`: Registers routes                                 |
| `backend/services/userService.mjs`     | User business logic (profile, settings, password)         | None                              | `registerUser(email, password)`: Registers user<br>`loginUser(email, password)`: Logs in |
| `backend/services/activityService.mjs` | Activity log logic                                        | None                              | `logActivity(userId, action)`: Logs action<br>`getActivityLogs(filters)`: Gets logs      |
| `frontend/index.html`                  | SPA entry point, adds profile/settings UI                 | None (HTML)                       | None                                                                                     |
| `frontend/css/styles.css`              | Styles with animations, form validation                   | None (CSS)                        | None                                                                                     |
| `frontend/js/app.js`                   | SPA state, navigation, profile/settings                   | None                              | `app()`: Alpine.js component with `init()`, `logout()`, `updateSettings()`               |
| `frontend/js/auth.js`                  | Login/register with validation                            | None                              | `authComponent()`: Alpine.js component with `submit(action)`, `validate()`               |
| `frontend/js/profile.js`               | Profile/settings component                                | None                              | `profileComponent()`: Alpine.js component with `saveProfile()`, `changePassword()`       |
| `tests/api.test.mjs`                   | Admin account existence test                              | None                              | None (Jest tests)                                                                        |

- **Nuance**: Refer to this table for file purposes and key methods.

## Development Process: Extending AuthMini V1 to V2

### Step 5: Configure ESLint and Fix V1 Code

- **Why**: Ensures consistent code style across V1 and V2.
- **How**: Run ESLint and fix V1 files.
- **Steps**:

  1. Run `npm run lint`.
  2. Fix errors (e.g., add semicolons, use single quotes).

  - Example Fix (`server.mjs`):

    ```javascript
    // Before
    import Fastify from 'fastify';
    const fastify = Fastify({ logger: true });

    // After
    import Fastify from 'fastify';
    const fastify = Fastify({ logger: true });
    ```

- **Testing**:
  - Run `npm run lint`.
  - **Expected Outcome**: No errors/warnings.
  - **Common Issues**:
    - **Syntax errors**: Follow ESLint suggestions.
    - **Config issues**: Verify `.eslintrc.json`.

### Step 6: Add JSDoc Documentation

- **Why**: Improves code readability and IDE support.
- **How**: Enhance V1 files with JSDoc, add to new files.
- **Example** (Update `backend/routes/auth.mjs`):
  ```javascript
  /**
   * Registers auth routes for registration, login, logout, and profile management.
   * @param {FastifyInstance} fastify - Fastify instance.
   * @param {Object} options - Route options.
   * @async
   */
  export async function registerRoutes(fastify, options) {
    // Routes
  }
  ```
- **Nuance**: Add JSDoc to all major functions and modules in V1 files (e.g., `db.mjs`, `app.js`).

### Step 7: Extend Database Schema

- **Why**: Supports profiles, settings, and logs.
- **How**: Update `backend/data/db.mjs`.
- **Code Example** (`backend/data/db.mjs`):

  ```javascript
  /**
   * SQLite database management for AuthMini.
   * @module data/db
   */
  import sqlite3 from 'better-sqlite3';
  import bcrypt from 'bcrypt';
  import { dirname, resolve } from 'path';
  import { fileURLToPath } from 'url';

  const __dirname = dirname(fileURLToPath(import.meta.url));
  let db;

  /**
   * Initializes database with users, profiles, settings, and logs tables.
   * @returns {Database} Database instance.
   */
  export function initDb() {
    // Connect to SQLite database
    db = sqlite3(resolve(__dirname, '../../db/authmini.db'));
    // Create tables for users, profiles, settings, and activity logs
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        is_active BOOLEAN DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS profiles (
        user_id INTEGER PRIMARY KEY,
        display_name TEXT,
        bio TEXT,
        avatar_url TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
      CREATE TABLE IF NOT EXISTS settings (
        user_id INTEGER PRIMARY KEY,
        theme TEXT DEFAULT 'light',
        notifications BOOLEAN DEFAULT 1,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
      CREATE TABLE IF NOT EXISTS activity_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        action TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);

    // Seed admin user if not exists
    const adminExists = db
      .prepare('SELECT id FROM users WHERE email = ?')
      .get('admin@example.com');
    if (!adminExists) {
      // Hash admin password for secure storage
      const passwordHash = bcrypt.hashSync('admin123', 10);
      // Insert admin user with admin role
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
    // Ensure database is initialized
    if (!db) throw new Error('Database not initialized');
    return db;
  }

  // Initialize database on module load
  initDb();
  export { db };
  ```

  - **Explanation**:
    - **New Tables**:
      - `profiles`: Stores display name, bio, avatar URL.
      - `settings`: Stores theme, notification preferences.
      - `activity_logs`: Tracks user actions.
    - **Users Update**: Adds `is_active` for enable/disable.
    - **Nuance**: Foreign keys ensure data integrity.

- **Testing**:
  - Update `test-db.mjs` (from V1):
    ```javascript
    import { initDb } from './backend/data/db.mjs';
    initDb();
    console.log('Database initialized');
    ```
  - Run: `node test-db.mjs`.
  - Check `authmini.db` with SQLite extension for new tables.
  - **Expected Outcome**: `profiles`, `settings`, `activity_logs` tables exist.
  - **Common Issues**:
    - **Directory missing**: Ensure `db/` exists.
    - **Schema errors**: Verify SQL syntax.

### Step 8: Implement Service Layer

- **Why Use a Service Layer?**  
  The **service layer** is a new architectural concept introduced in V2 to improve code organization and maintainability. Here’s why it’s included, why these specific files were chosen, and how they’re structured:

  - **Purpose**:

    - **Separation of Concerns**: Moves business logic (e.g., updating user profiles, logging activities) out of route handlers, allowing routes to focus on HTTP request/response handling.
    - **Reusability**: Centralizes logic so it can be reused across multiple routes or modules (e.g., updating a profile in both user and admin routes).
    - **Scalability**: Simplifies adding new features by reducing code duplication and making the codebase easier to extend for larger systems like AuthCloud.
    - **Testability**: Isolates business logic, making it easier to write unit and integration tests without involving HTTP layers.

  - **Why These Files?**:

    - **`userService.mjs`**:
      - **Purpose**: Handles user-related operations like profile updates, password changes, settings management, and toggling active status.
      - **Rationale**: User management is the core of AuthMini, and centralizing these operations ensures consistency across routes (e.g., `/api/profile`, `/api/users/:id/toggle`). It supports V2’s new features like profile editing and settings.
    - **`activityService.mjs`**:
      - **Purpose**: Manages activity logging for tracking user actions (e.g., login, profile updates).
      - **Rationale**: Activity logs are a new V2 feature for admin auditing. Isolating this logic allows reuse across routes (e.g., logging in `/api/register`, `/api/profile`) and simplifies log retrieval for the admin dashboard.
    - **Why Only Two Files?**:
      - **Simplicity**: V2 focuses on teaching the service layer concept without overwhelming beginners with too many services.
      - **Relevance**: These files cover the primary V2 features (user management, activity tracking), providing clear examples of service layer benefits.
      - **Incremental Learning**: Introduces the pattern for future expansion (e.g., adding `emailService.mjs` in V3).

  - **Structuring**:

    - **Directory**: The `backend/services/` folder separates services from `routes/` and `data/`, clearly delineating responsibilities:
      - `routes/`: Handles HTTP requests/responses.
      - `services/`: Manages business logic (e.g., updating profiles, logging actions).
      - `data/`: Handles database interactions (e.g., SQL queries).
    - **File Naming**: `userService.mjs` and `activityService.mjs` use descriptive names following the `[domain]Service.mjs` convention for clarity.
    - **Exports**: Each service exports specific functions (e.g., `updateUserProfile`, `logActivity`) to encapsulate logic and provide a clean API for routes.
    - **Why This Structure?**:
      - **Clarity**: A dedicated `services/` folder makes the codebase easier to navigate.
      - **Modularity**: Encourages adding new services as the app grows.
      - **Alignment with AuthCloud**: Mimics real-world backend patterns where services handle complex logic, preparing for larger systems.

  - **Learning Outcome**:
    - Understand how to organize code for maintainability.
    - Learn to separate business logic from HTTP handling.
    - Prepare for testing by isolating logic in services.

- **How**: Create `userService.mjs` and `activityService.mjs`.
- **Code Example** (`backend/services/userService.mjs`):

  ```javascript
  /**
   * User service for managing user operations.
   * @module services/userService
   */
  import bcrypt from 'bcrypt';
  import jwt from 'jsonwebtoken';
  import { config } from 'dotenv';
  import { getDb } from '../data/db.mjs';
  import { logActivity } from './activityService.mjs';

  // Load environment variables
  config();

  /**
   * Registers a new user.
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   * @returns {Object} Object containing user ID.
   * @throws {Error} If email already exists.
   * @async
   */
  export async function registerUser(email, password) {
    // Get database instance
    const db = getDb();
    // Check for existing user
    const existingUser = db
      .prepare('SELECT id FROM users WHERE email = ?')
      .get(email);
    if (existingUser) {
      throw new Error('Email already exists');
    }
    // Hash password for secure storage
    const passwordHash = await bcrypt.hash(password, 10);
    // Insert new user into database
    const user = db
      .prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)')
      .run(email, passwordHash);
    // Log registration activity
    logActivity(user.lastInsertRowid, 'User registered');
    return { id: user.lastInsertRowid };
  }

  /**
   * Logs in a user and generates a JWT token.
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   * @returns {Object} Object containing token and user data.
   * @throws {Error} If credentials are invalid or account is disabled.
   * @async
   */
  export async function loginUser(email, password) {
    // Retrieve user by email
    const user = getUserByEmail(email);
    // Validate user existence, active status, and password
    if (
      !user ||
      !user.is_active ||
      !(await bcrypt.compare(password, user.password_hash))
    ) {
      throw new Error('Invalid credentials or account disabled');
    }
    // Generate JWT token with user details
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    // Log login activity
    logActivity(user.id, 'User logged in');
    return { token, user: { email: user.email, role: user.role } };
  }

  /**
   * Gets a user by email.
   * @param {string} email - User's email.
   * @returns {Object|null} User object or null.
   */
  export function getUserByEmail(email) {
    // Get database instance
    const db = getDb();
    // Query user by email
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  }

  /**
   * Updates a user's profile.
   * @param {number} userId - User's ID.
   * @param {Object} profileData - Profile data (display_name, bio, avatar_url).
   * @returns {Object} Updated profile.
   */
  export function updateUserProfile(userId, profileData) {
    // Get database instance
    const db = getDb();
    // Insert or update profile data
    db.prepare(
      'INSERT OR REPLACE INTO profiles (user_id, display_name, bio, avatar_url) VALUES (?, ?, ?, ?)'
    ).run(
      userId,
      profileData.display_name,
      profileData.bio,
      profileData.avatar_url
    );
    return profileData;
  }

  /**
   * Updates a user's settings.
   * @param {number} userId - User's ID.
   * @param {Object} settingsData - Settings data (theme, notifications).
   * @returns {Object} Updated settings.
   */
  export function updateUserSettings(userId, settingsData) {
    // Get database instance
    const db = getDb();
    // Insert or update settings data
    db.prepare(
      'INSERT OR REPLACE INTO settings (user_id, theme, notifications) VALUES (?, ?, ?)'
    ).run(userId, settingsData.theme, settingsData.notifications);
    return settingsData;
  }

  /**
   * Changes a user's password.
   * @param {number} userId - User's ID.
   * @param {string} newPassword - New password.
   * @async
   */
  export async function changeUserPassword(userId, newPassword) {
    // Get database instance
    const db = getDb();
    // Hash new password for secure storage
    const passwordHash = await bcrypt.hash(newPassword, 10);
    // Update user password in database
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(
      passwordHash,
      userId
    );
  }

  /**
   * Toggles a user's active status.
   * @param {number} userId - User's ID.
   * @param {boolean} isActive - Active status.
   */
  export function toggleUserActive(userId, isActive) {
    // Get database instance
    const db = getDb();
    // Update user active status
    db.prepare('UPDATE users SET is_active = ? WHERE id = ?').run(
      isActive ? 1 : 0,
      userId
    );
  }
  ```

- **Code Example** (`backend/services/activityService.mjs`):

  ```javascript
  /**
   * Activity log service for tracking user actions.
   * @module services/activityService
   */
  import { getDb } from '../data/db.mjs';

  /**
   * Logs a user action.
   * @param {number} userId - User's ID.
   * @param {string} action - Action description.
   */
  export function logActivity(userId, action) {
    // Get database instance
    const db = getDb();
    // Insert activity log entry
    db.prepare('INSERT INTO activity_logs (user_id, action) VALUES (?, ?)').run(
      userId,
      action
    );
  }

  /**
   * Gets activity logs with optional filters.
   * @param {Object} filters - Filters (userId, startDate, endDate).
   * @returns {Array} Array of log entries.
   */
  export function getActivityLogs(filters = {}) {
    // Get database instance
    const db = getDb();
    // Build dynamic query with filters
    let query = 'SELECT * FROM activity_logs';
    const params = [];
    if (filters.userId) {
      query += ' WHERE user_id = ?';
      params.push(filters.userId);
    }
    if (filters.startDate) {
      query += params.length ? ' AND' : ' WHERE';
      query += ' created_at >= ?';
      params.push(filters.startDate);
    }
    if (filters.endDate) {
      query += params.length ? ' AND' : ' WHERE';
      query += ' created_at <= ?';
      params.push(filters.endDate);
    }
    // Execute query with parameters
    return db.prepare(query).all(...params);
  }
  ```

- **Testing**:
  - Create `test-services.mjs`:
    ```javascript
    import { initDb } from './backend/data/db.mjs';
    import { updateUserProfile } from './backend/services/userService.mjs';
    import { logActivity } from './backend/services/activityService.mjs';
    // Initialize database
    initDb();
    // Test profile update
    updateUserProfile(1, {
      display_name: 'Admin',
      bio: 'Admin bio',
      avatar_url: '',
    });
    // Test activity logging
    logActivity(1, 'Profile updated');
    console.log('Services tested');
    ```
  - Run: `node test-services.mjs`.
  - Check `authmini.db` for profile and log entries.
  - **Expected Outcome**: Profile and log tables updated.
  - **Common Issues**:
    - **Database errors**: Ensure `initDb` ran.

### Step 9: Update Backend Routes

- **Why**: Add profile, password, search, and enable/disable routes using the service layer.
- **How**: Update `auth.mjs`, `users.mjs`, and `server.mjs`.
- **Code Example** (`backend/routes/auth.mjs`):

  ```javascript
  /**
   * Authentication routes for AuthMini.
   * @module routes/auth
   */
  import jwt from 'jsonwebtoken';
  import { config } from 'dotenv';
  import {
    registerUser,
    loginUser,
    updateUserProfile,
    updateUserSettings,
    changeUserPassword,
  } from '../services/userService.mjs';
  import { logActivity } from '../services/activityService.mjs';

  // Load environment variables
  config();

  /**
   * Registers auth routes.
   * @param {FastifyInstance} fastify - Fastify instance.
   * @param {Object} options - Route options.
   * @async
   */
  export async function registerRoutes(fastify, options) {
    // Handle user registration
    fastify.post('/register', async (request, reply) => {
      const { email, password } = request.body;
      try {
        // Delegate registration to service layer
        await registerUser(email, password);
        // Send success response
        reply.code(201).send({ message: 'User registered' });
      } catch (err) {
        // Handle errors (e.g., duplicate email)
        reply.code(400).send({ error: `Registration failed: ${err.message}` });
      }
    });

    // Handle user login
    fastify.post('/login', async (request, reply) => {
      const { email, password } = request.body;
      try {
        // Delegate login to service layer
        const { token, user } = await loginUser(email, password);
        // Send token and user data
        reply.send({ token, user });
      } catch (err) {
        // Handle invalid credentials
        reply.code(401).send({ error: err.message });
      }
    });

    // Handle logout (client-side token removal)
    fastify.post('/logout', async (request, reply) => {
      reply.send({ message: 'Logged out' });
    });

    // Handle profile updates
    fastify.post('/profile', async (request, reply) => {
      // Extract token from Authorization header
      const token = request.headers.authorization?.replace('Bearer ', '');
      if (!token) return reply.code(401).send({ error: 'No token provided' });
      try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Get profile data from request
        const profileData = request.body;
        // Update profile via service layer
        updateUserProfile(decoded.id, profileData);
        // Log profile update
        logActivity(decoded.id, 'Profile updated');
        reply.send({ message: 'Profile updated' });
      } catch (err) {
        // Handle invalid token
        reply.code(401).send({ error: 'Invalid token' });
      }
    });

    // Handle password changes
    fastify.post('/password', async (request, reply) => {
      // Extract token from Authorization header
      const token = request.headers.authorization?.replace('Bearer ', '');
      if (!token) return reply.code(401).send({ error: 'No token provided' });
      try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Get new password from request
        const { newPassword } = request.body;
        // Update password via service layer
        await changeUserPassword(decoded.id, newPassword);
        // Log password change
        logActivity(decoded.id, 'Password changed');
        reply.send({ message: 'Password updated' });
      } catch (err) {
        // Handle invalid token
        reply.code(401).send({ error: 'Invalid token' });
      }
    });

    // Handle settings updates
    fastify.post('/settings', async (request, reply) => {
      // Extract token from Authorization header
      const token = request.headers.authorization?.replace('Bearer ', '');
      if (!token) return reply.code(401).send({ error: 'No token provided' });
      try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Get settings data from request
        const settingsData = request.body;
        // Update settings via service layer
        updateUserSettings(decoded.id, settingsData);
        // Log settings update
        logActivity(decoded.id, 'Settings updated');
        reply.send({ message: 'Settings updated' });
      } catch (err) {
        // Handle invalid token
        reply.code(401).send({ error: 'Invalid token' });
      }
    });
  }
  ```

- **Code Example** (`backend/routes/users.mjs`):

  ```javascript
  /**
   * Admin user management routes.
   * @module routes/users
   */
  import jwt from 'jsonwebtoken';
  import { config } from 'dotenv';
  import { getDb } from '../data/db.mjs';
  import { toggleUserActive } from '../services/userService.mjs';
  import { logActivity } from '../services/activityService.mjs';

  // Load environment variables
  config();

  /**
   * Registers user routes.
   * @param {FastifyInstance} fastify - Fastify instance.
   * @param {Object} options - Route options.
   * @async
   */
  export async function registerUserRoutes(fastify, options) {
    // Handle user list retrieval
    fastify.get('/users', async (request, reply) => {
      // Extract token from Authorization header
      const token = request.headers.authorization?.replace('Bearer ', '');
      if (!token) return reply.code(401).send({ error: 'No token provided' });
      try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Restrict to admin users
        if (decoded.role !== 'admin')
          return reply.code(403).send({ error: 'Admin access required' });
        // Get database instance
        const db = getDb();
        // Get search and active filters from query
        const { search, active } = request.query;
        // Build dynamic query for users
        let query = 'SELECT id, email, role, created_at, is_active FROM users';
        const params = [];
        if (search) {
          query += ' WHERE email LIKE ?';
          params.push(`%${search}%`);
        }
        if (active !== undefined) {
          query += params.length ? ' AND' : ' WHERE';
          query += ' is_active = ?';
          params.push(active === 'true' ? 1 : 0);
        }
        // Execute query to fetch users
        const users = db.prepare(query).all(...params);
        // Send user list
        reply.send({ users });
      } catch (err) {
        // Handle invalid token
        reply.code(401).send({ error: 'Invalid token' });
      }
    });

    // Handle user active status toggle
    fastify.post('/users/:id/toggle', async (request, reply) => {
      // Extract token from Authorization header
      const token = request.headers.authorization?.replace('Bearer ', '');
      if (!token) return reply.code(401).send({ error: 'No token provided' });
      try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Restrict to admin users
        if (decoded.role !== 'admin')
          return reply.code(403).send({ error: 'Admin access required' });
        // Get user ID from route parameter
        const userId = parseInt(request.params.id, 10);
        // Get active status from request
        const { isActive } = request.body;
        // Toggle user active status via service layer
        toggleUserActive(userId, isActive);
        // Log toggle action
        logActivity(
          userId,
          `User ${isActive ? 'enabled' : 'disabled'} by admin`
        );
        // Send success response
        reply.send({ message: `User ${isActive ? 'enabled' : 'disabled'}` });
      } catch (err) {
        // Handle invalid token
        reply.code(401).send({ error: 'Invalid token' });
      }
    });
  }
  ```

- **Code Example** (Update `server.mjs`):

  ```javascript
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

  // Load environment variables
  config();
  // Initialize Fastify with logging
  const fastify = Fastify({
    logger: { level: process.env.LOG_LEVEL || 'info' },
  });
  // Get directory name for static file serving
  const __dirname = dirname(fileURLToPath(import.meta.url));

  /**
   * Starts the Fastify server.
   * @async
   */
  async function startServer() {
    // Register static file serving for frontend
    await fastify.register(fastifyStatic, {
      root: join(__dirname, 'frontend'),
      prefix: '/',
      setHeaders: (res) => {
        // Set cache control for static files
        res.setHeader('Cache-Control', 'public, max-age=3600');
      },
    });

    // Register authentication routes
    await fastify.register(registerRoutes, { prefix: '/api' });
    // Register admin user routes
    await fastify.register(registerUserRoutes, { prefix: '/api' });

    try {
      // Start server on specified port
      await fastify.listen({ port: process.env.PORT || 3000 });
      fastify.log.info(`Server running on port ${process.env.PORT}`);
    } catch (err) {
      // Log and exit on server failure
      fastify.log.error(err);
      process.exit(1);
    }
  }

  // Start the server
  startServer();
  ```

- **Testing** (Postman):
  1. Login as admin (`admin@example.com`/`admin123`), get token.
  2. POST `/api/profile`:
     - Header: `Authorization: Bearer [token]`.
     - Body: `{"display_name":"User","bio":"Bio","avatar_url":""}`.
     - **Expected Response**: `200 OK`, `{ message: "Profile updated" }`.
  3. POST `/api/password`:
     - Header: `Authorization: Bearer [token]`.
     - Body: `{"newPassword":"newpass123"}`.
     - **Expected Response**: `200 OK`, `{ message: "Password updated" }`.
  4. GET `/api/users?search=user`:
     - Header: `Authorization: Bearer [admin token]`.
     - **Expected Response**: `200 OK`, `{ users: [...] }` with filtered users.
  5. POST `/api/users/2/toggle`:
     - Header: `Authorization: Bearer [admin token]`.
     - Body: `{"isActive":false}`.
     - **Expected Response**: `200 OK`, `{ message: "User disabled" }`.
  - **Common Issues**:
    - **401**: Verify token.
    - **403**: Use admin token for user routes.
    - **Database errors**: Check schema.

### Step 10: Enhance Frontend UI and Logic

- **Why**: Adds profile/settings UI, validation, and animations.
- **How**: Update `index.html`, `styles.css`, `app.js`, `auth.js`, create `profile.js`.
- **Code Example** (`frontend/index.html`):

  ```html
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
      x-init="init()"
    >
      <!-- Login/Register Form -->
      <div x-show="!user" class="form-container">
        <div x-data="authComponent()">
          <h2 class="text-2xl font-bold mb-4 text-white">
            AuthMini Login / Register
          </h2>
          <input
            x-model="email"
            @input="validate()"
            type="email"
            placeholder="Email"
            class="w-full text-gray-700 p-2 mb-4 rounded"
          />
          <input
            x-model="password"
            @input="validate()"
            type="password"
            placeholder="Password"
            class="w-full text-gray-700 p-2 mb-4 rounded"
          />
          <button
            @click="submit('register')"
            class="btn-primary"
            :class="{ 'opacity-50 cursor-not-allowed': errors.email || errors.password }"
          >
            Register
          </button>
          <button
            @click="submit('login')"
            class="btn-primary ml-2"
            :class="{ 'opacity-50 cursor-not-allowed': errors.email || errors.password }"
          >
            Login
          </button>
          <p x-text="error" class="text-red-500 mt-2"></p>
          <p x-text="errors.email" class="text-red-500 mt-2"></p>
          <p x-text="errors.password" class="text-red-500 mt-2"></p>
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
        <button @click="showProfile = true" class="btn-primary">
          Edit Profile
        </button>
        <button @click="logout()" class="btn-primary ml-2">Logout</button>
        <div x-show="showProfile" class="mt-4" x-data="profileComponent()">
          <h3 class="text-lg font-semibold mb-2 text-white">Edit Profile</h3>
          <input
            x-model="profile.display_name"
            placeholder="Display Name"
            class="w-full text-gray-700 p-2 mb-2 rounded"
          />
          <textarea
            x-model="profile.bio"
            placeholder="Bio"
            class="w-full text-gray-700 p-2 mb-2 rounded"
          ></textarea>
          <input
            x-model="profile.avatar_url"
            placeholder="Avatar URL"
            class="w-full text-gray-700 p-2 mb-2 rounded"
          />
          <input
            x-model="password"
            type="password"
            placeholder="New Password"
            class="w-full text-gray-700 p-2 mb-2 rounded"
          />
          <select
            x-model="settings.theme"
            class="w-full text-gray-700 p-2 mb-2 rounded"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <label class="text-white">
            <input x-model="settings.notifications" type="checkbox" />
            Enable Notifications
          </label>
          <button
            @click="saveProfile()"
            class="btn-primary mt-2"
            :class="{ 'animate-pulse': loading }"
          >
            Save
          </button>
          <p x-text="error" class="text-red-500 mt-2"></p>
        </div>
      </div>

      <!-- Admin Dashboard -->
      <div
        x-show="user !== null && user.role === 'admin'"
        class="form-container"
      >
        <h2 class="text-2xl font-bold mb-4 text-white">Admin Dashboard</h2>
        <input
          x-model="search"
          @input.debounce="fetchUsers()"
          placeholder="Search users..."
          class="w-full text-gray-700 p-2 mb-4 rounded"
        />
        <h3 class="text-lg font-semibold mb-2 text-white">Users</h3>
        <ul class="mb-4">
          <template x-for="u in users" :key="u.id">
            <li class="text-white flex justify-between items-center">
              <span
                x-text="`${u.email} (${u.role}) - Active: ${u.is_active ? 'Yes' : 'No'}`"
              ></span>
              <button
                @click="toggleUser(u.id, !u.is_active)"
                class="btn-primary text-sm"
                :class="{ 'animate-pulse': loading }"
              >
                <span x-text="u.is_active ? 'Disable' : 'Enable'"></span>
              </button>
            </li>
          </template>
        </ul>
        <button @click="logout()" class="btn-primary">Logout</button>
      </div>

      <script src="js/app.js" defer></script>
      <script src="js/auth.js" defer></script>
      <script src="js/profile.js" defer></script>
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
  /* Styles for the form container */
  .form-container {
    background-color: #374151; /* bg-gray-700 */
    padding: 2rem; /* p-8 */
    border-radius: 0.5rem; /* rounded-lg */
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3); /* shadow-lg */
    max-width: 28rem; /* max-w-md */
    width: 100%; /* w-full */
    color: #ffffff; /* text-white */
    transition: transform 0.3s ease; /* Animation for form */
  }

  /* Hover effect for form container */
  .form-container:hover {
    transform: scale(1.02); /* Slight zoom on hover */
  }

  /* Styles for primary button */
  .btn-primary {
    background-color: #4b5563; /* bg-gray-600 */
    color: #ffffff; /* text-white */
    padding: 0.5rem 1rem; /* px-4 py-2 */
    border-radius: 0.375rem; /* rounded-md */
    transition: background-color 0.3s ease, transform 0.2s ease;
    cursor: pointer;
  }

  /* Hover effect for button */
  .btn-primary:hover {
    background-color: #6b7280; /* hover:bg-gray-500 */
    transform: translateY(-2px); /* Lift effect */
  }

  /* Disabled state for button */
  .btn-primary:disabled {
    background-color: #6b7280; /* disabled:bg-gray-500 */
    cursor: not-allowed;
  }

  /* Pulse animation for loading state */
  .animate-pulse {
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  ```

- **Code Example** (`frontend/js/app.js`):

  ```javascript
  /**
   * SPA state and navigation for AuthMini.
   * @module js/app
   */
  function app() {
    return {
      user: null,
      users: [],
      search: '',
      showProfile: false,
      loading: false,
      /**
       * Initializes SPA state based on stored token.
       * @async
       */
      async init() {
        // Check for stored JWT token
        const token = localStorage.getItem('token');
        if (token) {
          try {
            // Decode token payload
            const payload = JSON.parse(atob(token.split('.')[1]));
            // Set user state
            this.user = { email: payload.email, role: payload.role };
            // Fetch users for admin dashboard
            if (this.user.role === 'admin') {
              await this.fetchUsers();
            }
          } catch (err) {
            // Clear invalid token
            localStorage.removeItem('token');
          }
        }
      },
      /**
       * Fetches users for admin dashboard.
       * @async
       */
      async fetchUsers() {
        // Set loading state
        this.loading = true;
        try {
          // Get stored token
          const token = localStorage.getItem('token');
          // Fetch users with search query
          const res = await axios.get(`/api/users?search=${this.search}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // Update users list
          this.users = res.data.users;
        } catch (err) {
          console.error('Failed to fetch users:', err);
        } finally {
          // Clear loading state
          this.loading = false;
        }
      },
      /**
       * Toggles user active status.
       * @param {number} userId - User's ID.
       * @param {boolean} isActive - Active status.
       * @async
       */
      async toggleUser(userId, isActive) {
        // Set loading state
        this.loading = true;
        try {
          // Get stored token
          const token = localStorage.getItem('token');
          // Send toggle request
          await axios.post(
            `/api/users/${userId}/toggle`,
            { isActive },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          // Refresh user list
          await this.fetchUsers();
        } catch (err) {
          console.error('Failed to toggle user:', err);
        } finally {
          // Clear loading state
          this.loading = false;
        }
      },
      /**
       * Logs out user and resets UI.
       */
      logout() {
        // Clear token and reload page
        localStorage.removeItem('token');
        window.location.reload();
      },
    };
  }

  // Register Alpine.js component
  window.app = app;
  ```

- **Code Example** (`frontend/js/auth.js`):

  ```javascript
  /**
   * Authentication component with form validation.
   * @module js/auth
   */
  function authComponent() {
    return {
      email: '',
      password: '',
      error: '',
      errors: { email: '', password: '' },
      /**
       * Validates form inputs.
       */
      validate() {
        // Check email format
        this.errors.email = this.email.includes('@') ? '' : 'Invalid email';
        // Check password length
        this.errors.password =
          this.password.length >= 6 ? '' : 'Password must be 6+ characters';
      },
      /**
       * Submits register or login request.
       * @param {string} action - 'register' or 'login'.
       * @async
       */
      async submit(action) {
        // Run validation
        this.validate();
        // Block submission if errors exist
        if (this.errors.email || this.errors.password) return;
        try {
          // Send register or login request
          const res = await axios.post(`/api/${action}`, {
            email: this.email,
            password: this.password,
          });
          if (action === 'login') {
            // Store token and reload page
            localStorage.setItem('token', res.data.token);
            window.location.reload();
          } else {
            // Show registration success message
            this.error = 'Registration successful. Please login.';
          }
        } catch (err) {
          // Display error message
          this.error = err.response?.data?.error || 'An error occurred';
        }
      },
    };
  }

  // Register Alpine.js component
  window.authComponent = authComponent;
  ```

- **Code Example** (`frontend/js/profile.js`):

  ```javascript
  /**
   * Profile and settings component.
   * @module js/profile
   */
  function profileComponent() {
    return {
      profile: { display_name: '', bio: '', avatar_url: '' },
      settings: { theme: 'light', notifications: true },
      password: '',
      error: '',
      loading: false,
      /**
       * Initializes profile and settings data.
       * @async
       */
      async init() {
        try {
          // Get stored token
          const token = localStorage.getItem('token');
          // Fetch profile and settings
          const res = await axios.get('/api/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          // Update profile and settings
          this.profile = res.data.profile || this.profile;
          this.settings = res.data.settings || this.settings;
        } catch (err) {
          // Display error message
          this.error = 'Failed to load profile';
        }
      },
      /**
       * Saves profile, settings, and password.
       * @async
       */
      async saveProfile() {
        // Set loading state
        this.loading = true;
        try {
          // Get stored token
          const token = localStorage.getItem('token');
          // Save profile data
          await axios.post('/api/profile', this.profile, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // Save settings data
          await axios.post('/api/settings', this.settings, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // Save new password if provided
          if (this.password) {
            await axios.post(
              '/api/password',
              { newPassword: this.password },
              { headers: { Authorization: `Bearer ${token}` } }
            );
          }
          // Show success message
          this.error = 'Profile saved successfully';
        } catch (err) {
          // Display error message
          this.error = err.response?.data?.error || 'Failed to save profile';
        } finally {
          // Clear loading state
          this.loading = false;
        }
      },
    };
  }

  // Register Alpine.js component
  window.profileComponent = profileComponent;
  ```

- **Testing** (Browser):
  1. Run `npm start`.
  2. Open `http://localhost:3000`.
  3. Register/login as user, click “Edit Profile”, save profile/settings.
  4. Login as admin, search users, toggle active status.
  5. **Expected Outcome**: Profile updates, admin search works, animations visible.
  - **Common Issues**:
    - **Validation errors**: Check `auth.js` validation logic.
    - **API errors**: Verify backend routes and token.

### Step 11: Add Basic Testing

- **Why Testing?**  
  Testing is introduced in V2 to ensure code reliability and build confidence in new features. Here’s the ideology, how to use it, and simple examples:

  - **Ideology**:

    - **Purpose**: Testing verifies that code works as expected, catching bugs early and ensuring new features don’t break existing functionality.
    - **Why Now?**:
      - **Increased Complexity**: V2’s new features (profile management, admin controls) raise the risk of errors, making testing essential.
      - **Professional Practice**: Testing is standard in real-world development, and V2 introduces it early to build good habits.
      - **Confidence**: Tests allow refactoring or adding features without fear of breaking the app.
      - **Preparation for AuthCloud**: Automated testing is critical for large systems, and V2 lays the foundation.
    - **Why Jest and Supertest?**:
      - **Jest**: A beginner-friendly testing framework for JavaScript, supporting unit and integration tests.
      - **Supertest**: Simplifies API testing by simulating HTTP requests to Fastify routes, ideal for V2’s API-focused backend.
      - **Simplicity**: Both tools are easy to set up and align with V2’s learning goals.

  - **How to Use Testing**:

    - **Setup**: Configure Jest and Supertest in `package.json` and create a `tests/` folder for test files.
    - **Write Tests**: Create test cases for APIs (e.g., `/api/register`, `/api/login`) to verify responses and behavior.
    - **Run Tests**: Use `npm test` to execute tests and `npm test:watch` for interactive development.
    - **Integrate with CI/CD**: Tests run automatically in the CI/CD pipeline to ensure code quality before deployment.
    - **Scope for V2**:
      - Focus on **integration tests** for APIs, covering critical functionality (e.g., user registration, login).
      - Keep tests simple to avoid overwhelming beginners, with plans for unit tests in V3.

  - **Basic Examples**:

    - **Test Case for Register API**:
      ```javascript
      test('POST /api/register creates a user', async () => {
        const response = await request
          .post('/api/register')
          .send({ email: 'test@example.com', password: 'test123' });
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: 'User registered' });
      });
      ```
      - **Explanation**: Simulates a POST request to `/api/register`, checks for a 201 status, and verifies the response message.
    - **Test Case for Login API**:
      ```javascript
      test('POST /api/login returns token', async () => {
        await request
          .post('/api/register')
          .send({ email: 'test2@example.com', password: 'test123' });
        const response = await request
          .post('/api/login')
          .send({ email: 'test2@example.com', password: 'test123' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
      });
      ```
      - **Explanation**: Registers a user, then tests login, ensuring a 200 status and a token in the response.

  - **References**:

    - 🔗 [Jest Getting Started](https://jestjs.io/docs/getting-started): Learn Jest basics.
    - 🔗 [Supertest Documentation](https://github.com/visionmedia/supertest): Guide to API testing.
    - 🔗 [Testing Fastify](https://www.fastify.io/docs/latest/Guides/Testing/): Fastify-specific testing tips.

  - **Learning Outcome**:
    - Understand why testing is critical for reliability.
    - Learn to write and run simple API tests.
    - Build confidence in adding features without breaking the app.

- **How**: Create `tests/api.test.mjs` and `jest.config.mjs`.
- **Code Example** (`jest.config.mjs`):
  ```javascript
  /**
   * Jest configuration for AuthMini V2.
   * @module jest.config
   */
  export default {
    // Use Node.js environment for backend testing
    testEnvironment: 'node',
    // Disable transformation for ESM compatibility
    transform: {},
    // Recognize .mjs and .js files
    moduleFileExtensions: ['mjs', 'js'],
    // Match test files in tests/ directory
    testMatch: ['**/tests/**/*.test.mjs'],
    // Treat .mjs files as ESM
    extensionsToTreatAsEsm: ['.mjs'],
  };
  ```
- **Code Example** (`tests/api.test.mjs`):

  ```javascript
  /**
   * Database test for admin account existence.
   * @module tests/api
   */
  import { describe, test, expect } from '@jest/globals';
  import { initDb, getDb } from '../backend/data/db.mjs';

  describe('Database Tests', () => {
    test('Admin account exists', () => {
      // Initialize database to ensure schema and seed data
      initDb();
      // Get database instance
      const db = getDb();
      // Query for admin user
      const admin = db
        .prepare('SELECT email, role FROM users WHERE email = ?')
        .get('admin@example.com');
      // Verify admin account exists
      expect(admin).toBeDefined();
      // Verify admin email
      expect(admin.email).toBe('admin@example.com');
      // Verify admin role
      expect(admin.role).toBe('admin');
    });
  });
  ```

  - **Explanation**:
    - **Test Scope**: Verifies the admin account seeded in `db.mjs` exists.
    - **Why Direct Database Testing?**: Simpler for checking seeded data, avoids API dependencies.
    - **Inline Comments**: Clarify database initialization, querying, and assertions.

- **Testing**:
  - Run `npm test`.
  - **Expected Outcome**: The admin account existence test passes.
  - **Common Issues**:
    - **Database errors**: Ensure `initDb` runs and `db/authmini.db` exists.
    - **Jest config**: Verify `jest.config.mjs` and `--experimental-vm-modules`.
    - **ESM errors**: Ensure `package.json` includes `"type": "module"`.

### Step 12: Set Up CI/CD Pipeline and Deployment

- **Why Deployment and CI/CD?**
  - **Deployment**: Makes the app accessible on a cloud platform (e.g., Render).
  - **CI/CD**: Automates linting, testing, and deployment for quality and efficiency.
- **Code Example** (`.github/workflows/ci.yml`):
  ```yaml
  name: CI
  on: [push, pull_request]
  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - uses: actions/setup-node@v3
          with:
            node-version: '18'
        - run: npm install
        - run: npm run lint
        - run: npm test
  ```
- **Deployment Steps**:
  1. Initialize Git repository (if not done):
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     ```
  2. Create a GitHub repository and push code:
     ```bash
     git remote add origin https://github.com/your-username/authmini.git
     git branch -M main
     git push -u origin main
     ```
  3. Set up Render:
     - Sign up at [render.com](https://render.com).
     - Create a Web Service, select your GitHub repository.
     - Configure:
       - **Runtime**: Node.js.
       - **Build Command**: `npm install`.
       - **Start Command**: `npm start`.
       - **Environment Variables**: Add `PORT`, `JWT_SECRET`, `LOG_LEVEL`.
     - Deploy and verify at the provided URL.
- **Testing**:
  - Push to GitHub and check GitHub Actions for lint/test results.
  - Visit the Render URL (e.g., `https://authmini.onrender.com`) and test the app.
  - **Common Issues**:
    - **Git errors**: Ensure Git is installed and repository is set up.
    - **Render errors**: Verify environment variables and start command.
    - **CI failures**: Check linting/test errors in GitHub Actions logs.

### Step 13: Full Application Testing

- **Backend** (Postman):
  1. Register, login, update profile/password/settings.
  2. Admin: Search users, toggle active status.
  - **Expected Outcome**: All APIs return correct responses.
- **Frontend** (Browser):
  1. Register/login, edit profile, change password, set theme.
  2. Admin: Search users, enable/disable accounts.
  - **Expected Outcome**: UI updates, animations work, validation enforces rules.
- **Automated Tests**:
  - Run `npm test`.
  - **Expected Outcome**: Admin account existence test passes.
- **Lint**:
  - Run `npm run lint`.
  - **Expected Outcome**: No errors.
- **Deployment**:
  - Access the Render URL and repeat frontend/backend tests.
  - **Expected Outcome**: App functions as expected in production.

## Nuances and Art of Coding

- **Service Layer**: Separates concerns, making routes lightweight and logic reusable.
- **Validation**: Client-side checks improve UX.
- **Animations**: Enhance user perception of responsiveness.
- **Testing**: Basic tests build confidence in code.
- **CI/CD**: Automates workflows, ensuring quality and deployment reliability.

## Commenting Guidelines

- **JSDoc**: Document all modules, functions, and parameters (e.g., `@param`, `@returns`).
- **Inline Comments**: Explain business logic (e.g., `// Log user action for audit`).
- **Why**: Ensures consistency, readability, and AI compatibility.
- **Example** (`userService.mjs`):
  ```javascript
  // Hash password for secure storage
  const passwordHash = await bcrypt.hash(newPassword, 10);
  // Update user password in database
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(
    passwordHash,
    userId
  );
  ```

## Preparing for AuthCloud

V2 prepares for AuthCloud by teaching:

- **Code Quality**: ESLint, JSDoc.
- **Testing**: Basic database tests.
- **Organization**: Service layer, modular structure.
- **Deployment**: CI/CD and cloud hosting.
- **Features**: Profile management, admin controls.

## Conclusion

AuthMini V2 extends V1 with professional practices, new features, testing, and deployment, teaching maintainable coding, testing, UX improvements, and production workflows. The 16-file structure, service layer, and CI/CD pipeline prepare developers for real-world projects. Follow the steps, test thoroughly, and experiment with additional features (e.g., email notifications) to deepen learning.

**Next Steps**:

- Build and test V2 locally and in production.
- Experiment with new features.
- Read:
  - [ESLint](https://eslint.org/docs/user-guide/)
  - [Jest](https://jestjs.io/docs/getting-started)
  - [GitHub Actions](https://docs.github.com/en/actions)
  - [Render Documentation](https://render.com/docs)

Happy coding!
