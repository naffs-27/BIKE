export interface ProductRecommendation {
  model: string;
  category: string;
  engine: string;
  horsepower: string;
  torque: string;
  curbWeight: string;
  topSpeed: string;
  msrp: string;
  bestFor: string;
  keyFeature: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContentSection {
  id: string;
  heading: string;
  paragraphs: string[];
  callout?: {
    type: 'pro-tip' | 'technical' | 'safety' | 'benchmark';
    title: string;
    text: string;
  };
  metrics?: {
    label: string;
    value: string;
    subtext: string;
  }[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  category: 'Fundamentals' | 'Power Tiers' | 'Physics & Speed' | 'Rider Guides' | 'Comparative Tech' | 'Superbikes' | 'Buyer Guides';
  hpTier: '< 40 HP' | '40 - 75 HP' | '75 - 120 HP' | '120 - 180 HP' | '180+ HP' | 'All Tiers';
  author: {
    name: string;
    role: string;
    avatar: string;
    experience: string;
  };
  publishDate: string;
  readTime: string;
  image: string;
  imageCaption: string;
  keyTakeaways: string[];
  tableOfContents: {
    id: string;
    title: string;
  }[];
  contentSections: ContentSection[];
  productRecommendations: ProductRecommendation[];
  prosAndCons: {
    prosTitle: string;
    pros: string[];
    consTitle: string;
    cons: string[];
  };
  faqs: FAQItem[];
  relatedSlugs: string[];
}
