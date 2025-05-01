# Learning Guide for Building AuthMini V2

**Version**: 2.1  
**Application**: AuthMini V2  
**Created by**: Krishna Teja GS  
**Date**: May 1, 2025

## Purpose

This guide builds on **AuthMini V1** to enhance developers' skills by introducing **code quality**, **feature enhancements**, **basic testing**, and **deployment concepts** while extending the existing codebase. It prepares developers for advanced systems like **AuthCloud** by focusing on maintainable, well-documented, and testable code.

**AuthMini V2** extends the V1 authentication app by adding features like profile management, enhanced admin capabilities, and improved UX, while introducing **ESLint**, **JSDoc documentation**, a **service layer**, **basic testing**, and **CI/CD deployment**. The goal is to teach professional coding practices, project organization, feature development, and deployment workflows without overwhelming complexity.

We continue leveraging **AI** to generate code snippets, ensuring both **developer-written** and **AI-generated** code align with strict standards for readability, maintainability, and consistency. The single **Fastify server** remains, serving APIs (`/api/*`) and frontend (`/`) at `http://localhost:3000`.

AuthMini V2 adds **6 new files** (2 backend, 2 frontend, 2 root) to the existing 10, for a total of **16 files**, and modifies several V1 files to support new features and standards. A new `.node-version` file is also added to ensure compatibility with Render’s Node.js version (20.15.1), bringing the total to **17 files**.

This guide provides a step-by-step approach with **code snippets**, **detailed comments**, **explanations**, and **manual testing** using **Postman** for APIs and a browser for the frontend, alongside introductions to **automated testing** and **deployment**. Essential inline comments have been added to clarify key business logic, making the code more accessible for learning.

---

## Pre-requisites

Before starting, ensure you have:

- **Completed AuthMini V1**: Familiarity with V1’s 10-file structure, Fastify, Alpine.js, SQLite, and ESM.
- **Basic JavaScript Knowledge**: Understanding of promises, async/await, and modules.
- **Familiarity with Web Development**: Basic knowledge of APIs, frontend-backend interaction, and HTTP.
- **Tools Installed**:
  - Node.js 20.15.1 (specific version required for Render compatibility due to issues with Node.js 22.x and `better-sqlite3`). Check: `node --version`.
  - npm 6+ (e.g., 10.8.2). Check: `npm --version`.
  - SQLite (`sqlite3 --version`, optional as `better-sqlite3` includes it).
  - Postman for API testing.
  - Git (`git --version`, for CI/CD).
  - A code editor (e.g., VS Code) with SQLite extension (e.g., “SQLite” by alexcvzz).
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

1. Extend AuthMini V1 to V2, adding **6 new files** and modifying existing ones for a **17-file structure** (including `.node-version`).
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
  - ESLint for code consistency (updated to allow `console.log` for debugging).
  - JSDoc for documentation.
  - Service layer for business logic.
  - Integration tests for APIs, frontend tests, CI/CD pipeline.
  - Deployment to a cloud platform (Render, with Node.js 20.15.1).
- **Nuance**: Focus on maintainability and incremental additions, avoiding complex patterns like multi-tenancy.

### Step 2: Set Up Extended Project Structure

- **Why**: Organizes new files and updates V1 structure.
- **How**: Add 6 new files, modify V1 files, and include `.node-version` for Render compatibility.
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
  │   └── authmini.db                  # Updated: New tables, included in Git for Render
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
  ├── server.mjs                       # Updated: Add service routes, Render port/host
  ├── package.json                     # Updated: Add ESLint, Jest, Node.js 20.15.1
  ├── .env                             # Updated: Add new variables, Render port/host
  ├── .eslintrc.json                   # NEW: ESLint configuration
  ├── .node-version                    # NEW: Specifies Node.js 20.15.1 for Render
  ├── jest.config.mjs                  # NEW: Jest configuration for ESM
  ├── .gitignore                       # Updated: Include authmini.db, keep node_modules/, .env
  └── .github/workflows/ci.yml         # NEW: GitHub Actions CI/CD
  ```
- **Total Files**: 17 (6 backend, 5 frontend, 6 root).
- **New Files**:
  - `backend/services/userService.mjs`: User-related business logic.
  - `backend/services/activityService.mjs`: Activity log logic.
  - `frontend/js/profile.js`: Profile/settings component.
  - `tests/api.test.mjs`: Admin account existence test.
  - `.eslintrc.json`: ESLint configuration.
  - `jest.config.mjs`: Jest configuration for ESM support.
  - `.node-version`: Specifies Node.js 20.15.1 for Render compatibility.
  - `.github/workflows/ci.yml`: CI/CD pipeline.
- **Modified Files**:
  - `backend/data/db.mjs`: Add profile/settings tables, activity logs.
  - `backend/routes/auth.mjs`: Refactored to use service layer for register/login.
  - `backend/routes/users.mjs`: Add search, enable/disable.
  - `frontend/css/styles.css`: Add form styles, animations.
  - `frontend/js/app.js`: Handle profile/settings state.
  - `frontend/js/auth.js`: Add client-side validation.
  - `frontend/index.html`: Add profile/settings UI.
  - `server.mjs`: Register new routes, update logging, support Render port/host.
  - `package.json`: Add ESLint, Jest, specify Node.js 20.15.1.
  - `.env`: Add new environment variables, support Render port/host.
  - `.gitignore`: Remove `db/authmini.db`, keep `node_modules/`, `.env`.
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
  touch authmini/.node-version
  touch authmini/.github/workflows/ci.yml
  ```
