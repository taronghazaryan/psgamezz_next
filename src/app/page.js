'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useBasket } from './context/BasketContext';
import Image from 'next/image';
import Hero from './components/Hero';
import Section2 from './components/Section2';
import Section3 from './components/Section3';

export default function HomePage() {
  const searchParams = useSearchParams();
  const paymentQuery = searchParams.get('payment');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);

  const { clearBasket } = useBasket();
  const router = useRouter();

  useEffect(() => {
    const query = searchParams.get("payment"); // если используешь useSearchParams
    if (query === 'success') {
      setShowSuccessModal(true);
      clearBasket();
    } else if (query === 'failed') {
      setShowFailModal(true);
    }
  }, []); // пустой массив зависимостей


  // Блокировка скролла
  useEffect(() => {
    if (showSuccessModal || showFailModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showSuccessModal, showFailModal]);

  // Авто-скрытие модалки через 5 сек и редирект на /


  return (
    <div className="relative">
      <Hero />
      <div className="px-4">
        <Section2 />
        <Section3 />
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="relative backdrop-blur-md bg-[#1B1F4F]/90 text-white w-[95%] max-w-[750px] min-h-[25rem] px-8 py-8 shadow-lg rounded-xl flex flex-col justify-between">
            {/* Кнопка закрытия */}
            <button
              onClick={() => {
                setShowSuccessModal(false);
                router.replace('/');
              }}
              className="absolute top-4 right-4 xl:text-2xl text-white/70 hover:text-white cursor-pointer"
            >
              ×
            </button>

            {/* Заголовок */}
            <div className="flex justify-center">
              <p className="text-3xl font-bold text-center">Благодарим вас за заказ!</p>
            </div>

            {/* Основной текст */}
            <div className="flex justify-center flex-1 items-center">
              <p className="text-lg text-center max-w-[500px]">
                Для активации подписки свяжитесь с нашим менеджером в Telegram и назовите номер заказа, который пришел на почту!
              </p>
            </div>

            {/* Кнопка/иконка */}
            <div className="flex justify-center mt-4">
              <a href="https://t.me/psgamezz" target="_blank" rel="noopener noreferrer">
                <Image className="h-[55px] w-[55px]" src="/images/telegram.png" width={100} height={100} alt="telegram" />
              </a>
            </div>
          </div>
        </div>

      )}

      {showFailModal && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="relative backdrop-blur-md bg-[#1B1F4F]/90 text-white w-[95%] max-w-[750px] min-h-[25rem] px-8 py-8 shadow-lg rounded-xl flex flex-col justify-between">
            {/* Кнопка закрытия */}
            <button
              onClick={() => {
                setShowFailModal(false);
                router.replace('/');
              }}
              className="absolute top-4 right-4 text-2xl text-white/70 hover:text-white cursor-pointer"
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

      )}
    </div>
  );
}
