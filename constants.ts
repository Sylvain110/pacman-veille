import { RSSFeed, Category } from './types';

export const PRESS_FEEDS: RSSFeed[] = [
  // --- IA & TECH ---
  { name: "TechCrunch AI", url: "https://techcrunch.com/tag/artificial-intelligence/feed/", type: 'press' },
  { name: "VentureBeat AI", url: "https://venturebeat.com/category/ai/feed/", type: 'press' },
  { name: "MIT Technology Review AI", url: "https://www.technologyreview.com/topic/artificial-intelligence/feed", type: 'press' },
  //{ name: "OpenAI Blog", url: "https://openai.com/blog/rss.xml", type: 'press' },
  { name: "Google AI Blog", url: "https://ai.googleblog.com/feeds/posts/default", type: 'press' },

  // --- BUSINESS / MARCHÉ ---
  { name: "Les Echos Tech & Médias", url: "https://services.lesechos.fr/rss/les-echos-tech-medias.xml?_gl=1*olexo0*_gcl_au*NzE2OTc3NDIzLjE3NzQyNzM0ODc.", type: 'press' },
  { name: "Les Echos Finance", url: "https://services.lesechos.fr/rss/les-echos-finance-marches.xml?_gl=1*olexo0*_gcl_au*NzE2OTc3NDIzLjE3NzQyNzM0ODc.", type: 'press' },
  { name: "BFM Business Tech", url: "https://www.bfmtv.com/rss/tech/", type: 'press' },
  { name: "FrenchWeb", url: "https://www.frenchweb.fr/feed", type: 'press' },
  { name: "JDN Startups", url: "https://www.journaldunet.com/rss/startups/", type: 'press' },
  { name: "L'Usine Digitale", url: "https://www.usine-digitale.fr/informatique/rss", type: 'press' },

  // --- COMPTABILITÉ / FINANCE ---
  { name: "Compta Online", url: "https://www.compta-online.com/rss", type: 'press' },
  { name: "Le Monde du Chiffre", url: "https://www.lemondeduchiffre.fr/component/obrss/le-monde-du-chiffre.feed", type: 'press' },
  { name: "La Revue Fiduciaire", url: "https://rfcomptable.grouperf.com/rss/flux.php?id=1", type: 'press' },
  { name: "Le Monde Informatique (ERP/Finance)", url: "https://www.lemondeinformatique.fr/flux-rss/thematique/erp-finance/rss.xml", type: 'press' },

  // --- FACTURATION ÉLECTRONIQUE ---
  { name: "DGFIP - Actualités", url: "https://bofip.impots.gouv.fr/bofip/ext/rss.xml?actualites=1&publications=1&series=AIDA&maxR=50&maxJ=14", type: 'press' },
  { name: "Service Public Pro", url: "https://www.service-public.fr/rss/professionnels.xml", type: 'press' },
  { name: "FNFE-MPE (Réforme)", url: "https://fnfe-mpe.org/feed/", type: 'press' },
  { name: "Actualités Experts-Comptables (Facturation)", url: "https://www.experts-comptables.fr/rss.xml", type: 'press' },

  // --- IMMOBILIER ---
  { name: "Boursorama Immobilier", url: "https://www.boursorama.com/immobilier/rss/", type: 'press' },
  { name: "SeLoger Invest", url: "https://edito.seloger.com/rss/investissement.xml", type: 'press' },
  { name: "Explorimmoneuf - Investir", url: "https://www.explorimmoneuf.com/flux-rss/investir", type: 'press' },
  { name: "Le Revenu - Immobilier", url: "https://www.lerevenu.com/rss/immobilier", type: 'press' },
];

export const ALL_FEEDS = [...PRESS_FEEDS];

export const CATEGORY_BADGE_STYLES: Record<Category, string> = {
  [Category.AI]: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  [Category.Market]: 'bg-green-500/10 text-green-400 border-green-500/20',
  [Category.Accounting]: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  [Category.Tools]: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  [Category.IMMOBILIER]: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  [Category.EInvoicing]: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  [Category.General]: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  [Category.AI]: 'fa-microchip',
  [Category.Market]: 'fa-chart-line',
  [Category.Accounting]: 'fa-calculator',
  [Category.Tools]: 'fa-screwdriver-wrench',
  [Category.IMMOBILIER]: 'fa-building',
  [Category.EInvoicing]: 'fa-file-invoice',
  [Category.General]: 'fa-rss',
};

