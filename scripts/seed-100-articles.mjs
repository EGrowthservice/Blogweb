import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env or .env.local
const loadEnv = (filePath) => {
  if (fs.existsSync(filePath)) {
    const envContent = fs.readFileSync(filePath, 'utf8');
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const idx = trimmed.indexOf('=');
        if (idx !== -1) {
          const key = trimmed.substring(0, idx).trim();
          const value = trimmed.substring(idx + 1).trim();
          if (!process.env[key]) {
            process.env[key] = value;
          }
        }
      }
    }
  }
};

loadEnv(path.resolve(__dirname, '../.env.local'));
loadEnv(path.resolve(__dirname, '../.env'));

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set!');
  process.exit(1);
}

// Schemas
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true, strict: false }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String },
  },
  { timestamps: true, strict: false }
);

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    author: {
      name: String,
      role: String,
      avatar: String,
      bio: String,
      twitter: String,
    },
    featuredImage: { type: String, required: true },
    featuredImageAlt: { type: String, required: true },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
    tags: [{ type: String }],
    readTimeMinutes: { type: Number, default: 5 },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    viewsCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema);

// Unsplash Curated Image Sets per category
const IMAGES = {
  movies: [
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=1200',
  ],
  'tv-shows': [
    'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80&w=1200',
  ],
  celebrities: [
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200',
  ],
  music: [
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=1200',
  ],
  gaming: [
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1612287233207-6f890e1f37e4?auto=format&fit=crop&q=80&w=1200',
  ],
};

// 20 rich topics for Movies
const MOVIES_TOPICS = [
  'Christopher Nolan Breaks Down the Physics and Sound Design of His 2026 Space Epic',
  'The Return of Practical Effects: Why Modern Hollywood Filmmakers are Abandoning Full CGI',
  'Oscars 2026 Frontrunners: Early Predictions for Best Picture, Director, and Actor',
  'Denis Villeneuve Teases Secret Neo-Noir Project Following Historic Sci-Fi Trilogy',
  'The Masterclass of Tension: How Contemporary Horror Cinema Re-invented Psychological Dread',
  'Behind the Camera: An Exclusive Look at Hoyte van Hoytema’s IMAX 70mm Cinematography',
  'Indie Cinema Resurgence: 10 Festival Darlings Storming Global Box Offices This Autumn',
  'Hans Zimmer and Ludwig Göransson: Redefining Modern Orchestral Film Scoring',
  'Cannes Film Festival 2026: Palm d’Or Winner Sends Waves Across Global Distribution',
  'The Evolution of Martial Arts Choreography from Hong Kong Golden Era to Modern Blockbusters',
  'Inside the Screenwriting Process: Constructing Multi-Layered Plot Twists That Actually Land',
  'Greta Gerwig on Reimagining Classic Literary Adaptations for Gen Z Audiences',
  'Why Mid-Budget Comedies Are Finally Making a Triumphant Theatrical Comeback',
  'De-Aging Technology and Deepfake Ethics: Where Is Cinema Heading in the Late 2020s?',
  'Guillermo del Toro Unveils Gothic Dark Fantasy Puppet Project Seven Years in the Making',
  'Color Grading Mastery: How Fincher and Deakins Shape Mood and Subconscious Storytelling',
  'Korean Cinema Renaissance: How K-Film Captured International Prestige and Mainstream Favor',
  'The Architectural Genius of Blade Runner 2049 and Metropolis: Building Future Cities',
  'Soundscapes of Silence: The Power of Minimalist Audio in Award-Winning Psychological Thrillers',
  'Film Preservation in the Digital Age: Safeguarding Century-Old Masterpieces from Degradation',
];

