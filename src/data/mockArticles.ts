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
  { slug: 'comedy', name: 'Comedy Classics', description: 'Timeless comedy sketches, Tonight Show appearances, and legendary Tim Conway performances.' },
  { slug: 'vintage-moments', name: 'Vintage Moments', description: 'Unforgettable vintage television milestones, live ad-libs, and timeless variety show humor.' },
  { slug: 'entertainment', name: 'Entertainment', description: 'Hollywood retrospectives, comedic legends, and classic variety television lore.' },
] as const;

export const MOCK_ARTICLES: ArticleData[] = [
  {
    id: 'art-1',
    title: 'Tim Conway and the Elephant Story: The Legendary Outtake That Made the Cast of The Carol Burnett Show Break Character',
    slug: 'tim-conway-elephant-story-carol-burnett-show',
    excerpt: 'Discover the hilarious Tim Conway Elephant Story, the legendary Carol Burnett Show outtake that left Carol Burnett, Vicki Lawrence and the cast struggling to keep a straight face.',
    content: `
<h2>The Elephant Story: A Masterpiece of Spontaneous Television</h2>
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
      bio: 'Archiving classic television comedy and variety sketches.',
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
<h2>The Bank Robber Was Ready for a Showdown… Then the Sheriff Walked In</h2>
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
      bio: 'Archiving classic television comedy and variety sketches.',
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
<h2>What Happens When Your Dentist Needs a Textbook to Pull a Tooth?</h2>
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
      bio: 'Archiving classic television comedy and variety sketches.',
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
    title: 'When Johnny Carson Couldn\'t Stop Laughing: The Classic Copper Clapper Caper',
    slug: 'when-johnny-carson-couldnt-stop-laughing-copper-clapper-caper',
    excerpt: 'Jack Webb and Johnny Carson delivered one of the fastest, most tongue-twisting deadpan sketches in late-night history with the iconic Copper Clapper Caper.',
    content: `
<h2>The Most Rapid-Fire Tongue Twister in Television History</h2>
<p>On August 27, 1968, Jack Webb appeared on <em>The Tonight Show Starring Johnny Carson</em> in full character as Joe Friday from <em>Dragnet</em>. What followed was a masterclass in deadpan comedic delivery that left Carson clutching his sides and struggling for breath.</p>

<p>The premise was delightfully absurd: Officer Friday and his partner are investigating a string of thefts involving a kleptomaniac who copped clean copper clappers from Claude Cooper’s closet. As Webb delivered line after line of alliterative tongue-twisters at machine-gun speed without batting an eye, Johnny Carson could barely keep from cracking up.</p>

<h2>The Genius of Deadpan Contrast</h2>
<p>Unlike slapstick comedy that relies on broad physical gestures, the Copper Clapper Caper succeeded because of its relentless seriousness. Webb never broke character for a fraction of a second, treating every ridiculous sentence as a matter of urgent criminal importance.</p>

<p>Every time Carson tried to ask a follow-up question, Webb doubled down with even more complex phonetic gymnastics until both men and the studio audience were laughing uncontrollably.</p>

<blockquote>
  "It was five minutes of pure perfection. You couldn't write that rhythm if you tried for months — it was two masters of live television operating at their absolute peak."
</blockquote>
`,
    category: 'vintage-moments',
    tags: ['Johnny Carson', 'Jack Webb', 'Dragnet', 'Tonight Show', 'Vintage TV'],
    featuredImage: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Classic TV Studio Camera and Production',
    author: {
      name: 'Editorial Staff',
      role: 'Staff Writer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      bio: 'Archiving classic television comedy and variety sketches.',
    },
    readTimeMinutes: 4,
    isFeatured: true,
    isTrending: true,
    viewsCount: 9400,
    likesCount: 710,
    publishedAt: '2026-09-26T15:00:00.000Z',
  },
  {
    id: 'art-5',
    title: 'Dean Martin and Don Rickles on The Tonight Show: The Roasting That Broke Television Rules',
    slug: 'dean-martin-and-don-rickles-the-tonight-show-roast',
    excerpt: 'When Don Rickles surprised Johnny Carson and Dean Martin wandered onto the set with a cigarette, late-night television became completely unscripted chaos.',
    content: `
<h2>When Hollywood Royalty Took Over Late Night</h2>
<p>In the 1970s, late-night television was unpredictable in a way that modern productions rarely dare to be. Nowhere was that more evident than the famous night Don Rickles and Dean Martin crashed Johnny Carson's desk unannounced.</p>

<p>Dean Martin, holding his signature glass, casually strode across the NBC stage, casually kissed Carson, and invited himself to sit down. Moments later, Don Rickles sprang out of the wings, launching into a rapid-fire barrage of insults aimed squarely at Martin, Carson, and bandleader Doc Severinsen.</p>

<h2>No Rehearsals, No Script, Pure Chemistry</h2>
<p>The segment was entirely spontaneous. Neither Carson's writers nor the control booth knew what was about to happen next. What made the moment historic was the genuine warmth beneath the insults. Carson was reduced to helpless laughter, burying his face in his desk as Martin and Rickles volleyed one-liners back and forth.</p>

<blockquote>
  "Television today is micro-managed down to the millisecond. That night with Dean and Don was pure jazz — three friends having the time of their lives on live TV."
</blockquote>
`,
    category: 'vintage-moments',
    tags: ['Dean Martin', 'Don Rickles', 'Johnny Carson', 'Late Night TV', 'Classic Roasts'],
    featuredImage: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Vintage Television Variety Show Atmosphere',
    author: {
      name: 'Editorial Staff',
      role: 'Staff Writer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      bio: 'Archiving classic television comedy and variety sketches.',
    },
    readTimeMinutes: 4,
    isFeatured: false,
    isTrending: false,
    viewsCount: 7800,
    likesCount: 620,
    publishedAt: '2026-09-25T14:00:00.000Z',
  },
  {
    id: 'art-6',
    title: 'The Golden Age of Variety Television: Why Sketches from the 70s Still Outshine Modern TV',
    slug: 'golden-age-of-variety-television-why-70s-sketches-outshine-modern-tv',
    excerpt: 'How fearless physical comedians, live studio audiences, and spontaneous ad-libs created an era of entertainment that today\'s scripted comedy cannot replicate.',
    content: `
<h2>The Lost Art of Prime-Time Variety Entertainment</h2>
<p>During the 1960s and 1970s, the variety show was the crown jewel of American television network programming. Families gathered every week to watch programs like <em>The Carol Burnett Show</em>, <em>The Flip Wilson Show</em>, and <em>Rowan & Martin’s Laugh-In</em>.</p>

<p>Unlike today's single-camera sitcoms or heavily edited digital sketches, variety comedy was rooted in vaudeville and live theater. Performers had to deliver long, continuous physical comedy routines before a live theater audience without the benefit of second takes or digital touch-ups.</p>

<h2>The Power of Breaking Character</h2>
<p>In modern television, an actor breaking character is an outtake relegated to a DVD bonus feature or TikTok reel. In the 1970s variety format, corpsing — when an actor couldn't hold back genuine laughter — was an essential part of the broadcast charm.</p>

<p>Viewers felt like co-conspirators in the prank. When Tim Conway made Harvey Korman laugh until he cried, millions of Americans were sharing the exact same visceral joy in their living rooms.</p>

<blockquote>
  "Variety television was electric because the audience knew anything could happen. It was high-wire entertainment performed by absolute virtuosos."
</blockquote>
`,
    category: 'entertainment',
    tags: ['Variety Shows', 'Television History', 'Carol Burnett', '70s Comedy', 'Entertainment Lore'],
    featuredImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Classic Film and Television Production Camera',
    author: {
      name: 'Editorial Staff',
      role: 'Staff Writer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      bio: 'Archiving classic television comedy and variety sketches.',
    },
    readTimeMinutes: 5,
    isFeatured: true,
    isTrending: true,
    viewsCount: 10500,
    likesCount: 890,
    publishedAt: '2026-09-24T12:00:00.000Z',
  },
  {
    id: 'art-7',
    title: 'Behind the Curtain: How Tim Conway and Harvey Korman Turned Rehearsals into Pranks',
    slug: 'behind-the-curtain-tim-conway-harvey-korman-rehearsal-pranks',
    excerpt: 'Tim Conway made it his personal mission to never tell Harvey Korman what he was going to do until the live studio audience was watching.',
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
      bio: 'Archiving classic television comedy and variety sketches.',
    },
    readTimeMinutes: 4,
    isFeatured: false,
    isTrending: false,
    viewsCount: 8900,
    likesCount: 750,
    publishedAt: '2026-09-23T11:00:00.000Z',
  },
];
