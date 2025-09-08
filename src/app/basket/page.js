export const metadata = {
  title: "Корзина — PSGamezz",
  description:
    "Корзина PSGamezz: проверка выбранных игр и подписок, удобное оформление заказа, безопасная онлайн-оплата. Поддержка PS4 и PS5.",
  keywords:
    "корзина playstation, корзина ps plus, корзина ea play, ps4 игры корзина, ps5 игры корзина, купить игры ps5, купить подписку ps plus, купить ea play",
  openGraph: {
    url: "https://psgamezz.ru/basket",
    title: "Корзина — PSGamezz",
    description:
      "Заверши покупку на PSGamezz: подписки PS Plus и EA Play, игры для PS4 и PS5. Удобная корзина и безопасная оплата.",
  },
};


import BasketPageClient from "./BasketPageClient";

export default function SubscriptionPage() {
  return <BasketPageClient />;
}
