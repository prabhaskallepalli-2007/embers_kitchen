import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Flame, 
  Sparkles, 
  Star, 
  Calendar, 
  Clock, 
  MapPin, 
  ShoppingBag,
  Award,
  ChevronRight,
  HeartHandshake
} from 'lucide-react';
import { PageRoute, Dish } from '../types';
import { DISHES, REVIEWS } from '../data';
import { DishImage } from './DishImage';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onAddToCart: (dish: Dish) => void;
  onSelectDish: (dish: Dish) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onAddToCart,
  onSelectDish,
}) => {
  const signatureDishes = DISHES.slice(2, 6); // duck, risotto, fish, lamb

  return (
    <div className="space-y-0">
      {/* 1. Cinematic Hero Section */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-end overflow-hidden border-b border-[#c5a059]/20">
        {/* Background photo with gradient vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/ember-hero-55PNAzbN.jpg"
            alt="Wood-fired seasonal vegetables at Ember Kitchens"
            className="size-full object-cover object-center scale-105 transform animate-pulse duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161311] via-[#161311]/60 to-[#161311]/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#161311]/40 to-[#161311]/90" />
        </div>

        {/* Hero Text Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161311]/80 border border-[#c5a059]/30 text-[#dfba74] text-xs uppercase tracking-widest backdrop-blur-md mb-4">
              <span className="size-1.5 rounded-full bg-[#c5a059] animate-ping" />
              <span>Est. 2016 · Wood-Fired & Seasonal Gastronomy</span>
            </div>

            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#f4eee6] tracking-tight leading-[0.92]">
              EMBER <span className="text-[#dfba74] block font-light">KITCHENS</span>
            </h1>

            <p className="mt-5 font-serif text-2xl sm:text-3xl md:text-4xl text-[#dfba74]/90 italic font-normal">
              Fire, salt &amp; the quiet art of the table.
            </p>

            <p className="mt-5 text-base sm:text-lg text-[#f4eee6]/80 max-w-xl leading-relaxed font-light">
              A seasonal wood-fired kitchen in the heart of the Old Quarter. Slow-cooked over live embers, hand-cut and served with deep culinary intention.
            </p>

            {/* Quick Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onNavigate('menu')}
                className="px-6 py-3.5 rounded bg-gradient-to-r from-[#c5a059] to-[#dfba74] hover:brightness-110 text-[#161311] text-xs uppercase tracking-widest font-semibold transition-all shadow-xl active:scale-95 flex items-center gap-2"
              >
                <span>Explore Menu</span>
                <ArrowRight className="size-3.5" />
              </button>

              <button
                onClick={() => onNavigate('reservations')}
                className="px-6 py-3.5 rounded border border-[#c5a059]/50 hover:bg-[#c5a059]/15 text-[#dfba74] text-xs uppercase tracking-widest font-medium transition-all backdrop-blur-sm flex items-center gap-2"
              >
                <Calendar className="size-3.5" />
                <span>Book a Table</span>
              </button>

              <button
                onClick={() => onNavigate('order-online')}
                className="px-5 py-3.5 rounded text-[#f4eee6]/80 hover:text-[#dfba74] text-xs uppercase tracking-widest transition-colors flex items-center gap-1.5"
              >
                <span>Order Online</span>
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Signature Plates Spotlight */}
      <section className="section-shell">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4">
          <div>
            <p className="eyebrow">Signature Plates</p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl text-[#f4eee6]">
              From this season's fire
            </h2>
          </div>
          <button
            onClick={() => onNavigate('menu')}
            className="text-xs uppercase tracking-wider text-[#dfba74] hover:underline flex items-center gap-1.5"
          >
            <span>View full menu</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {signatureDishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => onSelectDish(dish)}
              className="group rounded-xl border border-[#c5a059]/20 bg-[#1c1815] overflow-hidden hover:border-[#c5a059]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-square overflow-hidden bg-[#161311]">
                  <DishImage dish={dish} className="size-full" />
                  {dish.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#c5a059] text-[#161311] text-[10px] uppercase font-bold tracking-wider">
                      {dish.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-serif text-xl text-[#f4eee6] group-hover:text-[#dfba74] transition-colors line-clamp-1">
                      {dish.name}
                    </h3>
                    <span className="text-[#dfba74] font-serif text-lg shrink-0">₹{dish.price}</span>
                  </div>
                  <p className="mt-2 text-xs text-[#a3998b] line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(dish);
                  }}
                  className="w-full py-2 border border-[#c5a059]/30 hover:bg-[#c5a059] hover:text-[#161311] text-[#dfba74] text-xs uppercase tracking-wider font-semibold rounded transition-colors"
                >
                  Add to selection
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Our Story / Hearth Philosophy */}
      <section className="border-y border-[#c5a059]/15 bg-[#14110f] py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative rounded-xl overflow-hidden border border-[#c5a059]/20 shadow-lg">
              <img
                src="/assets/ember-interior-hoYVSs9w.jpg"
                alt="Ember dining room with warm candlelight"
                loading="lazy"
                className="aspect-[4/5] object-cover size-full"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden border border-[#c5a059]/20 shadow-lg mt-8">
              <img
                src="/assets/ember-chef-fpcKDRrx.jpg"
                alt="Chef Mira Sethi cooking over live flame"
                loading="lazy"
                className="aspect-[4/5] object-cover size-full"
              />
            </div>
          </div>

          <div className="space-y-6">
            <p className="eyebrow">Our Story</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#f4eee6] leading-tight">
              A kitchen built strictly around the live hearth.
            </h2>
            <p className="text-sm sm:text-base text-[#a3998b] leading-relaxed">
              Ember began as a single charcoal hearth and an unwavering philosophy: that the deepest flavours come from patience, indigenous woods, and the slow, disciplined glow of embers.
            </p>
            <p className="text-sm sm:text-base text-[#a3998b] leading-relaxed">
              Led by Chef Mira Sethi, our recipes weave culinary heritage with subtle coastal smoke, unrefined sea salts, and farm-fresh botanicals.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3 rounded border border-[#c5a059]/40 hover:bg-[#c5a059]/15 text-[#dfba74] text-xs uppercase tracking-widest font-medium transition-colors"
              >
                Discover our story &amp; craft
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Seasonal Feature: The Hearth Supper */}
      <section className="section-shell">
        <div className="rounded-2xl border border-[#c5a059]/30 bg-[#1c1815] overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl">
          <div className="relative min-h-[340px] lg:min-h-full">
            <img
              src="/assets/ember-event-DEU43Uj2.jpg"
              alt="The Hearth Supper private communal experience"
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
          </div>

          <div className="p-8 sm:p-14 flex flex-col justify-between">
            <div>
              <span className="eyebrow">Chef's Curated Experience</span>
              <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-[#f4eee6]">
                The Hearth Supper
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#a3998b] leading-relaxed">
                An exclusive six-course tasting journey cooked entirely over open hickory flame, hosted every Thursday evening for only twelve guests seated along the master hearth counter.
              </p>
              
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl text-[#dfba74] font-medium">₹3,800</span>
                <span className="text-xs uppercase tracking-wider text-[#a3998b]">per guest · Optional Sommelier Pairing</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#c5a059]/15 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('reservations')}
                className="px-6 py-3 rounded bg-[#c5a059] hover:brightness-110 text-[#161311] text-xs uppercase tracking-widest font-semibold transition-all shadow"
              >
                Reserve the Hearth Supper
              </button>
              <button
                onClick={() => onNavigate('events')}
                className="px-6 py-3 rounded border border-[#c5a059]/30 hover:bg-[#c5a059]/10 text-[#dfba74] text-xs uppercase tracking-widest font-medium transition-colors"
              >
                Private Dining Options
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Guest Reviews & Social Proof */}
      <section className="border-y border-[#c5a059]/15 bg-[#14110f] py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="eyebrow">Guest Impressions</p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl text-[#f4eee6]">
              Loved around the table
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#c5a059]/15 bg-[#1c1815] p-7 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex gap-1 text-[#dfba74] mb-4">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="font-serif text-xl sm:text-2xl text-[#f4eee6] leading-snug">
                    “{rev.quote}”
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#c5a059]/10 flex justify-between items-center text-xs text-[#a3998b]">
                  <span className="font-medium text-[#dfba74] uppercase tracking-wider">{rev.author}</span>
                  <span>{rev.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Location & Directions */}
      <section className="section-shell">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <p className="eyebrow">Find Us</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#f4eee6]">
              In the historic heart of the Old Quarter.
            </h2>
            <div className="space-y-3 text-sm text-[#a3998b] leading-relaxed">
              <p className="flex items-start gap-3">
                <MapPin className="size-4 text-[#c5a059] shrink-0 mt-1" />
                <span>14 Hearth Lane, Old Quarter, Mumbai 400001</span>
              </p>
              <p className="flex items-start gap-3">
                <Clock className="size-4 text-[#c5a059] shrink-0 mt-1" />
                <span>Tuesday – Sunday · 12:00 PM – 11:00 PM (Monday Closed)</span>
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 rounded border border-[#c5a059]/40 hover:bg-[#c5a059]/15 text-[#dfba74] text-xs uppercase tracking-widest font-medium transition-colors"
              >
                Directions &amp; Contact Details
              </button>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#c5a059]/20 shadow-xl">
            <img
              src="/assets/ember-exterior-BXQHTK2e.jpg"
              alt="Ember Kitchens exterior facade at twilight"
              loading="lazy"
              className="size-full object-cover aspect-[16/10]"
            />
          </div>
        </div>
      </section>

      {/* 7. Call To Action Banner */}
      <section className="py-24 px-5 sm:px-8 text-center bg-gradient-to-b from-[#14110f] to-[#1a1512] border-t border-[#c5a059]/20">
        <div className="max-w-3xl mx-auto space-y-5">
          <p className="eyebrow">Join the Table</p>
          <h2 className="font-serif text-5xl sm:text-6xl text-[#f4eee6]">
            Your seat by the hearth is waiting.
          </h2>
          <p className="text-sm sm:text-base text-[#a3998b] max-w-xl mx-auto">
            Whether an anniversary celebration, unhurried lunch, or an evening tasting journey, we welcome you to the flame.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('reservations')}
              className="px-8 py-3.5 rounded bg-gradient-to-r from-[#c5a059] to-[#dfba74] hover:brightness-110 text-[#161311] text-xs uppercase tracking-widest font-semibold transition-all shadow-xl"
            >
              Book a Table
            </button>
            <button
              onClick={() => onNavigate('order-online')}
              className="px-8 py-3.5 rounded border border-[#c5a059]/40 hover:bg-[#c5a059]/15 text-[#dfba74] text-xs uppercase tracking-widest font-medium transition-colors"
            >
              Order Online Delivery
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