// 20 rich topics for TV Shows
const TV_TOPICS = [
  'The Bear Season 4 Dissected: Kitchen Camaraderie, Culinary Pressure, and Character Growth',
  'The Golden Age of Prestige Mini-Series: Why 8-Episode Story arcs Beat 22-Episode Seasons',
  'House of the Dragon Season 3: Showrunners Detail the Brutal Battle Above the Gods Eye',
  'Succession’s Lasting Cultural Shadow: How Corporate Satire Became Television Poetry',
  'Stranger Things Finale Retrospective: The Cultural Legacy of Hawkins Over a Decade Later',
  'Inside HBO’s Next Mammoth Fantasy Adaptation: Budgets, Set Construction, and Showrunning',
  'The Rise of Interactive Television and Multi-Perspective Crime Drama on Streaming',
  'Why True Crime Docuseries Still Dominate Global Watchlists in 2026',
  'Binge Release vs. Weekly Episodic Drops: The Battle for Social Media Engagement',
  'The Art of the Television Cold Open: 10 Iconic First Scenes That Hooked Viewers Instantly',
  'Severance Season 2 In-Depth Review: Corporate Dystopia and Existential Twists Magnified',
  'From Script to Screen: Inside a Television Writers Room During Peak Peak-TV Production',
  'Anthology Series Renaissance: Why Viewers Crave Fresh Stories Every Single Season',
  'The Science Fiction TV Revolution: How High Concept Ideas Found A Permanent Streaming Home',
  'Emmy Nominations 2026: Shocking Snubs, Historic Breakthroughs, and Dark Horse Contenders',
  'Soundtracking Prestige Drama: The Unsung Curators Choosing Every Viral TV Needle Drop',
  'Animated Series for Adults: Breaking Stereotypes and Conquering Prime-Time Audiences',
  'Behind the Scenes of Historical Drama Sets: Recreating Victorian London Down to the Stitch',
  'International Television Sensations: Non-English Series That Captured Western Primetime',
  'The Evolution of Late-Night Television in the Era of Short-Form Streaming Clips',
];

// 20 rich topics for Celebrities
const CELEBRITIES_TOPICS = [
  'Met Gala 2026 Red Carpet Extravaganza: Architectural Fashion, Avant-Garde Silhouettes, and Icons',
  'Zendaya and Timothée Chalamet: The Enduring Duo Reshaping 21st Century Hollywood Stardom',
  'Inside Florence Pugh’s Method: How Unapologetic Authenticity Conquered Both Indie and Marvel',
  'Red Carpet Couture Analysis: Vintage Archival Gowns Making a Historic Comeback',
  'Cillian Murphy on Fame, Quiet Dedication, and the Sacred Art of Understated Acting',
  'From Child Actor to Director: The Remarkable Creative Autonomy of Paul Mescal',
  'Hollywood Stylists Unfiltered: The High-Stakes World of Award Season Wardrobe Curation',
  'Pedro Pascal on Embracing Leading Man Status and Building Community Across Continents',
  'Celebrity Philanthropy in 2026: Transparency, Climate Advocacy, and Actionable Foundations',
  'Margot Robbie’s Production Empire: Championing Original Female Voices in Cinema',
  'The Art of the Celebrity Profile: Behind the Scenes of Iconic Vanity Fair and Vogue Covers',
  'Ayo Edebiri and the New Wave of Comedy Multi-Hyphenates Dominating Red Carpets',
  'How Vintage Watch Collecting Became the Ultimate Hollywood Power Statement',
  'Robert Pattinson on Radical Creative Choices: From Franchise Heartthrob to Auteur Muse',
  'Red Carpet Makeup Trends: The Transition from Hyper-Contour to Luminous Naturalism',
  'Keanu Reeves and the Art of Genuine Kindness: Why Hollywood Respects the Icon',
  'Inside the Glam Squad: Hair, Makeup, and Skin Prep 48 Hours Before the Academy Awards',
  'Austin Butler on Finding Identity Beyond His Breakthrough Biopic Roles',
  'Celebrity Memoir Revelations: Honest Reflections on Mental Health, Pressure, and Survival',
  'The Next Generation of A-List Talent: 10 Breakout Actors Set to Dominate the Decade',
];

