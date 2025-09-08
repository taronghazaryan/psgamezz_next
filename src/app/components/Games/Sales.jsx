"use client";

import { useEffect, useState } from "react";
import { fetchGamesPage } from "../../api/games";
import Card from "./Card";

export default function SalesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialGames, setInitialGames] = useState([]);

  useEffect(() => {
    async function loadGames(url) {
      if (!url) url = undefined; // default url in fetchGamesPage
      try {
        const data = await fetchGamesPage(url);

        const gamesWithDiscount = data.results.filter((game) =>
          Object.values(game.prices || {}).some((priceArray) =>
            priceArray.some((entry) => entry.sale_amount > 0)
          )
        );

        setGames(gamesWithDiscount);
        setInitialGames(gamesWithDiscount); // сохраняем начальный набор
        setNextPageUrl(data.next || null);
      } catch (err) {
        console.error("Ошибка загрузки игр:", err);
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, []);

  const handleLoadMore = async () => {
    if (!nextPageUrl) return;

    setLoadingMore(true);
    try {
      const data = await fetchGamesPage(nextPageUrl);

      const gamesWithDiscount = data.results.filter((game) =>
        Object.values(game.prices || {}).some((priceArray) =>
          priceArray.some((entry) => entry.sale_amount > 0)
        )
      );

      setGames((prev) => [...prev, ...gamesWithDiscount]);
      setNextPageUrl(data.next || null);
    } catch (err) {
      console.error("Ошибка загрузки следующей страницы:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleShowLess = () => {
    setGames(initialGames);
    setNextPageUrl(null);
  };

  if (loading)
    return <p className="text-center text-black text-lg mt-10">Загрузка...</p>;

  if (!games.length)
    return (
      <h1 className="text-center text-black text-2xl mt-10">
        Скидок пока нет
      </h1>
    );

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex flex-wrap gap-4 justify-center">
        {games.map((game, index) => (
          <Card
            key={`${game.slug}-${index}`}
            {...game}
            activationType="with_activation"
          />
        ))}
      </div>

      {nextPageUrl ? (
        <button
          onClick={handleLoadMore}
          disabled={loadingMore}
          className="mt-6 mb-5 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {loadingMore ? "Загрузка..." : "Показать ещё"}
        </button>
      ) : games.length > initialGames.length ? (
        <button
          onClick={handleShowLess}
          className="mt-6 mb-5 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Показать меньше
        </button>
      ) : null}
    </div>
  );
}