- **Nuance**:
  - `.env`, `.eslintrc.json`, `jest.config.mjs`, and `.github/workflows/ci.yml` are added to `.gitignore` for security and cleanliness.
  - `authmini.db` is included in Git for Render deployment to simplify testing, though this is not ideal as each `git pull` will overwrite the database. This is done for learning purposes only.

### Step 3: Verify System Requirements

- **Why**: Ensures tools support new dependencies (ESLint, Jest, GitHub Actions) and Render’s Node.js version (20.15.1).
- **How**: Confirm Node.js, npm, SQLite, and add Git for CI/CD.
- **Steps**:
  1. **Node.js**: `node --version` (must be 20.15.1 due to `better-sqlite3` issues with Node.js 22.x).
     - **If Incorrect Version**:
       - Use a version manager like `nvm`:
         ```bash
         nvm install 20.15.1
         nvm use 20.15.1
         ```
       - Verify: `node --version`.
  2. **npm**: `npm --version` (6+).
  3. **SQLite**: `sqlite3 --version` (optional, `better-sqlite3` handles it).
  4. **Git**: `git --version` (for CI/CD).
     - **If Missing**:
       - Install: [git-scm.com](https://git-scm.com/downloads).
       - Verify: `git --version`.
     - **Common Issues**:
       - **Command not found**: Add Git to PATH.
  - **Note**: V1 setup should suffice, but Git is new for CI/CD, and Node.js 20.15.1 is required for Render.
- **Testing**:
  - Run: `node --version`, `npm --version`, `git --version`.
  - **Expected Outcome**: Node.js 20.15.1, npm 6+, Git installed, no errors.
  - **Common Issues**:
    - **Build errors**: Ensure `python3`, `make`, `g++` (V1 Step 3).
    - **Node version mismatch**: Use `nvm` to set 20.15.1.
    - **Git missing**: Install Git for CI/CD.

### Step 4: Install New Dependencies and Configure Environment

- **Why**: Adds ESLint, Jest, and CI/CD tools, and ensures Node.js 20.15.1 for Render.
- **How**: Update `package.json`, `.env`, create `.eslintrc.json`, `jest.config.mjs`, and `.node-version`.
- **Code Example** (`package.json`):
  ```json
  {
    "name": "authmini",
    "version": "2.1.0",
    "type": "module",
    "engines": {
      "node": "20.15.1"
    },
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
      "eslint": "^8.57.0",
      "jest": "^29.0.0",
      "supertest": "^6.0.0"
    }
  }
  ```
  - **Explanation**:
    - **New Dependencies**:
      - `eslint`: Linting for code quality (version 8.57.0, updated for AuthMini V2).
      - `jest`: Testing framework.
      - `supertest`: API testing with Fastify.
    - **Scripts**:
      - `lint`: Runs ESLint.
      - `test`: Runs Jest with `--experimental-vm-modules` for ESM support.
      - `test:watch`: Runs Jest in watch mode with ESM support.
    - **Node.js Version**:
      - `"engines": { "node": "20.15.1" }`: Specifies Node.js 20.15.1 for Render compatibility, avoiding issues with `better-sqlite3` on Node.js 22.x.
    - **Note**: Added `axios` to dependencies (used in frontend).
    - **Why `--experimental-vm-modules`?**: Enables Jest to handle ESM modules, critical for `"type": "module"`.
- **Code Example** (`.node-version`):
  ```
  20.15.1
  ```
  - **Explanation**:
    - Specifies Node.js 20.15.1 for Render and local development.
    - Used by tools like `nvm` and Render to ensure the correct Node.js version.
- **Code Example** (`.env`):
  ```
  PORT=3000
  JWT_SECRET=your_jwt_secret_here
  LOG_LEVEL=info
  NODE_ENV=development
  ```
  - **Explanation**:
    - **New Variable**: `LOG_LEVEL` for Fastify logging.
    - **Updated Usage**:
      - `PORT` and `NODE_ENV` are critical for Render deployment. Render may assign a dynamic `PORT` (e.g., 10000), and `NODE_ENV=production` ensures the server binds to `0.0.0.0` instead of `localhost`.
      - Other cloud providers (e.g., Heroku, AWS) may have different port/host requirements, so always check their documentation.
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
      "no-console": "off",
      "no-undef": ["error"]
    },
    "globals": {
      "axios": "readonly",
      "Alpine": "readonly"
    }
  }
  ```
  - **Explanation**:
    - **Purpose**: Enforces consistent style (2-space indent, single quotes, semicolons).
    - **Updated Rules**:
      - `"no-console": "off"`: Allows `console.log` statements for debugging, reflecting AuthMini V2’s educational focus where `console.log` is permitted in frontend code.
      - `"no-undef": ["error"]` with `globals`: Defines `axios` and `Alpine` as readonly globals to fix `axios is not defined` errors in `app.js`, `auth.js`, and `profile.js`.
    - **Nuance**: Supports ESM (`sourceType: "module"`). Updated to ESLint 8.57.0 for improved compatibility and error handling.
- **Code Example** (`jest.config.mjs`):
  ```javascript
  /**
   * Jest configuration for AuthMini V2.
   * @module jest.config
   */
  export default {
    testMatch: ['**/tests/**/*.test.mjs'],
    transform: {}, // disable babel
  };
  ```
  - **Explanation**:
    - **Purpose**: Configures Jest for ESM support, targeting `.mjs` test files.
    - **Settings**:
      - `testMatch`: Ensures tests in `tests/` with `.test.mjs` extension are run.
      - `transform`: Disabled for native ESM.
- **Code Example** (`.gitignore`):
  ```
  node_modules/
  .env
  ```
  - **Explanation**:
    - **Updated**: Removed `db/authmini.db` to include the SQLite database in Git for Render deployment.
    - **Why Include `authmini.db`?**: Simplifies testing on Render by ensuring the database is available with seeded data (e.g., admin account). This is not ideal, as each `git pull` will overwrite the database, erasing any changes. This approach is used for learning and testing purposes only. In production, use a persistent database (e.g., PostgreSQL).
    - **Kept**: `node_modules/` and `.env` to exclude sensitive data and dependencies.
- **Steps**:
  1. Update `package.json` with new dependencies, scripts, and `"engines"`.
  2. Create `.node-version` with `20.15.1`.
  3. Update `.env` with `LOG_LEVEL` and verify `PORT`, `NODE_ENV`.
  4. Create `.eslintrc.json` and `jest.config.mjs`.
  5. Update `.gitignore` to remove `db/authmini.db`.
  6. Run `npm install`.
- **Testing**:
  - Verify `node_modules/` updates.
  - Run `node --version` to confirm 20.15.1.
  - Run `npm run lint` (may show errors, fixed later).
  - Run `npm test` to verify Jest setup.
  - **Common Issues**:
    - **Permission errors**: Use `sudo` or fix permissions.
    - **Module not found**: Ensure `npm install` ran.
    - **Jest errors**: Verify `jest.config.mjs` and `--experimental-vm-modules`.
    - **Node version mismatch**: Use `nvm use 20.15.1`.

## Snapshot of AuthMini V2 Files

| File                                   | Purpose                                                   | Key Variables                                 | Key Methods (Arguments)                                                                  |
| -------------------------------------- | --------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `server.mjs`                           | Fastify server, serves APIs/frontend                      | `fastify`, `__dirname`                        | `startServer()`: Starts server                                                           |
| `package.json`                         | Dependencies, scripts (lint, test), Node.js 20.15.1       | None                                          | None                                                                                     |
| `.env`                                 | Environment variables (`PORT`, `JWT_SECRET`, `LOG_LEVEL`) | `PORT`, `JWT_SECRET`, `LOG_LEVEL`, `NODE_ENV` | None                                                                                     |
| `.eslintrc.json`                       | ESLint configuration                                      | None                                          | None                                                                                     |
| `.node-version`                        | Specifies Node.js 20.15.1 for Render                      | None                                          | None                                                                                     |
| `jest.config.mjs`                      | Jest configuration for ESM                                | None                                          | None                                                                                     |
| `.gitignore`                           | Excludes `node_modules/`, `.env`                          | None                                          | None                                                                                     |
| `.github/workflows/ci.yml`             | CI/CD pipeline (lint, test)                               | None                                          | None                                                                                     |
| `backend/data/db.mjs`                  | SQLite database, new tables (profiles, settings, logs)    | `db`, `__dirname`                             | `initDb()`: Initializes database<br>`getDb()`: Returns instance                          |
| `backend/routes/auth.mjs`              | Auth routes (register, login, logout, profile, password)  | None                                          | `registerRoutes(fastify, options)`: Registers routes                                     |
| `backend/routes/users.mjs`             | Admin routes (list, search, enable/disable)               | None                                          | `registerUserRoutes(fastify, options)`: Registers routes                                 |
| `backend/services/userService.mjs`     | User business logic (profile, settings, password)         | None                                          | `registerUser(email, password)`: Registers user<br>`loginUser(email, password)`: Logs in |
| `backend/services/activityService.mjs` | Activity log logic                                        | None                                          | `logActivity(userId, action)`: Logs action<br>`getActivityLogs(filters)`: Gets logs      |
| `frontend/index.html`                  | SPA entry point, adds profile/settings UI                 | None (HTML)                                   | None                                                                                     |
| `frontend/css/styles.css`              | Styles with animations, form validation                   | None (CSS)                                    | None                                                                                     |
| `frontend/js/app.js`                   | SPA state, navigation, profile/settings                   | None                                          | `app()`: Alpine.js component with `init()`, `logout()`, `updateSettings()`               |
| `frontend/js/auth.js`                  | Login/register with validation                            | None                                          | `authComponent()`: Alpine.js component with `submit(action)`, `validate()`               |
| `frontend/js/profile.js`               | Profile/settings component                                | None                                          | `profileComponent()`: Alpine.js component with `saveProfile()`, `changePassword()`       |
| `tests/api.test.mjs`                   | Admin account existence test                              | None                                          | None (Jest tests)                                                                        |

- **Nuance**: Refer to this table for file purposes and key methods. The `.node-version` file ensures Render uses Node.js 20.15.1, and `.gitignore` now includes `authmini.db` for learning purposes.

## Development Process: Extending AuthMini V1 to V2

### Step 5: Configure ESLint and Fix V1 Code

- **Why**: Ensures consistent code style across V1 and V2, with updated ESLint rules.
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
  - **Expected Outcome**: No errors/warnings, as `no-console` is disabled and `axios`, `Alpine` are defined in `globals`.
  - **Common Issues**:
    - **Syntax errors**: Follow ESLint suggestions.
    - **Config issues**: Verify `.eslintrc.json` (e.g., `"no-console": "off"`, `globals`).

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

- **Why**: Supports profiles, settings, and logs, with `authmini.db` included in Git for Render.
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
    - **Nuance**:
      - Foreign keys ensure data integrity.
      - `authmini.db` is included in Git to ensure Render has the seeded admin account and schema, but this means `git pull` will overwrite changes. Use a persistent database in production.

- **Testing**:
  - Update `test-db.mjs` (from V1):
    ```javascript
    import { initDb } from './backend/data/db.mjs';
    initDb();
    console.log('Database initialized');
    ```
  - Run: `node test-db.mjs`.
  - Check `authmini.db` with SQLite extension for new tables.
  - **Expected Outcome**: `profiles`, `settings`, `activity_logs` tables exist, admin account seeded.
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
    - **Database overwritten**: Note that `authmini.db` in Git may reset data on `git pull`.

### Step 9: Update Backend Routes

- **Why**: Add profile, password, search, and enable/disable routes using the service layer, with Render-compatible server configuration.
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
      // Start server on specified port for Render (e.g., 10000)
      const port = process.env.PORT || 3000;
      // Bind to 0.0.0.0 in production (Render), otherwise use default (localhost)
      const host =
        process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1';
      await fastify.listen({ port, host });
      fastify.log.info(`Server running on port ${port}`);
    } catch (err) {
      // Log and exit on server failure
      fastify.log.error(err);
      process.exit(1);
    }
  }

  // Start the server
  startServer();
  ```

  - **Explanation**:
    - **Render Compatibility**:
      - `port = process.env.PORT || 3000`: Uses Render’s assigned `PORT` (e.g., 10000) in production, falls back to 3000 locally.
      - `host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1'`: Binds to `0.0.0.0` in production for Render’s external access, uses `localhost` in development.
    - **Cloud Provider Variations**:
      - Render requires `0.0.0.0` and a dynamic `PORT`. Other providers (e.g., Heroku) may use different environment variables (e.g., `PORT`), and AWS may require specific security groups. Always check the provider’s documentation for host/port configuration.
    - **Nuance**: The `.env` file supports this with `NODE_ENV` and `PORT`.

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
    - **Database errors**: Check schema, ensure `authmini.db` is in Git.

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
          // Fetch profile and settings (mocked as API not implemented)
          // const res = await axios.get('/api/profile', { headers: { Authorization: `Bearer ${token}` } });
          // this.profile = res.data.profile || this.profile;
          // this.settings = res.data.settings || this.settings;
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
    - **Port issues**: Ensure `PORT=3000` in `.env` or matches `server.mjs`.

