# Library Management System - Backend

Live URl =  https://library-management-system-huh0.onrender.com/

## Overview

The **Library Management System** is a RESTful backend application built using **Node.js**, **Express.js**, and **Neon PostgreSQL**. It provides secure authentication, role-based authorization, book management, member management, and borrowing functionality.

The application supports two user roles:

* **Librarian**
* **Member**

---

# Tech Stack

* Node.js
* Express.js
* Neon PostgreSQL
* pg
* JWT (JSON Web Token)
* bcryptjs
* dotenv
* cors

---

# Features

## Authentication

* Member Registration
* User Login
* Password Hashing using bcrypt
* JWT Authentication

---

## Authorization

### Librarian

* Add Books
* View Books
* View Book Details
* Update Books
* Delete Books
* View Members
* Delete Members

### Member

* View Books
* Borrow Books
* Return Books
* View My Borrowed Books

---

# Bonus Features

* Pagination
* Search Books by Title
* Search Books by Author
* Filter Books by Category

---

# Project Structure

```text
library-management-system
│
├── src
│   ├── config
│   │     db.js
│   │
│   ├── controllers
│   │     authController.js
│   │     bookController.js
│   │     borrowController.js
│   │     memberController.js
│   │
│   ├── database
│   │     db.js
│   │     schema.sql
│   │
│   ├── middleware
│   │     authMiddleware.js
│   │     roleMiddleware.js
│   │
│   ├── routes
│   │     authRoutes.js
│   │     bookRoutes.js
│   │     borrowRoutes.js
│   │     memberRoutes.js
│   │
│   └── services
│         authService.js
│         bookService.js
│         borrowService.js
│         memberService.js
│
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

# Database Tables

## Users

| Column     | Type      |
| ---------- | --------- |
| id         | SERIAL    |
| name       | VARCHAR   |
| email      | VARCHAR   |
| password   | TEXT      |
| role       | VARCHAR   |
| created_at | TIMESTAMP |

---

## Books

| Column             | Type      |
| ------------------ | --------- |
| id                 | SERIAL    |
| title              | VARCHAR   |
| author             | VARCHAR   |
| isbn               | VARCHAR   |
| category           | VARCHAR   |
| quantity           | INTEGER   |
| available_quantity | INTEGER   |
| created_at         | TIMESTAMP |

---

## Borrow Records

| Column      | Type      |
| ----------- | --------- |
| id          | SERIAL    |
| member_id   | INTEGER   |
| book_id     | INTEGER   |
| borrow_date | TIMESTAMP |
| return_date | TIMESTAMP |
| status      | VARCHAR   |

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to the project

```bash
cd library-management-system
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

DATABASE_URL=your_neon_database_url

JWT_SECRET=your_secret_key
```

Run the project

```bash
npm run dev
```

Server

```
http://localhost:5000
```

---

# Authentication

Login returns a JWT token.

Include the token in protected APIs.

```
Authorization: Bearer <JWT_TOKEN>
```

---

# API Endpoints

## Authentication

| Method | Endpoint           | Access |
| ------ | ------------------ | ------ |
| POST   | /api/auth/register | Public |
| POST   | /api/auth/login    | Public |

---

## Books

| Method | Endpoint       | Access            |
| ------ | -------------- | ----------------- |
| POST   | /api/books     | Librarian         |
| GET    | /api/books     | Member, Librarian |
| GET    | /api/books/:id | Member, Librarian |
| PUT    | /api/books/:id | Librarian         |
| DELETE | /api/books/:id | Librarian         |

---

## Members

| Method | Endpoint         | Access    |
| ------ | ---------------- | --------- |
| GET    | /api/members     | Librarian |
| DELETE | /api/members/:id | Librarian |

---

## Borrow

| Method | Endpoint              | Access |
| ------ | --------------------- | ------ |
| POST   | /api/books/:id/borrow | Member |
| POST   | /api/books/:id/return | Member |
| GET    | /api/books/my/books   | Member |

---

# Pagination

Retrieve books page by page.

```
GET /api/books?page=1&limit=10
```

---

# Search Books

Search by title or author.

```
GET /api/books?search=atomic
```

```
GET /api/books?search=james
```

---

# Filter by Category

```
GET /api/books?category=Programming
```

---

# Combined Example

```
GET /api/books?page=1&limit=5&search=clean&category=Programming
```

---

# Business Rules

## Registration

* Users can register only as **Member**.
* Librarian accounts are inserted directly into the database.

---

## Borrow Book

* Book must exist.
* Book must be available.
* Member cannot borrow the same book twice without returning it.
* Available quantity decreases after borrowing.

---

## Return Book

* Member can only return books they have borrowed.
* Available quantity increases after returning.
* Borrow record status changes to **returned**.

---

## Book Management

Only Librarians can:

* Add Books
* Update Books
* Delete Books

---

## Member Management

Only Librarians can:

* View Members
* Delete Members

---

# HTTP Status Codes

| Status | Description           |
| ------ | --------------------- |
| 200    | Success               |
| 201    | Created               |
| 400    | Bad Request           |
| 401    | Unauthorized          |
| 403    | Forbidden             |
| 404    | Not Found             |
| 500    | Internal Server Error |

---

# API Testing

All APIs were tested using **Postman**.

---

# Deployment

The application is deployed on:

* Render

---

# Future Enhancements

* Request Validation using express-validator
* Refresh Token Authentication
* Soft Delete
* Audit Logs
* Database Transactions
* Rate Limiting
* Swagger/OpenAPI Documentation

---

# Author

**Aravind Guggilla**
