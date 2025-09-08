export const metadata = {
  title: "Игры для PS4 и PS5 — PSGamezz",
  description:
    "Каталог игр для PlayStation 4 и PlayStation 5 на PSGamezz. Удобный поиск по жанрам, платформам и подпискам, безопасная онлайн-покупка игр и подписок.",
  keywords:
    "игры ps4, игры ps5, купить игры playstation, каталог игр ps4, каталог игр ps5, ps plus игры, ea play игры, онлайн покупка игр",
  openGraph: {
    url: "https://psgamezz.ru/games",
    title: "Игры для PS4 и PS5 — PSGamezz",
    description:
      "Выбирай и покупай игры для PS4 и PS5 на PSGamezz. Каталог по жанрам, платформам и подпискам, безопасная оплата, мгновенный доступ.",
  },
};

import GamesPageClient from "./GamesPageClient";

export default function SubscriptionPage() {
  return <GamesPageClient />;
}
