import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local manually without external dotenv dependency
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
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

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set in .env.local!');
  process.exit(1);
}

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    featuredImage: { type: String, required: true },
    featuredImageAlt: { type: String, required: true },
    author: {
      name: String,
      role: String,
      avatar: String,
      bio: String,
      twitter: String,
    },
    readTimeMinutes: Number,
    isFeatured: Boolean,
    isTrending: Boolean,
    viewsCount: Number,
    likesCount: Number,
    publishedAt: Date,
  },
  { timestamps: true }
);

const Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema);

// Read mock articles from source
async function runSeed() {
  try {
    console.log('Connecting to MongoDB at:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected! Seeding articles...');

    // Import mock articles dynamically or read ts file
    const mockFileContent = fs.readFileSync(path.resolve(__dirname, '../src/data/mockArticles.ts'), 'utf8');
    
    // We can evaluate or parse the MOCK_ARTICLES directly or use the comprehensive list
    // To be 100% reliable and avoid ESM import issues with TS, let's read the mockArticles data
    const match = mockFileContent.match(/export const MOCK_ARTICLES: ArticleData\[\] = (\[[\s\S]*?\]);\n/);
    
    if (!match) {
      console.error('Could not extract MOCK_ARTICLES from mockArticles.ts');
      process.exit(1);
    }

    // Convert JS object string to JSON safely
    const articlesArray = eval(match[1]);

    for (const art of articlesArray) {
      const artToSave = {
        ...art,
        publishedAt: new Date(art.publishedAt),
      };
      delete artToSave.id;

      await Article.findOneAndUpdate(
        { slug: art.slug },
        artToSave,
        { upsert: true, new: true }
      );
      console.log(`✓ Seeded: [${art.category.toUpperCase()}] ${art.title}`);
    }

    console.log(`🎉 Successfully seeded ${articlesArray.length} articles into MongoDB!`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during seed:', err);
    process.exit(1);
  }
}

runSeed();
