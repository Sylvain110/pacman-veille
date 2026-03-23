import React, { useState } from 'react';
import { FilterState, TimeFilter, Category } from '../types';
import { PRESS_FEEDS, CATEGORY_ICONS, CATEGORY_COLORS, CATEGORY_CHECKBOX_STYLES } from '../constants';
import PinkyIcon from './PinkyIcon';

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalCount: number;
  timeCounts: Record<TimeFilter, number>;
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  totalCount,
  timeCounts,
  isOpen,
  onClose
}) => {
  const [isSourcesExpanded, setIsSourcesExpanded] = useState(false);

  const handleTimeChange = (time: TimeFilter) => {
    setFilters(prev => ({ ...prev, time }));
  };

  const toggleSource = (sourceName: string) => {
    setFilters(prev => {
      const exists = prev.sources.includes(sourceName);
      return {
        ...prev,
        sources: exists
          ? prev.sources.filter(s => s !== sourceName)
          : [...prev.sources, sourceName]
      };
    });
  };

  const toggleCategory = (cat: Category) => {
    setFilters(prev => {
      const exists = prev.categories.includes(cat);
      return {
        ...prev,
        categories: exists
          ? prev.categories.filter(c => c !== cat)
          : [...prev.categories, cat]
      };
    });
  };

  const allCategories = Object.values(Category);
  const isAllCategoriesSelected = filters.categories.length === allCategories.length;
  const isAllSourcesSelected = filters.sources.length === PRESS_FEEDS.length;

  const timeOptions: { label: string; value: TimeFilter }[] = [
    { label: "Aujourd'hui", value: 'Today' },
    { label: 'Dernières 48h',  value: '48h'   },
    { label: 'Cette semaine',  value: 'Week'  },
    { label: 'Tout',           value: 'All'   },
  ];

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside className={`
        fixed z-50 bg-cyber-800 border-cyber-700
        transition-transform duration-300 ease-out
        overflow-y-auto
        inset-x-0 bottom-0
        w-full max-h-[85vh]
        rounded-t-2xl border-t border-r-0
        ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        lg:static lg:inset-auto
        lg:w-72 lg:h-screen lg:max-h-screen
        lg:rounded-none lg:border-r lg:border-t-0
        lg:translate-y-0
      `}>

        {/* Mobile drag handle */}
        <div className="lg:hidden flex justify-center py-3" onClick={onClose}>
          <div className="w-12 h-1 bg-cyber-700 rounded-full"></div>
        </div>

        <div className="px-6 pb-8 lg:p-6 lg:pt-6">

          {/* Logo */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <PinkyIcon className="w-5 h-5 text-[#FFB8FF]" />
              Veille Compta & IA
            </h1>
            <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white p-2">
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
              <input
                type="text"
                placeholder="Rechercher (mots-clés…)"
                value={filters.searchQuery || ''}
                onChange={e => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full bg-cyber-900 border border-cyber-700 text-white text-sm rounded-lg pl-9 pr-8 py-2.5 focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent outline-none transition-all placeholder-gray-500"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  <i className="fa-solid fa-xmark text-xs"></i>
                </button>
              )}
            </div>
          </div>

          {/* Time filter */}
          <div className="mb-6">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Période</h2>
            <div className="space-y-2">
              {timeOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleTimeChange(option.value)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-sm border transition-all ${
                    filters.time === option.value
                      ? 'bg-cyber-accent/10 border-cyber-accent text-white'
                      : 'bg-cyber-900 border-cyber-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    filters.time === option.value
                      ? 'bg-cyber-accent text-white'
                      : 'bg-cyber-800 text-gray-500'
                  }`}>
                    {timeCounts[option.value]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Catégories</h2>
              <button
                onClick={() => setFilters(prev => ({
                  ...prev,
                  categories: isAllCategoriesSelected ? [] : allCategories
                }))}
                className="text-cyber-accent hover:text-white transition-colors p-1"
                title={isAllCategoriesSelected ? 'Tout décocher' : 'Tout cocher'}
              >
                {isAllCategoriesSelected
                  ? <i className="fa-solid fa-xmark"></i>
                  : <i className="fa-solid fa-check-double"></i>
                }
              </button>
            </div>

            <div className="space-y-2">
              {allCategories.map(cat => {
                const isSelected = filters.categories.includes(cat);
                return (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group py-0.5">
                    <div className={`
                      w-4 h-4 rounded border flex items-center justify-center transition-colors flex-shrink-0
                      ${isSelected
                        ? CATEGORY_CHECKBOX_STYLES[cat]
                        : 'border-gray-500 bg-transparent group-hover:border-gray-300'}
                    `}>
                      {isSelected && <i className="fa-solid fa-check text-[10px] text-white"></i>}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isSelected}
                      onChange={() => toggleCategory(cat)}
                    />
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 flex justify-center ${isSelected ? CATEGORY_COLORS[cat] : 'text-gray-500 group-hover:text-gray-400'}`}>
                        <i className={`fa-solid ${CATEGORY_ICONS[cat]} text-xs`}></i>
                      </div>
                      <span className={`text-sm ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                        {cat}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Sources */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3 select-none">
              <button
                onClick={() => setIsSourcesExpanded(!isSourcesExpanded)}
                className="flex items-center gap-2 group w-full text-left focus:outline-none"
              >
                <i className={`fa-solid fa-chevron-${isSourcesExpanded ? 'down' : 'right'} text-[10px] text-gray-500 group-hover:text-white transition-colors w-3`}></i>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors">
                  Sources
                </h2>
              </button>

              {isSourcesExpanded && (
                <button
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    sources: isAllSourcesSelected ? [] : PRESS_FEEDS.map(f => f.name)
                  }))}
                  className="text-cyber-accent hover:text-white transition-colors p-1 flex-shrink-0 ml-2"
                  title={isAllSourcesSelected ? 'Tout décocher' : 'Tout cocher'}
                >
                  {isAllSourcesSelected
                    ? <i className="fa-solid fa-xmark"></i>
                    : <i className="fa-solid fa-check-double"></i>
                  }
                </button>
              )}
            </div>

            {isSourcesExpanded && (
              <div className="space-y-2">
                {PRESS_FEEDS.map(feed => {
                  const isSelected = filters.sources.includes(feed.name);
                  return (
                    <label key={feed.name} className="flex items-center gap-3 cursor-pointer group py-0.5">
                      <div className={`
                        w-4 h-4 rounded border flex items-center justify-center transition-colors flex-shrink-0
                        ${isSelected
                          ? 'bg-emerald-500 border-emerald-500'
                          : 'border-gray-500 bg-transparent group-hover:border-gray-300'}
                      `}>
                        {isSelected && <i className="fa-solid fa-check text-[10px] text-white"></i>}
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={isSelected}
                        onChange={() => toggleSource(feed.name)}
                      />
                      <span className={`text-sm truncate ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                        {feed.name}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Total counter */}
          <div className="mt-8 pt-6 border-t border-cyber-700">
            <div className="text-center p-3 bg-cyber-900/50 rounded-lg border border-cyber-700">
              <span className="block text-2xl font-bold text-white">{totalCount}</span>
              <span className="text-xs text-gray-400 uppercase">Articles affichés</span>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
