# AuthMini V1

A minimal full-stack authentication app built with **Fastify**, **Alpine.js**, **SQLite**, and **ES Modules (ESM)**. Designed for beginners to learn full-stack development with a single-server setup.

**Repository**: [https://github.com/voilacode/authmini](https://github.com/voilacode/authmini)

## Overview

AuthMini V1 allows users to register, log in, log out, and view a dashboard. Admins (`admin@example.com`, `admin123`) can view a list of all users. The app uses a single Fastify server to serve both APIs (`/api/*`) and a frontend SPA (`/`).

## Features

- **User**: Register, log in, log out, view email on dashboard.
- **Admin**: Log in, view user list (emails, roles, join dates).
- **Tech**: Fastify (backend), Alpine.js (frontend), SQLite (database), Tailwind CSS (styling).

## Documentation

- [Quick Start and Usage](#setup)
- [Developer Reference](./DEVELOPER_REFERENCE.md): System architecture, file details, code style, and LLM reference for consistent code generation.

## Prerequisites

- **Node.js**: 14+ (e.g., `v20.17.0`). Check: `node --version`.
- **npm**: 6+ (e.g., `10.8.2`). Check: `npm --version`.
- **Git**: To clone the repository.

## Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/voilacode/authmini.git
   cd authmini
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
   - Requires: `better-sqlite3`, `bcrypt`, `dotenv`, `fastify`, `@fastify/static`, `jsonwebtoken`.
3. **Configure Environment**:
   - Create `authmini/.env`:
     ```
     PORT=3000
     JWT_SECRET=your_jwt_secret_here
     ```
   - Generate a secret: `openssl rand -base64 32`.
4. **Start Server**:
   ```bash
   npm start
   ```
   - Access: `http://localhost:3000` (frontend).

## Usage

1. **Frontend**:
   - Open `http://localhost:3000` in a browser.
   - **Register**: Enter email (`user@example.com`), password (`user123`) → See “Registration successful.”
   - **Login**: Use same credentials → User dashboard with email and logout button.
   - **Admin Login**: Use `admin@example.com`, `admin123` → Admin dashboard with user list.
   - **Logout**: Returns to login form.
2. **Backend APIs** (Test with Postman):
   - **Register**: `POST http://localhost:3000/api/register`
     ```json
     { "email": "user@example.com", "password": "user123" }
     ```
     - Expect: `201`, `{"message":"User registered"}`
   - **Login**: `POST http://localhost:3000/api/login`
     ```json
     { "email": "admin@example.com", "password": "admin123" }
     ```
     - Expect: `200`, `{"token":"...","user":{"email":"...","role":"admin"}}`
   - **List Users**: `GET http://localhost:3000/api/users`
     - Header: `Authorization: Bearer <admin_token>`
     - Expect: `200`, `{"users":[{"id":1,"email":"...","role":"admin","created_at":"..."},...]}`
   - **Logout**: `POST http://localhost:3000/api/logout`
     - Expect: `200`, `{"message":"Logged out"}`

## File Structure

- **Root**:
  - `server.mjs`: Fastify server, serves APIs and frontend.
  - `package.json`: Dependencies and scripts.
  - `.env`: Environment variables (`PORT`, `JWT_SECRET`).
  - `.gitignore`: Excludes files from Git.
  - `README.md`: Quick start and overview.
  - `DEVELOPER_REFERENCE.md`: System architecture, file details, code style, LLM reference.
- **Backend**:
  - `backend/data/db.mjs`: SQLite database setup, seeds admin user.
  - `backend/routes/auth.mjs`: Register, login, logout APIs.
  - `backend/routes/users.mjs`: Admin user list API.
- **Frontend**:
  - `frontend/index.html`: SPA entry point with Alpine.js.
  - `frontend/css/styles.css`: Custom styles for forms and buttons.
  - `frontend/js/app.js`: Manages user state and navigation.
  - `frontend/js/auth.js`: Handles login/register form logic.
- **Database**:
  - `db/authmini.db`: SQLite database (created on first run).

## Testing

1. **Frontend**:
   - Browser: `http://localhost:3000`.
   - Console: Check for `app.js loaded`, `auth.js loaded`.
   - Verify: Login form, dashboards, logout work with proper styling (dark gray forms, white text).
2. **Backend**:
   - Postman: Test all APIs (register, login, list users, logout).
   - Check: `db/authmini.db` contains registered users.
3. **Troubleshooting**:
   - **Styles missing**: Clear cache (`Ctrl+Shift+R`), verify `/css/styles.css` loads.
   - **Scripts fail**: Check console, ensure `/js/app.js`, `/js/auth.js` load.
   - **API errors**: Verify `.env` (`JWT_SECRET`), token in Postman.

## Notes

- AuthMini V1 is a learning project to understand Fastify, Alpine.js, and ESM.
- Uses a single server for simplicity, serving both APIs and frontend.
- For production, add security (e.g., input validation, HTTPS) and testing.
- Report issues or contribute at [https://github.com/voilacode/authmini](https://github.com/voilacode/authmini).

## License

MIT
