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
    title: 'Tim Conway Had Johnny Carson Crying With Laughter — The Tonight Show Moments You Have to See',
    slug: 'tim-conway-had-johnny-carson-crying-with-laughter-the-tonight-show-moments-you-have-to-see',
    excerpt: 'Tim Conway had a secret weapon: he could make Johnny Carson break character and weep with uncontrollable laughter on live television without ever rushing a punchline.',
    content: `
<h2>Tim Conway Had a Secret Weapon: He Could Make Johnny Carson Break Character</h2>
<p>There are comedy moments that are carefully written, rehearsed, and performed exactly as planned. And then there are moments when something seems to happen almost by accident — when a comedian says one unexpected line, takes a joke just a little too far, or simply looks at another person and suddenly everyone in the room starts laughing.</p>

<p>That was Tim Conway.</p>

<p>During his appearances on <em>The Tonight Show Starring Johnny Carson</em>, Conway repeatedly demonstrated an unusual ability to turn ordinary conversation into complete comedic chaos. His humor did not always depend on a complicated setup. Sometimes, it was simply the way he delivered a sentence. Sometimes, it was an absurd story. And sometimes, it was Johnny Carson himself trying desperately not to laugh.</p>

<div class="video-container my-6">
  <iframe src="https://www.youtube.com/embed/oJEp9XI_daE?si=aahkNCt6wG6afQzc" width="100%" height="450" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<p>The result was a collection of television moments that still feel remarkably spontaneous decades later. The video above brings together some of Tim Conway’s funniest appearances on <em>The Tonight Show</em>, including several moments that show exactly why his comedic timing was so legendary.</p>

<h2>The First Appearance Was Already Hilarious</h2>
<p>One of the most fascinating moments comes from Conway’s first appearance on Johnny Carson’s show. Carson points out that Conway has never been on the program before. Conway agrees. But instead of treating the moment like a conventional celebrity interview, he immediately begins playing with the awkwardness of the situation.</p>

<p>The conversation becomes funny because neither man seems interested in following the traditional rhythm of a talk-show interview. Carson asks questions. Conway answers. Then Conway adds another unexpected detail. And suddenly, the audience is laughing. There is a natural quality to the exchange that makes it feel less like a formal television interview and more like two comedians discovering the joke together.</p>

<blockquote>
  "That was Tim’s secret weapon. He never played to the joke; he played to the awkwardness between human beings, and that broke Johnny every single time."
</blockquote>

<h2>Then Tim Conway Discovered Something Even Funnier: Commercial Breaks</h2>
<p>One of the funniest early moments involves Carson explaining that the show occasionally has to stop for a commercial break. To most guests, a commercial break is simply a brief pause where you adjust your tie or sip water. To Tim Conway, it was an opportunity to turn live television into a playground.</p>

<p>He would begin telling an elaborate, seemingly serious story about his youth or an eccentric relative, dragging the narrative out with excruciating precision right up until the commercial cue music began playing. As Carson signaled frantically to wrap up, Conway would deadpan with an entirely absurd punchline that left Carson with his head resting on the desk, tears running down his cheeks.</p>

<h2>The Genius of conversational Chemistry</h2>
<p>The timeless appeal of these classic television clips lies in their authenticity. In an era before rehearsed soundbites and hyper-edited segments, Conway and Carson operated purely on comedic intuition. Conway understood that the funniest part of a joke is often the silence right before the punchline, and Carson was the world's most generous straight man.</p>

<p>Decades later, these clips remain a masterclass for any student of comedy and a heartwarming reminder of television's golden age of late-night variety.</p>
`,
    category: 'comedy',
    tags: ['Tim Conway', 'Johnny Carson', 'The Tonight Show', 'Classic TV', 'Vintage Comedy'],
    featuredImage: 'https://blog.igallery.blog/assets/0eb9b6868621dc5e84e8676418377613/2026/0928/f72d7b9c-8f7d-47b0-b179-9025fc4bbad1-b1b0e2e8-98a8-4c6a-89c8-5a348d703b95.png',
    featuredImageAlt: 'Tim Conway on The Tonight Show Starring Johnny Carson',
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

<h2>A Masterpiece of Slapstick Pacing</h2>
<p>Modern comedy often prioritizes rapid-fire one-liners, but Conway understood that comedy is fundamentally about anticipation and rhythm. By stretching an ordinary action to an impossible extreme, he turned a simple premise into an immortal piece of American television history.</p>
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

<h2>The Unrehearsed Magic of Live Variety TV</h2>
<p>During table reads and rehearsals, Conway had performed the sketch in a relatively understated manner. He never told Korman that he intended to inject his own leg during the live taping. When Conway suddenly collapsed into a heap of numb limbs, Korman had zero preparation.</p>

<p>The result was pure, unadulterated comedic joy. The Dental Sketch remains a testament to the lightning-in-a-bottle chemistry between Tim Conway and Harvey Korman, standing as a high-water mark of physical comedy that continues to captivate millions of new viewers across digital platforms today.</p>
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
];