// 20 rich topics for Music
const MUSIC_TOPICS = [
  'The Eras Tour Final Assessment: How Stadium Shows Reached Super Bowl Scale Every Weekend',
  'Vinyl Resurgence Reaches Record Peak in 2026: Why Physical Media Is More Coveted Than Ever',
  'Billie Eilish and Finneas: The Intimate Bedroom Production Philosophy Behind Stadium Anthems',
  'The Global Explosion of Afrobeats and Amapiano: Rhythm, Culture, and Worldwide Festivals',
  'Kendrick Lamar’s Conceptual Mastery: Deconstructing Lyricism, Narrative, and Cultural Impact',
  'Electronic Music Evolution: From Underground Warehouses to Sold-Out Arena Headliners',
  'Analog Synthesizers in the Modern Studio: Why Producers Choose Hardware Warmth Over Digital VSTs',
  'Grammy Awards 2026: Album of the Year Debate Sparks Intense Critical Discourse',
  'The Power of the Pop Bridges: 15 Songs Defined by Their Climax Transitions',
  'Inside Abbey Road Studios: How the Historic London Icon Embraces Cutting-Edge Audio Tech',
  'Shoegaze and Dream Pop Revival: Gen Z Discovers the Wall-of-Sound Reverberation',
  'The Sonic Blueprint of Dua Lipa: Funk Basslines, Disco Strings, and Studio Precision',
  'Hip-Hop at 53: How the Genre Continues to Reinvent Its Rhythmic Foundations',
  'Soundtrack Composers Stealing the Charts: Instrumental Music Gaining Pop-Level Streams',
  'Festival Culture in 2026: Sustainability, Immersive Audio Stages, and Lineup Diversity',
  'The Art of Mastering: The Final Invisible Step That Gives Hit Records Their Punch',
  'Folk and Acoustic Intimacy: Why Stripped-Down Ballads Are Dominating Viral Streaming',
  'Hyperpop’s Lasting Impact: How Glitch Aesthetics Infiltrated Mainstream Radio Production',
  'Collaborative Songwriting Camps: Inside the 72-Hour Marathons Crafting Summer Anthems',
  'The Return of Live Acoustic Sessions: Why Raw Vocal Integrity Captivates Modern Audiences',
];

// 20 rich topics for Gaming
const GAMING_TOPICS = [
  'Grand Theft Auto VI Comprehensive Breakdown: Physics, AI Subsystems, and Dynamic Sandbox',
  'Unreal Engine 5.6 Technical Deep Dive: Nanite, Lumen, and Photorealistic Virtual Worlds',
  'The Evolution of Soulslike Boss Design: Fairness, Rhythm, and Mechanical Masterclasses',
  'Why Narrative RPGs are Experiencing a Triumphant Golden Era in 2026',
  'The Future of Handheld PC Gaming: Steam Deck Successors, Battery Breakthroughs, and APUs',
  'Hidetaka Miyazaki and the Philosophy of Environmental Storytelling Without Dialogue',
  'Esports Arena Architecture: How Competitive Gaming Became a Spectator Empire',
  'The Indie Game Renaissance: How Solo Developers Are Outshining 500-Person AAA Studios',
  'Cyberpunk 2077 Four Years Later: The Greatest Redemption Story in Interactive Entertainment',
  'Sound Design in Horror Games: Using Binaural Audio to Terrorize Player Subconscious',
  'The Renaissance of Turn-Based Combat: Tactical Depth Over Real-Time Reflexes',
  'Ray Tracing and Path Tracing: Achieving Cinema-Quality Global Illumination in Real Time',
  'Hideo Kojima’s Next Enigma: Blending Hollywood Cinema with Genre-Defying Mechanics',
  'Accessibility in Modern Gaming: How Inclusive Design Expanded the Player Community',
  'The Art of Level Design: Guiding Players Through Visual Contrast and Natural Flow',
  'Virtual Photography in Games: Capturing Breathtaking Frames Inside Interactive Masterpieces',
  'The Impact of DualSense Haptic Feedback: Transforming Tactile Sensation into Immersion',
  'Retro Remakes Done Right: Honoring Classic Nostalgia While Modernizing Clunky Systems',
  'Open-World Fatigue vs. Meaningful Exploration: What Gamers Actually Want in 2026',
  'Cross-Platform Ecosystems: The Seamless Transition Between Console, Mobile, and PC',
];

const CATEGORY_DATA = [
  { key: 'movies', name: 'Movies', topics: MOVIES_TOPICS },
  { key: 'tv-shows', name: 'TV Shows', topics: TV_TOPICS },
  { key: 'celebrities', name: 'Celebrities', topics: CELEBRITIES_TOPICS },
  { key: 'music', name: 'Music', topics: MUSIC_TOPICS },
  { key: 'gaming', name: 'Gaming', topics: GAMING_TOPICS },
];

