import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken, extractTokenFromRequest, createAuthResponse } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function DELETE(request: NextRequest) {
    try {
        // Extract and verify token
        const token = extractTokenFromRequest(request);
        if (!token) {
            return createAuthResponse('Authorization token required', 403);
        }

        const payload = verifyToken(token);
        if (!payload) {
            return createAuthResponse('Invalid or expired token', 403);
        }

        // Connect to database
        await connectToDatabase();

        // Find and delete user
        const deletedUser = await User.findByIdAndDelete(payload.userId);
        if (!deletedUser) {
            return createAuthResponse('User not found', 404);
        }

        return NextResponse.json({
            message: 'Account deleted successfully'
        }, { status: 200 });

    } catch (error) {
        console.error('Delete account error:', error);

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
