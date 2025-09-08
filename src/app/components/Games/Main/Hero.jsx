"use client";

import { useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  const [activeHero, setActiveHero] = useState(0);

  const games = [
    {
      img: "/fifa.jpg",
      title: "EA SPORTS FC 25 PS4 & PS5",
      description:
        "Откройте для себя новейший футбольный симулятор EA Sports FC 25. Станьте частью команды.",
      price: 2140,
    },
    {
      img: "/fifa.jpg",
      title: "FC 25 + Ps Plus Essential 3 месяца",
      description:
        "Откройте для себя новейший футбольный симулятор EA Sports FC 25. Станьте частью команды.",
      price: 2140,
    },
    {
      img: "/spiderman.jpg",
      title: "Marvel’s Spider-Man 2",
      description:
        "Издание включает: Полную версию игры Marvel’s Человек-Паук 2 для PS5®. Люди-паук и Питер Паркер и Майл.",
      price: 3040,
    },
  ];

  const { img, title, description, price } = games[activeHero];

  return (
    <div className="w-full max-w-[1400px] mx-auto">
      {/* Desktop */}
      <div className="hidden sm:grid grid-cols-4 gap-5 py-12">
        <div
          style={{ backgroundImage: `url(${img})` }}
          className="relative flex flex-col justify-end items-start px-8 py-14 col-span-3 bg-center bg-cover rounded-3xl h-[500px]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent rounded-3xl"></div>
          <div className="z-10">
            <h2 className="text-white font-bold text-4xl mb-4">{title}</h2>
            <p className="text-white font-medium w-full max-w-xl mb-6 line-clamp-3">
              {description}
            </p>
            <button className="bg-white text-primary font-bold px-12 py-3 rounded-xl">
              Купить от {price}₽
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {games.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveHero(index)}
              style={{ backgroundImage: `url(${item.img})` }}
              className="relative flex items-end px-4 py-4 h-40 bg-center bg-cover rounded-3xl cursor-pointer"
            >
              <div
                className={`absolute inset-0 rounded-3xl transition-all duration-300 ${
                  activeHero === index
                    ? "bg-gradient-to-r from-black/70 via-black/30 to-transparent"
                    : "bg-black/50"
                }`}
              ></div>
              <p className="text-white font-bold z-10 text-sm">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="sm:hidden py-6 px-4">
        <Swiper
          spaceBetween={16}
          pagination={{ dynamicBullets: true }}
          modules={[Pagination]}
        >
          {games.map((item, index) => (
            <SwiperSlide
              key={index}
              onClick={() => setActiveHero(index)}
              style={{ backgroundImage: `url(${item.img})` }}
              className="relative flex items-end px-4 py-4 h-[220px] bg-center bg-cover rounded-3xl cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent rounded-3xl"></div>
              <div className="z-10 w-full">
                <h2 className="text-white font-bold text-lg mb-1 line-clamp-1">
                  {item.title}
                </h2>
                <p className="text-white font-medium text-[10px] line-clamp-2 mb-2">
                  {item.description}
                </p>
                <button className="bg-white text-primary font-bold w-full py-1.5 rounded-lg text-xs">
                  Купить от {item.price}₽
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
