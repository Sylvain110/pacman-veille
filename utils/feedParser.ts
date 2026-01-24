import { ALL_FEEDS, CATEGORY_KEYWORDS } from '../constants';
import { Article, Category, FeedType, FeedProgress } from '../types';

const determineCategory = (title: string, description: string): Category => {
  const text = `${title} ${description}`.toLowerCase();
  
  if (CATEGORY_KEYWORDS[Category.Ransomware].some(k => text.includes(k))) return Category.Ransomware;
  if (CATEGORY_KEYWORDS[Category.Espionage].some(k => text.includes(k))) return Category.Espionage;
  if (CATEGORY_KEYWORDS[Category.Vulnerability].some(k => text.includes(k))) return Category.Vulnerability;
  if (CATEGORY_KEYWORDS[Category.DataBreach].some(k => text.includes(k))) return Category.DataBreach;
  if (CATEGORY_KEYWORDS[Category.Malware].some(k => text.includes(k))) return Category.Malware;
  if (CATEGORY_KEYWORDS[Category.Phishing].some(k => text.includes(k))) return Category.Phishing;
  if (CATEGORY_KEYWORDS[Category.AISec].some(k => text.includes(k))) return Category.AISec;

  return Category.General;
};

const parseDate = (dateStr: string): Date => {
  if (!dateStr) return new Date();
  
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d;
  
  const dSlash = new Date(dateStr.replace(/-/g, '/'));
  if (!isNaN(dSlash.getTime())) return dSlash;
  
 
  const sqlMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/);
  if (sqlMatch) {
    return new Date(
      parseInt(sqlMatch[1], 10),
      parseInt(sqlMatch[2], 10) - 1,
      parseInt(sqlMatch[3], 10),
      parseInt(sqlMatch[4], 10),
      parseInt(sqlMatch[5], 10),
      parseInt(sqlMatch[6], 10)
    );
  }
  
  return new Date();
};

const parseRSSContent = (xmlString: string, sourceName: string, feedType: FeedType): Article[] => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    
    const entries = Array.from(xmlDoc.querySelectorAll("item, entry"));

    return entries.map((item) => {

      const getText = (tag: string, alternateTag?: string) => {

        const simple = item.querySelector(tag)?.textContent;
        if (simple) return simple;
        

        const byTag = item.getElementsByTagName(tag)[0]?.textContent;
        if (byTag) return byTag;

        const byTagNS = item.getElementsByTagNameNS('*', tag)[0]?.textContent;
        if (byTagNS) return byTagNS;

        if (alternateTag) {
           const alt = item.getElementsByTagName(alternateTag)[0]?.textContent || 
                       item.getElementsByTagNameNS('*', alternateTag)[0]?.textContent;
           if (alt) return alt;
           

           const colonTag = item.getElementsByTagName('content:' + alternateTag)[0]?.textContent;
           if (colonTag) return colonTag;
        }

        return null;
      };
      
      const title = getText("title") || "No Title";
      
      let link = getText("link");
      if (!link) {
        link = item.querySelector("link")?.getAttribute("href") || "#";
      }
      
      const dateNode = item.querySelector("pubDate") || item.querySelector("dc\\:date") || item.querySelector("date") || item.querySelector("updated") || item.querySelector("published");
      const dateStr = dateNode?.textContent || new Date().toISOString();
      
      let description = getText("description") || 
                        getText("summary") || 
                        getText("content", "encoded") || 
                        getText("encoded") || "";
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(`<body>${description}</body>`, 'text/html');
      let textContent = doc.body.textContent || "";
      textContent = textContent.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
      const cleanDescription = textContent.slice(0, 180).trim() + (textContent.length > 180 ? "..." : "");

      return {
        id: link,
        title: title.trim(),
        link,
        pubDate: parseDate(dateStr),
        source: sourceName,
        category: determineCategory(title, cleanDescription),
        description: cleanDescription,
        feedType: feedType
      };
    });
  } catch (e) {
    console.warn(`XML Parsing exception for ${sourceName}:`, e);
    return [];
  }
};

