'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import Link from 'next/link';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = (data: any) => {
    // Store JWT token in localStorage
    localStorage.setItem('auth_token', data.token);

    // Store user data
    localStorage.setItem('user_data', JSON.stringify(data.user));

    // Show success toast
    toast.success(`Welcome back, ${data.user.name}!`, {
      duration: 3000,
      style: {
        '--toast-duration': '3000ms',
      } as React.CSSProperties & { '--toast-duration': string },
    });

    // Redirect to profile page
    router.push('/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Recruitment Platform
          </h1>
          <p className="text-gray-600">
            Welcome back! Please sign in to your account
          </p>
        </div>

        <AuthForm type="login" onSuccess={handleLoginSuccess} />

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}