'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FailModal({ onClose }) {
  const router = useRouter();

  // блокировка скролла при открытой модалке
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative backdrop-blur-md bg-[#1B1F4F]/90 text-white w-[95%] max-w-[750px] min-h-[25rem] px-8 py-8 shadow-lg rounded-xl flex flex-col justify-between">
        {/* Кнопка закрытия */}
        <button
          onClick={() => {
            onClose();
            router.replace('/');
          }}
          className="absolute top-4 right-4 xl:text-2xl text-white/70 hover:text-white cursor-pointer"
        >
          ×
        </button>

        {/* Заголовок */}
        <div className="flex justify-center">
          <p className="text-3xl font-bold text-center">Ошибка оплаты</p>
        </div>

        {/* Основной текст */}
        <div className="flex justify-center flex-1 items-center">
          <div className="text-center max-w-[500px] flex flex-col gap-4">
            <p className="text-lg">
              К сожалению, произошла ошибка при обработке платежа. Попробуйте повторить попытку или свяжитесь с нашей поддержкой.
            </p>
            <p>Поддержка работает ежедневно 09:00–00:00 (мск)</p>
            <p>
              Свяжитесь с нами: <strong>support@pswin.ru</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
