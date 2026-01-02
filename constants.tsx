
import { Post, SiteSettings } from './types';

export const DEFAULT_SETTINGS: SiteSettings = {
  brandName: "StatStream AI",
  heroHeadline: "Stop Guessing. Start Dominating Your CTR.",
  heroSubline: "The world's first AI-powered thumbnail simulator. Compare designs, predict performance, and outrank the competition with clinical precision.",
  primaryColor: "#3b82f6",
  showHero: true,
  showFeatures: true,
  showSocialProof: true,
  showFAQ: true,
};

export const DEFAULT_POSTS: Post[] = [
  {
    id: '1',
    title: "Why High Contrast is the Secret to 15% CTR",
    excerpt: "Learn how the human eye processes saturation and contrast in split-seconds on mobile devices.",
    content: "Full content about high contrast strategies in 2025...",
    date: "2024-05-15",
    author: "Alex Rivera",
    category: "Design",
    image: "https://picsum.photos/seed/design/800/400",
    slug: "high-contrast-secret"
  },
  {
    id: '2',
    title: "Psychology of Facial Expressions in Thumbnails",
    excerpt: "Surprised face vs Focused face: Which one drives more clicks in the gaming niche?",
    content: "A deep dive into facial micro-expressions and viewer intent...",
    date: "2024-05-18",
    author: "Sarah Chen",
    category: "Psychology",
    image: "https://picsum.photos/seed/psych/800/400",
    slug: "psychology-of-facial-expressions"
  }
];

export const FAQS = [
  {
    question: "How accurate is the StatStream Score?",
    answer: "Our AI is trained on millions of high-performing YouTube data points. While it can't predict viral luck, it provides an objective technical score based on visual clarity and psychological hooks."
  },
  {
    question: "Do you store my thumbnail images?",
    answer: "No. Images are processed in-memory for the analysis and are not saved to our servers unless you explicitly share a report link."
  },
  {
    question: "Is this tool free?",
    answer: "The basic simulator is free to use. Pro features including advanced eye-tracking maps and competitor analysis are available for power users."
  }
];
