"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";

function truncateText(text, maxLength = 30) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength - 3) + "..." : text;
}

export default function Card({ activationType, prices, ...product }) {
  const priceEntries = prices?.[activationType] || [];
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null; 



  const activationPriceData = (() => {
    const pricesData = priceEntries
      .map(entry => {
        const platform = Object.keys(entry).find(key => key === "PS4" || key === "PS5");
        const basePrice = entry?.[platform];
        const discountPercent = entry?.sale_amount || 0;
        if (typeof basePrice !== "number") return null;

        const discountedPrice = discountPercent
          ? Math.round(basePrice * (1 - discountPercent / 100))
          : basePrice;

        return {
          basePrice,
          discountedPrice,
          hasDiscount: discountPercent > 0,
        };
      })
      .filter(Boolean);

    if (!pricesData.length) return null;

    return pricesData.reduce((min, p) => (p.discountedPrice < min.discountedPrice ? p : min));
  })();

  const hasDiscount = activationPriceData?.hasDiscount || false;

  const hasRussianVoice = Object.values(product.voice_acting || {}).some(
    arr => Array.isArray(arr) && arr.includes("ru")
  );

  const activationLabel =
    activationType === "with_activation"
      ? "С активацией"
      : activationType === "without_activation"
      ? "Без активации"
      : null;

  const handleClick = () => {
    if (product.id) {
      localStorage.setItem("lastClickedProductId", product.id);
    }
  };

  const normalizedTitle = product.title?.replace(/’/g, "'");

  return (
  <Link
    href={`/games/${product.slug}`}
    onClick={handleClick}
    className="w-full h-full lg:w-full md:w-40 max-sm:w-28"
  >
    <div
      style={{ backgroundImage: `url(${product.main_image_url})` }}
      className="bg-gray-300 bg-cover bg-center flex flex-col p-3 rounded-2xl
                w-full h-full lg:w-full lg:h-full md:w-40 md:h-40 max-sm:w-28 max-sm:h-28"
    >
        {hasDiscount && (
          <div className="bg-red-600 flex items-center self-end shadow-red-600 shadow-[0px_0px_20px_0px_rgba(255,0,0,0.5)] gap-1 px-2 py-1 rounded-lg max-sm:px-1 max-sm:py-0.5 max-sm:rounded-sm">
            <Image src="/icons/fire.svg" alt="fire" width={14} height={14} className="max-sm:w-2.5" />
            <span className="font-bold text-white text-xs max-sm:text-[8px]">SALE</span>
          </div>
        )}

        <div className="mt-auto flex flex-col gap-[5px]">
          {hasRussianVoice && (
            <div className="flex items-center bg-white self-start gap-1 px-1 py-0.5 rounded-lg max-sm:p-0.5 max-sm:rounded-sm">
              <Image src="/img/russia.png" alt="russian flag" width={20} height={20} className="max-sm:w-3" />
              <span className="font-bold text-primary text-xs max-sm:text-[8px]">
                Рус. озв
              </span>
            </div>
          )}


        </div>
      </div>

      <div className="flex flex-col gap-2 md:gap-1.5 max-sm:gap-1 mt-2 md:mt-1.5 max-sm:mt-1">
        <h3 className="text-primary font-bold text-xl md:text-lg max-sm:text-sm">
          {truncateText(normalizedTitle, 20)}
        </h3>

        <div className="flex items-center gap-2 md:gap-1.5 max-sm:gap-1">
          <Image src="/star.svg" alt="star" width={16} height={16} className="md:w-4 max-sm:w-3" />
          <span className="text-primary font-bold text-sm md:text-xs max-sm:text-[10px]">5</span>
          {product.consoles?.map((console, idx) => (
            <span key={idx} className="text-primary font-medium md:text-xs max-sm:text-[10px]">
              {console}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-1.5">
          {activationPriceData ? (
            <>
              <p className="text-primary text-xl font-bold md:text-lg max-sm:text-sm">
                {`от ${activationPriceData.discountedPrice}Р`}
              </p>
              {hasDiscount && (
                <>
                  <p className="text-gray-500 line-through md:text-sm max-sm:text-xs">
                    {activationPriceData.basePrice}Р
                  </p>
                  <div className="bg-red-600 text-white font-bold 
                                  px-[3px] py-[3px] rounded-lg 
                                  md:px-1.5 md:py-1 md:text-xs
                                  max-sm:px-1 max-sm:text-[8px] mt-[-10px]"
                  >
                    -{Math.round(
                      ((activationPriceData.basePrice - activationPriceData.discountedPrice) /
                        activationPriceData.basePrice) * 100
                    )}%
                  </div>
                </>
              )}
            </>
          ) : (
            <p className="text-primary text-xl font-bold md:text-lg max-sm:text-sm">
              Нет в наличии
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
