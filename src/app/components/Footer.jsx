import Image from "next/image";
import { FaTelegramPlane, FaYoutube, FaVk } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#202562] text-white py-10 px-6">
<div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row md:flex-wrap md:justify-between ">  {/* Лого */}
  <div className="flex flex-col">
          <Image
            src="/logo/1.png"
            alt="Logo"
            width={128}
            height={40}
            className="mb-4"
          />
          <p className="text-sm">
            Выдаём заказы с 10:00 до 23:00 (МСК)
          </p>
          <hr className="border-gray-700 my-4 w-62" />
          <p className="text-xs text-gray-400">
            © 2025 psgamezz.ru Все права защищены.
          </p>
        </div>

        {/* Соцсети */}
        <div>
          <h4 className="font-bold mb-3">Соц.сети</h4>
          <div className="flex space-x-3 mb-3">
            <a
              href="https://t.me/psgamezz"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0088cc] transition-colors"
            >
              <FaTelegramPlane size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
            >
              <FaYoutube size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4a76a8] transition-colors"
            >
              <FaVk size={20} />
            </a>
          </div>
          <h4 className="font-bold mb-1">Напиши нам</h4>
          <a
            href="mailto:support@psgamezz.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-white"
          >
            support@psgamezz.ru
          </a>
        </div>

        {/* Сервисы */}
        <div>
          <h4 className="font-bold mb-3">Сервисы</h4>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Покупка игровых аккаунтов
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Пополнение аккаунта
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Покупка подписок аккаунта
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Покупка игр
              </a>
            </li>
          </ul>
        </div>

        {/* Покупателям */}
        <div>
          <h4 className="font-bold mb-3">Покупателям</h4>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Поддержка
              </a>
            </li>
            <li>
              <a
                href="https://disk.yandex.ru/i/b8Up-MiVGcM-Og"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Оферта
              </a>
            </li>
          </ul>
        </div>

        {/* Работа */}
        <div>
          <h4 className="font-bold mb-3">Работать с нами</h4>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Если ты специалист
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Если ты блогер
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Партнёрство
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
