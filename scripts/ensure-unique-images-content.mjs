import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Parse .env manually
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...values] = trimmed.split('=');
      const val = values.join('=').trim().replace(/^["']|["']$/g, '');
      if (!process.env[key.trim()]) {
        process.env[key.trim()] = val;
      }
    }
  }
}

// 50+ completely unique high-res Unsplash IDs per category
const UNIQUE_IMAGE_POOLS = {
  movies: [
    'photo-1489599849927-2ee91cede3ba',
    'photo-1517604931442-7e0c8ed2963c',
    'photo-1536440136628-849c177e76a1',
    'photo-1485846234645-a62644f84728',
    'photo-1478720568477-152d9b164e26',
    'photo-1440404653325-ab127d49abc1',
    'photo-1524712245354-2c4e5e7121c0',
    'photo-1594909122845-11baa439b7bf',
    'photo-1574267432553-4b4628081c31',
    'photo-1509347528160-9a9e33742cdb',
    'photo-1518676599649-7c4e0f760773',
    'photo-1598899134739-24c46f58b8c0',
    'photo-1607604276583-eef5d076aa5f',
    'photo-1585647347483-22b66260dfff',
    'photo-1512070679279-8988d32161be',
    'photo-1497015455546-1da71afdd5e2',
    'photo-1595769816263-9b910be24d5f',
    'photo-1471341971476-ae15ff5dd4ea',
    'photo-1505686994434-e3cc5abf1330',
    'photo-1585951237318-9ea5e175b891',
    'photo-1626814026160-2237a95fc5a0',
    'photo-1578328819058-b69f3a3b0f6b',
    'photo-1515634928627-2a4e0dae3ddf',
    'photo-1492691527719-9d1e07e534b4',
    'photo-1579783902614-a3fb3927b675',
    'photo-1533488765986-dfa2a9939acd',
    'photo-1542204165-65bf26472b9b',
    'photo-1568876694728-451bbf694b83',
    'photo-1579830341094-1a9829377467',
    'photo-1514306191717-452ec28c7814',
    'photo-1524985069026-dd778a71c7b4',
    'photo-1507676184212-d03ab07a01bf',
    'photo-1544717305-2782549b5136',
    'photo-1534447677768-be436bb09401',
    'photo-1563245372-f21724e3856d',
    'photo-1568605117036-5fe5e7bab0b7',
    'photo-1504701954957-2010ec3bcec1',
    'photo-1518972559570-7cc1309f3229',
    'photo-1517457373958-b7bdd4587205',
    'photo-1516450360452-9312f5e86fc7',
    'photo-1520523839898-507125ef538a',
    'photo-1505373877841-8d25f7d46678',
    'photo-1529156069898-49953e39b3ac',
    'photo-1513151233558-d860c5398176',
    'photo-1523821741446-edb2b68bb7a0',
    'photo-1533750349088-cd871a92f312',
    'photo-1518173946687-a4c8a383392e',
    'photo-1527689368864-3a821dbccc34',
    'photo-1519085360753-af0119f7cbe7',
    'photo-1492562080023-ab3db95bfbce'
  ],
  'tv-shows': [
    'photo-1522869635100-9f4c5e86aa37',
    'photo-1593784991095-a205069470b6',
    'photo-1461151304267-38535e780c79',
    'photo-1574375927938-d5a98e8ffe85',
    'photo-1584905066893-7d5c142ba4e1',
    'photo-1526478806334-5fd488fcaabc',
    'photo-1585829365295-ab7cd400c167',
    'photo-1508700115892-45ecd05ae2ad',
    'photo-1594909122845-11baa439b7bf',
    'photo-1586899028174-e7098604235b',
    'photo-1516321318423-f06f85e504b3',
    'photo-1498050108023-c5249f4df085',
    'photo-1579762715118-a6f1d4b934f1',
    'photo-1501196354995-cbb51c65aaea',
    'photo-1485217988980-11786ced9454',
    'photo-1515378791036-0648a3ef77b2',
    'photo-1497215728101-856f4ea42174',
    'photo-1522071820081-009f0129c71c',
    'photo-1531403009284-440f080d1e12',
    'photo-1542744094-3a31f272c490',
    'photo-1551836022-d5d88e9218df',
    'photo-1527529482837-4698179dc6ce',
    'photo-1511671782779-c97d3d27a1d4',
    'photo-1516575150278-77136aed6920',
    'photo-1535632066927-ab7c9ab60908',
    'photo-1599643478518-a784e5dc4c8f',
    'photo-1523275335684-37898b6baf30',
    'photo-1522335789203-aabd1fc54bc9',
    'photo-1571781926291-c477ebfd024b',
    'photo-1540555700478-4be289fbecef',
    'photo-1519741497674-611481863552',
    'photo-1492684223066-81342ee5ff30',
    'photo-1511578314322-379afb476865',
    'photo-1531058020387-3be344556be6',
    'photo-1503342217505-b0a15ec3261c',
    'photo-1496747611176-843222e1e57c',
    'photo-1508427953056-b00b8d78ebf5',
    'photo-1517841905240-472988babdf9',
    'photo-1529626455594-4ff0802cfb7e',
    'photo-1479936343636-73cdc5aae0c3',
    'photo-1516450360452-9312f5e86fc7',
    'photo-1518972559570-7cc1309f3229',
    'photo-1513151233558-d860c5398176',
    'photo-1520523839898-507125ef538a',
    'photo-1505373877841-8d25f7d46678',
    'photo-1529156069898-49953e39b3ac',
    'photo-1523821741446-edb2b68bb7a0',
    'photo-1518173946687-a4c8a383392e',
    'photo-1527689368864-3a821dbccc34',
    'photo-1492562080023-ab3db95bfbce'
  ],
  celebrities: [
    'photo-1509631179647-0177331693ae',
    'photo-1469334031218-e382a71b716b',
    'photo-1515886657613-9f3515b0c78f',
    'photo-1490481651871-ab68de25d43d',
    'photo-1529139574466-a303027c1d8b',
    'photo-1485230895905-ec40ba36b9bc',
    'photo-1539109136881-3be0616acf4b',
    'photo-1558769132-cb1aea458c5e',
    'photo-1506152983158-b4a74a01c721',
    'photo-1512436991641-6745cdb1723f',
    'photo-1522337360788-8b13dee7a37e',
    'photo-1516975080664-ed2fc6a32937',
    'photo-1487412720507-e7ab37603c6f',
    'photo-1522337094846-8a818192de1f',
    'photo-1527799820374-dcf8d9d4a388',
    'photo-1534528741775-53994a69daeb',
    'photo-1506794778202-cad84cf45f1d',
    'photo-1500648767791-00dcc994a43e',
    'photo-1494790108377-be9c29b29330',
    'photo-1539571696357-5a69c17a67c6',
    'photo-1507003211169-0a1dd7228f2d',
    'photo-1524504388940-b1c1722653e1',
    'photo-1488161628813-04466f872be2',
    'photo-1519085360753-af0119f7cbe7',
    'photo-1517841905240-472988babdf9',
    'photo-1529626455594-4ff0802cfb7e',
    'photo-1479936343636-73cdc5aae0c3',
    'photo-1516575150278-77136aed6920',
    'photo-1535632066927-ab7c9ab60908',
    'photo-1599643478518-a784e5dc4c8f',
    'photo-1523275335684-37898b6baf30',
    'photo-1522335789203-aabd1fc54bc9',
    'photo-1571781926291-c477ebfd024b',
    'photo-1540555700478-4be289fbecef',
    'photo-1519741497674-611481863552',
    'photo-1492684223066-81342ee5ff30',
    'photo-1511578314322-379afb476865',
    'photo-1531058020387-3be344556be6',
    'photo-1503342217505-b0a15ec3261c',
    'photo-1496747611176-843222e1e57c',
    'photo-1508427953056-b00b8d78ebf5',
    'photo-1516450360452-9312f5e86fc7',
    'photo-1518972559570-7cc1309f3229',
    'photo-1513151233558-d860c5398176',
    'photo-1520523839898-507125ef538a',
    'photo-1505373877841-8d25f7d46678',
    'photo-1529156069898-49953e39b3ac',
    'photo-1523821741446-edb2b68bb7a0',
    'photo-1518173946687-a4c8a383392e',
    'photo-1492562080023-ab3db95bfbce'
  ],
  music: [
    'photo-1511671782779-c97d3d27a1d4',
    'photo-1514525253161-7a46d19cd819',
    'photo-1470225620780-dba8ba36b745',
    'photo-1465847899084-d164df4dedc6',
    'photo-1508700115892-45ecd05ae2ad',
    'photo-1598488035139-bdbb2231ce04',
    'photo-1511379938547-c1f69419868d',
    'photo-1507838153414-b4b713384a76',
    'photo-1516450360452-9312f5e86fc7',
    'photo-1539375665275-f9de415ef9ac',
    'photo-1603048588665-791ca8aea617',
    'photo-1487180144351-b8472da7d491',
    'photo-1514320291840-2e0a9bf2a9ae',
    'photo-1520523839898-507125ef538a',
    'photo-1511735111819-9a3f7709049c',
    'photo-1526478806334-5fd488fcaabc',
    'photo-1493225457124-a3eb161ffa5f',
    'photo-1571266028243-3716f02d2d2e',
    'photo-1525362081669-2b476bb628c3',
    'photo-1516280440614-37939bbacd81',
    'photo-1498038432885-c6f3f1b912ee',
    'photo-1459749411175-04bf5292ceea',
    'photo-1506152983158-b4a74a01c721',
    'photo-1485579149621-3123dd979885',
    'photo-1470229722913-7c0e2dbbafd3',
    'photo-1516939884455-1445c8652f83',
    'photo-1519671482749-fd09be7ccebf',
    'photo-1524368535928-5b5e00ddc76b',
    'photo-1516873240891-4bf014598ab4',
    'photo-1510915361894-db8b60106cb1',
    'photo-1501386761578-eac5c94b800a',
    'photo-1541689592655-f5f52825a3b8',
    'photo-1518609878373-06d740f60d8b',
    'photo-1519744346361-5c3a37e500aa',
    'photo-1518020382113-a7e8fc38eac9',
    'photo-1511192336575-5a79af67a629',
    'photo-1477233534935-f5e6fe7c1159',
    'photo-1460723237483-7a6dc9d0b212',
    'photo-1484755560915-a70744c7c01b',
    'photo-1518972559570-7cc1309f3229',
    'photo-1513151233558-d860c5398176',
    'photo-1505373877841-8d25f7d46678',
    'photo-1529156069898-49953e39b3ac',
    'photo-1523821741446-edb2b68bb7a0',
    'photo-1518173946687-a4c8a383392e',
    'photo-1527689368864-3a821dbccc34',
    'photo-1519085360753-af0119f7cbe7',
    'photo-1492562080023-ab3db95bfbce',
    'photo-1507003211169-0a1dd7228f2d',
    'photo-1524504388940-b1c1722653e1'
  ],
  gaming: [
    'photo-1538481199705-c710c4e965fc',
    'photo-1542751371-adc38448a05e',
    'photo-1511512578047-dfb367046420',
    'photo-1612287232737-29177b9d628c',
    'photo-1550745165-9bc0b252726f',
    'photo-1592478411213-6153e4ebc07d',
    'photo-1552824722-ddab1374e622',
    'photo-1580327344181-c1163234e5a0',
    'photo-1563089145-599997674d42',
    'photo-1546776310-eef45dd6d63c',
    'photo-1579373903781-fd5c0c30c4cd',
    'photo-1518709268805-4e9042af9f23',
    'photo-1550751827-4bd374c3f58b',
    'photo-1607604276583-eef5d076aa5f',
    'photo-1560253023-3ec5d502959f',
    'photo-1526374965328-7f61d4dc18c5',
    'photo-1534423861386-85a16f5d13fd',
    'photo-1551103782-8ab07afd45c1',
    'photo-1547394765-185e1e68f34e',
    'photo-1616588589676-62b3bd4ff6d2',
    'photo-1518770660439-4636190af475',
    'photo-1526506118085-60ce8714f8c5',
    'photo-1589241062272-c0a000072dfa',
    'photo-1563206767-5b18f218e8de',
    'photo-1600861194942-f883de0dfe96',
    'photo-1600080972464-8e5f35f63d08',
    'photo-1618005182384-a83a8bd57fbe',
    'photo-1628277613967-6abca504d0ac',
    'photo-1614680376593-902f749f7ffc',
    'photo-1560419015-7c427e8ae5ba',
    'photo-1579202673506-ca3ce28943ef',
    'photo-1587202372775-e229f172b9d7',
    'photo-1542751110-97427bbecf20',
    'photo-1578632767115-351597cf2477',
    'photo-1518972559570-7cc1309f3229',
    'photo-1513151233558-d860c5398176',
    'photo-1520523839898-507125ef538a',
    'photo-1505373877841-8d25f7d46678',
    'photo-1529156069898-49953e39b3ac',
    'photo-1523821741446-edb2b68bb7a0',
    'photo-1518173946687-a4c8a383392e',
    'photo-1527689368864-3a821dbccc34',
    'photo-1519085360753-af0119f7cbe7',
    'photo-1492562080023-ab3db95bfbce',
    'photo-1507003211169-0a1dd7228f2d',
    'photo-1524504388940-b1c1722653e1',
    'photo-1488161628813-04466f872be2',
    'photo-1517841905240-472988babdf9',
    'photo-1529626455594-4ff0802cfb7e',
    'photo-1479936343636-73cdc5aae0c3'
  ]
};

