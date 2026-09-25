const https = require('https');

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function runAudit() {
  console.log('=== STARTING LIVE SITE AUDIT ON HTTPS://WWW.PULSEETM.CLICK ===\n');

  // 1. Robots.txt
  const robots = await fetchUrl('https://www.pulseetm.click/robots.txt');
  console.log('[1] Robots.txt: HTTP', robots.status);
  console.log(robots.body.trim());
  console.log('');

  // 2. Sitemap.xml
  const sitemap = await fetchUrl('https://www.pulseetm.click/sitemap.xml');
  console.log('[2] Sitemap.xml: HTTP', sitemap.status);
  const sitemapUrls = (sitemap.body.match(/<loc>(.*?)<\/loc>/g) || []).map(s => s.replace(/<\/?loc>/g, ''));
  console.log(`Total URLs in sitemap: ${sitemapUrls.length}`);
  console.log('Sample URLs:', sitemapUrls.slice(0, 5));
  const hasLocalhostSitemap = sitemapUrls.some(u => u.includes('localhost'));
  console.log('Contains localhost in sitemap?', hasLocalhostSitemap);
  console.log('');

  // 3. Homepage HTML Audit
  const home = await fetchUrl('https://www.pulseetm.click');
  console.log('[3] Homepage: HTTP', home.status);
  console.log('Homepage contains localhost?', home.body.includes('localhost:3000'));
  console.log('Canonical tag on home:', home.body.match(/<link rel="canonical"[^>]*>/gi));
  console.log('');

  // 4. Sample Article HTML Audit
  const sampleArticleUrl = 'https://www.pulseetm.click/movies/dune-messiah-denis-villeneuve-confirms-script-progress-timeline';
  const article = await fetchUrl(sampleArticleUrl);
  console.log('[4] Sample Article: HTTP', article.status);
  console.log('Article contains localhost?', article.body.includes('localhost:3000'));
  if (article.body.includes('localhost:3000')) {
    const localhostMatches = article.body.match(/http:\/\/localhost:3000[^\s"'>]*/g);
    console.log('Localhost occurrences in article:', [...new Set(localhostMatches)]);
  }
  console.log('');

  // 5. Test Key Navigation Hubs (Categories, About, Contact, Policies)
  const paths = [
    '/movies',
    '/tv-shows',
    '/celebrity',
    '/music',
    '/gaming',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/disclaimer',
    '/bookmarks'
  ];

  console.log('[5] Checking Main Pages HTTP Status:');
  for (const p of paths) {
    const res = await fetchUrl(`https://www.pulseetm.click${p}`);
    console.log(`  ${p.padEnd(20)} -> HTTP ${res.status}`);
  }

  console.log('\n=== AUDIT FINISHED ===');
}

runAudit().catch(console.error);
