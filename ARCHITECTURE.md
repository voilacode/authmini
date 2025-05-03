# AuthMini V4 Architecture

**Version**: 4.0  
**Application**: AuthMini V4  
**Created by**: Krishna Teja GS  
**Date**: May 3, 2025

## 1. Introduction

AuthMini V4 is a TypeScript-based authentication application that demonstrates best practices for integrating TypeScript into a full-stack JavaScript application. This document outlines the architectural decisions, component relationships, and technical choices made in V4.

### 1.1 Purpose

The architecture of AuthMini V4 is designed to:

1. Demonstrate TypeScript integration in a full-stack application
2. Showcase proper separation of concerns with clear domain boundaries
3. Implement type safety throughout the application stack
4. Provide a foundation for basic unit testing
5. Establish clear ownership of database components within the backend

### 1.2 System Overview

AuthMini V4 is a single-server application that provides:

- User authentication (register, login, logout)
- Role-based access control (user and admin roles)
- Admin functionality (view user list)
- Type-safe API contracts between frontend and backend
- PostgreSQL database with Prisma ORM

## 2. High-Level Architecture

AuthMini V4 follows a layered architecture with clear boundaries between components:

```
┌─────────────────────────────────────────────────────────────────────┐
│                            Client Browser                            │
└───────────────────────────────────┬─────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                             Fastify Server                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────────────────────┐        ┌───────────────────────────────┐ │
│  │    Static Content     │        │         API Routes            │ │
│  │    (Frontend SPA)     │        │                               │ │
│  └───────────────────────┘        └───────────────┬───────────────┘ │
│                                                   │                 │
│                                                   ▼                 │
│                                   ┌───────────────────────────────┐ │
│                                   │       Service Layer           │ │
│                                   └───────────────┬───────────────┘ │
│                                                   │                 │
│                                                   ▼                 │
│                                   ┌───────────────────────────────┐ │
│                                   │       Prisma Client           │ │
│                                   └───────────────┬───────────────┘ │
│                                                   │                 │
└───────────────────────────────────┬───────────────┘                 │
                                    │                                 │
                                    ▼                                 │
┌─────────────────────────────────────────────────────────────────────┐
│                           PostgreSQL Database                        │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.1 Key Components

1. **Client-Side Application**:

   - Single-page application (SPA) built with Alpine.js and TypeScript
   - Served as static content by the Fastify server
   - Communicates with backend via RESTful API

2. **Server Application**:

   - Fastify server with TypeScript
   - Handles API requests and serves static content
   - Implements middleware for authentication and authorization

3. **Service Layer**:

   - Contains business logic
   - Provides type-safe functions for data operations
   - Abstracts database interactions

4. **Data Access Layer**:

   - Prisma ORM with TypeScript integration
   - Type-safe database queries
   - Located exclusively within the backend domain

5. **Database**:
   - PostgreSQL database
   - Managed through Prisma schema and migrations

## 3. Component Details

### 3.1 Frontend Architecture

The frontend is a TypeScript-based Alpine.js SPA with the following components:

```
frontend/
├── src/                 # Source TypeScript files
│   ├── css/             # CSS styles
│   │   └── styles.css   # Custom styling
│   ├── js/              # TypeScript components
│   │   ├── app.ts       # Main application logic
│   │   ├── api-client.ts # Type-safe API client
│   │   └── client-types.ts # Frontend type definitions
│   └── index.html       # SPA entry point
├── tests/               # Frontend tests
└── dist/                # Compiled JavaScript (output)
```

#### 3.1.1 Frontend Components

1. **index.html**:

   - Entry point for the SPA
   - Loads Alpine.js, Axios, and Tailwind CSS from CDN
   - Contains template structure for login/register form and dashboards

2. **app.ts**:

   - Implements Alpine.js components with TypeScript
   - Manages application state
   - Handles user interactions

3. **api-client.ts**:

   - Provides type-safe API communication
   - Wraps Axios with proper error handling
   - Maintains consistent API contract

4. **client-types.ts**:
   - Defines TypeScript interfaces for frontend
   - Mirrors backend types for API contract
   - Ensures type consistency

### 3.2 Backend Architecture

The backend is a TypeScript-based Fastify server with the following components:

```
backend/
├── src/                  # Source TypeScript files
│   ├── config/           # Configuration
│   │   └── env.ts        # Environment validation
│   ├── data/             # Data access layer
│   │   └── prisma-manager.ts # Prisma client manager
│   ├── middleware/       # Middleware components
│   │   └── auth-middleware.ts # Authentication middleware
│   ├── routes/           # API routes
│   │   ├── auth-routes.ts # Authentication routes
│   │   └── route-registry.ts # Route registration
│   ├── services/         # Business logic
│   │   └── user-service.ts # User-related operations
│   └── types/            # Type definitions
│       └── model-types.ts # Shared type definitions
├── db/                   # Database components
│   ├── migrations/       # Prisma migrations
│   ├── schema.prisma     # Database schema
│   └── seed-data.ts      # Database seeding
├── tests/                # Backend tests
└── dist/                 # Compiled JavaScript (output)
```

#### 3.2.1 Backend Components

1. **Server Entry Point**:

   - Initializes Fastify server
   - Configures middleware and plugins
   - Serves static content and API routes

2. **Routes Layer**:

   - Handles HTTP requests
   - Validates input with TypeScript interfaces
   - Delegates business logic to service layer

3. **Middleware**:

   - Authentication: Verifies JWT tokens
   - Authorization: Checks user roles for admin features

4. **Service Layer**:

   - Implements business logic with TypeScript
   - Manages user operations (register, login, retrieval)
   - Interacts with data access layer

5. **Data Access Layer**:

   - Manages Prisma client
   - Provides type-safe database operations
   - Implements singleton pattern for client

6. **Type Definitions**:

   - Centralizes TypeScript interfaces
   - Ensures consistent types across components
   - Defines API contracts

7. **Database Components**:
   - Schema definition with Prisma
   - Migrations for schema versioning
   - Seeding for initial data

### 3.3 Server Entry Point

The server entry point (`server.ts`) ties everything together:

```typescript
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { registerRoutes } from './backend/src/routes/route-registry';
import { initDb } from './backend/src/data/prisma-manager';
import { validateEnv } from './backend/src/config/env';

