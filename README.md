# Library Management System - Backend

<!-- Live URl =  https://library-management-system-huh0.onrender.com/ -->
## Overview

The **Library Management System** is a RESTful backend application built using **Node.js**, **Express.js**, and **Neon PostgreSQL**. It provides secure authentication using JWT, role-based authorization, book management, member management, and book borrowing/return functionality.

The application supports two user roles:

* **Librarian**
* **Member**

---

# Tech Stack

* Node.js
* Express.js
* PostgreSQL (Neon)
* JWT (JSON Web Token)
* bcryptjs
* pg
* dotenv
* cors

---

# Project Structure

```
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
├── package-lock.json
└── server.js
```

---

# Features

## Authentication

* Member Registration
* User Login
* Password Hashing using bcrypt
* JWT Authentication

---

## Role-Based Authorization

### Librarian

* Add Book
* View Books
* View Book Details
* Update Book
* Delete Book
* View Members
* Delete Members

### Member

* View Books
* Borrow Book
* Return Book
* View Borrowed Books

---

# Database Schema

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

Move into the project

```bash
cd library-management-system
```

Install dependencies

```bash
npm install
```

Create a `.env` file.

Example

```env
PORT=5000

DATABASE_URL=your_neon_postgresql_connection_string

JWT_SECRET=your_secret_key
```

Run the server

```bash
npm run dev
```

Server

```
 https://library-management-system-huh0.onrender.com/
```

---

# Authentication

Login API returns a JWT token.

Use the token in every protected API.

```
Authorization

Bearer <JWT_TOKEN>
```

---

# API Endpoints

## Authentication

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

---

## Books

### Add Book

```
POST /api/books
```

(Librarian)

---

### Get All Books

```
GET /api/books
```

(Member & Librarian)

---

### Get Book By ID

```
GET /api/books/:id
```

(Member & Librarian)

---

### Update Book

```
PUT /api/books/:id
```

(Librarian)

---

### Delete Book

```
DELETE /api/books/:id
```

(Librarian)

---

## Members

### Get Members

```
GET /api/members
```

(Librarian)

---

### Delete Member

```
DELETE /api/members/:id
```

(Librarian)

---

## Borrow

### Borrow Book

```
POST /api/books/:id/borrow
```

(Member)

---

### Return Book

```
POST /api/books/:id/return
```

(Member)

---

### My Borrowed Books

```
GET /api/books/my/books
```

(Member)

---

# Business Rules

## Registration

* Users can register only as **Member**.
* Librarians are added directly into the database.

---

## Borrow Book

* Book must exist.
* Book should be available.
* Member cannot borrow the same book twice without returning it.
* Available quantity decreases after borrowing.

---

## Return Book

* Member can only return borrowed books.
* Available quantity increases after returning.
* Borrow record status changes to **returned**.

---

## Book Management

Only Librarians can

* Add Books
* Update Books
* Delete Books

---

## Member Management

Only Librarians can

* View Members
* Delete Members

---

# Environment Variables

```
PORT

DATABASE_URL

JWT_SECRET
```

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

# Future Improvements

* Request Validation
* Pagination
* Search Books
* Category Filter
* Refresh Token Authentication
* Database Transactions for Borrow/Return Operations

---

# API Testing

The APIs were tested using **Postman**.

---

# Deployment

Backend is deployed using:

* Render

---

# Author

**Aravind Guggilla**
