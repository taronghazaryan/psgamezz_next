import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // только здесь импорт CSS
import { BasketProvider } from "./context/BasketContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PSGamezz",
  description: "Магазин игр и подписок для PlayStation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col `}>
        <BasketProvider>
          <Header />
            <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </BasketProvider>
      </body>
    </html>
  );
}
