import { RSSFeed, Category } from './types';

export const PRESS_FEEDS: RSSFeed[] = [
  // --- IA & TECH ---
  { name: "TechCrunch AI", url: "https://techcrunch.com/tag/artificial-intelligence/feed/", type: 'press' },
  { name: "VentureBeat AI", url: "https://venturebeat.com/category/ai/feed/", type: 'press' },
  { name: "The Verge AI", url: "https://www.theverge.com/ai-artificial-intelligence/rss/index.xml", type: 'press' },
  { name: "MIT Technology Review AI", url: "https://www.technologyreview.com/topic/artificial-intelligence/feed", type: 'press' },
  { name: "OpenAI Blog", url: "https://openai.com/blog/rss.xml", type: 'press' },
  { name: "Google AI Blog", url: "https://ai.googleblog.com/feeds/posts/default", type: 'press' },

  // --- BUSINESS / MARCHÉ ---
  { name: "Les Echos Tech & Médias", url: "https://www.lesechos.fr/tech-medias/rss.xml", type: 'press' },
  { name: "BFM Business Tech", url: "https://www.bfmtv.com/rss/tech/", type: 'press' },
  { name: "FrenchWeb", url: "https://www.frenchweb.fr/feed", type: 'press' },

  // --- COMPTABILITÉ / FINANCE ---
  { name: "Compta Online", url: "https://www.compta-online.com/rss", type: 'press' },
  { name: "Le Monde Informatique (ERP/Finance)", url: "https://www.lemondeinformatique.fr/flux-rss/thematique/erp-finance/rss.xml", type: 'press' },

  // --- FACTURATION ÉLECTRONIQUE ---
  { name: "DGFIP - Actualités", url: "https://www.impots.gouv.fr/rss/actualites.xml", type: 'press' },
  { name: "Service Public Pro", url: "https://www.service-public.fr/rss/professionnels.xml", type: 'press' },

  // --- IMMOBILIER / LMNP ---
  { name: "Boursorama Immobilier", url: "https://www.boursorama.com/immobilier/rss/", type: 'press' },
  { name: "SeLoger Invest", url: "https://edito.seloger.com/rss/investissement.xml", type: 'press' },
];

export const ALL_FEEDS = [...PRESS_FEEDS];

export const CATEGORY_BADGE_STYLES: Record<Category, string> = {
  [Category.AI]: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  [Category.Market]: 'bg-green-500/10 text-green-400 border-green-500/20',
  [Category.Accounting]: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  [Category.Tools]: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  [Category.LMNP]: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  [Category.EInvoicing]: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  [Category.General]: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  [Category.AI]: 'fa-microchip',
  [Category.Market]: 'fa-chart-line',
  [Category.Accounting]: 'fa-calculator',
  [Category.Tools]: 'fa-screwdriver-wrench',
  [Category.LMNP]: 'fa-building',
  [Category.EInvoicing]: 'fa-file-invoice',
  [Category.General]: 'fa-rss',
};

export const CATEGORY_COLORS: Record<Category, string> = {
  [Category.AI]: 'text-cyan-400',
  [Category.Market]: 'text-green-400',
  [Category.Accounting]: 'text-purple-400',
  [Category.Tools]: 'text-yellow-400',
  [Category.LMNP]: 'text-orange-400',
  [Category.EInvoicing]: 'text-blue-400',
  [Category.General]: 'text-slate-300',
};

export const CATEGORY_CHECKBOX_STYLES: Record<Category, string> = {
  [Category.AI]: 'bg-cyan-500 border-cyan-500',
  [Category.Market]: 'bg-green-500 border-green-500',
  [Category.Accounting]: 'bg-purple-500 border-purple-500',
  [Category.Tools]: 'bg-yellow-500 border-yellow-500',
  [Category.LMNP]: 'bg-orange-500 border-orange-500',
  [Category.EInvoicing]: 'bg-blue-500 border-blue-500',
  [Category.General]: 'bg-slate-500 border-slate-500',
};

export const CATEGORY_KEYWORDS: Record<Category, string[]> = {
  [Category.AI]: [
    'ai', 'artificial intelligence', 'llm', 'gpt', 'openai', 'gemini', 'anthropic',
    'mistral', 'deepseek', 'machine learning', 'deep learning', 'neural network',
    'generative ai', 'agent', 'rag', 'fine-tuning', 'prompt'
  ],

  [Category.Market]: [
    'startup', 'funding', 'levée de fonds', 'valuation', 'growth', 'market',
    'trend', 'tendance', 'investment', 'vc', 'venture capital', 'ipo',
    'acquisition', 'merger', 'business model'
  ],

  [Category.Accounting]: [
    'comptabilité', 'accounting', 'expert-comptable', 'bilan', 'liasse fiscale',
    'déclaration', 'tva', 'fiscalité', 'amortissement', 'charges', 'résultat'
  ],

  [Category.Tools]: [
    'pennylane', 'indy', 'tiime', 'quickbooks', 'sage', 'cegid',
    'outil comptable', 'logiciel comptabilité', 'saas finance',
    'automatisation comptable', 'gestion financière'
  ],

  [Category.LMNP]: [
    'lmnp', 'loueur meublé', 'location meublée', 'amortissement immobilier',
    'régime réel', 'micro bic', 'investissement locatif', 'cashflow',
    'rentabilité locative', 'ownily', 'jd2m', 'jedeclaremonmeuble'
  ],

  [Category.EInvoicing]: [
    'facturation électronique', 'e-invoicing', 'facture électronique',
    'pdp', 'plateforme de dématérialisation', 'chorus pro',
    'obligation facture électronique', 'réforme facture',
    '2026', '2027', 'e-reporting', 'dématérialisation',
    'portail public de facturation'
  ],

  [Category.General]: []
};