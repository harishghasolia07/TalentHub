# Recruitment Platform Prototype

A full-stack recruitment platform prototype built with **Next.js 13+**, **TypeScript**, **TailwindCSS**, and **MongoDB**. This prototype demonstrates core full-stack features including secure authentication, protected routes, and profile management, and can be extended into a complete recruitment platform.

## 🎯 Project Scope

This is a **prototype** built to demonstrate essential full-stack development skills:
- User registration and authentication system
- Protected routes and middleware implementation  
- Profile management with CRUD operations
- Modern responsive UI design
- RESTful API development
- Database integration and security best practices

The foundation is designed to be scalable and can be extended with additional recruitment-specific features like job postings, applications, and candidate management.

## 🏗️ Architectural Choices

**Next.js 13+ with App Router**: Chosen for its full-stack capabilities, allowing both frontend and backend in a single codebase. The App Router provides better performance and developer experience with server components and improved routing.

**MongoDB with Mongoose**: Selected for rapid prototyping and flexibility. NoSQL structure allows easy schema evolution as requirements grow, perfect for a recruitment platform that may need diverse data structures.

**JWT Authentication**: Stateless authentication approach that scales well and works seamlessly with modern frontend frameworks. Tokens are self-contained and don't require server-side session storage.

**TypeScript**: Ensures type safety across the entire stack, reducing runtime errors and improving code maintainability - crucial for a platform handling sensitive user data.

## 🚀 Features

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

- **Security Best Practices**
  - JWT tokens with 1-hour expiration and client-side validation
  - Automatic token cleanup for expired tokens
  - bcrypt password hashing (12 rounds)
  - Environment variable configuration
  - Protected API routes with authentication middleware

## 🛠️ Technology Stack

- **Frontend:** Next.js 13+, TypeScript, TailwindCSS, shadcn/ui
- **Backend:** Next.js API Routes, Node.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT, bcrypt
- **Styling:** TailwindCSS, CSS Modules
- **Validation:** Zod for runtime type validation and schema validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/recruitment-platform
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/recruitment-platform

# JWT secret key for signing tokens (use a strong, random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Next.js URL (for development)
NEXTAUTH_URL=http://localhost:3000
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd recruitment-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Fill in your MongoDB connection string and JWT secret

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

## 📚 Complete Documentation

> **📋 For comprehensive documentation including deliverables, API endpoints, database schema, architecture details, and scaling suggestions, see:**
> 
> **➡️ [DOCUMENTATION.md](./DOCUMENTATION.md)**
> 
> This includes:
> - 🗂️ Complete project structure and setup instructions
> - 📚 Full API documentation with examples
> - 🗄️ Database schema and operations
> - 🏗️ Architectural choices and technical decisions
> - 🔒 Security measures and authentication flow
> - ⚠️ Error handling approach
> - 🚀 Scaling suggestions and improvement roadmap

### Quick API Reference

#### POST /api/auth/register
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
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Invalid input
- `409` - Email already registered

#### POST /api/auth/login
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
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Invalid input
- `401` - Invalid credentials

#### GET /api/user/profile
Get user profile data (protected route).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response (200):**
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `403` - Unauthorized (missing or invalid token)
- `404` - User not found

### Client-Side Authentication Utilities

The application includes comprehensive client-side authentication utilities in `lib/clientAuth.ts`:

#### `isAuthenticated(): boolean`
Checks if the user has a valid, non-expired JWT token in localStorage.
- Returns `true` if token exists and is not expired
- Automatically removes expired tokens from localStorage
- Returns `false` if no token or token is expired

#### `isTokenExpired(token: string): boolean`
Validates if a JWT token has expired by decoding the payload.
- Decodes JWT payload and checks `exp` field
- Returns `true` if token is expired or invalid
- Handles malformed tokens gracefully

#### `logout(): void`
Centralized logout function that cleans up all authentication data.
- Removes `auth_token` from localStorage
- Removes `user_data` from localStorage

