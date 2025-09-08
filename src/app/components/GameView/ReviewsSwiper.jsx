"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";

export default function ReviewsSwiper() {
  const reviews = [
    {
      id: 1,
      name: "Ulugbek Karimov",
      role: "Dizayner",
      review: "Xizmat juda zo‘r! Mijozlarga munosabat professional darajada.",
      avatar: "https://i.pravatar.cc/150?img=32",
      rating: 5,
    },
    {
      id: 2,
      name: "Dilfuza Rajabova",
      role: "SMM Mutaxassisi",
      review: "Buyurtmam tez tayyorlandi va sifat juda yaxshi!",
      avatar: "https://i.pravatar.cc/150?img=47",
      rating: 4,
    },
    {
      id: 3,
      name: "Anvar Turg‘unov",
      role: "Frontend Dasturchi",
      review: "Menga juda yoqdi, yana albatta buyurtma beraman.",
      avatar: "https://i.pravatar.cc/150?img=10",
      rating: 5,
    },
    {
      id: 4,
      name: "Malika Hamdamova",
      role: "UX Researcher",
      review: "Eng yaxshi xizmatlardan biri, do‘stlarimga ham tavsiya qilaman.",
      avatar: "https://i.pravatar.cc/150?img=39",
      rating: 5,
    },
    {
      id: 5,
      name: "Jasur Abdujalilov",
      role: "Marketing Manager",
      review: "Sifatli, tezkor va ishonchli — aynan kerakligidek!",
      avatar: "https://i.pravatar.cc/150?img=28",
      rating: 4,
    },
  ];

  return (
    <div className="main-container text-primary px-[100px] max-lg:px-[15px] my-[50px] max-lg:[30px]">
      <div className="flex justify-between items-center max-w-[1140px] mx-auto px-4 md:px-8 mb-8">
        <button className="swiper-button-prev-custom text-[#1e1f5e]">
          <FaArrowLeft size={22} />
        </button>
        <h2 className="text-center text-[15px] text-[#1e1f5e] font-[700] md:text-[32px]">
          Отзывы о наших сервисах
        </h2>
        <button className="swiper-button-next-custom text-[#1e1f5e]">
          <FaArrowRight size={22} />
        </button>
      </div>

      <div className="relative overflow-visible px-4 md:px-[30px] w-[95%] mx-auto">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          spaceBetween={20}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1.3 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="overflow-visible"
        >
          {reviews.map((item) => (
            <SwiperSlide key={item.id} className="w-auto">
              <div className="h-[200px] bg-[#212662] rounded-xl shadow-md p-4 flex flex-col justify-between">
                <div className="flex items-center gap-4 mb-2">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-sm text-white">{item.name}</h4>
                    <p className="text-xs text-white">{item.role}</p>
                  </div>
                </div>

                <p className="text-sm text-white italic">“{item.review}”</p>

                <div className="flex items-center gap-1 mt-2">
                  {Array(item.rating)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
