# Learning Guide for Building AuthMini V3

**Version**: 3.1  
**Application**: AuthMini V3  
**Created by**: Krishna Teja GS  
**Date**: May 2, 2025

## Purpose

This guide extends **AuthMini V2** to advance developers' skills by introducing **production-ready database practices** and **comprehensive testing strategies** while maintaining a **beginner-friendly** approach. It builds on V2's authentication app (Fastify, Alpine.js, SQLite) to address the **non-persistent SQLite issue** and prepare for scalable systems like **AuthCloud**.

**AuthMini V3** replaces SQLite with **PostgreSQL**, uses **Prisma ORM** for type-safe queries, implements **migrations** for schema management, and **seeding** for consistent data initialization. It features a **multi-layered testing architecture** with unit, integration, and API tests. The application retains V2's features (profile management, admin capabilities, CI/CD) while ensuring **all business logic** resides in the **service layer**. The single **Fastify server** serves APIs (`/api/*`) and frontend (`/`) at `http://localhost:3000` locally or a dynamic port on Render.

This guide provides **step-by-step instructions**, **code snippets**, **detailed explanations** of **ORM**, **migrations**, **seeding**, and **testing methodology**, along with **manual testing** (Postman, browser), and **automated tests** (Vitest, Supertest). It focuses on implementing standard CRUD operations with comprehensive test coverage.

---

## Pre-requisites

Before starting, ensure you have:

