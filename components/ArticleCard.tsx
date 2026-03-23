import { useState } from 'react';
import { Article, Category } from '../types';
import { getRelativeTime } from '../utils/feedParser';
import { CATEGORY_BADGE_STYLES, CATEGORY_ICONS } from '../constants';

interface ArticleCardProps {
  article: Article;
}

interface CategoryBadgeProps {
  category: Category;
}

const CategoryBadge = ({ category }: CategoryBadgeProps) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${CATEGORY_BADGE_STYLES[category]}`}>
    <i className={`fa-solid ${CATEGORY_ICONS[category]} text-[10px]`}></i>
    {category}
  </span>
);

const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

// Sources francophones natives (indicateur visuel bleu vs vert pour les sources EN)
const FRENCH_SOURCE_KEYWORDS = [
  'LeMagIT', 'Zataz', 'Dyrk', 'FrenchWeb',
  'Les Echos', 'BFM', 'Compta Online',
  'Le Monde Informatique', 'DGFIP',
  'Service Public', 'Boursorama', 'SeLoger'
];

const isFrenchSource = (source: string): boolean =>
  FRENCH_SOURCE_KEYWORDS.some(kw => source.includes(kw));

const ArticleCard = ({ article }: ArticleCardProps) => {
  const [showCopied, setShowCopied] = useState(false);

  const hasValidLink = isValidUrl(article.link);
  const isNativeFrench = isFrenchSource(article.source);

  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: article.description,
      url: article.link
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.debug('Share cancelled or failed', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(article.link);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } catch (err) {
        console.error('Clipboard failed', err);
      }
    }
  };

  return (
    <article className="group relative bg-cyber-800 border border-cyber-700 rounded-xl p-5 hover:border-cyber-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-900/50 hover:-translate-y-1 flex flex-col h-full min-h-[220px]">
      <div className="flex-1">
        <div className="flex items-start justify-between mb-3 gap-2">
          <CategoryBadge category={article.category} />
          <time
            dateTime={article.pubDate.toISOString()}
            className="text-xs text-gray-500 font-mono whitespace-nowrap"
          >
            {getRelativeTime(article.pubDate)}
          </time>
        </div>

        <h3 className="text-lg font-semibold text-gray-100 mb-2 leading-snug group-hover:text-cyber-accent transition-colors">
          {article.title}
        </h3>

        <p className="text-sm text-gray-400 line-clamp-3 mb-4 transition-opacity duration-300">
          {article.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-cyber-700/50 mt-auto">
        <span className="text-xs font-bold text-gray-300 flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isNativeFrench ? 'bg-blue-500' : 'bg-emerald-500'}`}></span>
          {article.source}
        </span>

        <div className="flex items-center gap-3">
          {hasValidLink && (
            <button
              onClick={handleShare}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-cyber-900/50 text-gray-400 hover:text-cyber-accent hover:bg-cyber-700 transition-all relative"
              title="Partager"
            >
              <i className={`fa-solid ${showCopied ? 'fa-check text-green-400' : 'fa-share-nodes'} text-xs`}></i>
              {showCopied && (
                <span className="absolute bottom-full mb-2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded shadow border border-cyber-700 whitespace-nowrap z-10">
                  Lien copié !
                </span>
              )}
            </button>
          )}

          {hasValidLink ? (
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-cyber-accent hover:text-white flex items-center gap-1 transition-colors ml-1"
            >
              Lire
              <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
            </a>
          ) : (
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <i className="fa-solid fa-triangle-exclamation text-xs text-amber-500"></i>
              Lien invalide
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
