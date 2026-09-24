import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
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
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: '' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, select: false },
    role: { type: String, enum: ['super_admin', 'admin', 'editor', 'user'], default: 'user' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    image: String,
  },
  { timestamps: true }
);

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true, strict: false }
);

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema);

const DEFAULT_CATEGORIES = [
  { name: 'Movies', slug: 'movies', description: 'Latest blockbusters, indie films, and cinema reviews' },
  { name: 'TV Shows', slug: 'tv-shows', description: 'Binge-worthy series, television episodes, and streaming guides' },
  { name: 'Celebrities', slug: 'celebrities', description: 'Hollywood stars, red carpet moments, and exclusive interviews' },
  { name: 'Music', slug: 'music', description: 'Chart-topping hits, album reviews, and concert highlights' },
  { name: 'Gaming', slug: 'gaming', description: 'Video game releases, esports coverage, and gaming culture' },
];

async function seedAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // 1. Seed Categories
    console.log('Seeding default categories...');
    const categoryMap = new Map();
    for (const cat of DEFAULT_CATEGORIES) {
      const doc = await Category.findOneAndUpdate(
        { slug: cat.slug },
        { $set: { ...cat, status: 'active' } },
        { upsert: true, new: true }
      );
      categoryMap.set(cat.slug, doc._id);
      console.log(`  ✓ Category: ${cat.name} (${cat.slug}) -> ${doc._id}`);
    }

    // 2. Seed Super Admin
    console.log('Seeding Super Admin...');
    const adminEmail = 'admin@pulse.com';
    const adminPass = 'Admin@123456';
    const hashedPassword = await bcrypt.hash(adminPass, 10);

    const adminUser = await User.findOneAndUpdate(
      { email: adminEmail },
      {
        $set: {
          name: 'Super Admin',
          email: adminEmail,
          password: hashedPassword,
          role: 'super_admin',
          status: 'active',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
        },
      },
      { upsert: true, new: true }
    );
    console.log(`  ✓ Super Admin created: ${adminUser.email} (Role: ${adminUser.role})`);

    // 3. Update existing articles with categoryId and status
    console.log('Linking articles to categories and status...');
    const articles = await Article.find({});
    let updatedCount = 0;
    for (const art of articles) {
      let needsUpdate = false;
      const updateData = {};

      if (!art.status) {
        updateData.status = 'published';
        needsUpdate = true;
      }

      if (!art.authorId) {
        updateData.authorId = adminUser._id;
        needsUpdate = true;
      }

      if (!art.categoryId && art.category && categoryMap.has(art.category)) {
        updateData.categoryId = categoryMap.get(art.category);
        needsUpdate = true;
      }

      if (needsUpdate) {
        await Article.updateOne({ _id: art._id }, { $set: updateData });
        updatedCount++;
      }
    }
    console.log(`  ✓ Updated ${updatedCount} articles with status & categoryId`);

    // 4. Seed Advertising Settings
    console.log('Seeding default Advertising & Analytics settings...');
    const AdvertisingSettingsSchema = new mongoose.Schema(
      {
        gaEnabled: { type: Boolean, default: true },
        gaMeasurementId: { type: String, default: 'G-5F0GDVTZPE' },
        googleAdsEnabled: { type: Boolean, default: false },
        googleAdsConversionId: { type: String, default: '' },
        googleAdsConversionLabel: { type: String, default: '' },
        adsenseEnabled: { type: Boolean, default: false },
        adsensePublisherId: { type: String, default: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-0000000000000000' },
        adsenseDefaultSlot: { type: String, default: '' },
        adsenseHeaderSlot: { type: String, default: '' },
        adsenseContentSlot: { type: String, default: '' },
        adsenseSidebarSlot: { type: String, default: '' },
        adsenseFooterSlot: { type: String, default: '' },
        gtmEnabled: { type: Boolean, default: false },
        gtmContainerId: { type: String, default: '' },
      },
      { timestamps: true }
    );
    const AdvertisingSettings =
      mongoose.models.AdvertisingSettings || mongoose.model('AdvertisingSettings', AdvertisingSettingsSchema);

    const existingSettings = await AdvertisingSettings.findOne();
    if (!existingSettings) {
      await AdvertisingSettings.create({
        gaEnabled: true,
        gaMeasurementId: 'G-5F0GDVTZPE',
        adsensePublisherId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-0000000000000000',
      });
      console.log('  ✓ Initialized default Advertising settings (GA4: G-5F0GDVTZPE)');
    } else {
      console.log('  ✓ Advertising settings already exist in DB');
    }

    console.log('\n=========================================');
    console.log('🎉 Admin Seed Completed Successfully!');
    console.log('Default Super Admin credentials:');
    console.log(`Email:    ${adminEmail}`);
    console.log(`Password: ${adminPass}`);
    console.log('Google Analytics 4 default: G-5F0GDVTZPE');
    console.log('=========================================\n');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error during admin seed:', err);
    process.exit(1);
  }
}

seedAdmin();
