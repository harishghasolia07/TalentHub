# TalentHub - Complete Project Documentation

## 📋 **Project Overview**

A full-stack recruitment platform prototype built with **Next.js 13+**, **TypeScript**, **TailwindCSS**, and **MongoDB**. This prototype demonstrates core full-stack features including secure authentication, protected routes, and profile management.

## 📑 **Table of Contents**

1. [Code Repository Structure](#1-code-repository-structure)
2. [Getting Started](#2-getting-started)
3. [API Documentation](#3-api-documentation)
4. [Database Schema](#4-database-schema)
5. [Technical Architecture](#5-technical-architecture)
6. [**Authentication and Security Measures**](#6-authentication-and-security-measures) ⭐
7. [**Error-Handling Approach**](#7-error-handling-approach) ⭐
8. [**Suggestions for Scaling or Improving the System**](#8-suggestions-for-scaling-or-improving-the-system) ⭐
9. [Features](#9-features)
10. [Recent Updates](#10-recent-updates)
11. [Support and Contributing](#11-support-and-contributing)
12. [License](#12-license)

> **⭐ Key Deliverable Sections:** The three starred sections above directly address the main deliverable requirements.

---

## 🗂️ **1. Code Repository Structure**

```
TalentHub/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 api/               # Backend API routes
│   │   ├── 📁 auth/          # Authentication endpoints
│   │   │   ├── login/route.ts
│   │   │   └── register/route.ts
│   │   └── 📁 user/          # User management endpoints
│   │       ├── profile/route.ts
│   │       ├── change-password/route.ts
│   │       └── delete-account/route.ts
│   ├── 📁 login/             # Login page
│   ├── 📁 register/          # Registration page
│   ├── 📁 profile/           # Protected profile page
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── 📁 components/            # Reusable React components
│   ├── AuthForm.tsx          # Authentication form
│   ├── AuthAwareLink.tsx     # Smart navigation component
│   └── 📁 ui/               # shadcn/ui components
├── 📁 lib/                   # Utility libraries
│   ├── auth.ts               # Server-side JWT utilities
│   ├── clientAuth.ts         # Client-side auth utilities
│   ├── mongodb.ts            # Database connection
│   ├── schemas.ts            # Zod validation schemas
│   └── validation.ts         # Input validation
├── 📁 models/                # Mongoose models
│   └── User.ts               # User data model
├── 📁 types/                 # TypeScript definitions
├── 📄 README.md              # Project documentation
├── 📄 package.json           # Dependencies and scripts
└── 📄 .env.example           # Environment variables template
```

---

## 🚀 **2. Getting Started**

### **Prerequisites**
- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/harishghasolia07/TalentHub.git
   cd TalentHub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB connection string
   MONGODB_URI=mongodb://localhost:27017/talenthub
   # For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/talenthub

   # JWT secret key for signing tokens
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

   # Next.js URL (for development)
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Build Commands**
```bash
npm run build        # Build for production
npm run start        # Start production server
npm run typecheck    # Run TypeScript type checking
npm run lint         # Run ESLint
```

---

## 📚 **3. API Documentation**

### **Base URL**
```
http://localhost:3000/api
```

### **Authentication Endpoints**

#### **POST /api/auth/register**
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-09-27T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Invalid input validation
- `409` - Email already registered

#### **POST /api/auth/login**
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-09-27T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Invalid input
- `401` - Invalid credentials

### **User Management Endpoints**

#### **GET /api/user/profile**
Get authenticated user's profile data.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-09-27T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `403` - Unauthorized (missing/invalid token)
- `404` - User not found

#### **PUT /api/user/profile**
Update user profile information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "Updated Name"
}
```

**Success Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Updated Name",
    "email": "john@example.com",
    "createdAt": "2025-09-27T10:30:00.000Z"
  }
}
```

#### **PUT /api/user/change-password**
Change user password.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}
```

**Success Response (200):**
```json
{
  "message": "Password changed successfully"
}
```

#### **DELETE /api/user/delete-account**
Delete user account permanently.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response (200):**
```json
{
  "message": "Account deleted successfully"
}
```

### **Client-Side Authentication Utilities**

The application includes comprehensive client-side authentication utilities in `lib/clientAuth.ts`:

#### `isAuthenticated(): boolean`
Checks if the user has a valid, non-expired JWT token in localStorage.

#### `isTokenExpired(token: string): boolean`
Validates if a JWT token has expired by decoding the payload.

#### `logout(): void`
Centralized logout function that cleans up all authentication data.

#### `getTokenExpirationTime(token: string): number | null`
Returns the remaining time until token expires in minutes.

**Usage Example:**
```typescript
import { isAuthenticated, logout } from '@/lib/clientAuth';

if (isAuthenticated()) {
  // User has valid token
} else {
  // Redirect to login
}

// Logout user
logout();
```

### **Authentication Flow**

1. **Register:** POST `/api/auth/register` with user details
2. **Login:** POST `/api/auth/login` to get JWT token (1-hour expiration)
3. **Store Token:** Save token in localStorage as `auth_token`
4. **Protected Requests:** Include `Authorization: Bearer <token>` header
5. **Token Validation:** Client-side utilities automatically check expiration
6. **Auto Cleanup:** Expired tokens are automatically removed

---

## 🗄️ **4. Database Schema**

### **Database: TalentHub (MongoDB)**

#### **User Collection Schema**
```typescript
interface User {
  _id: ObjectId;                    // MongoDB unique identifier
  name: string;                     // User's display name
  email: string;                    // Unique email address
  passwordHash: string;             // bcrypt hashed password
  createdAt: Date;                  // Account creation timestamp
  updatedAt: Date;                  // Last update timestamp
}
```

#### **Mongoose Schema Definition**
```typescript
import { Schema, model } from 'mongoose';
import validator from 'validator';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  }
}, { 
  timestamps: true // Automatically adds createdAt and updatedAt
});

export const User = model('User', userSchema);
```

#### **Database Indexes**
- **Primary Index:** `{ "_id": 1 }` (automatic)
- **Unique Email Index:** `{ "email": 1 }` (ensures email uniqueness)
- **Text Search Index:** `{ "name": "text" }` (for user search)

#### **Sample Document**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "John Doe",
  "email": "john@example.com",
  "passwordHash": "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj8qUwm/VKJe",
  "createdAt": ISODate("2025-09-27T10:30:00.000Z"),
  "updatedAt": ISODate("2025-09-27T10:30:00.000Z")
}
```

---

## 🏗️ **5. Technical Architecture**

### **Architectural Choices**

#### **Next.js 13+ with App Router**
**Rationale:** Full-stack capabilities in a single codebase
- **Server Components:** Improved performance with reduced client-side JavaScript
- **API Routes:** Built-in backend functionality without separate server
- **File-based Routing:** Intuitive routing structure with co-located layouts
- **TypeScript Integration:** First-class TypeScript support

#### **MongoDB with Mongoose**
**Rationale:** NoSQL flexibility perfect for rapid prototyping
- **Schema Evolution:** Easy to modify data structures as requirements grow
- **JSON-native:** Natural fit with JavaScript/TypeScript ecosystem
- **Horizontal Scaling:** Built-in sharding capabilities
- **Rich Ecosystem:** Extensive tooling and community support

#### **JWT Authentication**
**Rationale:** Stateless authentication that scales horizontally
- **Stateless:** No server-side session storage required
- **Scalable:** Works across multiple server instances
- **Self-contained:** Tokens carry all necessary user information
- **Industry Standard:** Well-established security practices

#### **TypeScript Throughout**
**Rationale:** Type safety reduces bugs and improves maintainability
- **Compile-time Validation:** Catch errors before runtime
- **IDE Support:** Enhanced autocomplete and refactoring
- **API Contracts:** Clear interfaces between frontend/backend
- **Team Collaboration:** Self-documenting code structure

### **Technology Stack**
- **Frontend:** Next.js 13+, TypeScript, TailwindCSS, shadcn/ui
- **Backend:** Next.js API Routes, Node.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT, bcrypt
- **Styling:** TailwindCSS, CSS Modules
- **Validation:** Zod for runtime type validation

---

## 🔒 **6. Authentication and Security Measures**

### **Password Security**
- **bcrypt Hashing:** Industry-standard password hashing (12 salt rounds)
- **Minimum Requirements:** 6-character minimum password length
- **Salt Generation:** Unique salt per password prevents rainbow table attacks

### **JWT Token Security**
- **Short Expiration:** 1-hour token lifespan reduces exposure window
- **Environment Secrets:** JWT signing key stored in environment variables
- **Client-side Validation:** Automatic token expiration checking
- **Automatic Cleanup:** Expired tokens removed from localStorage

### **API Security**
- **Route Protection:** Middleware validates tokens on protected endpoints
- **Input Validation:** Zod schemas validate all incoming data
- **Error Sanitization:** Generic error messages prevent information leakage
- **CORS Configuration:** Proper cross-origin request handling

### **Advanced Security Features**
- **Authentication-aware Navigation:** Prevents unnecessary login page access
- **Token Expiration Validation:** Client-side JWT payload decoding
- **Centralized Logout:** Consistent token cleanup across application

---

## ⚠️ **7. Error-Handling Approach**

### **Client-Side Error Handling**
```typescript
try {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Something went wrong');
  }
} catch (error) {
  setError(error.message);
  toast.error(error.message);
}
```

### **Server-Side Error Handling**
```typescript
// Standardized API error responses
export function createAuthResponse(message: string, status: number = 401) {
  return Response.json({ error: message }, { status });
}

// Validation error handling
const validation = userSchema.safeParse(body);
if (!validation.success) {
  return Response.json({
    error: 'Invalid input',
    details: validation.error.issues.map(issue => ({
      field: issue.path.join('.'),
      message: issue.message
    }))
  }, { status: 400 });
}
```

### **Error Response Standards**
All errors follow this format:
```json
{
  "error": "Error message description",
  "details": [
    {
      "field": "fieldName",
      "message": "Specific field error"
    }
  ]
}
```

**Common Error Codes:**
- `400` - Invalid input validation
- `401` - Invalid credentials
- `403` - Unauthorized (missing/invalid token)
- `404` - Resource not found  
- `409` - Conflict (email already registered)

---

## 🚀 **8. Suggestions for Scaling or Improving the System**

### **Performance Optimizations**

#### **Database Indexing**
```javascript
// Compound indexes for complex queries
userSchema.index({ email: 1, createdAt: -1 });
userSchema.index({ name: "text" }); // Text search
```

#### **Caching Strategy**
```typescript
// Redis for session caching
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

// Cache user profiles
await redis.setex(`user:${userId}`, 3600, JSON.stringify(user));
```

#### **CDN Integration**
- Static asset optimization
- Global content delivery
- Image optimization and lazy loading

### **Security Enhancements**

#### **Refresh Token Implementation**
```typescript
interface TokenPair {
  accessToken: string;  // Short-lived (15 minutes)
  refreshToken: string; // Long-lived (7 days)
}
```

#### **Rate Limiting**
```typescript
// API rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many login attempts'
});
```

#### **Additional Security Headers**
```typescript
// Security headers middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"]
    }
  }
}));
```

### **Architecture Evolution**

#### **Microservices Migration**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Auth Service  │    │  User Service   │    │   Job Service   │
│   (Port 3001)   │    │   (Port 3002)   │    │   (Port 3003)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │                        │
        └────────────────────────┼────────────────────────┘
                                │
              ┌─────────────────┐
              │  API Gateway    │
              │   (Port 3000)   │
              └─────────────────┘
```

#### **Database Scaling**
```typescript
// Read replicas for read-heavy operations
const readDB = mongoose.createConnection(MONGODB_READ_URL);
const writeDB = mongoose.createConnection(MONGODB_WRITE_URL);

// Sharding for large datasets
const shardKey = { userId: 1, createdAt: 1 };
```

#### **Container Orchestration**
```dockerfile
# Docker containerization
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### **Advanced Features Roadmap**

#### **Real-time Communication**
- WebSocket integration for live notifications
- Server-sent events for status updates

#### **Advanced Authentication**
- OAuth integration (Google, LinkedIn)
- Multi-factor authentication (2FA)
- Single Sign-On (SSO) support

#### **Analytics and Monitoring**
- Application performance monitoring
- User behavior analytics
- Error tracking and alerting

#### **Mobile Support**
- Progressive Web App (PWA) features
- Mobile-responsive design improvements
- Native mobile app consideration

---

## 🎯 **9. Features**

### **Core Features**
- **Secure Authentication System**
  - User registration with validation
  - Login with JWT token generation (1-hour expiration)
  - Client-side token validation and automatic cleanup
  - Protected routes with authentication-aware navigation
  - Password hashing with bcrypt

- **Modern Frontend**
  - Next.js 13+ with App Router
  - TypeScript for type safety
  - TailwindCSS for responsive design
  - shadcn/ui component library
  - Custom SVG favicon with professional design

- **Robust Backend**
  - RESTful API endpoints
  - MongoDB with Mongoose ODM
  - Comprehensive error handling
  - Input validation and sanitization

### **Enhanced Features**
- **Profile Management** - Full CRUD operations for user profiles
- **Smart Navigation** - Authentication-aware routing components
- **Professional UI** - Responsive design with modern components
- **Security** - Client-side token validation with automatic expiration handling

---

## 📅 **10. Recent Updates**

### **Latest Improvements (September 2025)**
- **JWT Token Validation**: Implemented comprehensive client-side token validation with automatic expiration checking
- **Smart Authentication**: Added authentication-aware navigation components that prevent unnecessary redirects
- **Favicon Fix**: Created professional SVG favicon with briefcase design matching the platform theme
- **Token Cleanup**: Automatic removal of expired tokens from localStorage for enhanced security
- **Build Optimization**: Resolved module caching issues and optimized development workflow

### **Security Enhancements**
- Client-side token expiration validation prevents API calls with expired tokens
- Automatic logout when tokens expire for seamless user experience
- Centralized authentication utilities for consistent behavior across components

---

## 📞 **11. Support and Contributing**

### **Getting Help**
For questions or support, please:
1. Check the documentation sections above
2. Review the code comments and examples
3. Open an issue in the GitHub repository

### **Contributing**
1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request with detailed description

### **Development Commands**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run typecheck    # Run TypeScript checking
npm run lint         # Run ESLint
npm run lint --fix   # Fix linting issues
```

---

## 📝 **12. License**

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Project Repository:** [TalentHub](https://github.com/harishghasolia07/TalentHub)  
**Built with:** Next.js 13+, TypeScript, MongoDB, TailwindCSS  
**Completion Date:** September 27, 2025  

**Built with ❤️ using Next.js, TypeScript, and MongoDB**