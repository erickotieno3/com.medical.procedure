import AsyncStorage from '@react-native-async-storage/async-storage';
const API_BASE  = 'https://com-medical-procedure.vercel.app/api';
const CACHE_TTL = 5 * 60 * 1000;
async function withCache(key, fetcher) {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw) { const { data, ts } = JSON.parse(raw); if (Date.now()-ts < CACHE_TTL) return data; }
  } catch {}
  const data = await fetcher();
  try { await AsyncStorage.setItem(key, JSON.stringify({ data, ts: Date.now() })); } catch {}
  return data;
}
export const blogApi = {
  async getArticles({ category='All', search='', page=1, limit=15 } = {}) {
    return withCache('blog_' + category + '_' + search + '_' + page, async () => {
      try {
        const p = new URLSearchParams({ page: String(page), limit: String(limit) });
        if (category && category !== 'All') p.append('category', category);
        if (search) p.append('search', search);
        const res = await fetch(API_BASE + '/blog/articles?' + p);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return await res.json();
      } catch(e) {
        console.error('getArticles error:', e.message);
        return { articles:[], total:0, page:1, pages:0, error:e.message };
      }
    });
  },
  async getCategories() {
    return withCache('blog_categories', async () => {
      try {
        const res = await fetch(API_BASE + '/blog/categories');
        const d   = await res.json();
        return d.categories || [];
      } catch(e) { console.error('getCategories error:', e.message); return []; }
    });
  },
  async getHealth() {
    try { const res = await fetch(API_BASE + '/health'); return await res.json(); }
    catch(e) { return { status:'error', error:e.message }; }
  },
  async clearCache() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys.filter(k => k.startsWith('blog_')));
    } catch {}
  },
};
