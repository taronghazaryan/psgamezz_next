"use client";

import products from "../../data/products.json";
import Card from "../Games/Card";

export default function GamesOfTheSeries() {
  return (
    <div className="main-container text-primary px-[100px] max-lg:px-[15px] mb-[50px] max-lg:mb-[30px]">
      <h2 className="text-[32px] max-lg:text-[20px] max-lg:text-center font-bold mb-[15px] max-lg:mb-[10px] mt-[20px] max-lg:mt-[30px]">
        Игры серии
      </h2>
      <div className="flex flex-wrap gap-[25px] max-lg:gap-[10px]">
        {products.slice(0, 3).map((item, index) => (
          <Card key={index} {...item} activationType="with_activation" />
        ))}
      </div>
    </div>
  );
}
