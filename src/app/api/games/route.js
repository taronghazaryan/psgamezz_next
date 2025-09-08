import axios from 'axios';

const headers = {
    Authorization: 'dQbLtO9jVjPXZYVWr!xbUc%O8k%yNgOQahOoXZjWivr5FFoN!BZU*619Y*w$$XhLg',
};

// GET /api/games
export async function GET(req) {
    const url = 'https://psgamezz.ru/api/games/';
    try {
        const res = await axios.get(url, { headers });
        const results = res.data.results.map(game => ({
            ...game,
            slug: `${game.id}`,
        }));

        return new Response(
            JSON.stringify({ results, next: res.data.next }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Ошибка сервера' }), { status: 500 });
    }
}
