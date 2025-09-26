'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import Link from 'next/link';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegistrationSuccess = (data: any) => {
    // Show success toast and redirect to login
    toast.success('Account created successfully! Please log in with your credentials.', {
      duration: 4000,
      style: {
        '--toast-duration': '4000ms',
      } as React.CSSProperties & { '--toast-duration': string },
    });

    // Delay redirect slightly to allow toast to show
    setTimeout(() => {
      router.push('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Recruitment Platform
          </h1>
          <p className="text-gray-600">
            Join our platform to find your dream job
          </p>
        </div>

        <AuthForm type="register" onSuccess={handleRegistrationSuccess} />

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}