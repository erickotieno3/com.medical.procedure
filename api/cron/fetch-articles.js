import { Redis } from '@upstash/redis';
const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });

function detectCategory(text) {
  const t = (text||'').toLowerCase();
  if (t.match(/cardiac|heart|cardio/))       return 'Cardiology';
  if (t.match(/ortho|bone|joint|spine/))     return 'Orthopaedics';
  if (t.match(/cancer|oncol|tumou?r/))       return 'Oncology';
  if (t.match(/neuro|brain|spinal|nerve/))   return 'Neurology';
  if (t.match(/wound|dressing|skin|derma/))  return 'Wound Care';
  if (t.match(/robot|laparoscop|minimal/))   return 'Minimally Invasive';
  if (t.match(/anaesth|anesthes|sedation/))  return 'Anaesthesia';
  if (t.match(/infect|antibiotic|sepsis/))   return 'Infection Control';
  if (t.match(/emerg|resuscit|trauma/))      return 'Emergency';
  if (t.match(/nurs|patient care|clinical/)) return 'Nursing';
  return 'General Medicine';
}

function extractTags(text) {
  const kw = ['surgery','procedure','technique','treatment','therapy','diagnosis','imaging','robotic','laparoscopic','minimally invasive','clinical trial','guideline','protocol','nursing','wound','catheter','airway'];
  return kw.filter(k => (text||'').toLowerCase().includes(k)).slice(0,5);
}

async function fetchNewsAPI() {
  try {
    const url = https://newsapi.org/v2/everything?q=medical+surgical+procedure&language=en&sortBy=publishedAt&pageSize=20&apiKey=;
    const res  = await fetch(url);
    const data = await res.json();
    if (!data.articles) return [];
    return data.articles.map((a,i) => ({
      id: 
ews__,
      title: a.title||'', summary: a.description||'',
      content: a.content||a.description||'',
      source: a.source?.name||'Medical News',
      url: a.url||'', imageUrl: a.urlToImage||'',
      publishedAt: a.publishedAt,
      category: detectCategory(a.title+' '+(a.description||'')),
      tags: extractTags(a.title+' '+(a.description||'')),
      isNew: true,
    }));
  } catch(e) { console.error('NewsAPI error:', e.message); return []; }
}

async function fetchPubMed() {
  try {
    const sr = await fetch('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=surgical+procedure+new+technique&retmax=10&sort=date&retmode=json');
    const sd = await sr.json();
    const ids = sd.esearchresult?.idlist||[];
    if (!ids.length) return [];
    const sumR = await fetch(https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=&retmode=json);
    const sumD = await sumR.json();
    return ids.map(id => {
      const a = sumD.result?.[id];
      if (!a) return null;
      return {
        id: pubmed_,
        title: a.title||'',
        summary: ${a.source} - ,
        content: Published in . Authors: . PubMed ID: .,
        source: 'PubMed - '+(a.source||''),
        url: https://pubmed.ncbi.nlm.nih.gov//,
        imageUrl: '', publishedAt: a.pubdate||new Date().toISOString(),
        category: detectCategory(a.title), tags: extractTags(a.title), isNew: true,
      };
    }).filter(Boolean);
  } catch(e) { console.error('PubMed error:', e.message); return []; }
}

export default async function handler(req, res) {
  if (req.headers.authorization !== Bearer ) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const [newsArts, pubmedArts] = await Promise.all([fetchNewsAPI(), fetchPubMed()]);
    const incoming = [...newsArts, ...pubmedArts];
    if (!incoming.length) return res.status(200).json({ message: 'No new articles', count: 0 });
    const existing    = await redis.get('blog:articles') || [];
    const existingIds = new Set(existing.map(a => a.id));
    const fresh       = incoming.filter(a => !existingIds.has(a.id));
    const merged      = [...fresh, ...existing].slice(0, 200);
    await redis.set('blog:articles',    merged);
    await redis.set('blog:lastUpdated', new Date().toISOString());
    await redis.set('blog:totalCount',  merged.length);
    return res.status(200).json({ message: 'Updated', newCount: fresh.length, totalCount: merged.length });
  } catch(e) {
    console.error('Cron failed:', e);
    return res.status(500).json({ error: e.message });
  }
}