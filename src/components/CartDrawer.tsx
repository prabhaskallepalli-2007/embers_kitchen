import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ExternalLink, 
  ArrowRight, 
  Check, 
  Sparkles,
  Percent
} from 'lucide-react';
import { Dish, CartItem } from '../types';
import { DishImage } from './DishImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: { [key: number]: number };
  dishes: Dish[];
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
  onClear: () => void;
  onProceedDelivery: (platform: 'zomato' | 'swiggy' | 'direct') => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  dishes,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
  onProceedDelivery,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const cartItems: { dish: Dish; quantity: number }[] = Object.entries(cart)
    .filter(([_, qty]) => qty > 0)
    .map(([idStr, qty]) => {
      const dish = dishes.find(d => d.id === parseInt(idStr, 10));
      return dish ? { dish, quantity: qty } : null;
    })
    .filter((item): item is { dish: Dish; quantity: number } => item !== null);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.dish.price * item.quantity), 0);
  const discountAmount = discountApplied ? Math.round(subtotal * 0.15) : 0;
  const packagingFee = subtotal > 0 ? 50 : 0;
  const estimatedTax = Math.round((subtotal - discountAmount) * 0.05);
  const finalTotal = Math.max(0, subtotal - discountAmount + packagingFee + estimatedTax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'EMBER15') {
      setDiscountApplied(true);
      setPromoError('');
    } else {
      setPromoError('Use code EMBER15 for 15% off');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Slide-over panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#181411] border-l border-[#c5a059]/25 shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#c5a059]/15 flex items-center justify-between bg-[#14110f]">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#dfba74]">
                  <ShoppingBag className="size-4" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-[#f4eee6]">Your Selection</h3>
                  <p className="text-xs text-[#a3998b]">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} chosen
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {cartItems.length > 0 && (
                  <button
                    onClick={onClear}
                    className="p-1.5 text-xs text-[#a3998b] hover:text-[#f87171] transition-colors"
                    title="Clear selection"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 text-[#a3998b] hover:text-[#f4eee6] rounded-md hover:bg-white/5 transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Drawer Body - Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="size-16 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/20 flex items-center justify-center text-[#dfba74] mb-4">
                    <ShoppingBag className="size-8 stroke-[1.2]" />
                  </div>
                  <h4 className="font-serif text-2xl text-[#f4eee6]">Selection is empty</h4>
                  <p className="text-sm text-[#a3998b] mt-2 max-w-xs leading-relaxed">
                    Explore our wood-fired starters, flame-roasted mains and artisan desserts to curate your meal.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2.5 bg-[#c5a059] text-[#161311] text-xs uppercase tracking-wider font-semibold rounded hover:brightness-110"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {cartItems.map(({ dish, quantity }) => (
                      <div
                        key={dish.id}
                        className="flex items-center gap-3 p-3 rounded-lg border border-[#c5a059]/15 bg-[#1f1a16] transition-all hover:border-[#c5a059]/30"
                      >
                        <DishImage dish={dish} className="size-16 rounded object-cover shrink-0" />
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-lg text-[#f4eee6] truncate">{dish.name}</h4>
                          <p className="text-xs text-[#c5a059] font-medium">₹{dish.price} each</p>
                          <span className="text-[10px] text-[#a3998b] block">{dish.category}</span>
                        </div>

                        {/* Quantity Adjuster */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onDecrease(dish.id)}
                            className="size-7 rounded border border-[#c5a059]/30 hover:border-[#c5a059] hover:bg-[#c5a059]/10 text-[#f4eee6] flex items-center justify-center transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-5 text-center text-sm font-medium">{quantity}</span>
                          <button
                            onClick={() => onIncrease(dish.id)}
                            className="size-7 rounded border border-[#c5a059]/30 hover:border-[#c5a059] hover:bg-[#c5a059]/10 text-[#f4eee6] flex items-center justify-center transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="size-3" />
                          </button>
                          <button
                            onClick={() => onRemove(dish.id)}
                            className="size-7 ml-1 text-[#a3998b] hover:text-[#f87171] transition-colors flex items-center justify-center"
                            aria-label="Remove item"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo Code Box */}
                  <div className="pt-2">
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Promo code (try EMBER15)"
                          className="w-full bg-[#14110f] border border-[#c5a059]/20 rounded px-3 py-2 text-xs text-[#f4eee6] placeholder:text-[#a3998b]/60 focus:border-[#c5a059] outline-none"
                        />
                        <Percent className="absolute right-3 top-2.5 size-3.5 text-[#a3998b]" />
                      </div>
                      <button
                        type="submit"
                        className="px-3.5 py-2 bg-[#2a241f] border border-[#c5a059]/30 hover:bg-[#c5a059]/20 text-xs text-[#dfba74] uppercase tracking-wider rounded font-medium"
                      >
                        Apply
                      </button>
                    </form>
                    {discountApplied && (
                      <p className="mt-1.5 text-xs text-emerald-400 flex items-center gap-1">
                        <Check className="size-3" /> EMBER15 applied (-15% on dining)
                      </p>
                    )}
                    {promoError && (
                      <p className="mt-1.5 text-xs text-amber-400">{promoError}</p>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Drawer Footer - Calculations & Dispatch */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-[#c5a059]/20 bg-[#14110f] space-y-4">
                {/* Cost breakdown */}
                <div className="space-y-1.5 text-xs text-[#a3998b]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#f4eee6]">₹{subtotal}</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount (15%)</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Eco-Packaging & Cutlery</span>
                    <span className="text-[#f4eee6]">₹{packagingFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span className="text-[#f4eee6]">₹{estimatedTax}</span>
                  </div>
                  <div className="pt-2 border-t border-[#c5a059]/15 flex justify-between text-sm font-serif">
                    <span className="text-[#dfba74] text-base">Estimated Total</span>
                    <span className="text-xl text-[#dfba74] font-medium">₹{finalTotal}</span>
                  </div>
                </div>

                {/* Direct Partner Dispatch CTAs */}
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#a3998b] mb-2 font-medium">
                    Order via delivery partner
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onProceedDelivery('zomato')}
                      className="py-2.5 px-3 bg-[#e23744] hover:bg-[#c92f3b] text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-all shadow"
                    >
                      <span>Zomato</span>
                      <ExternalLink className="size-3.5" />
                    </button>
                    <button
                      onClick={() => onProceedDelivery('swiggy')}
                      className="py-2.5 px-3 bg-[#fc8019] hover:bg-[#e67313] text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-all shadow"
                    >
                      <span>Swiggy</span>
                      <ExternalLink className="size-3.5" />
                    </button>
                  </div>
                  <p className="mt-2 text-[10px] text-[#a3998b]/75 text-center">
                    Dishes will be opened in your selected delivery partner's portal.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