### Step 11: Add Basic Testing

- **Why Testing?**  
  Testing ensures code reliability and validates new features in V2. Here’s the ideology and approach:

  - **Ideology**:
    - **Purpose**: Verifies that code works as expected, catching bugs early and ensuring features (e.g., profile management, admin controls) function correctly.
    - **Why Now?**: V2’s increased complexity (new routes, service layer) raises error risks, making testing essential.
    - **Professional Practice**: Testing is standard in real-world development, building good habits.
    - **Confidence**: Enables refactoring without breaking functionality.
    - **Preparation for Future**: Lays groundwork for advanced testing in AuthMini V3 (e.g., unit tests, ORM-based tests).
  - **Why Jest and Supertest?**:
    - **Jest**: Beginner-friendly testing framework for unit and integration tests.
    - **Supertest**: Simplifies API testing by simulating HTTP requests to Fastify routes.
    - **Simplicity**: Aligns with V2’s goal of introducing testing without complexity.
  - **How to Use**:
    - **Setup**: Configure Jest/Supertest in `package.json` and `jest.config.mjs`.
    - **Write Tests**: Create integration tests for APIs (`/api/register`, `/api/login`, admin account).
    - **Run Tests**: Use `npm test` or `npm test:watch` for development.
    - **CI/CD Integration**: Tests run automatically in GitHub Actions.

