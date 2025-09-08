"use client"; // ⚠️ Важно для использования useState, useEffect и контекста

import { useState, useEffect } from "react";
import { useBasket } from "../context/BasketContext";
import BasketItem from "../components/BasketItem";
import Api from "../connectors";

export default function BasketPageClient() {
  const { basket, removeSelected, toggleAll } = useBasket();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; 

  const overallPrice = basket.reduce(
    (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
    0
  );

  const allChecked = basket.length > 0 && basket.every((item) => item.checked);

  const handleOrderClick = () => {
    if (basket.length === 0) {
      alert("Корзина пуста");
      return;
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !username.trim()) {
      setError("Пожалуйста, заполните все обязательные поля");
      return;
    }

    setLoading(true);

    try {
      const { data } = await Api.post("/api/payment/initiate/", {
        email,
        username,
        items: basket,
      });

      if (!data.payment_url) throw new Error("Нет ссылки для оплаты");

      setIsModalOpen(false);
      window.location.href = data.payment_url;
    } catch (e) {
      setError(e.response?.data?.message || e.message || "Ошибка запроса");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="px-4">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="p-4 flex gap-6 min-h-screen">
            {/* Список товаров */}
            <div className="flex-grow max-[900px]:max-h-[calc(100vh-220px)] ">
              <div className="flex items-center justify-between w-full mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={(e) => toggleAll(e.target.checked)}
                    className="
                      h-[18px] w-[18px] 
                      accent-primary"
                  />
                  <label className="ms-2 font-bold text-[#202562] text-[20px] max-[900px]:text-[18px] max-[600px]:text-[12px]">
                    Выбрать все
                  </label>
                </div>
                <button
                  onClick={removeSelected}
                  className="font-bold text-[#202562] text-[20px] max-[900px]:text-[18px] max-[600px]:text-[12px]"
                >
                  Удалить выбранное
                </button>
              </div>

              {basket.length > 0 ? (
                basket.map((item, index) => (
                  <BasketItem key={index} item={item} index={index} />
                ))
              ) : (
                <p className="text-gray-500">Корзина пуста</p>
              )}
            </div>

            {/* Итог и кнопка заказа */}
            <div
              className="w-full max-w-[285px] 
"
            >
              <div className="bg-[#202562] text-white p-5 py-6 flex flex-col gap-4 rounded-[25px] max-[900px]:rounded-xl max-[900px]:p-4">
                <p className="flex items-center justify-between font-[500] text-[16px] max-[600px]:text-[14px]">
                  Товары, {basket.length} шт <span>{overallPrice}₽</span>
                </p>
                <p className="flex items-center justify-between font-[500] text-[16px] max-[600px]:text-[14px]">
                  Скидки <span>0₽</span>
                </p>
                <p className="flex items-center justify-between font-[700] text-[18px] max-[600px]:text-[16px]">
                  Итого <span>{overallPrice}₽</span>
                </p>
              </div>

              <button
                onClick={handleOrderClick}
                className="bg-[#00B5F1] w-full h-[50px] rounded-xl mt-4 text-[16px] font-semibold 
                  shadow-md hover:bg-[#009ed4] transition active:scale-95 max-[600px]:text-[14px]"
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 max-w-md w-[90%]">
            <h2 className="text-2xl font-bold mb-4 text-black">Оформить заказ</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col font-semibold text-gray-700">
                Email<span className="text-red-600">*</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border border-gray-400 rounded px-3 py-2 mt-1"
                  inputMode="email"
                />
                {error && !email && (
                  <span className="text-red-600 text-sm">Введите email</span>
                )}
              </label>

              <label className="flex flex-col font-semibold text-gray-700">
                Имя пользователя<span className="text-red-600">*</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="border border-gray-400 rounded px-3 py-2 mt-1"
                  inputMode="text"
                />
                {error && !username && (
                  <span className="text-red-600 text-sm">Введите имя</span>
                )}
              </label>

              {error && email && username && (
                <p className="text-red-600 text-sm font-semibold">{error}</p>
              )}

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  disabled={loading}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  {loading ? "Отправка..." : "Подтвердить"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
