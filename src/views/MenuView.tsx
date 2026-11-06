import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dish, Category, ActivePage } from '../types';
import { MENU_ITEMS } from '../data/restaurantData';
import { useCart } from '../context/CartContext';
import { DishModal } from '../components/DishModal';
import { Search, Plus, Filter, ShoppingBag, Sparkles } from 'lucide-react';

interface MenuViewProps {
  setActivePage: (page: ActivePage) => void;
}

const CATEGORIES: Category[] = [
  'All',
  'Starters',
  'Mains',
  'Sides & Flatbreads',
  'Desserts',
  'Cocktails & Cellar'
];

export function MenuView({ setActivePage }: MenuViewProps) {
  const { addToCart, totalCount } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [chefSpecialsOnly, setChefSpecialsOnly] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter(dish => {
      // Category check
      if (selectedCategory !== 'All' && dish.category !== selectedCategory) {
        return false;
      }
      // Vegetarian filter
      if (vegOnly && !dish.vegetarian) {
        return false;
      }
      // Chef Special filter
      if (chefSpecialsOnly && !dish.badge?.includes('Special') && !dish.badge?.includes('Signature')) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = dish.name.toLowerCase().includes(q);
        const matchesDesc = dish.description.toLowerCase().includes(q);
        const matchesWood = dish.woodType?.toLowerCase().includes(q);
        return matchesName || matchesDesc || matchesWood;
      }
      return true;
    });
  }, [selectedCategory, vegOnly, chefSpecialsOnly, searchQuery]);

  const handleAdd = (dish: Dish, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(dish, 1);
  };

  return (
    <div className="pt-24 pb-20">
      {/* Menu Header */}
      <section className="border-b border-[#c5a059]/20 bg-[#14110f] px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <span className="eyebrow">The Seasonal Hearth</span>
          <h1 className="mt-3 font-serif text-5xl font-normal text-[#f4eee6] sm:text-6xl">
            Flame, season and restraint.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[#a3998b]">
            Every dish passes across our wood-burning hearth, kissed by coals, hickory, or applewood embers. Sourced directly from regional organic growers.
          </p>

          {/* Search and Filters Bar */}
          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-wider transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#c5a059] text-[#161311] font-medium shadow-[0_0_12px_rgba(197,160,89,0.3)]'
                      : 'border border-[#c5a059]/30 bg-[#1c1815] text-[#a3998b] hover:text-[#f4eee6] hover:border-[#c5a059]/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-64">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#c5a059]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search ingredients, dishes..."
                className="w-full rounded-full border border-[#c5a059]/30 bg-[#1c1815] py-2 pl-10 pr-4 text-xs text-[#f4eee6] outline-none placeholder:text-[#6e6457] focus:border-[#c5a059]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#a3998b] hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Quick Dietary Toggles */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#a3998b]">
            <span className="flex items-center gap-1.5 text-[#dfba74]">
              <Filter className="size-3.5" /> Dietary Filters:
            </span>

            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 transition-colors ${
                vegOnly
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                  : 'bg-[#1c1815] text-[#a3998b] hover:text-[#f4eee6]'
              }`}
            >
              <span className="size-2 rounded-full bg-emerald-500" />
              Vegetarian Only
            </button>

            <button
              onClick={() => setChefSpecialsOnly(!chefSpecialsOnly)}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 transition-colors ${
                chefSpecialsOnly
                  ? 'bg-[#c5a059]/20 text-[#dfba74] border border-[#c5a059]/50'
                  : 'bg-[#1c1815] text-[#a3998b] hover:text-[#f4eee6]'
              }`}
            >
              <Sparkles className="size-3 text-[#c5a059]" />
              Chef Specials
            </button>

            <span className="ml-auto text-[11px] text-[#6e6457]">
              Showing {filteredDishes.length} dishes
            </span>
          </div>
        </div>
      </section>

      {/* Menu Dishes Grid */}
      <section className="section-shell">
        {filteredDishes.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#c5a059]/30 p-12 text-center">
            <p className="font-serif text-2xl text-[#f4eee6]">No dishes match your filter</p>
            <p className="mt-2 text-xs text-[#a3998b]">
              Try clearing your search query or toggling off the vegetarian / special filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setVegOnly(false);
                setChefSpecialsOnly(false);
              }}
              className="mt-5 rounded-lg bg-[#c5a059] px-5 py-2 text-xs font-medium text-[#161311]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence>
              {filteredDishes.map((dish, idx) => (
                <motion.article
                  key={dish.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  onClick={() => setSelectedDish(dish)}
                  className="group cursor-pointer flex flex-col justify-between overflow-hidden rounded-xl border border-[#c5a059]/20 bg-[#1c1815] transition-all hover:border-[#c5a059]/60 hover:shadow-[0_4px_25px_rgba(0,0,0,0.6)]"
                >
                  {/* Photo & Badge */}
                  <div>
                    <div className="photo-hover relative aspect-square overflow-hidden bg-[#14110f]">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1c1815] via-transparent to-transparent opacity-80" />
                      {dish.badge && (
                        <span className="absolute left-3 top-3 rounded-full bg-[#c5a059] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#161311]">
                          {dish.badge}
                        </span>
                      )}
                      <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-[#dfba74] backdrop-blur-sm">
                        {dish.woodType ? dish.woodType.split(' ')[0] : 'Fire-Charred'}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-xl font-normal text-[#f4eee6] transition-colors group-hover:text-[#dfba74]">
                          {dish.name}
                        </h3>
                        <span className="font-serif text-lg font-medium text-[#c5a059]">₹{dish.price}</span>
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-[#a3998b] line-clamp-2">
                        {dish.description}
                      </p>

                      {dish.woodType && (
                        <p className="mt-3 text-[11px] text-[#dfba74]/80">
                          🔥 {dish.woodType}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#c5a059]/15 px-5 py-3">
                    <span className="flex items-center gap-1.5 text-[11px] text-[#8a8073]">
                      <span
                        className={`size-1.5 rounded-full ${dish.vegetarian ? 'bg-emerald-500' : 'bg-rose-500'}`}
                      />
                      {dish.vegetarian ? 'Vegetarian' : 'Non-veg'}
                    </span>

                    <button
                      onClick={e => handleAdd(dish, e)}
                      className="flex items-center gap-1.5 rounded-lg border border-[#c5a059]/30 bg-[#14110f] px-3 py-1.5 text-xs font-medium text-[#f4eee6] transition-all hover:border-[#c5a059] hover:bg-[#c5a059] hover:text-[#161311] active:scale-95"
                    >
                      <Plus className="size-3.5" /> Add
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Floating Cart Indicator */}
        {totalCount > 0 && (
          <div className="fixed bottom-6 right-6 z-30">
            <button
              onClick={() => {
                setActivePage('order-online');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 rounded-full bg-[#c5a059] px-5 py-3 font-semibold text-[#161311] shadow-2xl transition-all hover:bg-[#dfba74] hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="size-4" />
              <span>View Cart ({totalCount})</span>
            </button>
          </div>
        )}
      </section>

      {/* Dish Modal */}
      <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </div>
  );
}
