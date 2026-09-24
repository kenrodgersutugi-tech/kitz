import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { JerseyCategory } from '../types';

interface CategoryFilterProps {
  activeCategory: JerseyCategory;
  onSelectCategory: (cat: JerseyCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalResults: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalResults,
}) => {
  const categories: { id: JerseyCategory; label: string; count?: string }[] = [
    { id: 'all', label: 'All Jerseys' },
    { id: 'new-drops', label: 'New Drops' },
    { id: 'retro', label: 'Retro' },
    { id: 'training', label: 'Training' },
  ];

  return (
    <div className="w-full space-y-4 mb-8">
      {/* Search and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search team, club, or jersey..."
            className="w-full pl-10 pr-9 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-lime-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown & Result Count */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-neutral-400">
          <span className="tabular-nums font-mono">
            {totalResults} {totalResults === 1 ? 'kit' : 'kits'} found
          </span>

          <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent text-xs text-neutral-200 focus:outline-none cursor-pointer pr-1"
            >
              <option value="featured" className="bg-neutral-900 text-neutral-200">
                Featured / Best
              </option>
              <option value="price-asc" className="bg-neutral-900 text-neutral-200">
                Price: Low to High
              </option>
              <option value="price-desc" className="bg-neutral-900 text-neutral-200">
                Price: High to Low
              </option>
              <option value="name" className="bg-neutral-900 text-neutral-200">
                Club Name A-Z
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Segmented Category Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-lime-400 text-neutral-950 shadow-md'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-850 border border-neutral-800/80'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