// Validate environment variables
validateEnv();

// Initialize database
initDb();

// Create Fastify server
const fastify = Fastify({
  logger: { level: process.env.LOG_LEVEL || 'info' },
});

// Register static file handler
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'frontend/dist'),
  prefix: '/',
});

// Register API routes
fastify.register(registerRoutes, { prefix: '/api' });

// Start server
fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
```

## 4. TypeScript Integration

TypeScript is integrated throughout the application with the following organization:

### 4.1 TypeScript Configuration

Three configuration files manage different parts of the application:

1. **Root Configuration** (`tsconfig.json`):

   - Configures server entry point compilation
   - Sets global TypeScript options

2. **Backend Configuration** (`backend/backend.tsconfig.json`):

   - Configures backend TypeScript compilation
   - Sets stricter rules for backend code

3. **Frontend Configuration** (`frontend/frontend.tsconfig.json`):
   - Configures frontend TypeScript compilation
   - Includes settings for mixing JavaScript and TypeScript

### 4.2 Type Definitions

Type definitions are organized into domains:

1. **Backend Types** (`backend/src/types/model-types.ts`):

   - Define database entities
   - Define API request/response structures
   - Define service parameters and returns

2. **Frontend Types** (`frontend/src/js/client-types.ts`):
   - Mirror backend types for API contract
   - Define frontend-specific structures
   - Define Alpine.js component interfaces

### 4.3 TypeScript Benefits

The TypeScript integration provides several benefits:

1. **Static Type Checking**:

   - Catches type errors during development
   - Ensures API contract consistency
   - Prevents common runtime errors

2. **Improved Developer Experience**:

   - Better IDE support with autocompletion
   - Self-documenting code with types
   - Easier refactoring

3. **Type Safety**:
   - Ensures database operations match schema
   - Validates API requests and responses
   - Enforces correct function parameters

## 5. Authentication Flow

The authentication flow in AuthMini V4 follows these steps:

### 5.1 Registration

```
┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
│  Client  │      │  Routes  │      │ Services │      │ Database │
└────┬─────┘      └────┬─────┘      └────┬─────┘      └────┬─────┘
     │                 │                 │                 │
     │ POST /register  │                 │                 │
     │────────────────>│                 │                 │
     │                 │                 │                 │
     │                 │ registerUser()  │                 │
     │                 │────────────────>│                 │
     │                 │                 │                 │
     │                 │                 │ Hash Password   │
     │                 │                 │─────────────────│
     │                 │                 │                 │
     │                 │                 │ Create User     │
     │                 │                 │────────────────>│
     │                 │                 │                 │
     │                 │                 │  User Created   │
     │                 │                 │<────────────────│
     │                 │                 │                 │
     │                 │  User Created   │                 │
     │                 │<────────────────│                 │
     │                 │                 │                 │
     │  201 Created    │                 │                 │
     │<────────────────│                 │                 │
     │                 │                 │                 │
