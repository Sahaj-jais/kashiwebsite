// ============================================================
// Shared data & types for the Kashi platform
// ============================================================

// ---------- Unexplored Kashi categories ----------
export interface UnexploredPlace {
  slug: string;
  category: string;
  categorySlug: string;
  title: string;
  image: string;
  intro: string;
  whyUnexplored: string;
  culturalImportance: string;
  fullStory: string;
  relatedGuideIds: string[];
}

export const unexploredCategories = [
  { slug: "hidden-places", label: "Hidden Places", icon: "temple" },
  { slug: "forgotten-temples", label: "Forgotten Temples", icon: "shrine" },
  { slug: "local-food", label: "Local Food Spots", icon: "food" },
  { slug: "rituals", label: "Rituals & Traditions", icon: "fire" },
  { slug: "artisans", label: "Artisan Communities", icon: "craft" },
  { slug: "secret-ghats", label: "Secret Ghats", icon: "water" },
  { slug: "old-stories", label: "Old Banaras Stories", icon: "book" },
] as const;

export const unexploredPlaces: UnexploredPlace[] = [
  {
    slug: "underground-shivling-pita-maheshwar",
    category: "Hidden Places",
    categorySlug: "hidden-places",
    title: "The Underground Shivling of Pita Maheshwar",
    image: "/images/hidden-temple.jpg",
    intro:
      "Beneath the bustling streets of central Kashi lies one of its most sacred and least-visited shrines, an underground chamber that predates the current city by over a thousand years.",
    whyUnexplored:
      "Hidden behind an unremarkable wooden door in a narrow lane, with no signage or tourist infrastructure. Barely a dozen visitors per day.",
    culturalImportance:
      "Houses a naturally occurring Shivling believed to have been installed by Lord Shiva himself. The chamber carries over a millennium of unbroken devotion.",
    fullStory:
      "The Pita Maheshwar Shivling sits in an underground chamber accessible only through a narrow stone staircase hidden behind an unremarkable wooden door. The chamber, believed to predate the current city by over a thousand years, houses a naturally occurring Shivling that devotees believe was installed by Lord Shiva himself. The air inside is cool and still, carrying the faint scent of centuries of offerings. Local priests say that at certain times of the year, the stone seems to glow with an inner light. Unlike the crowded temples above ground, this shrine sees barely a dozen visitors a day, preserving an atmosphere of profound solitude and devotion.",
    relatedGuideIds: ["guide-1", "guide-3"],
  },
  {
    slug: "meer-ghat-sufi-steps",
    category: "Secret Ghats",
    categorySlug: "secret-ghats",
    title: "The Forgotten Steps of Meer Ghat",
    image: "/images/secret-ghat.jpg",
    intro:
      "While millions flock to Dashashwamedh, Meer Ghat sits in contemplative silence, its ancient stones holding secrets of medieval Sufi saints and syncretic spirituality.",
    whyUnexplored:
      "Overshadowed by the famous Dashashwamedh Ghat, with no evening aarti ceremony to draw crowds. The Sufi heritage is almost forgotten.",
    culturalImportance:
      "Features exquisite Mughal-era carvings and a shrine blending Hindu and Islamic architecture, testifying to Kashi's syncretic soul.",
    fullStory:
      "Meer Ghat is named after a Sufi saint whose memory has almost faded from public consciousness. The ghat features exquisite Mughal-era carvings and a small shrine that blends Hindu and Islamic architectural elements, a testament to Kashi's syncretic soul. At dawn, local wrestlers practice their ancient art at an akhara nearby, maintaining a tradition that predates the British arrival by centuries. The steps themselves bear inscriptions in Persian and Sanskrit, side by side, from an era when the two traditions found common ground in Kashi's embrace.",
    relatedGuideIds: ["guide-1", "guide-4"],
  },
  {
    slug: "bengali-tola-scholars-quarter",
    category: "Hidden Places",
    categorySlug: "hidden-places",
    title: "Bengali Tola & The Scholar's Quarter",
    image: "/images/forgotten-alley.jpg",
    intro:
      "A labyrinth of lanes so narrow that sunlight barely touches the ground, hiding Sanskrit schools that have operated uninterrupted for over 500 years.",
    whyUnexplored:
      "The pathshalas (traditional schools) never advertise. You must know someone to gain access. The lanes are too narrow for tourist groups.",
    culturalImportance:
      "Students still learn the Vedas through oral transmission exactly as their ancestors did thousands of years ago, preserving humanity's oldest continuous educational tradition.",
    fullStory:
      "Bengali Tola was historically the quarter where Bengali scholars, musicians, and intellectuals settled, drawn by Kashi's magnetic spiritual energy. The lanes are lined with ancient buildings whose walls are carved with Sanskrit verses. Hidden behind unassuming doors are pathshalas where students still learn the Vedas through oral transmission, exactly as their ancestors did thousands of years ago. The area also houses some of the finest classical musicians in India, who perform in intimate gatherings that no ticket can buy.",
    relatedGuideIds: ["guide-1", "guide-4"],
  },
  {
    slug: "aghori-way-of-death",
    category: "Rituals & Traditions",
    categorySlug: "rituals",
    title: "The Aghori Way of Death",
    image: "/images/sadhu.jpg",
    intro:
      "At the burning ghats, Aghori sadhus practice ancient Tantric traditions that challenge every boundary between sacred and profane, life and death.",
    whyUnexplored:
      "Deep taboo surrounds their practices. Most visitors are afraid to approach. The Aghoris themselves prefer solitude and rarely interact with outsiders.",
    culturalImportance:
      "Represents one of the oldest and most misunderstood spiritual paths in Hinduism, rooted in the philosophy that nothing in creation is impure.",
    fullStory:
      "The Aghoris are perhaps the most misunderstood spiritual practitioners in India. Their practices, which include meditating on cremation grounds, smearing themselves with ash from funeral pyres, and using human skulls as ritual vessels, are rooted in a profound philosophy: that nothing in creation is impure, and that confronting death directly is the fastest path to liberation. In Kashi, they find their spiritual home at Manikarnika Ghat, where the cremation fires have not been extinguished for thousands of years. Their midnight rituals, performed in complete silence, are among the most powerful spiritual experiences Kashi offers.",
    relatedGuideIds: ["guide-3"],
  },
  {
    slug: "midnight-aarti-manikarnika",
    category: "Rituals & Traditions",
    categorySlug: "rituals",
    title: "The Midnight Aarti at Manikarnika",
    image: "/images/midnight-aarti.jpg",
    intro:
      "When the city sleeps, a different Kashi awakens. The midnight ceremonies at the burning ghat reveal the city's deepest, most intimate spiritual layer.",
    whyUnexplored:
      "Requires staying awake past midnight and walking through dark lanes. No tourist infrastructure exists for this. Most guides refuse nighttime trips.",
    culturalImportance:
      "These ceremonies have been performed without interruption for over 3,500 years, making them possibly the oldest continuous ritual practice on Earth.",
    fullStory:
      "While the famous Ganga Aarti at Dashashwamedh Ghat draws tourists by the thousands, the true spiritual heart of Kashi beats at midnight at Manikarnika. Here, in the glow of eternal cremation fires, priests perform rituals that date back to before recorded history. The atmosphere is not of mourning but of celebration: each soul released is considered to have achieved the ultimate liberation. The sound of mantras, the crackle of sacred fires, and the timeless flow of the Ganga create an experience that transcends the ordinary.",
    relatedGuideIds: ["guide-3", "guide-1"],
  },
  {
    slug: "banarasi-weaving-traditions",
    category: "Artisan Communities",
    categorySlug: "artisans",
    title: "Banarasi Weaving Traditions",
    image: "/images/weaving.jpg",
    intro:
      "In dark rooms across the city, master weavers create silk masterpieces using techniques passed down through 40 generations, each saree taking months to complete.",
    whyUnexplored:
      "Workshops are hidden in residential neighborhoods. Machine-made imitations dominate markets, making it hard to find authentic hand-weaving. Fewer than 100 master weavers remain.",
    culturalImportance:
      "The Banarasi saree embodies over 2,000 years of artistic evolution, blending Mughal, Hindu, and Persian design traditions into a living art form.",
    fullStory:
      "The Banarasi saree is not just a textile, it is a living art form that embodies over 2,000 years of artistic evolution. Master weavers, many from Muslim families who have practiced this craft since the Mughal era, create intricate patterns using real gold and silver thread (zari). A single saree can take up to six months to complete. The patterns include motifs drawn from Mughal architecture, Hindu mythology, and Persian art, reflecting Kashi's cultural confluence. Today, fewer than 100 master weavers remain who can create the most complex traditional designs.",
    relatedGuideIds: ["guide-2", "guide-4"],
  },
  {
    slug: "kachori-gali-food-trail",
    category: "Local Food Spots",
    categorySlug: "local-food",
    title: "The Legendary Kachori Gali",
    image: "/images/local-food.jpg",
    intro:
      "A narrow lane that has served the same recipes for over a hundred years, where every bite carries the taste of old Banaras and generations of culinary devotion.",
    whyUnexplored:
      "No signboards, no Google listings, no social media presence. The families who run these stalls have never needed to advertise. You must know where to go.",
    culturalImportance:
      "Preserves culinary traditions that date back centuries, with recipes passed orally through generations. Each stall represents a living food heritage.",
    fullStory:
      "Kachori Gali is not on any tourist map, yet it represents the purest expression of Banarasi cuisine. The lane is barely wide enough for two people, lined with stalls that have occupied the same spots for generations. The kachoris are made fresh before dawn, the same way they were made a century ago. The tamatar chutney uses a recipe that the family patriarch will share with no one outside the bloodline. Alongside the kachoris, you'll find laal peda that melts on your tongue, thandai made with real bhang during festivals, and the famous Banarasi paan that ends every meal. Eating here is not just sustenance; it is communion with the city's soul.",
    relatedGuideIds: ["guide-2"],
  },
  {
    slug: "ramnagar-fort-mysteries",
    category: "Old Banaras Stories",
    categorySlug: "old-stories",
    title: "Mysteries of Ramnagar Fort",
    image: "/images/ancient-arch.jpg",
    intro:
      "The crumbling seat of the Maharaja of Kashi hides rare astronomical clocks, vintage cars, and an armory spanning centuries within its forgotten museum.",
    whyUnexplored:
      "Located across the river from the main ghats, most tourists skip it. The museum has no digital catalog and many rooms remain locked to the public.",
    culturalImportance:
      "Seat of the Kashi Naresh dynasty, preserving royal heritage and hosting the annual Ramlila that has been performed for over 200 years, now a UNESCO-recognized event.",
    fullStory:
      "Ramnagar Fort stands on the eastern bank of the Ganges, a world away from the tourist-heavy western bank. Built in the 18th century by Maharaja Balwant Singh, it served as the seat of the Kashi Naresh dynasty. Inside its sandstone walls lies a museum that would be world-famous if it were anywhere else: rare astronomical clocks built by the Maharaja himself, vintage cars from the colonial era, an armory with weapons spanning 500 years, and a collection of palanquins and royal regalia. The fort also hosts the annual Ramlila, a month-long theatrical performance of the Ramayana that has been performed continuously for over 200 years and is now recognized by UNESCO.",
    relatedGuideIds: ["guide-1", "guide-4"],
  },
  {
    slug: "sacred-well-jnana-vapi",
    category: "Forgotten Temples",
    categorySlug: "forgotten-temples",
    title: "The Original Well of Jnana Vapi",
    image: "/images/rituals.jpg",
    intro:
      "Few know about the smaller, older well located three lanes away from the famous Jnana Vapi, surrounded by ancient carvings that blur Hindu and Buddhist iconography.",
    whyUnexplored:
      "Overshadowed by the politically charged famous well. The caretaker is elderly and rarely opens the site. No signage exists.",
    culturalImportance:
      "Local tradition holds this was the original sacred well before the famous one was constructed, with carvings suggesting religious harmony spanning over 800 years.",
    fullStory:
      "While the Jnana Vapi (Well of Knowledge) has become politically charged in recent years, few know about this smaller, older well located three lanes away. Local tradition holds it was the original sacred well before the famous one was constructed. The well is surrounded by ancient stone carvings that blur the line between Hindu and Buddhist iconography, suggesting an era of religious harmony now largely forgotten. An elderly caretaker, who can recite the well's history going back 800 years from memory, tends to it daily. The water is still considered sacred by local families who perform quiet rituals here, away from public attention and political controversy.",
    relatedGuideIds: ["guide-3", "guide-1"],
  },
];

