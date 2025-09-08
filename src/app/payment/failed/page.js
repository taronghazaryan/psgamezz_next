'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentFailed() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Через 5 секунд редирект на главную, если пользователь не закрыл модалку
        const timer = setTimeout(() => {
            router.push('/');
        }, 5000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
                        <h2 className="text-3xl font-bold mb-4 text-red-600">
                            Ошибка оплаты. Попробуйте еще раз.
                        </h2>
                        <button
                            onClick={() => {
                                setIsModalOpen(false);
                                router.push('/');
                            }}
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