```

### 5.2 Login

```
┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
│  Client  │      │  Routes  │      │ Services │      │ Database │
└────┬─────┘      └────┬─────┘      └────┬─────┘      └────┬─────┘
     │                 │                 │                 │
     │  POST /login    │                 │                 │
     │────────────────>│                 │                 │
     │                 │                 │                 │
     │                 │  loginUser()    │                 │
     │                 │────────────────>│                 │
     │                 │                 │                 │
     │                 │                 │ Find User       │
     │                 │                 │────────────────>│
     │                 │                 │                 │
     │                 │                 │  User Found     │
     │                 │                 │<────────────────│
     │                 │                 │                 │
     │                 │                 │ Verify Password │
     │                 │                 │───────┐         │
     │                 │                 │       │         │
     │                 │                 │<──────┘         │
     │                 │                 │                 │
     │                 │                 │ Generate JWT    │
     │                 │                 │───────┐         │
     │                 │                 │       │         │
     │                 │                 │<──────┘         │
     │                 │                 │                 │
     │                 │  JWT + User     │                 │
     │                 │<────────────────│                 │
     │                 │                 │                 │
     │  200 + JWT      │                 │                 │
     │<────────────────│                 │                 │
     │                 │                 │                 │
```

### 5.3 Authorization

```
┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
│  Client  │      │ Middleware│      │  Routes  │      │ Services │
└────┬─────┘      └────┬─────┘      └────┬─────┘      └────┬─────┘
     │                 │                 │                 │
     │ GET /users      │                 │                 │
     │ + JWT Token     │                 │                 │
     │────────────────>│                 │                 │
     │                 │                 │                 │
     │                 │ Verify Token    │                 │
     │                 │───────┐         │                 │
     │                 │       │         │                 │
     │                 │<──────┘         │                 │
     │                 │                 │                 │
     │                 │ Check Admin Role│                 │
     │                 │───────┐         │                 │
     │                 │       │         │                 │
     │                 │<──────┘         │                 │
     │                 │                 │                 │
     │                 │ Request + User  │                 │
     │                 │────────────────>│                 │
     │                 │                 │                 │
     │                 │                 │ getUsers()      │
     │                 │                 │────────────────>│
     │                 │                 │                 │
     │                 │                 │  Users List     │
     │                 │                 │<────────────────│
     │                 │                 │                 │
     │                 │  Users List     │                 │
     │                 │<────────────────│                 │
     │                 │                 │                 │
     │  200 + Users    │                 │                 │
     │<────────────────│                 │                 │
     │                 │                 │                 │
