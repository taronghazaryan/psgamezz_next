"use client";

export default function HowToUse() {
  const steps = [
    {
      text: "Вы получаете логин и пароль от игрового аккаунта.",
      number: 1,
    },
    {
      text: "Добавляете его на консоль, включаете активацию аккаунта в настройках по инструкции.",
      number: 2,
    },
    {
      text: "После активации аккаунта подписка начинает работать на всех аккаунтах вашей консоли!",
      number: 3,
    },
  ];

  return (

      <section className="flex justify-center overflow-hidden">
        <div className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 md:gap-14 gap-3 xl:flex justify-center">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative w-[280px] h-[115px] md:w-[280px] md:h-[220px] xl:w-full xl:h-[170px]   max-sm:w-full border border-[rgba(32,37,98,1)] rounded-[16px] px-[16px] flex flex-col justify-center items-center text-center max-sm:px-3"
              >
                <p className="text-[20px] font-[600] leading-[100%] tracking-[-0.02em] text-[rgba(32,37,98,1)] max-sm:text-[13px]">
                  {step.text}
                </p>

                <span className="absolute top-3 right-3 w-[40px] h-[40px] max-sm:w-[28px] max-sm:h-[28px] rounded-[5px] border border-[rgba(32,37,98,1)] flex items-center justify-center font-bold text-[#1A2C79] text-[32px] max-sm:text-[18px]">
                  {step.number}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
