"use client";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div
      className="main-container relative h-[320px] lg:min-h-[759px] bg-[#100E80] text-white overflow-hidden lg:py-10 py-4 px-4 md:px-8 rounded-b-2xl !max-w-[100vw]"
      style={{
        backgroundImage: `url(/images/background.png)`,
        backgroundSize: "cover",
      }}
    >
      <div className="  main-container relative ">
        {/* Белый контроллер */}
        <div className="absolute hidden md:block xl:top-[28%] md:top-[24%] md:left-[-40px] w-[125px] md:w-[376px] xl:left-[4%] xl:w-[800px]">
          <Image
            src="/images/6.png"
            alt="White Controller"
            className="absolute rotate-[-30.1deg] object-contain"
            width={526}
            height={397}
          />
        </div>

        {/* Оранжевый контроллер */}
        <div className="absolute hidden md:block xl:top-[30%] md:top-[25%] w-[125px] md:w-[376px] md:left-[600px] xl:left-[1200px] xl:w-[800px]">
          <Image
            src="/images/7.png"
            alt="Orange Controller"
            className="absolute rotate-[30deg] object-contain"
            width={576}
            height={447}
          />
        </div>

        {/* Текст */}
        <div className="flex flex-col items-center justify-center text-center w-full mt-18 md:mt-0">
          <p className="max-w-[100%] mx-auto text-center text-[30px] font-[900] md:text-[48px] xl:text-[80px]">
              Всё для вашей PlayStation <br />
            <span className="text-[#FFE245]">без головной боли</span>
          </p>


          {/* Блоки */}
          <div className="flex flex-col items-center justify-center mt-1 md:mt-35 xl:mt-5 md:gap-5 xl:gap-1">

            <div className="hidden md:flex flex-col items-center justify-between text-center bg-[#0E56D7] rounded-[20px]
                            w-[200px] sm:w-[250px] md:w-[310px] xl:w-[350px] 
                            h-[150px] sm:h-[160px] md:h-[165px] xl:h-[200px] py-3 px-3">
              <p className="text-[10px] font-[700] md:text-[20px] xl:text-[25px]">
                Больше 10000 пользователей
              </p>
              <p className="text-[18px] mb-1 font-[500] xl:text-[20px]">
                постоянно играют с нами
              </p>
              <p className="text-[20px] bg-white text-[#0E56D7] w-[104px] h-[19px] flex items-center justify-center rounded-[6px] font-[700] lg:text-[20px] lg:w-[250px] mx-auto lg:h-[45px] cursor-pointer">
                Прочитать отзывы
              </p>
            </div>

            {/* Игры + Подписки */}
            <div className="flex gap-15 lg:gap-[23rem] mt-[20px] sm:mt-[20px]">
              {/* Игры */}
              <div className="hidden md:flex flex-col items-center justify-between text-center bg-[#0E56D7] rounded-[20px]
                              w-[200px] sm:w-[250px] md:w-[310px] xl:w-[350px] 
                              h-[150px] sm:h-[160px] md:h-[165px] xl:h-[200px] py-3 px-3">
                <p className="text-[10px] font-[700] md:text-[20px] xl:text-[25px]">
                  Игры не кончаются — свыше 5188 игр
                </p>
                <p className="text-[18px] mb-1 font-[500] xl:text-[20px]">
                  в коллекции
                </p>
                <Link href="/games">
                  <p className="text-[9px] bg-[#FFE246] text-[#0E56D7] w-[104px] h-[19px] flex items-center justify-center rounded-[6px] font-[700] md:text-[20px] xl:text-[20px] lg:w-[200px] mx-auto lg:h-[45px] cursor-pointer">
                    Играть
                  </p>
                </Link>
              </div>

              {/* Подписки */}
              <div className="hidden md:flex flex-col items-center justify-between text-center bg-[#0E56D7] rounded-[20px]
                              w-[200px] sm:w-[250px] md:w-[310px] xl:w-[350px] 
                              h-[150px] sm:h-[160px] md:h-[165px] xl:h-[200px] py-3 px-3">
                <p className="text-[10px] font-[700] md:text-[20px] xl:text-[25px]">
                  Подписки PS Plus и EA Play
                </p>
                <p className="text-[18px] mb-1 font-[500] xl:text-[20px]">
                  по низкой цене
                </p>
                <Link href="/subscription">
                  <p className="text-[9px] bg-[#FFE246] text-[#0E56D7] w-[104px] h-[19px] flex items-center justify-center rounded-[6px] font-[700] md:text-[20px] xl:text-[20px] lg:w-[200px] mx-auto lg:h-[45px] cursor-pointer">
                    Подключить
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
