import { z } from 'zod';
import { emailSchema, passwordSchema, nameSchema } from './schemas';

// Zod schemas for validation
export const userRegistrationSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const userLoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Type definitions from schemas
export type UserRegistrationData = z.infer<typeof userRegistrationSchema>;
export type UserLoginData = z.infer<typeof userLoginSchema>;

// Validation error interface for consistency
export interface ValidationError {
  field: string;
  message: string;
}

// Helper function to convert Zod errors to our ValidationError format
export function formatZodErrors(error: z.ZodError): ValidationError[] {
  return error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));
}



// New validation functions that work directly with objects
export function validateUserRegistration(data: unknown): { success: true; data: UserRegistrationData } | { success: false; errors: ValidationError[] } {
  try {
    const validData = userRegistrationSchema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: formatZodErrors(error) };
    }
    return { success: false, errors: [{ field: 'general', message: 'Validation failed' }] };
  }
}

export function validateUserLogin(data: unknown): { success: true; data: UserLoginData } | { success: false; errors: ValidationError[] } {
  try {
    const validData = userLoginSchema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: formatZodErrors(error) };
    }
    return { success: false, errors: [{ field: 'general', message: 'Validation failed' }] };
  }
}

// Validation functions that return ValidationError[] for backward compatibility
export function validateRegistrationInput(name: string, email: string, password: string): ValidationError[] {
  try {
    userRegistrationSchema.parse({ name, email, password });
    return [];
  } catch (error) {
    if (error instanceof z.ZodError) {
      return formatZodErrors(error);
    }
    return [{ field: 'general', message: 'Validation failed' }];
  }
}

export function validateLoginInput(email: string, password: string): ValidationError[] {
  try {
    userLoginSchema.parse({ email, password });
    return [];
  } catch (error) {
    if (error instanceof z.ZodError) {
      return formatZodErrors(error);
    }
    return [{ field: 'general', message: 'Validation failed' }];
  }
}