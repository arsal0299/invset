// ------------------------------------------------------------------
// All portfolio content lives here — edit this file to personalise.
// ------------------------------------------------------------------
import { img } from "./images";

export const profile = {
  first: "Mr.Arslan",
  name: "Muhammad Arslan",
  logo: "Mr.Arslan",
  role: "Full-Stack Developer, AI Engineer & Digital Creator",
  email: "marslan0299@gmail.com",
  phone: "+92 329 6521799",
  whatsapp: "923296521799",
  city: "Toba Tek Singh",
  country: "Pakistan",
  timezone: "Asia/Karachi",
  location: "Toba Tek Singh, Punjab, Pakistan · Remote",
  availability: "Available for freelance projects",
  status: "Taking new projects",
  intro:
    "Full-stack developer, AI engineer and digital creator building fast web apps, AI-powered workflows and cinematic video for brands that want to stand out.",
  bio: "I'm Muhammad Arslan, a full-stack developer, AI engineer and digital creator based in Toba Tek Singh, Pakistan. I design and build fast, responsive web products with React, Next.js, Node.js and TypeScript, connect Google Gemini and other LLMs into custom workflows, and craft cinematic video edits with custom colour grading and kinetic typography. Over the past two years I've worked with 12+ clients, combining engineering, AI and visual storytelling to help brands launch faster and stand out.",
  socials: {
    instagram: "https://instagram.com/arslan0299",
    tiktok: "https://tiktok.com/@arslan0299",
    facebook: "https://facebook.com/arslan0299",
  },
};

export type Service = {
  id: string;
  no: string;
  title: string;
  short: string;
  description: string;
  icon: "code" | "pen" | "bot" | "heart" | "bag" | "spark" | "bolt";
  features: string[];
  process: string[];
  price: string;
};

