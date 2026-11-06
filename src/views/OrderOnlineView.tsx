import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';
import { Dish, ActivePage } from '../types';
import { DishModal } from '../components/DishModal';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ExternalLink,
  MessageCircle,
  Clock,
  MapPin,
  CheckCircle2,
  CookingPot,
  Bike,
  UtensilsCrossed,
  ArrowRight
} from 'lucide-react';

interface OrderOnlineViewProps {
  setActivePage: (page: ActivePage) => void;
}

export function OrderOnlineView({ setActivePage }: OrderOnlineViewProps) {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalCount,
    subtotal,
    gstAmount,
    grandTotal,
    getOrderSummaryText
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [cookingNotes, setCookingNotes] = useState('');
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [orderSimulated, setOrderSimulated] = useState(false);
  const [simulationStage, setSimulationStage] = useState<
    'received' | 'cooking' | 'out_for_delivery'
  >('received');
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleSimulateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setOrderSimulated(true);
    setSimulationStage('received');

    setTimeout(() => {
      setSimulationStage('cooking');
    }, 2800);

    setTimeout(() => {
      setSimulationStage('out_for_delivery');
    }, 6000);
  };

  const handleWhatsAppOrder = () => {
    const text = getOrderSummaryText(customerName, address);
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/919820012345?text=${encoded}`, '_blank');
  };

  const handleCopySummary = () => {
    const text = getOrderSummaryText(customerName, address);
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2200);
  };

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="border-b border-[#c5a059]/20 bg-[#14110f] px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="eyebrow">{cart.length > 0 ? 'Your Shopping Cart' : 'Order Online & Takeout'}</span>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f4eee6]">
              {cart.length > 0 ? 'Review Your Cart' : 'From our hearth to your table.'}
            </h1>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#a3998b]">
              {cart.length > 0
                ? 'Review your selected wood-fired items, customize quantities, or add more dishes from our seasonal menu before placing your order.'
                : 'Your cart is currently empty. Browse our seasonal wood-fired menu to select appetizers, mains, and cellar drinks.'}
            </p>
          </div>

          <button
            onClick={() => {
              setActivePage('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="self-start md:self-auto inline-flex items-center gap-2 rounded-lg border border-[#c5a059]/40 bg-[#1c1815] px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-[#dfba74] hover:bg-[#c5a059] hover:text-[#161311] transition-all shrink-0"
          >
            <UtensilsCrossed className="size-4" />
            <span>{cart.length > 0 ? 'Add More Items from Menu' : 'Browse Full Menu'}</span>
          </button>
        </div>
      </section>

      {/* Main Order Content */}
      <section className="section-shell">
        {orderSimulated ? (
          /* Real-time Order Simulation Tracker */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-2xl rounded-2xl border border-[#c5a059]/40 bg-[#1a1613] p-8 text-center shadow-2xl sm:p-12"
          >
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#c5a059]/20 text-[#c5a059] ring-8 ring-[#c5a059]/10">
              <CookingPot className="size-8" />
            </div>

            <span className="eyebrow mt-6 block">Order #EK-{Math.floor(2000 + Math.random() * 7000)}</span>
            <h2 className="mt-2 font-serif text-3xl text-[#f4eee6] sm:text-4xl">
              Hearth Kitchen Dispatch
            </h2>
            <p className="mt-2 text-sm text-[#a3998b]">
              Thank you {customerName || 'Guest'}! Our hearth kitchen has received your order.
            </p>

            {/* Stages progress bar */}
            <div className="mt-8 grid grid-cols-3 gap-2 border-y border-[#c5a059]/15 py-6">
              <div
                className={`text-center transition-colors ${
                  simulationStage === 'received' || simulationStage === 'cooking' || simulationStage === 'out_for_delivery'
                    ? 'text-[#dfba74]'
                    : 'text-[#6e6457]'
                }`}
              >
                <CheckCircle2 className="mx-auto size-5 mb-1" />
                <span className="text-xs font-medium">Order Placed</span>
              </div>

              <div
                className={`text-center transition-colors ${
                  simulationStage === 'cooking' || simulationStage === 'out_for_delivery'
                    ? 'text-[#dfba74]'
                    : 'text-[#6e6457]'
                }`}
              >
                <CookingPot className="mx-auto size-5 mb-1 animate-bounce" />
                <span className="text-xs font-medium">Over the Coals</span>
              </div>

              <div
                className={`text-center transition-colors ${
                  simulationStage === 'out_for_delivery' ? 'text-[#dfba74]' : 'text-[#6e6457]'
                }`}
              >
                <Bike className="mx-auto size-5 mb-1" />
                <span className="text-xs font-medium">Rider En Route</span>
              </div>
            </div>

            {/* Dishes Summary */}
            <div className="mt-6 rounded-lg bg-[#14110f] p-4 text-left text-xs">
              <span className="text-xs uppercase tracking-wider text-[#a3998b]">Dishes in this order:</span>
              <ul className="mt-2 space-y-1.5 text-[#c2b9ac]">
                {cart.map(item => (
                  <li key={item.dish.id} className="flex justify-between">
                    <span>{item.quantity}x {item.dish.name}</span>
                    <span className="text-[#f4eee6]">₹{item.dish.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex justify-between border-t border-[#c5a059]/15 pt-2 font-medium text-[#dfba74]">
                <span>Total Paid (Demo)</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => {
                  clearCart();
                  setOrderSimulated(false);
                }}
                className="rounded-lg bg-[#c5a059] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#161311] transition-all hover:bg-[#dfba74]"
              >
                Start New Order
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left: Cart Items & Details Form */}
            <div className="space-y-8 lg:col-span-7">
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="eyebrow">Step 1</span>
                    <h2 className="mt-1 font-serif text-3xl text-[#f4eee6]">Your Dish Selection</h2>
                  </div>
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-xs text-[#a3998b] hover:text-rose-400"
                    >
                      Clear Selection
                    </button>
                  )}
                </div>

                {/* Cart list */}
                <div className="mt-6 space-y-3">
                  {cart.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-[#c5a059]/30 p-10 text-center">
                      <ShoppingBag className="mx-auto size-10 text-[#c5a059]" />
                      <h3 className="mt-3 font-serif text-2xl text-[#f4eee6]">Your order is empty</h3>
                      <p className="mt-2 text-xs text-[#a3998b]">
                        Explore our wood-fired dishes below or visit the seasonal menu.
                      </p>
                      <button
                        onClick={() => {
                          setActivePage('menu');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="mt-5 rounded-lg bg-[#c5a059] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#161311]"
                      >
                        Explore Menu
                      </button>
                    </div>
                  ) : (
                    cart.map(item => (
                      <div
                        key={item.dish.id}
                        className="flex items-center gap-4 rounded-xl border border-[#c5a059]/20 bg-[#1a1613] p-4 transition-colors hover:border-[#c5a059]/40"
                      >
                        <img
                          src={item.dish.image}
                          alt={item.dish.name}
                          className="size-16 rounded-lg object-cover sm:size-20"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-serif text-lg text-[#f4eee6] truncate">
                            {item.dish.name}
                          </h4>
                          <span className="font-serif text-sm text-[#c5a059]">
                            ₹{item.dish.price} each
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 rounded-lg border border-[#c5a059]/20 bg-[#14110f] p-1">
                          <button
                            onClick={() => updateQuantity(item.dish.id, -1)}
                            className="flex size-7 items-center justify-center text-[#a3998b] hover:text-white"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.dish.id, 1)}
                            className="flex size-7 items-center justify-center text-[#a3998b] hover:text-white"
                            aria-label="Increase quantity"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>

                        {/* Subtotal for this dish */}
                        <span className="font-serif text-base text-[#dfba74] w-14 text-right">
                          ₹{item.dish.price * item.quantity}
                        </span>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.dish.id)}
                          className="text-[#a3998b] hover:text-rose-400 p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Add More Items Button */}
                {cart.length > 0 && (
                  <div className="mt-4 flex items-center justify-between rounded-xl border border-[#c5a059]/30 bg-[#161311] p-3.5 sm:p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-[#c5a059]/15 text-[#dfba74]">
                        <UtensilsCrossed className="size-4" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-[#f4eee6]">Want something else?</p>
                        <p className="text-[11px] text-[#a3998b]">Explore starters, wood-fired mains & cellars</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setActivePage('menu');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex items-center gap-1.5 rounded-lg bg-[#c5a059] px-3.5 py-2 text-xs font-semibold text-[#161311] hover:bg-[#dfba74] transition-all shrink-0 active:scale-95 shadow-md"
                    >
                      <Plus className="size-3.5" />
                      <span>Add More Items</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Delivery Details Form */}
              {cart.length > 0 && (
                <div className="border-t border-[#c5a059]/15 pt-8">
                  <span className="eyebrow">Step 2</span>
                  <h3 className="mt-1 font-serif text-2xl text-[#f4eee6]">
                    Guest & Delivery Details
                  </h3>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs uppercase tracking-wider text-[#a3998b]">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        placeholder="e.g. Priyanshi Shah"
                        className="w-full rounded-lg border border-[#c5a059]/30 bg-[#181412] px-4 py-3 text-xs text-[#f4eee6] outline-none placeholder:text-[#6e6457] focus:border-[#c5a059]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs uppercase tracking-wider text-[#a3998b]">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+91 98200 00000"
                        className="w-full rounded-lg border border-[#c5a059]/30 bg-[#181412] px-4 py-3 text-xs text-[#f4eee6] outline-none placeholder:text-[#6e6457] focus:border-[#c5a059]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-xs uppercase tracking-wider text-[#a3998b]">
                        Delivery Address (or Pickup Note)
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Flat / Building, Street, Colaba / Fort, Mumbai"
                        className="w-full rounded-lg border border-[#c5a059]/30 bg-[#181412] px-4 py-3 text-xs text-[#f4eee6] outline-none placeholder:text-[#6e6457] focus:border-[#c5a059]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-xs uppercase tracking-wider text-[#a3998b]">
                        Kitchen Notes / Instructions
                      </label>
                      <input
                        type="text"
                        value={cookingNotes}
                        onChange={e => setCookingNotes(e.target.value)}
                        placeholder="Extra cutlery, less spice, sauce on the side..."
                        className="w-full rounded-lg border border-[#c5a059]/30 bg-[#181412] px-4 py-3 text-xs text-[#f4eee6] outline-none placeholder:text-[#6e6457] focus:border-[#c5a059]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Add Recommendations */}
              <div className="border-t border-[#c5a059]/15 pt-8">
                <span className="eyebrow">Hearth Additions</span>
                <h3 className="mt-1 font-serif text-2xl text-[#f4eee6]">
                  Popular alongside your selection
                </h3>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {MENU_ITEMS.slice(6, 10).map(dish => (
                    <div
                      key={dish.id}
                      onClick={() => setSelectedDish(dish)}
                      className="group cursor-pointer flex items-center justify-between rounded-lg border border-[#c5a059]/20 bg-[#181412] p-3 transition-all hover:border-[#c5a059]/50"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-serif text-sm text-[#f4eee6] truncate group-hover:text-[#dfba74]">
                          {dish.name}
                        </p>
                        <span className="font-serif text-xs text-[#c5a059]">₹{dish.price}</span>
                      </div>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          addToCart(dish, 1);
                        }}
                        className="flex items-center gap-1 rounded bg-[#c5a059]/20 px-2.5 py-1 text-xs text-[#dfba74] hover:bg-[#c5a059] hover:text-[#161311]"
                      >
                        <Plus className="size-3" /> Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Checkout & Delivery Hub */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-6">
                {/* Cost Breakdown Card */}
                <div className="rounded-xl border border-[#c5a059]/30 bg-[#1a1613] p-6 shadow-xl">
                  <span className="eyebrow block">Order Summary</span>
                  <h3 className="mt-1 font-serif text-2xl text-[#f4eee6]">Estimated Total</h3>

                  <div className="mt-5 space-y-3 border-y border-[#c5a059]/15 py-4 text-xs text-[#c2b9ac]">
                    <div className="flex justify-between">
                      <span className="text-[#a3998b]">Items Selected ({totalCount}):</span>
                      <span className="font-medium text-[#f4eee6]">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#a3998b]">Restaurant GST (5%):</span>
                      <span className="font-medium text-[#f4eee6]">₹{gstAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#a3998b]">Packaging:</span>
                      <span className="font-medium text-emerald-400">Complimentary</span>
                    </div>
                    <div className="flex justify-between border-t border-[#c5a059]/15 pt-3 text-sm">
                      <span className="font-medium text-[#f4eee6]">Total Estimate:</span>
                      <span className="font-serif text-xl font-semibold text-[#dfba74]">
                        ₹{grandTotal}
                      </span>
                    </div>
                  </div>

                  {/* Dispatch Methods */}
                  <div className="mt-6 space-y-3">
                    {/* 1. Simulate Kitchen Order */}
                    <button
                      onClick={handleSimulateOrder}
                      disabled={cart.length === 0}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#c5a059] py-3.5 text-xs font-semibold uppercase tracking-wider text-[#161311] transition-all hover:bg-[#dfba74] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      <CookingPot className="size-4" /> Place Direct Kitchen Order
                    </button>

                    {/* 2. WhatsApp Order */}
                    <button
                      onClick={handleWhatsAppOrder}
                      disabled={cart.length === 0}
                      className="w-full flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 py-3 text-xs font-medium text-emerald-300 transition-colors hover:bg-emerald-900/50 disabled:opacity-50"
                    >
                      <MessageCircle className="size-4 text-emerald-400" /> Send Order via WhatsApp
                    </button>

                    {/* 3. Copy Formatted List */}
                    <button
                      onClick={handleCopySummary}
                      disabled={cart.length === 0}
                      className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#c5a059]/30 bg-[#14110f] py-2.5 text-xs font-medium text-[#a3998b] hover:text-[#f4eee6] hover:border-[#c5a059]"
                    >
                      {copiedSummary ? '✓ Copied Summary to Clipboard' : 'Copy Order Text for Delivery Partner'}
                    </button>
                  </div>
                </div>

                {/* Delivery Partners Quick Links */}
                <div className="rounded-xl border border-[#c5a059]/20 bg-[#161311] p-5 text-xs">
                  <span className="eyebrow block">Delivery Partners</span>
                  <p className="mt-2 text-[#a3998b] leading-relaxed">
                    Prefer ordering directly through app platforms? Access Ember Kitchens on Zomato and Swiggy:
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <a
                      href={RESTAURANT_INFO.deliveryPartners.zomato}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-lg border border-[#c5a059]/30 bg-[#1a1613] p-3 text-[#f4eee6] transition-all hover:border-[#c5a059] hover:bg-[#c5a059]/10"
                    >
                      <div>
                        <strong className="block font-serif text-sm">Zomato</strong>
                        <span className="text-[10px] text-[#8a8073]">Delivery & Dining</span>
                      </div>
                      <ExternalLink className="size-3.5 text-[#c5a059]" />
                    </a>

                    <a
                      href={RESTAURANT_INFO.deliveryPartners.swiggy}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-lg border border-[#c5a059]/30 bg-[#1a1613] p-3 text-[#f4eee6] transition-all hover:border-[#c5a059] hover:bg-[#c5a059]/10"
                    >
                      <div>
                        <strong className="block font-serif text-sm">Swiggy</strong>
                        <span className="text-[10px] text-[#8a8073]">Gourmet Delivery</span>
                      </div>
                      <ExternalLink className="size-3.5 text-[#c5a059]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Dish detail modal */}
      <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </div>
  );
}
