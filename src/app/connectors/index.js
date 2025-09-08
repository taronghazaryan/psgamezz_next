import axios from "axios";

const Api = axios.create({
  baseURL: "https://psgamezz.ru",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "dQbLtO9jVjPXZYVWr!xbUc%O8k%yNgOQahOoXZjWivr5FFoN!BZU*619Y*w$$XhLg",
  },
});

// Функция получения CSRF из cookie
const getCSRFToken = () => {
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : "";
};

// Интерцептор запросов: добавляем CSRF к POST/PUT/DELETE
Api.interceptors.request.use((config) => {
  const method = config.method?.toLowerCase();
  if (method === "post" || method === "put" || method === "delete") {
    config.headers["X-CSRFToken"] = getCSRFToken();
  }
  return config;
}, (error) => Promise.reject(error));

// Интерцептор на ответы
Api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default Api;