// ---------- Local Guides ----------
export interface Guide {
  id: string;
  name: string;
  image: string;
  intro: string;
  specializations: string[];
  languages: string[];
  experience: string;
  pricing: { label: string; price: number }[];
  availability: string;
  rating: number;
  reviewCount: number;
  reviews: { name: string; text: string; rating: number; date: string }[];
}

export const guides: Guide[] = [
  {
    id: "guide-1",
    name: "Rajesh Sharma",
    image: "/images/guide-1.jpg",
    intro:
      "Born and raised in the lanes of Kashi, Rajesh has spent 18 years uncovering the hidden heritage of Varanasi. His heritage walks reveal temples, shrines, and stories that no guidebook contains.",
    specializations: ["Heritage Walks", "Hidden Temples", "Architecture Tours"],
    languages: ["Hindi", "English", "Sanskrit"],
    experience: "18 years",
    pricing: [
      { label: "Half-Day Heritage Walk (4 hrs)", price: 1500 },
      { label: "Full-Day Deep Exploration (8 hrs)", price: 2800 },
      { label: "Multi-Day Immersion (per day)", price: 2500 },
    ],
    availability: "Monday - Saturday, 5:00 AM - 8:00 PM",
    rating: 4.9,
    reviewCount: 142,
    reviews: [
      {
        name: "Ananya M.",
        text: "Rajesh showed us temples I could never have found on my own. His knowledge of Kashi's history is extraordinary.",
        rating: 5,
        date: "Jan 2026",
      },
      {
        name: "Thomas B.",
        text: "An unforgettable experience. Rajesh made us feel like we were walking through living history.",
        rating: 5,
        date: "Dec 2025",
      },
      {
        name: "Priya S.",
        text: "Best guide experience in India. Period. Rajesh's storytelling is captivating.",
        rating: 5,
        date: "Nov 2025",
      },
    ],
  },
  {
    id: "guide-2",
    name: "Meera Devi",
    image: "/images/guide-2.jpg",
    intro:
      "A passionate food historian and culinary guide, Meera takes you through the forgotten food lanes of Banaras where recipes have been passed down for centuries.",
    specializations: ["Food Tours", "Culinary Heritage", "Market Walks"],
    languages: ["Hindi", "English", "Bhojpuri"],
    experience: "12 years",
    pricing: [
      { label: "Morning Food Walk (3 hrs)", price: 1200 },
      { label: "Full-Day Culinary Journey (7 hrs)", price: 2500 },
      { label: "Evening Street Food Trail (3 hrs)", price: 1200 },
    ],
    availability: "Tuesday - Sunday, 6:00 AM - 9:00 PM",
    rating: 4.8,
    reviewCount: 98,
    reviews: [
      {
        name: "Rahul K.",
        text: "Meera introduced us to flavors I never knew existed in Varanasi. The kachori gali experience was life-changing.",
        rating: 5,
        date: "Jan 2026",
      },
      {
        name: "Sarah L.",
        text: "As a food writer, I thought I knew Indian cuisine. Meera proved me wrong in the best way possible.",
        rating: 5,
        date: "Dec 2025",
      },
    ],
  },
  {
    id: "guide-3",
    name: "Pandit Vishwanath",
    image: "/images/guide-3.jpg",
    intro:
      "A spiritual guide with deep roots in the ancient traditions of Kashi. Pandit Vishwanath offers transformative spiritual journeys that connect you with the eternal soul of the city.",
    specializations: [
      "Spiritual Tours",
      "Meditation Sessions",
      "Ritual Experiences",
    ],
    languages: ["Hindi", "English", "Sanskrit", "Pali"],
    experience: "35 years",
    pricing: [
      { label: "Dawn Spiritual Walk (3 hrs)", price: 1800 },
      { label: "Full Spiritual Immersion (8 hrs)", price: 3500 },
      { label: "Midnight Ritual Experience (4 hrs)", price: 2500 },
    ],
    availability: "Daily, including festivals, 3:30 AM - 10:00 PM",
    rating: 5.0,
    reviewCount: 67,
    reviews: [
      {
        name: "David W.",
        text: "A truly life-changing experience. Pandit ji's depth of spiritual knowledge is remarkable.",
        rating: 5,
        date: "Feb 2026",
      },
      {
        name: "Kamala R.",
        text: "The midnight ritual at the ghat with Pandit Vishwanath was the most profound experience of my life.",
        rating: 5,
        date: "Jan 2026",
      },
    ],
  },
  {
    id: "guide-4",
    name: "Arjun Mishra",
    image: "/images/guide-4.jpg",
    intro:
      "A young photographer and cultural storyteller, Arjun combines visual artistry with deep local knowledge to create unique exploratory experiences through Kashi's lanes.",
    specializations: [
      "Photography Walks",
      "Cultural Stories",
      "Street Art Tours",
    ],
    languages: ["Hindi", "English", "Japanese"],
    experience: "8 years",
    pricing: [
      { label: "Golden Hour Photo Walk (3 hrs)", price: 1400 },
      { label: "Full-Day Story Walk (7 hrs)", price: 2600 },
      { label: "Night Photography Tour (4 hrs)", price: 1800 },
    ],
    availability: "Wednesday - Monday, 4:30 AM - 9:00 PM",
    rating: 4.7,
    reviewCount: 53,
    reviews: [
      {
        name: "Yuki T.",
        text: "Arjun found the most incredible photo spots. My Instagram has never looked better!",
        rating: 5,
        date: "Jan 2026",
      },
      {
        name: "Michael H.",
        text: "A unique experience. Arjun's eye for detail and knowledge of hidden spots is impressive.",
        rating: 4,
        date: "Dec 2025",
      },
    ],
  },
];

// ---------- Booking types ----------
export interface Booking {
  id: string;
  guideId: string;
  guideName: string;
  userId: string;
  date: string;
  time: string;
  theme: string;
  pricingLabel: string;
  amount: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

// ---------- Auth types ----------
export type UserRole = "visitor" | "guide" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
}
