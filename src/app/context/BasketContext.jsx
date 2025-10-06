"use client"; // ⚠️ Обязательно, иначе хук useState/useEffect не будет работать на сервере

import { createContext, useContext, useState, useEffect } from "react";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("basket");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  const addToBasket = (product) => {
    const exists = basket.some(
      (item) =>
        item.id === product.id &&
        item.psType === product.psType &&
        item.activation === product.activation
    );

    if (exists) {
      return { success: false, message: "Товар уже в корзине" };
    }

    setBasket((prev) => [
      ...prev,
      {
        ...product,
        checked: false,
        quantity: product.quantity || 1,
      },
    ]);

    return { success: true };
  };

  const removeFromBasket = (index) => {
    setBasket((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleItemCheck = (index) => {
    setBasket((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const clearBasket = () => setBasket([]);

  const toggleAll = (checked) => {
    setBasket((prev) => prev.map((item) => ({ ...item, checked })));
  };

  const removeSelected = () => {
    setBasket((prev) => prev.filter((item) => !item.checked));
  };

  const changeQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;

    setBasket((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <BasketContext.Provider
      value={{
        basket,
        addToBasket,
        removeFromBasket,
        removeSelected,
        toggleItemCheck,
        toggleAll,
        changeQuantity,
        clearBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);
