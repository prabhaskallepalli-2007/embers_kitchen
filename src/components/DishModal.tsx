import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Flame, 
  Clock, 
  Wine, 
  Plus, 
  Minus, 
  Check, 
  Heart,
  Sparkles
} from 'lucide-react';
import { Dish } from '../types';
import { DishImage } from './DishImage';
import { useCart } from '../context/CartContext';

interface DishModalProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToCart?: (dish: Dish, qty: number) => void;
}

export const DishModal: React.FC<DishModalProps> = ({ dish, onClose, onAddToCart }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  if (!dish) return null;

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(dish, quantity);
    } else {
      addToCart(dish, quantity);
    }
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#1c1815] border border-[#c5a059]/30 rounded-xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 size-8 rounded-full bg-black/60 text-[#f4eee6] hover:bg-black/90 flex items-center justify-center backdrop-blur-sm transition-colors"
            aria-label="Close dish details"
          >
            <X className="size-4" />
          </button>

          {/* Top Hero Image */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#161311]">
            <DishImage dish={dish} className="size-full object-cover" />
            
            {dish.badge && (
              <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#c5a059] text-[#161311] text-xs uppercase tracking-wider font-semibold shadow-md">
                {dish.badge}
              </span>
            )}

            <button
              onClick={() => setIsLiked(!isLiked)}
              className="absolute bottom-4 right-4 z-10 size-9 rounded-full bg-black/60 backdrop-blur-md text-[#f4eee6] flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Save dish to favorites"
            >
              <Heart className={`size-4.5 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded border ${
                    dish.vegetarian 
                      ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20' 
                      : 'border-red-500/40 text-red-400 bg-red-950/20'
                  }`}>
                    <span className={`size-1.5 rounded-full ${dish.vegetarian ? 'bg-emerald-400' : 'bg-red-500'}`} />
                    {dish.vegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
                  </span>
                  <span className="text-xs text-[#a3998b]">· {dish.category}</span>
                </div>
                <h3 className="font-serif text-3xl text-[#f4eee6]">{dish.name}</h3>
              </div>
              <p className="font-serif text-3xl text-[#dfba74] font-medium shrink-0">
                ₹{dish.price}
              </p>
            </div>

            <p className="text-sm text-[#a3998b] leading-relaxed">
              {dish.detailedDescription || dish.description}
            </p>

            {/* Culinary Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3 border-y border-[#c5a059]/15">
              {(dish.prepTime || dish.fireNotes) && (
                <div className="p-2.5 rounded bg-[#161311] border border-[#c5a059]/10">
                  <div className="flex items-center gap-1.5 text-xs text-[#a3998b] mb-1">
                    <Clock className="size-3 text-[#c5a059]" />
                    <span>Hearth Craft</span>
                  </div>
                  <p className="text-xs font-medium text-[#f4eee6] truncate">{dish.prepTime || dish.fireNotes}</p>
                </div>
              )}

              {(dish.calories || dish.woodType) && (
                <div className="p-2.5 rounded bg-[#161311] border border-[#c5a059]/10">
                  <div className="flex items-center gap-1.5 text-xs text-[#a3998b] mb-1">
                    <Flame className="size-3 text-[#c5a059]" />
                    <span>{dish.calories ? 'Calories' : 'Wood Flame'}</span>
                  </div>
                  <p className="text-xs font-medium text-[#f4eee6] truncate">
                    {dish.calories ? `~${dish.calories} kcal` : dish.woodType}
                  </p>
                </div>
              )}

              {dish.pairing && (
                <div className="col-span-2 sm:col-span-1 p-2.5 rounded bg-[#161311] border border-[#c5a059]/10">
                  <div className="flex items-center gap-1.5 text-xs text-[#a3998b] mb-1">
                    <Wine className="size-3 text-[#c5a059]" />
                    <span>Sommelier Pairing</span>
                  </div>
                  <p className="text-xs font-medium text-[#f4eee6] truncate">{dish.pairing}</p>
                </div>
              )}
            </div>

            {/* Quantity and Add CTA */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <div className="flex items-center border border-[#c5a059]/30 rounded-lg p-1 bg-[#161311]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="size-9 rounded hover:bg-[#c5a059]/20 text-[#f4eee6] flex items-center justify-center transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-10 text-center font-medium text-sm text-[#f4eee6]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="size-9 rounded hover:bg-[#c5a059]/20 text-[#f4eee6] flex items-center justify-center transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 py-3 px-6 rounded-lg font-medium text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#c5a059] hover:brightness-110 text-[#161311]'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="size-4" />
                    <span>Added to Selection</span>
                  </>
                ) : (
                  <>
                    <span>Add to Selection · ₹{dish.price * quantity}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
