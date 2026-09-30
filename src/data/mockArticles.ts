export interface ArticleData {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'comedy' | 'vintage-moments' | 'entertainment';
  tags: string[];
  featuredImage: string;
  featuredImageAlt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
    twitter?: string;
  };
  readTimeMinutes: number;
  isFeatured: boolean;
  isTrending: boolean;
  viewsCount: number;
  likesCount: number;
  publishedAt: string | Date;
}

export const CATEGORIES = [
  { slug: 'comedy', name: 'Comedy Classics', description: 'Timeless sketches, The Carol Burnett Show masterpieces, and Tim Conway’s greatest physical comedy performances.' },
  { slug: 'vintage-moments', name: 'Vintage Moments', description: 'Legendary unscripted moments, Tonight Show chaos, and Tim Conway making Johnny Carson weep with laughter.' },
  { slug: 'entertainment', name: 'Entertainment', description: 'Behind-the-scenes retrospectives, rehearsal antics, and the timeless television legacy of Tim Conway.' },
] as const;

export const MOCK_ARTICLES: ArticleData[] = [
  {
    id: 'art-1',
    title: 'Tim Conway and the Elephant Story: The Legendary Outtake That Made the Cast of The Carol Burnett Show Break Character',
    slug: 'tim-conway-elephant-story-carol-burnett-show',
    excerpt: 'Discover the hilarious Tim Conway Elephant Story, the legendary Carol Burnett Show outtake that left Carol Burnett, Vicki Lawrence and the cast struggling to keep a straight face.',
    content: `
<h2>The Elephant Story: Tim Conway's Greatest Unscripted Triumph</h2>
<p>There are comedy moments that are carefully written, rehearsed, and performed exactly as planned. And then there are moments when something seems to happen almost by accident — when a comedian says one unexpected line, takes a joke just a little too far, or simply looks at another person and suddenly everyone in the room starts laughing.</p>

<p>That was Tim Conway.</p>

<p>During a Family sketch on <em>The Carol Burnett Show</em>, Conway launched into an unscripted, rambling story about a circus elephant. What was supposed to be a brief transition turned into minutes of escalating absurdity as Harvey Korman, Vicki Lawrence, and Carol Burnett fought desperately to keep their composure.</p>

<div class="video-container my-6">
  <iframe src="https://www.youtube.com/embed/oJEp9XI_daE?si=aahkNCt6wG6afQzc" width="100%" height="450" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<p>The result was a collection of television moments that still feel remarkably spontaneous decades later. Conway's ability to stretch a simple concept into comedic genius remains unmatched in late-night and variety television history.</p>

<h2>Vicki Lawrence Delivers the Immortal Punchline</h2>
<p>Just when Conway thought he had broken every single actor on set, Vicki Lawrence remained in character as "Mama" and delivered a razor-sharp, off-the-cuff response that brought the entire studio down in hysterics. Even Conway himself couldn't help but crack up, solidifying the sketch as one of the greatest moments in television history.</p>

<blockquote>
  "That was Tim’s secret weapon. He never played to the joke; he played to the awkwardness between human beings, and that broke everyone on stage every single time."
</blockquote>
`,
    category: 'comedy',
    tags: ['Tim Conway', 'Carol Burnett Show', 'Elephant Story', 'Harvey Korman', 'Vicki Lawrence'],
    featuredImage: 'https://blog.igallery.blog/assets/0eb9b6868621dc5e84e8676418377613/2026/0928/f72d7b9c-8f7d-47b0-b179-9025fc4bbad1-b1b0e2e8-98a8-4c6a-89c8-5a348d703b95.png',
    featuredImageAlt: 'Tim Conway and the Elephant Story on The Carol Burnett Show',
    author: {
      name: 'Editorial Staff',
      role: 'Staff Writer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      bio: 'Preserving and archiving the television legacy of Tim Conway.',
    },
    readTimeMinutes: 5,
    isFeatured: true,
    isTrending: true,
    viewsCount: 14200,
    likesCount: 980,
    publishedAt: '2026-09-29T10:00:00.000Z',
  },
  {
    id: 'art-2',
    title: 'Tim Conway’s Slowest Sheriff Ever — The Bank Robber Couldn’t Wait Any Longer',
    slug: 'tim-conways-slowest-sheriff-ever-the-bank-robber-couldnt-wait-any-longer',
    excerpt: 'The bank robber was ready for a showdown… then the world\'s slowest sheriff walked in. Watch how Tim Conway and Harvey Korman turned silence and tiny shuffling steps into comedy gold.',
    content: `
<h2>The Bank Robber Was Ready for a Showdown… Then Tim Conway Walked In</h2>
<p>A tense Western saloon. A dangerous bank robber. Everyone is waiting to see what happens next. Then Tim Conway’s elderly sheriff walks through the swinging doors — and suddenly, the biggest problem facing the outlaw isn’t a gunfight. It’s the sheriff’s excruciatingly slow movements.</p>

<p>In one of the most celebrated sketches from <em>The Carol Burnett Show</em>, Tim Conway introduced his beloved "Old Man" character in the context of a classic frontier standoff. Playing the menacing outlaw waiting to rob the town, Harvey Korman stands with pistols drawn, prepared to deliver a classic Hollywood threat. But Conway’s sheriff takes nearly five minutes just to shuffle from the entrance to the bar counter.</p>

<h2>Every Tiny Movement Was Part of the Joke</h2>
<p>What makes the Slowest Sheriff sketch so brilliant is Conway’s supreme confidence in silence. He doesn't rush. He takes miniature, quarter-inch steps. He adjusts his badge. He stops halfway across the room to scratch his knee, nearly losing his balance in the process.</p>

<p>Every tiny physical hesitation is milked for every ounce of comedic tension. Meanwhile, Harvey Korman’s robber grows increasingly bewildered, caught between maintaining his vicious desperado persona and trying desperately not to burst into hysterical laughter on national television.</p>

<blockquote>
  "You could hear the audience holding their breath, waiting for Harvey to break. The slower Tim went, the harder it was for anyone on that stage to survive."
</blockquote>

<h2>Harvey Korman’s Inevitable Breaking Point</h2>
<p>Part of the magic of <em>The Carol Burnett Show</em> was that Conway rarely performed sketches the same way in rehearsal as he did during the final studio taping. He saved his most outrageous physical improvisations specifically to catch Korman off-guard.</p>

<p>By the time the sheriff finally reaches into his holster — pulling out an apple instead of a revolver, taking a slow, contemplative bite, and carefully putting it back — Korman’s shoulders are visibly shaking. The live studio audience responds with roars of laughter, completely captivated by the absurdity of the standoff.</p>
`,
    category: 'comedy',
    tags: ['Tim Conway', 'Harvey Korman', 'The Carol Burnett Show', 'Old Man Sketch', 'Slapstick Comedy'],
    featuredImage: 'https://blog.igallery.blog/assets/0eb9b6868621dc5e84e8676418377613/2026/0928/bb47f26b-dac2-4959-b908-f59be20208e0-adss.png',
    featuredImageAlt: 'Tim Conway as the Old Man Sheriff on The Carol Burnett Show',
    author: {
      name: 'Editorial Staff',
      role: 'Staff Writer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      bio: 'Preserving and archiving the television legacy of Tim Conway.',
    },
    readTimeMinutes: 4,
    isFeatured: true,
    isTrending: false,
    viewsCount: 11800,
    likesCount: 840,
    publishedAt: '2026-09-28T14:30:00.000Z',
  },
  {
    id: 'art-3',
    title: 'The Dentist Only Got a "C" in Tooth Extraction… Then Everything Goes Completely Wrong',
    slug: 'the-dentist-only-got-a-c-in-tooth-extraction-then-everything-goes-completely-wrong',
    excerpt: 'What happens when your dentist needs a textbook to remember how to extract a tooth? In this legendary television sketch, Tim Conway accidentally anesthetizes his own hand and leg while Harvey Korman loses all composure.',
    content: `
<h2>What Happens When Tim Conway Needs a Textbook to Pull a Tooth?</h2>
<p>Imagine sitting comfortably in a dentist’s chair, expecting a routine appointment. You trust the medical professional to know exactly what he is doing. Then he casually admits that he only received a "C" in tooth extraction from dental school. And somehow, that is only the beginning of your nightmare.</p>

<p>First broadcast on March 3, 1969, on <em>The Carol Burnett Show</em>, "The Dentist Sketch" starring Tim Conway and Harvey Korman is widely regarded by television historians and comedic critics as one of the greatest sketches ever written for American television.</p>

<h2>The Real-Life Military Inspiration</h2>
<p>Surprisingly, Conway did not dream up the premise entirely out of thin air. Years later, he revealed that the sketch was inspired by an actual experience he had while serving in the United States Army in the 1950s. A newly minted military dentist had accidentally numbed his own thumb while preparing to inject Conway's gums.</p>

<p>Conway recognized the comedic brilliance of the situation and filed it away in his memory, waiting years until the right opportunity presented itself to bring it to life alongside his favorite comedic partner, Harvey Korman.</p>

<h2>The Chain Reaction of Self-Anesthetization</h2>
<p>In the sketch, Conway plays a nervous, bumbling novice dentist attempting his very first extraction on an impatient patient suffering from an agonizing toothache (played with exasperated perfection by Korman).</p>

<p>As Conway prepares the Novocain syringe, he accidentally jabs his own thumb. Within seconds, his hand goes limp. Trying to manage the heavy syringe with his opposite hand, he inadvertently injects his other palm, followed by his wrist, and eventually his own thigh. By the climax of the scene, Conway is flopping around the dental chair with a completely paralyzed lower half, attempting to pull Korman's tooth with his teeth.</p>

<blockquote>
  "During the sketch, Harvey laughed so hard that he famously suffered a minor bladder mishap right on camera. They couldn't cut the scene because the live audience was laughing so loudly the floor was shaking."
</blockquote>
`,
    category: 'comedy',
    tags: ['Tim Conway', 'Harvey Korman', 'The Dentist Sketch', 'The Carol Burnett Show', 'Comedy Legend'],
    featuredImage: 'https://blog.igallery.blog/assets/0eb9b6868621dc5e84e8676418377613/2026/0928/701ca4fa-ba56-43d9-9ca5-d0ce2d215942-image.png',
    featuredImageAlt: 'The Dentist Sketch starring Tim Conway and Harvey Korman',
    author: {
      name: 'Editorial Staff',
      role: 'Staff Writer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      bio: 'Preserving and archiving the television legacy of Tim Conway.',
    },
    readTimeMinutes: 5,
    isFeatured: true,
    isTrending: false,
    viewsCount: 18900,
    likesCount: 1420,
    publishedAt: '2026-09-27T16:00:00.000Z',
  },
  {
    id: 'art-4',
    title: 'Mr. Tudball and Mrs. Wiggins: Tim Conway and Carol Burnett’s Masterclass in Office Absurdity',
    slug: 'mr-tudball-mrs-wiggins-tim-conway-carol-burnett-office-comedy',
    excerpt: 'With an unplaceable foreign accent and zero patience, Tim Conway’s Mr. Tudball paired with Carol Burnett’s clueless secretary Mrs. Wiggins to create one of television\'s finest recurring sketches.',
    content: `
<h2>The Hilarious Mismatch: Mr. Tudball Meets Mrs. Wiggins</h2>
<p>Few sketch comedy pairings achieved the comedic perfection of Tim Conway's "Mr. Tudball" and Carol Burnett's "Mrs. Wiggins." Playing a toupee-wearing, frustrated businessman whose accent seemed to change every three sentences, Conway found the ideal comedic foil in Burnett's slow-witted, skirt-shuffling secretary.</p>

<p>Every time Tudball attempted to install a simple office intercom system or explain how to answer a telephone, the conversation devolved into pure linguistic chaos. Conway's exasperated facial expressions and physical commitment turned mundane office interactions into timeless comedy gold.</p>

<h2>Conway's Accent and Improvised Nuances</h2>
<p>Conway initially invented the accent as a blend of Romanian, Swedish, and generic European, deliberately confusing his co-stars during live recordings. Burnett often admitted that simply hearing Conway say the words "Mrs. Uh-Wiggins" in that singular cadence was enough to make her break character into helpless laughter.</p>

<blockquote>
  "Tim didn't just write funny dialogue; he inhabited characters from the inside out. With Mr. Tudball, the posture, the toupee, and the walk told the whole story before he even opened his mouth."
</blockquote>
`,
    category: 'comedy',
    tags: ['Tim Conway', 'Carol Burnett', 'Mr Tudball', 'Mrs Wiggins', 'Office Comedy'],
    featuredImage: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Tim Conway as Mr. Tudball on The Carol Burnett Show',
    author: {
      name: 'Editorial Staff',
      role: 'Staff Writer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      bio: 'Preserving and archiving the television legacy of Tim Conway.',
    },
    readTimeMinutes: 4,
    isFeatured: false,
    isTrending: false,
    viewsCount: 8900,
    likesCount: 670,
    publishedAt: '2026-09-26T18:00:00.000Z',
  },
  {
    id: 'art-5',
    title: 'Tim Conway Meets Johnny Carson: The Unrehearsed Tonight Show Mayhem That Left Carson in Tears',
    slug: 'tim-conway-meets-johnny-carson-unrehearsed-talk-show-mayhem',
    excerpt: 'Tim Conway had a secret weapon on live television: he could make Johnny Carson break character and weep with uncontrollable laughter on The Tonight Show without ever rushing a punchline.',
    content: `
<h2>The Comedic Chemistry That Stopped Johnny Carson in His Tracks</h2>
<p>Whenever Tim Conway was booked as a guest on <em>The Tonight Show Starring Johnny Carson</em>, the studio crew and late-night audience knew they were in for an unpredictable evening. Unlike other celebrity guests who rehearsed their anecdotes with talk-show bookers, Conway brought pure, unfiltered spontaneity to the desk.</p>

<p>Conway’s style was deceptive. He would sit down calmly, speak in a soft, understated voice, and slowly reel Johnny into an elaborate, preposterous tale. Carson, famous for having one of the best laughs in show business, would frequently have to rest his forehead on his desk, wipe tears from his eyes, and signal the orchestra for an impromptu break.</p>

<h2>The Mastery of the Deadpan Pause</h2>
<p>Conway understood that the funniest part of a comedic story is often the awkward pause right before the reveal. He allowed Johnny Carson to react, struggle for words, and break into laughter before delivering the final knockout punchline. It was a masterclass in generosity between two comedic giants.</p>

<blockquote>
  "Johnny loved Tim because Tim never tried too hard. He was completely comfortable in the quiet moments, and that is what made the laughs explosive."
</blockquote>
`,
    category: 'vintage-moments',
    tags: ['Tim Conway', 'Johnny Carson', 'The Tonight Show', 'Late Night TV', 'Unscripted Moments'],
    featuredImage: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Tim Conway on The Tonight Show with Johnny Carson',
    author: {
      name: 'Editorial Staff',
      role: 'Staff Writer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      bio: 'Preserving and archiving the television legacy of Tim Conway.',
    },
    readTimeMinutes: 4,
    isFeatured: true,
    isTrending: true,
    viewsCount: 13200,
    likesCount: 1100,
    publishedAt: '2026-09-26T15:00:00.000Z',
  },
  {
    id: 'art-6',
    title: 'Tim Conway’s Most Outrageous Tonight Show Stunt: When Johnny Carson Lost Complete Control',
    slug: 'tim-conway-most-outrageous-tonight-show-stunt-johnny-carson',
    excerpt: 'From fake commercial cues to hilarious tall tales about his Midwest upbringing, Tim Conway knew exactly how to make Johnny Carson lose complete control on live television.',
    content: `
<h2>When Commercial Breaks Became Tim Conway's Playground</h2>
<p>One of the most famous running dynamics between Tim Conway and Johnny Carson was Conway’s uncanny habit of dragging out a story right until the network commercial cue flashed in the studio. Rather than wrapping up his sentence, Conway would deliberately pause, look directly into the camera, and add one completely surreal detail.</p>

<p>Carson would pound the desk in mock frustration as the theme music swelled, knowing Conway had intentionally sabotaged the schedule just to get an authentic laugh. It was this fearless comedic playfulness that made Conway one of Johnny's all-time favorite guests across three decades.</p>

<h2>Decades of Television Camaraderie</h2>
<p>Conway's appearances on <em>The Tonight Show</em> spanned the 1970s, 1980s, and into the 1990s. Even as television evolved into tighter, more produced soundbites, Conway remained a steadfast champion of authentic, old-school variety humor.</p>
`,
    category: 'vintage-moments',
    tags: ['Tim Conway', 'Johnny Carson', 'Vintage TV', 'The Tonight Show', 'Comedy Legend'],
    featuredImage: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Classic Television Broadcast Studio',
    author: {
      name: 'Editorial Staff',
      role: 'Staff Writer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      bio: 'Preserving and archiving the television legacy of Tim Conway.',
    },
    readTimeMinutes: 4,
    isFeatured: false,
    isTrending: false,
    viewsCount: 7800,
    likesCount: 620,
    publishedAt: '2026-09-25T14:00:00.000Z',
  },
  {
    id: 'art-7',
    title: 'The Comedic Genius of Tim Conway: Why His Unscripted Variety Show Sketches Will Live Forever',
    slug: 'comedic-genius-tim-conway-unscripted-variety-show-sketches',
    excerpt: 'How fearless physical comedy, impeccable timing, and spontaneous ad-libs made Tim Conway one of the most beloved comedic icons in the history of American television.',
    content: `
<h2>The Unmatched Artistry of Tim Conway</h2>
<p>During the golden age of American television variety shows, no performer commanded physical comedy quite like Tim Conway. Whether playing a doddering elderly man shuffling across a room, a bumbling dentist numbing his own limbs, or an eccentric small-business boss, Conway possessed a rare theatrical instinct that transcended traditional comedy writing.</p>

<p>Unlike modern scripted sitcoms that rely heavily on punchlines delivered by a room of writers, Conway’s humor was visual, kinetic, and profoundly human. He utilized his entire body — a slight twitch of the eyebrow, an accidental stumble, or a prolonged silence — to build moments of tension that exploded into genuine joy.</p>

<h2>The Legend of the Carol Burnett Stage</h2>
<p>Joining <em>The Carol Burnett Show</em> as a permanent cast member in 1975 after years of guest appearances, Conway elevated an already legendary ensemble into comedy royalty. His six Emmy Awards and Golden Globe honors stand as a testament to his transformative impact on prime-time entertainment.</p>

<blockquote>
  "Tim Conway proved that true comedy does not age. It doesn't rely on pop-culture references or cynical satire. It relies on the simple, joyous beauty of making human beings laugh until they cry."
</blockquote>
`,
    category: 'entertainment',
    tags: ['Tim Conway', 'Carol Burnett Show', 'Television History', 'Physical Comedy', 'Comedy Genius'],
    featuredImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Vintage Cinema and Television Production Camera',
    author: {
      name: 'Editorial Staff',
      role: 'Staff Writer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      bio: 'Preserving and archiving the television legacy of Tim Conway.',
    },
    readTimeMinutes: 5,
    isFeatured: true,
    isTrending: true,
    viewsCount: 10500,
    likesCount: 890,
    publishedAt: '2026-09-24T12:00:00.000Z',
  },
  {
    id: 'art-8',
    title: 'Behind the Curtain: How Tim Conway Turned Every Carol Burnett Rehearsal into a Trap for Harvey Korman',
    slug: 'behind-the-curtain-tim-conway-harvey-korman-rehearsal-pranks',
    excerpt: 'Tim Conway made it his personal mission to never tell Harvey Korman what he was going to do until the live studio audience was watching and the cameras were rolling.',
    content: `
<h2>The Unwritten Rule Between Two Comedic Legends</h2>
<p>For more than a decade, Tim Conway and Harvey Korman formed one of the most beloved comedic partnerships in show business history. But behind the scenes, their working relationship was governed by a playful game of comedic cat-and-mouse.</p>

<p>During weekday rehearsals for <em>The Carol Burnett Show</em>, Conway would run through the scripted lines plainly, doing just enough to establish camera blocking and timing. But director Dave Powers and producer Joe Hamilton knew that Conway was deliberately withholding his best material.</p>

<h2>The Final Taping Ambush</h2>
<p>When the Saturday night audience packed the studio and the cameras began rolling, Conway would completely unleash his improvisational genius. He would introduce absurd physical props, alter his vocal cadence, or invent entirely new jokes on the fly.</p>

<p>Korman, who prided himself on being a serious, classical actor, found Conway’s spontaneity irresistible. Despite his best efforts to bite his lip and stay in character, Korman would regularly collapse into tears of laughter, creating the most famous television outtakes of all time.</p>

<blockquote>
  "Harvey would beg Tim before the show: 'Please, Tim, don't do anything crazy tonight.' And Tim would just smile and say: 'Don't worry, Harvey.' That's when Harvey knew he was doomed."
</blockquote>
`,
    category: 'entertainment',
    tags: ['Tim Conway', 'Harvey Korman', 'Carol Burnett Show', 'Behind the Scenes', 'Comedic Chemistry'],
    featuredImage: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Vintage Theater Stage and Classic Entertainment',
    author: {
      name: 'Editorial Staff',
      role: 'Staff Writer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      bio: 'Preserving and archiving the television legacy of Tim Conway.',
    },
    readTimeMinutes: 4,
    isFeatured: false,
    isTrending: false,
    viewsCount: 8900,
    likesCount: 750,
    publishedAt: '2026-09-23T11:00:00.000Z',
  },
];
