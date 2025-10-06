'use client';

import { useEffect } from 'react';

export default function PaymentHandler({ onSuccess, onFail, searchParams }) {
  useEffect(() => {
    const query = searchParams.get('payment'); // читаем один раз
    if (query === 'success') {
      onSuccess?.();
    } else if (query === 'failed') {
      onFail?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // пустой массив зависимостей! больше не ставим searchParams
  // onSuccess и onFail стабильные функции, поэтому ок

  return null;
}
