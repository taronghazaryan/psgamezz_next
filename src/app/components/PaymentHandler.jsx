'use client';

import { useEffect } from 'react';

export default function PaymentHandler({ onSuccess, onFail }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const query = params.get('payment'); // читаем один раз при монтировании

    if (query === 'success') onSuccess?.();
    if (query === 'failed') onFail?.();
  }, []); // пустой массив зависимостей
  return null;
}
