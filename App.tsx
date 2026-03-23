import { useState, useEffect, useMemo } from 'react';
import { Article, FilterState, Category, TimeFilter, FeedProgress } from './types';
import { PRESS_FEEDS } from './constants';
import { fetchAllFeeds } from './utils/feedParser';
import FilterSidebar from './components/FilterSidebar';
import ArticleCard from './components/ArticleCard';
import ArticleCardSkeleton from './components/ArticleCardSkeleton';
import PinkyIcon from './components/PinkyIcon';

const App = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [progress, setProgress] = useState<FeedProgress | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    time: '48h',
    sources: PRESS_FEEDS.map(f => f.name),
    categories: Object.values(Category),
    searchQuery: ''
  });

  useEffect(() => {
    const loadStyle = (href: string) => {
      if (document.querySelector(`link[rel="stylesheet"][href="${href}"]`)) return;
      const link = document.createElement('link');
      link.href = href;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    };

    loadStyle('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    loadStyle('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await fetchAllFeeds(
          (articles) => setArticles(articles),
          (prog) => setProgress(prog)
        );
      } catch (err) {
        setError('Impossible de récupérer les flux. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
        setProgress(null);
      }
    };
    loadData();
  }, []);

  const { filteredArticles, timeCounts } = useMemo(() => {
    const now = new Date();

    const contextArticles = articles.filter(article => {
      if (!filters.sources.includes(article.source)) return false;
      if (!filters.categories.includes(article.category)) return false;

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query)
        );
      }

      return true;
    });

    const checkTime = (articleDate: Date, filter: TimeFilter): boolean => {
      const diffMs = now.getTime() - articleDate.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);

      switch (filter) {
        case 'Today': return now.toDateString() === articleDate.toDateString();
        case '48h':   return diffHours <= 48;
        case 'Week':  return diffHours <= 24 * 7;
        case 'All':   return true;
        default:      return true;
      }
    };

    const counts: Record<TimeFilter, number> = {
      'Today': 0, '48h': 0, 'Week': 0, 'All': 0
    };

    contextArticles.forEach(article => {
      if (checkTime(article.pubDate, 'Today')) counts['Today']++;
      if (checkTime(article.pubDate, '48h'))   counts['48h']++;
      if (checkTime(article.pubDate, 'Week'))  counts['Week']++;
      if (checkTime(article.pubDate, 'All'))   counts['All']++;
    });

    const finalArticles = contextArticles.filter(article =>
      checkTime(article.pubDate, filters.time)
    );

    return { filteredArticles: finalArticles, timeCounts: counts };
  }, [articles, filters]);

  return (
    <div className="min-h-screen flex bg-cyber-900 font-sans text-gray-200">

      <FilterSidebar
        filters={filters}
        setFilters={setFilters}
        totalCount={filteredArticles.length}
        timeCounts={timeCounts}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 h-screen overflow-y-auto relative scroll-smooth">

        {/* Mobile header */}
        <div className="lg:hidden sticky top-0 z-30 bg-cyber-900/95 backdrop-blur border-b border-cyber-700 p-4 flex justify-between items-center shadow-md">
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <PinkyIcon className="w-5 h-5 text-[#FFB8FF]" />
            Veille Comptabilité & IA
          </h1>
          <div className="w-8"></div>
        </div>

        {/* Loading progress bar */}
        {loading && (
          <div className={`fixed top-0 left-0 right-0 z-50 bg-cyber-800/95 backdrop-blur border-b border-cyber-700 px-4 py-2 transition-opacity duration-300 ${progress ? 'opacity-100' : 'opacity-0'}`}>
            <div className="max-w-7xl mx-auto flex items-center gap-3 h-6">
              <div className="w-4 h-4 border-2 border-cyber-700 border-t-cyber-accent rounded-full animate-spin flex-shrink-0"></div>
              <div className="flex-1 flex items-center gap-3">
                <span className="text-sm text-gray-400 truncate">{progress?.feedName ?? ''}</span>
                <div className="flex-1 h-1.5 bg-cyber-900 rounded-full overflow-hidden max-w-xs">
                  <div
                    className="h-full bg-cyber-accent transition-all duration-300 ease-out"
                    style={{ width: progress ? `${(progress.loaded / progress.total) * 100}%` : '0%' }}
                  />
                </div>
                <span className="text-sm text-gray-500 flex-shrink-0">
                  {progress ? `${progress.loaded}/${progress.total}` : ''}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 lg:p-8 max-w-7xl mx-auto pb-24">

          {/* Desktop header */}
          <div className="mb-8 hidden lg:block">
            <h1 className="text-3xl font-bold text-white mb-2">
              Veille Comptabilité, IA & LMNP
            </h1>
            <p className="text-gray-400 mb-4">
              Actualités agrégées en temps réel : intelligence artificielle, comptabilité,
              facturation électronique, marchés et investissement locatif meublé.
            </p>

            {filters.searchQuery && (
              <div className="inline-flex items-center gap-2 bg-cyber-accent/10 text-cyber-accent px-3 py-1 rounded-lg border border-cyber-accent/30">
                <i className="fa-solid fa-magnifying-glass text-sm"></i>
                <span className="text-sm font-medium">Résultats pour "{filters.searchQuery}"</span>
                <button
                  onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                  className="ml-1 hover:text-white"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            )}
          </div>

          {/* Skeleton while initial load */}
          {loading && articles.length === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <ArticleCardSkeleton key={`skeleton-${i}`} />
              ))}
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl text-center">
              <i className="fa-solid fa-triangle-exclamation text-3xl text-red-500 mb-3"></i>
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filteredArticles.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 bg-cyber-800 rounded-full flex items-center justify-center mb-4">
                <i className="fa-solid fa-filter text-gray-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Aucun élément trouvé</h3>
              <p className="text-gray-400">
                {filters.searchQuery
                  ? `Aucun résultat pour "${filters.searchQuery}" dans cette période.`
                  : 'Essayez d\'ajuster le filtre temporel ou d\'activer plus de sources.'}
              </p>
            </div>
          )}

          {/* Article grid */}
          {!error && filteredArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard key={`${article.source}-${article.id}`} article={article} />
              ))}
              {loading && progress &&
                Array.from({ length: Math.min(6, progress.total - progress.loaded) }).map((_, i) => (
                  <ArticleCardSkeleton key={`skeleton-loading-${i}`} />
                ))
              }
            </div>
          )}

        </div>

        {/* Mobile FAB */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-cyber-accent text-white rounded-full shadow-lg shadow-cyber-accent/30 flex items-center justify-center text-xl hover:bg-sky-400 transition-transform active:scale-95"
          aria-label="Ouvrir les filtres"
        >
          {filters.searchQuery
            ? <i className="fa-solid fa-magnifying-glass"></i>
            : <i className="fa-solid fa-sliders"></i>
          }
        </button>

      </main>
    </div>
  );
};

export default App;
