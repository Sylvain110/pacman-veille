import { RSSFeed, Category} from './types';

export const PRESS_FEEDS: RSSFeed[] = [
  { name: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews", type: 'press' },
  { name: "BleepingComputer", url: "https://www.bleepingcomputer.com/feed/", type: 'press' },
  { name: "LeMagIT Sécurité", url: "https://www.lemagit.fr/rss/ContentSyndication.xml", type: 'press' },
  { name: "Wired Security", url: "https://www.wired.com/feed/category/security/latest/rss", type: 'press' },
  { name: "Zataz", url: "https://www.zataz.com/feed/", type: 'press' },
  { name: "Dyrk", url: "https://dyrk.org/feed/", type: 'press' }
];

export const ANSSI_FEEDS: RSSFeed[] = [
  { name: "Alertes", url: "https://www.cert.ssi.gouv.fr/alerte/feed/", type: 'anssi' },
  { name: "Menaces & Incidents", url: "https://www.cert.ssi.gouv.fr/cti/feed/", type: 'anssi' },
  { name: "Avis", url: "https://www.cert.ssi.gouv.fr/avis/feed/", type: 'anssi' },
  { name: "IOC", url: "https://www.cert.ssi.gouv.fr/ioc/feed/", type: 'anssi' },
  { name: "Durcissement", url: "https://www.cert.ssi.gouv.fr/dur/feed/", type: 'anssi' },
  { name: "Actualités", url: "https://www.cert.ssi.gouv.fr/actualite/feed/", type: 'anssi' }
];

export const ALL_FEEDS = [...PRESS_FEEDS, ...ANSSI_FEEDS];

export const CATEGORY_BADGE_STYLES: Record<Category, string> = {
  [Category.Ransomware]: 'bg-red-500/10 text-red-400 border-red-500/20',
  [Category.DataBreach]: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  [Category.Vulnerability]: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  [Category.Malware]: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  [Category.Phishing]: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  [Category.Espionage]: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  [Category.AISec]: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  [Category.General]: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  [Category.Ransomware]: 'fa-file-invoice-dollar',
  [Category.DataBreach]: 'fa-database',
  [Category.Vulnerability]: 'fa-bug',
  [Category.Malware]: 'fa-virus',
  [Category.Phishing]: 'fa-fish-fins',
  [Category.Espionage]: 'fa-user-secret',
  [Category.AISec]: 'fa-microchip',
  [Category.General]: 'fa-rss',
};

export const CATEGORY_COLORS: Record<Category, string> = {
  [Category.Ransomware]: 'text-red-400',
  [Category.DataBreach]: 'text-purple-400',
  [Category.Vulnerability]: 'text-orange-400',
  [Category.Malware]: 'text-yellow-400',
  [Category.Phishing]: 'text-pink-400',
  [Category.Espionage]: 'text-slate-300',
  [Category.AISec]: 'text-cyan-400',
  [Category.General]: 'text-blue-400',
};

export const CATEGORY_CHECKBOX_STYLES: Record<Category, string> = {
  [Category.Ransomware]: 'bg-red-500 border-red-500',
  [Category.DataBreach]: 'bg-purple-500 border-purple-500',
  [Category.Vulnerability]: 'bg-orange-500 border-orange-500',
  [Category.Malware]: 'bg-yellow-500 border-yellow-500',
  [Category.Phishing]: 'bg-pink-500 border-pink-500',
  [Category.Espionage]: 'bg-slate-500 border-slate-500',
  [Category.AISec]: 'bg-cyan-500 border-cyan-500',
  [Category.General]: 'bg-blue-500 border-blue-500',
};

export const CATEGORY_KEYWORDS: Record<Category, string[]> = {
  [Category.Ransomware]: [
    'ransomware', 'rançongiciel', 'encrypt', 'extortion', 'lockbit', 'clop', 'blackcat', 
    'play', 'akira', 'rhysida', 'qilin', 'cactus', 'royal', ' ransom', 'pay the ransom'
  ],
  [Category.DataBreach]: [
    'breach', 'leak', 'stolen', 'database', 'dump', 'compromise', 'hacked', 'fuite', 'données',
    'exposed', 'records', 'credentials', 'password', 'pii', 'gdpr', 'rgpd', 'cnil', 'ticketmaster', 'at&t'
  ],
  [Category.Vulnerability]: [
    'cve-', 'vuln', 'patch', 'zero-day', '0-day', 'flaw', 'exploit', 'bug', 'faille', 
    'critique', 'update', 'rce', 'remote code execution', 'injection', 'xss', 'overflow',
    'microsoft patch', 'update tuesday', 'kev', 'poc'
  ],
  [Category.Malware]: [
    'malware', 'trojan', 'backdoor', 'spyware', 'botnet', 'loader', 'stealer', 'rootkit', 
    'virus', 'worm', 'payload', 'infected', 'command and control', 'c2', 'rat', 'infostealer',
    'lumma', 'redline', 'cobalt strike', 'malicious'
  ],
  [Category.Phishing]: [
    'phishing', 'scam', 'hameçonnage', 'social engineering', 'smishing', 'vishing', 'fraud', 
    'lure', 'campaign', 'impersonat', 'fake', 'arnaque', 'escroquerie', 'bec', 'business email compromise'
  ],
  [Category.Espionage]: [
    'apt', 'state-sponsored', 'espionage', 'nation-state', 'fbi', 'nsa', 'cisa', 'doj', 'indictment',
    'russia', 'china', 'north korea', 'iran', 'lazarus', 'fancy bear', 'cozy bear', 'sandworm',
    'volt typhoon', 'midnight blizzard', 'apt28', 'apt29', 'cyberwar', 'intelligence'
  ],
  [Category.AISec]: [
    'ai ', 'artificial intelligence', 'llm', 'chatgpt', 'openai', 'deepfake', 'machine learning',
    'copilot', 'gemini', 'anthropic', 'nvidia', 'gpu', 'quantum', 'crypto', 'blockchain'
  ],
  [Category.General]: []
};