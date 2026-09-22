export interface ArticleData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'movies' | 'tv-shows' | 'celebrities' | 'music' | 'gaming';
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
  publishedAt: string;
}

export const CATEGORIES = [
  { slug: 'movies', name: 'Movies', description: 'Hollywood blockbusters, indie cinema, box office analysis, and film reviews.' },
  { slug: 'tv-shows', name: 'TV & Streaming', description: 'Binge-worthy series, HBO & Netflix hits, episode recaps, and streaming news.' },
  { slug: 'celebrities', name: 'Celebrities', description: 'Red carpet fashion, exclusive interviews, pop culture moments, and Hollywood spotlights.' },
  { slug: 'music', name: 'Music', description: 'Billboard charts, album breakdowns, concert tours, and emerging artists.' },
  { slug: 'gaming', name: 'Gaming', description: 'AAA releases, next-gen consoles, esports tournaments, and gaming culture.' },
] as const;

export const MOCK_ARTICLES: ArticleData[] = [
  {
    id: 'art-1',
    title: "Inside Christopher Nolan's Next Sci-Fi Epic: What We Know About the Secret Universal Project",
    slug: 'inside-christopher-nolans-next-sci-fi-epic-hollywood-project',
    excerpt: "Following Oppenheimer's historic Oscars sweep, director Christopher Nolan is quietly assembling an A-list cast for his most ambitious cinematic spectacle yet.",
    content: `
<p>Following the massive critical and commercial triumph of <em>Oppenheimer</em>—which swept seven Academy Awards including Best Picture and Best Director—filmmaker Christopher Nolan has officially locked in his next highly guarded cinematic venture with Universal Pictures.</p>

<h2>The Mystery Surrounding the Script</h2>
<p>Industry insiders report that Nolan completed the screenplay earlier this spring under extreme confidentiality. Much like his previous projects such as <em>Inception</em>, <em>Interstellar</em>, and <em>Tenet</em>, only a select handful of top studio executives were permitted to read the physical script at Universal’s Century City headquarters.</p>

<p>While studio representatives have declined to comment on official loglines, preliminary casting reports confirm that Academy Award nominee Matt Damon is in advanced negotiations to headline the ensemble, marking his third collaboration with the British-American auteur.</p>

<blockquote>
  "Christopher Nolan remains one of the few directors in contemporary cinema whose name alone commands event-level theatrical turnout across North America and global markets."
</blockquote>

<h2>IMAX Innovation and 70mm Visual Ambitions</h2>
<p>Technological advancement has always been at the core of Nolan's visual language. Sources close to the production indicate that Nolan and longtime cinematographer Hoyte van Hoytema are working with IMAX engineers on custom-engineered camera rigs capable of filming in challenging physical environments previously deemed impossible for 70mm celluloid film.</p>

<p>With an anticipated summer release slated on the theatrical calendar, expectations are towering. The project represents a vital statement in defense of the traditional cinematic experience in an era dominated by rapid streaming cycles.</p>

<h2>What This Means for the 2026 Box Office</h2>
<p>Theater exhibitors across the United States are already positioning the untitled feature as a cornerstone release. After years of volatile box office returns, high-concept, auteur-driven original blockbusters have proven to be the most resilient driver of premium large-format ticket sales.</p>
    `,
    category: 'movies',
    tags: ['Christopher Nolan', 'Oppenheimer', 'Hollywood', 'IMAX', 'Box Office'],
    featuredImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Movie theater seats and cinema screen representing Hollywood blockbuster premiere',
    author: {
      name: 'Marcus Vance',
      role: 'Senior Film Critic & Industry Analyst',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Marcus Vance has covered the Hollywood film industry for over 12 years, contributing to Variety, The Hollywood Reporter, and Film Comment.',
      twitter: '@marcusvance_film',
    },
    readTimeMinutes: 6,
    isFeatured: true,
    isTrending: true,
    viewsCount: 24890,
    likesCount: 1420,
    publishedAt: '2026-09-20T10:30:00.000Z',
  },
  {
    id: 'art-2',
    title: 'The Bear Season 4 Exclusive: Cast Teases Culinary Chaos, High Stakes, and New Chicago Locations',
    slug: 'the-bear-season-4-exclusive-cast-teases-culinary-chaos',
    excerpt: 'Jeremy Allen White and Ayo Edebiri break down the emotional fallout of the Michelin-star push and what lies ahead in FX and Hulu’s smash hit drama.',
    content: `
<p>FX's <em>The Bear</em> has evolved from a sleeper summer sensation into an unstoppable cultural juggernaut, redefining modern television pacing with its kinetic depiction of professional kitchen intensity and interpersonal trauma.</p>

<h2>The Quest for Culinary Perfection</h2>
<p>Following a turbulent third season that explored the razor-thin margins of fine dining economics, the creative team led by showrunner Christopher Storer is taking the narrative into uncharted emotional territory. The pressure to maintain a prestigious Michelin star continues to strain the bond between Carmy (Jeremy Allen White) and Sydney (Ayo Edebiri).</p>

<p>"We're pushing the sensory boundaries of television," White shared during an exclusive roundtable in Chicago. "Every ticket that prints in that kitchen feels like a ticking clock, but Season 4 asks what happens when the clock finally strikes zero."</p>

<h2>Authentic Chicago Flavor and Guest Stars</h2>
<p>One of the show's greatest strengths has been its uncompromising love letter to Chicago's rich culinary ecosystem. Production insiders confirm that filming for the upcoming installment ventured into several historic neighborhoods on the city's South and Northwest sides, highlighting family-owned purveyors and legendary institutions.</p>

<p>Fans can also anticipate another roster of surprise guest appearances, building on the memorable cameos from past seasons that captivated social media audiences across the country.</p>
    `,
    category: 'tv-shows',
    tags: ['The Bear', 'FX', 'Hulu', 'Jeremy Allen White', 'Streaming'],
    featuredImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Professional chef preparing exquisite dishes in a fast-paced kitchen',
    author: {
      name: 'Elena Rostova',
      role: 'Television Editor',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      bio: 'Elena Rostova is a Los Angeles-based culture journalist covering prestige TV, streaming wars, and Emmy awards campaigns.',
      twitter: '@elena_tvguide',
    },
    readTimeMinutes: 5,
    isFeatured: false,
    isTrending: true,
    viewsCount: 18450,
    likesCount: 980,
    publishedAt: '2026-09-19T14:15:00.000Z',
  },
  {
    id: 'art-3',
    title: 'Met Gala Red Carpet Breakdown: The Most Talked-About Looks and Unforgettable Fashion Moments',
    slug: 'met-gala-red-carpet-breakdown-fashion-moments',
    excerpt: 'From vintage couture revivals to cutting-edge avant-garde statements, here are the celebrity outfits that dominated social media and set new trends.',
    content: `
<p>The steps of the Metropolitan Museum of Art once again served as fashion's most scrutinized runway as global superstars, designers, and cultural tastemakers converged for the annual Met Gala.</p>

<h2>A Masterclass in Thematic Interpretation</h2>
<p>This year’s dress code pushed attendees beyond conventional red carpet glamour into the realm of conceptual storytelling. Archival creations from iconic French and American ateliers were on full display, juxtaposed against futuristic silhouettes crafted from sustainable bio-fabrics.</p>

<p>Zendaya made an electrifying entrance, working alongside longtime architect of style Law Roach to deliver an ensemble that immediately sparked viral adoration across TikTok and X. The look paid homage to golden-age cinema while boldly subverting traditional silhouette boundaries.</p>

<h2>The Rise of Sustainable Haute Couture</h2>
<p>Perhaps the most significant cultural takeaway was the deliberate emphasis on upcycled materials and historic preservation. Several prominent figures opted to wear repurposed vintage pieces originally debuted decades ago, sending a clear message to the international fashion community about environmental accountability in luxury design.</p>
    `,
    category: 'celebrities',
    tags: ['Met Gala', 'Zendaya', 'Red Carpet', 'Fashion', 'Pop Culture'],
    featuredImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'High fashion runway event with elegant haute couture evening gowns',
    author: {
      name: 'Chloe Davenport',
      role: 'Style & Pop Culture Columnist',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      bio: 'Chloe Davenport reports on celebrity culture, Met Gala history, and luxury fashion trends from New York City.',
      twitter: '@chloedavenport_ny',
    },
    readTimeMinutes: 4,
    isFeatured: false,
    isTrending: true,
    viewsCount: 31200,
    likesCount: 2150,
    publishedAt: '2026-09-18T18:45:00.000Z',
  },
  {
    id: 'art-4',
    title: 'How Vinyl Records Beat Streaming in Physical Sales: The Unstoppable Renaissance of Analog Audio',
    slug: 'how-vinyl-records-beat-streaming-physical-sales-analog-renaissance',
    excerpt: 'Gen Z and millennial music fans are driving unprecedented vinyl sales across America, turning album artwork and tangible records into high-value cultural artifacts.',
    content: `
<p>In an era where millions of songs can be accessed instantly through algorithms and wireless earbuds, an unexpected counter-revolution has taken firm root: the vinyl LP is experiencing its largest commercial boom since the 1980s.</p>

<h2>Tangible Art in an Intangible Digital World</h2>
<p>According to the Recording Industry Association of America (RIAA), vinyl album revenues in the United States have consistently outpaced CD sales, driven largely by younger demographics seeking a deeper, tactile connection to their favorite musicians.</p>

<p>Megastars like Taylor Swift, Billie Eilish, and Kendrick Lamar have recognized this shift, curating elaborate vinyl editions complete with alternative cover art, collectible lyric booklets, and colored wax pressings that transform an album release into a bona fide collector's item.</p>

<blockquote>
  "Listening to a vinyl record requires intention. You don't skip tracks; you engage with the artist's sequence from start to finish."
</blockquote>

<h2>Independent Record Stores Thriving in US Metro Hubs</h2>
<p>From Nashville and Austin to Seattle and Brooklyn, independent record shops have transformed into thriving community centers. The annual Record Store Day continues to draw overnight lines of eager collectors, proving that physical music retail remains an enduring pillar of American musical heritage.</p>
    `,
    category: 'music',
    tags: ['Vinyl', 'RIAA', 'Taylor Swift', 'Music Industry', 'Streaming'],
    featuredImage: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Vintage vinyl record player spinning with retro audio equipment',
    author: {
      name: 'Devon Reed',
      role: 'Music Editor & Sound Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Devon Reed is an audio engineer and music writer whose work has appeared in Rolling Stone and Pitchfork.',
      twitter: '@devonreed_sound',
    },
    readTimeMinutes: 5,
    isFeatured: false,
    isTrending: false,
    viewsCount: 14200,
    likesCount: 890,
    publishedAt: '2026-09-17T11:20:00.000Z',
  },
  {
    id: 'art-5',
    title: 'Grand Theft Auto VI: Everything Rockstar Games Has Revealed About Vice City, Map Size, and Next-Gen Physics',
    slug: 'grand-theft-auto-vi-vice-city-map-size-next-gen-physics',
    excerpt: 'A comprehensive breakdown of all confirmed gameplay mechanics, dynamic weather systems, and the state-of-the-art physics engine powering the most anticipated game in history.',
    content: `
<p>Few entertainment events in history have matched the astronomical anticipation surrounding Rockstar Games' upcoming opus, <em>Grand Theft Auto VI</em>. With record-shattering trailer viewership that eclipsed hundred-million view milestones within hours, the title is positioned to redefine interactive entertainment.</p>

<h2>Returning to the Sun-Drenched Streets of Vice City</h2>
<p>Set in the fictional state of Leonida—Rockstar's neon-soaked satire of modern Florida—GTA VI introduces dual protagonists Lucia and Jason, exploring a contemporary criminal underworld deeply intertwined with social media culture, livestreaming, and digital celebrity.</p>

<p>Technical analyses of released footage indicate unprecedented crowd density, revolutionary volumetric cloud simulations, and interior building access that dramatically outstrips previous open-world benchmarks.</p>

<h2>Anticipated Impact on the US Video Game Economy</h2>
<p>Wall Street analysts project that Grand Theft Auto VI could generate over $1 billion in consumer spending within its first 24 hours of global launch, setting a new high-water mark for the entertainment industry at large.</p>
    `,
    category: 'gaming',
    tags: ['GTA 6', 'Rockstar Games', 'PlayStation 5', 'Xbox Series X', 'Gaming'],
    featuredImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Gamer holding controller with vibrant neon gaming setup',
    author: {
      name: 'Jordan Cruz',
      role: 'Gaming & Tech Editor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      bio: 'Jordan Cruz has spent 9 years evaluating gaming hardware, interactive storytelling, and esports culture across North America.',
      twitter: '@jordancruz_ign',
    },
    readTimeMinutes: 7,
    isFeatured: true,
    isTrending: true,
    viewsCount: 45900,
    likesCount: 3870,
    publishedAt: '2026-09-16T09:00:00.000Z',
  },
  {
    id: 'art-6',
    title: 'Dune Messiah: Denis Villeneuve Confirms Script Progress and Timeline for the Arrakis Trilogy Conclusion',
    slug: 'dune-messiah-denis-villeneuve-confirms-script-progress-timeline',
    excerpt: 'Following Dune: Part Two’s $714 million global box office haul, director Denis Villeneuve prepares to conclude Paul Atreides’ tragic journey with Frank Herbert’s seminal sequel.',
    content: `
<p>Following the seismic box office and critical conquest of <em>Dune: Part Two</em>—which accumulated over $714 million worldwide and solidified Denis Villeneuve as the premier sci-fi auteur of his generation—Warner Bros. and Legendary Entertainment have formally greenlit development on <em>Dune: Messiah</em>.</p>

<h2>Adapting Herbert’s Deconstruction of the Hero’s Journey</h2>
<p>Published in 1969, Frank Herbert’s second novel serves as a deliberate corrective to readers who misjudged Paul Atreides as a conventional messianic savior. Set 12 years after the events on Arrakis, <em>Messiah</em> explores the devastating consequences of religious fanaticism and galaxy-wide jihad.</p>

<p>"It was always my intention to complete the trilogy," Villeneuve affirmed in an interview in Montreal. "Frank Herbert wrote <em>Messiah</em> because he felt people misunderstood <em>Dune</em> as an uncomplicated celebration of Paul. The sequel is much darker, more philosophical, and emotionally devastating."</p>

<h2>Cast Returns and Production Schedule</h2>
<p>Timothée Chalamet and Zendaya are confirmed to reprise their roles as Paul Atreides and Chani, alongside Florence Pugh as Princess Irulan and Anya Taylor-Joy as Alia Atreides. Cinematographer Greig Fraser is expected to return to helm the visual composition, which will lean heavily into the brutalist palace architecture of Arrakeen.</p>
    `,
    category: 'movies',
    tags: ['Dune Messiah', 'Denis Villeneuve', 'Timothee Chalamet', 'Warner Bros', 'Box Office'],
    featuredImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Dramatic desert sand dunes representing the desolate surface of Arrakis in Dune',
    author: {
      name: 'Marcus Vance',
      role: 'Senior Film Critic & Industry Analyst',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Marcus Vance has covered the Hollywood film industry for over 12 years, contributing to Variety, The Hollywood Reporter, and Film Comment.',
      twitter: '@marcusvance_film',
    },
    readTimeMinutes: 5,
    isFeatured: true,
    isTrending: false,
    viewsCount: 22100,
    likesCount: 1680,
    publishedAt: '2026-09-15T14:20:00.000Z',
  },
  {
    id: 'art-7',
    title: 'The Last of Us Season 2: Everything We Know About Abby’s Casting, Vancouver Filming, and Game Changes',
    slug: 'the-last-of-us-season-2-abbys-casting-vancouver-filming',
    excerpt: 'Showrunners Craig Mazin and Neil Druckmann prepare to adapt Naughty Dog’s polarizing, critically lauded Part II with Kaitlyn Dever stepping into the role of Abby Anderson.',
    content: `
<p>HBO’s adaptation of <em>The Last of Us</em> proved that video game narratives can achieve prestige Emmy-winning stature when treated with emotional honesty and cinematic craft. Now, the production team faces its steepest narrative hurdle: adapting 2020’s <em>The Last of Us Part II</em>.</p>

<h2>Kaitlyn Dever Takes on the Crucial Role of Abby</h2>
<p>Perhaps no casting announcement in recent television history was met with greater anticipation than that of Abby Anderson. HBO confirmed that Golden Globe nominee Kaitlyn Dever (<em>Dopesick</em>, <em>Unbelievable</em>) will portray the hardened Washington Liberation Front soldier whose path collides violently with Joel (Pedro Pascal) and Ellie (Bella Ramsey).</p>

<p>Co-creator Craig Mazin noted that the emotional complexity of Part II requires multiple seasons: "The story of Part II is far too expansive, morally ambiguous, and layered to compress into eight or nine episodes. Audiences need time to understand both sides of this tragedy."</p>

<h2>Vancouver Becomes Post-Apocalyptic Seattle</h2>
<p>Principal photography across British Columbia has transformed urban Vancouver into the overgrown, flooded ruins of downtown Seattle. Early set photos showcase practical military checkpoints, decaying highway overpasses, and atmospheric rainforest encampments that mirror the game’s lush Pacific Northwest aesthetic.</p>
    `,
    category: 'tv-shows',
    tags: ['The Last of Us', 'HBO', 'Pedro Pascal', 'Bella Ramsey', 'Streaming'],
    featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Overgrown apocalyptic city skyline with abandoned structures and mist',
    author: {
      name: 'Elena Rostova',
      role: 'Television Editor',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      bio: 'Elena Rostova is a Los Angeles-based culture journalist covering prestige TV, streaming wars, and Emmy awards campaigns.',
      twitter: '@elena_tvguide',
    },
    readTimeMinutes: 6,
    isFeatured: false,
    isTrending: true,
    viewsCount: 29800,
    likesCount: 2430,
    publishedAt: '2026-09-14T08:15:00.000Z',
  },
  {
    id: 'art-8',
    title: 'Pedro Pascal’s Hollywood Ascendance: How the Internet’s Favorite Actor Built an Unstoppable Career',
    slug: 'pedro-pascals-hollywood-ascendance-career-deep-dive',
    excerpt: 'From humble beginnings on the New York stage to anchoring Star Wars, The Last of Us, and Marvel’s Fantastic Four, Pedro Pascal has become the undisputed leading man of his generation.',
    content: `
<p>In an era where traditional Hollywood star power is often overshadowed by intellectual property and superhero logos, Pedro Pascal represents a refreshing throwback: a charismatic, classically trained character actor whose warmth, vulnerability, and sheer range have made him universally adored across demographics.</p>

<h2>The Long Road to Overnight Stardom</h2>
<p>While many younger viewers first discovered Pascal through <em>The Mandalorian</em> or <em>The Last of Us</em>, his journey through the industry spanned more than two decades of regional theater, guest television appearances on procedural crime dramas, and persistent financial instability.</p>

<p>His breakthrough as Oberyn Martell in Season 4 of HBO’s <em>Game of Thrones</em> remains one of the most electric eight-episode runs in modern TV history. Pascal brought an irresistible swagger, intelligence, and tragic humanity to the Dornish prince that immediately caught the attention of top casting directors.</p>

<blockquote>
  "I spent so many years hoping to get an audition that when success finally arrived, I promised myself I would treat every collaborator with gratitude and every role with total dedication."
</blockquote>

<h2>From Joel Miller to Reed Richards</h2>
<p>With Marvel Studios selecting Pascal to portray Reed Richards (Mister Fantastic) in the upcoming <em>The Fantastic Four</em>, alongside starring roles in Ridley Scott’s <em>Gladiator II</em>, Pascal occupies the rarest echelon of contemporary Hollywood: an actor capable of carrying tentpole blockbusters while retaining indie auteur credibility.</p>
    `,
    category: 'celebrities',
    tags: ['Pedro Pascal', 'Hollywood', 'Game of Thrones', 'Marvel', 'Profiles'],
    featuredImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Portrait of charismatic male actor in studio lighting',
    author: {
      name: 'Chloe Davenport',
      role: 'Style & Pop Culture Columnist',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      bio: 'Chloe Davenport reports on celebrity culture, Met Gala history, and luxury fashion trends from New York City.',
      twitter: '@chloedavenport_ny',
    },
    readTimeMinutes: 5,
    isFeatured: false,
    isTrending: true,
    viewsCount: 38400,
    likesCount: 3120,
    publishedAt: '2026-09-13T12:00:00.000Z',
  },
  {
    id: 'art-9',
    title: 'Kendrick Lamar’s Super Bowl LIX Halftime Show: What to Expect from Hip-Hop’s Most Visionary Poet',
    slug: 'kendrick-lamar-super-bowl-lix-halftime-show-preview',
    excerpt: 'Following his record-breaking summer stadium run and seismic rap releases, Kendrick Lamar prepares to take center stage in New Orleans for the biggest television broadcast in America.',
    content: `
<p>When the NFL and Roc Nation announced that 17-time Grammy Award winner and Pulitzer Prize recipient Kendrick Lamar will headline the Apple Music Super Bowl LIX Halftime Show at the Caesars Superdome in New Orleans, the music industry unanimously recognized a defining cultural coronation.</p>

<h2>A Master of Theatrical Symbolism</h2>
<p>Unlike standard pop spectacles that rely purely on pyro and dance routines, Lamar’s live performances are celebrated as rigorous conceptual theater. From his historic 2016 Grammy performance confronting mass incarceration to the minimalist, therapy-themed staging of <em>The Big Steppers Tour</em>, Lamar consistently elevates live television into high art.</p>

<p>Industry choreographers report that Lamar’s team is preparing a setlist that traverses his seminal discography—from <em>Good Kid, M.A.A.D City</em> and <em>To Pimp a Butterfly</em> through his most recent chart-topping anthems that dominated the 2024–2025 cultural landscape.</p>

<h2>The Global Reach of the Super Bowl Stage</h2>
<p>With domestic viewership exceeding 120 million households, the Halftime Show remains the singular monocultural event in American entertainment. For Lamar, the performance provides an unprecedented global platform to showcase West Coast hip-hop heritage on television’s grandest stage.</p>
    `,
    category: 'music',
    tags: ['Kendrick Lamar', 'Super Bowl', 'NFL', 'Hip-Hop', 'Apple Music'],
    featuredImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Concert stage with dramatic stadium lighting and excited crowd',
    author: {
      name: 'Devon Reed',
      role: 'Music Editor & Sound Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Devon Reed is an audio engineer and music writer whose work has appeared in Rolling Stone and Pitchfork.',
      twitter: '@devonreed_sound',
    },
    readTimeMinutes: 5,
    isFeatured: true,
    isTrending: true,
    viewsCount: 42300,
    likesCount: 3950,
    publishedAt: '2026-09-12T16:30:00.000Z',
  },
  {
    id: 'art-10',
    title: 'Nintendo Switch 2 Leaks and Launch Lineup: Backward Compatibility, 4K DLSS, and Mario’s Next Adventure',
    slug: 'nintendo-switch-2-leaks-launch-lineup-backward-compatibility',
    excerpt: 'As Nintendo prepares to formally unveil the successor to its 140-million-selling hybrid console, supply chain leaks and developer sources reveal what gamers can expect.',
    content: `
<p>After seven historic years that saw the Nintendo Switch become the third best-selling video game system in history, the Kyoto-based gaming titan is preparing to transition to its next-generation hardware platform, unofficially dubbed the Switch 2.</p>

<h2>Custom NVIDIA Silicon and 4K DLSS Upscaling</h2>
<p>Reports from semiconductor supply chains in Taiwan confirm that the new console is powered by a custom NVIDIA Tegra processor featuring modern Ampere-architecture CUDA cores. This enables AI-driven DLSS (Deep Learning Super Sampling) when docked to a television, allowing the portable system to output crisp 4K imagery while maintaining energy efficiency.</p>

<p>Crucially for the existing 140 million Switch owners, Nintendo management has reiterated its dedication to account continuity and backward compatibility for both physical game cards and digital Nintendo eShop libraries.</p>

<h2>The Launch Slate: 3D Mario and Third-Party Support</h2>
<p>Sources close to Nintendo EPD indicate that the team behind <em>Super Mario Odyssey</em> has been developing a brand-new open-world 3D platformer designed to showcase the new system's graphical horsepower from day one, accompanied by enhanced ports of recent third-party blockbusters.</p>
    `,
    category: 'gaming',
    tags: ['Nintendo', 'Switch 2', 'NVIDIA', 'Mario', 'Gaming'],
    featuredImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Portable gaming console with colorful joycons and retro gaming gear',
    author: {
      name: 'Jordan Cruz',
      role: 'Gaming & Tech Editor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      bio: 'Jordan Cruz has spent 9 years evaluating gaming hardware, interactive storytelling, and esports culture across North America.',
      twitter: '@jordancruz_ign',
    },
    readTimeMinutes: 6,
    isFeatured: false,
    isTrending: true,
    viewsCount: 36700,
    likesCount: 2890,
    publishedAt: '2026-09-11T10:00:00.000Z',
  },
  {
    id: 'art-11',
    title: 'Severance Season 2 Mystery Deepens: Mark Scout’s Lumon Resistance and New Cast Additions',
    slug: 'severance-season-2-mystery-lumon-resistance-new-cast',
    excerpt: 'Ben Stiller and Dan Erickson return to Apple TV+ with the long-awaited sophomore season of the mind-bending workplace thriller that captured American television discourse.',
    content: `
<p>Few season finales in recent television history left audiences reeling quite like the climactic Season 1 cliffhanger of Apple TV+’s <em>Severance</em>. The image of Helly R. (Britt Lower) screaming the truth into a microphone while Mark (Adam Scott) shouted "She’s alive!" became an instant cultural sensation.</p>

<h2>The High-Stakes Aftermath of the Overtime Protocol</h2>
<p>Season 2 picks up immediately in the volatile aftermath of the Macrodata Refinement team’s daring escape attempt. Showrunner Dan Erickson has promised that while the new episodes answer longstanding questions about what Lumon Industries truly manufactures, they open even stranger philosophical dilemmas.</p>

<p>"We didn't want to play it safe," director and executive producer Ben Stiller noted. "The beauty of <em>Severance</em> is that the mystery isn't just about puzzle boxes; it's about grief, identity, and the horrifying ways modern corporations attempt to sanitize human connection."</p>

<h2>Exciting Cast Additions</h2>
<p>The stellar returning ensemble—including Patricia Arquette, John Turturro, Christopher Walken, and Tramell Tillman—is joined by prestigious newcomers Gwendoline Christie (<em>Game of Thrones</em>), Bob Balaban, and Alia Shawkat, adding further prestige to one of television’s finest casts.</p>
    `,
    category: 'tv-shows',
    tags: ['Severance', 'Apple TV+', 'Adam Scott', 'Ben Stiller', 'TV Shows'],
    featuredImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Minimalist corporate office corridor with eerie fluorescent lighting',
    author: {
      name: 'Elena Rostova',
      role: 'Television Editor',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      bio: 'Elena Rostova is a Los Angeles-based culture journalist covering prestige TV, streaming wars, and Emmy awards campaigns.',
      twitter: '@elena_tvguide',
    },
    readTimeMinutes: 5,
    isFeatured: false,
    isTrending: false,
    viewsCount: 19500,
    likesCount: 1340,
    publishedAt: '2026-09-10T15:45:00.000Z',
  },
  {
    id: 'art-12',
    title: 'A24 at the Crossroads: How the Indie Cinema Darling is Balancing Blockbusters with Art-House Vision',
    slug: 'a24-at-crossroads-indie-darling-blockbusters-art-house',
    excerpt: 'From Everything Everywhere All at Once to Civil War, independent distributor A24 is expanding into $50M+ productions while fiercely guarding its rebel brand identity.',
    content: `
<p>For over a decade, the A24 logo before a movie was the ultimate badge of indie cool: an assurance of auteur freedom, striking cinematography, unconventional narratives, and feverish millennial fandom. But as the theatrical landscape shifts, the Manhattan-based studio is undergoing its most radical transformation yet.</p>

<h2>The Shift Toward Commercial Scale</h2>
<p>Following the massive Oscar sweep of <em>Everything Everywhere All at Once</em> and the commercial success of Alex Garland's $50 million dystopian epic <em>Civil War</em>, A24 has demonstrated that it is no longer content to remain a boutique distributor catering solely to art-house cinemas in New York and Los Angeles.</p>

<p>The studio is now aggressively acquiring high-concept genre screenplays and developing larger-budget action and sci-fi features capable of competing directly against traditional Hollywood legacy studios.</p>

<blockquote>
  "The challenge for A24 is maintaining that elusive aura of auteur independence while managing productions with ten times the financial risk of their early hits."
</blockquote>

<h2>Protecting the Creative Core</h2>
<p>Despite this commercial expansion, company executives insist that the studio’s foundational ethos remains unchanged. Projects from visionary international directors and boundary-pushing first-time filmmakers remain the beating heart of their slate, ensuring that A24 continues to discover the most exciting voices in world cinema.</p>
    `,
    category: 'movies',
    tags: ['A24', 'Indie Film', 'Civil War', 'Oscars', 'Box Office'],
    featuredImage: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Cinematic film reel projector beam in darkened theater',
    author: {
      name: 'Marcus Vance',
      role: 'Senior Film Critic & Industry Analyst',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Marcus Vance has covered the Hollywood film industry for over 12 years, contributing to Variety, The Hollywood Reporter, and Film Comment.',
      twitter: '@marcusvance_film',
    },
    readTimeMinutes: 6,
    isFeatured: false,
    isTrending: false,
    viewsCount: 16800,
    likesCount: 1190,
    publishedAt: '2026-09-09T11:15:00.000Z',
  }
];