- **Completed AuthMini V2**: Familiarity with V2's structure, Fastify, Alpine.js, SQLite, ESLint, Jest, and CI/CD.
- **Basic JavaScript Knowledge**: Promises, async/await, modules, V2's service layer.
- **Familiarity with Web Development**: APIs, frontend-backend interaction, HTTP.
- **Basic Database Knowledge**: SQL basics (tables, joins), V2's SQLite setup.
- **Testing Fundamentals**: Understand the basics of testing and Vitest.
- **Tools Installed**:
  - **Node.js 20.15.1** (Render-compatible). Check: `node --version`.
  - **npm 6+** (e.g., 10.8.2). Check: `npm --version`.
  - **PostgreSQL** (local or Render). Install locally: [postgresql.org](https://www.postgresql.org/download/).
  - **Postman** for API testing.
  - **Git** (`git --version`, for CI/CD).
  - **Code editor** (e.g., VS Code) with Prisma extension ("Prisma" by Prisma).
- **AuthMini V2 Codebase**: A working V2 project.
- **Render Account**: For PostgreSQL, app deployment ([render.com](https://render.com)).
- **GitHub Account**: For CI/CD.

**Refresher Resources**:

- 🔗 [MDN: JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- 🔗 [Fastify](https://www.fastify.io/docs/latest/)
- 🔗 [Alpine.js](https://alpinejs.dev/)
- 🔗 [Prisma](https://www.prisma.io/docs/)
- 🔗 [PostgreSQL](https://www.postgresqltutorial.com/)
- 🔗 [Vitest Documentation](https://vitest.dev/guide/)
- 🔗 [Testing JavaScript Applications](https://testingjavascript.com/)
- 🔗 [Test-Driven Development Basics](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
- 🔗 [Mocking in JavaScript Tests](https://vitest.dev/guide/mocking.html)

---

## Introduction

### Why AuthMini V3?

AuthMini V3 enhances V2 by introducing **production-ready database practices** to handle data reliably. It addresses V2's **SQLite limitation** (non-persistent data due to `authmini.db` in Git) and adds:

- **PostgreSQL**: Persistent, scalable database replacing SQLite.
- **Prisma ORM**: Simplifies queries with type safety, reducing errors.
- **Migrations**: Manages schema changes across environments.
- **Seeding**: Initializes consistent data (e.g., admin user).
- **CRUD Operations**: Comprehensive create, read, update, delete functionality.
- **Testing Pyramid**: Structured approach with unit, integration, and API tests.
- **CI/CD Integration**: Automated testing in the deployment pipeline.

**Learning Focus**:

- Replacing SQLite with **PostgreSQL** for persistence.
- Using **Prisma ORM** for safe, maintainable queries.
- Managing schema with **migrations**.
- Initializing data with **seeding**.
- Implementing **CRUD operations**.
- Building a **comprehensive test** suite.
- Understanding **test-driven development** principles.

### Why Extend V2?

Extending V2:

- **Reinforces Learning**: Builds on Fastify, Alpine.js, service layer, and CI/CD.
- **Realistic Workflow**: Mimics project evolution in production.
- **Incremental Growth**: Focuses on database concepts.
- **Maintains Simplicity**: Single Fastify server avoids complexity.

### Why These Enhancements?

- **PostgreSQL**: Unlike SQLite, it's persistent and scalable, suitable for production.
- **Prisma ORM**: Simplifies database interactions, provides type safety, and reduces SQL errors.
- **Migrations**: Ensures consistent schema across local, staging, and production environments.
- **Seeding**: Guarantees initial data for testing and deployment.
- **CRUD Operations**: Provides a comprehensive implementation of data management.
- **Service Layer**: Centralizes business logic, enhancing maintainability and testability.

### Why Focus on SQLite Issue?

In V2, `authmini.db` was included in Git, causing data loss on `git pull` (e.g., new users erased). V3 demonstrates this issue and resolves it with PostgreSQL, teaching **production-ready database practices**.

### Who Is This Guide For?

Developers who:

- Completed AuthMini V2 and understand its structure.
- Want to learn **PostgreSQL**, **Prisma ORM**, **migrations**, **seeding**, and **CRUD operations**.
- Seek **scalable database practices** for data management.
- Need a **structured, incremental** path to advanced systems like **AuthCloud**.

---

## Understanding Database Concepts in Modern Development

### Object-Relational Mapping (ORM)

#### Definition and Core Concept

Object-Relational Mapping (ORM) is a programming technique that creates a bridge between object-oriented programming languages and relational databases. At its core, an ORM:

- **Translates between two worlds**: Converts database tables and rows into programming objects and instances
- **Abstracts away SQL**: Replaces raw SQL queries with object-oriented code in your application language
- **Creates a virtual object database**: Allows you to work with database records as if they were native objects

Without an ORM, you'd write database interactions like this:

```javascript
// Raw SQL approach
const users = await db.query(
  "SELECT * FROM users WHERE role = 'admin' AND is_active = true"
);
```

With an ORM like Prisma, you'd write:

```javascript
// ORM approach
const users = await prisma.user.findMany({
  where: {
    role: 'admin',
    is_active: true,
  },
});
```

#### Key Benefits of Using an ORM

##### Productivity and Development Speed

- Eliminates boilerplate SQL code
- Automates repetitive database operations
- Reduces development time for database interactions by 30-50%

##### Type Safety and Error Reduction

- Catches errors at compile time instead of runtime
- Prevents SQL injection attacks automatically
- Reduces bugs related to database queries by providing compile-time checking

##### Database Abstraction

- Allows switching between different database systems (PostgreSQL, MySQL, etc.)
- Consistent API regardless of underlying database technology
- Simplifies testing with in-memory or mock databases

##### Code Organization and Maintainability

- Centralizes database logic
- Creates a consistent pattern for data access
- Makes complex queries more readable and self-documenting

##### Relationship Management

- Simplifies handling relationships between tables
- Automatically handles joins and eager loading
- Makes object associations feel natural in code

#### Why Prisma?

While there are many ORM options like Sequelize, TypeORM, and MikroORM, we chose **Prisma** for:

- **Schema-first**: Clear, declarative schema with auto-generated client
- **Type safety**: Built-in TypeScript types and IDE autocomplete
- **Performance**: Optimized query engine, avoids N+1 issues
- **DX**: Intuitive API, great docs, and strong community

#### Real-World Impact Example

Consider a typical user registration flow:

Without ORM:

```javascript
// 1. Check if user exists
const existingUsers = await db.query('SELECT * FROM users WHERE email = ?', [
  email,
]);
if (existingUsers.length > 0) {
  throw new Error('Email already exists');
}

// 2. Insert user
const result = await db.query(
  'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
  [email, passwordHash, 'user']
);
const userId = result.insertId;

// 3. Create user profile
await db.query('INSERT INTO profiles (user_id, display_name) VALUES (?, ?)', [
  userId,
  displayName,
]);

// 4. Log activity
await db.query('INSERT INTO activity_logs (user_id, action) VALUES (?, ?)', [
  userId,
  'User registered',
]);
```

With Prisma ORM:

```javascript
// All operations in one transaction
await prisma.$transaction(async (tx) => {
  // Check and create user with profile in one operation
  const user = await tx.user.create({
    data: {
      email,
      passwordHash,
      role: 'user',
      profile: {
        create: { displayName },
      },
      activityLogs: {
        create: { action: 'User registered' },
      },
    },
  });
});
```

This demonstrates how ORMs can drastically reduce code complexity while improving readability and reliability.

### Migrations: Database Schema Evolution

#### What Are Migrations?

Database migrations are structured, versioned changes to your database schema that allow you to:

- **Track Schema Evolution**: Record the history of database structure changes
- **Apply Changes Consistently**: Ensure all environments have the same schema
- **Version Control Database Structure**: Treat schema like code
- **Automate Schema Updates**: Roll out changes in CI/CD pipelines

Think of migrations as "git for your database schema" — they create a historical record of every structural change.

#### How Migrations Work

A migration system typically consists of:

##### Migration Files

SQL or code that describes a specific schema change

```sql
-- 20250503123456_add_last_login.sql
ALTER TABLE "User" ADD COLUMN "lastLogin" TIMESTAMP;
```

##### Migration Registry

A table in your database that tracks applied migrations

```
| id | name                      | applied_at          |
|----|---------------------------|---------------------|
| 1  | init                      | 2025-05-01 10:00:00 |
| 2  | add_user_profiles         | 2025-05-02 11:30:00 |
| 3  | add_last_login            | 2025-05-03 12:34:56 |
```

##### Migration Runner

Tool that applies pending migrations in sequence

#### The Prisma Migrations Workflow

Prisma has a particularly developer-friendly migrations workflow:

##### Schema Definition

You modify your `schema.prisma` file

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  // Add new field
  lastLogin DateTime?
}
```

##### Migration Generation

Prisma compares your schema to the database

```bash
npx prisma migrate dev --name add_last_login
```

##### Migration Review

Prisma generates a migration file with SQL

```sql
-- Migration SQL file
ALTER TABLE "User" ADD COLUMN "lastLogin" TIMESTAMP;
```

##### Migration Application

Applies pending migrations

```bash
npx prisma migrate deploy
```

#### Key Benefits of Database Migrations

##### Reproducibility

- Ensures all environments have identical database structure
- Makes setting up new instances trivial
- Allows for repeatable testing environments

##### Collaboration

- Multiple developers can make schema changes without conflicts
- Changes are tracked and can be reviewed like code
- Prevents "out of sync" database schemas between team members

##### Deployment Safety

- Incremental, testable database changes
- Rollback capabilities for failed migrations
- Prevents deployment of incompatible application versions

##### Documentation

- Self-documenting database evolution
- Historical record of all schema changes
- Clear trail of when and why changes were made

##### CI/CD Integration

- Automated database updates in deployment pipelines
- Consistency between development and production
- Reliable preview environments

#### Migration Best Practices

- **Small, Focused Migrations**: Each migration should make a single logical change
- **Backwards Compatibility**: When possible, design migrations that work with both old and new code versions
- **Test Migrations**: Always test migrations on a copy of production data before deploying
- **Include Data Migrations**: Sometimes you need to transform existing data, not just schema
- **Never Edit Existing Migrations**: Once a migration is deployed, treat it as immutable

### Seeding: Reliable Data Initialization

#### What is Database Seeding?

Database seeding is the process of populating a database with initial, predefined data. This can include:

- **Default users** (like admin accounts)
- **Reference data** (countries, currencies, categories)
- **Test data** (sample users, products, transactions)
- **Demo content** (initial posts, comments, etc.)

Seeding ensures that your application has the necessary data to function correctly from the first startup.

#### How Seeding Works

A seed script typically:

- **Connects to the database**
- **Checks for existing data** (to avoid duplicates)
- **Inserts predefined records**
- **Creates relationships** between seeded entities

#### Prisma Seeding Implementation

Prisma makes seeding straightforward with a dedicated script:

```javascript
// db/seed.mjs
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Seed admin user
  const adminPassword = await bcrypt.hash('admin123', 10);

  // Use upsert to avoid duplicates
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {}, // No changes if exists
    create: {
      email: 'admin@example.com',
      passwordHash: adminPassword,
      role: 'admin',
      profile: {
        create: {
          displayName: 'System Administrator',
          bio: 'System administrator account',
        },
      },
      settings: {
        create: {
          theme: 'dark',
          notifications: true,
        },
      },
    },
  });

  // Seed product categories
  const categories = [
    { name: 'Electronics', description: 'Electronic devices and accessories' },
    { name: 'Clothing', description: 'Apparel and fashion items' },
    { name: 'Home', description: 'Home goods and furniture' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

#### When and Where to Run Seeds

Seeds can be run in different contexts:

##### Development

Run manually after database reset

```bash
npm run seed
```

##### Testing

Run automatically before tests

```javascript
beforeAll(async () => {
  await seed();
});
```

##### Production

Run during initial deployment only

```bash
# In deployment script
if [ "$INITIAL_DEPLOYMENT" = true ]; then
  npm run seed
fi
```

##### CI/CD

Run in preview environments

```yaml
# In GitHub Actions
- name: Setup database
  run: |
    npm run migrate
    npm run seed
```

#### Key Benefits of Database Seeding

##### Consistent Starting State

- Every environment starts with the same baseline data
- Prevents "it works on my machine" problems
- Makes application behavior predictable

##### Faster Development

- No manual data entry needed to test features
- Quick reset to a known state
- Saves development time with pre-populated test data

##### Reliable Testing

- Tests always run against the same initial data
- Predictable test results
- Reduces flaky tests caused by data variations

##### Demo and Onboarding

- New instances start with meaningful data
- Better demonstration experience
- Faster onboarding for new team members

##### Reference Data Management

- Centralized place for managing lookup tables
- Version-controlled reference data
- Ensures all environments have required lookup values

#### Seeding Best Practices

- **Use `upsert` Operations**: Prevents duplicate data and allows reruns
- **Make Seeds Idempotent**: Running seeds multiple times should produce the same result
- **Keep Seed Data Minimal**: Include only what's necessary for the application to function
- **Separate Development and Production Seeds**: Production may need different seed data
- **Include Relationships**: Seed related data together to maintain referential integrity

## Understanding Modern Database Practices

### PostgreSQL, Prisma, and CRUD Operations for Developers

This guide provides an easy-to-understand overview of essential database concepts used in AuthMini V3.

#### PostgreSQL Fundamentals

PostgreSQL is a powerful open-source relational database that offers:

- **Persistence**: Unlike SQLite, data remains intact across deployments and server restarts
- **Scalability**: Handles growing data volumes and concurrent users efficiently
- **Reliability**: Ensures data integrity through ACID compliance (Atomicity, Consistency, Isolation, Durability)
- **Advanced Features**: Supports JSON storage, full-text search, and complex data types

##### Connection String Format

```
postgresql://username:password@hostname:port/database?schema=public
```

##### Key Differences from SQLite

- Client-server architecture (vs. file-based)
- Requires separate installation and configuration
- Supports multiple concurrent connections
- Better suited for production applications

#### Prisma ORM Essentials

Prisma simplifies database interactions with a type-safe API that maps database tables to JavaScript objects.

##### Core Components

- **Schema**: Defines your data model (`schema.prisma` file)
- **Client**: Generated JavaScript library for database operations
- **Migrations**: Versioned database schema changes
- **Studio**: GUI for database visualization and management

##### Most Frequently Used Prisma Methods

###### Finding Records

```javascript
// Find a single user by unique identifier
const user = await prisma.user.findUnique({
  where: { id: 1 },
});

// Find a single user by non-unique field
const user = await prisma.user.findFirst({
  where: { is_active: true },
});

// Find all users matching criteria
const users = await prisma.user.findMany({
  where: { role: 'user' },
  orderBy: { createdAt: 'desc' },
});
```

###### Creating Records

```javascript
// Create a simple record
const user = await prisma.user.create({
  data: { email: 'user@example.com', passwordHash: '...' },
});

// Create with related records
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    passwordHash: '...',
    profile: {
      create: { displayName: 'New User' },
    },
  },
});
```

###### Updating Records

```javascript
// Update a record
const user = await prisma.user.update({
  where: { id: 1 },
  data: { is_active: false },
});

// Upsert (create or update)
const profile = await prisma.profile.upsert({
  where: { userId: 1 },
  update: { displayName: 'Updated Name' },
  create: { userId: 1, displayName: 'New Name' },
});
```

###### Deleting Records

```javascript
// Delete a single record
await prisma.user.delete({
  where: { id: 1 },
});

// Delete multiple records
await prisma.user.deleteMany({
  where: { is_active: false },
});
```

###### Querying Relations

```javascript
// Include related data
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: { profile: true, settings: true },
});

// Filter by related data
const users = await prisma.user.findMany({
  where: {
    profile: {
      displayName: { contains: 'Admin' },
    },
  },
});
```

###### Transactions

```javascript
// Perform multiple operations atomically
await prisma.$transaction(async (tx) => {
  await tx.profile.delete({ where: { userId: 1 } });
  await tx.user.delete({ where: { id: 1 } });
});
```

#### CRUD Operations Implementation

CRUD (Create, Read, Update, Delete) operations form the foundation of any data-driven application.

##### AuthMini V3 Implementation Pattern

###### Service Layer

Centralizes business logic and database operations

```javascript
// services/userService.mjs
export async function registerUser(email, password) {
  // Business logic and validation
  const passwordHash = await bcrypt.hash(password, 10);

  // Database operation
  return db.user.create({
    data: { email, passwordHash },
  });
}
```

###### Route Layer

Handles HTTP requests and responses

```javascript
// routes/auth.mjs
fastify.post('/register', async (request, reply) => {
  const { email, password } = request.body;

  // Input validation
  if (!email || !password) {
    return reply.code(400).send({ error: 'Email and password required' });
  }

  // Call service method
  try {
    await registerUser(email, password);
    return reply.code(201).send({ message: 'User registered' });
  } catch (err) {
    return reply.code(400).send({ error: err.message });
  }
});
```

###### Frontend Component

Interfaces with API endpoints

```javascript
// app.js
async registerUser() {
  try {
    await axios.post('/api/register', {
      email: this.email,
      password: this.password
    });
    this.message = 'Registration successful!';
  } catch (err) {
    this.error = err.response?.data?.error || 'Registration failed';
  }
}
```

##### CRUD Operation Summary

| Operation | Service Method        | Route               | HTTP Method | Prisma Method  |
| --------- | --------------------- | ------------------- | ----------- | -------------- |
| Create    | `registerUser()`      | `/register`         | POST        | `create()`     |
| Read      | `getUserById()`       | `/users/:id`        | GET         | `findUnique()` |
| Read      | `getUsers()`          | `/users`            | GET         | `findMany()`   |
| Update    | `updateUserProfile()` | `/profile`          | POST        | `upsert()`     |
| Update    | `setUserActive()`     | `/users/:id/active` | PATCH       | `update()`     |
| Delete    | `deleteUser()`        | `/users/:id`        | DELETE      | `delete()`     |

This structured approach ensures:

- Clear separation of concerns
- Reusable business logic
- Consistent error handling
- Clean, maintainable code

---

## Understanding Testing in Modern Development

### Why Testing Matters

Testing is a critical aspect of software development that ensures code quality, reliability, and maintainability. In the context of AuthMini V3, we've implemented a structured testing approach that follows industry best practices and provides developers with confidence in their codebase.

### Testing Philosophy

At its core, testing serves several essential purposes:

- **Verification**: Confirms code works as expected
- **Regression Prevention**: Ensures new changes don't break existing functionality
- **Documentation**: Tests serve as executable documentation of expected behavior
- **Design Feedback**: Well-structured tests often reveal design flaws
- **Refactoring Safety Net**: Allows confident code changes

### Testing Pyramid

AuthMini V3 follows the "Testing Pyramid" approach popularized by Mike Cohn:

```
       ▲
      / \
     /   \
    / E2E \
   /-------\
  /Integration\
 /------------\
/    Unit      \
-----------------
```

- **Unit Tests**: Focus on testing individual components in isolation
- **Integration Tests**: Test how components work together
- **End-to-End Tests**: Test entire application flows

This pyramid structure suggests having more unit tests (fast, focused) and fewer integration and E2E tests (slower, more complex). This balance provides both speed and confidence.

### Test Types in AuthMini V3

Our testing strategy is comprehensive and multi-layered:

1. **Unit Tests** (`tests/unit/*.test.mjs`):

   - Test individual services, database interactions
   - Mock external dependencies
   - Fast execution, high specificity
   - Example: Testing that `userService.registerUser()` creates a user record

2. **Route Tests** (`tests/routes/*.test.mjs`):

   - Test HTTP endpoints with mocked services
   - Verify request/response handling
   - Focus on route logic without database interactions
   - Example: Testing that `/api/register` returns 201 status code on success

3. **API Integration Tests** (`tests/api.test.mjs`):
   - Test complete workflows (register → login → update profile)
   - Use actual database (in test environment)
   - Validate end-to-end functionality
   - Example: Testing user registration, login, and profile update as a sequence

### Testing Techniques

AuthMini V3 employs several key testing techniques:

#### 1. Isolation through Mocking

```javascript
// Example of mocking in route tests (Vitest)
vi.mock('../../backend/services/userService.mjs', () => ({
  registerUser: vi.fn().mockResolvedValue({ id: 1 }),
  loginUser: vi.fn().mockResolvedValue({ token: 'fake-token', user: {...} }),
}));
```

This allows testing route handlers without actual service implementation.

#### 2. Fixture Setup

```javascript
beforeAll(async () => {
  // Setup test data
  const result = await registerUser('test-user@example.com', 'password123');
  testUserId = result.id;
});
```

Prepares the test environment with necessary data.

#### 3. Cleanup

```javascript
afterAll(async () => {
  // Clean up test data
  if (testUserId) {
    await db.user.delete({ where: { id: testUserId } });
  }
});
```

Ensures tests don't affect each other by cleaning up after tests run.

#### 4. Arrange-Act-Assert Pattern

```javascript
test('should register a new user', async () => {
  // Arrange
  const userData = { email: 'new-user@example.com', password: 'password123' };

  // Act
  const result = await registerUser(userData.email, userData.password);

  // Assert
  expect(result.id).toBeDefined();
  expect(logActivity).toHaveBeenCalled();
});
```

This clear structure makes tests readable and maintainable.

### Benefits of Our Testing Approach

1. **Confidence in Refactoring**:

   - The shift from SQLite to PostgreSQL is validated by comprehensive tests
   - Changing database technology is a high-risk operation made safer through testing

2. **Maintainability**:

   - New developers can understand expected behavior by reading tests
   - Bugs can be reproduced reliably through test cases

3. **Faster Development**:

   - Tests can be run quickly to verify changes
   - Developers don't need to manually test every scenario

4. **Documentation**:
   - Tests clearly show how components should be used
   - New team members can learn from test examples

### Running Tests

AuthMini V3 provides dedicated scripts for each test level:

```bash
# Run unit tests only
npm run test:unit

# Run route tests only
npm run test:routes

# Run API integration tests only
npm run test:api

# Run all tests
npm test
```

This granularity allows developers to run just what they need during development.

### Testing Best Practices Demonstrated

1. **Test Independence**: Each test can run in isolation
2. **Deterministic Results**: Tests always produce the same result under the same conditions
3. **Fast Execution**: Unit and route tests run quickly
4. **Readable Tests**: Clear structure and descriptive names
5. **Comprehensive Coverage**: Tests cover happy paths and error cases

## Getting Started: Where to Begin?

AuthMini V3 extends V2's Fastify server, Alpine.js frontend, and CI/CD, replacing SQLite with PostgreSQL. Start by reviewing V2's structure, then follow these steps.

### Step 1: Understand V3 Requirements

- **Why**: Clarifies database and CRUD operation goals.
- **How**: Review navigation flow (same as V2):
  ```
  [Unauthenticated]
    - Register -> Login -> User Dashboard (view/edit profile, change password, settings)
    - Admin Login (admin@example.com) -> Admin Dashboard (search users, enable/disable, view logs)
  ```
- **New Features**:
  - Persistent **PostgreSQL** database.
  - **Prisma ORM** for type-safe queries.
  - **Migrations** for schema changes.
  - **Seeding** for initial data (admin, sample users).
  - **CRUD operations** for user management.
- **Technical Enhancements**:
  - Replace SQLite with PostgreSQL.
  - Use Prisma for queries, keeping business logic in `services/`.
  - Implement migrations and seeding.
  - Update CI/CD for Render with PostgreSQL.
- **Nuance**: Focus on simplicity, avoiding complex patterns like microservices.

### Step 2: Set Up Extended Project Structure

- **Why**: Organizes files for Prisma, migrations, and CI/CD.
- **How**: Add new files, modify V2 files, remove `.node-version`.
- **Updated Project Structure**:
  ```
  authmini/
  ├── backend/
  │   ├── data/
  │   │   └── db.mjs                   # Updated: Prisma client
  │   ├── routes/
  │   │   ├── auth.mjs                 # Updated: Call service methods
  │   │   └── users.mjs                # Updated: Call service methods, CRUD operations
  │   ├── services/
  │   │   ├── userService.mjs          # Updated: Prisma, CRUD operations
  │   │   └── activityService.mjs      # Updated: Prisma queries
  ├── db/
  │   ├── migrations/                  # NEW: Prisma migrations
  │   │   └── (generated files)
  │   ├── schema.prisma                # NEW: Prisma schema
  │   └── seed.mjs                     # NEW: Seed script
  ├── frontend/
  │   ├── css/
  │   │   └── styles.css               # Unchanged
  │   ├── js/
  │   │   ├── app.js                   # Updated: Handle CRUD operations
  │   │   ├── auth.js                  # Unchanged
  │   │   └── profile.js               # Unchanged
  │   └── index.html                   # Updated: Support CRUD operations
  ├── tests/
  │   ├── unit/
  │   │   ├── db.test.mjs              # NEW: Test database client
  │   │   ├── userService.test.mjs     # NEW: Test user service
  │   │   └── activityService.test.mjs # NEW: Test activity service
  │   ├── routes/
  │   │   ├── auth.test.mjs            # NEW: Test auth routes
  │   │   └── users.test.mjs           # NEW: Test user routes
  │   └── api.test.mjs                 # Updated: Integration tests
  ├── server.mjs                       # Updated: Render config
  ├── package.json                     # Updated: Prisma, Vitest
  ├── vite.config.js                   # NEW: Vitest configuration
  ├── .env                             # Updated: PostgreSQL URL
  ├── .eslintrc.json                   # Unchanged
  ├── .gitignore                       # Updated: Remove authmini.db, add dev.db
  └── .github/workflows/ci.yml         # Updated: Migration, seeding
  ```
- **Total Files**: 24 (6 backend, 5 frontend, 8 root, 5 dedicated test files).
- **New Files**:
  - `db/schema.prisma`: Defines PostgreSQL schema for Prisma.
  - `db/seed.mjs`: Seeds initial data (admin, sample users).
  - `db/migrations/`: Stores Prisma migration files (generated).
  - `tests/unit/*.test.mjs`: Dedicated unit tests for each backend component.
  - `tests/routes/*.test.mjs`: Dedicated route tests.
  - `vite.config.js`: Vitest configuration.
- **Modified Files**:
  - `backend/data/db.mjs`: Initializes Prisma client.
  - `backend/routes/auth.mjs`, `users.mjs`: Call service methods, no logic, add CRUD operations.
  - `backend/services/userService.mjs`, `activityService.mjs`: Use Prisma ORM.
  - `frontend/js/app.js`: Handle CRUD operations.
  - `frontend/index.html`: Update UI for CRUD operations.
  - `tests/api.test.mjs`: Integration tests with PostgreSQL, CRUD operations.
  - `server.mjs`: Update Render config.
  - `package.json`: Add Prisma dependencies and test scripts.
  - `.env`: Include `DATABASE_URL`.
  - `.gitignore`: Remove `authmini.db`, add `dev.db`.
  - `.github/workflows/ci.yml`: Add migration, seeding steps.
- **Removed**:
  - `.node-version`: Render uses `package.json` engines.
  - `db/authmini.db`: Replaced by PostgreSQL.
- **Code Example** (Create files):
  ```bash
  mkdir -p authmini/db/migrations
  mkdir -p authmini/tests/unit
  mkdir -p authmini/tests/routes
  touch authmini/db/{schema.prisma,seed.mjs}
  touch authmini/tests/unit/{db.test.mjs,userService.test.mjs,activityService.test.mjs}
  touch authmini/tests/routes/{auth.test.mjs,users.test.mjs}
  touch authmini/vite.config.js
  ```
- **Nuance**:
  - `.env`, `.eslintrc.json`, `vite.config.js`, `.github/workflows/ci.yml` in `.gitignore`.
  - `authmini.db` removed; PostgreSQL ensures persistence.

### Step 3: Verify System Requirements

- **Why**: Ensures tools support PostgreSQL, Prisma, and Render.
- **How**: Confirm Node.js, npm, Git, PostgreSQL.
- **Steps**:
  1. **Node.js**: `node --version` (20.15.1).
     - **Fix**: `nvm install 20.15.1; nvm use 20.15.1`.
  2. **npm**: `npm --version` (6+).
  3. **Git**: `git --version`.
     - **Fix**: Install from [git-scm.com](https://git-scm.com/downloads).
  4. **PostgreSQL**:
     - **Local**: Install, verify: `psql --version`.
     - **Cloud**: Use Render (Step 17).
- **Testing**:
  - Run: `node --version`, `npm --version`, `git --version`, `psql --version`.
  - **Expected Outcome**: Node.js 20.15.1, npm 6+, Git, PostgreSQL installed.
  - **Issues**:
    - **Node mismatch**: Use `nvm`.
    - **PostgreSQL missing**: Install or use Render.

### Step 4: Install New Dependencies and Configure Environment

- **Why**: Adds Prisma, PostgreSQL dependencies.
- **How**: Update `package.json`, `.env`, `.gitignore`.
- **Code Example** (`package.json`):

  ```json
  {
    "name": "authmini",
    "version": "3.0.0",
    "type": "module",
    "engines": {
      "node": "20.15.1"
    },
    "scripts": {
      "start": "node server.mjs",
      "lint": "eslint .",
      "test": "vitest run",
      "test:unit": "vitest run tests/unit",
      "test:routes": "vitest run tests/routes",
      "test:api": "vitest run tests/api.test.mjs",
      "test:watch": "vitest watch",
      "migrate": "npx prisma migrate deploy --schema=db/schema.prisma",
      "migrate:dev": "npx prisma migrate dev --schema=db/schema.prisma --name",
      "seed": "node db/seed.mjs",
      "prisma:generate": "npx prisma generate --schema=db/schema.prisma",
      "prisma:studio": "npx prisma studio --schema=db/schema.prisma"
    },
    "dependencies": {
      "@fastify/static": "^6.0.0",
      "@prisma/client": "^5.0.0",
      "axios": "^1.6.8",
      "bcrypt": "^5.0.0",
      "dotenv": "^16.0.0",
      "fastify": "^4.0.0",
      "jsonwebtoken": "^9.0.0"
    },
    "devDependencies": {
      "eslint": "^8.57.0",
      "vitest": "^1.0.0",
      "prisma": "^5.0.0",
      "supertest": "^6.0.0"
    }
  }
  ```

  - **Explanation**:
    - **New Dependencies**:
      - `@prisma/client`, `prisma`: Prisma ORM and CLI.
      - `vitest`: Modern test runner with ESM support.
    - **Removed**: `better-sqlite3` (SQLite replaced), `jest` (replaced with Vitest).
    - **Scripts**:
      - `test`, `test:unit`, `test:routes`, `test:api`: Updated to use Vitest.
      - `migrate`: Applies migrations.
      - `seed`: Runs seed script.
      - `prisma:generate`: Generates Prisma client.
      - `prisma:studio`: Opens Prisma GUI.
    - **Node.js Version**: `"engines": { "node": "20.15.1" }` for Render.

- **Code Example** (`vite.config.js`):

  ```javascript
  import { defineConfig } from 'vitest/config';

  export default defineConfig({
    test: {
      globals: true,
      environment: 'node',
      include: ['tests/**/*.test.mjs'],
    },
  });
  ```

  - **Explanation**:
    - **Vitest Configuration**: Sets up globals (enables `describe`, `it`, etc. without imports), Node environment, and test file patterns.
    - **ESM Support**: Works natively with ESM modules.

- **Code Example** (`.env`):
  ```
  PORT=3000
  JWT_SECRET=your_jwt_secret_here
  LOG_LEVEL=info
  NODE_ENV=development
  DATABASE_URL=postgresql://user:password@localhost:5432/authmini?schema=public
  ```
  - **Explanation**:
    - **New Variables**: `DATABASE_URL` (PostgreSQL).
    - **Nuance**: Generate `JWT_SECRET` with `openssl rand -base64 32`.
- **Code Example** (`.gitignore`):
  ```
  node_modules/
  .env
  dev.db
  ```
  - **Explanation**:
    - **Updated**: Removed `db/authmini.db`, added `dev.db` (Prisma's local dev database).
    - **Why**: `authmini.db` no longer used; `dev.db` is in root for local Prisma dev database.
- **Steps**:
  1. Update `package.json`, `.env`, `.gitignore`.
  2. Create `vite.config.js`.
  3. Run `npm install`.
- **Testing**:
  - Verify `node_modules/`.
  - **Command**: `npm ls @prisma/client prisma vitest`.
  - **Expected Output**: Shows installed packages.
  - **Issues**:
    - **Module not found**: Run `npm install`.
    - **Node version**: `nvm use 20.15.1`.

---

## Backend Implementation

### Step 5: Configure Prisma and PostgreSQL

- **Why**: Replace SQLite with PostgreSQL using Prisma ORM for type-safe queries.
- **How**: Define schema, initialize Prisma client.
- **Code Example** (`db/schema.prisma`):

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

  - **Explanation**:
    - **Schema**: Mirrors V2's SQLite tables (`users`, `profiles`, `settings`, `activity_logs`) but uses Prisma's syntax.
    - **ORM Benefit**: Prisma maps tables to JavaScript objects, enabling queries like `prisma.user.findMany()`.
    - **Relations**: Defines joins (e.g., `User` to `Profile`) for data relationships.

- **Code Example** (`backend/data/db.mjs`):

  ```javascript
  /**
   * Prisma database client for AuthMini.
   * @module data/db
   */
  import { PrismaClient } from '@prisma/client';

  /** @type {PrismaClient} */
  let prisma;

  /**
   * Initializes Prisma client.
   * @returns {PrismaClient} Prisma client instance.
   */
  export function initDb() {
    if (!prisma) {
      prisma = new PrismaClient();
    }
    return prisma;
  }

  /**
   * Gets Prisma client.
   * @returns {PrismaClient} Prisma client instance.
   */
  export function getDb() {
    if (!prisma) {
      throw new Error('Database not initialized');
    }
    return prisma;
  }

  // Initialize database on module load
  initDb();
  export { prisma };
  ```

  - **Explanation**:
    - Replaces V2's `better-sqlite3` with Prisma client.
    - **ORM**: `prisma` object provides methods like `findUnique`, `create`.

- **Testing** (`tests/unit/db.test.mjs`):

  ```javascript
  /**
   * Unit tests for database client.
   * @module tests/unit/db
   */
  import { describe, it, expect } from 'vitest';
  import { initDb, getDb } from '../../backend/data/db.mjs';

  describe('Database Client', () => {
    it('should initialize Prisma client', () => {
      const db = initDb();
      expect(db).toBeDefined();
      expect(typeof db.$connect).toBe('function');
    });

    it('should get initialized Prisma client', () => {
      const db = getDb();
      expect(db).toBeDefined();
      expect(typeof db.$connect).toBe('function');
    });

    it('should return the same instance when called multiple times', () => {
      const db1 = initDb();
      const db2 = initDb();
      expect(db1).toBe(db2);
    });
  });
  ```

- **Steps**:
  1. Create `schema.prisma`, update `db.mjs`.
  2. Set up PostgreSQL locally: `createdb authmini`.
  3. Update `.env` with `DATABASE_URL`.
  4. Run `npm run prisma:generate` to initialize the client.
  5. Run `npm run test tests/unit/db.test.mjs` to test the database client.
  6. Run `npm run migrate:dev -- init` to create tables.
- **Testing**:
  - **Command**: `psql -d authmini -c "\dt"`.
  - **Expected Outcome**: Tables (`User`, `Profile`, etc.) exist.
  - **Issues**:
    - **Connection error**: Verify `DATABASE_URL`.
    - **Migration error**: Check `schema.prisma` syntax.

### Step 6: Implement Database Migrations

- **Why**: Migrations ensure consistent schema changes across environments.
- **How**: Use Prisma's migration tools.
- **Steps**:
  1. After creating `schema.prisma`, run:
     ```bash
     npm run migrate:dev -- init
     ```
  2. Prisma generates migration files in `db/migrations/`.
  3. Example migration (`db/migrations/..._init.sql`):
     ```sql
     CREATE TABLE "User" (
       id SERIAL PRIMARY KEY,
       email TEXT UNIQUE NOT NULL,
       passwordHash TEXT NOT NULL,
       role TEXT NOT NULL DEFAULT 'user',
       is_active BOOLEAN NOT NULL DEFAULT true,
       createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
     );
     ```
  - **Explanation**:
    - **Migration**: Converts `schema.prisma` to SQL, applies to PostgreSQL.
    - **Benefit**: Tracks schema history, allows rollback or updates.
- **Testing**:
  - **Command**: `npm run migrate`.
  - **Expected Output**: `All migrations have been successfully applied.`
  - **Command**: `psql -d authmini -c "\dt"`.
  - **Expected Output**: Lists tables (`User`, `Profile`, `Settings`, `ActivityLog`).
  - **Issues**:
    - `Error validating datasource`: Fix `DATABASE_URL` in `.env`.
    - `Migration failed`: Check `schema.prisma` syntax.

### Step 7: Implement Database Seeding

- **Why**: Seeds initial data (e.g., admin, sample users) for consistency.
- **How**: Create seed script for test data.
- **Code Example** (`db/seed.mjs`):

  ```javascript
  /**
   * Seeds database with initial data.
   * @module db/seed
   */
  import { PrismaClient } from '@prisma/client';
  import bcrypt from 'bcrypt';

  const prisma = new PrismaClient();

  /**
   * Seeds admin and sample users.
   * @async
   */
  async function main() {
    try {
      console.log('Starting seeding...');

      // Clear existing data (optional, ensures clean state)
      await prisma.profile.deleteMany();
      await prisma.settings.deleteMany();
      await prisma.activityLog.deleteMany();
      await prisma.user.deleteMany();

      // Seed admin user
      const adminPassword = bcrypt.hashSync('admin123', 10);
      await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
          email: 'admin@example.com',
          passwordHash: adminPassword,
          role: 'admin',
          is_active: true,
        },
      });

      // Seed sample users with profiles
      const sampleUsers = [
        {
          email: 'user1@example.com',
          passwordHash: bcrypt.hashSync('user123', 10),
          role: 'user',
          is_active: true,
          profile: {
            create: {
              displayName: 'User One',
              bio: 'Regular user with profile',
            },
          },
        },
        {
          email: 'user2@example.com',
          passwordHash: bcrypt.hashSync('user123', 10),
          role: 'user',
          is_active: true,
          profile: {
            create: {
              displayName: 'User Two',
            },
          },
          settings: {
            create: {
              theme: 'dark',
              notifications: true,
            },
          },
        },
        {
          email: 'disabled@example.com',
          passwordHash: bcrypt.hashSync('user123', 10),
          role: 'user',
          is_active: false,
        },
      ];

      // Create users with profiles using Promise.all for efficiency
      const createdUsers = await Promise.all(
        sampleUsers.map((user) =>
          prisma.user.create({
            data: user,
          })
        )
      );

      console.log(`Created ${createdUsers.length} sample users`);
      console.log('Seeding completed successfully.');
    } catch (err) {
      console.error('Seeding failed:', err);
      process.exit(1);
    } finally {
      await prisma.$disconnect();
    }
  }

  main();
  ```

  - **Explanation**:
    - **Seeding**: Creates admin and sample users with profiles for testing CRUD operations.
    - **ORM**: Uses `prisma.user.upsert` and `create` for efficient inserts.
    - **Benefit**: Replaces V2's manual seeding, ensures consistent data.

- **Testing**:
  - **Command**: `npm run seed`.
  - **Expected Output**:
    ```
    Starting seeding...
    Created 3 sample users
    Seeding completed successfully.
    ```
  - **Command**: `psql -d authmini -c "SELECT email, role, is_active FROM \"User\";"`.
  - **Expected Output**:
    ```
          email         |  role  | is_active
    ----------------------+--------+-----------
    admin@example.com    | admin  | t
    user1@example.com    | user   | t
    user2@example.com    | user   | t
    disabled@example.com | user   | f
    (4 rows)
    ```
  - **Possible Errors**:
    - `Error: connect ECONNREFUSED`: PostgreSQL is not running.
    - `PrismaClientValidationError`: Schema has changed since migration.

#### Prisma Studio: Database GUI

Before moving on to Step 9, you can use Prisma Studio to visually inspect and manage your database tables. This provides a convenient graphical interface for viewing and modifying data.

```bash
npm run prisma:studio
```

This opens a browser interface (usually at http://localhost:5555) where you'll see:

- **User table**: ID, email, passwordHash, role, is_active, createdAt
- **Profile table**: userId, displayName, bio, avatarUrl
- **Settings table**: userId, theme, notifications
- **ActivityLog table**: id, userId, action, createdAt

This is a great way to verify that your migrations have correctly set up the database schema and that your seed data has been properly inserted before proceeding to implement the user service with CRUD operations

### Step 8: Implement User Service with CRUD Operations

- **Why**: Provide comprehensive Create, Read, Update, Delete operations for user management.
- **How**: Update `userService.mjs` with Prisma queries.
- **Code Example** (`backend/services/userService.mjs`):

  ```javascript
  /**
   * User service for AuthMini.
   * @module services/userService
   */
  import bcrypt from 'bcrypt';
  import jwt from 'jsonwebtoken';
  import { config } from 'dotenv';
  import { getDb } from '../data/db.mjs';
  import { logActivity } from './activityService.mjs';

  config();

  /**
   * Registers a new user.
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   * @returns {Object} User ID.
   * @throws {Error} If email exists.
   * @async
   */
  export async function registerUser(email, password) {
    const db = getDb();
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) throw new Error('Email already exists');
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: { email, passwordHash },
    });
    await logActivity(user.id, 'User registered');
    return { id: user.id };
  }

  /**
   * Logs in a user.
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   * @returns {Object} Token and user data.
   * @throws {Error} If credentials invalid.
   * @async
   */
  export async function loginUser(email, password) {
    const db = getDb();
    const user = await db.user.findUnique({ where: { email } });
    if (
      !user ||
      !user.is_active ||
      !(await bcrypt.compare(password, user.passwordHash))
    ) {
      throw new Error('Invalid credentials or account disabled');
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    await logActivity(user.id, 'User logged in');
    return { token, user: { id: user.id, email: user.email, role: user.role } };
  }

  /**
   * Gets all users with optional filtering.
   * @param {Object} filters - Optional filters (search, active).
   * @returns {Array} Array of users.
   * @async
   */
  export async function getUsers(filters = {}) {
    const db = getDb();
    const { search, active } = filters;

    const where = {};
    if (search) {
      where.email = { contains: search, mode: 'insensitive' };
    }
    if (active !== undefined) {
      where.is_active = active === 'true' || active === true;
    }

    return db.user.findMany({
      where,
      include: { profile: true },
      orderBy: { id: 'asc' },
    });
  }

  /**
   * Gets a user by ID with profile.
   * @param {number} userId - User ID.
   * @returns {Object} User with profile.
   * @throws {Error} If user not found.
   * @async
   */
  export async function getUserById(userId) {
    const db = getDb();
    const user = await db.user.findUnique({
      where: { id: userId },
      include: { profile: true, settings: true },
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    return user;
  }

  /**
   * Updates user profile.
   * @param {number} userId - User's ID.
   * @param {Object} profileData - Profile data.
   * @returns {Object} Updated profile.
   * @async
   */
  export async function updateUserProfile(userId, profileData) {
    const db = getDb();

    // Verify user exists
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    await db.profile.upsert({
      where: { userId },
      update: profileData,
      create: { userId, ...profileData },
    });

    await logActivity(userId, 'Profile updated');
    return profileData;
  }

  /**
   * Updates user settings.
   * @param {number} userId - User's ID.
   * @param {Object} settingsData - Settings data.
   * @returns {Object} Updated settings.
   * @async
   */
  export async function updateUserSettings(userId, settingsData) {
    const db = getDb();

    // Verify user exists
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    await db.settings.upsert({
      where: { userId },
      update: settingsData,
      create: { userId, ...settingsData },
    });

    await logActivity(userId, 'Settings updated');
    return settingsData;
  }

  /**
   * Changes user password.
   * @param {number} userId - User's ID.
   * @param {string} newPassword - New password.
   * @returns {Object} Success message.
   * @async
   */
  export async function changeUserPassword(userId, newPassword) {
    const db = getDb();

    // Verify user exists
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await db.user.update({
      where: { id: userId },
      data: { passwordHash },
    });

    await logActivity(userId, 'Password changed');
    return { message: 'Password updated successfully' };
  }

  /**
   * Sets user active status.
   * @param {number} userId - User's ID.
   * @param {boolean} isActive - Active status to set.
   * @returns {Object} Updated user record.
   * @throws {Error} If user not found or invalid input.
   * @async
   */
  export async function setUserActive(userId, isActive) {
    const db = getDb();

    // Validate inputs
    if (!Number.isInteger(userId) || userId <= 0) {
      throw new Error('userId must be a positive integer');
    }

    if (typeof isActive !== 'boolean') {
      throw new Error('isActive must be a boolean');
    }

    try {
      const user = await db.user.update({
        where: { id: userId },
        data: { is_active: isActive },
      });

      await logActivity(userId, `User ${isActive ? 'enabled' : 'disabled'}`);

      return user;
    } catch (err) {
      if (err.code === 'P2025') {
        throw new Error(`User with ID ${userId} not found`);
      }
      throw err;
    }
  }

  /**
   * Deletes a user.
   * @param {number} userId - User's ID.
   * @returns {Object} Success message.
   * @throws {Error} If user not found.
   * @async
   */
  export async function deleteUser(userId) {
    const db = getDb();

    try {
      // Delete related records first due to foreign key constraints
      await db.profile.deleteMany({ where: { userId } });
      await db.settings.deleteMany({ where: { userId } });
      await db.activityLog.deleteMany({ where: { userId } });

      // Delete the user
      await db.user.delete({ where: { id: userId } });

      return { message: `User with ID ${userId} deleted successfully` };
    } catch (err) {
      if (err.code === 'P2025') {
        throw new Error(`User with ID ${userId} not found`);
      }
      throw err;
    }
  }
  ```

- **Testing** (`tests/unit/userService.test.mjs`):

  ```javascript
  /**
   * Unit tests for User Service.
   * @module tests/unit/userService
   */
  import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
  import {
    registerUser,
    loginUser,
    getUsers,
    getUserById,
    updateUserProfile,
    setUserActive,
    deleteUser,
  } from '../../backend/services/userService.mjs';
  import { initDb } from '../../backend/data/db.mjs';
  import { logActivity } from '../../backend/services/activityService.mjs';

  // Mock activityService
  vi.mock('../../backend/services/activityService.mjs', () => ({
    logActivity: vi.fn().mockResolvedValue({}),
  }));

  describe('User Service', () => {
    let db;
    let testUserId;

    beforeAll(async () => {
      db = initDb();
      // Create a test user for operations
      const result = await registerUser(
        'test-service@example.com',
        'password123'
      );
      testUserId = result.id;
    });

    afterAll(async () => {
      // Clean up test data
      try {
        await db.profile.deleteMany({ where: { userId: testUserId } });
        await db.user.delete({ where: { id: testUserId } });
      } catch (err) {
        // Already deleted in test
      }
      await db.$disconnect();
    });

    it('should register a new user', async () => {
      const result = await registerUser('new-user@example.com', 'password123');
      expect(result.id).toBeDefined();
      expect(logActivity).toHaveBeenCalled();

      // Clean up
      await db.user.delete({ where: { id: result.id } });
    });

    it('should not register duplicate email', async () => {
      await expect(
        registerUser('test-service@example.com', 'password123')
      ).rejects.toThrow('Email already exists');
    });

    it('should login a user', async () => {
      const result = await loginUser('test-service@example.com', 'password123');
      expect(result.token).toBeDefined();
      expect(result.user.email).toBe('test-service@example.com');
      expect(logActivity).toHaveBeenCalled();
    });

    it('should reject login with wrong password', async () => {
      await expect(
        loginUser('test-service@example.com', 'wrongpassword')
      ).rejects.toThrow('Invalid credentials');
    });

    it('should get all users', async () => {
      const users = await getUsers();
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBeGreaterThan(0);
    });

    it('should filter users by search', async () => {
      const users = await getUsers({ search: 'test-service' });
      expect(users.length).toBe(1);
      expect(users[0].email).toBe('test-service@example.com');
    });

    it('should get a user by ID', async () => {
      const user = await getUserById(testUserId);
      expect(user.id).toBe(testUserId);
      expect(user.email).toBe('test-service@example.com');
    });

    it('should throw error for non-existent user ID', async () => {
      await expect(getUserById(999999)).rejects.toThrow('not found');
    });

    it('should update user profile', async () => {
      const profileData = {
        displayName: 'Test User',
        bio: 'This is a test profile',
      };

      const result = await updateUserProfile(testUserId, profileData);
      expect(result).toEqual(profileData);
      expect(logActivity).toHaveBeenCalled();

      // Verify update
      const user = await getUserById(testUserId);
      expect(user.profile.displayName).toBe('Test User');
    });

    it('should set user active status', async () => {
      const user = await setUserActive(testUserId, false);
      expect(user.is_active).toBe(false);
      expect(logActivity).toHaveBeenCalled();

      // Reset status for other tests
      await setUserActive(testUserId, true);
    });

    it('should delete a user', async () => {
      // Create a user to delete
      const { id } = await registerUser('to-delete@example.com', 'password123');

      const result = await deleteUser(id);
      expect(result.message).toContain('deleted successfully');

      // Verify deletion
      await expect(getUserById(id)).rejects.toThrow('not found');
    });
  });
  ```

- **Running Tests**:

  - **Command**: `npm run test  tests/unit/userService.test.mjs`
  - **Expected Output**:

    ```
    ✓ tests/unit/userService.test.mjs (11 tests) 689ms

    Test Files  1 passed (1)
    Tests       11 passed (11)
    Start at    10:15:20
    Duration    3.12s
    ```

  - **Possible Errors**:
    - `Cannot find module '../../backend/services/userService.mjs'`: Check file paths.
    - `PrismaClientKnownRequestError`: Database connection issues.
    - `Error: connect ETIMEDOUT`: Database server not responding.

### Step 9: Implement Activity Service

- **Why**: Provides activity logging for audit purposes.
- **How**: Update `activityService.mjs` with Prisma.
- **Code Example** (`backend/services/activityService.mjs`):

  ```javascript
  /**
   * Activity log service for AuthMini.
   * @module services/activityService
   */
  import { getDb } from '../data/db.mjs';

  /**
   * Logs a user action.
   * @param {number} userId - User's ID.
   * @param {string} action - Action description.
   * @returns {Object} Created log entry.
   * @async
   */
  export async function logActivity(userId, action) {
    const db = getDb();
    return db.activityLog.create({
      data: { userId, action },
    });
  }

  /**
   * Gets activity logs with optional filters.
   * @param {Object} filters - Filters (userId, startDate).
   * @returns {Array} Array of log entries.
   * @async
   */
  export async function getActivityLogs(filters = {}) {
    const db = getDb();
    const where = {};

    if (filters.userId) {
      where.userId = Number(filters.userId);
    }

    if (filters.startDate) {
      where.createdAt = { gte: new Date(filters.startDate) };
    }

    return db.activityLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { email: true } } },
    });
  }
  ```

- **Testing** (`tests/unit/activityService.test.mjs`):

  ```javascript
  /**
   * Unit tests for Activity Service.
   * @module tests/unit/activityService
   */
  import { describe, it, expect, beforeAll, afterAll } from 'vitest';
  import {
    logActivity,
    getActivityLogs,
  } from '../../backend/services/activityService.mjs';
  import { registerUser } from '../../backend/services/userService.mjs';
  import { initDb } from '../../backend/data/db.mjs';

  describe('Activity Service', () => {
    let db;
    let testUserId;

    beforeAll(async () => {
      db = initDb();
      // Create a test user for operations
      const result = await registerUser(
        'test-activity@example.com',
        'password123'
      );
      testUserId = result.id;
    });

    afterAll(async () => {
      // Clean up test data
      await db.activityLog.deleteMany({ where: { userId: testUserId } });
      await db.user.delete({ where: { id: testUserId } });
      await db.$disconnect();
    });

    it('should log an activity', async () => {
      const action = 'Test action';
      const log = await logActivity(testUserId, action);

      expect(log.id).toBeDefined();
      expect(log.userId).toBe(testUserId);
      expect(log.action).toBe(action);
    });

    it('should get activity logs', async () => {
      // Log another activity
      await logActivity(testUserId, 'Another test action');

      const logs = await getActivityLogs({ userId: testUserId });

      expect(Array.isArray(logs)).toBe(true);
      expect(logs.length).toBeGreaterThanOrEqual(2);
      expect(logs[0].userId).toBe(testUserId);
    });

    it('should filter logs by date', async () => {
      const startDate = new Date();

      // Ensure date is slightly in the past
      startDate.setSeconds(startDate.getSeconds() - 1);

      // Log a new action
      await logActivity(testUserId, 'Recent action');

      const logs = await getActivityLogs({
        userId: testUserId,
        startDate: startDate.toISOString(),
      });

      expect(logs.length).toBeGreaterThanOrEqual(1);
      expect(logs[0].action).toBe('Recent action');
    });
  });
  ```

- **Running Tests**:

  - **Command**: `npm run test  tests/unit/activityService.test.mjs`
  - **Expected Output**:

    ```
    ✓ tests/unit/activityService.test.mjs (3 tests) 154ms

    Test Files  1 passed (1)
    Tests       3 passed (3)
    Start at    10:25:30
    Duration    1.84s
    ```

  - **Possible Errors**:
    - `Cannot find module '../../backend/services/activityService.mjs'`: Check file paths.
    - `PrismaClientKnownRequestError`: Database connection issues.

### Step 10: Update Auth Routes

- **Why**: Routes handle HTTP requests, delegating logic to services.
- **How**: Update `auth.mjs` to work with the updated services.
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
    getUserById,
    updateUserProfile,
    updateUserSettings,
    changeUserPassword,
  } from '../services/userService.mjs';

  config();

  /**
   * Registers authentication routes.
   * @param {FastifyInstance} fastify - Fastify instance.
   * @param {Object} options - Route options.
   * @async
   */
  export async function registerRoutes(fastify, options) {
    fastify.post('/register', async (request, reply) => {
      const { email, password } = request.body;

      if (!email || !password) {
        return reply
          .code(400)
          .send({ error: 'Email and password are required' });
      }

      try {
        await registerUser(email, password);
        return reply.code(201).send({ message: 'User registered' });
      } catch (err) {
        return reply.code(400).send({ error: err.message });
      }
    });

    fastify.post('/login', async (request, reply) => {
      const { email, password } = request.body;

      if (!email || !password) {
        return reply
          .code(400)
          .send({ error: 'Email and password are required' });
      }

      try {
        const result = await loginUser(email, password);
        return reply.send(result);
      } catch (err) {
        return reply.code(401).send({ error: err.message });
      }
    });

    fastify.post('/logout', async (request, reply) => {
      // Server-side there's not much to do for logout with JWT
      // The client will remove the token
      return reply.send({ message: 'Logged out' });
    });

    fastify.get('/me', async (request, reply) => {
      const token = request.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return reply.code(401).send({ error: 'No token provided' });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await getUserById(decoded.id);

        // Remove sensitive fields
        delete user.passwordHash;

        return reply.send({ user });
      } catch (err) {
        return reply.code(401).send({ error: 'Invalid token' });
      }
    });

    fastify.post('/profile', async (request, reply) => {
      const token = request.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return reply.code(401).send({ error: 'No token provided' });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { displayName, bio, avatarUrl } = request.body;

        await updateUserProfile(decoded.id, { displayName, bio, avatarUrl });

        return reply.send({ message: 'Profile updated' });
      } catch (err) {
        return reply.code(401).send({ error: 'Invalid token' });
      }
    });

    fastify.post('/settings', async (request, reply) => {
      const token = request.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return reply.code(401).send({ error: 'No token provided' });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { theme, notifications } = request.body;

        await updateUserSettings(decoded.id, { theme, notifications });

        return reply.send({ message: 'Settings updated' });
      } catch (err) {
        return reply.code(401).send({ error: 'Invalid token' });
      }
    });

    fastify.post('/password', async (request, reply) => {
      const token = request.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return reply.code(401).send({ error: 'No token provided' });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { newPassword } = request.body;

        if (!newPassword || newPassword.length < 6) {
          return reply.code(400).send({
            error: 'New password is required and must be at least 6 characters',
          });
        }

        await changeUserPassword(decoded.id, newPassword);

        return reply.send({ message: 'Password updated' });
      } catch (err) {
        return reply.code(401).send({ error: 'Invalid token' });
      }
    });
  }
  ```

- **Testing** (`tests/routes/auth.test.mjs`):

  ```javascript
  /**
   * Tests for Auth Routes.
   * @module tests/routes/auth
   */
  import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
  import Fastify from 'fastify';
  import jwt from 'jsonwebtoken';
  import { registerRoutes } from '../../backend/routes/auth.mjs';
  import * as userService from '../../backend/services/userService.mjs';

  // Mock the user service
  vi.mock('../../backend/services/userService.mjs');

  describe('Auth Routes', () => {
    let fastify;

    beforeAll(async () => {
      // Setup fastify instance
      fastify = Fastify({ logger: false });
      await fastify.register(registerRoutes, { prefix: '/api' });
      await fastify.ready();

      // Setup mock implementations
      userService.registerUser = vi.fn().mockResolvedValue({ id: 1 });
      userService.loginUser = vi.fn().mockResolvedValue({
        token: 'fake-token',
        user: { id: 1, email: 'test@example.com', role: 'user' },
      });
      userService.getUserById = vi.fn().mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        role: 'user',
        profile: null,
      });
      userService.updateUserProfile = vi.fn().mockResolvedValue({});
      userService.updateUserSettings = vi.fn().mockResolvedValue({});
      userService.changeUserPassword = vi.fn().mockResolvedValue({});

      // Mock JWT verification
      vi.spyOn(jwt, 'verify').mockImplementation(() => ({
        id: 1,
        email: 'test@example.com',
        role: 'user',
      }));
    });

    afterAll(async () => {
      await fastify.close();
      vi.restoreAllMocks();
    });

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

    it('POST /api/register should validate required fields', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/api/register',
        payload: { email: 'test@example.com' }, // Missing password
      });

      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body).error).toContain('required');
    });

    it('POST /api/login should authenticate a user', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/api/login',
        payload: { email: 'test@example.com', password: 'password123' },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.token).toBe('fake-token');
      expect(userService.loginUser).toHaveBeenCalledWith(
        'test@example.com',
        'password123'
      );
    });

    it('GET /api/me should return user profile', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/api/me',
        headers: { Authorization: 'Bearer fake-token' },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.user.email).toBe('test@example.com');
      expect(userService.getUserById).toHaveBeenCalledWith(1);
    });

    it('POST /api/profile should update user profile', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/api/profile',
        headers: { Authorization: 'Bearer fake-token' },
        payload: { displayName: 'Test User', bio: 'Test bio' },
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body)).toEqual({ message: 'Profile updated' });
      expect(userService.updateUserProfile).toHaveBeenCalledWith(1, {
        displayName: 'Test User',
        bio: 'Test bio',
        avatarUrl: undefined,
      });
    });

    it('POST /api/settings should update user settings', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/api/settings',
        headers: { Authorization: 'Bearer fake-token' },
        payload: { theme: 'dark', notifications: true },
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body)).toEqual({
        message: 'Settings updated',
      });
      expect(userService.updateUserSettings).toHaveBeenCalledWith(1, {
        theme: 'dark',
        notifications: true,
      });
    });

    it('POST /api/password should update user password', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/api/password',
        headers: { Authorization: 'Bearer fake-token' },
        payload: { newPassword: 'newpassword123' },
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body)).toEqual({
        message: 'Password updated',
      });
      expect(userService.changeUserPassword).toHaveBeenCalledWith(
        1,
        'newpassword123'
      );
    });

    it('POST /api/logout should acknowledge logout', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/api/logout',
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body)).toEqual({ message: 'Logged out' });
    });
  });
  ```

- **Running Tests**:

  - **Command**: `npm run test  tests/routes/auth.test.mjs`

  - **Expected Output**:

    ```
    ✓ tests/routes/auth.test.mjs (8 tests) 46ms

    Test Files  1 passed (1)
    Tests       8 passed (8)
    Start at    10:35:20
    Duration    1.08s
    ```

  - **Possible Errors**:
    - `ReferenceError: jwt is not defined`: Forgot to import or mock JWT module.
    - `Cannot find module 'fastify'`: Run `npm install`.
    - `Cannot spyOn on a primitive value`: Verify mocking implementation.

### Step 11: Update User Routes (Admin CRUD)

- **Why**: Provides admin-only routes for user management.
- **How**: Update `users.mjs` with CRUD operations.
- **Code Example** (`backend/routes/users.mjs`):

  ```javascript
  /**
   * Admin user management routes.
   * @module routes/users
   */
  import jwt from 'jsonwebtoken';
  import { config } from 'dotenv';
  import {
    getUsers,
    getUserById,
    setUserActive,
    deleteUser,
  } from '../services/userService.mjs';
  import { getActivityLogs } from '../services/activityService.mjs';

  config();

  /**
   * Verifies admin role from token.
   * @param {string} token - JWT token.
   * @returns {Object} Decoded token.
   * @throws {Error} If not admin.
   */
  function verifyAdmin(token) {
    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      throw new Error('Admin access required');
    }

    return decoded;
  }

  /**
   * Registers user management routes.
   * @param {FastifyInstance} fastify - Fastify instance.
   * @param {Object} options - Route options.
   * @async
   */
  export async function registerUserRoutes(fastify, options) {
    // Get all users (admin only)
    fastify.get('/users', async (request, reply) => {
      try {
        const token = request.headers.authorization?.replace('Bearer ', '');
        verifyAdmin(token);

        const { search, active } = request.query;
        const users = await getUsers({ search, active });

        return reply.send({ users });
      } catch (err) {
        if (err.message === 'No token provided') {
          return reply.code(401).send({ error: 'No token provided' });
        }
        if (err.message === 'Admin access required') {
          return reply.code(403).send({ error: 'Admin access required' });
        }

        return reply.code(401).send({ error: 'Invalid token' });
      }
    });

    // Get user by ID (admin only)
    fastify.get('/users/:id', async (request, reply) => {
      try {
        const token = request.headers.authorization?.replace('Bearer ', '');
        verifyAdmin(token);

        const userId = parseInt(request.params.id, 10);

        if (isNaN(userId) || userId <= 0) {
          return reply.code(400).send({ error: 'Invalid user ID' });
        }

        const user = await getUserById(userId);

        // Remove sensitive data
        delete user.passwordHash;

        return reply.send({ user });
      } catch (err) {
        if (err.message === 'No token provided') {
          return reply.code(401).send({ error: 'No token provided' });
        }
        if (err.message === 'Admin access required') {
          return reply.code(403).send({ error: 'Admin access required' });
        }
        if (err.message.includes('not found')) {
          return reply.code(404).send({ error: err.message });
        }

        return reply.code(401).send({ error: 'Invalid token' });
      }
    });

    // Update user active status (admin only)
    fastify.patch('/users/:id/active', async (request, reply) => {
      try {
        const token = request.headers.authorization?.replace('Bearer ', '');
        verifyAdmin(token);

        const userId = parseInt(request.params.id, 10);
        const { isActive } = request.body;

        if (isNaN(userId) || userId <= 0) {
          return reply.code(400).send({ error: 'Invalid user ID' });
        }

        if (typeof isActive !== 'boolean') {
          return reply.code(400).send({ error: 'isActive must be a boolean' });
        }

        const user = await setUserActive(userId, isActive);

        return reply.send({
          message: `User ${isActive ? 'enabled' : 'disabled'}`,
          user,
        });
      } catch (err) {
        if (err.message === 'No token provided') {
          return reply.code(401).send({ error: 'No token provided' });
        }
        if (err.message === 'Admin access required') {
          return reply.code(403).send({ error: 'Admin access required' });
        }
        if (err.message.includes('not found')) {
          return reply.code(404).send({ error: err.message });
        }

        return reply.code(401).send({ error: 'Invalid token or server error' });
      }
    });

    // Delete user (admin only)
    fastify.delete('/users/:id', async (request, reply) => {
      try {
        const token = request.headers.authorization?.replace('Bearer ', '');
        verifyAdmin(token);

        const userId = parseInt(request.params.id, 10);

        if (isNaN(userId) || userId <= 0) {
          return reply.code(400).send({ error: 'Invalid user ID' });
        }

        const result = await deleteUser(userId);

        return reply.send(result);
      } catch (err) {
        if (err.message === 'No token provided') {
          return reply.code(401).send({ error: 'No token provided' });
        }
        if (err.message === 'Admin access required') {
          return reply.code(403).send({ error: 'Admin access required' });
        }
        if (err.message.includes('not found')) {
          return reply.code(404).send({ error: err.message });
        }

        return reply.code(401).send({ error: 'Invalid token or server error' });
      }
    });

    // Get activity logs (admin only)
    fastify.get('/logs', async (request, reply) => {
      try {
        const token = request.headers.authorization?.replace('Bearer ', '');
        verifyAdmin(token);

        const { userId, startDate } = request.query;
        const logs = await getActivityLogs({ userId, startDate });

        return reply.send({ logs });
      } catch (err) {
        if (err.message === 'No token provided') {
          return reply.code(401).send({ error: 'No token provided' });
        }
        if (err.message === 'Admin access required') {
          return reply.code(403).send({ error: 'Admin access required' });
        }

        return reply.code(401).send({ error: 'Invalid token' });
      }
    });
  }
  ```

- **Testing** (`tests/routes/users.test.mjs`):

  ```javascript
  /**
   * Tests for User Routes.
   * @module tests/routes/users
   */
  import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
  import Fastify from 'fastify';
  import jwt from 'jsonwebtoken';
  import { registerUserRoutes } from '../../backend/routes/users.mjs';
  import * as userService from '../../backend/services/userService.mjs';
  import * as activityService from '../../backend/services/activityService.mjs';

  // Mock the services and JWT
  vi.mock('jsonwebtoken');
  vi.mock('../../backend/services/userService.mjs');
  vi.mock('../../backend/services/activityService.mjs');

  describe('User Routes', () => {
    let fastify;
    const adminToken = 'admin-token';
    const userToken = 'user-token';

    beforeAll(async () => {
      // Setup fastify instance
      fastify = Fastify({ logger: false });
      await fastify.register(registerUserRoutes, { prefix: '/api' });
      await fastify.ready();

      // Setup mock JWT implementation
      jwt.verify = vi.fn().mockImplementation((token) => {
        if (token === adminToken) {
          return { id: 1, email: 'admin@example.com', role: 'admin' };
        }
        if (token === userToken) {
          return { id: 2, email: 'user@example.com', role: 'user' };
        }
        throw new Error('Invalid token');
      });

      // Setup mock service implementations
      userService.getUsers = vi.fn().mockResolvedValue([
        { id: 1, email: 'admin@example.com', role: 'admin', is_active: true },
        { id: 2, email: 'user@example.com', role: 'user', is_active: true },
      ]);

      userService.getUserById = vi.fn().mockImplementation(async (id) => {
        if (id === 1) {
          return {
            id: 1,
            email: 'admin@example.com',
            role: 'admin',
            is_active: true,
          };
        }
        if (id === 2) {
          return {
            id: 2,
            email: 'user@example.com',
            role: 'user',
            is_active: true,
          };
        }
        throw new Error(`User with ID ${id} not found`);
      });

      userService.setUserActive = vi
        .fn()
        .mockImplementation(async (id, isActive) => {
          if (id === 1 || id === 2) {
            return { id, is_active: isActive };
          }
          throw new Error(`User with ID ${id} not found`);
        });

      userService.deleteUser = vi.fn().mockImplementation(async (id) => {
        if (id === 2) {
          return { message: `User with ID ${id} deleted successfully` };
        }
        throw new Error(`User with ID ${id} not found`);
      });

      activityService.getActivityLogs = vi
        .fn()
        .mockResolvedValue([
          { id: 1, userId: 1, action: 'User logged in', createdAt: new Date() },
        ]);
    });

    afterAll(async () => {
      await fastify.close();
      vi.restoreAllMocks();
    });

    it('GET /api/users should return users for admin', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/api/users',
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.users.length).toBe(2);
      expect(userService.getUsers).toHaveBeenCalled();
    });

    it('GET /api/users should reject non-admin users', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/api/users',
        headers: { Authorization: `Bearer ${userToken}` },
      });

      expect(response.statusCode).toBe(403);
      expect(JSON.parse(response.body)).toEqual({
        error: 'Admin access required',
      });
    });

    it('GET /api/users/:id should return user details for admin', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/api/users/2',
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.user.id).toBe(2);
      expect(body.user.email).toBe('user@example.com');
      expect(userService.getUserById).toHaveBeenCalledWith(2);
    });

    it('GET /api/users/:id should return 404 for non-existent user', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/api/users/999',
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      expect(response.statusCode).toBe(404);
      expect(JSON.parse(response.body).error).toContain('not found');
    });

    it('PATCH /api/users/:id/active should update user status for admin', async () => {
      const response = await fastify.inject({
        method: 'PATCH',
        url: '/api/users/2/active',
        headers: { Authorization: `Bearer ${adminToken}` },
        payload: { isActive: false },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.message).toBe('User disabled');
      expect(body.user.is_active).toBe(false);
      expect(userService.setUserActive).toHaveBeenCalledWith(2, false);
    });

    it('DELETE /api/users/:id should delete a user for admin', async () => {
      const response = await fastify.inject({
        method: 'DELETE',
        url: '/api/users/2',
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.message).toContain('deleted successfully');
      expect(userService.deleteUser).toHaveBeenCalledWith(2);
    });

    it('GET /api/logs should return activity logs for admin', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/api/logs',
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(Array.isArray(body.logs)).toBe(true);
      expect(activityService.getActivityLogs).toHaveBeenCalled();
    });
  });
  ```

- **Running Tests**:

  - **Command**: `npm run test  tests/routes/users.test.mjs`
  - **Expected Output**:

    ```
    ✓ tests/routes/users.test.mjs (7 tests) 32ms

    Test Files  1 passed (1)
    Tests       7 passed (7)
    Start at    10:45:20
    Duration    1.11s
    ```

  - **Possible Errors**:
    - `ReferenceError: jwt is not defined`: Forgot to import or mock JWT.
    - `Error: listen EADDRINUSE`: Port conflict, check test setup.

### Step 12: Update Server Configuration

- **Why**: Server needs to use updated database connection and serve APIs/frontend.
- **How**: Update `server.mjs`.
- **Code Example** (`server.mjs`):

  ```javascript
  /**
   * Server entry point for AuthMini.
   * @module server
   */
  import Fastify from 'fastify';
  import fastifyStatic from '@fastify/static';
  import path from 'path';
  import { fileURLToPath } from 'url';
  import { config } from 'dotenv';
  import { registerRoutes } from './backend/routes/auth.mjs';
  import { registerUserRoutes } from './backend/routes/users.mjs';
  import { initDb } from './backend/data/db.mjs';

  // Load environment variables
  config();

  // Get __dirname equivalent in ESM
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  /**
   * Starts the server.
   * @async
   */
  export async function startServer() {
    const fastify = Fastify({
      logger: { level: process.env.LOG_LEVEL || 'info' },
    });

    // Initialize Prisma client
    initDb();

    // Serve static files from frontend directory
    fastify.register(fastifyStatic, {
      root: path.join(__dirname, 'frontend'),
      prefix: '/',
    });

    // Register API routes
    fastify.register(registerRoutes, { prefix: '/api' });
    fastify.register(registerUserRoutes, { prefix: '/api' });

    // Catch-all route for SPA
    fastify.setNotFoundHandler((request, reply) => {
      reply.sendFile('index.html');
    });

    // Get port from environment or use default
    const port = process.env.PORT || 3000;

    try {
      const address = await fastify.listen({ port, host: '0.0.0.0' });
      console.log(`Server listening on ${address}`);
    } catch (err) {
      console.error('Error starting server:', err);
      process.exit(1);
    }
  }

  startServer();
  ```

### Step 13: Update Frontend for CRUD Operations

- **Why**: Frontend needs to support CRUD operations.
- **How**: Update `index.html` to include functionality for CRUD operations.
- **Code Example** (`frontend/index.html`):

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>AuthMini V3</title>
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
            AuthMini V3 Login / Register
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
            x-model="profile.displayName"
            placeholder="Display Name"
            class="w-full text-gray-700 p-2 mb-2 rounded"
          />
          <textarea
            x-model="profile.bio"
            placeholder="Bio"
            class="w-full text-gray-700 p-2 mb-2 rounded"
          ></textarea>
          <input
            x-model="profile.avatarUrl"
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
        <div class="text-white mb-4">
          <label>
            <input
              type="radio"
              name="status"
              value=""
              x-model="activeFilter"
              @change="fetchUsers()"
            />
            All Users
          </label>
          <label class="ml-4">
            <input
              type="radio"
              name="status"
              value="true"
              x-model="activeFilter"
              @change="fetchUsers()"
            />
            Active Users
          </label>
          <label class="ml-4">
            <input
              type="radio"
              name="status"
              value="false"
              x-model="activeFilter"
              @change="fetchUsers()"
            />
            Disabled Users
          </label>
        </div>
        <h3 class="text-lg font-semibold mb-2 text-white">Users</h3>
        <ul class="mb-4 max-h-60 overflow-y-auto">
          <template x-for="u in users" :key="u.id">
            <li
              class="text-white flex justify-between items-center py-1 border-b border-gray-600"
            >
              <span
                x-text="`${u.email} (${u.role}) - ${u.is_active ? 'Active' : 'Disabled'}`"
              ></span>
              <div>
                <button
                  @click="viewUser(u.id)"
                  class="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
                >
                  View
                </button>
                <button
                  @click="toggleUserActive(u.id, !u.is_active)"
                  class="ml-1 text-xs px-2 py-1 rounded"
                  :class="u.is_active ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'"
                >
                  <span x-text="u.is_active ? 'Disable' : 'Enable'"></span>
                </button>
                <button
                  @click="deleteUser(u.id)"
                  class="ml-1 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          </template>
        </ul>

        <!-- Activity Logs -->
        <h3 class="text-lg font-semibold mt-4 mb-2 text-white">
          Recent Activity
        </h3>
        <ul class="mb-4 max-h-40 overflow-y-auto">
          <template x-for="log in logs" :key="log.id">
            <li class="text-white text-sm py-1 border-b border-gray-600">
              <span
                x-text="`${new Date(log.createdAt).toLocaleString()} - ${log.user?.email || 'Unknown'}: ${log.action}`"
              ></span>
            </li>
          </template>
        </ul>

        <button
          @click="fetchUsers(); fetchLogs();"
          class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
        >
          Refresh Data
        </button>
        <button @click="logout()" class="btn-primary ml-2">Logout</button>

        <!-- Error message -->
        <p x-show="error" x-text="error" class="text-red-500 mt-2"></p>

        <!-- User Details Modal -->
        <div
          x-show="selectedUser"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div class="bg-white p-6 rounded-lg w-96 max-w-full">
            <h3
              class="text-xl font-bold mb-4"
              x-text="`User: ${selectedUser?.email}`"
            ></h3>
            <div class="mb-4">
              <p>
                <strong>ID:</strong> <span x-text="selectedUser?.id"></span>
              </p>
              <p>
                <strong>Role:</strong> <span x-text="selectedUser?.role"></span>
              </p>
              <p>
                <strong>Status:</strong>
                <span
                  x-text="selectedUser?.is_active ? 'Active' : 'Disabled'"
                ></span>
              </p>
              <p>
                <strong>Created:</strong>
                <span
                  x-text="new Date(selectedUser?.createdAt).toLocaleString()"
                ></span>
              </p>
            </div>

            <div class="mb-4" x-show="selectedUser?.profile">
              <h4 class="font-bold">Profile</h4>
              <p>
                <strong>Name:</strong>
                <span
                  x-text="selectedUser?.profile?.displayName || 'Not set'"
                ></span>
              </p>
              <p>
                <strong>Bio:</strong>
                <span x-text="selectedUser?.profile?.bio || 'Not set'"></span>
              </p>
            </div>

            <div class="mb-4" x-show="selectedUser?.settings">
              <h4 class="font-bold">Settings</h4>
              <p>
                <strong>Theme:</strong>
                <span x-text="selectedUser?.settings?.theme"></span>
              </p>
              <p>
                <strong>Notifications:</strong>
                <span
                  x-text="selectedUser?.settings?.notifications ? 'Enabled' : 'Disabled'"
                ></span>
              </p>
            </div>

            <div class="flex justify-end">
              <button
                @click="closeUserDetails()"
                class="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
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

- **Code Example** (`frontend/js/app.js`):

```javascript
/**
 * Main application component.
 * @returns {Object} Alpine.js component.
 */