export const services: Service[] = [
  {
    id: "web",
    no: "01",
    title: "Full-Stack Web Development",
    short: "High-performance, responsive web apps built end to end.",
    description:
      "Modern websites and web apps built with the MERN stack, Next.js and TypeScript, styled with Tailwind CSS — fast, responsive and easy to maintain.",
    icon: "code",
    features: ["MERN (React, Node, Express)", "Next.js & TypeScript", "Tailwind CSS", "Responsive, fast UI"],
    process: ["Discovery call", "Architecture plan", "Build sprints", "Launch & handover"],
    price: "from $2.4k",
  },
  {
    id: "ai",
    no: "02",
    title: "AI Engineering & Integration",
    short: "Connecting Gemini and other LLMs into real workflows.",
    description:
      "Google Gemini and LLM API integrations, modular middleware and custom client hubs, plus hands-on experience training and fine-tuning AI models.",
    icon: "bot",
    features: ["Gemini / LLM API integration", "Custom middleware", "Client hubs & tools", "Model training & fine-tuning"],
    process: ["Audit workflows", "Prototype agent", "Integrate", "Monitor & refine"],
    price: "from $1.5k",
  },
  {
    id: "video",
    no: "03",
    title: "Video Editing & Creative Visuals",
    short: "Cinematic edits with custom colour and motion type.",
    description:
      "Cinematic video editing and post-production with custom colour grading (LUTs), kinetic typography, graphic design and strong visual direction.",
    icon: "spark",
    features: ["Cinematic editing", "LUT colour grading", "Kinetic typography", "Graphic design"],
    process: ["Brief", "Rough cut", "Colour & motion", "Final delivery"],
    price: "Let's talk",
  },
  {
    id: "marketing",
    no: "04",
    title: "Digital Marketing & Strategy",
    short: "Social media management and growth that builds a brand.",
    description:
      "Social media management across multiple platforms, audience growth strategies and cohesive brand narratives backed by clear creative briefs.",
    icon: "heart",
    features: ["Social media management", "Growth strategy", "Audience engagement", "Brand identity & briefs"],
    process: ["Audit", "Strategy", "Content & posting", "Review & grow"],
    price: "Let's talk",
  },
  {
    id: "uiux",
    no: "05",
    title: "UI/UX Design",
    short: "Designing intuitive interfaces that users love to experience.",
    description:
      "Research-led product design, wireframes and polished interfaces with a living design system your whole team can grow with.",
    icon: "pen",
    features: ["User research", "Wireframes & flows", "High-fidelity UI", "Design systems"],
    process: ["Research", "Wireframes", "Visual design", "Prototype & test"],
    price: "from $1.8k",
  },
  {
    id: "ux",
    no: "06",
    title: "User Experience",
    short: "Creating meaningful interactions that solve real problems.",
    description:
      "Audits, usability testing and conversion-focused improvements that make every click feel considered and every journey feel effortless.",
    icon: "heart",
    features: ["UX audits", "Usability testing", "Conversion optimisation", "Journey mapping"],
    process: ["Audit", "Interviews", "Recommendations", "Iterate"],
    price: "from $1.2k",
  },
  {
    id: "ecom",
    no: "07",
    title: "E-Commerce",
    short: "Storefronts that feel boutique and convert beautifully.",
    description:
      "Shopify and headless commerce experiences with delightful product pages, smooth checkout and analytics that tell you what's working.",
    icon: "bag",
    features: ["Shopify & headless", "Custom themes", "Checkout optimisation", "Analytics setup"],
    process: ["Strategy", "Design", "Build", "Grow"],
    price: "from $3k",
  },
  {
    id: "creative",
    no: "08",
    title: "Creative Development",
    short: "Playful motion, WebGL and interactive storytelling.",
    description:
      "Interactive experiences, scroll storytelling and generative visuals that make people stop, smile and share.",
    icon: "spark",
    features: ["Scroll storytelling", "Canvas & WebGL", "Generative art", "Interactive campaigns"],
    process: ["Concept", "Prototype", "Craft", "Polish"],
    price: "from $2k",
  },
  {
    id: "perf",
    no: "09",
    title: "Performance Optimization",
    short: "Lightning-fast experiences with perfect vitals.",
    description:
      "Deep performance audits and fixes — Core Web Vitals, bundle size, image pipelines and rendering — for sites that feel instant.",
    icon: "bolt",
    features: ["Core Web Vitals", "Bundle analysis", "Image pipelines", "Caching strategy"],
    process: ["Measure", "Diagnose", "Optimise", "Monitor"],
    price: "from $900",
  },
];

