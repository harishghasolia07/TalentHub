import { z } from 'zod';

// Common validation schemas
export const emailSchema = z
    .string()
    .min(1, 'Email is required')
    .email('Please provide a valid email address')
    .max(254, 'Email is too long')
    .toLowerCase()
    .trim();

export const passwordSchema = z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .max(128, 'Password is too long');

export const nameSchema = z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name cannot exceed 50 characters')
    .trim();

// MongoDB ObjectId schema
export const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId');

// Common response schemas
export const successResponseSchema = z.object({
    message: z.string(),
    data: z.any().optional(),
});

export const errorResponseSchema = z.object({
    error: z.string(),
    details: z.array(z.object({
        field: z.string(),
        message: z.string(),
    })).optional(),
});

// User-related schemas
export const userPublicSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    createdAt: z.date(),
});

export const jwtPayloadSchema = z.object({
    userId: z.string(),
    email: z.string().email(),
    iat: z.number().optional(),
    exp: z.number().optional(),
});

// Environment variables schema
export const envSchema = z.object({
    MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
    JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
    NEXTAUTH_URL: z.string().url().optional(),
});

export type UserPublic = z.infer<typeof userPublicSchema>;
export type JWTPayload = z.infer<typeof jwtPayloadSchema>;
export type EnvVars = z.infer<typeof envSchema>;