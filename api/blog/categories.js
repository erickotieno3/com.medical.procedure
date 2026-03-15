import { Redis } from '@upstash/redis';
const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  try {
    const arts = await redis.get('blog:articles') || [];
    const counts = {};
    arts.forEach(a => { const c=a.category||'General Medicine'; counts[c]=(counts[c]||0)+1; });
    const categories = Object.entries(counts).map(([name,count])=>({name,count})).sort((a,b)=>b.count-a.count);
    return res.status(200).json({ categories });
  } catch(e) { return res.status(500).json({ error: e.message }); }
}