- **How**: Create `tests/api.test.mjs` for integration tests.
- **Code Example** (`tests/api.test.mjs`):

  ```javascript
  /**
   * Integration tests for AuthMini APIs.
   * @module tests/api
   */
  import supertest from 'supertest';
  import Fastify from 'fastify';
  import { registerRoutes } from '../backend/routes/auth.mjs';
  import { registerUserRoutes } from '../backend/routes/users.mjs';
  import { initDb } from '../backend/data/db.mjs';

  // Initialize Fastify test server
  const fastify = Fastify({ logger: false });
  let request;

  // Setup before all tests
  beforeAll(async () => {
    // Initialize database
    initDb();
    // Register routes
    await fastify.register(registerRoutes, { prefix: '/api' });
    await fastify.register(registerUserRoutes, { prefix: '/api' });
    // Initialize supertest
    request = supertest(fastify.server);
  });

  // Cleanup after all tests
  afterAll(async () => {
    // Close Fastify server
    await fastify.close();
  });

  // Test admin account existence
  describe('Admin Account', () => {
    test('should confirm admin account exists', async () => {
      // Send login request for admin
      const response = await request
        .post('/api/login')
        .send({ email: 'admin@example.com', password: 'admin123' })
        .expect(200);
      // Verify response contains token and admin role
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('role', 'admin');
    });
  });

  // Test user registration
  describe('User Registration', () => {
    test('should register a new user', async () => {
      // Send registration request
      const response = await request
        .post('/api/register')
        .send({ email: 'test@example.com', password: 'test123' })
        .expect(201);
      // Verify success message
      expect(response.body).toEqual({ message: 'User registered' });
    });

    test('should fail to register duplicate email', async () => {
      // Send duplicate registration request
      const response = await request
        .post('/api/register')
        .send({ email: 'test@example.com', password: 'test123' })
        .expect(400);
      // Verify error message
      expect(response.body.error).toMatch(/Email already exists/);
    });
  });

  // Test user login
  describe('User Login', () => {
    test('should login with valid credentials', async () => {
      // Send login request
      const response = await request
        .post('/api/login')
        .send({ email: 'test@example.com', password: 'test123' })
        .expect(200);
      // Verify response contains token and user data
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('email', 'test@example.com');
    });

    test('should fail with invalid credentials', async () => {
      // Send invalid login request
      const response = await request
        .post('/api/login')
        .send({ email: 'test@example.com', password: 'wrong' })
        .expect(401);
      // Verify error message
      expect(response.body.error).toMatch(/Invalid credentials/);
    });
  });
  ```

