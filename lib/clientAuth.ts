/**
 * Client-side authentication utilities
 */

/**
 * Check if a JWT token is expired
 */
export function isTokenExpired(token: string): boolean {
    try {
        // JWT tokens have 3 parts separated by dots
        const parts = token.split('.');
        if (parts.length !== 3) {
            return true; // Invalid token format
        }

        // Decode the payload (second part)
        const payload = JSON.parse(atob(parts[1]));

        // Check if token has expiration time
        if (!payload.exp) {
            return true; // No expiration means we treat it as expired for security
        }

        // Compare expiration time with current time
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        return payload.exp < currentTime;
    } catch (error) {
        // If we can't decode the token, consider it expired
        return true;
    }
}

/**
 * Check if user is authenticated with a valid token
 */
export function isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');

    if (!token) {
        return false;
    }

    if (isTokenExpired(token)) {
        // Clean up expired token
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        return false;
    }

    return true;
}

/**
 * Logout user by removing tokens and user data
 */
export function logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
}

/**
 * Get the remaining time until token expires (in minutes)
 */
export function getTokenExpirationTime(token: string): number | null {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            return null;
        }

        const payload = JSON.parse(atob(parts[1]));

        if (!payload.exp) {
            return null;
        }

        const currentTime = Math.floor(Date.now() / 1000);
        const remainingSeconds = payload.exp - currentTime;

        return Math.floor(remainingSeconds / 60); // Return in minutes
    } catch (error) {
        return null;
    }
}