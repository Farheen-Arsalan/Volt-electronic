import React from 'react';
import { 
  Smartphone, 
  Laptop, 
  Headphones, 
  Gamepad2, 
  Watch, 
  Camera, 
  Tv, 
  LayoutGrid
} from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface CategoryPillsProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'smartphones':
        return <Smartphone className="w-5 h-5" />;
      case 'laptops':
        return <Laptop className="w-5 h-5" />;
      case 'audio':
        return <Headphones className="w-5 h-5" />;
      case 'gaming':
        return <Gamepad2 className="w-5 h-5" />;
      case 'wearables':
        return <Watch className="w-5 h-5" />;
      case 'cameras':
        return <Camera className="w-5 h-5" />;
      case 'tv-home':
        return <Tv className="w-5 h-5" />;
      default:
        return <LayoutGrid className="w-5 h-5" />;
    }
  };

  return (
    <section id="categories-section" aria-label="Product Categories" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <span>Explore Departments</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
              Featured Categories
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Find the right device with authorized Middle East manufacturer warranties and instant in-store pickup options.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4">
          
          {/* "All" Category Pill */}
          <button
            id="category-pill-all"
            type="button"
            onClick={() => onSelectCategory('all')}
            className={`p-4 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-2 group ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 ring-2 ring-blue-600/30'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-white hover:shadow-md'
            }`}
          >
            <div className={`p-2.5 rounded-xl transition-colors ${
              selectedCategory === 'all'
                ? 'bg-white/20 text-white'
                : 'bg-white text-blue-600 shadow-sm border border-slate-100 group-hover:bg-blue-50'
            }`}>
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs font-bold truncate">All Tech</span>
              <span className={`text-[11px] ${selectedCategory === 'all' ? 'text-blue-100' : 'text-slate-600'}`}>
                Full Store
              </span>
            </div>
          </button>

          {/* Dynamic Categories */}
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                id={`category-pill-${cat.slug}`}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                className={`p-4 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-2 group ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 ring-2 ring-blue-600/30'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-white hover:shadow-md'
                }`}
              >
                <div className={`p-2.5 rounded-xl transition-colors ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-white text-blue-600 shadow-sm border border-slate-100 group-hover:bg-blue-50'
                }`}>
                  {getCategoryIcon(cat.slug)}
                </div>
                <div>
                  <span className="block text-xs font-bold truncate max-w-[120px]">{cat.name}</span>
                  <span className={`text-[11px] ${isSelected ? 'text-blue-100' : 'text-slate-600'}`}>
                    {cat.count} items
                  </span>
                </div>
              </button>
            );
          })}

        </div>

      </div>
    </section>
  );
};