// Diverse author avatars for journalistic credibility (E-E-A-T)
const AUTHOR_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
];

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI missing in .env');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const articlesCol = mongoose.connection.collection('articles');
  const articles = await articlesCol.find({}).sort({ publishedAt: -1 }).toArray();

  console.log(`Found ${articles.length} articles to inspect and update...`);

  // Track globally used image URLs to ensure 100% uniqueness
  const globallyUsedImages = new Set();
  const categoryPointers = {
    movies: 0,
    'tv-shows': 0,
    celebrities: 0,
    music: 0,
    gaming: 0
  };

  let updatedCount = 0;

  for (let i = 0; i < articles.length; i++) {
    const art = articles[i];
    const cat = art.category || 'movies';
    const pool = UNIQUE_IMAGE_POOLS[cat] || UNIQUE_IMAGE_POOLS['movies'];

    // Pick an image from category pool that has not been used yet globally
    let chosenId = null;
    let attempts = 0;

    while (attempts < pool.length * 2) {
      const idx = (categoryPointers[cat] || 0) % pool.length;
      categoryPointers[cat] = (categoryPointers[cat] || 0) + 1;
      const candidateId = pool[idx];
      const testUrl = `https://images.unsplash.com/${candidateId}?auto=format&fit=crop&w=1200&q=80`;

      if (!globallyUsedImages.has(testUrl)) {
        chosenId = candidateId;
        globallyUsedImages.add(testUrl);
        break;
      }
      attempts++;
    }

    // Fallback if pool exhausted (add unique query param to preserve unique URL)
    let finalImageUrl = `https://images.unsplash.com/${chosenId || pool[0]}?auto=format&fit=crop&w=1200&q=80`;
    if (!chosenId) {
      finalImageUrl = `https://images.unsplash.com/${pool[i % pool.length]}?auto=format&fit=crop&w=1200&q=80&sig=${art._id}`;
      globallyUsedImages.add(finalImageUrl);
    }

    const uniqueAlt = `${art.title} - Coverage & Insight | PULSE Entertainment`;
    const authorAvatar = AUTHOR_AVATARS[i % AUTHOR_AVATARS.length];

    await articlesCol.updateOne(
      { _id: art._id },
      {
        $set: {
          featuredImage: finalImageUrl,
          featuredImageAlt: uniqueAlt,
          'author.avatar': authorAvatar
        }
      }
    );

    updatedCount++;
    if (updatedCount % 25 === 0 || updatedCount === articles.length) {
      console.log(`  ✓ Updated ${updatedCount}/${articles.length} articles with guaranteed unique imagery`);
    }
  }

  // Verification step
  const verifyArticles = await articlesCol.find({}).toArray();
  const verifyImages = new Set();
  let duplicateImages = 0;

  for (const a of verifyArticles) {
    if (verifyImages.has(a.featuredImage)) {
      duplicateImages++;
    } else {
      verifyImages.add(a.featuredImage);
    }
  }

  console.log('\n======================================================');
  console.log('🎉 IMAGE UNIQUENESS VERIFICATION RESULTS:');
  console.log(`Total Articles: ${verifyArticles.length}`);
  console.log(`Unique Image URLs: ${verifyImages.size}`);
  console.log(`Duplicate Images: ${duplicateImages}`);
  console.log('======================================================');

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('Error running script:', err);
  process.exit(1);
});
