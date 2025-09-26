Build a full-stack recruitment platform prototype using Next.js (App Router, TypeScript, TailwindCSS) and MongoDB with Mongoose.

Requirements:

1. **Authentication APIs (Next.js API routes)**
   - /api/auth/register → POST → accepts { name, email, password }. Validates input, checks if email exists, hashes password with bcrypt, saves user in MongoDB.
   - /api/auth/login → POST → accepts { email, password }. Validates user, compares password hash, returns signed JWT (1h expiry).
   - /api/user/profile → GET → Protected route. Requires Authorization: Bearer <token>. Verifies JWT and returns user data (id, name, email).

2. **Frontend pages (Next.js React components)**
   - /register → Registration form (name, email, password). Calls register API, shows success or error.
   - /login → Login form (email, password). Calls login API, saves JWT in localStorage.
   - /profile → Protected profile page. Fetches data from /api/user/profile with JWT. If not authenticated, redirect to /login.

3. **Database Schema (Mongoose User model)**
   - User: 
     - _id (ObjectId)
     - name: String (required)
     - email: String (unique, required)
     - passwordHash: String (required)
     - createdAt: Date (default: now)

4. **Error handling**
   - Invalid input → 400 { error: "Invalid input" }
   - Duplicate email → 409 { error: "Email already registered" }
   - Invalid login → 401 { error: "Invalid email or password" }
   - Missing/invalid JWT → 403 { error: "Unauthorized" }

5. **Security**
   - Passwords stored as bcrypt hashes.
   - JWT signed with secret key (stored in .env).
   - Tokens expire in 1 hour.

6. **Documentation**
   - README with setup instructions: environment variables (MONGODB_URI, JWT_SECRET), how to run `npm install`, `npm run dev`.
   - Explain API structure, authentication flow, error handling, and scaling suggestions (e.g., refresh tokens, Redis caching, load balancing, microservices).

Styling: Use TailwindCSS for forms and layout.