export type Project = {
  slug: string;
  no: string;
  title: string;
  category: "Web" | "UI/UX" | "E-Commerce" | "AI" | "Creative" | "Experiments";
  badge: string;
  image: string;
  summary: string;
  year: string;
  client: string;
  role: string;
  duration: string;
  tech: string[];
  overview: string;
  challenge: string;
  solution: string;
  process: { title: string; text: string }[];
  results: { value: string; label: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "personal-portfolio",
    no: "01",
    title: "Personal Portfolio",
    category: "Web",
    badge: "Website",
    image: "/images/project-portfolio.jpg",
    summary: "A modern portfolio to showcase work, story and skills.",
    year: "2025",
    client: "Studio Petal",
    role: "Design & Development",
    duration: "6 weeks",
    tech: ["React", "Vite", "Framer Motion", "Sanity"],
    overview:
      "An editorial, motion-rich portfolio for an independent illustrator that feels as warm and handmade as her work.",
    challenge:
      "Her previous site was a template that buried the work beneath heavy UI. She needed something that felt personal, loaded instantly and was easy to update between commissions.",
    solution:
      "We built a calm editorial layout with generous whitespace, soft motion and a headless CMS so new pieces go live in minutes. Every animation was tuned to feel like turning pages in a sketchbook.",
    process: [
      { title: "Discover", text: "Moodboards, interviews and a content audit to find the story." },
      { title: "Design", text: "Typography-led layouts with a custom pink palette and hand-drawn details." },
      { title: "Build", text: "React + Vite with a lightweight motion system and Sanity CMS." },
      { title: "Launch", text: "Performance tuning, SEO and a gentle launch campaign." },
    ],
    results: [
      { value: "+184%", label: "Inquiries" },
      { value: "0.9s", label: "Load time" },
      { value: "100", label: "Lighthouse" },
    ],
    featured: true,
  },
  {
    slug: "bloom-ecommerce",
    no: "02",
    title: "E-Commerce Store",
    category: "E-Commerce",
    badge: "Web App",
    image: "/images/project-ecommerce.jpg",
    summary: "Full-stack online store with a smooth, joyful checkout.",
    year: "2025",
    client: "Bloom Atelier",
    role: "UX, UI & Front-end",
    duration: "10 weeks",
    tech: ["Next.js", "Shopify", "Stripe", "Tailwind"],
    overview: "A boutique headless storefront for a handbag label that sells beauty and ease in equal measure.",
    challenge: "Cart abandonment sat at 78% and mobile conversion lagged far behind desktop.",
    solution:
      "A redesigned product page, a single-step checkout and delightful micro-interactions — all built headless for speed.",
    process: [
      { title: "Audit", text: "Heatmaps and session recordings revealed friction at every step." },
      { title: "Prototype", text: "Tested three checkout flows with twelve real customers." },
      { title: "Build", text: "Next.js storefront on Shopify's Storefront API." },
      { title: "Grow", text: "A/B tests and analytics dashboards for the team." },
    ],
    results: [
      { value: "+62%", label: "Conversion" },
      { value: "-41%", label: "Abandonment" },
      { value: "4.9★", label: "Reviews" },
    ],
  },
  {
    slug: "pulse-analytics",
    no: "03",
    title: "Analytics Dashboard",
    category: "UI/UX",
    badge: "SaaS",
    image: "/images/project-dashboard.jpg",
    summary: "Real-time analytics dashboard with interactive insights.",
    year: "2024",
    client: "Pulse Labs",
    role: "Product Design",
    duration: "12 weeks",
    tech: ["Figma", "React", "D3", "TypeScript"],
    overview: "A friendly analytics product that turns dense data into decisions, even for non-technical teams.",
    challenge: "Users were overwhelmed by 40+ charts and rarely made it past the first screen.",
    solution: "A narrative dashboard with smart summaries, progressive disclosure and a warm, calm visual language.",
    process: [
      { title: "Research", text: "18 interviews across marketing, sales and ops teams." },
      { title: "Information", text: "Rebuilt the IA around questions, not metrics." },
      { title: "System", text: "A 120-component design system with data-viz tokens." },
      { title: "Ship", text: "Weekly releases paired with the engineering team." },
    ],
    results: [
      { value: "3.2×", label: "Daily active" },
      { value: "-58%", label: "Support tickets" },
      { value: "92", label: "SUS score" },
    ],
  },
  {
    slug: "aura-assistant",
    no: "04",
    title: "Aura AI Assistant",
    category: "AI",
    badge: "Automation",
    image: "/images/project-ai.jpg",
    summary: "An AI teammate automating onboarding and support.",
    year: "2025",
    client: "Nimbus HR",
    role: "AI & Front-end",
    duration: "8 weeks",
    tech: ["OpenAI", "n8n", "Node", "React"],
    overview: "A friendly AI assistant that answers policy questions and automates onboarding tasks.",
    challenge: "HR spent 20+ hours a week answering the same questions and chasing paperwork.",
    solution: "A retrieval-powered assistant connected to Slack, Notion and the HRIS with human handoff built in.",
    process: [
      { title: "Map", text: "Documented 60 repetitive workflows." },
      { title: "Train", text: "Built a curated knowledge base with guardrails." },
      { title: "Integrate", text: "Slack, Notion, BambooHR and email automations." },
      { title: "Refine", text: "Weekly reviews of conversations and accuracy." },
    ],
    results: [
      { value: "22h", label: "Saved weekly" },
      { value: "94%", label: "Accuracy" },
      { value: "+37", label: "eNPS" },
    ],
  },
  {
    slug: "serene-wellness",
    no: "05",
    title: "Serene Wellness App",
    category: "UI/UX",
    badge: "Mobile",
    image: "/images/project-mobile.jpg",
    summary: "A calming meditation app designed around tiny rituals.",
    year: "2024",
    client: "Serene",
    role: "Product Design",
    duration: "9 weeks",
    tech: ["Figma", "React Native", "Lottie"],
    overview: "A mobile wellness companion built around gentle, two-minute rituals.",
    challenge: "Most meditation apps felt like homework; users churned within a week.",
    solution: "Micro-sessions, soft haptics and a breathing orb that responds to touch.",
    process: [
      { title: "Diary study", text: "Two weeks of rituals with 24 participants." },
      { title: "Concept", text: "Three directions, one delightful breathing orb." },
      { title: "Design", text: "Soft UI, motion specs and haptic patterns." },
      { title: "Test", text: "Beta with 400 users and weekly iterations." },
    ],
    results: [
      { value: "+71%", label: "Week-4 retention" },
      { value: "4.8★", label: "App Store" },
      { value: "120k", label: "Downloads" },
    ],
  },
  {
    slug: "petal-lab",
    no: "06",
    title: "Petal Generative Lab",
    category: "Creative",
    badge: "Experiment",
    image: "/images/journal-cover.jpg",
    summary: "Generative floral visuals that bloom from your cursor.",
    year: "2025",
    client: "Personal",
    role: "Creative Coding",
    duration: "Ongoing",
    tech: ["Canvas", "GLSL", "TypeScript"],
    overview: "A playground of generative petals, particles and soft physics.",
    challenge: "Make generative art feel gentle and human rather than cold and technical.",
    solution: "Hand-tuned noise fields, a pastel palette and physics inspired by falling petals.",
    process: [
      { title: "Sketch", text: "Paper sketches of petal motion." },
      { title: "Prototype", text: "Canvas experiments with noise fields." },
      { title: "Shade", text: "GLSL for soft glow and grain." },
      { title: "Share", text: "Open-sourced for the community." },
    ],
    results: [
      { value: "2.4k", label: "GitHub stars" },
      { value: "60fps", label: "On mobile" },
      { value: "#1", label: "CodePen pick" },
    ],
  },
  {
    slug: "atelier-motion",
    no: "07",
    title: "Atelier Motion Study",
    category: "Experiments",
    badge: "Motion",
    image: "/images/cta-desk.jpg",
    summary: "Scroll-driven storytelling for a candle atelier.",
    year: "2024",
    client: "Lumière Atelier",
    role: "Creative Dev",
    duration: "5 weeks",
    tech: ["GSAP", "Three.js", "Astro"],
    overview: "A cosy scroll story that lights up, one candle at a time.",
    challenge: "Translate the warmth of a physical store to a screen.",
    solution: "Layered parallax, warm light transitions and ambient sound design.",
    process: [
      { title: "Story", text: "A storyboard of a single evening." },
      { title: "Scene", text: "Layered 2.5D scene composition." },
      { title: "Motion", text: "Scroll-linked lighting and parallax." },
      { title: "Polish", text: "Mobile fallbacks and reduced motion." },
    ],
    results: [
      { value: "Awwwards", label: "Honourable mention" },
      { value: "3:40", label: "Avg. time on site" },
      { value: "+48%", label: "Online sales" },
    ],
  },
];

