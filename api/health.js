import { Redis } from '@upstash/redis';
const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const lastUpdated = await redis.get('blog:lastUpdated');
    const totalCount  = await redis.get('blog:totalCount') || 0;
    return res.status(200).json({ status:'ok', lastUpdated, totalCount, nextUpdate:'06:00 UTC daily' });
  } catch(e) { return res.status(500).json({ status:'error', error:e.message }); }
}
