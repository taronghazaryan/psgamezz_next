// layout.js
import { Montserrat } from "next/font/google";
import "./globals.css";
import { BasketProvider } from "./context/BasketContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

const montserrat = Montserrat({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${montserrat.variable} font-montserrat antialiased min-h-screen flex flex-col`}>
        <BasketProvider>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </BasketProvider>
      </body>
    </html>
  );
}
