# AuthMini V3 - Database Practices, Testing Strategies

A production-ready authentication application built on **AuthMini V2**, using **Fastify**, **Alpine.js**, **PostgreSQL**, **Prisma ORM**, and **ES Modules (ESM)**. Designed for developers to learn database best practices, migrations, seeding, and comprehensive testing strategies while maintaining a robust authentication system.

**Repository**: [https://github.com/voilacode/authmini/tree/v3](https://github.com/voilacode/authmini/tree/v3)

## Overview

AuthMini V3 extends V2's authentication app by replacing SQLite with **PostgreSQL** for data persistence, implementing **Prisma ORM** for type-safe database operations, adding **migrations** for schema management, **seeding** for consistent data initialization, and a **comprehensive testing strategy** with unit, integration, and API tests. It maintains a single Fastify server serving APIs (`/api/*`) and a frontend SPA (`/`) at `http://localhost:3000` locally or a dynamic port on Render.

## Features

AuthMini V3 adds to V2's features:

- **PostgreSQL Database**: Persistent, scalable database replacing SQLite
- **Prisma ORM**: Type-safe database queries with auto-completion
- **Database Migrations**: Structured schema evolution
- **Seeding**: Consistent data initialization
- **Comprehensive Testing**: Unit, route, and API integration tests with Vitest
- **Enhanced Admin Controls**: Additional CRUD operations for user management
- **CI/CD Integration**: Automated database setup, testing, and deployment

While maintaining V2 features:

- User registration and authentication with JWT
- User profile and settings management
- Admin dashboard with user management
- Activity logging for auditing

## Documentation

- [Quick Start and Usage](#setup)
- [Learning Guide](./LEARNING_GUIDE.md): Step-by-step guide to build V3 from V2, covering PostgreSQL, Prisma, migrations, seeding, and testing.
- [Developer Reference](./DEVELOPER_REFERENCE.md): System architecture, database schema, file details, code style, and LLM reference for consistent code generation.

## Prerequisites

- **Node.js**: 20.15.1 (exact version for Render compatibility). Check: `node --version`.
- **npm**: 6+ (e.g., `10.8.2`). Check: `npm --version`.
- **PostgreSQL**: Local installation or Render service.
- **Git**: To clone the repository and use CI/CD.
- **Postman**: For API testing.
- **Code editor**: VS Code with Prisma extension recommended.

## Setup

1. **Clone the Repository (V3 Branch)**:

   ```bash
   git clone -b v3 https://github.com/voilacode/authmini.git
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
   - Unit tests: `npm run test:unit`
   - Route tests: `npm run test:routes`
   - API tests: `npm run test:api`

## Usage

1. **Frontend**:

   - Open `http://localhost:3000` in a browser.
   - **Register**: Enter email (`user@example.com`), password (`user123`, 6+ characters) → See "Registration successful."
   - **Login**: Use same credentials → User dashboard with email, profile edit, settings, and logout.
   - **Profile/Settings**: Edit display name, bio, avatar URL, change password, set theme (light/dark), toggle notifications.
   - **Admin Login**: Use `admin@example.com`, `admin123` → Admin dashboard with user list, search, enable/disable, delete, and activity logs.
   - **Logout**: Returns to login form.

2. **Backend APIs** (Test with Postman):
   - **Register**: `POST http://localhost:3000/api/register`
     ```json
     { "email": "user@example.com", "password": "user123" }
     ```
   - **Login**: `POST http://localhost:3000/api/login`
     ```json
     { "email": "user@example.com", "password": "user123" }
     ```
   - **Update Profile**: `POST http://localhost:3000/api/profile`
     - Header: `Authorization: Bearer <token>`
     ```json
     { "displayName": "User", "bio": "Bio", "avatarUrl": "" }
     ```
   - **Change Password**: `POST http://localhost:3000/api/password`
     - Header: `Authorization: Bearer <token>`
     ```json
     { "newPassword": "newpass123" }
     ```
   - **Update Settings**: `POST http://localhost:3000/api/settings`
     - Header: `Authorization: Bearer <token>`
     ```json
     { "theme": "dark", "notifications": true }
     ```
   - **List Users**: `GET http://localhost:3000/api/users?search=user&active=true`
     - Header: `Authorization: Bearer <admin_token>`
   - **Get User**: `GET http://localhost:3000/api/users/:id`
     - Header: `Authorization: Bearer <admin_token>`
   - **Toggle User**: `PATCH http://localhost:3000/api/users/:id/active`
     - Header: `Authorization: Bearer <admin_token>`
     ```json
     { "isActive": false }
     ```
   - **Delete User**: `DELETE http://localhost:3000/api/users/:id`
     - Header: `Authorization: Bearer <admin_token>`
   - **Activity Logs**: `GET http://localhost:3000/api/logs?userId=2&startDate=2023-01-01`
     - Header: `Authorization: Bearer <admin_token>`
   - **Logout**: `POST http://localhost:3000/api/logout`

## Database Management

1. **Prisma Studio**:

   ```bash
   npm run prisma:studio
   ```

   - Opens web interface at `http://localhost:5555` to browse and edit data.

2. **Migrations**:

   - Create new migration: `npm run migrate:dev -- name_of_migration`
   - Apply migrations: `npm run migrate`

3. **Seeding**:
   - Initialize data: `npm run seed`

## File Structure

- **Root** (5 files + configuration):

  - `server.mjs`: Fastify server, serves APIs and frontend.
  - `package.json`: Dependencies, scripts (start, test, migrate, seed).
  - `.env`: Environment variables (`PORT`, `JWT_SECRET`, `DATABASE_URL`).
  - `vite.config.js`: Vitest configuration.
  - `.gitignore`: Excludes files (`.env`, `dev.db`, `node_modules`).

- **Backend** (5 files):

  - `backend/data/db.mjs`: Prisma client initialization.
  - `backend/routes/auth.mjs`: Authentication APIs.
  - `backend/routes/users.mjs`: Admin APIs (CRUD operations).
  - `backend/services/userService.mjs`: User business logic with Prisma.
  - `backend/services/activityService.mjs`: Activity log logic with Prisma.

- **Database** (2 files + migrations):

  - `db/schema.prisma`: Prisma schema defining database models.
  - `db/seed.mjs`: Seed script for initial data.
  - `db/migrations/`: Generated migration files.

- **Frontend** (5 files):

  - `frontend/index.html`: SPA entry point with user/admin interfaces.
  - `frontend/css/styles.css`: Custom styles with animations.
  - `frontend/js/app.js`: SPA state management, CRUD operations.
  - `frontend/js/auth.js`: Login/register with validation.
  - `frontend/js/profile.js`: Profile/settings management.

- **Tests** (6 files):

  - `tests/unit/db.test.mjs`: Tests for database client.
  - `tests/unit/userService.test.mjs`: Unit tests for user service.
  - `tests/unit/activityService.test.mjs`: Unit tests for activity service.
  - `tests/routes/auth.test.mjs`: Tests for auth routes with mocked services.
  - `tests/routes/users.test.mjs`: Tests for user routes with mocked services.
  - `tests/api.test.mjs`: API integration tests with real database.

- **CI/CD**:
  - `.github/workflows/ci.yml`: GitHub Actions with PostgreSQL testing.

## Testing

AuthMini V3 implements a comprehensive testing strategy:

1. **Unit Tests**:

   - Test isolated components (services, database client).
   - Run: `npm run test:unit`

2. **Route Tests**:

   - Test route handlers with mocked services.
   - Run: `npm run test:routes`

3. **API Integration Tests**:

   - Test complete API flows with actual database.
   - Run: `npm run test:api`

4. **All Tests**:
   - Run all test suites: `npm test`

## Deployment

1. **Set Up PostgreSQL on Render**:

   - Create a PostgreSQL service on Render.
   - Note the connection string.

2. **Deploy Web Service to Render**:

   - Create a Web Service linked to your GitHub repository.
   - Configure:
     - Runtime: Node.js
     - Build Command: `npm install && npx prisma generate`
     - Start Command: `npm run migrate && npm run seed && npm start`
     - Environment Variables:
       - `PORT`: Leave blank (Render assigns)
       - `NODE_ENV`: `production`
       - `JWT_SECRET`: Your secret key
       - `DATABASE_URL`: The connection string from your Render PostgreSQL service
   - Deploy and access via provided URL.

3. **CI/CD**:
   - GitHub Actions runs linting, migration, seeding, and testing with PostgreSQL.
   - For automatic deployment, add `RENDER_API_KEY` and `RENDER_SERVICE_ID` to GitHub repository secrets.

## Notes

- AuthMini V3 addresses the SQLite data persistence issue from V2 by using PostgreSQL.
- Prisma ORM provides type safety and simplified database operations.
- The service layer pattern is maintained for business logic organization.
- Tests follow the testing pyramid approach (more unit tests, fewer integration tests).
- For production, consider adding email verification, logging, monitoring, and advanced security features.
- Report issues or contribute at [https://github.com/voilacode/authmini](https://github.com/voilacode/authmini).

## License

MIT
