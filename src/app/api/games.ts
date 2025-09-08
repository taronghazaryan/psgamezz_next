import Api from "../connectors";

// 📌 Получение списка игр (с пагинацией)
export const fetchGamesPage = async (url: string = "/api/games/") => {
  try {
    const res = await Api.get(url);
    return {
      results: res.data.results || [],
      next: res.data.next ? res.data.next.replace("http://", "https://") : null,
    };
  } catch (err) {
    console.error("Ошибка при загрузке игр:", err);
    return { results: [], next: null };
  }
};

// 📌 Поиск игр (с пагинацией)
export const searchGames = async (query: string, page: number = 1) => {
  if (!query) return { results: [], next: null };

  try {
    const res = await Api.get(`/api/games/?title=${query}&page=${page}`);
    return {
      results: res.data.results || [],
      next: res.data.next ? res.data.next.replace("http://", "https://") : null,
    };
  } catch (err) {
    console.error("Ошибка поиска:", err);
    return { results: [], next: null };
  }
};