const parseJSONFeed = (jsonString: string, sourceName: string, feedType: FeedType): Article[] => {
  try {
    const data = JSON.parse(jsonString);
    if (data.status !== 'ok' || !Array.isArray(data.items)) return [];

    return data.items.map((item: any) => {
      const title = item.title || "No Title";
      const rawDesc = item.description || item.content || "";
      const parser = new DOMParser();
      const doc = parser.parseFromString(`<body>${rawDesc}</body>`, 'text/html');
      const textContent = doc.body.textContent || "";
      const cleanDescription = textContent.slice(0, 180).trim() + (textContent.length > 180 ? "..." : "");

      return {
        id: item.guid || item.link,
        title: title.trim(),
        link: item.link,
        pubDate: parseDate(item.pubDate),
        source: sourceName,
        category: determineCategory(title, cleanDescription),
        description: cleanDescription,
        feedType: feedType
      };
    });
  } catch (e) {
    console.warn(`JSON Parsing exception for ${sourceName}:`, e);
    return [];
  }
};

const PROXIES = [
  "https://api.rss2json.com/v1/api.json?rss_url=%s",
  "https://api.codetabs.com/v1/proxy?quest=%s",
  "https://corsproxy.io/?%s", 
  "https://api.allorigins.win/get?url=%s",
  "https://api.allorigins.win/raw?url=%s",
  "https://thingproxy.freeboard.io/fetch/%s",
];

const fetchWithProxy = async (url: string): Promise<{ content: string, isJson: boolean }> => {
  const cacheBuster = Math.floor(Math.random() * 10000);
  const urlToFetch = url.includes('?')
    ? `${url}&_cb=${cacheBuster}`
    : `${url}?_cb=${cacheBuster}`;

  const proxyPromises = PROXIES.map(async (proxyTemplate) => {
    const proxyUrl = proxyTemplate.replace("%s", encodeURIComponent(urlToFetch));

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(proxyUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error('Response not OK');

      let text = await response.text();

      if (proxyTemplate.includes('api.allorigins.win/get')) {
        try {
          const wrapper = JSON.parse(text);
          if (wrapper.contents) text = wrapper.contents;
        } catch (e) { }
      }

      const trimmed = text.trim();

      if ((trimmed.startsWith('{') || trimmed.startsWith('[')) && trimmed.includes('"items"')) {
        return { content: trimmed, isJson: true };
      }

      if (trimmed.startsWith('<') && !trimmed.includes('<!DOCTYPE html>')) {
        return { content: trimmed, isJson: false };
      }

      throw new Error('Invalid content format');
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  });

  try {
    return await Promise.any(proxyPromises);
  } catch (err) {
    throw new Error(`Unable to fetch ${url} after trying all proxies`);
  }
};

export const fetchAllFeeds = async (
  onFeedLoaded?: (articles: Article[]) => void,
  onProgress?: (progress: FeedProgress) => void
): Promise<Article[]> => {
  const allArticles: Article[] = [];
  const total = ALL_FEEDS.length;
  let loaded = 0;

  const promises = ALL_FEEDS.map(async (feed) => {
    onProgress?.({ feedName: feed.name, status: 'loading', loaded, total });

    try {
      const { content, isJson } = await fetchWithProxy(feed.url);

      const items = isJson
        ? parseJSONFeed(content, feed.name, feed.type)
        : parseRSSContent(content, feed.name, feed.type);

      allArticles.push(...items);
      loaded++;

      onProgress?.({ feedName: feed.name, status: 'success', loaded, total });
      onFeedLoaded?.(
        [...allArticles].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
      );

      return items;
    } catch (error) {
      loaded++;
      onProgress?.({ feedName: feed.name, status: 'error', loaded, total });
      console.warn(`Error fetching ${feed.name}:`, error);
      return [];
    }
  });

  await Promise.all(promises);
  return allArticles.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
};

export const getRelativeTime = (date: Date): string => {
  if (isNaN(date.getTime())) return 'Date inconnue';
  
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 0) return 'À l\'instant';
  if (diffInSeconds < 60) return 'À l\'instant';
  if (diffInSeconds < 3600) return `Il y a ${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400) return `Il y a ${Math.floor(diffInSeconds / 3600)} h`;
  if (diffInSeconds < 604800) return `Il y a ${Math.floor(diffInSeconds / 86400)} j`;
  
  return date.toLocaleDateString('fr-FR');
};