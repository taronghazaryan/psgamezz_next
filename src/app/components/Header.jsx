"use client";

import { useState, useEffect, useRef } from "react";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useBasket } from "../context/BasketContext";
import { searchGames } from "../api/games";

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { basket } = useBasket();
  const totalItems = basket.reduce((sum, item) => sum + (item.quantity ?? 1), 0);
  const menuRef = useRef(null);
  const debounceRef = useRef(null);



  const getLinkStyle = (path) => {
    if (pathname === "/") return "text-white";
    if (pathname === "/subscription" && path === "/subscription") return "text-[#FEE44E]";
    return pathname === path ? "text-[#00B5F1]" : "text-white";
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchGames(query);
        setResults(data.results || []);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [query]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelectGame = (game) => {
    localStorage.setItem("lastClickedProductId", game.id);
    setQuery("");
    setMobileSearchOpen(false);
    setMenuOpen(false);
  };
   
  return (
    <div className="bg-[#202562] text-white relative px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center py-2 justify-between">
          <button className="text-2xl hidden max-[900px]:block" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <IoClose /> : <IoMenu />}
          </button>

          <button
            className="text-[2rem] hidden max-[900px]:block max-[600px]:text-[1.5rem]"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          >
            <IoSearch />
          </button>

          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Image
              className="w-[120px] h-[72px] max-[600px]:w-[60px] max-[600px]:h-[31px]"
              src="/logo/1.png"
              alt="Logo"
              width={120}
              height={72}
              priority
            />
          </Link>

          <Link href="/games" className="max-[900px]:hidden">
            <div className={`flex items-center gap-1 ${getLinkStyle("/games")}`}>
              <Image
                className="h-[22px] w-[22px]"
                src={pathname === "/games" ? "/logo/3blue.png" : "/logo/3.png"}
                alt="Игры"
                width={22}
                height={22}
              />
              <p className="text-[16px] font-[500]">игры</p>
            </div>
          </Link>

          <Link href="/subscription" className="max-[900px]:hidden">
            <div className={`flex items-center gap-1 ${getLinkStyle("/subscription")}`}>
              <Image
                className="h-[22px] w-[22px]"
                src={pathname === "/subscription" ? "/logo/2yellow.png" : "/logo/2.png"}
                alt="Подписки"
                width={22}
                height={22}
              />
              <p className="text-[16px] font-[500]">подписки</p>
            </div>
          </Link>

          {/* ПК поиск */}
          <div className="relative w-[220px] max-[900px]:hidden">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <IoSearch className="text-gray-400 text-[1.2rem]" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск..."
              className="w-full pr-10 pl-4 py-2 bg-[#282E79] text-white rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {query && (
              <div className="absolute top-full left-0 w-full bg-[#202562] rounded-md shadow-lg mt-1 max-h-[300px] overflow-y-auto z-50">
                {loading ? (
                  <p className="p-2 text-gray-400">Загрузка...</p>
                ) : results.length > 0 ? (
                  results.map((game) => (
                    <Link
                      key={game.id}
                      href={`/games/${game.slug}`}
                      className="flex items-center gap-3 p-2 hover:bg-[#2f368a] transition rounded-lg"
                      onClick={() => handleSelectGame(game)}
                    >
                      <Image
                        src={game.main_image_url}
                        alt={game.title}
                        width={48}
                        height={64}
                        className="w-12 h-16 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex flex-col">
                        <p className="font-medium">{game.title}</p>
                        <p className="text-sm text-gray-300">
                          от {game.prices?.without_activation?.[0]?.PS4 || game.prices?.without_activation?.[0]?.PS5 || "—"} ₽
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="p-2 text-gray-400">Ничего не найдено</p>
                )}
              </div>
            )}
          </div>

    <Link href="/basket" onClick={() => setMenuOpen(false)}>
      <div className="relative flex items-center gap-1">
        <Image
          className="h-[22px] w-[22px] max-[600px]:w-[12px] max-[600px]:h-[12px]"
          src="/logo/5.png"
          alt="Корзина"
          width={22}
          height={22}
        />

        {mounted && totalItems > 0 && (
          <span
            className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold
                       rounded-full flex items-center justify-center
                       min-w-[18px] h-[18px] px-1 leading-none"
          >
            {totalItems}
          </span>
        )}

        <p className="text-[16px] font-[500] max-[900px]:hidden">корзина</p>
      </div>
    </Link>
        </div>

        {/* мобильный поиск */}
        {mobileSearchOpen && (
          <div className="px-4 py-2 bg-[#282E79] md:hidden relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск..."
              className="w-full pr-10 pl-4 py-2 bg-[#202562] text-white rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {query && (
              <div className="absolute top-full left-0 w-full bg-[#202562] rounded-md shadow-lg mt-1 max-h-[250px] overflow-y-auto z-50">
                {loading ? (
                  <p className="p-2 text-gray-400">Загрузка...</p>
                ) : results.length > 0 ? (
                  results.map((game) => (
                    <Link
                      key={game.id}
                      href={`/games/${game.slug}`}
                      className="flex items-center gap-3 p-2 hover:bg-[#2f368a] transition rounded-lg"
                      onClick={() => handleSelectGame(game)}
                    >
                      <Image
                        src={game.main_image_url}
                        alt={game.title}
                        width={40}
                        height={56}
                        className="w-10 h-14 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex flex-col">
                        <p className="font-medium text-sm">{game.title}</p>
                        <p className="text-xs text-gray-300">
                          от {game.prices?.without_activation?.[0]?.PS4 || game.prices?.without_activation?.[0]?.PS5 || "—"} ₽
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="p-2 text-gray-400">Ничего не найдено</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* мобильное меню */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute top-full left-0 w-full bg-[#282E79] flex flex-col items-center gap-6 py-6 md:hidden"
          >
            <Link href="/" onClick={() => setMenuOpen(false)} className="text-lg font-medium">
              Главная
            </Link>
            <Link href="/games" onClick={() => setMenuOpen(false)} className="text-lg font-medium">
              Игры
            </Link>
            <Link href="/subscription" onClick={() => setMenuOpen(false)} className="text-lg font-medium">
              Подписки
            </Link>
            <Link href="/basket" onClick={() => setMenuOpen(false)} className="text-lg font-medium">
              Корзина
            </Link>
          </div>
        )}
        </div>
    </div>
  );
};

export default Header;