export const categories = ["All", "Web", "UI/UX", "E-Commerce", "AI", "Creative", "Experiments"] as const;

// Real client reviews yahan add karo jab mil jayen. Khali hone par section hide rehta hai.
export const testimonials: { quote: string; name: string; role: string; company: string; avatar: string }[] = [];

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  read: string;
  image: string;
  featured?: boolean;
};

export const articles: Article[] = [
  {
    slug: "designing-with-softness",
    title: "Designing with softness: why gentle interfaces win",
    excerpt: "Soft colour, calm motion and generous whitespace aren't decoration — they're how people feel safe enough to act.",
    category: "Design",
    date: "Mar 12, 2026",
    read: "7 min",
    image: "/images/journal-cover.jpg",
    featured: true,
  },
  {
    slug: "motion-with-purpose",
    title: "Motion with purpose: a tiny animation manifesto",
    excerpt: "Every animation should answer a question: where did that come from, where did it go, what just happened?",
    category: "Motion",
    date: "Feb 26, 2026",
    read: "5 min",
    image: "/images/project-portfolio.jpg",
  },
  {
    slug: "ai-automations-small-teams",
    title: "Five AI automations every small team should steal",
    excerpt: "The boring workflows quietly eating your week — and the friendly robots that can take them off your plate.",
    category: "AI",
    date: "Feb 03, 2026",
    read: "9 min",
    image: "/images/project-ai.jpg",
  },
  {
    slug: "checkout-that-feels-like-a-hug",
    title: "A checkout that feels like a hug",
    excerpt: "Lessons from redesigning a boutique store's checkout and cutting abandonment by 41%.",
    category: "Case Notes",
    date: "Jan 18, 2026",
    read: "6 min",
    image: "/images/project-ecommerce.jpg",
  },
  {
    slug: "dashboards-people-love",
    title: "Dashboards people actually love opening",
    excerpt: "Turning forty charts into five questions — and why narrative beats data density.",
    category: "UX",
    date: "Dec 09, 2025",
    read: "8 min",
    image: "/images/project-dashboard.jpg",
  },
  {
    slug: "tiny-rituals",
    title: "Tiny rituals for a calmer creative practice",
    excerpt: "Candles, playlists, and the two-minute sketch habit that changed how I work.",
    category: "Life",
    date: "Nov 21, 2025",
    read: "4 min",
    image: "/images/cta-desk.jpg",
  },
];

