import { Redis } from '@upstash/redis';
const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN });
function fallback() {
  const now = new Date().toISOString();
  return [
    { id:'f1', title:'Robotic Surgery Advances in 2025', summary:'New robotic systems are transforming minimally invasive procedures with greater precision and faster recovery times.', content:'Robotic-assisted surgery has seen major advances with AI-guided systems now capable of real-time tissue recognition. Studies show 40% reduction in complications compared to open surgery.', source:'Medical News Today', url:'https://www.medicalnewstoday.com', imageUrl:'', publishedAt:now, category:'Minimally Invasive', tags:['robotic','surgery','minimally invasive'], isNew:true },
    { id:'f2', title:'New WHO Guidelines on Surgical Site Infections', summary:'Updated protocols reduce post-operative infection rates by 35% in clinical trials across 40 countries.', content:'The WHO has released updated guidelines for preventing surgical site infections. Key changes include extended antibiotic prophylaxis windows and new skin preparation protocols.', source:'WHO', url:'https://www.who.int', imageUrl:'', publishedAt:now, category:'Infection Control', tags:['infection','guideline','WHO','protocol'], isNew:true },
    { id:'f3', title:'AI-Assisted Wound Assessment Tools', summary:'Machine learning algorithms now match expert nurses in wound classification accuracy with 94% concordance.', content:'AI-powered wound assessment apps are reaching clinical validation. These tools use smartphone cameras to measure wound dimensions, classify tissue types, and recommend dressing changes.', source:'Journal of Wound Care', url:'https://www.journalofwoundcare.com', imageUrl:'', publishedAt:now, category:'Wound Care', tags:['AI','wound','nursing','technology'], isNew:true },
    { id:'f4', title:'Ultrasound-Guided IV Cannulation Reduces Failure Rates', summary:'Point-of-care ultrasound cuts first-attempt failure by 60% in difficult access patients.', content:'A randomised controlled trial across five NHS trusts demonstrated that ultrasound-guided peripheral IV cannulation significantly reduces failed first attempts in patients with difficult venous access.', source:'British Journal of Nursing', url:'https://www.britishjournalofnursing.com', imageUrl:'', publishedAt:now, category:'Nursing', tags:['IV','cannulation','ultrasound','technique'], isNew:true },
    { id:'f5', title:'NEWS2 Score Validation in Emergency Departments', summary:'Large-scale study confirms NEWS2 reduces cardiac arrest rates by 28% when escalation protocols are followed.', content:'A national audit of 120 NHS hospitals confirmed the effectiveness of NEWS2. Hospitals with strict escalation protocols showed a 28% reduction in unexpected cardiac arrests.', source:'Resuscitation Journal', url:'https://www.resuscitationjournal.com', imageUrl:'', publishedAt:now, category:'Emergency', tags:['NEWS2','observations','emergency','nursing'], isNew:true },
    { id:'f6', title:'CAUTI Prevention Bundle Achieves Zero Infection Rate', summary:'Five-component bundle achieves zero catheter-associated UTI rate over 18-month ICU pilot.', content:'A comprehensive CAUTI prevention bundle achieved a zero infection rate over 18 months in a 30-bed ICU. Components include daily catheter necessity review and strict insertion bundle compliance.', source:'Infection Control Today', url:'https://www.infectioncontroltoday.com', imageUrl:'', publishedAt:now, category:'Infection Control', tags:['catheter','UTI','infection','nursing','protocol'], isNew:true },
  ];
}
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
  try {
    const { category, search, page='1', limit='15' } = req.query;
    let arts = await redis.get('blog:articles') || [];
    if (!arts.length) { arts = fallback(); await redis.set('blog:articles', arts); }
    if (category && category !== 'All') arts = arts.filter(a => a.category === category);
    if (search) {
      const q = search.toLowerCase();
      arts = arts.filter(a => (a.title||'').toLowerCase().includes(q) || (a.summary||'').toLowerCase().includes(q) || (a.category||'').toLowerCase().includes(q));
    }
    const pg=parseInt(page), lim=parseInt(limit);
    const paginated   = arts.slice((pg-1)*lim, pg*lim);
    const lastUpdated = await redis.get('blog:lastUpdated');
    return res.status(200).json({ articles:paginated, total:arts.length, page:pg, pages:Math.ceil(arts.length/lim), lastUpdated });
  } catch(e) { return res.status(500).json({ error: e.message }); }
}
