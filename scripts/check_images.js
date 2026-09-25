const https = require('https');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://hieucv204_db_user:7XWOE7IqidhpvmLW@cluster0.jclrhni.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0';

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ status: res.statusCode });
    }).on('error', (err) => resolve({ status: 500, error: err.message }));
  });
}

async function verifyImages() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const articles = await db.collection('articles').find({}, { projection: { title: 1, featuredImage: 1, 'author.avatar': 1 } }).toArray();
  
  console.log(`Checking images for ${articles.length} articles...`);
  let brokenCount = 0;

  for (const art of articles) {
    const res = await checkUrl(art.featuredImage);
    if (res.status >= 400) {
      console.log(`[BROKEN] ${art.title} -> ${art.featuredImage} (Status: ${res.status})`);
      brokenCount++;
    }
  }

  console.log(`Finished checking images. Broken count: ${brokenCount}`);
  await mongoose.disconnect();
}

verifyImages().catch(console.error);
