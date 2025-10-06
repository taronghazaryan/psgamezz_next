'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useBasket } from './context/BasketContext';
import Hero from './components/Hero';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import PaymentHandler from './components/PaymentHandler';
import SuccessModal from './components/SuccessModal';
import FailModal from './components/FailModal';

export default function HomepageClient() {
  const router = useRouter();
  const { clearBasket } = useBasket();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);

  // Чтение query из URL один раз при монтировании
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get('payment');

    if (payment === 'success') {
      setShowSuccessModal(true);
      clearBasket();
      // очищаем query, чтобы повторный рендер не открывал снова
      const url = new URL(window.location);
      url.searchParams.delete('payment');
      window.history.replaceState({}, '', url);
    } else if (payment === 'failed') {
      setShowFailModal(true);
    }
  }, [clearBasket]);

  // Блокировка скролла при открытой модалке
  useEffect(() => {
    document.body.style.overflow = showSuccessModal || showFailModal ? 'hidden' : 'auto';
  }, [showSuccessModal, showFailModal]);

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setShowFailModal(false);
    router.replace('/');
  };

  return (
    <div className="relative">
      <Hero />
      <div className="px-4">
        <Section2 />
        <Section3 />
      </div>

      <PaymentHandler
        onSuccess={() => {
          setShowSuccessModal(true);
          clearBasket();
        }}
        onFail={() => setShowFailModal(true)}
      />

      {showSuccessModal && <SuccessModal onClose={handleCloseModal} />}
      {showFailModal && <FailModal onClose={handleCloseModal} />}
    </div>
  );
}
