import axios from 'axios';

const headers = {
  Authorization: 'dQbLtO9jVjPXZYVWr!xbUc%O8k%yNgOQahOoXZjWivr5FFoN!BZU*619Y*w$$XhLg',
};

const API_URL = 'https://psgamezz.ru/api/games/';

// Получение одной игры по slug/id
export const getGameBySlug = async (slug) => {
  const res = await axios.get(`${API_URL}?slug=${slug}`, { headers: API_HEADERS });
  return res.data.results[0] || null;
};

// Получение всех игр
export const getNewGames = async () => {
  const res = await axios.get(API_URL, { headers });
  return res.data.results || [];
};

