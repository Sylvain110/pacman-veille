export enum Category {
  AI         = 'IA & Tech',
  Market     = 'Marché',
  Accounting = 'Comptabilité',
  Tools      = 'Outils',
  IMMOBILIER = 'Immobilier',
  EInvoicing = 'Facturation Électronique',
  General    = 'Général'
}
 
export type FeedType = 'press';
 
export interface RSSFeed {
  name: string;
  url: string;
  type: FeedType;
  filterCategory?: string;
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
  categories: Category[];
  searchQuery: string;
}
 
export type FeedStatus = 'pending' | 'loading' | 'success' | 'error';
 
export interface FeedProgress {
  feedName: string;
  status: FeedStatus;
  loaded: number;
  total: number;
}