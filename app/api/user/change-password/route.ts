import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken, extractTokenFromRequest, createAuthResponse } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PUT(request: NextRequest) {
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

        const body = await request.json();
        const { currentPassword, newPassword } = body;

        // Basic validation
        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { error: 'Current password and new password are required' },
                { status: 400 }
            );
        }

        if (newPassword.length < 6) {
            return NextResponse.json(
                { error: 'New password must be at least 6 characters long' },
                { status: 400 }
            );
        }

        // Connect to database
        await connectToDatabase();

        // Find user by ID from token
        const user = await User.findById(payload.userId).select('+passwordHash');
        if (!user) {
            return createAuthResponse('User not found', 404);
        }

        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isCurrentPasswordValid) {
            return NextResponse.json(
                { error: 'Current password is incorrect' },
                { status: 401 }
            );
        }

        // Hash new password
        const saltRounds = 12;
        const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

        // Update password
        user.passwordHash = newPasswordHash;
        await user.save();

        return NextResponse.json({
            message: 'Password changed successfully'
        }, { status: 200 });

    } catch (error) {
        console.error('Change password error:', error);

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