- **Explanation**:

  - **Purpose**: Tests critical APIs to ensure functionality (admin login, user registration, login).
  - **Setup**:
    - Initializes Fastify test server with routes.
    - Uses `initDb()` for SQLite (`authmini.db`, included in Git for seeded admin account).
    - `beforeAll`/`afterAll` manage server lifecycle.
  - **Tests**:
    - **Admin Account**: Verifies `admin@example.com` exists with `role: admin`.
    - **Registration**: Tests successful registration and duplicate email failure.
    - **Login**: Tests valid/invalid credentials.
  - **Nuance**:
    - Uses `--experimental-vm-modules` in `package.json` for ESM support.
    - `authmini.db` in Git ensures seeded admin account, but `git pull` overwrites the database (non-ideal, for learning). AuthMini V3 will address this with a persistent database.

- **Testing**:
  - Run: `npm test`.
  - **Expected Outcome**: All tests pass.
  - Run: `npm test:watch` for interactive development.
  - **Common Issues**:
    - **Jest errors**: Verify `jest.config.mjs` (`transform: {}`, `testMatch` for `.mjs`).
    - **Database errors**: Ensure `authmini.db` exists and `initDb()` runs.
    - **Module errors**: Check `supertest`, `jest` in `package.json`.
    - **Node version**: Use Node.js 20.15.1 (`nvm use 20.15.1`).

