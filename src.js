export const TICKER = [
  "🧘 @solarwave · Wellness",
  "📚 @techminds_ · EdTech",
  "🌿 @greengal · Sustainability",
  "💜 @mindfulmarc · Mental Health",
  "🎨 @pixelqueen · Art & Design",
  "⚡ TechForge · SaaS Brand",
  "🌱 MindBloom Co. · Wellness Brand",
  "💻 @codewitch · Tech",
  "🥗 GreenBite · F&B Brand",
  "🎵 @beatmaker99 · Music",
  "🏋️ @liftwithleo · Fitness",
  "🌍 @ecotales · Environment",
];

export const PROBLEMS = [
  {
    icon: "🤖",
    title: "AI Slop Takeover",
    desc: "Original content gets copied and generated within minutes. Low-quality AI posts flood every feed. Original creators get buried.",
    col: "#ff2e8a"
  },
  {
    icon: "💀",
    title: "Random Suspensions",
    desc: "Years of work gone overnight. No closure, no backup, no receipts. Start from zero. No way to even prove you existed.",
    col: "#8b5cf6"
  },
  {
    icon: "📏",
    title: "Same Scorecard for All",
    desc: "A meme page and a mental-health educator judged by identical metrics. That math ain't mathing and creators pay for it.",
    col: "#7dd3fc"
  },
];

export const FEATURES = [
  {
    icon: "🏆",
    name: "Winner Takes It All",
    short: "Proof of First",
    desc: "Cryptographic timestamp the second you upload. AI similarity detection catches every copy. You're the OG — we have the receipts.",
    col: "#ff2e8a",
    tech: "SHA-256 hash + pgvector cosine search"
  },
  {
    icon: "📦",
    name: "StoreRoom",
    short: "Cloud Backup",
    desc: "Content, engagement history, analytics — all backed up outside platform walls. Get suspended? Rebuild anywhere, anytime.",
    col: "#8b5cf6",
    tech: "Encrypted Supabase Storage + API sync"
  },
  {
    icon: "📊",
    name: "IT Scorecard",
    short: "Impact Score",
    desc: "Personalised score compared only to creators in your exact niche. A science educator isn't competing with meme pages here.",
    col: "#7dd3fc",
    tech: "LLM niche classifier + 3-layer scoring"
  },
  {
    icon: "🔍",
    name: "Brand Finder",
    short: "Smart Discovery",
    desc: "Brands find you through what you actually create, not your hashtags. Hidden gems get discovered. No keyword BS.",
    col: "#87a87a",
    tech: "Semantic embeddings + cosine matching"
  },
];

export const RADAR_DATA = [
  { s: "Engagement", v: 88 },
  { s: "Originality", v: 76 },
  { s: "Depth", v: 84 },
  { s: "Reach", v: 72 },
  { s: "Consistency", v: 90 },
];

export const SCORES = [
  { label: "Engagement", score: 88, col: "#ff2e8a" },
  { label: "Originality", score: 76, col: "#8b5cf6" },
  { label: "Knowledge Depth", score: 84, col: "#7dd3fc" },
  { label: "Reach", score: 72, col: "#87a87a" },
  { label: "Consistency", score: 90, col: "#e8a317" },
];

export const PRICING = [
  {
    tier: "FREE",
    emoji: "✨",
    price: "$0",
    col: "#87a87a",
    cta: "Start Free",
    feats: ["Content fingerprinting", "Basic backup", "Basic IT Score", "Basic brand visibility"]
  },
  {
    tier: "PRO",
    emoji: "🔥",
    price: "$9.99/mo",
    col: "#ff2e8a",
    cta: "Go Pro",
    highlight: true,
    feats: ["Deep analytics", "Faster backup sync", "Copycat alerts", "Brand discovery opt-in"]
  },
  {
    tier: "STUDIO",
    emoji: "🚀",
    price: "$24.99/mo",
    col: "#8b5cf6",
    cta: "Get Studio",
    feats: ["Team accounts", "Pitch deck generator", "Priority support", "Premium match alerts"]
  },
];

export const BRAND_MATCHES = [
  { handle: "@solarwave", name: "Priya Mehta", niche: "Wellness", followers: "14.2K", impact: 84, match: 96, avatar: "🧘" },
  { handle: "@techminds_", name: "Arjun Shah", niche: "EdTech", followers: "8.9K", impact: 91, match: 89, avatar: "📚" },
  { handle: "@greengal", name: "Sofia Lin", niche: "Sustainability", followers: "22K", impact: 79, match: 82, avatar: "🌿" },
];

export const MY_CONTENT = [
  { id: 1, title: "5 breathing techniques for anxiety", platform: "Instagram", likes: 2100, date: "Oct 12, 2025", niche: "Wellness" },
  { id: 2, title: "Morning routine for ADHD brains", platform: "TikTok", likes: 5400, date: "Nov 3, 2025", niche: "Mental Health" },
  { id: 3, title: "Why hustle culture is hurting you", platform: "YouTube", likes: 8900, date: "Dec 1, 2025", niche: "Wellness" },
  { id: 4, title: "A beginner's guide to therapy", platform: "Instagram", likes: 3200, date: "Jan 5, 2026", niche: "Mental Health" },
];

export const VAULT_STATS = [
  { label: "Items Backed Up", value: "47", icon: "📦", col: "#8b5cf6" },
  { label: "Last Sync", value: "2 hrs ago", icon: "🔄", col: "#7dd3fc" },
  { label: "Storage Used", value: "2.1 GB", icon: "💾", col: "#87a87a" },
  { label: "Platforms", value: "3 active", icon: "🌐", col: "#ff2e8a" },
];

export const FLOW_STEPS = {
  creator: [
    { icon: "📤", label: "Upload", sub: "Your content", col: "#ff2e8a" },
    { icon: "🔐", label: "Hash + Embed", sub: "Authenticity Engine", col: "#ff2e8a" },
    { icon: "🔍", label: "Dupe Check", sub: "pgvector search", col: "#ff2e8a" },
    { icon: "🧠", label: "AI Score", sub: "LLM classifier", col: "#8b5cf6" },
    { icon: "💾", label: "Vault Backup", sub: "Encrypted storage", col: "#8b5cf6" },
    { icon: "✅", label: "Verified Profile", sub: "Live to brands", col: "#87a87a" },
  ],
  brand: [
    { icon: "📝", label: "Submit Brief", sub: "Free text", col: "#7dd3fc" },
    { icon: "⚡", label: "Embed Brief", sub: "Discovery Engine", col: "#7dd3fc" },
    { icon: "🎯", label: "Vector Search", sub: "pgvector cosine", col: "#7dd3fc" },
    { icon: "🛡️", label: "Anti-gaming", sub: "LLM re-rank", col: "#8b5cf6" },
    { icon: "🤝", label: "Top Matches", sub: "10-20 creators", col: "#8b5cf6" },
    { icon: "💰", label: "Deal + Fee", sub: "3-5% via Stripe", col: "#87a87a" },
  ]
};
