import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Search, 
  SlidersHorizontal, 
  Flame, 
  Leaf, 
  Info, 
  Check, 
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';
import { Dish } from '../types';
import { DishImage } from './DishImage';

interface MenuSectionProps {
  dishes: Dish[];
  cart: { [key: number]: number };
  onAddToCart: (dish: Dish) => void;
  onSelectDish: (dish: Dish) => void;
  isOrderOnlineMode?: boolean;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  dishes,
  cart,
  onAddToCart,
  onSelectDish,
  isOrderOnlineMode = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [justAddedId, setJustAddedId] = useState<number | null>(null);

  const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

  const filteredDishes = dishes.filter((dish) => {
    const matchesCat = selectedCategory === 'All' || dish.category === selectedCategory;
    const matchesQuery = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiet = 
      dietaryFilter === 'all' 
        ? true 
        : dietaryFilter === 'veg' 
          ? dish.vegetarian 
          : !dish.vegetarian;

    return matchesCat && matchesQuery && matchesDiet;
  });

  const handleAddClick = (e: React.MouseEvent, dish: Dish) => {
    e.stopPropagation();
    onAddToCart(dish);
    setJustAddedId(dish.id);
    setTimeout(() => setJustAddedId(null), 700);
  };

  return (
    <section className="section-shell" id="menu-section">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#c5a059]/15">
        <div>
          <p className="eyebrow">{isOrderOnlineMode ? 'Curate Your Order' : 'Seasonal Menu'}</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-[#f4eee6]">
            Cooked over flame. Led by season.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#a3998b] max-w-2xl leading-relaxed">
            Every dish balances wood smoke, organic coastal sea salts and peak harvest produce from regional growers. Click any dish for chef notes, pairing suggestions, and details.
          </p>
        </div>

        {/* Dietary Quick Filter */}
        <div className="flex items-center gap-2 p-1 bg-[#14110f] border border-[#c5a059]/20 rounded-lg shrink-0">
          <button
            onClick={() => setDietaryFilter('all')}
            className={`px-3 py-1 text-xs uppercase tracking-wider rounded transition-all ${
              dietaryFilter === 'all' ? 'bg-[#c5a059] text-[#161311] font-medium' : 'text-[#a3998b] hover:text-[#f4eee6]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setDietaryFilter('veg')}
            className={`px-3 py-1 text-xs uppercase tracking-wider rounded flex items-center gap-1.5 transition-all ${
              dietaryFilter === 'veg' ? 'bg-emerald-700 text-white font-medium' : 'text-emerald-400 hover:text-emerald-300'
            }`}
          >
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Veg
          </button>
          <button
            onClick={() => setDietaryFilter('non-veg')}
            className={`px-3 py-1 text-xs uppercase tracking-wider rounded flex items-center gap-1.5 transition-all ${
              dietaryFilter === 'non-veg' ? 'bg-red-900 text-white font-medium' : 'text-red-400 hover:text-red-300'
            }`}
          >
            <span className="size-1.5 rounded-full bg-red-400" />
            Non-Veg
          </button>
        </div>
      </div>

      {/* Category Pills & Live Search Bar */}
      <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#c5a059] to-[#dfba74] text-[#161311] font-semibold shadow-md'
                  : 'border border-[#c5a059]/20 bg-[#1c1815] text-[#a3998b] hover:border-[#c5a059]/50 hover:text-[#f4eee6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3.5 top-3 size-4 text-[#c5a059]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ingredients, plates..."
            className="w-full pl-9 pr-4 py-2 bg-[#1c1815] border border-[#c5a059]/20 rounded-lg text-xs text-[#f4eee6] placeholder:text-[#a3998b]/60 focus:border-[#c5a059] outline-none transition-colors"
          />
        </div>
      </div>

      {/* Dishes Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDishes.length === 0 ? (
          <div className="col-span-full py-16 text-center border border-dashed border-[#c5a059]/20 rounded-xl bg-[#1c1815]/50">
            <p className="font-serif text-2xl text-[#f4eee6]">No dishes found</p>
            <p className="text-xs text-[#a3998b] mt-2">Try clearing your search query or dietary filters.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setDietaryFilter('all'); }}
              className="mt-4 px-4 py-1.5 text-xs text-[#dfba74] border border-[#c5a059]/30 rounded hover:bg-[#c5a059]/10"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredDishes.map((dish) => {
            const inCartQty = cart[dish.id] || 0;
            const isJustAdded = justAddedId === dish.id;

            return (
              <motion.article
                layout
                key={dish.id}
                onClick={() => onSelectDish(dish)}
                className="group rounded-xl border border-[#c5a059]/20 bg-[#1c1815] overflow-hidden hover:border-[#c5a059]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-xl hover:-translate-y-0.5"
              >
                <div>
                  {/* Top Image & Badges */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#161311]">
                    <DishImage dish={dish} className="size-full" />
                    
                    {dish.badge && (
                      <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-[#c5a059] text-[#161311] text-[10px] uppercase font-bold tracking-wider shadow">
                        {dish.badge}
                      </span>
                    )}

                    <div className="absolute top-3 right-3 z-10 size-6 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <span className={`size-2 rounded-full ${dish.vegetarian ? 'bg-emerald-400' : 'bg-red-500'}`} />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-[11px] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                      <Info className="size-3 text-[#dfba74]" /> Click for tasting notes & pairing
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-xl sm:text-2xl text-[#f4eee6] group-hover:text-[#dfba74] transition-colors line-clamp-1">
                        {dish.name}
                      </h3>
                      <span className="font-serif text-xl text-[#dfba74] font-medium shrink-0">
                        ₹{dish.price}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-[#a3998b] leading-relaxed line-clamp-2 min-h-[32px]">
                      {dish.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Row / Add Button */}
                <div className="px-5 pb-5 pt-2 border-t border-[#c5a059]/10 flex items-center justify-between">
                  <span className="text-[11px] text-[#a3998b] flex items-center gap-1.5">
                    <span className="capitalize">{dish.category}</span>
                    {dish.prepTime && <span>· {dish.prepTime}</span>}
                  </span>

                  <button
                    onClick={(e) => handleAddClick(e, dish)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 ${
                      isJustAdded
                        ? 'bg-emerald-600 text-white scale-105'
                        : inCartQty > 0
                          ? 'bg-[#c5a059] text-[#161311] hover:brightness-110'
                          : 'border border-[#c5a059]/30 text-[#dfba74] hover:bg-[#c5a059] hover:text-[#161311]'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="size-3" /> Added
                      </>
                    ) : inCartQty > 0 ? (
                      <>
                        <Check className="size-3" /> In Selection ({inCartQty})
                      </>
                    ) : (
                      <>
                        <Plus className="size-3" /> Add
                      </>
                    )}
                  </button>
                </div>
              </motion.article>
            );
          })
        )}
      </div>
    </section>
  );
};
