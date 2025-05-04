# AuthMini V2 - Service Layer, Code Quality, Basic Testing, Deployment

An enhanced full-stack authentication app built on **AuthMini V1**, using **Fastify**, **Alpine.js**, **SQLite**, and **ES Modules (ESM)**. Designed for developers to learn advanced full-stack concepts like code quality, testing, service layers, and CI/CD deployment while extending a minimal authentication system.

**Repository**: [https://github.com/voilacode/authmini/tree/v2](https://github.com/voilacode/authmini/tree/v2)

## Overview

AuthMini V2 extends V1’s authentication app by adding **user profile management**, **enhanced admin capabilities**, **improved UX**, **code quality tools** (ESLint, JSDoc), a **service layer**, **basic testing**, and **CI/CD deployment**. It maintains a single Fastify server serving APIs (`/api/*`) and a frontend SPA (`/`) at `http://localhost:3000`. The app prepares developers for scalable systems like **AuthCloud** through professional practices.

## Features

- **User**:
  - Register, log in, log out.
  - View/edit profile (display name, bio, avatar URL).
  - Change password.
  - Manage settings (theme, notifications).
- **Admin**:
  - Log in (`admin@example.com`, `admin123`).
  - View, search, and filter users by email or active status.
  - Enable/disable user accounts.
  - View activity logs.
- **UX Improvements**:
  - Client-side form validation.
  - Better error messages.
  - Loading states and animations.
- **Technical Enhancements**:
  - **ESLint** for code consistency.
  - **JSDoc** for documentation.
  - **Service layer** for organized business logic.
  - **Integration testing** with Jest and Supertest.
  - **CI/CD pipeline** with GitHub Actions.
  - **Deployment** to Render.
- **Tech Stack**:
  - Backend: Fastify, SQLite, bcrypt, JWT.
  - Frontend: Alpine.js, Tailwind CSS, Axios.
  - Tools: ESLint, Jest, Supertest, GitHub Actions.

## Documentation

- [Quick Start and Usage](#setup)
- [Learning Guide](./LEARNING_GUIDE.md): Step-by-step guide to build V2 from V1, covering new features, testing, and deployment.
- [Developer Reference](./DEVELOPER_REFERENCE.md): System architecture, file details, code style, and LLM reference for consistent code generation.

## Prerequisites

- **Node.js**: 18+ (e.g., `v20.17.0`). Check: `node --version`.
- **npm**: 6+ (e.g., `10.8.2`). Check: `npm --version`.
- **Git**: To clone the repository and use CI/CD.
- **Postman**: For API testing.
- **Optional**: SQLite extension for VS Code (e.g., “SQLite” by alexcvzz) to inspect `authmini.db`.

## Setup

1. **Clone the Repository (V2 Branch)**:
   ```bash
   git clone -b v2 https://github.com/voilacode/authmini.git
   cd authmini
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
   - Requires: `better-sqlite3`, `bcrypt`, `dotenv`, `fastify`, `@fastify/static`, `jsonwebtoken`, `axios`, `eslint`, `jest`, `supertest`.
3. **Configure Environment**:
   - Create `authmini/.env`:
     ```
     PORT=3000
     JWT_SECRET=your_jwt_secret_here
     LOG_LEVEL=info
     ```
   - Generate a secret: `openssl rand -base64 32`.
4. **Start Server**:
   ```bash
   npm start
   ```
   - Access: `http://localhost:3000` (frontend).
5. **Run Linting and Tests**:
   - Lint: `npm run lint`
   - Test: `npm test`
   - Test (watch mode): `npm test:watch`

## Usage

1. **Frontend**:
   - Open `http://localhost:3000` in a browser.
   - **Register**: Enter email (`user@example.com`), password (`user123`, 6+ characters) → See “Registration successful.”
   - **Login**: Use same credentials → User dashboard with email, profile edit, settings, and logout.
   - **Profile/Settings**: Edit display name, bio, avatar URL, change password, set theme (light/dark), toggle notifications.
   - **Admin Login**: Use `admin@example.com`, `admin123` → Admin dashboard with user list, search, enable/disable, and activity logs.
   - **Logout**: Returns to login form.
   - **UX**: Expect form validation, error messages, loading animations, and hover effects.
2. **Backend APIs** (Test with Postman):
   - **Register**: `POST http://localhost:3000/api/register`
     ```json
     { "email": "user@example.com", "password": "user123" }
     ```
     - Expect: `201`, `{"message":"User registered"}`
   - **Login**: `POST http://localhost:3000/api/login`
     ```json
     { "email": "user@example.com", "password": "user123" }
     ```
     - Expect: `200`, `{"token":"...","user":{"email":"...","role":"user"}}`
   - **Update Profile**: `POST http://localhost:3000/api/profile`
     - Header: `Authorization: Bearer <token>`
     ```json
     { "display_name": "User", "bio": "Bio", "avatar_url": "" }
     ```
     - Expect: `200`, `{"message":"Profile updated"}`
   - **Change Password**: `POST http://localhost:3000/api/password`
     - Header: `Authorization: Bearer <token>`
     ```json
     { "newPassword": "newpass123" }
     ```
     - Expect: `200`, `{"message":"Password updated"}`
   - **Update Settings**: `POST http://localhost:3000/api/settings`
     - Header: `Authorization: Bearer <token>`
     ```json
     { "theme": "dark", "notifications": true }
     ```
     - Expect: `200`, `{"message":"Settings updated"}`
   - **List Users**: `GET http://localhost:3000/api/users?search=user&active=true`
     - Header: `Authorization: Bearer <admin_token>`
     - Expect: `200`, `{"users":[{"id":1,"email":"...","role":"user","created_at":"...","is_active":1},...]}`
   - **Toggle User**: `POST http://localhost:3000/api/users/2/toggle`
     - Header: `Authorization: Bearer <admin_token>`
     ```json
     { "isActive": false }
     ```
     - Expect: `200`, `{"message":"User disabled"}`
   - **Logout**: `POST http://localhost:3000/api/logout`
     - Expect: `200`, `{"message":"Logged out"}`

## File Structure

- **Root** (4 files):
  - `server.mjs`: Fastify server, serves APIs and frontend.
  - `package.json`: Dependencies, scripts (start, lint, test).
  - `.env`: Environment variables (`PORT`, `JWT_SECRET`, `LOG_LEVEL`).
  - `.gitignore`: Excludes files (`.env`, `authmini.db`, `node_modules`).
  - `README.md`: Quick start and overview.
  - `LEARNING_GUIDE.md`: Guide to build V2 from V1.
  - `DEVELOPER_REFERENCE.md`: Architecture, file details, code style, LLM reference.
  - `.eslintrc.json`: ESLint configuration.
  - `.github/workflows/ci.yml`: GitHub Actions CI/CD pipeline.
- **Backend** (6 files):
  - `backend/data/db.mjs`: SQLite database, includes profiles, settings, logs.
  - `backend/routes/auth.mjs`: Register, login, logout, profile, password, settings APIs.
  - `backend/routes/users.mjs`: Admin APIs (list, search, enable/disable).
  - `backend/services/userService.mjs`: User business logic (profile, settings, password).
  - `backend/services/activityService.mjs`: Activity log logic.
- **Frontend** (5 files):
  - `frontend/index.html`: SPA entry point with profile/settings UI.
  - `frontend/css/styles.css`: Styles with animations, form validation.
  - `frontend/js/app.js`: Manages SPA state, navigation, admin search.
  - `frontend/js/auth.js`: Login/register with client-side validation.
  - `frontend/js/profile.js`: Profile/settings component.
- **Database** (1 file):
  - `db/authmini.db`: SQLite database (created on first run).
- **Tests** (1 file):
  - `tests/api.test.mjs`: API integration tests with Jest and Supertest.

**Total**: 15 files (up from 10 in V1).

## Testing

1. **Frontend**:
   - Browser: `http://localhost:3000`.
   - Console: Check for `app.js loaded`, `auth.js loaded`, `profile.js loaded`.
   - Verify: Login/register forms, user/admin dashboards, profile/settings UI, animations, and validation work.
2. **Backend**:
   - Postman: Test all APIs (register, login, profile, password, settings, users, toggle, logout).
   - Check: `db/authmini.db` contains users, profiles, settings, and logs.
3. **Automated Tests**:
   - Run: `npm test`
   - Verify: Integration tests in `tests/api.test.mjs` pass.
4. **Linting**:
   - Run: `npm run lint`
   - Verify: No ESLint errors/warnings.
5. **Troubleshooting**:
   - **Styles missing**: Clear cache (`Ctrl+Shift+R`), verify `/css/styles.css` loads.
   - **Scripts fail**: Check console, ensure `/js/app.js`, `/js/auth.js`, `/js/profile.js` load.
   - **API errors**: Verify `.env` (`JWT_SECRET`, `LOG_LEVEL`), token in Postman.
   - **Test failures**: Check database state, ensure `initDb` runs in tests.

## Deployment

1. **Push to GitHub**:
   - Initialize Git repository: `git init`.
   - Add files: `git add .`.
   - Commit: `git commit -m "AuthMini V2"`.
   - Push to V2 branch: `git push origin v2`.
2. **Deploy to Render**:
   - Sign up at [render.com](https://render.com).
   - Create a Web Service, link to GitHub repository (`v2` branch).
   - Configure:
     - Runtime: Node.js
     - Build Command: `npm install`
     - Start Command: `npm start`
     - Environment Variables: `PORT`, `JWT_SECRET`, `LOG_LEVEL`
   - Deploy and access via provided URL (e.g., `https://authmini.onrender.com`).
3. **CI/CD**:
   - GitHub Actions runs linting and tests on push to `v2` branch (see `.github/workflows/ci.yml`).
   - Failed checks prevent deployment.

## Notes

- AuthMini V2 builds on V1 to teach **code quality**, **testing**, **service layers**, and **deployment**.
- Uses a single server for simplicity, serving APIs and frontend.
- For production, add:
  - Security: Input sanitization, rate limiting, HTTPS.
  - Persistence: Replace SQLite with a persistent database.
  - Testing: Unit and end-to-end tests.
- Report issues or contribute at [https://github.com/voilacode/authmini](https://github.com/voilacode/authmini).

## License

MIT
