'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SuccessModal({ onClose }) {
  const router = useRouter();

  // блокировка скролла
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative backdrop-blur-md bg-[#1B1F4F]/90 text-white w-[95%] max-w-[750px] min-h-[25rem] px-8 py-8 shadow-lg rounded-xl flex flex-col justify-between">
        <button
          onClick={() => {
            onClose();
            router.replace('/');
          }}
          className="absolute top-4 right-4 xl:text-2xl text-white/70 hover:text-white cursor-pointer"
        >
          ×
        </button>

        <div className="flex justify-center">
          <p className="text-3xl font-bold text-center">Благодарим вас за заказ!</p>
        </div>

        <div className="flex justify-center flex-1 items-center">
          <p className="text-lg text-center max-w-[500px]">
            Для активации подписки свяжитесь с нашим менеджером в Telegram и назовите номер заказа, который пришел на почту!
          </p>
        </div>

        <div className="flex justify-center mt-4">
          <a href="https://t.me/psgamezz" target="_blank" rel="noopener noreferrer">
            <Image className="h-[55px] w-[55px]" src="/images/telegram.png" width={100} height={100} alt="telegram" />
          </a>
        </div>
      </div>
    </div>
  );
}
