"use client";

import Image from "next/image";

export default function SubscriptionHero() {

  const handleScroll = () => {
  const target = document.getElementById("subscriptions");
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
  };

  return (
    <div
      style={{ backgroundImage: `url("/hero.png")` }}
      className="bg-center bg-cover 
                max-sm:h-[250px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-screen 
                rounded-b-[50px] flex justify-center overflow-x-hidden"
    >

      {/* Текст + кнопка */}
      <div className="sm:absolute left-50 top-90 xl:w-[800px] sm:w-[600px] md:w-[470px] md:left-13 md:top-65 xl:left-45 xl:top-90 mx-auto max-sm:flex flex-col justify-center items-center max-sm:w-44 text-center sm:text-left">
        <h1 className="text-[120px] xl:text-[100px] lg:text-[110px] md:text-[60px] sm:text-[50px] max-sm:text-3xl text-secondary font-extrabold leading-tight">
          PlayStation Plus
        </h1>

        <p className="text-4xl xl:text-4xl lg:text-3xl md:text-lg sm:text-base max-sm:text-[15px] text-white mb-5">
          Подписывайтесь на PlayStation Plus и получайте доступ к играм по лучшим ценам!
        </p>
        <button onClick={handleScroll} className="bg-secondary hover:bg-yellow-200 text-[#25328F] xl:text-2xl md:text-xl font-bold rounded-2xl xl:px-8 xl:py-6 p-8 lg:px-6 lg:py-4 md:px-5 md:py-3 sm:px-4 sm:py-2 max-sm:px-3 max-sm:py-2 max-sm:text-sm">
          Подключить подписку
        </button>
      </div>



      {/* ПК: ≥1300px */}
      <div className="hidden 2xl:block absolute right-25 xl:top-25 md:top-[20] z-10 overflow-hidden overflow-x-hidden">
        <Image
          src="/img/controller.png"
          alt="PlayStation controller"
          width={700}
          height={700}
          className="rotate-[25deg] object-contain max-w-full h-auto"
        />
      </div>
      <div className="hidden 2xl:block absolute top-120 right-15 overflow-hidden overflow-x-hidden">
        <Image
          src="/img/btns.png"
          alt="PlayStation buttons"
          width={450}
          height={450}
          className="rotate-[8deg] object-contain max-w-full h-auto"
        />
      </div>

      {/* Планшет: 950px ≤ width <1300px */}
      <div className="hidden lg:block xl:hidden absolute  right-10 top-30 z-10 overflow-hidden overflow-x-hidden">
        <Image
          src="/img/controller.png"
          alt="PlayStation controller"
          width={450}
          height={450}
          className="rotate-[20deg] object-contain opacity-100"
        />
      </div>

      <div className="hidden lg:block xl:hidden absolute right-15 top-100 overflow-hidden overflow-x-hidden">
        <Image
          src="/img/btns.png"
          alt="PlayStation buttons"
          width={250}
          height={250}
          className="rotate-[8deg] object-contain opacity-90"
        />
      </div>

      

      {/* Телефон: <950px → скрываем полностью */}
    </div>
  );
}