### Step 12: Perform Local Manual Checks Before CI/CD

- **Why Manual Checks?**  
  Local manual checks ensure the app is stable before CI/CD, verifying linting, tests, and functionality to reduce pipeline failures.

  - **Purpose**:
    - **Code Quality**: Ensure ESLint passes for consistent style.
    - **Tests**: Confirm Jest tests succeed.
    - **Functionality**: Manually test APIs/UI for issues not caught by tests.
    - **Efficiency**: Fix issues locally to save CI/CD resources.
  - **Why Before CI/CD?**: Mimics professional workflows, reinforcing debugging skills.

- **How**: Run linting, tests, and manual tests.
- **Steps**:

  1. **Run ESLint**:
     - Command: `npm run lint`.
     - **Purpose**: Enforces style (2-space indent, single quotes, semicolons).
     - **Expected Outcome**: No errors, as `no-console` is off and `axios`/`Alpine` are globals in `.eslintrc.json`.
     - **Fixes**:
       - Add semicolons, use single quotes.
       - Example (`frontend/js/app.js`):
         ```javascript
         // Before
         console.log('Debug');
         // After
         console.log('Debug');
         ```
  2. **Run Tests**:
     - Command: `npm test`.
     - **Purpose**: Verifies `tests/api.test.mjs`.
     - **Expected Outcome**: All tests pass.
     - **Fixes**:
       - Database: Ensure `authmini.db` is initialized.
       - Test failures: Debug `auth.mjs`, `users.mjs`.
  3. **Test APIs with Postman**:
     - **Endpoints**:
       - **POST `/api/register`**:
         - Body: `{"email":"test2@example.com","password":"test123"}`.
         - Expected: `201`, `{ message: "User registered" }`.
       - **POST `/api/login`**:
         - Body: `{"email":"test2@example.com","password":"test123"}`.
         - Expected: `200`, `{ token, user }`.
       - **POST `/api/profile`**:
         - Header: `Authorization: Bearer [token]`.
         - Body: `{"display_name":"Test","bio":"Bio","avatar_url":""}`.
         - Expected: `200`, `{ message: "Profile updated" }`.
       - **POST `/api/password`**:
         - Header: `Authorization: Bearer [token]`.
         - Body: `{"newPassword":"newpass123"}`.
         - Expected: `200`, `{ message: "Password updated" }`.
       - **GET `/api/users?search=test`** (admin):
         - Header: `Authorization: Bearer [admin token]`.
         - Expected: `200`, `{ users: [...] }`.
       - **POST `/api/users/2/toggle`** (admin):
         - Header: `Authorization: Bearer [admin token]`.
         - Body: `{"isActive":false}`.
         - Expected: `200`, `{ message: "User disabled" }`.
     - **Issues**:
       - **401**: Check token.
       - **403**: Use admin token for `/api/users`.
       - **Database**: Ensure `authmini.db` is seeded.
  4. **Test Frontend in Browser**:
     - Run: `npm start`.
     - Open: `http://localhost:3000`.
     - **User Flow**:
       - Register (`test3@example.com`/`test123`).
       - Login, access dashboard.
       - Edit profile, change password, update settings.
       - Verify animations, validation.
     - **Admin Flow**:
       - Login (`admin@example.com`/`admin123`).
       - Search users, toggle status.
       - Verify loading states, user list.
     - **Expected Outcome**: Forms validate, profile saves, admin functions work, animations visible.
     - **Issues**:
       - **Validation**: Check `auth.js`.
       - **API**: Verify routes, token.
       - **Port**: Ensure `PORT=3000` in `.env`.
  5. **Verify Node.js**:
     - Command: `node --version`.
     - **Expected Outcome**: `v20.15.1`.
     - **Fix**: `nvm use 20.15.1`.

