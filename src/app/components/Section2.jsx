"use client";

import Image from "next/image";

const Section2 = () => {
  return (
            <div className="w-full max-w-[1400px] mx-auto">

    <div className="md:mb-10">
      <p className="font-[700] text-[#202562] text-[16px] sm:text-[20px] md:text-[28px] lg:text-[32px] text-center py-4 my-4">
        Мы создаем рай для геймеров
      </p>

      {/* Mobile layout */}
      <div className="flex flex-col gap-3 md:hidden">
        <Image className="w-[90%] mx-auto cursor-pointer" src="/images/Card1.png" alt="Card1" width={650} height={400} />
        <Image className="w-[90%] mx-auto cursor-pointer" src="/images/Card2.png" alt="Card2" width={650} height={400} />
        <Image className="w-[90%] mx-auto cursor-pointer rounded-[30px]" src="/images/Card3.png" alt="Card3" width={650} height={400} />
        <Image className="w-[90%] mx-auto cursor-pointer rounded-[30px]" src="/images/Card4.png" alt="Card4" width={650} height={400} />
      </div>

      {/* Tablet & Desktop */}
      <div className="hidden md:flex items-center justify-center gap-6 flex-wrap lg:flex-nowrap">
        <div className="flex flex-col gap-3">
          <Image className="w-full max-w-[650px] cursor-pointer" src="/images/Card1.png" alt="Card1" width={650} height={400} />
          <Image className="w-full max-w-[650px] cursor-pointer" src="/images/Card2.png" alt="Card2" width={650} height={400} />
        </div>
        <div className="flex gap-3 justify-center">
          <a href="/subscription">
            <Image
              className="xl:w-[165px] md:w-[200px] lg:w-[250px] xl:h-[480px] md:h-[450px] cursor-pointer"
              src="/images/Card3_2.png"
              alt="Card3"
              width={250}
              height={450}
            />
          </a>
          <a href="/subscription">
            <Image
              className="xl:w-[305px] md:w-[280px] lg:w-[300px] xl:h-[480px] md:h-[450px] cursor-pointer"
              src="/images/Card4_2.png"
              alt="Card4"
              width={300}
              height={450}
            />
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Section2;
