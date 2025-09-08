"use client"; // ⚠️ Для использования useState

import { useState } from "react";
import AllGames from "../components/Games/AllGames";
import Main from "../components/Games/Main";
import Sales from "../components/Games/Sales";

export default function GamesPage() {
  const tabs = ["Главная", "Все игры", "Скидки"];
  const [activeTab, setActiveTab] = useState("Главная");

  return (
    <div className="main-container !max-w-[100vw] border-t border-white/20">
      {/* Tab Header */}
      <div className="sm:py-3 flex justify-center bg-[#202562]">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 text-white transition duration-200 max-sm:text-xs cursor-pointer ${
                activeTab === tab ? "font-bold" : "font-normal"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "Главная" && <Main />}
        {activeTab === "Все игры" && <div className="px-6"><AllGames /></div>}
        {activeTab === "Скидки" && <Sales />}
      </div>
    </div>
  );
}
