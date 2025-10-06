'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useBasket } from './context/BasketContext';
import Hero from './components/Hero';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import PaymentHandler from './components/PaymentHandler';
import SuccessModal from './components/SuccessModal';
import FailModal from './components/FailModal';

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);

  const { clearBasket } = useBasket();

  // Блокировка скролла при открытой модалке
  useEffect(() => {
    if (showSuccessModal || showFailModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showSuccessModal, showFailModal]);

  // Закрытие модалки с редиректом на /
  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setShowFailModal(false);
    router.replace('/'); // убираем query из URL
  };

  return (
    <div className="relative">
      <Hero />
      <div className="px-4">
        <Section2 />
        <Section3 />
      </div>

      {/* PaymentHandler вызывается только один раз */}
<PaymentHandler
  searchParams={searchParams}
  onSuccess={() => {
    setShowSuccessModal(true);
    clearBasket(); // очищаем корзину только здесь
  }}
  onFail={() => setShowFailModal(true)}
/>


      {/* Модалки */}
      {showSuccessModal && <SuccessModal onClose={handleCloseModal} />}
      {showFailModal && <FailModal onClose={handleCloseModal} />}
    </div>
  );
}
