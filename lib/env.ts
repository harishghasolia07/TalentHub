import { envSchema } from './schemas';

// Validate environment variables at startup
function validateEnv() {
    const env = {
        MONGODB_URI: process.env.MONGODB_URI,
        JWT_SECRET: process.env.JWT_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    };

    try {
        return envSchema.parse(env);
    } catch (error) {
        console.error('❌ Invalid environment variables:', error);
        throw new Error('Invalid environment variables. Please check your .env.local file.');
    }
}

// Export validated environment variables
export const env = validateEnv();

// Re-export for convenience
export const {
    MONGODB_URI,
    JWT_SECRET,
    NEXTAUTH_URL,
} = env;