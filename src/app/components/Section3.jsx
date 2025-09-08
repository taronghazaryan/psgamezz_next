"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

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

const Section3 = () => {
  const bonusCards = [
    {
      img: "/images/12.png",
      title: "Получай кешбек за покупки",
      texts: ["2% бонусов до 4000 рублей", "5% бонусов до 10000 рублей", "7% бонусов до 50000 рублей"]
    },
    {
      img: "/images/13.png",
      title: "Прошёл игру?",
      texts: ["Верни аккаунт и получи 25% её стоимости на бонусный счёт"]
    },
    {
      img: "/images/14.png",
      title: "100 бонусов за регистрацию",
      button: "Зарегистрироваться"
    },
  ];

  return (
    <div className="relative w-full py-10">
      {/* Title + Arrows */}
      <div className="flex justify-between items-center max-w-[1140px] mx-auto px-4 mb-8">
        <button className="swiper-button-prev-custom text-[#1e1f5e]">
          <FaArrowLeft size={20} />
        </button>
        <h2 className="text-center text-[16px] sm:text-[20px] md:text-[28px] lg:text-[32px] text-[#1e1f5e] font-[700]">
          Отзывы о наших сервисах
        </h2>
        <button className="swiper-button-next-custom text-[#1e1f5e]">
          <FaArrowRight size={20} />
        </button>
      </div>

      {/* Swiper */}
      <div className="relative px-4 w-[95%] mx-auto">
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
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="h-[200px] md:h-[220px] bg-[#212662] rounded-xl shadow-md p-4 flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-2">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-sm md:text-base text-white">
                      {item.name}
                    </h4>
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

      {/* Bonus cards */}
      <div className="mt-16">
        <p className="text-center w-[85%] md:w-[60%] mx-auto text-[16px] sm:text-[20px] md:text-[28px] lg:text-[32px] font-[700] text-[#202562] mb-10">
          Оплачивай game-бонусами покупку игр или пополнение кошелька
        </p>
        <div className="flex flex-wrap justify-center gap-4 w-[90%] mx-auto">
          {bonusCards.map((card, i) => (
            <div key={i} className="flex flex-col items-center gap-2 w-[95%] md:w-[360px] h-auto rounded-[20px] bg-gradient-to-t from-blue-900 to-blue-500 p-4">
              <Image src={card.img} className="w-[70px] md:w-[120px]" alt={card.title} width={120} height={120} />
              <div className="text-center text-white">
                <p className="text-[14px] md:text-[20px] font-[700] mb-1">{card.title}</p>
                {card.texts?.map((text, idx) => (
                  <p key={idx} className="text-[12px] md:text-[16px] font-[600]">{text}</p>
                ))}
                {card.button && (
                  <button className="bg-[#0E56D7] w-[80%] h-[32px] md:h-[45px] rounded-[10px] text-[12px] md:text-[16px] font-[700]">
                    {card.button}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section3;
