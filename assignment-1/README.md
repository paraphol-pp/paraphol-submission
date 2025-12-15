# Assignment 1: Transaction API

## Overview
This project is a backend API for a simple personal finance application.  
Users can track their transactions, including both income and expenses, with full CRUD operations and soft delete support.

The API is built using **Node.js, Express, TypeScript, and MongoDB (Atlas)**.

---

## Tech Stack
- Node.js
- Express
- TypeScript
- MongoDB Atlas
- Mongoose
- ts-node-dev

---

## Features
- Create, Read, Update, Delete (CRUD) transactions
- Support both **income** and **expense**
- Soft delete using `deletedAt` field
- Restore deleted transactions
- Proper error handling
- Type-safe request/response using TypeScript

---

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Environment variables
### Create a .env file in the project root:
```bash
PORT=3001
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/transaction_api?retryWrites=true&w=majority&appName=Cluster0
```
Replace <username> and <password> with your MongoDB Atlas credentials.

### 3. Run the server
```bash
npm run dev
```

Server will start at:
http://localhost:3001

---

### API Usage
### Create Transaction

**POST** `/api/transactions`
```json
{
  "type": "expense",
  "amount": 45,
  "description": "กาแฟ Cafe Amazon",
  "date": "2024-01-15T08:30:00Z"
}
```
---

### Get All Transactions
**GET** `/api/transactions`
Returns all non-deleted transactions.

---

### Get Transaction by ID
**GET** `/api/transactions/:id`

---

### Update Transaction
**PATCH** `/api/transactions/:id`
```json
{
  "amount": 99,
  "description": "แก้ยอดใหม่"
}
```
---

### Soft Delete Transaction
**DELETE** `/api/transactions/:id`

---

### Restore Transaction
**POST** `/api/transactions/:id/restore`

---

### Design Decisions
- Used Express with TypeScript for simplicity and type safety
- Used MongoDB with Mongoose for flexible schema design
- Implemented soft delete using deletedAt field to allow data recovery
- Separated code into routes, models, and config for maintainability