function app() {
  return {
    user: null,
    showProfile: false,
    users: [],
    logs: [],
    search: '',
    activeFilter: '',
    selectedUser: null,
    error: null,
    loading: false,

    /**
     * Initializes application.
     * @async
     */
    async init() {
      // Check for token
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get('/api/me', {
            headers: { Authorization: `Bearer ${token}` },
          });

          this.user = res.data.user;

          // If admin, load users and logs
          if (this.user.role === 'admin') {
            await this.fetchUsers();
            await this.fetchLogs();
          }
        } catch (err) {
          console.error('Failed to verify token:', err);
          localStorage.removeItem('token');
        }
      }
    },

    /**
     * Fetches users for admin dashboard.
     * @async
     */
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      try {
        const token = localStorage.getItem('token');
        let url = '/api/users';

        // Add filters if present
        if (this.search || this.activeFilter) {
          const params = new URLSearchParams();
          if (this.search) params.append('search', this.search);
          if (this.activeFilter) params.append('active', this.activeFilter);
          url += `?${params.toString()}`;
        }

        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.users = res.data.users;
      } catch (err) {
        console.error('Failed to fetch users:', err);
        this.error = err.response?.data?.error || 'Failed to fetch users';
      } finally {
        this.loading = false;
      }
    },

    /**
     * Fetches activity logs for admin dashboard.
     * @async
     */
    async fetchLogs() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/logs', {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.logs = res.data.logs;
      } catch (err) {
        console.error('Failed to fetch logs:', err);
      }
    },

    /**
     * Views user details.
     * @param {number} userId - User ID.
     * @async
     */
    async viewUser(userId) {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.selectedUser = res.data.user;
      } catch (err) {
        console.error('Failed to fetch user details:', err);
        this.error =
          err.response?.data?.error || 'Failed to fetch user details';
      }
    },

    /**
     * Closes user details modal.
     */
    closeUserDetails() {
      this.selectedUser = null;
    },

    /**
     * Toggles user active status and refreshes users.
     * @param {number} userId - User ID.
     * @param {boolean} isActive - New active status.
     * @async
     */
    async toggleUserActive(userId, isActive) {
      try {
        const token = localStorage.getItem('token');
        await axios.patch(
          `/api/users/${userId}/active`,
          { isActive },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Refresh users list and logs
        await this.fetchUsers();
        await this.fetchLogs();
      } catch (err) {
        console.error('Failed to toggle user active:', err);
        this.error = err.response?.data?.error || 'Failed to update user';
      }
    },

    /**
     * Deletes a user after confirmation.
     * @param {number} userId - User ID.
     * @async
     */
    async deleteUser(userId) {
      if (
        !confirm(
          'Are you sure you want to delete this user? This action cannot be undone.'
        )
      ) {
        return;
      }

      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Refresh users list and logs
        await this.fetchUsers();
        await this.fetchLogs();
      } catch (err) {
        console.error('Failed to delete user:', err);
        this.error = err.response?.data?.error || 'Failed to delete user';
      }
    },

    /**
     * Logs out the user.
     * @async
     */
    async logout() {
      try {
        await axios.post('/api/logout');
      } catch (err) {
        console.error('Logout error:', err);
      } finally {
        localStorage.removeItem('token');
        this.user = null;
        this.users = [];
        this.logs = [];
        window.location.href = '/';
      }
    },
  };
}