#### `getTokenExpirationTime(token: string): number | null`
Returns the remaining time until token expires in minutes.
- Useful for showing token expiration warnings
- Returns `null` if token is invalid or has no expiration

## 🗂️ Project Structure

```
recruitment-platform/
├── app/                    # Next.js app directory
│   ├── api/               # API route handlers
│   │   ├── auth/          # Authentication endpoints
│   │   └── user/          # User-related endpoints
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── profile/           # Protected profile page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   └── AuthForm.tsx      # Authentication form component
├── lib/                  # Utility libraries
│   ├── auth.ts           # Server-side JWT utilities
│   ├── clientAuth.ts     # Client-side authentication utilities
│   ├── mongodb.ts        # Database connection
│   ├── schemas.ts        # Zod validation schemas
│   ├── utils.ts          # General utilities
│   └── validation.ts     # Input validation
├── models/               # Mongoose models
│   └── User.ts           # User model schema
├── types/                # TypeScript type definitions
│   └── global.d.ts       # Global type declarations
├── .env.example          # Environment variables template
└── README.md            # Project documentation
```

## 🔒 Security Features

- **Password Security**: bcrypt hashing with 12 salt rounds, minimum 6 characters
- **JWT Authentication**: 1-hour token expiration with automatic client-side validation
- **Token Management**: Client-side token expiration checking and automatic cleanup
- **Smart Navigation**: Authentication-aware components prevent access to login/register for authenticated users
- **Input Validation**: Zod for runtime type-safe validation with comprehensive error handling
- **Protected Routes**: Middleware-based route protection with token verification

---

## 🚀 Advanced Topics

<details>
<summary><strong>🎯 Scaling Considerations</strong></summary>

### Performance Optimizations
1. **Database Indexing**
   - Index on email field for faster user lookups
   - Compound indexes for complex queries

2. **Caching**
   - Redis for session management
   - Application-level caching for frequently accessed data

3. **Load Balancing**
   - Multiple server instances behind a load balancer
   - Session persistence or stateless architecture

### Security Enhancements
1. **Refresh Tokens**
   - Longer-lived refresh tokens for better UX
   - Token rotation for enhanced security

2. **Rate Limiting**
   - API rate limiting to prevent abuse
   - Login attempt throttling

3. **HTTPS Enforcement**
   - SSL/TLS encryption in production
   - Secure cookie flags

### Architecture Evolution
1. **Microservices**
   - Separate authentication service
   - Independent scaling of components

2. **Database Scaling**
   - Read replicas for read-heavy operations
   - Sharding for large datasets

3. **CDN Integration**
   - Static asset optimization
   - Global content delivery

</details>

<details>
<summary><strong>🧪 Testing Strategy</strong></summary>

### Running Tests
```bash
npm run test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### Test Coverage
- Unit tests for utility functions
- Integration tests for API endpoints
- Component testing for React components

</details>

<details>
<summary><strong>🚢 Deployment Guide</strong></summary>

### Environment Setup
1. Set up production MongoDB instance (MongoDB Atlas recommended)
2. Configure environment variables in production
3. Set up HTTPS and domain configuration

### Build and Deploy
```bash
npm run build         # Build for production
npm start            # Start production server
```

### Deployment Platforms
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS/GCP/Azure**
- **Docker containers**

</details>

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or support, please open an issue in the GitHub repository or contact the development team.

## 📅 Recent Updates

### Latest Improvements (September 2025)

- **JWT Token Validation**: Implemented comprehensive client-side token validation with automatic expiration checking
- **Smart Authentication**: Added authentication-aware navigation components that prevent unnecessary redirects
- **Favicon Fix**: Created professional SVG favicon with briefcase design matching the platform theme
- **Token Cleanup**: Automatic removal of expired tokens from localStorage for enhanced security
- **Build Optimization**: Resolved module caching issues and optimized development workflow

### Security Enhancements
- Client-side token expiration validation prevents API calls with expired tokens
- Automatic logout when tokens expire for seamless user experience
- Centralized authentication utilities for consistent behavior across components

---

**Built with ❤️ using Next.js, TypeScript, and MongoDB**