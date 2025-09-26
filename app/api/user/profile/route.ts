import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken, extractTokenFromRequest, createAuthResponse } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
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

    // Find user by ID from token
    const user = await User.findById(payload.userId);
    if (!user) {
      return createAuthResponse('User not found', 404);
    }

    // Return user profile data
    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Profile fetch error:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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
    const { name } = body;

    // Basic validation
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Check if user exists
    const user = await User.findById(payload.userId);
    if (!user) {
      return createAuthResponse('User not found', 404);
    }

    // Update user name only
    user.name = name.trim();
    await user.save();

    // Return updated user profile data
    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error('Profile update error:', error);

    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