- **Testing**:
  - Run: `npm run lint`, `npm test`, Postman, browser, `node --version`.
  - **Expected Outcome**: No errors, tests pass, app works, Node.js 20.15.1.
  - **Issues**:
    - **Lint**: Fix per ESLint or check `.eslintrc.json`.
    - **Tests**: Debug API/database.
    - **UI**: Check browser console.
    - **Node**: Use `nvm`.

### Step 13: Set Up CI/CD Pipeline with GitHub Actions

- **Why CI/CD?**  
  CI/CD automates testing and deployment for code quality and efficiency.

  - **Purpose**:
    - **Automate Testing**: Runs ESLint/Jest on push.
    - **Deploy**: Deploys to Render after tests pass.
    - **Professional Practice**: Teaches real-world workflows.
  - **Why GitHub Actions?**: Easy, free, integrates with GitHub.
  - **Scope**: Run linting/tests on `main`, deploy to Render.

- **How**: Create `.github/workflows/ci.yml`.
- **Code Example** (`.github/workflows/ci.yml`):

  ```yaml
  name: CI/CD for AuthMini V2

  on:
    push:
      branches:
        - main

  jobs:
    test:
      runs-on: ubuntu-latest

      steps:
        - name: Checkout code
          uses: actions/checkout@v4

        - name: Set up Node.js
          uses: actions/setup-node@v4
          with:
            node-version: '20.15.1'

        - name: Install dependencies
          run: npm install

        - name: Run linting
          run: npm run lint

        - name: Run tests
          run: npm test

    deploy:
      needs: test
      runs-on: ubuntu-latest
      if: github.ref == 'refs/heads/main'

      steps:
        - name: Checkout code
          uses: actions/checkout@v4

        - name: Deploy to Render
          env:
            RENDER_API_KEY: ${{ secrets.RENDER_API_KEY }}
            RENDER_SERVICE_ID: ${{ secrets.RENDER_SERVICE_ID }}
          run: |
            curl -X POST \
              -H "Authorization: Bearer $RENDER_API_KEY" \
              -H "Content-Type: application/json" \
              https://api.render.com/v1/services/$RENDER_SERVICE_ID/deploys
  ```

- **Explanation**:

  - **Jobs**:
    - **test**: Runs ESLint, Jest on `main`.
    - **deploy**: Triggers Render deployment after tests.
  - **Secrets**:
    - `RENDER_API_KEY`, `RENDER_SERVICE_ID`: Added in GitHub settings.
  - **Nuance**:
    - Node.js 20.15.1 matches `.node-version`.
    - `authmini.db` in Git ensures admin account, but overwrites on `git pull` (non-ideal; V3 will use persistent database).

- **Steps**:

  1. Create `.github/workflows/ci.yml`.
  2. Add secrets in GitHub (`Settings > Secrets and variables > Actions`):
     - `RENDER_API_KEY` (from Render).
     - `RENDER_SERVICE_ID` (from Render).
  3. Commit/push:
     ```bash
     git add .
     git commit -m "Add CI/CD pipeline"
     git push origin main
     ```
  4. Check GitHub Actions (`Actions` tab).

- **Testing**:
  - Push to `main`.
  - Monitor GitHub Actions.
  - **Expected Outcome**: Tests pass, Render deploys.
  - **Issues**:
    - **Lint/test failures**: Fix locally.
    - **Secrets**: Verify `RENDER_API_KEY`, `RENDER_SERVICE_ID`.
    - **Node**: Ensure `node-version: '20.15.1'`.
    - **Database**: Note `authmini.db` reset.

### Step 14: Deploy to Render

- **Why Deploy?**  
  Deployment makes V2 accessible online, teaching cloud hosting.

  - **Purpose**:
    - **Real-World**: Learn deployment workflows.
    - **Validate**: Ensure app works in production.
    - **CI/CD**: Complete pipeline with deployment.
  - **Why Render?**: Simple, free, supports Node.js 20.15.1.
  - **Scope**: Deploy via GitHub, use `authmini.db` in Git, support dynamic `PORT`.