```

## 6. Testing Architecture

AuthMini V4 implements a tiered testing strategy:

### 6.1 Backend Testing

1. **Unit Tests**:

   - Test service functions in isolation
   - Mock dependencies (database, external services)
   - Focus on business logic

2. **Integration Tests**:
   - Test API routes with real services
   - Verify HTTP handling and middleware
   - Test complete request/response flows

### 6.2 Frontend Testing

1. **Unit Tests**:
   - Test Alpine.js components
   - Mock API responses
   - Test UI state management

### 6.3 Test Organization

Tests are organized by domain and type:

```
authmini/
├── backend/
│   └── tests/
│       ├── unit/
│       │   └── user-service.test.ts
│       └── integration/
│           └── auth-routes.test.ts
└── frontend/
    └── tests/
        └── unit/
            └── app-ui.test.ts
```

## 7. Data Flow

The data flow in AuthMini V4 follows these steps:

1. **User Interaction**:

   - User interacts with the frontend SPA
   - Alpine.js components handle UI events

2. **API Request**:

   - Frontend sends typed API request via Axios
   - Request includes JWT token if authenticated

3. **Request Handling**:

   - Fastify server receives request
   - Authentication middleware verifies token
   - Routes dispatch to appropriate handlers

4. **Business Logic**:

   - Service layer executes business logic
   - Validates input data with TypeScript
   - Applies business rules

5. **Data Access**:

   - Prisma client performs database operations
   - Returns type-safe results

6. **Response**:

   - Route handler formats response
   - Response sent to client

7. **UI Update**:
   - Frontend updates UI based on response
   - Alpine.js re-renders components

## 8. Security Considerations

AuthMini V4 implements several security measures:

1. **Authentication**:

   - Password hashing with bcrypt
   - JWT tokens for stateless authentication
   - Secure token storage in localStorage

2. **Authorization**:

   - Role-based access control
   - Middleware for role verification
   - Type-safe role checking

3. **Input Validation**:

   - TypeScript interfaces for request validation
   - Service-layer validation of input data
   - Prisma schema constraints

4. **Environment Security**:
   - Environment variable validation
   - Sensitive data in .env file
   - .env.example for documentation

## 9. Deployment Architecture

AuthMini V4 is designed for deployment to Render with the following architecture:

```
┌─────────────────────────────────────────┐
│             Render Platform              │
│                                         │
│  ┌─────────────────┐   ┌──────────────┐ │
│  │   Web Service   │   │  PostgreSQL  │ │
│  │  (Node.js App)  │◄──┤   Database   │ │
│  └─────────────────┘   └──────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

### 9.1 Deployment Process

1. **Build Phase**:

   - Compile TypeScript to JavaScript
   - Generate Prisma client
   - Bundle frontend assets

2. **Database Setup**:

   - Apply Prisma migrations
   - Seed initial data

3. **Runtime Configuration**:
   - Set environment variables
   - Configure database connection
   - Set JWT secret

## 10. Future Architecture Considerations

The architecture of AuthMini V4 can be extended in several ways:

1. **Enhanced Features**:

   - User profile management
   - Settings management
   - Activity logging

2. **Architectural Improvements**:

   - Implement domain-driven design
   - Add more middleware for logging, error handling
   - Enhance test coverage

3. **Performance Optimization**:
   - Add caching layer
   - Optimize database queries
   - Implement connection pooling

## 11. Conclusion

AuthMini V4 architecture demonstrates:

1. **TypeScript Integration**: Full-stack type safety
2. **Clear Separation of Concerns**: Well-defined component boundaries
3. **Backend Database Ownership**: Database components within backend domain
4. **Testing Strategy**: Domain-specific test organization
5. **Scalable Design**: Foundation for future enhancements

The architecture balances simplicity for learning with industry best practices for type safety, maintainability, and security.