export const experience = [
  {
    period: "2024 — Now",
    role: "Full-Stack Developer, AI Engineer & Digital Creator",
    company: "Freelance · Remote",
    text: "Building web apps with the MERN stack and Next.js, integrating Gemini and other LLMs into custom workflows, and producing cinematic videos for clients.",
    tags: ["MERN", "Next.js", "AI", "Video"],
  },
];

export const skills = [
  {
    group: "Web Development",
    items: [
      { name: "React / Next.js", level: 88 },
      { name: "Node & Express", level: 85 },
      { name: "TypeScript", level: 82 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    group: "AI Engineering",
    items: [
      { name: "LLM / Gemini APIs", level: 85 },
      { name: "Custom middleware", level: 80 },
      { name: "Model fine-tuning", level: 75 },
    ],
  },
  {
    group: "Creative & Marketing",
    items: [
      { name: "Video editing", level: 90 },
      { name: "Color grading (LUTs)", level: 85 },
      { name: "Kinetic typography", level: 85 },
      { name: "Social media growth", level: 80 },
    ],
  },
];

export const tools = [
  "React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind", "Gemini",
];

export const achievements = [
  { value: "12+", label: "Satisfied clients" },
  { value: "50+", label: "Videos produced" },
  { value: "4.9", label: "Average rating" },
  { value: "2+", label: "Years experience" },
];

// ---- resolve image paths to bundled (inlined) assets ----
const IMG_MAP: Record<string, string> = {
  "/images/hero-girl.jpg": img.heroGirl,
  "/images/about-portrait.jpg": img.aboutPortrait,
  "/images/project-portfolio.jpg": img.projectPortfolio,
  "/images/project-ecommerce.jpg": img.projectEcommerce,
  "/images/project-dashboard.jpg": img.projectDashboard,
  "/images/project-ai.jpg": img.projectAi,
  "/images/project-mobile.jpg": img.projectMobile,
  "/images/cta-desk.jpg": img.ctaDesk,
  "/images/avatar-client.jpg": img.avatarClient,
  "/images/journal-cover.jpg": img.journalCover,
};
const fix = (s: string) => IMG_MAP[s] ?? s;
projects.forEach((p) => (p.image = fix(p.image)));
articles.forEach((a) => (a.image = fix(a.image)));
testimonials.forEach((t) => (t.avatar = fix(t.avatar)));

export const credit = { name: "Muhammad Arslan", label: "Dev by Muhammad Arslan" };
