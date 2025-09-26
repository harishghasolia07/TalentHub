import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { jwtPayloadSchema, type JWTPayload } from './schemas';

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env.local');
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const validation = jwtPayloadSchema.safeParse(decoded);

    if (validation.success) {
      return validation.data;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export function extractTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.substring(7); // Remove 'Bearer ' prefix
}

export function createAuthResponse(message: string, status: number = 401) {
  return Response.json({ error: message }, { status });
}