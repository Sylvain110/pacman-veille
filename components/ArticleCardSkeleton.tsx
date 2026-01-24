const ArticleCardSkeleton = () => {
  return (
    <div className="group relative bg-cyber-800 border border-cyber-700 rounded-xl p-5 flex flex-col h-full min-h-[220px]">
      <div className="flex-1">
        <div className="flex items-start justify-between mb-3 gap-2">
          <div className="h-5 w-20 bg-cyber-700 rounded-full animate-pulse"></div>
          <div className="h-4 w-16 bg-cyber-700 rounded animate-pulse"></div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="h-5 w-full bg-cyber-700 rounded animate-pulse"></div>
          <div className="h-5 w-3/4 bg-cyber-700 rounded animate-pulse"></div>
        </div>

        <div className="space-y-2">
          <div className="h-4 w-full bg-cyber-700/60 rounded animate-pulse"></div>
          <div className="h-4 w-full bg-cyber-700/60 rounded animate-pulse"></div>
          <div className="h-4 w-2/3 bg-cyber-700/60 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-cyber-700/50 mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyber-700 animate-pulse"></div>
          <div className="h-3 w-24 bg-cyber-700 rounded animate-pulse"></div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-cyber-700/50 animate-pulse"></div>
          <div className="h-4 w-12 bg-cyber-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;
