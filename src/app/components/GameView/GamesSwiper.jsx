"use client";

import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../Games/Card";
import Image from "next/image";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function GamesSwiper({ products = [] }) {
  const randomized = shuffleArray(products);

  return (
    <div className="max-w-[1400px] mx-auto relative">
      <div className="main-container relative mt-8 overflow-hidden">
        <div className="flex gap-3 px-15 mb-6 max-sm:justify-between max-sm:px-4 max-sm:mb-3 items-center">
          <button className="swiper-button-prev-custom3" aria-label="Previous Slide">
            <Image src="/icons/left.svg" alt="left arrow" width={20} height={20} />
          </button>
          <p className="text-primary text-3xl font-bold max-sm:text-base">Новинки</p>
          <button className="swiper-button-next-custom3 sm:ml-auto" aria-label="Next Slide">
            <Image src="/icons/right.svg" alt="right arrow" width={20} height={20} />
          </button>
        </div>

        <Swiper
          spaceBetween={15}
          modules={[Navigation, Pagination, Autoplay, Scrollbar]}
          slidesPerView="auto"
          breakpoints={{
            1024: { centeredSlides: false },
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom3",
            prevEl: ".swiper-button-prev-custom3",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="solutions-swiper"
        >
          {randomized.map((item, index) => (
            <SwiperSlide key={item.id || item.slug || index} className="!w-auto">
              <Card {...item} activationType="with_activation" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
