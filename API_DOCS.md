# Gigflow API Documentation

This document outlines the RESTful API endpoints for the Smart Leads Dashboard. All routes (except Authentication) require a valid JWT Bearer Token.

---

## 🔐 Authentication

### 1. Register a new user
- **Endpoint:** `POST /api/auth/register`
- **Access:** Public
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword",
    "role": "admin" // or "sales"
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "user": { "id": "...", "name": "...", "email": "...", "role": "admin" },
      "token": "eyJhbGciOiJIUzI1..."
    }
  }
  ```

### 2. Login User
- **Endpoint:** `POST /api/auth/login`
- **Access:** Public
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Success Response (200 OK):** Returns User object and JWT token.

---

## 👥 Leads Management

> **Header Required:** `Authorization: Bearer <your_jwt_token>`

### 1. Get Paginated Leads
- **Endpoint:** `GET /api/leads`
- **Access:** Admin & Sales
- **Query Parameters:**
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10)
  - `search` (optional): Search by name or email
  - `status` (optional): Filter by status (`New`, `Contacted`, `Qualified`, `Lost`)
  - `source` (optional): Filter by source (`Website`, `Referral`, `Partner`, `Cold Call`)
  - `sortBy` (optional): `latest` or `oldest`
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "60d5ecb8b392d7... ",
        "name": "Acme Corp",
        "email": "contact@acme.com",
        "status": "New",
        "source": "Website"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 45,
      "totalPages": 5
    }
  }
  ```

### 2. Get Single Lead
- **Endpoint:** `GET /api/leads/:id`
- **Access:** Admin & Sales

### 3. Create Lead
- **Endpoint:** `POST /api/leads`
- **Access:** Admin & Sales
- **Body:**
  ```json
  {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "1234567890",
    "status": "New",
    "source": "Referral"
  }
  ```

### 4. Update Lead
- **Endpoint:** `PUT /api/leads/:id`
- **Access:** Admin & Sales
- **Body:** Any valid lead fields (Partial update allowed).

### 5. Delete Lead
- **Endpoint:** `DELETE /api/leads/:id`
- **Access:** **Admin Only**
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Lead deleted successfully"
  }
  ```

---

## 📊 Analytics & Export

### 1. Get Admin Analytics
- **Endpoint:** `GET /api/leads/analytics`
- **Access:** **Admin Only**
- **Success Response (200 OK):** Returns aggregated data for dashboard charts (Total, Conversion Rate, Status Breakdown).

### 2. Export Leads to CSV
- **Endpoint:** `GET /api/leads/export/csv`
- **Access:** Admin & Sales
- **Query Parameters:** Accepts the same filter parameters as `GET /api/leads`.
- **Response:** Triggers a `.csv` file download.