function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function generateArticleContent(title, categoryName) {
  return `## The Cultural Horizon: Understanding ${title}

In the rapidly evolving landscape of contemporary ${categoryName.toLowerCase()}, few developments have captured critical attention and public fascination quite like this. As artistic boundaries continue to blur across mediums, creators and visionaries are reimagining how stories are constructed, distributed, and emotionally experienced by audiences around the globe.

### A Confluence of Artistry and Technical Precision

What distinguishes this moment in modern entertainment is the relentless commitment to craft. Behind every frame, rhythm, or interactive mechanic lies a dedicated team pushing against conventional limitations. Whether working with massive studio budgets or agile independent teams, the core objective remains clear: delivering profound resonance that outlasts fleeting digital trends.

> *"The future of cultural storytelling doesn't belong to algorithms or automated shortcuts. It belongs to human voices with singular perspectives, daring to express vulnerability on an uncompromising stage."*

### Key Highlights and Critical Takeaways

1. **Unapologetic Ambition:** An elevated standard of storytelling that respects audience intelligence and emotional investment.
2. **Technological Synergy:** Seamless fusion of traditional craftsmanship with cutting-edge production methodologies.
3. **Global Cultural Resonance:** Breaking through localized demographics to spark meaningful conversations across borders and communities.

### Looking Ahead to the Next Chapter

As we navigate through 2026 and beyond, the trajectory established here will undoubtedly serve as a touchstone for upcoming generations of creators. The cultural needle has moved, and audiences are rightfully demanding authentic, thought-provoking works that stand the test of time.

*Reporting contributed by the PULSE Entertainment Culture & Arts Bureau.*`;
}

async function seed100Articles() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // 1. Get Categories
    const categories = await Category.find({});
    const categoryMap = new Map();
    for (const cat of categories) {
      categoryMap.set(cat.slug, cat._id);
    }

    // 2. Get Super Admin user
    const adminUser = await User.findOne({ role: 'super_admin' });
    const authorId = adminUser?._id;
    const authorObj = {
      name: adminUser?.name || 'PULSE Editorial Board',
      role: 'Senior Culture Critic',
      avatar: adminUser?.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
      bio: 'Covering cinema, prestige television, music retrospectives, and gaming culture.',
      twitter: '@pulse_ent',
    };

    console.log(`Starting to seed 100 articles across 5 categories...`);

    let totalCreated = 0;
    const startDate = new Date('2026-01-10T08:00:00Z').getTime();
    const endDate = new Date('2026-09-20T18:00:00Z').getTime();

    for (const catInfo of CATEGORY_DATA) {
      const categoryId = categoryMap.get(catInfo.key);
      const imagesList = IMAGES[catInfo.key] || IMAGES.movies;

      console.log(`\n📂 Processing category: [${catInfo.name}] (20 articles)`);

      for (let i = 0; i < catInfo.topics.length; i++) {
        const topicTitle = catInfo.topics[i];
        const baseSlug = generateSlug(topicTitle);
        // Ensure slug uniqueness
        const uniqueSlug = `${baseSlug}-2026`;

        // Pick image round-robin
        const imgUrl = imagesList[i % imagesList.length];

        // Random publication date
        const randomTime = startDate + Math.random() * (endDate - startDate);
        const publishedDate = new Date(randomTime);

        // Random views count (500 - 28,000)
        const viewsCount = Math.floor(Math.random() * 25000) + 500;
        const likesCount = Math.floor(viewsCount * (0.05 + Math.random() * 0.08));

        const excerpt = `A deep dive into ${topicTitle}. Exploring the artistry, cultural impact, and behind-the-scenes craft shaping modern ${catInfo.name.toLowerCase()} in 2026.`;
        const content = generateArticleContent(topicTitle, catInfo.name);

        const articleDoc = {
          title: topicTitle,
          slug: uniqueSlug,
          excerpt,
          content,
          category: catInfo.key,
          categoryId: categoryId || undefined,
          authorId: authorId || undefined,
          author: authorObj,
          featuredImage: imgUrl,
          featuredImageAlt: topicTitle,
          status: 'published',
          tags: [catInfo.key, 'feature', 'exclusive', '2026-guide'],
          readTimeMinutes: Math.floor(Math.random() * 5) + 4,
          isFeatured: i === 0 || i === 5,
          isTrending: i === 1 || i === 8,
          viewsCount,
          likesCount,
          publishedAt: publishedDate,
        };

        await Article.findOneAndUpdate(
          { slug: uniqueSlug },
          { $set: articleDoc },
          { upsert: true, new: true }
        );

        totalCreated++;
        console.log(`  ✓ [${totalCreated}/100] [${catInfo.key.toUpperCase()}] ${topicTitle.substring(0, 48)}...`);
      }
    }

    const finalCount = await Article.countDocuments();
    console.log('\n=========================================');
    console.log(`🎉 Successfully seeded 100 new articles!`);
    console.log(`Total articles currently in database: ${finalCount}`);
    console.log('=========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding 100 articles:', error);
    process.exit(1);
  }
}

seed100Articles();
