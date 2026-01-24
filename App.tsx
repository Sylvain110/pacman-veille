import { useState, useEffect, useMemo } from 'react';
import { Article, FilterState, Category, TimeFilter } from './types';
import { PRESS_FEEDS, ANSSI_FEEDS } from './constants';
import { fetchAllFeeds } from './utils/feedParser';
import FilterSidebar from './components/FilterSidebar';
import ArticleCard from './components/ArticleCard';
import PinkyIcon from './components/PinkyIcon';

const App = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    time: '48h',
    sources: PRESS_FEEDS.map(f => f.name),
    anssiThemes: ANSSI_FEEDS.map(f => f.name),
    categories: Object.values(Category),
    viewMode: 'press',
    searchQuery: ''
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchAllFeeds();
        setArticles(data);
      } catch (err) {
        setError('Impossible de récupérer les flux. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const { filteredArticles, timeCounts } = useMemo(() => {
    const now = new Date();

    const contextArticles = articles.filter(article => {
      if (article.feedType !== filters.viewMode) return false;

      const allowedSources = filters.viewMode === 'press' ? filters.sources : filters.anssiThemes;
      if (!allowedSources.includes(article.source)) return false;

      if (filters.viewMode === 'press') {
        if (!filters.categories.includes(article.category)) return false;
      }

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return article.title.toLowerCase().includes(query) || 
               article.description.toLowerCase().includes(query);
      }

      return true;
    });

    const checkTime = (articleDate: Date, filter: TimeFilter): boolean => {
      const diffMs = now.getTime() - articleDate.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);

      switch (filter) {
        case 'Today': return now.toDateString() === articleDate.toDateString();
        case '48h': return diffHours <= 48;
        case 'Week': return diffHours <= 24 * 7;
        case 'All': return true;
        default: return true;
      }
    };

    const counts: Record<TimeFilter, number> = {
      'Today': 0, '48h': 0, 'Week': 0, 'All': 0
    };

    contextArticles.forEach(article => {
      if (checkTime(article.pubDate, 'Today')) counts['Today']++;
      if (checkTime(article.pubDate, '48h')) counts['48h']++;
      if (checkTime(article.pubDate, 'Week')) counts['Week']++;
      if (checkTime(article.pubDate, 'All')) counts['All']++;
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
        <div className="lg:hidden sticky top-0 z-30 bg-cyber-900/95 backdrop-blur border-b border-cyber-700 p-4 flex justify-between items-center shadow-md">
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <PinkyIcon className="w-5 h-5 text-[#FFB8FF]" />
            {filters.viewMode === 'press' ? 'Pacman Veille' : 'Moniteur ANSSI'}
          </h1>
          <div className="w-8"></div> 
        </div>

        <div className="p-4 lg:p-8 max-w-7xl mx-auto pb-24">
          <div className="mb-8 hidden lg:block">
            <h1 className="text-3xl font-bold text-white mb-2">
              {filters.viewMode === 'press' ? 'Actualités Cyber' : 'Moniteur ANSSI'}
            </h1>
            <p className="text-gray-400 mb-4">
              {filters.viewMode === 'press' 
                ? 'Actualités et alertes de sécurité agrégées en temps réel.' 
                : 'Alertes et rapports officiels de l\'Agence Nationale de la Sécurité des Systèmes d\'Information.'}
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

          {loading && (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="w-12 h-12 border-4 border-cyber-700 border-t-cyber-accent rounded-full animate-spin"></div>
              <p className="text-gray-400 animate-pulse">Scan des fréquences...</p>
            </div>
          )}

          {!loading && error && (
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl text-center">
              <i className="fa-solid fa-triangle-exclamation text-3xl text-red-500 mb-3"></i>
              <p className="text-red-400">{error}</p>
            </div>
          )}

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

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard key={`${article.source}-${article.id}`} article={article} />
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-cyber-accent text-white rounded-full shadow-lg shadow-cyber-accent/30 flex items-center justify-center text-xl hover:bg-sky-400 transition-transform active:scale-95"
          aria-label="Open Filters"
        >
          {filters.searchQuery ? <i className="fa-solid fa-magnifying-glass"></i> : <i className="fa-solid fa-sliders"></i>}
        </button>

      </main>
    </div>
  );
};

export default App;