// Initialize Alpine.js
window.Alpine = Alpine;
Alpine.data('app', app);
Alpine.start();
```

### Step 14: Implement API Integration Tests

- **Why**: Ensure all components work together correctly.
- **How**: Create comprehensive tests in `api.test.mjs`.
- **Code Example** (`tests/api.test.mjs`):

```javascript
/**
 * Integration tests for AuthMini APIs.
 * @module tests/api
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import supertest from 'supertest';
import Fastify from 'fastify';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { registerRoutes } from '../backend/routes/auth.mjs';
import { registerUserRoutes } from '../backend/routes/users.mjs';
import { initDb, getDb } from '../backend/data/db.mjs';

// Load environment variables
config();

// Test variables
let adminToken;
let userToken;
let testUserId;
const adminEmail = 'admin@example.com';
const testEmail = 'integration-test@example.com';
const testPassword = 'test123';

// Setup Fastify for testing
const fastify = Fastify({
  logger: false, // Disable logger for cleaner output
});

beforeAll(async () => {
  console.log('Starting beforeAll hook...');

  // Initialize database
  console.log('Initializing database...');
  const db = initDb();
  console.log('Database initialized');

  // Create admin user directly with Prisma instead of using seed
  console.log('Creating admin user...');
  try {
    // Check if admin user exists
    const existingAdmin = await db.user.findUnique({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      // Create admin user if doesn't exist
      await db.user.create({
        data: {
          email: adminEmail,
          passwordHash: await bcrypt.hash('admin123', 10),
          role: 'admin',
          is_active: true,
        },
      });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }

    // Generate token directly instead of using login API
    adminToken = jwt.sign(
      { id: 1, email: adminEmail, role: 'admin' },
      process.env.JWT_SECRET || 'fallback_secret_for_testing',
      { expiresIn: '1h' }
    );
    console.log('Admin token generated manually');

    // Register routes to the Fastify instance
    console.log('Registering routes...');
    await fastify.register(registerRoutes, { prefix: '/api' });
    await fastify.register(registerUserRoutes, { prefix: '/api' });
    await fastify.ready();
    console.log('Routes registered and server ready');
  } catch (err) {
    console.error('Error in beforeAll:', err);
    throw err; // Make the test fail with the actual error
  }

  console.log('beforeAll hook completed');
}, 120000); // 2 minutes timeout

afterAll(async () => {
  console.log('Starting afterAll hook...');

  // Clean up test user if created
  if (testUserId) {
    console.log(`Cleaning up test user ID ${testUserId}...`);
    try {
      const db = getDb();
      await db.profile.deleteMany({ where: { userId: testUserId } });
      await db.settings.deleteMany({ where: { userId: testUserId } });
      await db.activityLog.deleteMany({ where: { userId: testUserId } });
      await db.user.delete({ where: { id: testUserId } }).catch(() => {});
      console.log('Test user cleaned up');
    } catch (err) {
      console.error('Error cleaning up test user:', err);
    }
  }

  // Close Fastify and disconnect from DB
  try {
    await fastify.close();
    console.log('Fastify server closed');

    const db = getDb();
    await db.$disconnect();
    console.log('Database disconnected');
  } catch (err) {
    console.error('Error in afterAll:', err);
  }

  console.log('afterAll hook completed');
}, 120000); // 2 minutes timeout

describe('Authentication Flow', () => {
  it('should register a new user', async () => {
    console.log('Starting register test...');
    const response = await supertest(fastify.server)
      .post('/api/register')
      .send({ email: testEmail, password: testPassword });

    console.log('Register response status:', response.status);
    console.log('Register response body:', response.body);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ message: 'User registered' });

    // Get user ID for cleanup
    console.log('Fetching created user for cleanup...');
    try {
      const db = getDb();
      const user = await db.user.findUnique({ where: { email: testEmail } });
      testUserId = user?.id;
      console.log('Test user ID:', testUserId);
    } catch (err) {
      console.error('Error fetching user ID:', err);
    }
  }, 30000);

  it('should not register a duplicate email', async () => {
    console.log('Starting duplicate email test...');
    const response = await supertest(fastify.server)
      .post('/api/register')
      .send({ email: testEmail, password: testPassword });

    console.log('Duplicate email response status:', response.status);
    console.log('Duplicate email response body:', response.body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain('Email already exists');
  }, 30000);

  it('should login a user', async () => {
    console.log('Starting login test...');
    const response = await supertest(fastify.server)
      .post('/api/login')
      .send({ email: testEmail, password: testPassword });

    console.log('Login response status:', response.status);
    console.log('Login response body:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe(testEmail);

    // Save token for later tests
    userToken = response.body.token;
    console.log('User token obtained:', !!userToken);
  }, 30000);

  it('should reject invalid credentials', async () => {
    console.log('Starting invalid credentials test...');
    const response = await supertest(fastify.server)
      .post('/api/login')
      .send({ email: testEmail, password: 'wrongpassword' });

    console.log('Invalid credentials response status:', response.status);
    console.log('Invalid credentials response body:', response.body);

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toContain('Invalid credentials');
  }, 30000);

  it('should get current user profile', async () => {
    console.log('Starting get profile test...');
    const response = await supertest(fastify.server)
      .get('/api/me')
      .set('Authorization', `Bearer ${userToken}`);

    console.log('Get profile response status:', response.status);
    console.log('Get profile response body:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.user.email).toBe(testEmail);
    expect(response.body.user.passwordHash).toBeUndefined();
  }, 30000);
});

describe('User Management Flow', () => {
  it('should update profile', async () => {
    console.log('Starting update profile test...');
    const profileData = {
      displayName: 'Test User',
      bio: 'Integration test profile',
      avatarUrl: 'https://example.com/avatar.png',
    };

    const response = await supertest(fastify.server)
      .post('/api/profile')
      .set('Authorization', `Bearer ${userToken}`)
      .send(profileData);

    console.log('Update profile response status:', response.status);
    console.log('Update profile response body:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Profile updated');

    // Verify profile was updated
    console.log('Verifying profile update...');
    const meResponse = await supertest(fastify.server)
      .get('/api/me')
      .set('Authorization', `Bearer ${userToken}`);

    console.log('Get updated profile response status:', meResponse.status);
    console.log(
      'Get updated profile response body profile:',
      meResponse.body.user.profile
    );

    expect(meResponse.body.user.profile.displayName).toBe(
      profileData.displayName
    );
    expect(meResponse.body.user.profile.bio).toBe(profileData.bio);
  }, 30000);

  it('should update settings', async () => {
    console.log('Starting update settings test...');
    const settingsData = {
      theme: 'dark',
      notifications: false,
    };

    const response = await supertest(fastify.server)
      .post('/api/settings')
      .set('Authorization', `Bearer ${userToken}`)
      .send(settingsData);

    console.log('Update settings response status:', response.status);
    console.log('Update settings response body:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Settings updated');
  }, 30000);

  it('should change password', async () => {
    console.log('Starting change password test...');
    const newPassword = 'newpassword123';

    const response = await supertest(fastify.server)
      .post('/api/password')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ newPassword });

    console.log('Change password response status:', response.status);
    console.log('Change password response body:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Password updated');

    // Verify by logging in with new password
    console.log('Verifying password change by logging in...');
    const loginResponse = await supertest(fastify.server)
      .post('/api/login')
      .send({ email: testEmail, password: newPassword });

    console.log('New password login response status:', loginResponse.status);
    console.log(
      'New password login response body token exists:',
      !!loginResponse.body.token
    );

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.token).toBeDefined();
  }, 30000);
});

describe('Admin Operations', () => {
  it('should get all users (admin only)', async () => {
    console.log('Starting get all users test...');
    const response = await supertest(fastify.server)
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`);

    console.log('Get all users response status:', response.status);
    console.log(
      'Get all users response body users count:',
      response.body.users?.length
    );

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.users)).toBe(true);
    expect(response.body.users.length).toBeGreaterThan(0);

    // Should include our test user
    const testUser = response.body.users.find((u) => u.email === testEmail);
    console.log('Test user found in users list:', !!testUser);

    expect(testUser).toBeDefined();
  }, 30000);

  it('should filter users by search', async () => {
    console.log('Starting filter users test...');
    const response = await supertest(fastify.server)
      .get(`/api/users?search=${testEmail}`)
      .set('Authorization', `Bearer ${adminToken}`);

    console.log('Filter users response status:', response.status);
    console.log(
      'Filter users response body users count:',
      response.body.users?.length
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.users.length).toBe(1);
    expect(response.body.users[0].email).toBe(testEmail);
  }, 30000);

  it('should get user by ID (admin only)', async () => {
    console.log('Starting get user by ID test...');
    if (!testUserId) {
      console.warn('testUserId is not defined, skipping test');
      return;
    }

    const response = await supertest(fastify.server)
      .get(`/api/users/${testUserId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    console.log('Get user by ID response status:', response.status);
    console.log('Get user by ID response body user:', response.body.user);

    expect(response.statusCode).toBe(200);
    expect(response.body.user.id).toBe(testUserId);
    expect(response.body.user.email).toBe(testEmail);
  }, 30000);

  it('should toggle user active status (admin only)', async () => {
    console.log('Starting toggle user active test...');
    if (!testUserId) {
      console.warn('testUserId is not defined, skipping test');
      return;
    }

    const response = await supertest(fastify.server)
      .patch(`/api/users/${testUserId}/active`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ isActive: false });

    console.log('Toggle user active response status:', response.status);
    console.log('Toggle user active response body:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('User disabled');
    expect(response.body.user.is_active).toBe(false);

    // Verify user can't login when disabled
    console.log('Verifying user cannot login when disabled...');
    const loginResponse = await supertest(fastify.server)
      .post('/api/login')
      .send({ email: testEmail, password: 'newpassword123' });

    console.log('Disabled user login response status:', loginResponse.status);
    console.log('Disabled user login response body:', loginResponse.body);

    expect(loginResponse.statusCode).toBe(401);

    // Re-enable user
    console.log('Re-enabling user...');
    await supertest(fastify.server)
      .patch(`/api/users/${testUserId}/active`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ isActive: true });
  }, 30000);

  it('should get activity logs (admin only)', async () => {
    console.log('Starting get activity logs test...');
    const response = await supertest(fastify.server)
      .get('/api/logs')
      .set('Authorization', `Bearer ${adminToken}`);

    console.log('Get activity logs response status:', response.status);
    console.log(
      'Get activity logs response body logs count:',
      response.body.logs?.length
    );

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.logs)).toBe(true);

    // Should include logs for our test user
    if (testUserId) {
      const userLogs = response.body.logs.filter(
        (log) => log.userId === testUserId
      );
      console.log('Test user logs found:', userLogs.length);

      expect(userLogs.length).toBeGreaterThan(0);
    }
  }, 30000);

  it('should delete a user (admin only)', async () => {
    console.log('Starting delete user test...');
    if (!testUserId) {
      console.warn('testUserId is not defined, skipping test');
      return;
    }

    const response = await supertest(fastify.server)
      .delete(`/api/users/${testUserId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    console.log('Delete user response status:', response.status);
    console.log('Delete user response body:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain('deleted successfully');

    // Verify user is gone
    console.log('Verifying user is deleted...');
    const userResponse = await supertest(fastify.server)
      .get(`/api/users/${testUserId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    console.log('Get deleted user response status:', userResponse.status);
    console.log('Get deleted user response body:', userResponse.body);

    expect(userResponse.statusCode).toBe(404);

    // Clear testUserId since we've deleted it
    console.log('Clearing testUserId variable');
    testUserId = null;
  }, 30000);
});
```

- **Running Tests**:

  - **Command**: `npm run test:api`
  - **Expected Output**:

    ```
    ✓ tests/api.test.mjs (14 tests) 1068ms

    Test Files  1 passed (1)
    Tests       14 passed (14)
    Start at    10:55:20
    Duration    3.57s
    ```

  - **Possible Errors**:
    - `Error: connect ECONNREFUSED`: PostgreSQL is not running.
    - `Error: expected 200 "OK", got 401 "Unauthorized"`: Invalid token or authentication issue.
    - `Error: expected 200 "OK", got 404 "Not Found"`: Route not found, check path.

### Step 15: Update CI/CD Pipeline with GitHub Actions

- **Why**: Automate testing, migrations, seeding, and deployment.
- **How**: Update `ci.yml`.
- **Code Example** (`.github/workflows/ci.yml`):

  ```yaml
  name: CI/CD for AuthMini V3

  on:
    push:
      branches:
        - main

  jobs:
    test:
      runs-on: ubuntu-latest
      services:
        postgres:
          image: postgres:13
          env:
            POSTGRES_USER: postgres
            POSTGRES_PASSWORD: postgres
            POSTGRES_DB: test_db
          ports:
            - 5432:5432
          options: >-
            --health-cmd pg_isready
            --health-interval 10s
            --health-timeout 5s
            --health-retries 5

      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: '20.15.1'

        - name: Install dependencies
          run: npm install

        - name: Run linter
          run: npm run lint

        - name: Generate Prisma client
          run: npx prisma generate --schema=db/schema.prisma

        - name: Run migrations
          run: npx prisma migrate deploy --schema=db/schema.prisma
          env:
            DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db?schema=public

        - name: Run unit tests
          run: npm run test:unit
          env:
            DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db?schema=public
            JWT_SECRET: test_secret_key

        - name: Run route tests
          run: npm run test:routes
          env:
            DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db?schema=public
            JWT_SECRET: test_secret_key

        - name: Run API tests
          run: npm run test:api
          env:
            DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db?schema=public
            JWT_SECRET: test_secret_key

    deploy:
      needs: test
      runs-on: ubuntu-latest

      steps:
        - uses: actions/checkout@v4

        - name: Deploy to Render
          run: |
            curl -X POST \
              -H "Authorization: Bearer ${{ secrets.RENDER_API_KEY }}" \
              -H "Content-Type: application/json" \
              https://api.render.com/v1/services/${{ secrets.RENDER_SERVICE_ID }}/deploys
  ```

### Step 16: Deploy to Render

- **Why**: Deploy V3 with PostgreSQL for production.
- **How**: Set up Render services.
- **Steps**:
  1. Create Render PostgreSQL service:
     - Log in to Render.
     - Create a new PostgreSQL database.
     - Copy the connection string (`DATABASE_URL`).
  2. Deploy web service:
     - Create a new Web Service linked to your GitHub repository.
     - Configure:
       - **Build Command**: `npm install && npx prisma generate`.
       - **Start Command**: `npm run migrate && npm run seed && npm start`.
       - **Environment Variables**:
         - `PORT`: Leave blank (Render assigns a port).
         - `NODE_ENV`: `production`.
         - `JWT_SECRET`: Generate with `openssl rand -base64 32`.
         - `DATABASE_URL`: Paste connection string from PostgreSQL service.
     - Deploy.
  3. Add Render API key to GitHub secrets:
     - Generate a Render API key in Render dashboard.
     - Add to GitHub repository secrets as `RENDER_API_KEY`.
     - Add Render service ID as `RENDER_SERVICE_ID`.
- **Testing**:
  - **Steps**:
    1. Visit Render URL.
    2. Register a new user.
    3. Login as admin (`admin@example.com`/`admin123`).
    4. Verify admin dashboard and CRUD operations work.
  - **Expected Outcome**: App functions with persistent data.
  - **Issues**:
    - **503 Service Unavailable**: Check Render logs for build/deploy errors.
    - **400 Bad Request**: Check environment variables.
    - **Database errors**: Verify `DATABASE_URL` and migration status.

### Step 17: Conclusion and Next Steps

- **Summary**:
  AuthMini V3 extended V2 with PostgreSQL, Prisma ORM, migrations, seeding, and comprehensive CRUD operations, keeping business logic in services. The new implementation ensures data persistence and provides a robust foundation for user management.
- **Key Takeaways**:
  - **PostgreSQL**: Persistent, scalable database.
  - **Prisma**: Simplifies queries with type safety.
  - **Migrations/Seeding**: Ensure schema and data consistency.
  - **CRUD Operations**: Complete user management functionality.
  - **Service Layer**: Maintains organized logic.
  - **Testing Strategy**: Improved with dedicated test files using Vitest.
- **Resources**:
  - 🔗 [Prisma](https://www.prisma.io/docs/)
  - 🔗 [PostgreSQL](https://www.postgresql.org/docs/)
  - 🔗 [Render](https://render.com/docs)
  - 🔗 [Vitest](https://vitest.dev/guide/)

---

This comprehensive learning guide provides a step-by-step approach to extending AuthMini V2 to V3, focusing on PostgreSQL integration, Prisma ORM usage, migrations, seeding, and CRUD operations implementation, complete with dedicated test files for each component using Vitest instead of Jest for improved ESM compatibility.
