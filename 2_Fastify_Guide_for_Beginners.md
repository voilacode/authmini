# Comprehensive Fastify Guide for Beginners

This document provides a detailed, beginner-friendly guide to **Fastify**, a high-performance web framework for Node.js. It assumes basic JavaScript knowledge (variables, functions, objects, async/await, modules) and focuses on teaching Fastify's core features, setup, and practical usage. The guide includes explanations, structured code examples, and steps to build a small Fastify application. A clickable table of contents helps navigate the content.

---

## Table of Contents

- [1. Introduction to Fastify](#1-introduction-to-fastify)
- [2. Setting Up a Fastify Project](#2-setting-up-a-fastify-project)
- [3. Core Concepts](#3-core-concepts)
  - [3.1 Routes](#31-routes)
  - [3.2 Request and Reply Objects](#32-request-and-reply-objects)
  - [3.3 Middleware (Hooks)](#33-middleware-hooks)
  - [3.4 Plugins](#34-plugins)
  - [3.5 Validation and Schemas](#35-validation-and-schemas)
- [4. Building a Sample Fastify API](#4-building-a-sample-fastify-api)
- [5. Error Handling](#5-error-handling)
- [6. Testing Fastify Applications](#6-testing-fastify-applications)
- [7. Deploying a Fastify Application](#7-deploying-a-fastify-application)
- [8. Best Practices](#8-best-practices)
- [9. References for Further Learning](#9-references-for-further-learning)

---

## 1. Introduction to Fastify

**Fastify** is a Node.js web framework designed for performance and low overhead. It’s ideal for building APIs and web servers, offering a plugin-based architecture, JSON schema validation, and excellent developer experience.

- **Why Use Fastify?**
  - **Speed**: One of the fastest Node.js frameworks due to its efficient request handling.
  - **Extensibility**: Plugins make it easy to add features like databases or authentication.
  - **Schema Validation**: Built-in support for JSON schemas ensures robust input validation.
  - **Developer-Friendly**: Clear documentation and TypeScript support.
- **Use Cases**:
  - RESTful APIs (e.g., user management, e-commerce).
  - Microservices.
  - Real-time applications with WebSockets (via plugins).

**Prerequisites**:

- Basic JavaScript (variables, functions, objects, async/await, modules).
- Node.js installed (LTS version recommended).
- A code editor like Visual Studio Code.

---

## 2. Setting Up a Fastify Project

To start using Fastify, set up a Node.js project and install the Fastify package.

**Steps**:

1. **Install Node.js**: Download from [nodejs.org](https://nodejs.org/) and verify:
   ```bash
   node --version
   npm --version
   ```
2. **Create a Project**:
   ```bash
   mkdir fastify-app
   cd fastify-app
   npm init -y
   ```
3. **Install Fastify**:
   ```bash
   npm install fastify
   ```
4. **Create a Basic Server** (save as `server.js`):

   ```javascript
   // server.js
   import Fastify from 'fastify';

   const fastify = Fastify({ logger: true });

   // Define a route
   fastify.get('/', async (request, reply) => {
     return { message: 'Hello, Fastify!' };
   });

   // Start the server
   const start = async () => {
     try {
       await fastify.listen({ port: 3000 });
       console.log('Server running at http://localhost:3000');
     } catch (err) {
       fastify.log.error(err);
       process.exit(1);
     }
   };

   start();
   ```

5. **Run the Server**:
   ```bash
   node server.js
   ```
6. **Test It**: Open `http://localhost:3000` in a browser or use a tool like [Postman](https://www.postman.com/) to see:
   ```json
   { "message": "Hello, Fastify!" }
   ```

**Explanation**:

- `Fastify({ logger: true })` creates a server with logging enabled.
- `fastify.get` defines a route for HTTP GET requests.
- `fastify.listen` starts the server on port 3000.
- Use `async/await` for clean asynchronous code.

---

## 3. Core Concepts

Fastify’s power comes from its core features. This section explains routes, request/reply objects, middleware, plugins, and validation.

### 3.1 Routes

Routes map HTTP methods (GET, POST, etc.) and URLs to handler functions.

**Example**:

```javascript
// GET route
fastify.get('/users', async (request, reply) => {
  return [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];
});

// POST route
fastify.post('/users', async (request, reply) => {
  const newUser = request.body;
  return { message: 'User added', user: newUser };
});
```

**Explanation**:

- Routes use HTTP methods: `get`, `post`, `put`, `delete`, etc.
- Handlers are `async` functions returning JSON.
- `request.body` contains data sent in POST requests (requires a body parser, included in Fastify by default for JSON).

**Test the POST Route** (using Postman or curl):

```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"Charlie"}' http://localhost:3000/users
```

Output:

```json
{ "message": "User added", "user": { "name": "Charlie" } }
```

### 3.2 Request and Reply Objects

The `request` and `reply` objects manage incoming requests and outgoing responses.

- **Request**: Contains data like URL, headers, body, and query parameters.
- **Reply**: Controls the response (status code, headers, payload).

**Example**:

```javascript
fastify.get('/greet/:name', async (request, reply) => {
  const { name } = request.params;
  const { greeting = 'Hello' } = request.query;
  reply.header('X-Custom-Header', 'Fastify');
  return { message: `${greeting}, ${name}!` };
});
```

**Test It**:

- URL: `http://localhost:3000/greet/Alice?greeting=Hi`
- Output: `{ "message": "Hi, Alice!" }`

**Explanation**:

- `request.params`: Captures URL parameters (e.g., `:name` becomes `request.params.name`).
- `request.query`: Captures query strings (e.g., `?greeting=Hi`).
- `reply.header`: Sets custom response headers.
- Fastify automatically sets `Content-Type: application/json` for objects.

### 3.3 Middleware (Hooks)

Hooks are middleware functions that run at specific points in the request lifecycle (e.g., before or after a handler).

**Example**:

```javascript
// Pre-handler hook
fastify.addHook('onRequest', async (request, reply) => {
  console.log(`Received request to ${request.url}`);
});

// Route-specific hook
fastify.get(
  '/protected',
  {
    preHandler: async (request, reply) => {
      const auth = request.headers.authorization;
      if (!auth) {
        reply.code(401).send({ error: 'Unauthorized' });
      }
    },
  },
  async (request, reply) => {
    return { message: 'Access granted' };
  }
);
```

**Explanation**:

- `onRequest` runs for all requests.
- `preHandler` runs before a specific route’s handler.
- Hooks are ideal for authentication, logging, or modifying requests.
- Use `reply.code` to set HTTP status codes.

### 3.4 Plugins

Plugins modularize functionality, keeping code organized and reusable.

**Example**:

```javascript
// plugins/db.js
export default async function (fastify, opts) {
  fastify.decorate('db', {
    getUsers: () => [{ id: 1, name: 'Alice' }],
  });
}

// server.js
import Fastify from 'fastify';
import dbPlugin from './plugins/db.js';

const fastify = Fastify({ logger: true });
fastify.register(dbPlugin);

fastify.get('/users', async (request, reply) => {
  const users = fastify.db.getUsers();
  return users;
});

fastify.listen({ port: 3000 }).catch(console.error);
```

**Explanation**:

- `fastify.register` loads a plugin.
- `fastify.decorate` adds custom methods or properties (e.g., `fastify.db`).
- Plugins encapsulate logic (e.g., database connections, utilities).
- Save plugins in a `plugins/` folder for organization.

### 3.5 Validation and Schemas

Fastify uses JSON schemas to validate request data (query, params, body).

**Example**:

```javascript
fastify.post(
  '/users',
  {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'age'],
        properties: {
          name: { type: 'string', minLength: 2 },
          age: { type: 'integer', minimum: 18 },
        },
      },
    },
  },
  async (request, reply) => {
    return { message: 'User created', user: request.body };
  }
);
```

**Test It**:

- Valid: `curl -X POST -H "Content-Type: application/json" -d '{"name":"Alice","age":25}' http://localhost:3000/users`
- Invalid: `curl -X POST -H "Content-Type: application/json" -d '{"name":"A","age":17}' http://localhost:3000/users`

**Explanation**:

- Schemas define expected data structure and constraints.
- Invalid data triggers a 400 Bad Request response.
- Schemas improve security and performance (Fastify compiles them for speed).

---

## 4. Building a Sample Fastify API

Let’s build a simple user management API with CRUD operations (Create, Read, Update, Delete).

**Code** (save as `server.js`):

```javascript
import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

// In-memory "database"
const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
];

// GET all users
fastify.get('/users', async (request, reply) => {
  return users;
});

// GET user by ID
fastify.get('/users/:id', async (request, reply) => {
  const { id } = request.params;
  const user = users.find((u) => u.id === parseInt(id));
  if (!user) {
    reply.code(404).send({ error: 'User not found' });
  }
  return user;
});

// POST new user
fastify.post(
  '/users',
  {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'age'],
        properties: {
          name: { type: 'string', minLength: 2 },
          age: { type: 'integer', minimum: 18 },
        },
      },
    },
  },
  async (request, reply) => {
    const { name, age } = request.body;
    const id = users.length + 1;
    const newUser = { id, name, age };
    users.push(newUser);
    reply.code(201).send(newUser);
  }
);

// PUT update user
fastify.put(
  '/users/:id',
  {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'age'],
        properties: {
          name: { type: 'string', minLength: 2 },
          age: { type: 'integer', minimum: 18 },
        },
      },
    },
  },
  async (request, reply) => {
    const { id } = request.params;
    const { name, age } = request.body;
    const userIndex = users.findIndex((u) => u.id === parseInt(id));
    if (userIndex === -1) {
      reply.code(404).send({ error: 'User not found' });
    }
    users[userIndex] = { id: parseInt(id), name, age };
    return users[userIndex];
  }
);

// DELETE user
fastify.delete('/users/:id', async (request, reply) => {
  const { id } = request.params;
  const userIndex = users.findIndex((u) => u.id === parseInt(id));
  if (userIndex === -1) {
    reply.code(404).send({ error: 'User not found' });
  }
  users.splice(userIndex, 1);
  reply.code(204).send();
});

// Start server
fastify.listen({ port: 3000 }).catch(console.error);
```

**Steps to Run**:

1. Initialize project and install Fastify (see [Section 2](#2-setting-up-a-fastify-project)).
2. Save the code as `server.js`.
3. Run: `node server.js`.
4. Test endpoints using Postman or curl:
   - GET `http://localhost:3000/users` → List all users.
   - GET `http://localhost:3000/users/1` → Get user with ID 1.
   - POST `http://localhost:3000/users` with `{"name":"Charlie","age":28}` → Create user.
   - PUT `http://localhost:3000/users/1` with `{"name":"Alice","age":26}` → Update user.
   - DELETE `http://localhost:3000/users/1` → Delete user.

**Explanation**:

- Uses an in-memory array (`users`) as a mock database.
- Implements CRUD operations with proper status codes (201, 204, 404).
- Includes schema validation for POST and PUT.
- Demonstrates route parameters (`:id`) and error handling.

---

## 5. Error Handling

Fastify provides robust error handling for invalid requests, server errors, or custom errors.

**Example**:

```javascript
// Custom error handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.code(error.statusCode || 500).send({
    error: error.message || 'Internal Server Error',
  });
});

// Route with custom error
fastify.get('/fail', async (request, reply) => {
  throw new Error('Something went wrong');
});
```

**Explanation**:

- `setErrorHandler` catches all unhandled errors.
- Custom errors can be thrown in routes.
- Fastify automatically handles validation errors (e.g., schema violations).
- Use `fastify.log` for debugging.

---

## 6. Testing Fastify Applications

Testing ensures your API works as expected. Use **Tap** (Fastify’s recommended test framework).

**Steps**:

1. Install Tap:
   ```bash
   npm install --save-dev tap
   ```
2. Create a test file (`test/server.test.js`):

   ```javascript
   const tap = require('tap');
   const Fastify = require('fastify');

   tap.test('GET /users route', async (t) => {
     const fastify = Fastify();
     fastify.get('/users', async () => [{ id: 1, name: 'Alice' }]);

     const response = await fastify.inject({
       method: 'GET',
       url: '/users',
     });

     t.equal(response.statusCode, 200);
     t.same(response.json(), [{ id: 1, name: 'Alice' }]);
     t.end();
   });
   ```

3. Run tests:
   ```bash
   npx tap test/server.test.js
   ```

**Explanation**:

- `fastify.inject` simulates HTTP requests without starting a server.
- `tap` provides assertions like `t.equal` and `t.same`.
- Test routes, status codes, and response data.

---

## 7. Deploying a Fastify Application

Deploy your Fastify app to a platform like **Render**, **Heroku**, or **Vercel**.

**Example (Render)**:

1. Push your code to a GitHub repository.
2. Create a new Web Service on [Render](https://render.com/).
3. Configure:
   - Environment: Node.
   - Build Command: `npm install`.
   - Start Command: `node server.js`.
4. Deploy and access your app at the provided URL.

**Tips**:

- Use environment variables for configuration (e.g., port, database URL).
  ```javascript
  fastify.listen({ port: process.env.PORT || 3000 });
  ```
- Install a process manager like `pm2` for production:
  ```bash
  npm install pm2
  pm2 start server.js
  ```

---

## 8. Best Practices

- **Modularize Code**: Use plugins and separate route files.
- **Validate Inputs**: Always use schemas for query, params, and body.
- **Handle Errors**: Implement custom error handlers and log errors.
- **Optimize Performance**: Leverage Fastify’s schema compilation and avoid heavy middleware.
- **Secure Your App**: Use plugins like `@fastify/helmet` for security headers.
- **Test Thoroughly**: Write tests for all routes and edge cases.
- **Use TypeScript**: For larger projects, consider Fastify’s TypeScript support.

---

## 9. References for Further Learning

- **Fastify**:
  - [Fastify Documentation](https://fastify.dev/docs/latest/) - Official guide.
  - [Fastify Ecosystem](https://fastify.dev/ecosystem/) - Plugins for databases, auth, etc.
  - [Fastify GitHub](https://github.com/fastify/fastify) - Source code and issues.
- **Node.js**:
  - [Node.js Guide](https://nodejs.org/en/docs/) - Learn Node.js basics.
  - [npm](https://www.npmjs.com/) - Package manager.
- **Tools**:
  - [Postman](https://www.postman.com/) - Test APIs.
  - [VS Code](https://code.visualstudio.com/) - Code editor.
  - [Render](https://render.com/) - Deployment platform.
- **JavaScript**:
  - [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - JavaScript reference.
  - [JavaScript.info](https://javascript.info/) - Tutorials.

---

This guide covers Fastify’s essentials, from setup to building and deploying an API. Practice by extending the sample API (e.g., add a database with `@fastify/postgres`), explore plugins, and refer to the documentation for advanced features. Happy coding!
