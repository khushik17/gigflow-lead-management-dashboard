# Gigflow Smart Leads Dashboard

A robust, full-stack Lead Management System built for high-performance sales teams. This application is built using the MERN stack with strict TypeScript integration, providing a scalable and clean-architecture solution for managing sales pipelines.

## 🚀 Key Features

- **Role-Based Access Control:** Secure JWT authentication separating `Admin` and `Sales` users. Admins have full access including analytics and deletion, while Sales users focus on pipeline management.
- **Advanced Filtering & Search:** True database-level (backend) pagination, debounced real-time search, and multi-field filtering (Status, Source, Sort).
- **Actionable Analytics:** Dynamic visual charts (Recharts) displaying win rates, pipeline health, and lead distribution.
- **CSV Data Export:** One-click functionality to export filtered lead data directly to a `.csv` file.
- **Premium UI/UX:** Responsive, glassmorphism-inspired interface featuring a custom Parallax Landing Page, mobile-friendly navigation, and a dynamic Light/Dark mode toggle.
- **Production Ready:** Fully containerized with Docker and strictly typed with TypeScript/Zod.

---

## 🛠️ Technology Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Lucide Icons, Recharts, React Router
- **Backend:** Node.js, Express.js, TypeScript, Mongoose
- **Database:** MongoDB
- **Security:** bcrypt, jsonwebtoken (JWT), Zod (Request Validation)
- **Deployment:** Docker, Docker Compose

---

## ⚙️ Setup Instructions

There are two ways to run this project locally: via **Docker (Recommended)** or via **Local Development Server**.

### Method 1: Running with Docker (Recommended)

This method ensures you don't need to install MongoDB locally. Docker will spin up the Frontend, Backend, and Database simultaneously.

1. **Prerequisites:** Ensure you have [Docker](https://www.docker.com/) and Docker Compose installed.
2. **Environment Variables:**
   Rename `.env.example` to `.env` in the root directory.
3. **Run Docker Compose:**
   ```bash
   docker-compose up --build
   ```
4. **Access the App:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api`

### Method 2: Local Development (Without Docker)

1. **Prerequisites:** Ensure you have [Node.js](https://nodejs.org/) and a local instance of [MongoDB](https://www.mongodb.com/) running.
2. **Environment Variables:**
   Rename `.env.example` to `.env`. Ensure `MONGODB_URI` points to your local database (e.g., `mongodb://localhost:27017/smart-leads`).
3. **Install Dependencies:**
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```
4. **Run the Development Servers:**
   ```bash
   # In terminal 1 (Backend)
   cd server
   npm run dev

   # In terminal 2 (Frontend)
   cd client
   npm run dev
   ```

---

## 📚 API Documentation

Detailed API documentation regarding endpoints, expected payloads, and authentication headers can be found in the [API_DOCS.md](./API_DOCS.md) file.

---

## 🧪 Testing Credentials

To test the Role-Based Access Control, you can register new users, or use these examples (if you create them):

**Admin User:**
- Role: `Admin`
- Capabilities: View all analytics, delete leads, full CRUD.

**Sales User:**
- Role: `Sales`
- Capabilities: Create, read, and update leads. Restricted from deletion and global analytics.