- **How**: Upload to GitHub, link to Render.
- **Steps**:

  1. **Prepare Code**:
     - Ensure `authmini.db` in `db/` (not in `.gitignore`).
     - Verify `.node-version`: `20.15.1`.
     - Verify `package.json`: `"engines": { "node": "20.15.1" }`.
     - Verify `server.mjs`:
       ```javascript
       const port = process.env.PORT || 3000;
       const host =
         process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1';
       await fastify.listen({ port, host });
       ```
  2. **Upload to GitHub**:
     - **Personal Repository**:
       ```bash
       git init
       git add .
       git commit -m "AuthMini V2"
       git branch -M main
       git remote add origin https://github.com/yourusername/authmini-v2.git
       git push -u origin main
       ```
     - **Clone `voilacode`**:
       ```bash
       git clone -b v2 https://github.com/voilacode/authmini.git authmini-v2
       cd authmini-v2
       git remote set-url origin https://github.com/yourusername/authmini-v2.git
       git push -u origin main
       ```
  3. **Set Up Render**:
     - Sign up: [render.com](https://render.com).
     - Create Web Service, connect GitHub repository.
     - Configure:
       - Name: `authmini-v2`.
       - Environment: Node.
       - Branch: `main`.
       - Build Command: `npm install`.
       - Start Command: `npm start`.
     - Environment variables:
       - `PORT`: `10000` (or blank for dynamic).
       - `NODE_ENV`: `production`.
       - `JWT_SECRET`: `openssl rand -base64 32`.
       - `LOG_LEVEL`: `info`.
     - Deploy.
  4. **Verify**:
     - Check Render logs.
     - Access Render URL (e.g., `https://authmini-v2.onrender.com`).
     - Test APIs/UI (same as Step 12).
  5. **Automate**:
     - Ensure `.github/workflows/ci.yml` exists.
     - Verify GitHub secrets.
     - Push to `main` for CI/CD.

- **Explanation**:

  - **GitHub**:
    - Personal repo: Full control.
    - `voilacode`: Uses `https://github.com/voilacode/authmini/tree/v2`.
  - **Render**:
    - Node.js 20.15.1 via `.node-version`, `package.json`.
    - Dynamic `PORT` (e.g., 10000), `0.0.0.0` for production.
    - **Cloud Variations**: Render uses `PORT`, `0.0.0.0`; Heroku/AWS may differ (check docs).
  - **Database**:
    - `authmini.db` in Git simplifies deployment but overwrites on `git pull` (non-ideal; V3 will use persistent database).
  - **CI/CD**: Automates deployment after tests.

- **Testing**:
  - Access Render URL.
  - Run Postman/UI tests.
  - **Expected Outcome**: App loads, APIs/UI work.
  - **Issues**:
    - **Build**: Check Render logs.
    - **Port**: Verify `server.mjs`.
    - **Database**: Ensure `authmini.db` seeded.
    - **Secrets**: Check `JWT_SECRET`.

### Step 15: Conclusion and Next Steps

- **Summary**:  
  AuthMini V2 extended V1 with profile management, admin capabilities, UX improvements, service layer, ESLint, Jest, and CI/CD. You’ve learned to:

  - Organize code with `userService.mjs`, `activityService.mjs`.
  - Enforce quality with ESLint (`no-console` off, `axios`/`Alpine` globals).
  - Write integration tests with Jest/Supertest.
  - Perform local checks (linting, tests, manual).
  - Set up CI/CD with GitHub Actions.
  - Deploy to Render with Node.js 20.15.1, handling `authmini.db` in Git.

- **Key Takeaways**:

  - **Service Layer**: Enhances maintainability.
  - **Testing**: Ensures reliability.
  - **CI/CD**: Streamlines workflows.
  - **Database**: Including `authmini.db` in Git is non-ideal; V3 will address this.
  - **Cloud**: Render’s port/host differs from other providers.

- **What’s Next?**:

  - **AuthMini V3**: Will focus on:
    - **Persistent Database**: Use PostgreSQL for production-ready storage.
    - **ORM**: Implement Prisma for type-safe queries.
    - **Pagination**: Add server-side pagination for user lists/logs.
    - **Migrations**: Manage schema changes.
    - **Seeding**: Initialize data consistently.
    - **Cache**: Use Redis for performance.
  - **Deepen Skills**:
    - Add unit tests for services.
    - Explore other clouds (Heroku, AWS).
    - Contribute to `https://github.com/voilacode/authmini`.
  - **Resources**:
    - 🔗 [Jest](https://jestjs.io/docs/getting-started)
    - 🔗 [Render](https://render.com/docs)
    - 🔗 [GitHub Actions](https://docs.github.com/en/actions)

- **Final Notes**:
  - **Review**: Revisit steps 1–14.
  - **Experiment**: Add features (e.g., avatar upload).
  - **Non-Ideal**: `authmini.db` in Git simplifies learning but not for production.
  - **Feedback**: Share at `https://github.com/voilacode/authmini/issues`.

Congratulations on completing AuthMini V2! You’re ready for V3’s advanced features.

---
