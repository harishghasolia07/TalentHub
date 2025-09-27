'use client';

import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/clientAuth';

interface AuthAwareLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function AuthAwareLink({ href, children, className }: AuthAwareLinkProps) {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();

        // Check if user is authenticated with a valid token
        const authenticated = isAuthenticated();

        if (authenticated && (href === '/login' || href === '/register')) {
            // If authenticated and trying to access login/register, redirect to profile
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