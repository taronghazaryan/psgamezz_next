// src/app/games/[slug]/page.js
import Hero from "../../components/GameView/Hero";
import GamesSwiper from "../../components/GameView/GamesSwiper";
import ReviewsSwiper from "../../components/GameView/ReviewsSwiper";
import axios from "axios";

const API_HEADERS = {
  Authorization: 'dQbLtO9jVjPXZYVWr!xbUc%O8k%yNgOQahOoXZjWivr5FFoN!BZU*619Y*w$$XhLg',
};
const API_URL = "https://psgamezz.ru/api/games/";

// функция для получения одной игры по slug
async function getGameBySlug(slug) {
  try {
    const res = await axios.get(`${API_URL}?slug=${slug}`, { headers: API_HEADERS });
    return res.data.results[0] || null; // возвращаем первую игру
  } catch (e) {
    console.error("Ошибка при загрузке игры:", e.response?.status, e.response?.data);
    return null;
  }
}

// функция для получения всех игр
async function getNewGames() {
  try {
    const res = await axios.get(API_URL, { headers: API_HEADERS });
    return res.data.results || [];
  } catch (e) {
    console.error("Ошибка при загрузке новинок:", e);
    return [];
  }
}

// // SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;

  // получаем конкретную игру по slug
  const response = await fetch(
    `https://psgamezz.ru/api/games/?slug=${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "dQbLtO9jVjPXZYVWr!xbUc%O8k%yNgOQahOoXZjWivr5FFoN!BZU*619Y*w$$XhLg" // если нужен токен
      },
      next: { revalidate: 60 }, // кэширование на 60 секунд
    }
  );

  if (!response.ok) {
    return {
      title: "Игра не найдена",
      description: "Такой игры нет в базе",
    };
  }

  const game = await response.json();

  return {
    title: game.results[0].title || "Магазин игр",
    description: game.results[0].about || "Описание игры отсутствует",
    openGraph: {
      title: game.results[0].title || "Магазин игр",
      description: game.results[0].about || "Описание игры отсутствует",
      images: [
        {
          url: game.results[0].main_image_url,
          width: 1200,
          height: 630,
          alt: game.results[0].title || "Обложка игры",
        },
      ],
    },
  };
}


// серверная страница
export default async function GamesViewPage({ params }) {
  const { slug } = await params;
  const productItem = await getGameBySlug(slug);
  if (!productItem) return <div>Игра не найдена</div>;

  const newGames = await getNewGames();

  return (
    <div>
      <Hero productItem={productItem} />      {/* клиентский компонент */}
      <GamesSwiper products={newGames} />     {/* клиентский компонент */}
      <ReviewsSwiper />                        {/* клиентский компонент */}
    </div>
  );
}
