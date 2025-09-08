"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Instructions() {
  const [openIndex, setOpenIndex] = useState(null);

  const instructions = [
    "Введите почту и пароль аккаунта",
    "Введите резервный код",
    "Введите сумму, на которую хотите пополнить кошелек PlayStation или выберите нужную игру.",
    "Проверьте, что указали данные аккаунта верно.",
    "Нажмите кнопку “Оплатить”",
    "Вы перейдете на страницу, где необходимо выбрать метод оплаты.",
    "После успешной оплаты деньги поступят на баланс аккаунта в течение 2-15 минут.",
  ];

  const questions = [
    {
      question: "Какие страны можно пополнить?",
      answer: "Пополнение возможно для аккаунтов Турции, Украины",
    },
    {
      question: "Лимиты и ограничения?",
      answer:
        "Ограничения на минимальные суммы для всех регионов - 50 лир/гривен. Лимит на максимальное пополнение кошелька PSN установлен в 6000 Лир/Гривен",
    },
    {
      question: "Что такое резервный код?",
      answer:
        "Одноразовый код для входа на аккаунт по логину и паролю. Позволяет моментально пополнить Ваш аккаунт!",
    },
    {
      question: "У меня нет аккаунт нужного региона",
      answer: "Аккаунт любого региона можно приобрести тут",
    },
    {
      question: "Какой регион самый выгодный?",
      answer:
        "На текущий момент Украинский регион является самым выгодным. Наибольшее число игр с русской озвучкой, цены игр на ~5-10% выше, чем в Турецком регионе",
    },
    {
      question: "Пришла сумма меньше",
      answer:
        "Если не достает больше 20 лир/гривен обратитесь в Техническую поддержку",
    },
    {
      question: "Не пришли деньги на кошелёк PlayStation",
      answer:
        "Возможно произошла ошибка в данных аккаунта или резервном коде, обратитесь в Техническую поддержку",
    },
  ];

  return (
    <div className="bg-white rounded-3xl sm:border-2 mt-12 border-primary grid grid-cols-2 max-sm:grid-cols-1 max-sm:gap-8">
      {/* Инструкция */}
      <div className="flex flex-col gap-2.5 sm:border-r-2 border-primary px-8 py-4 max-sm:p-0">
        <h1 className="text-3xl max-sm:text-base font-bold text-primary max-sm:mb-2">
          Инструкция
        </h1>
        {instructions.map((instruction, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-primary text-3xl font-bold max-sm:text-2xl">
              {index + 1}
            </span>
            <p className="text-primary font-semibold leading-5 max-sm:text-xs max-sm:leading-4">
              {instruction}
            </p>
          </div>
        ))}
      </div>

      {/* Частые вопросы */}
      <div className="flex flex-col gap-2.5 px-8 py-4 max-sm:p-0">
        <h1 className="text-3xl max-sm:text-base font-bold text-primary max-sm:mb-2">
          Частые вопросы
        </h1>
        {questions.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index}>
              <div className="flex items-center max-sm:justify-between gap-2">
                <p className="text-primary font-semibold leading-5 max-sm:text-xs max-sm:font-bold">
                  {item.question}
                </p>
                <div
                  className="border border-primary rounded-md max-sm:rounded-sm cursor-pointer"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  {isOpen ? (
                    <ChevronUp className="w-8 h-5 text-white bg-primary rounded-sm max-sm:rounded-xs max-sm:w-5 max-sm:h-3" />
                  ) : (
                    <ChevronDown className="w-8 h-5 text-primary max-sm:w-5 max-sm:h-3" />
                  )}
                </div>
              </div>
              <div
                className={`transition-all duration-800 overflow-hidden ${
                  isOpen ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                }`}
              >
                <div className="bg-primary py-2 px-2.5 rounded-2xl mt-2 max-sm:rounded-lg max-sm:py-1.5 max-sm:mt-1.5">
                  <p className="text-white max-sm:text-xs max-sm:font-bold">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
