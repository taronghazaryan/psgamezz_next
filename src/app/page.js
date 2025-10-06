'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useBasket } from './context/BasketContext';
import Hero from './components/Hero';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import PaymentHandler from './components/PaymentHandler';
import SuccessModal from './components/SuccessModal';
import FailModal from './components/FailModal';

export default function HomePage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const { clearBasket } = useBasket();
  const router = useRouter();

  // Только на клиенте
  const searchParams = typeof window !== "undefined" ? useSearchParams() : null;

  const handlePaymentSuccess = () => {
    setShowSuccessModal(true);
    clearBasket();
  };

  const handlePaymentFail = () => {
    setShowFailModal(true);
  };

  return (
    <div className="relative">
      <Hero />
      <div className="px-4">
        <Section2 />
        <Section3 />
      </div>

      {/* PaymentHandler только если searchParams есть */}
      {searchParams && (
        <PaymentHandler
          searchParams={searchParams}
          onSuccess={handlePaymentSuccess}
          onFail={handlePaymentFail}
        />
      )}

      {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
      {showFailModal && <FailModal onClose={() => setShowFailModal(false)} />}
    </div>
  );
}
