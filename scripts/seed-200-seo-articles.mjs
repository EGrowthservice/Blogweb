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

const IMAGES = {
  movies: [
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1200',
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

/**
 * Generates comprehensive, high-EEAT semantic HTML content designed for Google SEO
 */
function buildSeoContent(title, categoryName, subHeadings, faqItems) {
  return `
<p>As the cultural and entertainment landscape advances into 2026, <strong>${title}</strong> has emerged as a defining touchstone for critics, industry executives, and global audiences alike. With audience expectations shifting toward authentic storytelling, technical mastery, and substantive depth, this comprehensive investigation examines the core artistic choices and industry dynamics shaping this phenomenon.</p>

<h2>Executive Summary & Key Takeaways</h2>
<ul>
  <li><strong>Unprecedented Creative Vision:</strong> Challenging established studio formulas by prioritizing character authenticity and technical innovation.</li>
  <li><strong>Critical & Box Office Convergence:</strong> Defying polarized industry predictions by winning both widespread critical acclaim and robust commercial performance.</li>
  <li><strong>Lasting Cultural Imprint:</strong> Setting a new precedent that is already influencing production pipelines for upcoming projects across North America and global markets.</li>
</ul>

<h2>${subHeadings[0]}</h2>
<p>Understanding the full magnitude of this development requires examining the underlying creative process. In contrast to algorithmic trends and formulaic productions that have saturated streaming platforms in recent years, this project represents an intentional return to nuanced, patient craftsmanship.</p>

<p>Every creative decision—from casting and location scouting to sound engineering and post-production pacing—was executed under rigorous directorial standards. The result is a body of work that feels both intimately personal and universally resonant.</p>

<blockquote>
  "In an industry frequently distracted by superficial metrics, real cultural impact is only achieved when creators refuse to compromise on thematic integrity. Audiences immediately recognize and reward genuine artistic vulnerability."
</blockquote>

<h2>${subHeadings[1]}</h2>
<p>Beyond its aesthetic triumphs, the broader market implications cannot be overstated. Industry analysts point to this moment as proof that modern consumers are seeking tactile, immersive entertainment experiences that justify their time and financial investment.</p>

<p>Whether analyzing theatrical ticket pre-sales, streaming retention metrics, or social engagement curves, the data confirms a pronounced appetite for bold, auteur-led narratives over sanitized commercial products.</p>

<h2>Frequently Asked Questions (FAQ)</h2>
<h3>${faqItems[0].q}</h3>
<p>${faqItems[0].a}</p>

<h3>${faqItems[1].q}</h3>
<p>${faqItems[1].a}</p>

<h2>Conclusion: The Future Outlook</h2>
<p>As we evaluate the artistic legacy of this milestone, one conclusion remains inescapable: the standards of modern ${categoryName.toLowerCase()} have been permanently elevated. For creators and discerning audiences navigating 2026 and beyond, this work stands as a triumphant testament to what entertainment can achieve at its highest zenith.</p>
`;
}

// 20 NEW Movies topics
const NEW_MOVIES = [
  {
    title: "A24’s Complete 2026 Film Slate: Dark Comedies, Sci-Fi Thrillers, and Award Contenders",
    excerpt: "Explore A24's groundbreaking 2026 lineup, featuring visionary directors, cutting-edge practical horror, and festival award frontrunners.",
    subHeadings: ["The Independent Cinema Vanguard", "Balancing Modest Budgets with Monumental Impact"],
    faqs: [
      { q: "What is A24's most anticipated film releasing this year?", a: "Industry insiders point to their untitled psychological thriller starring an ensemble A-list cast that premiered at Venice." },
      { q: "How does A24 consistently outperform major legacy studios?", a: "By granting total creative freedom to visionary auteurs while maintaining disciplined production budgets." },
    ],
  },
  {
    title: "The 4K UHD Physical Media Renaissance: Why Cinephiles Are Ditching Streaming Compression",
    excerpt: "Why home cinema enthusiasts are returning to 4K Blu-ray discs for uncompressed 100Mbps bitrates, Dolby Vision, and lossless audio.",
    subHeadings: ["Bitrate Superiority Over Streaming Services", "The Cultural Significance of Physical Ownership"],
    faqs: [
      { q: "Does 4K Blu-ray truly look better than 4K streaming?", a: "Yes, 4K physical discs provide up to 100Mbps data transfer, eliminating banding, macro-blocking, and audio compression." },
      { q: "Are major studios still manufacturing physical discs in 2026?", a: "Boutique labels like Criterion, Arrow, and Kino Lorber have reported record-breaking revenue through collector editions." },
    ],
  },
  {
    title: "Inside James Cameron’s Production Vault: How Avatar 4 Pushes Underwater Motion Capture Beyond Reality",
    excerpt: "A deep dive into Cameron’s groundbreaking aquatic camera technology and deep-sea simulation algorithms for Pandora's next chapter.",
    subHeadings: ["Innovations in Sub-Aquatic Performance Capture", "Rendering Photorealistic Physics in Real Time"],
    faqs: [
      { q: "When is Avatar 4 scheduled for global theatrical release?", a: "20th Century Studios has slated the next chapter for an exclusive IMAX holiday theatrical window." },
      { q: "What new camera systems were invented for this film?", a: "Custom stereoscopic 3D underwater rigs capable of sub-millimeter optical motion tracking without surface distortion." },
    ],
  },
  {
    title: "The Art of the Two-Minute Trailer: How Modern Preview Cuts Make or Break Multi-Million Blockbusters",
    excerpt: "Unpacking the psychology, pacing, and editorial rhythm that turns a 120-second movie teaser into a viral global box office catalyst.",
    subHeadings: ["The Rhythmic Architecture of Sound and Silence", "Avoiding the Common Pitfall of Plot Spoilers"],
    faqs: [
      { q: "Who creates Hollywood movie trailers?", a: "Specialized creative trailer houses in Los Angeles and London working closely with studio marketing directors." },
      { q: "How much does a premier theatrical trailer cost to produce?", a: "Top-tier campaigns can invest upwards of $200,000 to $1,000,000 in licensing, editing, sound design, and color." },
    ],
  },
  {
    title: "Why Mid-Budget Crime Thrillers Are Dominating Theatrical Returns Over Bloated Superheroes",
    excerpt: "How original $40M detective procedurals and neo-noir thrillers are delivering massive studio ROI while $300M franchise tentpoles stumble.",
    subHeadings: ["The Economic Superiority of Disciplined Budgets", "Audience Fatigue Toward Monotonous CGI Final Battles"],
    faqs: [
      { q: "What defines a mid-budget Hollywood film?", a: "Typically features budgeted between $25 million and $60 million, focusing on character-driven suspense rather than VFX." },
      { q: "Which genres yield the highest theatrical profitability in 2026?", a: "Psychological horror, taut courtroom dramas, and grounded murder mysteries have generated the highest profit margins." },
    ],
  },
  {
    title: "Behind the Foley Stage: The Unsung Artists Crafting Every Step, Punch, and Whisper in Cinema",
    excerpt: "Meet the master Foley artists who use celery, gravel, and vintage leather to build the lifelike sonic world of modern award-winning films.",
    subHeadings: ["The Physical Alchemy of Sound Recreation", "Spatial Immersion in the Era of Dolby Atmos"],
    faqs: [
      { q: "What is Foley sound in filmmaking?", a: "The reproduction of everyday sound effects added in post-production to enhance realistic acoustic quality." },
      { q: "Why can't on-set microphones capture all necessary sounds?", a: "Set mics prioritize dialogue clarity, requiring footsteps, clothing movement, and props to be engineered separately." },
    ],
  },
  {
    title: "Sundance to Theatrical Gold: How First-Time Directors Sell Distribution Rights for Millions",
    excerpt: "An insider look at the high-stakes midnight bidding wars where independent filmmakers secure global distribution deals in Utah.",
    subHeadings: ["Navigating Festival Midnight Screenings", "The Tug-of-War Between Theatrical Chains and Tech Streamers"],
    faqs: [
      { q: "What is the average sale price for a breakout Sundance hit?", a: "Bidding wars frequently reach between $10 million and $18 million for worldwide theatrical distribution rights." },
      { q: "How do debut filmmakers gain entry into major festivals?", a: "Through rigorous programming committees reviewing thousands of submissions based on raw authenticity and vision." },
    ],
  },
  {
    title: "The Minimalist Movie Poster Revival: Why Studios Are Hiring Fine Artists Over Generic Photoshop Floating Heads",
    excerpt: "How classic illustrated graphic design and stark typography are making theatrical key art collectible masterpieces once again.",
    subHeadings: ["Rejecting the Corporate Floating-Head Paradigm", "The Surge of Limited Screen-Printed Collector Prints"],
    faqs: [
      { q: "Why did movie posters become so formulaic in the 2010s?", a: "Studio contractual obligations mandated prominent actor headshots, leading to generic Photoshop collages." },
      { q: "Who is spearheading the illustrated poster renaissance?", a: "Boutique creative agencies and independent illustrators partnering directly with passionate auteur directors." },
    ],
  },
  {
    title: "Cinematography in Pitch Black: How Large-Format Sensors Revolutionized Nighttime Filming",
    excerpt: "Exploring the groundbreaking ISO capabilities and vintage anamorphic lenses that allow cinematographers to shoot solely by candlelight.",
    subHeadings: ["The Technical Leap from Film Grain to Dual-Native ISO", "Preserving Mystery and Natural Shadow Falloff"],
    faqs: [
      { q: "What cameras are leading low-light cinema production?", a: "Large-format systems from ARRI, RED, and Sony featuring dual-native sensitivity and extreme dynamic range." },
      { q: "How does natural light affect actor performance?", a: "Eliminating harsh set lights allows actors to move freely without rigid marks, capturing organic emotional presence." },
    ],
  },
  {
    title: "The Return of the Cinematic Intermission: Why 3-Hour Epics Are Bringing Back The Mid-Movie Break",
    excerpt: "With theatrical runtimes expanding beyond 180 minutes, exhibitors are reintroducing the intermission to boost concession revenue and viewer comfort.",
    subHeadings: ["The Narrative Structure of a Well-Timed Act Break", "Theater Owners Rejoice Over Concession Sales Resurgence"],
    faqs: [
      { q: "Are directors supportive of theatrical intermissions?", a: "Many prominent auteurs intentionally structure their third acts around a designated 12-minute break for maximum dramatic tension." },
      { q: "When was the intermission historically removed from movie theaters?", a: "The practice phased out during the 1980s multiplex boom to squeeze in additional daily screening sessions." },
    ],
  },
  {
    title: "Screenplay Mastery: Deconstructing the Ticking-Clock Device in Modern Suspense Cinema",
    excerpt: "How masterful screenwriters use compressed timelines, claustrophobic settings, and escalating deadlines to build unendurable tension.",
    subHeadings: ["The Psychology of Time Scarcity on Audiences", "Maintaining Plausibility Under Extreme Pressure"],
    faqs: [
      { q: "What is an effective example of a ticking-clock screenplay?", a: "Classics like High Noon, Run Lola Run, and 1917 where real-world elapsed time mirrors the characters' desperate peril." },
      { q: "How can writers prevent contrived deadlines?", a: "By grounding the deadline in organic character motivations rather than arbitrary external coincidences." },
    ],
  },
  {
    title: "Practical Stunts vs Visual Effects: Why Real Danger Still Electrifies Theater Audiences",
    excerpt: "Analyzing why death-defying practical stunt work in franchises like Mission: Impossible and John Wick generates superior audience excitement.",
    subHeadings: ["The Inherent Brain Detection of Real Gravity and Weight", "The Unmatched Rigor of Hollywood Stunt Departments"],
    faqs: [
      { q: "Are practical stunts truly safer than early cinema eras?", a: "Modern stunt coordination utilizes computerized wirework, fireproof gels, and rigorous safety engineering." },
      { q: "Why does CGI action often feel weightless?", a: "Computer graphics can easily defy physics, which subconscious human vision detects as synthetic animation." },
    ],
  },
  {
    title: "Inside the Criterion Collection Vault: Preserving 100 Years of Cinema from Digital Degradation",
    excerpt: "A behind-the-scenes journey into the painstaking restoration labs scanning damaged original camera negatives in 8K resolution.",
    subHeadings: ["The Chemical Chemistry of Film Deterioration", "Color Grading with Surviving Historical Reference Prints"],
    faqs: [
      { q: "How long does a full 4K film restoration take?", a: "Depending on frame damage and optical scratches, a comprehensive restoration can require 6 to 18 months of artisanal labor." },
      { q: "Why is digital archival storage still vulnerable?", a: "Hard drives and magnetic tapes degrade within decades, whereas properly cooled celluloid film lasts over a century." },
    ],
  },
  {
    title: "The Architecture of Movie Monsters: From Classic Frankenstein to Modern Eldritch Horrors",
    excerpt: "How creature designers combine evolutionary biology, psychological archetype theory, and prosthetic sculpts to evoke primordial dread.",
    subHeadings: ["The Evolutionary Triggers of Uncanny Valley Design", "Blending Silicone Animatronics with Seamless CGI Enhancements"],
    faqs: [
      { q: "Who are the premier creature designers working today?", a: "Artists hailing from legendary workshops like WETA Workshop and Spectral Motion pushing practical character design." },
      { q: "Why are practical creatures scarier on camera?", a: "Actors on set can physically interact with, smell, and react to the physical presence of the monster." },
    ],
  },
  {
    title: "The Music Biopic Formula: How Studios Turn Rock and Pop Legends into Box Office Goldmines",
    excerpt: "Deconstructing the screenplay mechanics, music licensing negotiations, and actor transformations behind Hollywood's most profitable genre.",
    subHeadings: ["The Tightrope Walk of Estate Approvals and Creative Truth", "Vocal Training and Physical Mimicry That Captures Oscars"],
    faqs: [
      { q: "Do actors sing their own vocals in Hollywood biopics?", a: "Most productions utilize a sophisticated hybrid mix combining the actor's live vocal performance with master original tapes." },
      { q: "Why are music biopics so commercially reliable?", a: "They combine an established global fanbase with timeless song catalogs that immediately drive streaming royalties." },
    ],
  },
  {
    title: "Women Behind the Lens: How Female Cinematographers Are Reshaping Modern Visual Grammar",
    excerpt: "Celebrating the visionary directors of photography bringing unprecedented empathy, naturalism, and bold lighting to contemporary cinema.",
    subHeadings: ["Challenging Traditional Hollywood Camera Perspectives", "Creating Intimate Spaces for Nuanced Performance"],
    faqs: [
      { q: "Who are notable female cinematographers nominated for Academy Awards?", a: "Pioneers like Rachel Morrison, Ari Wegner, and Mandy Walker who made historic Oscar cinematography breakthroughs." },
      { q: "What defines this emerging visual movement?", a: "A pronounced mastery of soft naturalistic window lighting, psychological proximity, and non-exploitative framing." },
    ],
  },
  {
    title: "Stop-Motion Animation in 2026: The Miracle of Frame-By-Frame Puppetry in the AI Era",
    excerpt: "Why studios like Laika and Aardman continue to captivate audiences with handcrafted silicone armatures and 24-frames-per-second devotion.",
    subHeadings: ["The Handcrafted Tactility That CGI Cannot Duplicate", "Rapid 3D Prototyping for Infinite Facial Expressions"],
    faqs: [
      { q: "How many seconds of stop-motion footage does an animator produce per week?", a: "A skilled stop-motion animator typically completes approximately 4 to 8 seconds of finished screen time per week." },
      { q: "How has technology improved modern stop-motion?", a: "3D color printers now manufacture thousands of micro-expression faceplates for seamless character speech." },
    ],
  },
  {
    title: "Box Office Analytics Decoded: How Studios Model Global Risk in an Unpredictable Theatrical Market",
    excerpt: "Inside the confidential data models that calculate marketing spend, premium screen allocation, and international foreign exchange margins.",
    subHeadings: ["Tracking Opening Weekend Multipliers Across Demographics", "The Crucial Role of Premium Large-Format (PLF) Screens"],
    faqs: [
      { q: "What percentage of box office revenue goes to theater owners?", a: "Exhibitors typically retain between 40% and 50% of domestic ticket sales, with higher percentages retained on later weeks." },
      { q: "Why are IMAX and Dolby Cinema tickets vital for studio profits?", a: "Higher surcharge prices significantly inflate gross returns even with slightly lower overall attendance figures." },
    ],
  },
  {
    title: "The Neo-Western Frontier: How Contemporary Directors Reimagined the American Desert for Global Audiences",
    excerpt: "Examining modern cinematic masterpieces that trade six-shooters for border intrigue, moral gray zones, and breathtaking widescreen desert horizons.",
    subHeadings: ["Deconstructing Historical Western Mythology", "The Harsh Poetics of the Arid Borderlands Landscape"],
    faqs: [
      { q: "What characterizes the neo-Western genre?", a: "Setting classic Western themes—individualism, justice, lawlessness—in modern 21st-century economic and geopolitical realities." },
      { q: "What are landmark films of this movement?", a: "Acclaimed works including No Country for Old Men, Sicario, Hell or High Water, and Wind River." },
    ],
  },
  {
    title: "Period Drama Costume Engineering: Balancing Historical Authenticity with Expressive Theatrical Flair",
    excerpt: "How award-winning costume designers hand-dye fabrics, consult museum archives, and construct garments that articulate character psychology.",
    subHeadings: ["Sourcing Rare Silks and Antique Embroidery", "Costumes as Visual Metaphors for Power and Subjugation"],
    faqs: [
      { q: "How long does costume fabrication take for a major historical epic?", a: "Costume departments often spend 6 to 9 months hand-stitching hundreds of tailored military uniforms and royal gowns." },
      { q: "How does lighting affect period costume color palettes?", a: "Costume designers perform rigorous camera tests to ensure authentic natural candlelight doesn't distort rich velvet hues." },
    ],
  },
];

// 20 NEW TV Shows topics
const NEW_TV = [
  {
    title: "The Economics of Peak TV: Why Streaming Giants Are Cutting Budgets to Champion Quality",
    excerpt: "Analyzing the industry-wide correction as Netflix, HBO, and Apple TV+ abandon endless content volume to fund meticulously crafted prestige series.",
    subHeadings: ["The Deflation of the $200 Million Season Experiment", "Return to Focused Writers Rooms and Disciplined Schedules"],
    faqs: [
      { q: "Why are streaming budgets shrinking across the board?", a: "Wall Street shifted valuation metrics from subscriber growth to operating profitability, forcing sustainable spending." },
      { q: "Does lower spending mean worse television shows?", a: "On the contrary, streamlined productions often foster tighter scripts, clearer stakes, and less reliance on bloated CGI." },
    ],
  },
  {
    title: "Anatomy of the Perfect Season Finale: 10 Television Masterpieces That Defined Pop Culture",
    excerpt: "Deconstructing the narrative architecture, emotional catharsis, and unresolved cliffhangers that turn great television seasons into immortal cultural milestones.",
    subHeadings: ["Balancing Narrative Payoff with Lingering Curiosity", "The Emotional Culmination of Long-Form Character Journeys"],
    faqs: [
      { q: "What makes a season finale truly memorable?", a: "Resolving the central seasonal mystery while organically shifting character dynamics into unexplored psychological territory." },
      { q: "Can a bad finale ruin a great television series?", a: "Audience sentiment confirms that rushed or unearned finales can significantly damage a show's long-term rewatch legacy." },
    ],
  },
  {
    title: "The Mindhunter Legacy: Why David Fincher’s Meticulous Psychological Procedural Remains Unmatched",
    excerpt: "Revisiting Netflix's definitive criminal psychology drama and exploring why its quiet interrogation scenes outshine all modern police procedurals.",
    subHeadings: ["The Terrifying Power of Two Men Sitting in a Room", "Fincher's Precision Camera Language and Period Authenticity"],
    faqs: [
      { q: "Will Mindhunter ever return for a third season?", a: "David Fincher has stated that while expensive to produce, the creative team has kept conceptual outlines for future chapters." },
      { q: "Why do critics consider Mindhunter superior to standard crime shows?", a: "It avoids sensationalized action, focusing instead on the chilling, mundane banality of real psychological pathology." },
    ],
  },
  {
    title: "How Nordic Noir Conquered Global Television: Melancholic Landscapes and Compelling Moral Ambiguity",
    excerpt: "Exploring the dark, rainy aesthetic and relentless social critique that propelled Scandinavian crime series from Copenhagen to prime time globally.",
    subHeadings: ["The Atmospheric Majesty of Bleak Scandinavian Fjords", "Flawed Detectives Battling Bureaucratic Indifference"],
    faqs: [
      { q: "What are the quintessential Nordic Noir television series?", a: "Groundbreaking works include The Bridge (Bron/Broen), The Killing (Forbrydelsen), and Trapped (Ófærð)." },
      { q: "Why does the genre resonate so strongly with international viewers?", a: "Its deliberate, atmospheric pacing treats crime not as cheap spectacle, but as a tragic societal fracture." },
    ],
  },
  {
    title: "Inside Shogun Season 2: Recreating Sengoku Period Feudal Japan with Unprecedented Historical Rigor",
    excerpt: "How the showrunners and Japanese cultural historians constructed authentic feudal castles, kimono textiles, and samurai armor for television's biggest epic.",
    subHeadings: ["Respecting Historical Japanese Linguistic Dialects", "Combat Choreography Grounded in Authentic Bushido Martial Arts"],
    faqs: [
      { q: "How did Shogun achieve such high historical authenticity?", a: "The production employed dedicated Japanese specialists for kimono dressing, tea ceremony etiquette, and period dialect." },
      { q: "Will Season 2 follow James Clavell's original novel?", a: "The creative team is collaborating with historians to expand real historical events inspired by Tokugawa Ieyasu's reign." },
    ],
  },
  {
    title: "The Webtoon-to-Streaming Pipeline: How Digital Comics Became Television's New Billion-Dollar IP Well",
    excerpt: "From Seoul to Hollywood, exploring how episodic digital graphic novels are dominating streaming development pipelines with pre-built global fandoms.",
    subHeadings: ["The Rapid Pacing and Visual Hooks of Vertical Comics", "Bridging the Gap Between Gen Z Readers and Mainstream Audiences"],
    faqs: [
      { q: "What are successful TV adaptations of webtoons?", a: "Global phenomena like Sweet Home, All of Us Are Dead, and Tower of God originated as digital serialized webtoons." },
      { q: "Why do studios prefer webtoons over traditional literary novels?", a: "Webtoons come equipped with visual storyboards, proven reader engagement metrics, and episodic narrative pacing." },
    ],
  },
  {
    title: "The Art of the Cold Open: How Modern Television Grips Audiences in the First 90 Seconds",
    excerpt: "Analyzing the creative techniques showrunners use to deliver explosive shock, philosophical intrigue, or laugh-out-loud comedy before the title sequence rolls.",
    subHeadings: ["Establishing Tone Without Expository Dialogue", "Hooking Viewers Before They Return to the Content Menu"],
    faqs: [
      { q: "What is the historical origin of the television cold open?", a: "Pioneered in early mid-century television to prevent viewers from switching channels before the theme music played." },
      { q: "Which shows have the most renowned cold opens?", a: "Masterclasses include Breaking Bad's haunting visual puzzles, The Office's chaotic workplace gags, and Lost's plane crash." },
    ],
  },
  {
    title: "Sitcom Studio Audiences in 2026: Is Multi-Camera Comedy Making a Legitimate Comeback?",
    excerpt: "Why audiences fatigued by cynical dramedies are seeking the warmth, theatrical comedic timing, and genuine laughs of live multi-cam productions.",
    subHeadings: ["The Electric Energy of Performing for 200 Live Observers", "Refining Punchlines in Real Time Through Audience Reaction"],
    faqs: [
      { q: "What is the difference between single-cam and multi-cam sitcoms?", a: "Multi-cam is filmed on a theatrical soundstage with live audiences; single-cam is filmed like a movie on practical sets." },
      { q: "Can multi-camera comedies succeed on modern streaming platforms?", a: "Recent streaming revivals have shown that comforted viewers rewatch warm multi-cam comedies more than prestige drama." },
    ],
  },
  {
    title: "The Modern Showrunner’s Dilemma: Navigating Studio Mandates, Social Media Fandoms, and 100-Hour Weeks",
    excerpt: "An unvarnished look at the hardest job in show business: managing 300 crew members, writing scripts, and answering to corporate conglomerates.",
    subHeadings: ["The Dual Burden of CEO and Creative Visionary", "Combating Creative Burnout in Multi-Year Production Cycles"],
    faqs: [
      { q: "What exactly does a television showrunner do?", a: "The showrunner possesses final creative and operational authority over scripts, casting, budgets, editing, and staff management." },
      { q: "How does a writer rise to become a showrunner?", a: "Through ascending the writers room hierarchy: staff writer, story editor, producer, supervising producer, and executive producer." },
    ],
  },
  {
    title: "Streaming Bitrates Exposed: Why Some 4K HDR Television Looks Stunning While Other Series Suffer from Pixelation",
    excerpt: "Demystifying HEVC compression, Dolby Vision mastering profiles, and bandwidth throttling across major subscription platforms.",
    subHeadings: ["Understanding Variable Bitrates During High-Motion Sequences", "The Crucial Role of Calibrated OLED Panels in Home Viewing"],
    faqs: [
      { q: "Why do dark scenes look blocky or grey on some streaming apps?", a: "Low streaming bitrates discard subtle shadow detail to save server bandwidth, causing visible digital banding." },
      { q: "Which streaming services offer the highest video bitrates?", a: "Apple TV+ and Sony Bravia Core consistently provide the highest streaming bitrates, often exceeding 25 to 40 Mbps." },
    ],
  },
  {
    title: "The Collective Chemistry: How Ensemble Casts Turn Good Television Into Masterpieces",
    excerpt: "Examining how shows like The White Lotus, Succession, and Abbott Elementary rely on unselfish ensemble timing rather than a single lead star.",
    subHeadings: ["Eliminating Vanity for Scene Rhythms", "The Casting Director as the Unsung Architect of Television Hits"],
    faqs: [
      { q: "How do showrunners ensure all ensemble characters receive equal development?", a: "Through meticulous writer room whiteboard mapping tracking distinct character relationship arcs across the season." },
      { q: "Why do ensemble casts win more critical awards?", a: "Ensemble dynamics allow natural dramatic conflict and comedy to emerge from authentic clashing worldviews." },
    ],
  },
  {
    title: "The Ethics of True Crime Television: Respecting Victims While Satisfying Millions of Addicted Viewers",
    excerpt: "Navigating the murky moral boundaries of dramatizing real-world murders, interrogating forensic flaws, and confronting audience voyeurism.",
    subHeadings: ["The Line Between Investigative Journalism and Exploitation", "Consulting Surviving Family Members During Screenplay Adaptation"],
    faqs: [
      { q: "Why has true crime remained television's most durable genre?", a: "Human psychology possesses a primal instinct to understand danger, survival psychology, and the administration of justice." },
      { q: "Are streaming platforms adopting stricter true crime guidelines?", a: "Major platforms now require explicit verification protocols and legal clearance regarding victim representations." },
    ],
  },
  {
    title: "The Power of the Television Needle Drop: How Music Supervisors Revive Decades-Old Songs Into Billboard Chart-Toppers",
    excerpt: "How a single carefully chosen three-minute track during an emotional episode climax can revitalize a legacy band’s streaming catalog overnight.",
    subHeadings: ["Scouring Obscure B-Sides for Unmatched Emotional Resonance", "The Multi-Million Dollar Licensing Deals Behind Iconic TV Moments"],
    faqs: [
      { q: "What was the biggest TV needle drop in recent pop culture history?", a: "Kate Bush's 'Running Up That Hill' returning to worldwide #1 after its prominent feature in Stranger Things Season 4." },
      { q: "How does a music supervisor pitch a song to a skeptical director?", a: "By creating temporary video edits proving how the track's tempo, lyrics, and subtext amplify the character's internal turmoil." },
    ],
  },
  {
    title: "Black Mirror’s Cultural Prophecies: How Charlie Brooker’s Sci-Fi Anthology Predicted Our Technological Reality",
    excerpt: "Re-examining how early episodes foresaw social credit scores, deepfake grief avatars, and interactive media years before public release.",
    subHeadings: ["Satirizing Human Flaws Through the Lens of Future Tech", "The Artistic Flexibility of the Anthology Television Format"],
    faqs: [
      { q: "Which Black Mirror episodes proved most prophetic?", a: "Episodes like 'Nosedive' (social ratings) and 'Be Right Back' (AI personality cloning) mirrored immediate technological developments." },
      { q: "Why does the series continue to captivate audiences after seven seasons?", a: "Because it focuses on timeless human frailty—greed, vanity, jealousy—rather than just the gadgetry itself." },
    ],
  },
  {
    title: "The LED Volume Stage Revolution: How Real-Time Virtual Sets Replaced Physical Green Screens",
    excerpt: "Inside the massive 360-degree curved LED soundstages powered by Unreal Engine that let actors see their alien landscapes on set.",
    subHeadings: ["Eliminating Green Spill and Lighting Guesswork for Cinematographers", "The Technological Cost and Spatial Limitations of Volume Stages"],
    faqs: [
      { q: "What was the first television show to utilize LED Volume stages?", a: "Lucasfilm's The Mandalorian pioneered StageCraft virtual production technology in collaboration with Industrial Light & Magic." },
      { q: "Do actors prefer LED volume walls over green screens?", a: "Overwhelmingly yes, because they can organically see and emotionally react to the digital horizon in real time." },
    ],
  },
  {
    title: "Subtitles Over Dubbing: Why Global Audiences Now Prefer Watching International Shows in Original Languages",
    excerpt: "How the international success of Squid Game, Dark, and Lupin permanently trained English-speaking viewers to embrace subtitles over awkward voiceovers.",
    subHeadings: ["Preserving the Actor's Original Emotional Cadence and Throat Resonance", "The Cultural nuances Lost in Localization Translations"],
    faqs: [
      { q: "What percentage of streaming users watch with subtitles turned on?", a: "Studies show over 70% of Gen Z and Millennial viewers keep subtitles permanently active across all programming." },
      { q: "Why do dubbed tracks often sound artificial?", a: "Studio dubbing booths lack realistic acoustic space and cannot match the physical throat vibrations of on-set performance." },
    ],
  },
  {
    title: "The Binge Model vs Weekly Release: Which Distribution Strategy Builds More Sustainable TV Fandoms?",
    excerpt: "Comparing Netflix's all-at-once drops against HBO's traditional weekly Sunday night model to analyze long-term cultural watercooler dominance.",
    subHeadings: ["The Seven-Day Cycle of Online Fan Theories and Memes", "The Immediate Dopamine Rush of 10-Hour Weekend Bingeing"],
    faqs: [
      { q: "Why are some streaming services returning to weekly episodes?", a: "Weekly releases maintain active public discourse and social media trending topics for two to three months rather than one weekend." },
      { q: "Does the binge model hurt complex television mysteries?", a: "Yes, fast-forward viewing often causes audiences to overlook subtle foreshadowing designed for weekly reflection." },
    ],
  },
  {
    title: "From Movie Star to TV Lead: Why A-List Film Icons Prefer 8-Episode Prestige Mini-Series",
    excerpt: "How limited television series offer Hollywood superstars Oscar-caliber dramatic material without trapping them in multi-year broadcast contracts.",
    subHeadings: ["The Novelistic Depth of 400 Screenplay Pages", "Competing for Emmy Awards Between Theatrical Film Shoots"],
    faqs: [
      { q: "Which major movie stars recently made the transition to limited television?", a: "Oscar winners like Nicole Kidman, Kate Winslet, Michael Keaton, and Colin Farrell have headlined celebrated prestige mini-series." },
      { q: "How does the compensation compare to theatrical blockbusters?", a: "Top-tier television leads frequently command $1 million to $1.5 million per episode for prestigious limited series." },
    ],
  },
  {
    title: "Late-Night Television in the TikTok Era: Adapting Network Monologues for 60-Second Viral Algorithms",
    excerpt: "How broadcast comedy writers room now construct desk bits, celebrity games, and political monologues specifically for vertical mobile consumption.",
    subHeadings: ["Declining Broadcast Ratings vs Billions of Digital Views", "The Changing Demographics of Late-Night Entertainment"],
    faqs: [
      { q: "Is traditional linear late-night television dying?", a: "While broadcast viewership has declined, late-night brands remain powerful digital content engines driving YouTube and TikTok monetization." },
      { q: "How has joke writing evolved for social media clips?", a: "Punches must land within the first five seconds to prevent mobile users from swiping past the clip on algorithmic feeds." },
    ],
  },
  {
    title: "The Video Game Television Renaissance: How The Last of Us and Fallout Shattered the Video Game Curse",
    excerpt: "How partnering with passionate game creators and respecting source material turned video game lore into television's most critically decorated genre.",
    subHeadings: ["Treating Game Universes as Serious Dramatic Literature", "Replicating Iconic In-Game Visuals with Hollywood Practical Production"],
    faqs: [
      { q: "Why did early video game adaptations fail so consistently?", a: "Early Hollywood studios ignored the core thematic appeal of the games, treating them as superficial action titles." },
      { q: "What upcoming video game series are currently in production?", a: "Major adaptations of God of War, Horizon Zero Dawn, and Mass Effect are in active development with prime budgets." },
    ],
  },
];

// We will generate the 100 new articles across Movies (20), TV (20), Celebrities (20), Music (20), Gaming (20)
// To keep code concise and maintainable, we will build generators for Celebrities, Music, and Gaming using identical deep SEO structure!

const NEW_CELEBRITIES_TOPICS = [
  'Met Gala 2026 Architectural Couture: Inside the Most Exclusive Red Carpet in Fashion History',
  'The Quiet Dignity of Cillian Murphy: Why True Artistry Transcends the Hollywood Gossip Cycle',
  'Zendaya and Law Roach: The Creative Partnership That Redefined 21st-Century Celebrity Styling',
  'Vintage Jewelry on the Red Carpet: Millions in Archival Cartier and Tiffany Diamonds Protected by Armed Guards',
  'Behind the A-List Press Junket: Surviving 200 Interviews in 48 Hours Across Three Continents',
  'The Evolution of Celebrity Fragrances: How Indie Artisanal Perfumes Replaced Cheap Department Store Scents',
  'Hollywood’s Young Moguls: Why Actors Under 30 Are Launching Production Companies with First-Look Deals',
  'The Return of the Long-Form Celebrity Interview: Stars Ditching Soundbites for Intimate 2-Hour Audio Pods',
  'Pedro Pascal on Finding Leading Man Stardom in His Forties: Authenticity Over Stereotypical Glamour',
  'Red Carpet Skin Preparation: The 72-Hour Dermatological Regimen Before the Academy Awards',
  'Celebrity Memoirs That Changed the Industry: Unapologetic Accounts of Mental Health and Studio Exploitation',
  'The Power of the Met Gala Red Carpet Reveal: Transforming Haute Couture into Worldwide Viral Phenomena',
  'Margot Robbie’s LuckyChap Entertainment: Championing Daring Female Storytellers at the Global Box Office',
  'Vintage Watch Collecting in Hollywood: Why Patek Philippe and Rolex Daytonas Are the Ultimate Status Statement',
  'The Art of the Celebrity Profile: Behind the Closed Doors of Legendary Magazine Cover Features',
  'Keanu Reeves and the Code of Hollywood Humility: Why the Industry Revere the Neo-Action Icon',
  'Florence Pugh’s Bold Red Carpet Evolution: Fearless Color, Sheer Textures, and Uncompromising Individuality',
  'Celebrity Philanthropy 2.0: Moving Beyond Black-Tie Galas to Transparent Direct Action Foundations',
  'The Anatomy of an Oscars Acceptance Speech: Balancing Genuine Emotion with Timed Commercial Breaks',
  'A-List Method Acting Controversies: When Extreme Character Immersion Crosses Professional Boundaries',
];

const NEW_MUSIC_TOPICS = [
  'The Sonic Architecture of Stadium Shows: How Audio Engineers Deliver Audiophile Precision to 80,000 Fans',
  'The Vinyl Record Manufacturing Bottleneck: Inside the Global Shortage of Specialized Lacquer Discs',
  'Billie Eilish and Finneas: The Intimate Home Studio Production Philosophy Behind Multi-Grammy Anthems',
  'The Global Dominance of Afrobeats: How African Rhythms and Syncopation Conquered Western Streaming',
  'Analog Synthesizers in the Modern Studio: Why Top Hitmakers Prefer Hardware Warmth Over Digital Plugins',
  'The Deconstruction of Modern Song Length: Why Streaming Algorithms Slashed the 4-Minute Radio Standard',
  'Inside Abbey Road Studios: How the Historic London Facility Adapts Legendary Acoustics for Spatial Audio',
  'The Resurgence of Shoegaze and Dream Pop: Gen Z Discovers the Infinite Reverb of Vintage Guitar Pedals',
  'The Power of Pop Song Bridges: 15 Musical Transitions That Defined Decades of Chart History',
  'Soundtrack Composers as Pop Stars: How Film and Game Instrumentalists Are Selling Out World Arenas',
  'The 72-Hour Songwriting Camp: Inside the Pressure-Cooker Marathons Crafting Tomorrow’s Summer Anthems',
  'Electronic Music Festival Innovations: 360-Degree Spatial Audio Stages and Sustainable Solar Power',
  'The Evolution of Live Vocal Performance: Why Raw Acoustic Sets Are Dominating Modern Streaming Metrics',
  'The Art of Mastering Music: The Invisible Final Step That Gives Platinum Records Their Punch and Warmth',
  'Hip-Hop Sample Clearance in 2026: The Legal Battles and Million-Dollar Royalties Behind Famous Loops',
  'The Renaissance of Drum and Bass: Fast-Tempo Syncopated Breakbeats Infiltrating Mainstream Pop Tracks',
  'Independent Record Labels Triumphant: How Boutique Imprints Are Beating Major Label Corporate Bureaucracy',
  'Classical Music Reimagined: How Young Instrumentalists Are Blending Modular Synthesizers with Bach and Chopin',
  'The Psychology of Music Festivals: Why Shared Harmonic Vibrations Create Deep Community and Belonging',
  'The Album Rollout Masterclass: Mystery Billboards, Cryptic Coordinates, and Immersive Pop-Up Stores',
];

const NEW_GAMING_TOPICS = [
  'Grand Theft Auto VI Physics Engine Deep Dive: Dynamic Water Simulations, Volumetric Weather, and AI',
  'Unreal Engine 5.6 Technical Innovations: Nanite Mesh Geometry and Real-Time Ray-Traced Global Illumination',
  'The Philosophy of Soulslike Level Design: Teaching Players Through Architectural Layout and Visual Contrast',
  'Why Narrative RPGs are Experiencing a Historic Golden Age: Branching Dialogue and Consequential Storytelling',
  'The Future of Portable PC Handhelds: Custom Silicon, Battery Chemistry Breakthroughs, and OLED Displays',
  'Hidetaka Miyazaki and Environmental Storytelling: Why Leaving Narrative Gaps Creates Immersive Masterpieces',
  'The Fighting Game Renaissance: How Rollback Netcode and Modernized Inputs Doubled Global Tournament Turnout',
  'Independent Games Outshining AAA Studios: Why 5-Person Indie Teams Are Sweeping Game of the Year Awards',
  'Sound Design in Interactive Horror: Using Spatial Audio Frequencies to Trigger Primordial Psychological Dread',
  'The Resurgence of Turn-Based Combat: Why Gamers Crave Strategic Chess-Like Pacing Over Button-Mashing',
  'Virtual Photography in Modern Gaming: Composition, Aperture Simulation, and the Art of Digital Photo Contests',
  'Ray Tracing in Competitive Gaming: Does Photorealistic Lighting Help or Hinder Professional Reaction Times?',
  'Hideo Kojima’s Next Masterpiece: Blending Hollywood Cinematic Storytelling with Revolutionary Gameplay Systems',
  'Universal Game Accessibility: How Adaptive Controllers and Audio Cues Opened Gaming to Millions Worldwide',
  'The Art of Crafting 100-Hour Open Worlds: How to Eliminate Repetitive Filler Content in Modern Sandbox Games',
  'The Nostalgia of Retro Remakes: Rebuilding 90s Classics in 4K While Preserving Their Original Gameplay Soul',
  'The Video Game Orchestral Boom: Why Symphony Halls Worldwide Are Selling Out Symphonic Game Soundtracks',
  'The Technical Marvel of Cross-Platform Play: Synchronizing PC, PlayStation, Xbox, and Handhelds in Real Time',
  'Procedural Generation vs Handcrafted Worlds: Why Developers Are Returning to Smaller, Denser Game Maps',
  'Preserving Digital-Only Games: The Crucial Struggle of Archival Communities Against Server Decommissioning',
];

async function runSeed200SeoArticles() {
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

    console.log('\n--- PART 1: Upgrading existing articles to rich SEO semantic HTML ---');
    const existingArticles = await Article.find({});
    let upgradedCount = 0;

    for (const art of existingArticles) {
      // Check if content has raw markdown '##' or needs rich semantic HTML upgrade
      if (art.content && (art.content.includes('##') || !art.content.includes('<h2>'))) {
        const catName = art.category ? art.category.toUpperCase() : 'Entertainment';
        const upgradedHtml = buildSeoContent(
          art.title,
          catName,
          ['The Evolution of Narrative Pacing & Artistic Vision', 'Critical Analysis, Technical Precision, and Industry Impact'],
          [
            { q: `What makes ${art.title} so significant in 2026?`, a: `It represents a pivotal turning point in modern ${art.category || 'culture'}, redefining technical standards and resonating deeply with discerning global audiences.` },
            { q: `Where can readers experience or follow this story?`, a: `PULSE Entertainment maintains ongoing coverage with exclusive editorial reviews, behind-the-scenes reporting, and industry updates.` }
          ]
        );

        await Article.updateOne(
          { _id: art._id },
          {
            $set: {
              content: upgradedHtml,
              status: 'published',
            }
          }
        );
        upgradedCount++;
      }
    }
    console.log(`✓ Upgraded ${upgradedCount} existing articles to full Google SEO semantic HTML standard.`);

    console.log('\n--- PART 2: Generating & Seeding 100 NEW Google SEO-Optimized Articles ---');
    const startDate = new Date('2026-02-01T08:00:00Z').getTime();
    const endDate = new Date('2026-09-22T20:00:00Z').getTime();

    let newAddedCount = 0;

    // Helper to insert a batch of 20
    const insertBatch = async (catKey, catName, topicsList, isStructured = false) => {
      const categoryId = categoryMap.get(catKey);
      const imagesList = IMAGES[catKey] || IMAGES.movies;
      console.log(`\n📂 Seeding 20 NEW articles for category: [${catName}]`);

      for (let i = 0; i < topicsList.length; i++) {
        const item = topicsList[i];
        const title = isStructured ? item.title : item;
        const excerpt = isStructured
          ? item.excerpt
          : `A comprehensive analysis of ${title}. Exploring the cultural impact, artistic craft, and technical innovations shaping modern ${catName.toLowerCase()} in 2026.`;
        
        const subHeadings = isStructured && item.subHeadings
          ? item.subHeadings
          : ['The Confluence of Artistic Integrity and Technical Prowess', 'Market Implications and Changing Global Consumer Preferences'];
        
        const faqs = isStructured && item.faqs
          ? item.faqs
          : [
              { q: `Why is this topic generating significant critical discussion in 2026?`, a: `Because it directly challenges outdated industry conventions and establishes a new benchmark for excellence in ${catName.toLowerCase()}.` },
              { q: `How does this development affect audiences and industry creators?`, a: `It provides creators with greater artistic latitude while satisfying audience demand for substantive, resonant storytelling.` }
            ];

        const baseSlug = generateSlug(title);
        const uniqueSlug = `${baseSlug}-in-depth-2026`;
        const imgUrl = imagesList[i % imagesList.length];

        const randomTime = startDate + Math.random() * (endDate - startDate);
        const publishedDate = new Date(randomTime);

        const viewsCount = Math.floor(Math.random() * 28000) + 1200;
        const likesCount = Math.floor(viewsCount * (0.04 + Math.random() * 0.07));

        const content = buildSeoContent(title, catName, subHeadings, faqs);

        const articleDoc = {
          title,
          slug: uniqueSlug,
          excerpt,
          content,
          category: catKey,
          categoryId: categoryId || undefined,
          authorId: authorId || undefined,
          author: authorObj,
          featuredImage: imgUrl,
          featuredImageAlt: `${title} - In-depth editorial analysis`,
          status: 'published',
          tags: [catKey, 'seo-feature', 'in-depth', '2026-analysis', 'critics-choice'],
          readTimeMinutes: Math.floor(Math.random() * 4) + 5,
          isFeatured: i === 2 || i === 12,
          isTrending: i === 0 || i === 7,
          viewsCount,
          likesCount,
          publishedAt: publishedDate,
        };

        await Article.findOneAndUpdate(
          { slug: uniqueSlug },
          { $set: articleDoc },
          { upsert: true, new: true }
        );

        newAddedCount++;
        console.log(`  ✓ [${newAddedCount}/100] [${catKey.toUpperCase()}] ${title.substring(0, 50)}...`);
      }
    };

    // 1. Movies (20)
    await insertBatch('movies', 'Movies', NEW_MOVIES, true);

    // 2. TV Shows (20)
    await insertBatch('tv-shows', 'TV Shows', NEW_TV, true);

    // 3. Celebrities (20)
    await insertBatch('celebrities', 'Celebrities', NEW_CELEBRITIES_TOPICS, false);

    // 4. Music (20)
    await insertBatch('music', 'Music', NEW_MUSIC_TOPICS, false);

    // 5. Gaming (20)
    await insertBatch('gaming', 'Gaming', NEW_GAMING_TOPICS, false);

    const totalInDb = await Article.countDocuments();
    console.log('\n======================================================');
    console.log(`🎉 COMPLETED SUCCESSFULLY!`);
    console.log(`Upgraded existing articles: ${upgradedCount}`);
    console.log(`Brand-new SEO articles added: ${newAddedCount}`);
    console.log(`Total articles now live in Database: ${totalInDb}`);
    console.log('======================================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error in seed200SeoArticles:', error);
    process.exit(1);
  }
}

runSeed200SeoArticles();
