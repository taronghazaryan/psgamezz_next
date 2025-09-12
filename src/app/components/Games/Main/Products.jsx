"use client";

import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Card from "../Card";
import { fetchGamesPage } from "../../../api/games";

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

export default function Products() {
  const [saleProducts, setSaleProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadPages(numPages = 3) {
    let products = [];
    let nextUrl = undefined;
    for (let i = 0; i < numPages; i++) {
      const { results, next } = await fetchGamesPage(nextUrl);
      products = products.concat(results);
      if (!next) break;
      nextUrl = next;
    }
    return products;
  }

  useEffect(() => {
    async function loadData() {
      try {
        // Распродажа
        let saleCandidates = [];
        let nextUrl = undefined;
        for (let i = 0; i < 5 && saleCandidates.length < 25; i++) {
          const { results, next } = await fetchGamesPage(nextUrl);
          saleCandidates = saleCandidates.concat(results);
          if (!next) break;
          nextUrl = next;
        }

        const filteredSale = saleCandidates.filter(product => {
          if (!product.prices) return false;
          return Object.values(product.prices).some(priceList =>
            priceList.some(priceItem => priceItem.sale_amount > 0)
          );
        });
        setSaleProducts(shuffleArray(filteredSale).slice(0, 25));

        // Популярные
        const popular = await loadPages(3);
        const popularSorted = popular
          .sort((a, b) => (b.rate || 0) - (a.rate || 0))
          .slice(0, 50);
        setPopularProducts(popularSorted);

        // Новинки
        const newGames = await loadPages(3);
        setNewProducts(shuffleArray(newGames).slice(0, 50));
      } catch (e) {
        setError(e.message || "Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) return <div className="p-8 text-center text-black font-semibold">Загрузка...</div>;
  if (error) return <div className="p-4 text-red-500 text-center font-bold">Ошибка: {error}</div>;

  function renderSwiper(title, productsList, prevClass, nextClass, showEmptyMessage = false) {
    return (
    <div className="w-full max-w-[1400px] mx-auto">
        <div className="relative mt-8 overflow-hidden">
          <div className="flex gap-3 px-15 mb-6 max-sm:justify-between  max-sm:mb-3 items-center">
            <button className={prevClass} aria-label={`Previous Slide ${title}`}>
              <Image src='/icons/left.svg' alt="left arrow" width={20} height={20} />
            </button>
            <p className="text-primary text-3xl font-bold max-sm:text-base">{title}</p>
            <button className={nextClass} aria-label={`Next Slide ${title}`}>
              <Image src='/icons/right.svg' alt="right arrow" width={20} height={20} />
            </button>
          </div>

          <Swiper
            spaceBetween={15}
            modules={[Navigation, Pagination, Autoplay, Scrollbar]}
            scrollbar={{
              el: ".swiper-scrollbar-custom",
              draggable: true,
              dragSize: "auto",
            }}
            slidesPerView="auto"
            breakpoints={{
              320: { centeredSlides: false },
              768: { centeredSlides: false },
              1024: { centeredSlides: false },
            }}
            navigation={{ nextEl: `.${nextClass}`, prevEl: `.${prevClass}` }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="solutions-swiper"
          >
            {productsList.map((item, index) => (
              <SwiperSlide key={`${item.id || item.slug || item.title}-${index}`} className="!w-auto">
                <Card {...item} activationType="with_activation" />
              </SwiperSlide>
            ))}
          </Swiper>

          {showEmptyMessage && productsList.length === 0 && (
            <p className="mt-4 text-center text-gray-500 font-semibold">Пока нет распродажи</p>
          )}
        </div>
      </div>
      );
    }

    return (
      <div className="flex flex-col gap-12">
          {saleProducts?.length > 0 && (
          renderSwiper(
            "Распродажа 🚨",
            saleProducts,
            "swiper-button-prev-custom1",
            "swiper-button-next-custom1",
            true
          )
          )}
        {renderSwiper("Популярные", popularProducts, "swiper-button-prev-custom2", "swiper-button-next-custom2")}
        {renderSwiper("Новинки", newProducts, "swiper-button-prev-custom3", "swiper-button-next-custom3")}
      </div>
  );
}
