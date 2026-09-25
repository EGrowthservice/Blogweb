import https from 'https';

function check() {
  https.get('https://www.pulseetm.click', (res) => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
      const hasScript = data.includes('ca-pub-3542813933597668');
      console.log('--- VERIFICATION RESULT ---');
      console.log('Status code:', res.statusCode);
      console.log('Contains ca-pub-3542813933597668:', hasScript);
      if (hasScript) {
        console.log('🎉 SUCCESS! The AdSense script is now LIVE on https://www.pulseetm.click!');
      } else {
        console.log('⏳ Vercel is still building... please wait a few seconds and re-check.');
      }
    });
  }).on('error', (err) => {
    console.error('Network error:', err.message);
  });
}

check();
