"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useBasket } from "../../context/BasketContext";

export default function Hero({ productItem }) {
  const { basket, addToBasket } = useBasket();
  const [psType, setPsType] = useState("PS5");
  const [activation, setActivation] = useState("с активацией");

  const [openIndex, setOpenIndex] = useState(null);
  const [openTab, setOpenTab] = useState(null);

  const questions = [
    {
      question: 'Что такое "с активацией"?',
      answer: `Вы получаете логин и пароль от игрового аккаунта.
Далее добавляете его на консоль, включаете активацию аккаунта (общий доступ) в настройках по инструкции.
После ставите игру на установку, и она появляется на вашем аккаунте любого региона.`,
    },
    {
      question: 'Что такое "без активации"?',
      answer: `Вы получаете логин и пароль от игрового аккаунта.
Далее добавляете его на консоль, не активируете(общий доступ), и ставите игру на установку по инструкции.
После завершения установки играете на игровом аккаунте.`,
    },
    {
      question: "После оплаты. Как получить заказ?",
      answer: `После оплаты игры вы получите код заказа, который дублируется на вашу почту.
Код необходимо отправить в нашу поддержку для получения игрового аккаунта.`,
    },
    {
      question: "Что делать если РФ аккаунт?",
      answer: "Аккаунт любого региона подойдет.",
    },
  ];

  // SEO
  const title = productItem.title + " — купить игру для " + psType;
  const description = productItem.description || productItem.about || "Описание игры";
  const image = productItem.main_image_url || "";
  // Цена
  const getPriceData = () => {
    if (!productItem?.prices) return null;
    const key = activation === "с активацией" ? "with_activation" : "without_activation";
    const list = productItem.prices[key] || [];
    const match = list.find((el) => el[psType] !== undefined);
    if (!match) return null;

    return {
      price: match[psType],
      saleAmount: match.sale_amount || 0,
      price_id: match.id || null,
    };
  };

  const priceData = getPriceData();
  const selectedPrice = priceData?.price ?? null;
  const saleAmount = priceData?.saleAmount ?? 0;
  const finalPrice =
    saleAmount > 0
      ? Math.round(selectedPrice * (1 - saleAmount / 100))
      : selectedPrice;

  const alreadyInBasket = basket.some(
    (item) =>
      item.id === productItem.id &&
      item.psType === psType &&
      item.activation === activation
  );

  return (
    <>
    
      <div className="relative w-full min-h-screen">
        {/* Фоновое изображение */}
        <div
          className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-[-2]"
          style={{
            backgroundImage: `url(${productItem.images?.[0] || "/images/default.jpg"})`,
          }}
        />

        {/* Плавный градиент сверху вниз */}
        <div
          className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 1) 120%)"
          }}
        />

            <div className="relative flex flex-col lg:flex-row justify-center items-start px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto gap-8 lg:gap-10 text-white">
              
              {/* Левая часть: постер */}
              <div className="w-full max-w-[300px] flex-shrink-0 flex flex-col items-center mx-auto lg:mx-0">
                <Image
                  src={
                    productItem.main_image_url?.startsWith("http")
                      ? productItem.main_image_url
                      : productItem.main_image_url
                      ? "http://psgamezz.ru" + productItem.main_image_url
                      : gameviewPlaceholder
                  }
                  alt={productItem.title}
                  width={300}
                  height={320}
                  className="rounded-[20px] w-full h-[300px] md:w-auto md:h-auto xl:w-auto xl:h-auto sm:h-[300px] lg:h-[320px] object-cover shadow-lg"
                />
                {productItem.images?.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {productItem.images.map((img, i) => (
                      <Image
                        key={i}
                        src={img}
                        alt={`screenshot ${i + 1}`}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Правая часть */}
              <div className="flex-1 flex flex-col gap-6">

                {/* Блок выбора */}
                <div className="flex flex-col xl:h-[300px] md:h-[300px] md:flex-row bg-[rgba(32,37,98,0.5)] rounded-[20px] xl:rounded-[20px] md:rounded-[30px] xl:py-0 py-6 md:py-0 px-5 md:px-8 shadow-lg xl:gap-1">

                  <div className="flex-1">
                    <h1 className="xl:text-3xl md:text-2xl font-bold mb-0 py-4 max-sm:text-center max-sm:text-[20px]">{productItem.title}</h1>

                    {/* Консоль */}
                    <div className="mb-4">
                      <p className="font-semibold mb-2 max-sm:text-center">Консоль</p>
                      <div className="flex flex-wrap gap-2 max-sm:justify-center">
                        {productItem.consoles.map((btn) => (
                          <button
                            key={btn}
                            onClick={() => setPsType(btn)}
                            className={`px-3 py-2 rounded-lg font-bold text-sm md:text-base transition ${
                              psType === btn ? "bg-white text-[rgba(32,37,98,1)]" : "bg-transparent border border-white text-white hover:bg-blue-600/20"
                            }`}
                          >
                            {btn}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Варианты покупки */}
                    <div className="mb-4">
                      <p className="font-semibold mb-2 max-sm:text-center">Варианты покупки</p>
                      <div className="flex flex-wrap gap-2 max-sm:justify-center">
                        {["без активации", "с активацией"].map((btn) => (
                          <button
                            key={btn}
                            onClick={() => setActivation(btn)}
                            className={`px-3 py-2 rounded-lg font-bold text-sm md:text-base transition ${
                              activation === btn ? "bg-white text-[rgba(32,37,98,1)]" : "bg-transparent border border-white text-white hover:bg-blue-600/20"
                            }`}
                          >
                            {btn}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Цена и кнопка */}
                  <div className="flex flex-col justify-end items-center md:items-end shrink-0 sm:mb-[33px]">
                    {selectedPrice !== null && (
                      <div className="flex items-center gap-3 mb-6">
                        {saleAmount > 0 ? (
                          <>
                            <span className="text-2xl md:text-3xl font-bold text-green-400">{finalPrice}₽</span>
                            <span className="line-through text-gray-400 text-lg">{selectedPrice}₽</span>
                            <span className="text-red-500 font-bold">-{saleAmount}%</span>
                          </>
                        ) : (
                          <span className="text-2xl md:text-3xl font-bold">{selectedPrice}₽</span>
                        )}
                      </div>
                    )}

                    <button
                      className={`w-[200px] md:w-[240px] h-[40px] md:h-[44px] rounded-lg text-sm md:text-[15px] font-bold transition ${
                        alreadyInBasket ? "bg-gray-500 cursor-not-allowed" : "bg-[rgba(0,181,241,1)] hover:bg-blue-700"
                      }`}
                      onClick={() => {
                        if (!alreadyInBasket && priceData?.price_id) {
                          addToBasket({
                            id: productItem.id,
                            title: productItem.title,
                            psType,
                            activation,
                            prices: productItem.prices,
                            price: finalPrice,
                            saleAmount,
                            quantity: 1,
                            product_type: "game",
                            price_id: priceData.price_id,
                            main_image_url: productItem.main_image_url,
                          });
                        }
                      }}
                      disabled={alreadyInBasket || selectedPrice === null}
                    >
                      {alreadyInBasket ? "Уже в корзине" : "В корзину"}
                    </button>
                  </div>
                </div>

                {/* Табы */}
                <div className="">
                  <div className="flex flex-wrap gap-3">
                    {[
                      { key: "about", label: "Об игре" },
                      { key: "details", label: "Детали" },
                      { key: "faq", label: "Частые вопросы" },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        className={`bg-[rgba(32,37,98,1)] py-2 px-3 md:py-[7px] md:px-[12px] rounded-[12px] flex items-center gap-2 ${openTab === tab.key ? "opacity-100" : "opacity-70"}`}
                        onClick={() => setOpenTab(openTab === tab.key ? null : tab.key)}
                      >
                        <span>{tab.label}</span>
                        {openTab === tab.key ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-col gap-3">
                    {/* Об игре */}
                    <div className={`transition-all duration-700 overflow-hidden ${openTab === "about" ? "max-h-full opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="bg-[rgba(32,37,98,0.8)] rounded-xl p-3 max-w-full md:max-w-[388px]">
                        <p>{productItem.about}</p>
                      </div>
                    </div>

                    {/* Детали */}
                    <div className={`transition-all duration-700 overflow-hidden ${openTab === "details" ? "max-h-full opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="bg-[rgba(32,37,98,0.8)] rounded-xl p-3 max-w-full md:max-w-[388px]">
                        {productItem.categories?.length > 0 && <p className="mb-2">Жанры: {productItem.categories.join(", ")}</p>}
                        {productItem.publishers?.length > 0 && <p className="mb-2">Издатели: {productItem.publishers.join(", ")}</p>}
                      </div>
                    </div>

                    {/* FAQ */}
                    <div className={`transition-all duration-700 overflow-hidden ${openTab === "faq" ? "max-h-full opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="bg-[rgba(32,37,98,0.8)] rounded-xl p-3 max-w-full md:max-w-[388px] flex flex-col gap-2">
                        {questions.map((item, index) => {
                          const isOpen = openIndex === index;
                          return (
                            <div key={index}>
                              <div className="flex items-center justify-between cursor-pointer" onClick={() => setOpenIndex(isOpen ? null : index)}>
                                <p className="font-semibold">{item.question}</p>
                                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </div>
                              <div className={`transition-all duration-700 overflow-hidden ${isOpen ? "max-h-48 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                                <div className="bg-primary py-2 px-2.5 rounded-xl">
                                  <p className="text-white">{item.answer}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
      </div>
    </>
  );
}