export const CATEGORY_COLORS: Record<Category, string> = {
  [Category.AI]: 'text-cyan-400',
  [Category.Market]: 'text-green-400',
  [Category.Accounting]: 'text-purple-400',
  [Category.Tools]: 'text-yellow-400',
  [Category.IMMOBILIER]: 'text-orange-400',
  [Category.EInvoicing]: 'text-blue-400',
  [Category.General]: 'text-slate-300',
};

export const CATEGORY_CHECKBOX_STYLES: Record<Category, string> = {
  [Category.AI]: 'bg-cyan-500 border-cyan-500',
  [Category.Market]: 'bg-green-500 border-green-500',
  [Category.Accounting]: 'bg-purple-500 border-purple-500',
  [Category.Tools]: 'bg-yellow-500 border-yellow-500',
  [Category.IMMOBILIER]: 'bg-orange-500 border-orange-500',
  [Category.EInvoicing]: 'bg-blue-500 border-blue-500',
  [Category.General]: 'bg-slate-500 border-slate-500',
};

// Mots-clés volontairement précis — on évite les termes trop courts ou ambigus.
// La détection se fait par mot entier (\b) dans feedParser → pas de faux positifs.
export const CATEGORY_KEYWORDS: Record<Category, string[]> = {
  // IA : termes techniques spécifiques uniquement
  [Category.AI]: [
    'artificial intelligence',
    'intelligence artificielle',
    'machine learning',
    'deep learning',
    'neural network',
    'réseau de neurones',
    'large language model',
    'llm',
    'gpt',
    'openai',
    'anthropic',
    'gemini',
    'mistral',
    'deepseek',
    'generative ai',
    'ia générative',
    'chatgpt',
    'copilot',
    'fine-tuning',
    'rag',
    'prompt engineering',
    'transformer model',
  ],

  // Marché : levées de fonds, startups, business
  [Category.Market]: [
    'startup',
    'levée de fonds',
    'série a',
    'série b',
    'venture capital',
    'capital-risque',
    'valorisation',
    'licorne',
    'ipo',
    'introduction en bourse',
    'acquisition',
    'fusion-acquisition',
    'business model',
    'croissance',
    'chiffre d\'affaires',
    'investisseur',
  ],

  // Comptabilité : termes métier comptables
  [Category.Accounting]: [
    'comptabilité',
    'expert-comptable',
    'cabinet comptable',
    'bilan comptable',
    'liasse fiscale',
    'déclaration fiscale',
    'tva',
    'impôt sur les sociétés',
    'amortissement',
    'plan comptable',
    'clôture comptable',
    'résultat net',
    'compte de résultat',
    'fiscalité',
    'cotisations sociales',
    'urssaf',
    'charge déductible',
  ],

  // Outils : logiciels comptables et fintech nommés
  [Category.Tools]: [
    'pennylane',
    'indy',
    'tiime',
    'quickbooks',
    'sage comptabilité',
    'cegid',
    'myunisoft',
    'ibiza',
    'acd groupe',
    'logiciel comptable',
    'erp finance',
    'saas comptable',
    'automatisation comptable',
    'dématérialisation comptable',
    'comptabilité',
    'gestion financière',
    'comptabilité en ligne',
  ],

  // IMMOBILIER : location meublée, immobilier locatif
  [Category.IMMOBILIER]: [
    'lmnp',
    'lmp',
    'sci',
    'société civile immobilière',
    'société civile de placement immobilier',
    'location meublée',
    'location meublée non professionnel',
    'amortissement immobilier',
    'régime réel simplifié',
    'micro bic',
    'investissement locatif',
    'rendement locatif',
    'loueur meublé non professionnel',
    'location meublée',
    'amortissement immobilier',
    'régime réel simplifié',
    'micro bic',
    'investissement locatif',
    'rendement locatif',
    'cashflow locatif',
    'ownily',
    'jd2m',
    'indy',
    'jedeclaremonmeuble',
    'déficit foncier',
    'plus-value immobilière',
    'taxe foncière',
    'loyer meublé',
  ],

  // Facturation électronique : réforme 2026/2027
  [Category.EInvoicing]: [
    'facturation électronique',
    'facture électronique',
    'e-invoicing',
    'e-reporting',
    'plateforme de dématérialisation partenaire',
    'pdp',
    'portail public de facturation',
    'ppf',
    'chorus pro',
    'réforme facturation',
    'obligation facturation',
    'dématérialisation facture',
    'dgfip facturation',
  ],

  [Category.General]: [],
};