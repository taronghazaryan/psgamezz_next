'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentSuccessRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/?payment=failed');
    }, [router]);

    return null;
}
