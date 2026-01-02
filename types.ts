
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  slug: string;
}

export interface AnalysisResult {
  scoreA: number;
  scoreB: number;
  ctrEstimateA: number;
  ctrEstimateB: number;
  winner: 'A' | 'B' | 'DRAW';
  reasoning: string;
  improvementsA: string[];
  improvementsB: string[];
  eyeTrackingNotes: string;
}

export interface SiteSettings {
  brandName: string;
  heroHeadline: string;
  heroSubline: string;
  primaryColor: string;
  showHero: boolean;
  showFeatures: boolean;
  showSocialProof: boolean;
  showFAQ: boolean;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: number;
}
