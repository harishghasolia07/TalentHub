'use client';

import { useRouter } from 'next/navigation';

interface AuthAwareLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function AuthAwareLink({ href, children, className }: AuthAwareLinkProps) {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();

        // Check if user is already logged in
        const token = localStorage.getItem('auth_token');

        if (token && (href === '/login' || href === '/register')) {
            // If logged in and trying to access login/register, redirect to profile
            router.push('/profile');
        } else {
            // Otherwise, navigate normally
            router.push(href);
        }
    };

    return (
        <span onClick={handleClick} className={className} style={{ cursor: 'pointer' }}>
            {children}
        </span>
    );
}