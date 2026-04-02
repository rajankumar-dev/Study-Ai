# 📡 API Design

## 1. Overview

This document defines the API endpoints used in the StudyAI platform.
All APIs follow RESTful principles and use JSON format for request and response.

---

## 2. Authentication APIs

### 2.1 Register User

**Endpoint:** POST /api/auth/register

**Request Body:**

```json
{
  "name": "Rajan",
  "email": "rajan@example.com",
  "password": "123456"
}
```

**Success Response:**

```json
{
  "message": "User registered successfully"
}
```

**Error Response:**

```json
{
  "error": "Email already exists"
}
```

---

### 2.2 Login User

**Endpoint:** POST /api/auth/login

**Request Body:**

```json
{
  "email": "rajan@example.com",
  "password": "123456"
}
```

**Success Response:**

```json
{
  "token": "jwt_token_here"
}
```

**Error Response:**

```json
{
  "error": "Invalid credentials"
}
```

---

## 3. Notes APIs

### 3.1 Create Note

**Endpoint:** POST /api/notes

**Headers:**
Authorization: Bearer token

**Request Body:**

```json
{
  "title": "React Notes",
  "content": "React is a JS library..."
}
```

**Success Response:**

```json
{
  "message": "Note created successfully"
}
```

---

### 3.2 Get All Notes

**Endpoint:** GET /api/notes

**Headers:**
Authorization: Bearer token

**Success Response:**

```json
[
  {
    "id": "1",
    "title": "React Notes",
    "content": "React is a JS library..."
  }
]
```

---

### 3.3 Delete Note

**Endpoint:** DELETE /api/notes/:id

**Headers:**
Authorization: Bearer token

**Success Response:**

```json
{
  "message": "Note deleted successfully"
}
```

---

## 4. AI APIs

### 4.1 Generate Summary

**Endpoint:** POST /api/ai/summary

**Headers:**
Authorization: Bearer token

**Request Body:**

```json
{
  "content": "Long text here..."
}
```

**Success Response:**

```json
{
  "summary": "Short summarized text"
}
```

---

### 4.2 Generate Questions

**Endpoint:** POST /api/ai/questions

**Request Body:**

```json
{
  "content": "Topic text..."
}
```

**Success Response:**

```json
{
  "questions": ["Q1", "Q2", "Q3"]
}
```

---

### 4.3 Chat with AI

**Endpoint:** POST /api/ai/chat

**Request Body:**

```json
{
  "query": "Explain React hooks"
}
```

**Success Response:**

```json
{
  "response": "React hooks are..."
}
```

---

## 5. Status Codes

- 200 OK → Success
- 201 Created → Resource created
- 400 Bad Request → Invalid input
- 401 Unauthorized → Invalid or missing token
- 500 Internal Server Error → Server issue

---

## 6. Error Handling

All errors follow a consistent format:

```json
{
  "error": "Error message"
}
```
