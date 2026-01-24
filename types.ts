export enum Category {
  Ransomware = 'Ransomware',
  DataBreach = 'Fuite de Données',
  Vulnerability = 'Vulnérabilité',
  Malware = 'Malware',
  Phishing = 'Hameçonnage',
  Espionage = 'Gouv & APT',
  AISec = 'IA & Tech',
  General = 'Général'
}

export type FeedType = 'press' | 'anssi';

export interface RSSFeed {
  name: string;
  url: string;
  type: FeedType;
}

export interface Article {
  id: string;
  title: string;
  link: string;
  pubDate: Date;
  source: string;
  category: Category;
  description: string;
  feedType: FeedType;
}

export type TimeFilter = 'Today' | '48h' | 'Week' | 'All';

export interface FilterState {
  time: TimeFilter;
  sources: string[];
  anssiThemes: string[];
  categories: Category[];
  viewMode: FeedType;
  searchQuery: string;
}

export type FeedStatus = 'pending' | 'loading' | 'success' | 'error';

export interface FeedProgress {
  feedName: string;
  status: FeedStatus;
  loaded: number;
  total: number;
}