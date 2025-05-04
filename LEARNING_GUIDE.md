# Learning Guide for Building AuthMini V4 with TypeScript

**Version**: 4.0  
**Application**: AuthMini V4  
**Created by**: Krishna Teja GS  
**Date**: May 3, 2025

## Purpose

This guide transforms **AuthMini V3** into **AuthMini V4** by introducing **TypeScript** and **basic unit testing**, targeting developers new to TypeScript while maintaining a **beginner-friendly** approach. It simplifies V3's feature set (Fastify, Alpine.js, PostgreSQL, Prisma) to focus on TypeScript concepts, static type checking, and minimal unit testing with Vitest. AuthMini V4 includes core functionality: users can register, log in, view their name, and log out; admins can register, log in, view a list of users, and log out. The guide emphasizes **TypeScript integration**, **type safety**, and **basic testing**, preparing developers for scalable, type-safe applications.

AuthMini V4 replaces V3's JavaScript with **TypeScript**, organizes code into a clear and maintainable folder structure with separate frontend and backend concerns. All database-related components are placed within the backend folder to clarify ownership. Testing is organized by domain with separate test directories for backend and frontend components.

---

## Pre-requisites

Before starting, ensure you have:

- **Completed AuthMini V3**: Familiarity with V3's structure, Fastify, Alpine.js, PostgreSQL, Prisma, and Vitest.
- **Basic JavaScript Knowledge**: Promises, async/await, modules, V3's service layer.
- **Familiarity with Web Development**: APIs, frontend-backend interaction, HTTP.
- **Basic Database Knowledge**: SQL basics, V3's PostgreSQL setup.
- **Basic Testing Knowledge**: Understand unit testing and Vitest basics.
- **Tools Installed**:
  - **Node.js 20.15.1**. Check: `node --version`.
  - **npm 6+** (e.g., 10.8.2). Check: `npm --version`.
  - **PostgreSQL** (local). Install locally: [postgresql.org](https://www.postgresql.org/download/).
  - **Git** (`git --version`).
  - **Code editor** (e.g., VS Code) with TypeScript ("TypeScript and JavaScript Language Features") and Prisma ("Prisma" by Prisma) extensions.

**Refresher Resources**:

- 🔗 [MDN: JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- 🔗 [Fastify](https://www.fastify.io/docs/latest/)
- 🔗 [Alpine.js](https://alpinejs.dev/)
- 🔗 [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- 🔗 [Prisma](https://www.prisma.io/docs/)
- 🔗 [PostgreSQL](https://www.postgresqltutorial.com/)
- 🔗 [Vitest Documentation](https://vitest.dev/guide/)

---

## Introduction

### Why AuthMini V4?

AuthMini V4 enhances V3 by introducing **TypeScript** for static type checking and **basic unit testing** to ensure code reliability, simplifying features to focus on learning TypeScript. It addresses V3's JavaScript codebase by adding type safety and minimal testing while retaining production-ready database practices. Key enhancements include:

- **TypeScript**: Adds type safety, reducing runtime errors.
- **Basic Unit Testing**: Tests core services with Vitest.
- **PostgreSQL with Prisma**: Retains persistent database and type-safe queries.
- **Simplified Features**: Focuses on minimal user/admin functionality.
- **Organized Structure**: Clear separation between frontend and backend concerns.
- **Backend Database Ownership**: All database-related code resides in the backend.
- **Domain-Specific Testing**: Separate test directories for backend and frontend.

**Learning Focus**:

- Integrating **TypeScript** into a full-stack application.
- Defining **interfaces** and **types** for robust APIs and services.
- Leveraging **type inference** and **static type checking**.
- Writing **basic unit tests** for backend services.
- Organizing code for maintainability and clear domain ownership.
- Using **Prisma ORM** with TypeScript for type-safe database access.

### Why Extend V3?

Extending V3:

- **Reinforces Learning**: Builds on Fastify, Alpine.js, PostgreSQL, and Prisma.
- **Simplifies Scope**: Reduces features to focus on TypeScript and testing.
- **Realistic Workflow**: Mimics adding type safety to an existing project.
- **Production-Ready**: Retains PostgreSQL and Prisma for scalability.
- **Best Practices**: Demonstrates proper code organization and folder structure.

### Why TypeScript?

- **What**: A superset of JavaScript that adds static types, compiled to JavaScript.
- **Why**: Catches errors during development (e.g., incorrect parameter types), improves IDE support (auto-completion), and enhances maintainability.
- **Beginner Benefit**: Reduces runtime errors, provides clear code contracts.
- **V4 Use**: Replaces V3's JavaScript with TypeScript for type-safe APIs, services, and frontend logic.

### Why Basic Testing?

- **What**: Unit tests verify individual components (e.g., user registration) in isolation.
- **Why**: Ensures code works as expected and builds confidence in refactoring.
- **Beginner Benefit**: Introduces testing without complex integration tests.
- **V4 Use**: Tests core backend services with Vitest, covering happy paths and common errors.

### Why Place Database in Backend?

- **Domain Ownership**: Database components are strictly a backend concern.
- **Clear Boundaries**: The frontend should only communicate with the backend via APIs, not directly with the database.
- **Simplified Imports**: All database-related code is accessible from backend services without complex imports.
- **Maintainability**: Makes future changes to database schema easier to manage.
- **Package Coherence**: Keeps related components together for better organization.

### Who Is This Guide For?

Developers who:

- Completed AuthMini V3 and understand its structure.
- Want to learn **TypeScript** concepts (interfaces, types, type inference).
- Seek an introduction to **basic unit testing** with Vitest.
- Need a **simple, type-safe** application with production-ready database practices.
- Are interested in learning proper code organization and architecture.

---

## Learning Objectives

By the end of this guide, you will:

1. Extend AuthMini V3 to V4, integrating TypeScript and basic testing.
2. Replace JavaScript with **TypeScript** for type-safe code.
3. Organize code with a clear and maintainable folder structure.
4. Define **interfaces** and **types** for APIs and services.
5. Leverage **type inference** and **static type checking** to catch errors early.
6. Write **basic unit tests** for backend and frontend components.
7. Use **Prisma ORM** with PostgreSQL for type-safe queries.
8. Implement **migrations** and **seeding** for database consistency.

---

## TypeScript Concepts

### Introduction to TypeScript

TypeScript is a strongly typed superset of JavaScript that compiles to plain JavaScript. It brings optional static typing, interfaces, and advanced tooling to JavaScript development, making code more robust and maintainable. As projects grow in complexity, adopting TypeScript helps teams catch errors early, improve developer productivity, and ensure better long-term scalability. It is widely used in modern web development, especially in large codebases, fullstack applications, and collaborative environments where clear contracts between components are essential.

### 1. Basic Types

**What are Basic Types?**  
Basic types in TypeScript correspond to the primitive types in JavaScript, but with explicit type annotations. These include `string`, `number`, `boolean`, `null`, `undefined`, and others. By adding these type annotations, you tell TypeScript what kind of data a variable should hold.

**When to use them:**  
Use basic types to declare variables, function parameters, and return values when you want to ensure they contain a specific type of data. This prevents accidental type conversions and helps catch errors like trying to perform string operations on numbers.

#### JavaScript (Without Types):

```javascript
// JavaScript - no type information
let username = 'admin';
let isActive = true;
let userId = 42;
let userProfile = { name: 'Admin' };
let items = [1, 'two', true];

// No type checking - can lead to runtime errors
userId = 'ABC123'; // JS won't complain, but this might break logic elsewhere
```

#### TypeScript (With Types):

```typescript
// TypeScript - with type annotations
let username: string = 'admin';
let isActive: boolean = true;
let userId: number = 42;
let userProfile: object = { name: 'Admin' };
let items: any[] = [1, 'two', true]; // Array of mixed types

// TypeScript catches errors at compile time
userId = 'ABC123'; // Error: Type 'string' is not assignable to type 'number'
```

**Why we do this in AuthMini V4**: In our project, we use explicit type annotations for all significant variables to make our intentions clear. For example, in the user service, we explicitly type all function parameters even when TypeScript could infer them, because it serves as documentation for other developers. This is especially important in a learning project where readability trumps brevity.

### 2. Interfaces and Type Aliases

**What are Interfaces and Type Aliases?**  
Interfaces define the structure that objects should conform to, specifying which properties and methods an object must have. Type aliases create new names for types, making complex types more readable and reusable.

**When to use them:**  
Use interfaces when you need to define the shape of objects, especially when those objects represent entities in your domain (like users, products, etc.). Use type aliases when you need to create a custom type or a union of multiple types. Interfaces are often preferred for object shapes because they can be extended and implemented.

#### JavaScript (Without Types):

```javascript
// JavaScript - object shape is implied but not enforced
function createUser(userData) {
  // No guarantee userData has the right properties
  return {
    id: userData.id,
    email: userData.email,
    name: userData.name,
    role: userData.role,
  };
}

// These will cause runtime errors if properties are missing
const user1 = createUser({}); // Accessing undefined properties
const user2 = createUser({ email: 'test@example.com' }); // Missing properties
```

#### TypeScript (With Types):

```typescript
// TypeScript - explicit interface defines required structure
interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

// Type alias for specific values
type UserRole = 'user' | 'admin';

// Combining both
interface UserWithTypedRole {
  id: number;
  email: string;
  name: string;
  role: UserRole; // Only 'user' or 'admin' allowed
}

function createUser(userData: User): User {
  return userData; // TypeScript ensures userData has all required properties
}

// TypeScript catches errors at compile time
const user1 = createUser({}); // Error: Missing required properties
const user2 = createUser({
  email: 'test@example.com',
  id: 1,
  name: 'Test',
  role: 'superuser', // Error: Type '"superuser"' is not assignable to type 'UserRole'
});
```

**Why we do this in AuthMini V4**: We centralize our interfaces in `model-types.ts` rather than defining them alongside their implementation. This deliberate choice supports a "schema-first" approach where the data contract is well-defined before implementation begins. By having a single source of truth for types, we ensure consistency across the application. For example, both the frontend and backend reference the same user structure, making it immediately obvious when they get out of sync.

We specifically use literal union types (like `'user' | 'admin'`) for roles instead of just `string` to create a closed set of values, making it impossible to assign an invalid role anywhere in the application.

### 3. Function Types

**What are Function Types?**  
Function types in TypeScript define the signature of a function, including parameter types and return type. They allow you to specify exactly what kinds of values a function accepts and what it returns.

**When to use them:**  
Use function types whenever you declare a function to clearly communicate its inputs and outputs. This is especially important for public APIs where other developers need to understand how to use your functions without looking at the implementation details.

#### JavaScript (Without Types):

```javascript
// JavaScript - no parameter or return type enforcement
function calculateTax(amount, rate) {
  return amount * rate;
}

// These issues won't be caught until runtime
calculateTax('1000', 0.1); // Tries to multiply a string
calculateTax(); // Missing parameters
const tax = calculateTax(1000, 0.1) + 'USD'; // No warning about mixing types
```

#### TypeScript (With Types):

```typescript
// TypeScript - explicit parameter and return types
function calculateTax(amount: number, rate: number): number {
  return amount * rate;
}

// Typed arrow function
const formatName = (first: string, last: string): string => `${first} ${last}`;

// Async function with Promise return type
async function fetchUser(id: number): Promise<User> {
  // Implementation
  return { id, name: 'Test', email: 'test@example.com', role: 'user' };
}

// TypeScript catches errors at compile time
calculateTax('1000', 0.1); // Error: Argument of type 'string' not assignable to 'number'
calculateTax(); // Error: Expected 2 arguments, but got 0
```

**Why we do this in AuthMini V4**: We consistently specify return types for all functions, even when TypeScript could infer them. This might seem redundant, but it creates a clear contract for each function. In `user-service.ts`, the explicit `Promise<LoginResponse>` return type on the `loginUser` function tells other developers exactly what to expect without having to analyze the implementation.

For asynchronous code, we always use `Promise<T>` return types to make it immediately clear when a function returns a Promise. This is especially important in an authentication system where improper handling of Promises could lead to security vulnerabilities.

### 4. Type Assertions and Type Guards

**What are Type Assertions?**  
Type assertions are a way to tell TypeScript that you know more about the type of a value than TypeScript can determine on its own. They don't change the runtime behavior or perform any type checking - they're purely a compile-time construct.

**When to use Type Assertions:**  
Use type assertions sparingly, only when you have more information than TypeScript can reasonably infer, such as when working with DOM elements or when you're certain about the type of a value from an external API. Every type assertion is a potential type safety risk because you're bypassing TypeScript's checks.

**What are Type Guards?**  
Type guards are expressions that perform a runtime check to guarantee the type of a value in a certain scope. After using a type guard, TypeScript narrows the type of the variable within the conditional block where the guard is used.

**When to use Type Guards:**  
Use type guards when you need to handle different types in different ways, or when you need to ensure a value is of a specific type before using it. Type guards are safer than type assertions because they check the type at runtime.

#### JavaScript (Without Types):

```javascript
// JavaScript - type checking through conditional logic
function processUserData(userData) {
  // Runtime checks to ensure userData has expected structure
  if (typeof userData !== 'object' || userData === null) {
    throw new Error('Invalid user data');
  }

  // No guarantee userData.role exists or is a string
  if (userData.role === 'admin') {
    // Admin-specific logic
    console.log('Processing admin:', userData.name);
  } else {
    // Regular user logic
    console.log('Processing user:', userData.name);
  }
}

// DOM manipulation without type information
const userInput = document.getElementById('user-input');
// No guarantee userInput is an input element with .value property
console.log(userInput.value); // Might throw error if element is not an input
```

#### TypeScript (With Types):

```typescript
// Type guard function
function isAdmin(user: User): user is User & { permissions: string[] } {
  return user.role === 'admin' && 'permissions' in user;
}

// Processing with type safety
function processUserData(userData: User): void {
  // Type is narrowed based on condition
  if (userData.role === 'admin') {
    console.log('Processing admin:', userData.name);
  } else {
    console.log('Processing user:', userData.name);
  }

  // Using custom type guard
  if (isAdmin(userData)) {
    // TypeScript knows userData has permissions property here
    console.log('Admin permissions:', userData.permissions);
  }
}

// Type assertion for DOM elements
const userInput = document.getElementById('user-input') as HTMLInputElement;
// TypeScript knows userInput has .value property
console.log(userInput.value);
```

**Why we do this in AuthMini V4**: We use type guards in specific cases where TypeScript needs help understanding the type relationships. In our authentication middleware, we perform runtime checks to verify token validity, and type guards help TypeScript understand the relationship between these runtime checks and the type safety of the code.

We're cautious with type assertions (`as` keyword) because they bypass TypeScript's type checking. We only use them when necessary, such as when working with DOM elements or when we have more information than TypeScript can reasonably infer. In our API client, we use type assertions when we're confident about the structure of error responses from the server.

### 5. Generics

**What are Generics?**  
Generics allow you to create reusable components that work with a variety of types rather than a single one. They let you create a "template" where the type can be provided when the component is used, maintaining type safety throughout.

**When to use Generics:**  
Use generics when you need to create components (functions, classes, interfaces) that work with different types while still maintaining type safety. Common scenarios include collections (arrays, maps), utility functions that work on different types, and responses from APIs that return different data structures.

#### JavaScript (Without Types):

```javascript
// JavaScript - no way to create type-safe, reusable components
function wrapInArray(item) {
  return [item]; // Returns array of any type
}

// No type safety for different data structures
function getApiResponse(url) {
  return fetch(url).then((res) => res.json());
  // Return type is unknown - consumer must guess
}

// Consumers must manually check types
const numbers = wrapInArray(42);
const user = getApiResponse('/api/user/1');
// No guarantee about the shape of 'user'
```

#### TypeScript (With Types):

```typescript
// Generic function - preserves type information
function wrapInArray<T>(item: T): T[] {
  return [item];
}

// Generic interface for API responses
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Type-safe API function
async function getApiResponse<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  return (await response.json()) as ApiResponse<T>;
}

// Using generics with clear types
const numbers = wrapInArray<number>(42);
// TypeScript knows this is number[]

const user = await getApiResponse<User>('/api/user/1');
// TypeScript knows user.data is of type User
console.log(user.data.name);
```

**Why we do this in AuthMini V4**: We use generics primarily when working with the Prisma client, which is itself built with generics. Prisma's API provides excellent type safety because it knows the structure of our database schema. In our service layer, we leverage these generics to maintain type safety throughout the application.

For example, in our `getUserById` function, we benefit from Prisma's generics to get type-safe query results without manual casting. This pattern continues throughout our data access layer, ensuring that database operations are type-safe from the schema definition all the way to the API response.

### 6. Type Modifiers and Utility Types

**What are Type Modifiers and Utility Types?**  
Type modifiers and utility types allow you to transform existing types to create new ones. TypeScript provides built-in utility types like `Partial<T>`, `Readonly<T>`, `Pick<T, K>`, and `Omit<T, K>` that make it easy to create derived types without manually copying and modifying type definitions.

**When to use Type Modifiers and Utility Types:**  
Use utility types when you need a variation of an existing type. For example, use `Partial<T>` when you need all properties to be optional (like in form data), use `Omit<T, K>` to create a type without certain properties (like removing sensitive data), or use `Readonly<T>` to create a type where properties can't be modified (for immutable data).

#### JavaScript (Without Types):

```javascript
// JavaScript - no built-in way to transform object types
function createPartialUser(userData) {
  // No guarantee which fields are required
  return { ...userData };
}

function getPublicUserInfo(user) {
  // Manual field selection with potential for errors
  const { passwordHash, ...publicInfo } = user;
  return publicInfo; // No guarantee all sensitive fields are removed
}

// No compile-time protection against modification
function processReadOnlyData(data) {
  data.id = 123; // Modifying what should be read-only
}
```

#### TypeScript (With Types):

```typescript
// Making all properties optional
type PartialUser = Partial<User>;
// Equivalent to: { id?: number; email?: string; name?: string; role?: string; }

// Picking specific properties
type UserCredentials = Pick<User, 'email' | 'password'>;
// Equivalent to: { email: string; password: string; }

// Omitting sensitive properties
type PublicUser = Omit<User, 'passwordHash'>;
// User type without the passwordHash field

// Making properties read-only
type ReadOnlyUser = Readonly<User>;
// All properties are readonly - cannot be modified

// Using utility types
function createPartialUser(userData: PartialUser): User {
  // Default values for missing properties
  return {
    id: 0,
    email: '',
    name: '',
    role: 'user',
    ...userData,
  };
}

function getPublicUserInfo(user: User): PublicUser {
  // TypeScript ensures passwordHash is removed
  const { passwordHash, ...publicInfo } = user;
  return publicInfo;
}

function processReadOnlyData(data: ReadOnlyUser): void {
  data.id = 123; // Error: Cannot assign to 'id' because it is a read-only property
}
```

**Why we do this in AuthMini V4**: We make extensive use of utility types to create derived types without duplication. The most important example is `Omit<User, 'passwordHash'>`, which we use whenever we return user data to ensure password hashes never leave the backend. This is crucial for security and is enforced by TypeScript at compile time, making it nearly impossible to accidentally expose sensitive data.

We also use `Partial<T>` when dealing with updates where only some fields might be provided. This pattern helps us handle incomplete data safely while maintaining type checking for the fields that are provided.

## Essential TypeScript Files and Their Purpose

### 1. tsconfig.json

**What is tsconfig.json?**  
The `tsconfig.json` file is the configuration file for the TypeScript compiler. It specifies how TypeScript should compile your code, including which files to include, which version of JavaScript to target, and various compiler options that affect type checking and output.

**When to use tsconfig.json:**  
You should have a `tsconfig.json` file in every TypeScript project. For larger projects, you might have multiple configuration files for different parts of your application (frontend, backend, etc.) with a base configuration that they extend.

#### JavaScript Projects (Without TypeScript):

```javascript
// JavaScript projects typically use babel configuration:
// babel.config.js
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};
```

#### TypeScript Configuration:

```json
{
  "compilerOptions": {
    "target": "ES2020", // JavaScript version to output
    "module": "ESNext", // Module system to use
    "strict": true, // Enable all strict type checking
    "outDir": "./dist", // Output directory for compiled files
    "sourceMap": true, // Generate source maps for debugging
    "esModuleInterop": true // Better module compatibility
  },
  "include": ["src/**/*"], // Files to include in compilation
  "exclude": ["node_modules"] // Files to exclude
}
```

**Why we do this in AuthMini V4**: We use multiple TSConfig files to maintain separation of concerns between different parts of the application:

1. **Root tsconfig.json**: Configures compilation of the server entry point. This is minimal because it only needs to handle one file.

2. **backend/backend.tsconfig.json**: Contains backend-specific settings with stricter type checking and a focus on Node.js compatibility.

3. **frontend/frontend.tsconfig.json**: Contains frontend-specific settings with allowances for mixing JavaScript and TypeScript (`"allowJs": true`).

This separation allows each part of the application to have its own compilation settings without affecting the others. For example, we might need different browser compatibility targets for the frontend than the backend.

### 2. Type Declaration Files (.d.ts)

**What are Type Declaration Files?**  
Type declaration files (`.d.ts`) provide type information for JavaScript code that doesn't have native TypeScript support. They contain only type definitions, not implementations, allowing TypeScript to understand the shape of external JavaScript libraries.

**When to use Type Declaration Files:**  
Use type declaration files when you need to use a JavaScript library in your TypeScript project that doesn't provide its own type definitions. You might need to create your own declaration files for internal JavaScript libraries, or install declaration packages (`@types/*`) for third-party libraries.

#### JavaScript (Without Types):

```javascript
// JavaScript relies on JSDoc comments for documentation
/**
 * Helper function that does something
 * @param {string} input - The input string
 * @returns {number} A numeric result
 */
function helper(input) {
  return input.length;
}

// Importing external libraries has no type checking
const someLib = require('some-library');
someLib.unknownFunction(); // No warning about invalid function
```

#### TypeScript Declaration Files:

```typescript
// example.d.ts - Type declarations for external library
declare module 'some-library' {
  export function helper(input: string): number;
  export const VERSION: string;
  // No implementation, just type information
}

// Using the library with type checking
import { helper, VERSION } from 'some-library';
helper(42); // Error: Argument of type 'number' is not assignable to parameter of type 'string'
console.log(VERSION.toLowerCase()); // Type checking for library exports
```

**Why we do this in AuthMini V4**: While we don't create custom declaration files in our project, we explicitly install declaration packages like `@types/node` and `@types/jsonwebtoken`. These provide TypeScript definitions for libraries that are written in JavaScript, allowing us to use them in a type-safe way.

We deliberately chose libraries that have good TypeScript support, either natively or through DefinitelyTyped packages. This ensures we get maximum type safety across our entire codebase, even when using third-party code.

## Design Decisions in AuthMini V4

### 1. Centralized Type Definitions

**Why we do this**: We place all shared types in `backend/src/types/model-types.ts` to create a single source of truth. This means that if we need to change the structure of a `User`, we only need to update it in one place. Without this centralization, type definitions could diverge between different parts of the application, causing subtle bugs.

This approach is especially important for types that represent database entities or API contracts. By keeping them in one place, we ensure everyone has the same understanding of the data structure.

### 2. Database in Backend

**Why we do this**: We deliberately place all database-related code (Prisma schema, migrations, and client) within the backend directory rather than at the project root. This architectural decision:

1. **Establishes clear ownership**: It makes explicit that the database is a backend concern, preventing frontend code from accidentally accessing it directly.

2. **Simplifies deployment**: When deploying the backend, all its dependencies stay together, making deployment more reliable.

3. **Supports potential future extraction**: If we later decide to split the backend into a separate repository, the database code is already correctly positioned.

4. **Provides context**: Keeping related code together helps developers understand the system more easily.

### 3. Typed API Layer

**Why we do this**: Our routes and controllers use explicit interface definitions for request and response types. This pays off in several ways:

1. **Automatic validation**: TypeScript catches mismatches between what the client expects and what the server provides.

2. **API documentation**: The types serve as living documentation of the API contract.

3. **Refactoring safety**: If we change a response type, TypeScript immediately shows us all the places that need to be updated.

4. **IDE support**: Developers get auto-completion when working with API requests and responses.

For example, we define `LoginBody` and `RegisterBody` interfaces to clearly document what our API endpoints expect, making it easier for frontend developers to correctly integrate with the backend.

### 4. Typed Tests

**Why we do this**: We apply TypeScript to our tests as well as production code. This gives us:

1. **Double verification**: Tests verify both runtime behavior and type correctness.

2. **Better test maintenance**: TypeScript catches when tests fall out of sync with implementation changes.

3. **Documentation**: The tests demonstrate expected types and help developers understand the system.

Our testing approach focuses on critical components like the user service, with type-safe mocks that ensure our tests remain valid even as the codebase evolves.

### 5. Separate tsconfig Files for Modular Compilation

**Why we do this**: We maintain a `tsconfig.json` in the root folder for compiling the server entry point (`server.ts`) and separate `tsconfig.json` files in the `frontend` (`frontend/frontend.tsconfig.json`) and `backend` (`backend/backend.tsconfig.json`) directories for their respective codebases. This modular approach allows tailored compiler options for each part of the application, supporting different requirements (e.g., `allowJs` for frontend to handle mixed JS/TS, stricter settings for backend). It enables independent compilation of frontend, backend, or server code, which is crucial for development workflows where only one part needs rebuilding (e.g., updating backend logic without touching frontend). It also prevents compilation errors from empty or irrelevant files in other directories, as each `tsconfig.json` specifies its own `include` paths.

**How to Build**:

- **Independently**:
  - **Backend**: `npm run build:backend` (runs `tsc -p backend/backend.tsconfig.json`), compiling `backend/src/` to `backend/dist/`.
  - **Frontend**: `npm run build:frontend` (runs `tsc -p frontend/frontend.tsconfig.json`), compiling `frontend/src/` to `frontend/dist/`.
  - **Server**: `npm run build:server` (runs `tsc -p tsconfig.json`), compiling `server.ts` to `server.js`.
- **Overall**: `npm run build` (runs all three commands sequentially: `build:backend`, `build:frontend`, `build:server`), ensuring the entire project is compiled.
- **Benefits**: Independent builds speed up development by avoiding unnecessary compilation, while the overall build ensures a complete production-ready output. File-specific builds (e.g., `npx tsc backend/src/config/env.ts --outDir backend/dist/config`) further mitigate issues with empty files, as used in later steps.

**Example Outcome**:

- Running `npm run build:backend` compiles only backend TypeScript files, producing `backend/dist/` with compiled JS files (e.g., `env.js` from `env.ts`).
- Running `npm run build` generates `backend/dist/`, `frontend/dist/`, and `server.js`, ready for deployment.

---

## TypeScript Checkpoints for Projects

When implementing TypeScript in any project, follow these essential checkpoints:

1. **Strict Mode**: Enable `strict: true` in tsconfig.json for maximum type safety. This prevents implicit `any` types and ensures null checks, giving you the full benefits of TypeScript.

2. **No Any**: Avoid the `any` type when possible. Each `any` is a hole in your type system where bugs can slip through. In AuthMini V4, we use specific types everywhere except a few places where we interact with external systems.

3. **Explicit Return Types**: Always specify function return types, especially for public API functions. This creates a clear contract and prevents accidental changes to the return type.

4. **Typed Libraries**: Use `@types/*` packages for third-party libraries. This extends TypeScript's benefits to your dependencies and catches integration issues early.

5. **Type Guards**: Use type guards when narrowing types in conditional logic. This helps TypeScript understand the relationship between runtime checks and type safety.

6. **Avoid Type Assertions**: Minimize use of the `as` keyword. Each type assertion is a place where you're telling TypeScript to trust you instead of verifying types itself.

7. **External Types**: Define interfaces for all external data (API responses, etc.). This ensures that assumptions about external systems are documented and checked.

8. **Utility Types**: Use TypeScript utility types like `Partial`, `Omit`, and `Pick` to avoid repetition and ensure consistency in derived types.

9. **Type Tests**: Create tests that verify type behavior, not just runtime behavior. This catches issues in your type definitions before they cause problems.

10. **Progressive Enhancement**: Add types gradually, focusing on core interfaces first. This allows you to get benefits quickly while spreading the work of full type coverage over time.

---

## Getting Started: Where to Begin?

AuthMini V4 simplifies V3's features, converts all code to TypeScript, and adds basic unit tests. Start by creating a new project structure from scratch, organizing files according to clear domain boundaries, then follow these steps.

### Step 1: Understand V4 Requirements

- **Why**: Clarifies TypeScript and testing goals.
- **How**: Review simplified navigation flow:
  ```
  [Unauthenticated]
    - Register -> Login -> User Dashboard (view name, logout)
    - Admin Login -> Admin Dashboard (view user list, logout)
  ```
- **Features**:
  - User: Register, login, view name, logout.
  - Admin: Register, login, view list of users, logout.
- **Technical Enhancements**:
  - Replace JavaScript with **TypeScript**.
  - Organize code into a maintainable folder structure.
  - Add **basic unit tests** for backend and frontend.
  - Retain PostgreSQL with Prisma for type-safe queries.
  - Place all database-related code within the backend.
  - Simplified migrations and seeding for minimal data.
- **Nuance**: Focus on TypeScript learning with minimal features.

### Step 2: Set Up Project Structure

- **Why**: Organizes files for TypeScript, Prisma, and testing, with clear domain boundaries.
- **How**: Create directories and empty files from scratch.
- **Project Structure**:
  ```
  authmini/
  ├── backend/
  │   ├── src/
  │   │   ├── config/
  │   │   │   └── env.ts                # Environment validation
  │   │   ├── data/
  │   │   │   └── prisma-manager.ts     # TypeScript: Prisma client
  │   │   ├── middleware/
  │   │   │   └── auth-middleware.ts    # Authentication middleware
  │   │   ├── routes/
  │   │   │   ├── auth-routes.ts        # TypeScript: Auth routes
  │   │   │   └── route-registry.ts     # Route registration
  │   │   ├── services/
  │   │   │   └── user-service.ts       # TypeScript: User logic
  │   │   └── types/
  │   │       └── model-types.ts        # TypeScript: Shared types/interfaces
  │   ├── db/
  │   │   ├── migrations/               # Prisma migrations
  │   │   │   └── (generated files)
  │   │   ├── schema.prisma             # Prisma schema
  │   │   └── seed-data.ts              # TypeScript: Seed script
  │   ├── tests/
  │   │   ├── unit/
  │   │   │   └── user-service.test.ts  # Backend unit tests
  │   │   └── integration/
  │   │       └── auth-routes.test.ts   # API integration tests
  │   ├── dist/                         # Compiled JavaScript
  │   └── backend.tsconfig.json         # TypeScript config for backend
  ├── frontend/
  │   ├── src/
  │   │   ├── css/
  │   │   │   └── styles.css            # CSS styles
  │   │   ├── js/
  │   │   │   ├── app.ts                # TypeScript: Frontend logic
  │   │   │   ├── api-client.ts         # API client
  │   │   │   └── client-types.ts       # Frontend type definitions
  │   │   └── index.html                # Simplified UI
  │   ├── tests/
  │   │   └── unit/
  │   │       └── app-ui.test.ts        # Frontend unit tests
  │   ├── dist/                         # Compiled JavaScript
  │   └── frontend.tsconfig.json        # TypeScript config for frontend
  │-- ARCHITECTURE.md               # Architecture documentation
  │-- LEARNING_GUIDE.md             # Step-by-step learning guide
  │── DEVELOPER_REFERENCE.md        # Quick reference for developers
  ├── server.ts                         # TypeScript: Server entry
  ├── server.js                         # Compiled server
  ├── package.json                      # Dependencies
  ├── tsconfig.json                     # Root TypeScript config
  ├── vite.config.ts                    # TypeScript: Vitest config
  ├── .env                              # Environment variables
  ├── .env.example                      # Example environment variables
  ├── .eslintrc.json                    # ESLint config
  ├── .gitignore                        # Git ignore
  ├── README.md                         # Project documentation
  └── .github/workflows/ci.yml          # CI/CD pipeline
  ```
- **Script to Create Structure**:

  ```bash
  #!/bin/bash
  mkdir -p authmini/{backend,frontend}/{src,dist}
  mkdir -p authmini/backend/src/{config,data,middleware,routes,services,types}
  mkdir -p authmini/backend/db/migrations
  mkdir -p authmini/backend/tests/{unit,integration}
  mkdir -p authmini/frontend/src/{css,js}
  mkdir -p authmini/frontend/tests/unit
  mkdir -p authmini/docs

  touch authmini/backend/src/config/env.ts
  touch authmini/backend/src/data/prisma-manager.ts
  touch authmini/backend/src/middleware/auth-middleware.ts
  touch authmini/backend/src/routes/{auth-routes.ts,route-registry.ts}
  touch authmini/backend/src/services/user-service.ts
  touch authmini/backend/src/types/model-types.ts
  touch authmini/backend/db/{schema.prisma,seed-data.ts}
  touch authmini/backend/tests/unit/user-service.test.ts
  touch authmini/backend/tests/integration/auth-routes.test.ts
  touch authmini/backend/backend.tsconfig.json

  touch authmini/frontend/src/css/styles.css
  touch authmini/frontend/src/js/{app.ts,api-client.ts,client-types.ts}
  touch authmini/frontend/src/index.html
  touch authmini/frontend/tests/unit/app-ui.test.ts
  touch authmini/frontend/frontend.tsconfig.json

  touch authmini/{ARCHITECTURE.md,LEARNING_GUIDE.md,DEVELOPER_REFERENCE.md}
  touch authmini/{server.ts,server.js,package.json,tsconfig.json,vite.config.ts,.env,.env.example,.eslintrc.json,.gitignore,README.md}
  mkdir -p authmini/.github/workflows
  touch authmini/.github/workflows/ci.yml
  ```

### Step 3: Verify System Requirements

- **Why**: Ensures tools support TypeScript, PostgreSQL, and Vitest.
- **How**: Confirm Node.js, npm, Git, PostgreSQL.
- **Steps**:
  1. **Node.js**: `node --version` (20.15.1).
     - **Fix**: `nvm install 20.15.1; nvm use 20.15.1`.
  2. **npm**: `npm --version` (6+).
  3. **Git**: `git --version`.
     - **Fix**: Install from [git-scm.com](https://git-scm.com/downloads).
  4. **PostgreSQL**:
     - **Local**: Install, verify: `psql --version`.
- **Testing**:
  - Run: `node --version`, `npm --version`, `git --version`, `psql --version`.
  - **Expected Outcome**: Node.js 20.15.1, npm 6+, Git, PostgreSQL installed.

### Step 4: Install Dependencies and Configure Environment

- **Why**: Adds TypeScript, Prisma, Vitest, and dependencies.
- **How**: Configure `package.json`, `tsconfig` files, `.env`, `.gitignore`.
- **Code Example** (`package.json`):

  ```json
  {
    "name": "authmini",
    "version": "4.0.0",
    "type": "module",
    "engines": {
      "node": "20.15.1"
    },
    "scripts": {
      "start": "node server.js",
      "build": "npm run build:backend && npm run build:frontend && npm run build:server",
      "build:backend": "tsc -p backend/backend.tsconfig.json",
      "build:frontend": "tsc -p frontend/frontend.tsconfig.json",
      "build:server": "tsc -p tsconfig.json",
      "lint": "eslint .",
      "test": "vitest run",
      "test:backend": "vitest run backend/tests",
      "test:frontend": "vitest run frontend/tests",
      "test:watch": "vitest watch",
      "migrate": "npx prisma migrate deploy --schema=backend/db/schema.prisma",
      "migrate:dev": "npx prisma migrate dev --schema=backend/db/schema.prisma --name",
      "seed": "node --loader ts-node/esm backend/db/seed-data.ts",
      "prisma:generate": "npx prisma generate --schema=backend/db/schema.prisma",
      "prisma:studio": "npx prisma studio --schema=backend/db/schema.prisma",
      "dev": "nodemon --exec 'npm run build && npm start'"
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
      "@types/bcrypt": "^5.0.0",
      "@types/jsonwebtoken": "^9.0.0",
      "@types/node": "^20.0.0",
      "@typescript-eslint/eslint-plugin": "^5.0.0",
      "@typescript-eslint/parser": "^5.0.0",
      "eslint": "^8.57.0",
      "nodemon": "^3.0.1",
      "prisma": "^5.0.0",
      "ts-node": "^10.9.1",
      "typescript": "^^5.1.6",
      "vitest": "^1.0.0"
    }
  }
  ```

- **Code Example** (`tsconfig.json`) - Root TypeScript config:

  ```json
  {
    "compilerOptions": {
      "target": "ES2020",
      "module": "ESNext",
      "moduleResolution": "node",
      "esModuleInterop": true,
      "sourceMap": true,
      "outDir": "./",
      "skipLibCheck": true,
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      "resolveJsonModule": true
    },
    "include": ["server.ts"],
    "exclude": ["node_modules"]
  }
  ```

  **Build Command**: `npm run build:server`

  - **Expected Outcome**: Compiles `server.ts` to `server.js` in the root directory. The compiled JavaScript file is generated without errors, and a source map (`server.js.map`) is created for debugging.

- **Code Example** (`backend/backend.tsconfig.json`):

  ```json
  {
    "compilerOptions": {
      "target": "ES2020",
      "module": "ESNext",
      "outDir": "./dist",
      "rootDir": "./src",
      "strict": true,
      "esModuleInterop": true,
      "moduleResolution": "node",
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true,
      "sourceMap": true
    },
    "include": ["src/**/*"]
  }
  ```

  **Build Command**: `npm run build:backend`

  - **Expected Outcome**: Compiles all TypeScript files in `backend/src/` to `backend/dist/`, maintaining the same directory structure (e.g., `backend/src/config/env.ts` compiles to `backend/dist/config/env.js`). Source maps are generated for debugging. If no TypeScript files exist yet, the command runs without errors but produces no output.

- **Code Example** (`frontend/frontend.tsconfig.json`):

  ```json
  {
    "compilerOptions": {
      "target": "ES2020",
      "module": "ESNext",
      "outDir": "./dist",
      "rootDir": "./src",
      "strict": true,
      "esModuleInterop": true,
      "moduleResolution": "node",
      "skipLibCheck": true,
      "allowJs": true,
      "sourceMap": true
    },
    "include": ["src/**/*"]
  }
  ```

  **Build Command**: `npm run build:frontend`

  - **Expected Outcome**: Compiles all TypeScript (and allowed JavaScript) files in `frontend/src/` to `frontend/dist/`, maintaining the directory structure (e.g., `frontend/src/js/app.ts` compiles to `frontend/dist/js/app.js`). Source maps are generated. If no files exist yet, the command runs without errors but produces no output.

- **Code Example** (`vite.config.ts`):

  ```typescript
  /**
   * Vitest configuration for testing
   * Defines the test environment and patterns
   */
  import { defineConfig } from 'vitest/config';

  export default defineConfig({
    test: {
      globals: true,
      environment: 'node',
      include: ['**/tests/**/*.test.ts'],
    },
  });
  ```

- **Code Example** (`.env`):

  ```
  PORT=3000
  JWT_SECRET=your_jwt_secret_here
  LOG_LEVEL=info
  NODE_ENV=development
  DATABASE_URL=postgresql://user:password@localhost:5432/authmini?schema=public
  ```

- **Code Example** (`.env.example`):

  ```
  PORT=3000
  JWT_SECRET=generate_a_secure_secret
  LOG_LEVEL=info
  NODE_ENV=development
  DATABASE_URL=postgresql://user:password@localhost:5432/authmini?schema=public
  ```

- **Code Example** (`.gitignore`):

  ```
  node_modules/
  .env
  .env.local
  .env.*.local
  backend/dist/
  frontend/dist/
  *.log
  npm-debug.log*
  ```

- **Code Example** (`.eslintrc.json`):

  ```json
  {
    "env": {
      "es2021": true,
      "node": true
    },
    "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": 12,
      "sourceType": "module"
    },
    "plugins": ["@typescript-eslint"],
    "rules": {
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "@typescript-eslint/explicit-function-return-type": "warn"
    }
  }
  ```

**Steps**:

1. Create `package.json`, `tsconfig.json`, `backend/backend.tsconfig.json`, `frontend/frontend.tsconfig.json`, `vite.config.ts`, `.env`, `.env.example`, `.gitignore`, `.eslintrc.json`.
2. After creating the above files, run `npm install` to install dependencies.
3. Run `npm run build` to build all files in the folders.

**Testing**:

- **Command**: `npm ls typescript @prisma/client vitest`
- **Expected Outcome**: Outputs a tree of installed packages, confirming `typescript`, `@prisma/client`, and `vitest` (with versions like `^5.0.0`, `^5.0.0`, `^1.0.0`) are installed in `node_modules/`. Example output:
  ```
  authmini@4.0.0
  ├── @prisma/client@5.0.0
  ├── typescript@5.0.0
  └── vitest@1.0.0
  ```

---

## Backend Implementation

### Step 5: Configure Environment Validation

**Purpose**: Validate environment variables to prevent runtime errors, using TypeScript for type safety.

**TypeScript Explanation**: Uses `string[]` for `requiredEnvVars` and `void` for `validateEnv` to ensure type safety; `missing` leverages type inference to reduce boilerplate. JSDoc comments enhance documentation. This catches type errors early, ensures clear variable types, and improves IDE support.

**Code Example**:

```typescript
/**
 * Environment variable validation
 * Ensures required variables are set before application starts
 */

/**
 * Required environment variables
 */
const requiredEnvVars = ['JWT_SECRET', 'DATABASE_URL'];

/**
 * Validate that all required environment variables are set
 * @throws {Error} If any required variable is missing
 */
export function validateEnv(): void {
  const missing: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}
```

**Build**:

- To build the js file run `npm run build` and verify that the corresponding compiled .js file(s) exist in the dist/ directory

### Step 6: Configure Prisma and PostgreSQL with TypeScript

**Purpose**: Set up PostgreSQL with Prisma for type-safe database access.

**Code Example** (`backend/db/schema.prisma`):

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Define the User model with required fields and relationships
model User {
  id           Int      @id @default(autoincrement())
  email        String   @unique
  passwordHash String
  name         String
  role         String   @default("user")
}
```

**TypeScript Explanation**: PrismaClient uses generics for type-safe queries (e.g., `User` type). Singleton pattern with `PrismaClient` type annotation ensures one instance with explicit typing. JSDoc clarifies usage, enhancing maintainability.

**Code Example** (`backend/src/data/prisma-manager.ts`):

```typescript
/**
 * Database connection module
 * Manages Prisma client initialization and access
 */
import { PrismaClient } from '@prisma/client';

// Singleton instance of PrismaClient
let prisma: PrismaClient;

/**
 * Initialize database connection
 * @returns {PrismaClient} Initialized Prisma client
 */
export function initDb(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      log: ['error', 'warn'],
    });
  }
  return prisma;
}

/**
 * Get the database client
 * @returns {PrismaClient} Prisma client instance
 * @throws {Error} If database not initialized
 */
export function getDb(): PrismaClient {
  if (!prisma) {
    throw new Error('Database not initialized');
  }
  return prisma;
}

// Initialize DB on module load
initDb();
```

**Build**:

- To build the js file run `npm run build` and verify that the corresponding compiled .js file(s) exist in the dist/ directory

**Steps**:

1. Create the above files `backend/db/schema.prisma`, `backend/src/data/prisma-manager.ts`.
2. Set up PostgreSQL: `psql -U postgres -c "DROP DATABASE IF EXISTS authmini;"`, `psql -U postgres -c "CREATE DATABASE authmini;"`.
3. Update `.env` with `DATABASE_URL`.
4. Run `npm run prisma:generate`.
5. Run `npm run migrate:dev -- init`.

### Step 7: Seed Database with Initial Data

**Purpose**: Populate the database with initial user data to facilitate testing and development, ensuring a consistent starting point for the AuthMini V4 application.

**Detailed Explanation of Purpose**:

- **Why Seed Data**: Seeding the database with predefined users (e.g., an admin and a regular user) allows developers to test authentication, authorization, and other features without manually creating users each time. It ensures consistent test data across environments, which is critical for reliable unit and integration tests.
- **Role in AuthMini V4**: The seed data includes users with different roles (`admin` and `user`) to test role-based access control and authentication flows. This step supports rapid development by providing a pre-populated database for immediate use.
- **Prisma’s Role**: Prisma is used to execute the seeding script (`seed-data.ts`), leveraging its type-safe client to insert data into the PostgreSQL database. This eliminates the need for direct JavaScript access to the compiled file, as Prisma handles the execution via `npm run seed`.

**TypeScript Usage**:

- **Type-Safe Data Insertion**: The script uses Prisma’s generated `PrismaClient` with type annotations (e.g., `PrismaClient` type) to ensure type-safe database operations. The `users` array uses an implicit type inferred from the data structure, aligning with Prisma’s `User` model.
- **Asynchronous Operations**: TypeScript’s `async/await` syntax with proper return types (`Promise<void>`) ensures type-safe handling of asynchronous database operations. This prevents runtime errors from unhandled promises.
- **Benefits**: TypeScript catches type mismatches (e.g., incorrect field names or types in the `users` array) during compilation. JSDoc comments enhance code clarity, and type inference reduces boilerplate while maintaining safety.
- **No Direct JS Access**: The seed script is executed via Prisma’s CLI (`npm run seed`), which uses `ts-node` to run the TypeScript file directly. This avoids the need to compile the file to JavaScript, as it’s not part of the `src` directory and isn’t imported into the application runtime.

**Code Example**:

```typescript
/**
 * Seed database with initial user data
 * Inserts predefined users for testing and development
 */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

/**
 * Seed the database with initial users
 * @returns {Promise<void>} Resolves when seeding is complete
 */
async function seed(): Promise<void> {
  const users = [
    {
      email: 'admin@example.com',
      passwordHash: await bcrypt.hash('admin123', 10),
      name: 'Admin User',
      role: 'admin',
    },
    {
      email: 'user@example.com',
      passwordHash: await bcrypt.hash('user123', 10),
      name: 'Regular User',
      role: 'user',
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log('Database seeded successfully');
}

/**
 * Execute seeding and handle errors
 */
seed()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

**Build Command**: No build required for `backend/db/seed-data.ts`. This file is not part of the `src` directory and is executed directly using Prisma’s `npm run seed` command, which leverages `ts-node` to run the TypeScript file without compilation.

- **Expected Outcome**: Running `npm run seed` executes the script, inserting or updating two users (`admin@example.com` and `user@example.com`) in the database. The console outputs `Database seeded successfully`. You can verify the data using `npx prisma studio` or a database client, where the `User` table will show the seeded users with their respective roles and hashed passwords.

**Steps**:

1. Create `backend/db/seed-data.ts`.
2. Ensure the database is set up (from Step 6) and `DATABASE_URL` is configured in `.env`.
3. Run `npm run seed` to execute the seeding script.

**Testing**:

- **Command**: `npm run seed`
- **Expected Outcome**: The script runs without errors, and the database is populated with two users. You can confirm by running `npm run prisma:studio` and checking the `User` table, which should contain:
  - `admin@example.com` (role: `admin`, name: `Admin User`).
  - `user@example.com` (role: `user`, name: `Regular User`).

### Step 8: Define Shared Types

- **Why**: Centralize TypeScript types/interfaces.
- **How**: Create `model-types.ts`.
- **Code Example** (`backend/src/types/model-types.ts`):

  ```typescript
  /**
   * Shared type definitions for the application
   * Defines interfaces for User, authentication, and JWT
   */

  /**
   * User model interface
   */
  export interface User {
    id: number;
    email: string;
    passwordHash: string;
    name: string;
    role: 'user' | 'admin'; // Using literal union type for role
  }

  /**
   * User registration input
   */
  export interface UserInput {
    email: string;
    password: string;
    name: string;
  }

  /**
   * Login response with token and user info
   */
  export interface LoginResponse {
    token: string;
    user: Omit<User, 'passwordHash'>; // Exclude password from response
  }

  /**
   * JWT payload structure
   */
  export interface JwtPayload {
    id: number;
    email: string;
    role: 'user' | 'admin';
  }

  /**
   * API error response
   */
  export interface ErrorResponse {
    error: string;
  }
  ```

### Step 9: Implement User Service with TypeScript

- **Why**: Handle user logic with type-safe functions.
- **How**: Create `user-service.ts`.
- **Code Example** (`backend/src/services/user-service.ts`):

```typescript
/**
 * User service module
 * Handles user-related business logic including authentication
 */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDb } from '../data/prisma-manager';
import {
  User,
  UserInput,
  LoginResponse,
  JwtPayload,
} from '../types/model-types';

/**
 * Register a new user
 * @param {UserInput} input - User registration data
 * @returns {Promise<{id: number}>} Newly created user ID
 * @throws {Error} If email already exists or validation fails
 */
export async function registerUser(input: UserInput): Promise<{ id: number }> {
  const db = getDb();
  const { email, password, name } = input;

  // Validate input
  if (!email || !password || !name) {
    throw new Error('All fields are required');
  }

  // Check for existing user
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  // Hash password and create user
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await db.user.create({
    data: {
      email,
      passwordHash,
      name,
      role: 'user',
    },
  });

  return { id: user.id };
}

/**
 * Authenticate a user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<LoginResponse>} Login response with token and user info
 * @throws {Error} If credentials are invalid
 */
export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  const db = getDb();

  // Find user by email
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Verify password
  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    throw new Error('Invalid credentials');
  }

  // Create JWT payload
  const payload: JwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role as 'user' | 'admin',
  };

  // Sign JWT token
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  // Return token and user info (excluding password)
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as 'user' | 'admin', // Add type assertion here
    },
  };
}

/**
 * Get all users (for admin use)
 * @returns {Promise<Omit<User, 'passwordHash'>[]>} List of users without passwords
 */
export async function getUsers(): Promise<Omit<User, 'passwordHash'>[]> {
  const db = getDb();
  const users = await db.user.findMany({
    select: { id: true, email: true, name: true, role: true },
  });

  // Map and convert role to the correct type
  return users.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as 'user' | 'admin',
  }));
}

/**
 * Get user by ID
 * @param {number} userId - User ID to find
 * @returns {Promise<Omit<User, 'passwordHash'>>} User without password
 * @throws {Error} If user not found
 */
export async function getUserById(
  userId: number
): Promise<Omit<User, 'passwordHash'>> {
  const db = getDb();
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, role: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Convert role to the correct type
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as 'user' | 'admin',
  };
}
```

### Step 10: Implement Authentication Middleware

- **Why**: Centralize JWT verification for protected routes.
- **How**: Create auth middleware with TypeScript types.
- **Code Example** (`backend/src/middleware/auth-middleware.ts`):

  ```typescript
  /**
   * Authentication middleware
   * Verifies JWT tokens and adds user info to request
   */
  import { FastifyRequest, FastifyReply } from 'fastify';
  import jwt from 'jsonwebtoken';
  import { JwtPayload } from '../types/model-types';

  /**
   * Extended FastifyRequest with authenticated user information
   */
  export interface AuthenticatedRequest extends FastifyRequest {
    user?: {
      id: number;
      email: string;
      role: 'user' | 'admin';
    };
  }

  /**
   * Middleware to verify user authentication
   * @param {AuthenticatedRequest} request - FastifyRequest with user property
   * @param {FastifyReply} reply - FastifyReply
   * @returns {Promise<void>}
   */
  export async function authenticate(
    request: AuthenticatedRequest,
    reply: FastifyReply
  ): Promise<void> {
    // Extract token from Authorization header
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      reply.code(401).send({ error: 'No token provided' });
      return;
    }

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      // Attach user data to request for route handlers
      request.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };
    } catch (err) {
      reply.code(401).send({ error: 'Invalid token' });
    }
  }

  /**
   * Middleware to ensure user has admin role
   * Must be used after authenticate middleware
   * @param {AuthenticatedRequest} request - FastifyRequest with user property
   * @param {FastifyReply} reply - FastifyReply
   * @returns {Promise<void>}
   */
  export async function requireAdmin(
    request: AuthenticatedRequest,
    reply: FastifyReply
  ): Promise<void> {
    if (request.user?.role !== 'admin') {
      reply.code(403).send({ error: 'Admin access required' });
    }
  }
  ```

### Step 11: Implement Auth Routes

- **Why**: Handle HTTP requests with type-safe routes.
- **How**: Create auth routes with middleware integration.
- **Code Example** (`backend/src/routes/auth-routes.ts`):

  ```typescript
  /**
   * Authentication routes module
   * Handles user registration, login, logout, and data retrieval
   */
  import { FastifyInstance } from 'fastify';
  import {
    registerUser,
    loginUser,
    getUsers,
    getUserById,
  } from '../services/user-service';
  import {
    authenticate,
    requireAdmin,
    AuthenticatedRequest,
  } from '../middleware/auth-middleware';
  import { ErrorResponse } from '../types/model-types';

  /**
   * Request body for user registration
   */
  interface RegisterBody {
    email: string;
    password: string;
    name: string;
  }

  /**
   * Request body for user login
   */
  interface LoginBody {
    email: string;
    password: string;
  }

  /**
   * Register all authentication routes
   * @param {FastifyInstance} fastify - Fastify instance
   * @returns {Promise<void>}
   */
  export async function registerAuthRoutes(
    fastify: FastifyInstance
  ): Promise<void> {
    /**
     * User registration endpoint
     * POST /register
     */
    fastify.post<{ Body: RegisterBody }>(
      '/register',
      async (request, reply) => {
        const { email, password, name } = request.body;

        // Validate request
        if (!email || !password || !name) {
          return reply.code(400).send({
            error: 'All fields required',
          } as ErrorResponse);
        }

        try {
          // Register the user
          await registerUser({ email, password, name });
          return reply.code(201).send({
            message: 'User registered successfully',
          });
        } catch (err: any) {
          // Handle registration errors
          return reply.code(400).send({
            error: err.message,
          } as ErrorResponse);
        }
      }
    );

    /**
     * User login endpoint
     * POST /login
     */
    fastify.post<{ Body: LoginBody }>('/login', async (request, reply) => {
      const { email, password } = request.body;

      // Validate request
      if (!email || !password) {
        return reply.code(400).send({
          error: 'Email and password required',
        } as ErrorResponse);
      }

      try {
        // Authenticate the user
        const result = await loginUser(email, password);
        return reply.send(result);
      } catch (err: any) {
        // Handle authentication errors
        return reply.code(401).send({
          error: err.message,
        } as ErrorResponse);
      }
    });

    /**
     * User logout endpoint
     * POST /logout
     */
    fastify.post('/logout', async (_request, reply) => {
      // We don't need to do anything server-side for logout
      // Token invalidation happens client-side
      return reply.send({
        message: 'Logged out successfully',
      });
    });

    /**
     * Get current user data
     * GET /me
     */
    fastify.get(
      '/me',
      { preHandler: [authenticate] },
      async (request: AuthenticatedRequest, reply) => {
        try {
          // Get user data using ID from authenticated request
          if (!request.user?.id) {
            return reply.code(401).send({
              error: 'Authentication required',
            });
          }

          const user = await getUserById(request.user.id);
          return reply.send({ user });
        } catch (err: any) {
          // Handle errors
          return reply.code(400).send({
            error: err.message,
          } as ErrorResponse);
        }
      }
    );

    /**
     * Get all users (admin only)
     * GET /users
     */
    fastify.get(
      '/users',
      { preHandler: [authenticate, requireAdmin] },
      async (_request, reply) => {
        try {
          // Get all users
          const users = await getUsers();
          return reply.send({ users });
        } catch (err: any) {
          // Handle errors
          return reply.code(400).send({
            error: err.message,
          } as ErrorResponse);
        }
      }
    );
  }
  ```

- **Code Example** (`backend/src/routes/route-registry.ts`):

  ```typescript
  /**
   * Route registry module
   * Registers all API routes
   */
  import { FastifyInstance } from 'fastify';
  import { registerAuthRoutes } from './auth-routes';

  /**
   * Register all application routes
   * @param {FastifyInstance} fastify - Fastify instance
   * @returns {Promise<void>}
   */
  export async function registerRoutes(
    fastify: FastifyInstance
  ): Promise<void> {
    // Register auth routes
    await fastify.register(registerAuthRoutes, { prefix: '/auth' });

    // Additional route registrations can go here
  }
  ```

### Step 12: Implement Server Configuration

- **Why**: Configure Fastify server with TypeScript.
- **How**: Create `server.ts`.
- **Code Example** (`server.ts`):

  ```typescript
  /**
   * Main server entry point
   * Configures and starts the Fastify server
   */
  import Fastify, { FastifyInstance } from 'fastify';
  import fastifyStatic from '@fastify/static';
  import path from 'path';
  import { fileURLToPath } from 'url';
  import { config } from 'dotenv';
  import { registerRoutes } from './backend/src/routes/route-registry';
  import { initDb } from './backend/src/data/prisma-manager';
  import { validateEnv } from './backend/src/config/env';

  // Load environment variables
  config();

  // Validate environment variables
  validateEnv();

  // Get current file directory (ESM compatibility)
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  /**
   * Start the server with configured routes and services
   * @returns {Promise<void>}
   */
  async function startServer(): Promise<void> {
    // Create Fastify instance
    const fastify: FastifyInstance = Fastify({
      logger: { level: process.env.LOG_LEVEL || 'info' },
    });

    // Initialize database connection
    initDb();

    // Serve static frontend files
    fastify.register(fastifyStatic, {
      root: path.join(__dirname, 'frontend/dist'),
      prefix: '/',
    });

    // Register API routes
    fastify.register(registerRoutes, { prefix: '/api' });

    // Serve index.html for all unmatched routes (SPA support)
    fastify.setNotFoundHandler((request, reply) => {
      reply.sendFile('index.html');
    });

    // Start the server
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    try {
      const address = await fastify.listen({
        port: port,
        host: '0.0.0.0', // Listen on all interfaces
      });
      console.log(`Server listening on ${address}`);
    } catch (err) {
      console.error('Error starting server:', err);
      process.exit(1);
    }
  }

  // Start the server when this script is run directly
  startServer();
  ```

### Step 13: Unit Testing Backend Services

- **Why**: Verify backend logic with type-safe tests.
- **How**: Create unit tests for user service.
- **Code Example** (`backend/tests/unit/user-service.test.ts`):

  ```typescript
  /**
   * User service unit tests
   * Tests user registration, login, and retrieval
   */
  import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
  import {
    registerUser,
    loginUser,
    getUsers,
    getUserById,
  } from '../../src/services/user-service';
  import { initDb, getDb } from '../../src/data/prisma-manager';
  import { UserInput } from '../../src/types/model-types';

  // Mock JWT to avoid actual token generation in tests
  vi.mock('jsonwebtoken', () => ({
    sign: vi.fn(() => 'mock-token'),
    verify: vi.fn(() => ({ id: 1, email: 'test@example.com', role: 'user' })),
  }));

  describe('User Service', () => {
    // Test database connection
    let db: ReturnType<typeof getDb>;
    let testUserId: number;

    // Test user data
    const testUser: UserInput = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };

    // Setup before tests run
    beforeAll(async () => {
      db = initDb();
      // Register a test user to use in the tests
      const result = await registerUser(testUser);
      testUserId = result.id;
    });

    // Cleanup after tests complete
    afterAll(async () => {
      // Remove test user
      await db.user.deleteMany({ where: { id: testUserId } });
      await db.$disconnect();
    });

    it('should register a new user', async () => {
      // Create a unique email for this test
      const uniqueEmail = `new${Date.now()}@example.com`;

      const result = await registerUser({
        email: uniqueEmail,
        password: 'password123',
        name: 'New User',
      });

      // Verify user was created
      expect(result.id).toBeDefined();
      expect(typeof result.id).toBe('number');

      // Clean up created user
      await db.user.delete({ where: { id: result.id } });
    });

    it('should reject registration with missing fields', async () => {
      // Missing name
      await expect(
        registerUser({
          email: 'test2@example.com',
          password: 'password123',
          name: '',
        })
      ).rejects.toThrow('All fields are required');
    });

    it('should not register duplicate email', async () => {
      // Attempt to register with existing email
      await expect(registerUser(testUser)).rejects.toThrow(
        'Email already exists'
      );
    });

    it('should login a user', async () => {
      // Login with test user credentials
      const result = await loginUser(testUser.email, testUser.password);

      // Verify token and user data
      expect(result.token).toBeDefined();
      expect(result.user.email).toBe(testUser.email);
      expect(result.user.name).toBe(testUser.name);
      // Password should not be included in response
      expect(result.user).not.toHaveProperty('passwordHash');
    });

    it('should not login with invalid credentials', async () => {
      // Attempt login with wrong password
      await expect(loginUser(testUser.email, 'wrongpassword')).rejects.toThrow(
        'Invalid credentials'
      );
    });

    it('should get user by ID', async () => {
      // Get user by ID
      const user = await getUserById(testUserId);

      // Verify user data
      expect(user.id).toBe(testUserId);
      expect(user.email).toBe(testUser.email);
      expect(user.name).toBe(testUser.name);
      // Password should not be included
      expect(user).not.toHaveProperty('passwordHash');
    });

    it('should throw error for non-existent user ID', async () => {
      // Attempt to get non-existent user
      await expect(getUserById(9999)).rejects.toThrow('User not found');
    });

    it('should get all users', async () => {
      // Get all users
      const users = await getUsers();

      // Verify users array
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBeGreaterThan(0);

      // Check if our test user is included
      const testUserInList = users.find((u) => u.email === testUser.email);
      expect(testUserInList).toBeDefined();
      expect(testUserInList?.name).toBe(testUser.name);

      // Verify password is not included
      expect(testUserInList).not.toHaveProperty('passwordHash');
    });
  });
  ```

### Step 14: Integration Testing Auth Routes

- **Why**: Verify API endpoint behavior with TypeScript.
- **How**: Create integration tests for auth routes.
- **Code Example** (`backend/tests/integration/auth-routes.test.ts`):

  ```typescript
  /**
   * Auth routes integration tests
   * Tests API endpoints for authentication
   */
  import { describe, it, expect, beforeAll, afterAll } from 'vitest';
  import Fastify, { FastifyInstance } from 'fastify';
  import { registerAuthRoutes } from '../../src/routes/auth-routes';
  import { initDb, getDb } from '../../src/data/prisma-manager';

  describe('Auth Routes', () => {
    let fastify: FastifyInstance;
    let db: ReturnType<typeof getDb>;
    let testUserId: number;
    let authToken: string;

    const testUser = {
      email: 'integration@example.com',
      password: 'password123',
      name: 'Integration Test',
    };

    // Setup before tests run
    beforeAll(async () => {
      // Initialize database
      db = initDb();

      // Clean up any existing test user
      await db.user.deleteMany({ where: { email: testUser.email } });

      // Create Fastify instance for testing
      fastify = Fastify();

      // Register routes
      await fastify.register(registerAuthRoutes);

      // Start Fastify server
      await fastify.ready();
    });

    // Cleanup after tests complete
    afterAll(async () => {
      // Clean up test user if it exists
      if (testUserId) {
        await db.user.delete({ where: { id: testUserId } });
      }

      // Close Fastify server
      await fastify.close();

      // Disconnect from database
      await db.$disconnect();
    });

    it('should register a new user', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/register',
        payload: testUser,
      });

      // Verify response
      expect(response.statusCode).toBe(201);
      expect(JSON.parse(response.payload)).toEqual({
        message: 'User registered successfully',
      });

      // Verify user was created in database
      const createdUser = await db.user.findUnique({
        where: { email: testUser.email },
      });

      expect(createdUser).not.toBeNull();
      if (createdUser) {
        testUserId = createdUser.id;
      }
    });

    it('should log in a user', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/login',
        payload: {
          email: testUser.email,
          password: testUser.password,
        },
      });

      // Verify response
      expect(response.statusCode).toBe(200);

      const result = JSON.parse(response.payload);
      expect(result.token).toBeDefined();
      expect(result.user.email).toBe(testUser.email);
      expect(result.user.name).toBe(testUser.name);

      // Save token for later tests
      authToken = result.token;
    });

    it('should get current user data', async () => {
      // Skip if we don't have a token
      if (!authToken) {
        return;
      }

      const response = await fastify.inject({
        method: 'GET',
        url: '/me',
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });

      // Verify response
      expect(response.statusCode).toBe(200);

      const result = JSON.parse(response.payload);
      expect(result.user).toBeDefined();
      expect(result.user.email).toBe(testUser.email);
      expect(result.user.name).toBe(testUser.name);
    });

    it('should reject authentication without token', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/me',
      });

      // Verify response
      expect(response.statusCode).toBe(401);
    });
  });
  ```

---

## Frontend Implementation

### Step 15: Define Frontend Types

- **Why**: Ensure type safety in frontend code.
- **How**: Create type definitions.
- **Code Example** (`frontend/src/js/client-types.ts`):

  ```typescript
  /**
   * Frontend type definitions
   * Defines interfaces for API interaction and UI state
   */

  /**
   * User model (matches backend, but without password)
   */
  export interface User {
    id: number;
    email: string;
    name: string;
    role: 'user' | 'admin';
  }

  /**
   * Login API response
   */
  export interface LoginResponse {
    token: string;
    user: User;
  }

  /**
   * User registration input
   */
  export interface RegistrationInput {
    email: string;
    password: string;
    name: string;
  }

  /**
   * Login input
   */
  export interface LoginInput {
    email: string;
    password: string;
  }

  /**
   * Generic API error response
   */
  export interface ApiError {
    error: string;
  }

  /**
   * Users list response
   */
  export interface UsersResponse {
    users: User[];
  }
  ```

### Step 16: Implement API Client

- **Why**: Create type-safe API communication.
- **How**: Build axios-based API client.
- **Code Example** (`frontend/src/js/api-client.ts`):

  ```typescript
  /**
   * API client module
   * Provides typed methods for interacting with the backend API
   */
  import axios, { AxiosError } from 'axios';
  import {
    User,
    LoginResponse,
    RegistrationInput,
    LoginInput,
    ApiError,
    UsersResponse,
  } from './client-types';

  // Base URL for API requests
  const API_BASE_URL = '/api';

  /**
   * Get authorization header with JWT token
   * @returns {Object} Headers object with Authorization
   */
  function getAuthHeaders(): { Authorization: string } | {} {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * Format error message from API response
   * @param {unknown} error - Error object from axios
   * @returns {string} Formatted error message
   */
  function formatError(error: unknown): string {
    if (error instanceof AxiosError && error.response?.data) {
      return (error.response.data as ApiError).error || error.message;
    }
    return error instanceof Error ? error.message : 'Unknown error';
  }

  /**
   * Register a new user
   * @param {RegistrationInput} userData - User registration data
   * @returns {Promise<{ message: string }>} Success message
   * @throws {Error} If registration fails
   */
  export async function registerUser(
    userData: RegistrationInput
  ): Promise<{ message: string }> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        userData
      );
      return response.data;
    } catch (error) {
      throw new Error(formatError(error));
    }
  }

  /**
   * Log in a user
   * @param {LoginInput} credentials - User login credentials
   * @returns {Promise<LoginResponse>} Login response with token
   * @throws {Error} If login fails
   */
  export async function loginUser(
    credentials: LoginInput
  ): Promise<LoginResponse> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        credentials
      );
      return response.data;
    } catch (error) {
      throw new Error(formatError(error));
    }
  }

  /**
   * Get current user data
   * @returns {Promise<{ user: User }>} Current user
   * @throws {Error} If fetching user fails
   */
  export async function getCurrentUser(): Promise<{ user: User }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error(formatError(error));
    }
  }

  /**
   * Get all users (admin only)
   * @returns {Promise<UsersResponse>} List of users
   * @throws {Error} If fetching users fails
   */
  export async function getUsers(): Promise<UsersResponse> {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/users`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error(formatError(error));
    }
  }

  /**
   * Log out current user
   * @returns {Promise<{ message: string }>} Success message
   */
  export async function logoutUser(): Promise<{ message: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/logout`);
      return response.data;
    } catch (error) {
      throw new Error(formatError(error));
    }
  }
  ```

### Step 17: Implement Frontend Application Logic

- **Why**: Create type-safe frontend logic.
- **How**: Implement Alpine.js components with TypeScript.
- **Code Example** (`frontend/src/js/app.ts`):

  ```typescript
  /**
   * Frontend application script
   * Manages user interface with Alpine.js
   */
  import {
    getCurrentUser,
    getUsers,
    loginUser,
    logoutUser,
    registerUser,
  } from './api-client';
  import { User } from './client-types';

  // Type declaration for Alpine.js
  declare global {
    interface Window {
      Alpine: any;
    }
  }

  /**
   * Main application component
   * @returns Alpine.js component definition
   */
  function app() {
    return {
      // Component state
      user: null as User | null,
      users: [] as User[],
      error: null as string | null,

      /**
       * Initialize the application
       * Checks for existing session
       * @returns {Promise<void>}
       */
      async init(): Promise<void> {
        try {
          // Check if user is already logged in
          const token = localStorage.getItem('token');
          if (token) {
            const { user } = await getCurrentUser();
            this.user = user;

            // Load users list for admin
            if (this.user.role === 'admin') {
              await this.fetchUsers();
            }
          }
        } catch (err) {
          // Handle invalid token by removing it
          console.error('Session error:', err);
          localStorage.removeItem('token');
          this.user = null;
        }
      },

      /**
       * Fetch all users (admin only)
       * @returns {Promise<void>}
       */
      async fetchUsers(): Promise<void> {
        try {
          const { users } = await getUsers();
          this.users = users;
        } catch (err: any) {
          // Handle API errors
          this.error = err.message || 'Failed to fetch users';
        }
      },

      /**
       * Log out the current user
       * @returns {Promise<void>}
       */
      async logout(): Promise<void> {
        try {
          // Call logout API
          await logoutUser();
        } catch (err: any) {
          console.error('Logout error:', err);
        } finally {
          // Always clear local session
          localStorage.removeItem('token');
          this.user = null;
          this.users = [];

          // Redirect to login page
          window.location.href = '/';
        }
      },
    };
  }

  /**
   * Authentication component for login/register
   * @returns Alpine.js component definition
   */
  function authComponent() {
    return {
      // Form fields
      email: '',
      password: '',
      name: '',
      error: null as string | null,

      /**
       * Submit login or registration form
       * @param {'register' | 'login'} action - Action to perform
       * @returns {Promise<void>}
       */
      async submit(action: 'register' | 'login'): Promise<void> {
        this.error = null;

        try {
          // Handle registration
          if (action === 'register') {
            // Validate all fields for registration
            if (!this.email || !this.password || !this.name) {
              this.error = 'All fields required';
              return;
            }

            // Register new user
            await registerUser({
              email: this.email,
              password: this.password,
              name: this.name,
            });

            // Auto-login after successful registration
            const loginResponse = await loginUser({
              email: this.email,
              password: this.password,
            });

            // Store token and refresh page
            localStorage.setItem('token', loginResponse.token);
            window.location.href = '/';
          } else {
            // Validate login fields
            if (!this.email || !this.password) {
              this.error = 'Email and password required';
              return;
            }

            // Log in user
            const loginResponse = await loginUser({
              email: this.email,
              password: this.password,
            });

            // Store token and refresh page
            localStorage.setItem('token', loginResponse.token);
            window.location.href = '/';
          }
        } catch (err: any) {
          // Handle API errors
          this.error = err.message || 'An error occurred';
        }
      },
    };
  }

  // Register Alpine.js components when DOM loaded
  document.addEventListener('DOMContentLoaded', () => {
    window.Alpine = window.Alpine || {};
    window.Alpine.data = window.Alpine.data || {};
    window.Alpine.data('app', app);
    window.Alpine.data('authComponent', authComponent);
  });
  ```

### Step 18: Implement Frontend UI

- **Why**: Create a simple UI for testing functionality.
- **How**: Update HTML and CSS files.
- **Code Example** (`frontend/src/index.html`):

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>AuthMini V4</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="/css/styles.css" />
    </head>
    <body
      x-data="app()"
      class="bg-gray-100 min-h-screen flex items-center justify-center"
      x-init="init()"
    >
      <!-- Login/Register Form -->
      <div x-show="!user" class="form-container">
        <div x-data="authComponent()">
          <h2 class="text-2xl font-bold mb-4 text-white">AuthMini V4</h2>
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
          <input
            x-model="name"
            type="text"
            placeholder="Name"
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
          Welcome, <span x-text="user?.name || 'User'"></span>
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
        <ul class="mb-4 max-h-60 overflow-y-auto">
          <template x-for="u in users" :key="u.id">
            <li class="text-white py-1 border-b border-gray-600">
              <span x-text="`${u.email} (${u.name}) - ${u.role}`"></span>
            </li>
          </template>
        </ul>
        <button @click="logout()" class="btn-primary">Logout</button>
      </div>

      <script src="/js/app.js" defer></script>
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

- **Code Example** (`frontend/src/css/styles.css`):

  ```css
  /* Main form container styling */
  .form-container {
    background-color: #2d3748;
    padding: 2rem;
    border-radius: 0.5rem;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  /* Primary button styling */
  .btn-primary {
    background-color: #4a5568;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  /* Button hover effect */
  .btn-primary:hover {
    background-color: #718096;
  }

  /* User list styling */
  ul {
    list-style: none;
    padding: 0;
  }

  /* Responsive adjustments */
  @media (max-width: 480px) {
    .form-container {
      margin: 0 1rem;
    }
  }
  ```

### Step 19: Frontend Testing

- **Why**: Verify frontend TypeScript logic.
- **How**: Create unit tests for frontend components.
- **Code Example** (`frontend/tests/unit/app-ui.test.ts`):

  ```typescript
  /**
   * Frontend component tests
   * Tests Alpine.js components using JSDOM
   */
  import { describe, it, expect, vi, beforeEach } from 'vitest';
  import { JSDOM } from 'jsdom';
  import {
    getCurrentUser,
    loginUser,
    registerUser,
  } from '../../src/js/api-client';

  // Mock API client modules
  vi.mock('../../src/js/api-client', () => ({
    getCurrentUser: vi.fn(),
    getUsers: vi.fn(),
    loginUser: vi.fn(),
    logoutUser: vi.fn(),
    registerUser: vi.fn(),
  }));

  // Create a fake Alpine.js global
  const mockAlpine = {
    data: vi.fn(),
    start: vi.fn(),
  };

  describe('Frontend App Component', () => {
    let window: Window;
    let document: Document;

    // Mock localStorage
    const localStorageMock = {
      store: {} as Record<string, string>,
      getItem: vi.fn((key: string) => localStorageMock.store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        localStorageMock.store[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete localStorageMock.store[key];
      }),
      clear: vi.fn(() => {
        localStorageMock.store = {};
      }),
      length: 0,
      key: vi.fn(() => null),
    };

    beforeEach(() => {
      // Create a new DOM environment for each test
      const dom = new JSDOM(`
        <!DOCTYPE html>
        <html>
          <body>
            <div id="app"></div>
          </body>
        </html>
      `);

      window = dom.window;
      document = window.document;

      // Mock global objects
      global.window = window as any;
      global.document = document;
      global.localStorage = localStorageMock as any;
      window.Alpine = mockAlpine;

      // Reset mocks
      vi.clearAllMocks();
      localStorageMock.clear();
    });

    it('should register Alpine components', () => {
      // Load the app script
      require('../../src/js/app');

      // Trigger DOMContentLoaded event
      window.document.dispatchEvent(new window.Event('DOMContentLoaded'));

      // Verify Alpine components were registered
      expect(window.Alpine.data).toHaveBeenCalledWith(
        'app',
        expect.any(Function)
      );
      expect(window.Alpine.data).toHaveBeenCalledWith(
        'authComponent',
        expect.any(Function)
      );
    });

    it('should check for existing session on init', async () => {
      // Mock localStorage with token
      localStorageMock.setItem('token', 'fake-token');

      // Mock getCurrentUser
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
      };
      (getCurrentUser as any).mockResolvedValue({ user: mockUser });

      // Load the app script
      const { app } = require('../../src/js/app');

      // Create app component
      const appComponent = app();

      // Call init
      await appComponent.init();

      // Verify getCurrentUser was called
      expect(getCurrentUser).toHaveBeenCalled();
      expect(appComponent.user).toEqual(mockUser);
    });

    it('should handle login submission', async () => {
      // Mock loginUser
      const mockLoginResponse = {
        token: 'fake-token',
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'Test User',
          role: 'user',
        },
      };
      (loginUser as any).mockResolvedValue(mockLoginResponse);

      // Mock window.location
      const locationMock = { href: '' };
      Object.defineProperty(window, 'location', {
        value: locationMock,
        writable: true,
      });

      // Load the auth component
      const { authComponent } = require('../../src/js/app');

      // Create auth component
      const auth = authComponent();
      auth.email = 'test@example.com';
      auth.password = 'password123';

      // Call login
      await auth.submit('login');

      // Verify loginUser was called with correct params
      expect(loginUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });

      // Verify token was stored
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'token',
        'fake-token'
      );

      // Verify redirect
      expect(locationMock.href).toBe('/');
    });

    it('should handle registration submission', async () => {
      // Mock registerUser and loginUser
      (registerUser as any).mockResolvedValue({ message: 'Success' });
      const mockLoginResponse = {
        token: 'fake-token',
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'Test User',
          role: 'user',
        },
      };
      (loginUser as any).mockResolvedValue(mockLoginResponse);

      // Mock window.location
      const locationMock = { href: '' };
      Object.defineProperty(window, 'location', {
        value: locationMock,
        writable: true,
      });

      // Load the auth component
      const { authComponent } = require('../../src/js/app');

      // Create auth component with registration data
      const auth = authComponent();
      auth.email = 'test@example.com';
      auth.password = 'password123';
      auth.name = 'Test User';

      // Call register
      await auth.submit('register');

      // Verify registerUser was called with correct params
      expect(registerUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });

      // Verify loginUser was called after registration
      expect(loginUser).toHaveBeenCalled();

      // Verify token was stored
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'token',
        'fake-token'
      );

      // Verify redirect
      expect(locationMock.href).toBe('/');
    });
  });
  ```

---

## TypeScript Benefits and Learning Points

### Type Safety and Error Prevention

TypeScript helps catch errors early during development rather than at runtime. Consider these examples:

1. **Function Parameter Type Checking**:

   ```typescript
   // Without TypeScript:
   function registerUser(userData) {
     // No type checking - could receive any data
   }

   // With TypeScript:
   function registerUser(userData: UserInput): Promise<{ id: number }> {
     // Type checking ensures userData has email, password, and name
   }
   ```

2. **Object Property Access**:

   ```typescript
   // Without TypeScript:
   const user = await getUser();
   console.log(user.namee); // Typo, but no error until runtime

   // With TypeScript:
   const user = await getUser();
   console.log(user.namee); // Compilation error: Property 'namee' does not exist on type 'User'
   ```

3. **Null/Undefined Checking**:

   ```typescript
   // Without TypeScript:
   function processUser(user) {
     return user.name.toUpperCase(); // Crashes if user is null/undefined

   // With TypeScript:
   function processUser(user: User | null): string {
     return user?.name?.toUpperCase() || ''; // Error if not handled properly
   }
   ```

### IDE Support and Developer Experience

TypeScript significantly improves the developer experience through:

1. **Autocompletion**: IDE shows available properties and methods:

   ```typescript
   const user = await getUserById(1);
   user. // IDE shows .id, .email, .name, .role properties
   ```

2. **Documentation in Code**: JSDoc comments provide inline documentation:

   ```typescript
   /**
    * Register a new user
    * @param {UserInput} input - User registration data
    * @returns {Promise<{id: number}>} Newly created user ID
    * @throws {Error} If email already exists
    */
   export async function registerUser(
     input: UserInput
   ): Promise<{ id: number }> {
     // Implementation
   }
   ```

3. **Type Inference**: TypeScript often infers types automatically:

   ```typescript
   // TypeScript infers 'number' type for userId
   const userId = 42;

   // TypeScript infers User[] type for array
   const usersList = await getUsers();
   ```

### TypeScript Features Used in This Project

1. **Interfaces**: Define object shapes:

   ```typescript
   interface User {
     id: number;
     email: string;
     passwordHash: string;
     name: string;
     role: 'user' | 'admin';
   }
   ```

2. **Union Types**: Allow multiple type options:

   ```typescript
   type UserRole = 'user' | 'admin';
   ```

3. **Type Modifiers**: Transform existing types:

   ```typescript
   // Create a type without the passwordHash property
   type SafeUser = Omit<User, 'passwordHash'>;
   ```

4. **Function Type Annotations**: Specify parameter and return types:

   ```typescript
   function authenticate(
     request: AuthenticatedRequest,
     reply: FastifyReply
   ): Promise<void>;
   ```

5. **Generic Types**: Create reusable, type-safe components:
   ```typescript
   // From axios
   async function get<T>(url: string): Promise<T>;
   ```

### Testing with TypeScript

TypeScript enhances testing through:

1. **Type-Safe Mocks**:

   ```typescript
   // Mock with proper types
   vi.mock('../../src/api-client', () => ({
     getCurrentUser: vi.fn<[], Promise<{ user: User }>>(),
   }));
   ```

2. **Test Type Safety**:

   ```typescript
   // Tests both functionality and type correctness
   const result = await loginUser('test@example.com', 'password');
   expect(result.token).toBeDefined();
   expect(result.user.email).toBe('test@example.com');
   ```

3. **Type Assertions in Tests**:
   ```typescript
   // TypeScript enforces which properties can be checked
   expect(result).toHaveProperty('token');
   expect(result.user).not.toHaveProperty('passwordHash');
   ```

---

## Conclusion

This guide has demonstrated how to:

1. **Transform a JavaScript application to TypeScript**:

   - Added type definitions for all application components
   - Implemented proper TypeScript configuration
   - Leveraged TypeScript features for enhanced code quality

2. **Implement basic unit testing**:

   - Created tests for backend services
   - Created tests for frontend components
   - Used type-safe testing methods

3. **Use Prisma ORM with TypeScript**:

   - Defined Prisma schema
   - Set up database migrations and seeding
   - Leveraged Prisma Client's TypeScript integration

4. **Organize code for maintainability**:
   - Structured project with clear frontend/backend separation
   - Placed database concerns in backend
   - Created domain-specific testing directories

The resulting application demonstrates TypeScript's benefits for application development:

- Enhanced code reliability through static type checking
- Improved developer experience with better tooling support
- More maintainable codebase with self-documenting code
- Better testing capabilities

These principles can be applied to larger applications, serving as a foundation for more complex TypeScript projects.

---

## Additional Resources

- 🔗 [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- 🔗 [Prisma TypeScript Integration](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prisma-client/type-safety)
- 🔗 [Vitest Documentation](https://vitest.dev/guide/)
- 🔗 [Fastify TypeScript Integration](https://www.fastify.io/docs/latest/Reference/TypeScript/)
- 🔗 [Alpine.js TypeScript Documentation](https://alpinejs.dev/advanced/typescript)
