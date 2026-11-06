import { useState } from 'react';
import { motion } from 'motion/react';
import { ActivePage, Dish } from '../types';
import { RESTAURANT_INFO, MENU_ITEMS, TESTIMONIALS } from '../data/restaurantData';
import { useCart } from '../context/CartContext';
import { EmberParticles } from '../components/EmberParticles';
import { DishModal } from '../components/DishModal';
import { ArrowRight, Star, Plus, Flame, Clock, MapPin, Wine, Calendar } from 'lucide-react';

interface HomeViewProps {
  setActivePage: (page: ActivePage) => void;
  onQuickReserve?: (date: string, guests: number) => void;
}

export function HomeView({ setActivePage, onQuickReserve }: HomeViewProps) {
  const { addToCart, totalCount } = useCart();
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [quickDate, setQuickDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [quickGuests, setQuickGuests] = useState(2);

  const handleAddDish = (dish: Dish, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(dish, 1);
  };

  const featuredDishes = MENU_ITEMS.slice(0, 4);

  return (
    <div className="relative">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen overflow-hidden flex items-end pt-24 pb-12 sm:pb-16">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/ember-hero-55PNAzbN.jpg"
            alt="Wood-fired seasonal vegetables at Ember Kitchens"
            className="size-full object-cover object-center scale-105 transition-transform duration-1000"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#161311] via-[#161311]/60 to-[#161311]/40" />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Ambient Ember Particles */}
        <EmberParticles count={32} />

        {/* Hero Content */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2">
              <span className="eyebrow">{RESTAURANT_INFO.eyebrow}</span>
              <span className="h-px w-8 bg-[#c5a059]/40" />
              <span className="text-[10px] uppercase tracking-widest text-[#dfba74]">Mumbai</span>
            </div>

            <h1 className="mt-5 font-serif text-6xl font-normal leading-[0.92] tracking-tight text-[#f4eee6] sm:text-8xl">
              EMBER <span className="block text-[#c5a059]">KITCHENS</span>
            </h1>

            <p className="mt-5 font-serif text-2xl italic text-[#dfba74] sm:text-4xl">
              {RESTAURANT_INFO.tagline}
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#c2b9ac] sm:text-lg">
              A seasonal wood-fired kitchen in the heart of the historic Old Quarter. Slow-cooked, hand-cut, and served with intention around our open hearth.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <button
                onClick={() => {
                  setActivePage('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="rounded-lg bg-[#c5a059] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#161311] transition-all hover:bg-[#dfba74] hover:shadow-[0_0_20px_rgba(197,160,89,0.35)] active:scale-95"
              >
                Explore Menu
              </button>

              <button
                onClick={() => {
                  if (totalCount > 0) {
                    setActivePage('order-online');
                  } else {
                    setActivePage('menu');
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="rounded-lg border border-[#c5a059]/60 bg-[#1c1815]/70 px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#f4eee6] backdrop-blur-sm transition-all hover:border-[#c5a059] hover:bg-[#c5a059]/15 active:scale-95"
              >
                {totalCount > 0 ? `View Cart (${totalCount})` : 'Order Online'}
              </button>

              <button
                onClick={() => {
                  setActivePage('reservations');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex items-center gap-2 px-3 py-3 text-xs font-medium uppercase tracking-wider text-[#dfba74] transition-colors hover:text-white"
              >
                <span>Book a Table</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUICK TABLE RESERVATION STRIP */}
      <section className="relative z-20 border-y border-[#c5a059]/25 bg-[#14110f] px-5 py-6 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#c5a059]/15 text-[#c5a059]">
              <Calendar className="size-5" />
            </div>
            <div>
              <p className="font-serif text-lg text-[#f4eee6]">Quick Table Booking</p>
              <p className="text-xs text-[#a3998b]">Select your evening and reserve your seat by the hearth</p>
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center gap-3 lg:w-auto">
            <div className="flex items-center gap-2 rounded-lg border border-[#c5a059]/30 bg-[#1c1815] px-3 py-2 text-xs">
              <span className="text-[#a3998b]">Date:</span>
              <input
                type="date"
                value={quickDate}
                onChange={e => setQuickDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="bg-transparent text-[#f4eee6] outline-none"
              />
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-[#c5a059]/30 bg-[#1c1815] px-3 py-2 text-xs">
              <span className="text-[#a3998b]">Guests:</span>
              <select
                value={quickGuests}
                onChange={e => setQuickGuests(Number(e.target.value))}
                className="bg-transparent text-[#f4eee6] outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(g => (
                  <option key={g} value={g} className="bg-[#1c1815] text-[#f4eee6]">
                    {g} {g === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                if (onQuickReserve) {
                  onQuickReserve(quickDate, quickGuests);
                }
                setActivePage('reservations');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="rounded-lg bg-[#c5a059] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#161311] transition-all hover:bg-[#dfba74] active:scale-95"
            >
              Check Tables
            </button>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE PLATES */}
      <section className="section-shell">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">Signature Plates</span>
            <h2 className="mt-3 font-serif text-4xl text-[#f4eee6] sm:text-5xl">
              From this season's fire
            </h2>
          </div>
          <button
            onClick={() => {
              setActivePage('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2 text-xs uppercase tracking-wider text-[#c5a059] hover:text-[#dfba74]"
          >
            <span>Explore full menu</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredDishes.map((dish, idx) => (
            <motion.article
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => setSelectedDish(dish)}
              className="group cursor-pointer overflow-hidden rounded-xl border border-[#c5a059]/20 bg-[#1c1815] transition-all duration-300 hover:border-[#c5a059]/60 hover:shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
            >
              {/* Photo */}
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
                  {dish.woodType?.split(' ')[0]}
                </span>
              </div>

              {/* Dish Meta */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-xl text-[#f4eee6] transition-colors group-hover:text-[#dfba74]">
                    {dish.name}
                  </h3>
                  <span className="font-serif text-lg font-medium text-[#c5a059]">₹{dish.price}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#a3998b] line-clamp-2">
                  {dish.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#c5a059]/15 pt-3">
                  <span className="flex items-center gap-1.5 text-[11px] text-[#8a8073]">
                    <span
                      className={`size-1.5 rounded-full ${dish.vegetarian ? 'bg-emerald-500' : 'bg-rose-500'}`}
                    />
                    {dish.vegetarian ? 'Vegetarian' : 'Non-veg'}
                  </span>

                  <button
                    onClick={e => handleAddDish(dish, e)}
                    className="flex items-center gap-1 rounded-md border border-[#c5a059]/30 bg-[#14110f] px-2.5 py-1 text-[11px] font-medium text-[#f4eee6] transition-all hover:border-[#c5a059] hover:bg-[#c5a059] hover:text-[#161311]"
                  >
                    <Plus className="size-3" /> Add
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 3. OUR STORY TEASER */}
      <section className="border-y border-[#c5a059]/20 bg-[#14110f]">
        <div className="section-shell grid items-center gap-12 lg:grid-cols-2">
          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-xl border border-[#c5a059]/20">
              <img
                src="/assets/ember-interior-hoYVSs9w.jpg"
                alt="Ember dining room ambiance"
                loading="lazy"
                className="aspect-[4/5] size-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="mt-8 overflow-hidden rounded-xl border border-[#c5a059]/20">
              <img
                src="/assets/ember-chef-fpcKDRrx.jpg"
                alt="Chef Mira Sethi at the hearth"
                loading="lazy"
                className="aspect-[4/5] size-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Story Text */}
          <div className="lg:pl-6">
            <span className="eyebrow">Our Philosophy</span>
            <h2 className="mt-4 font-serif text-4xl text-[#f4eee6] sm:text-5xl">
              A kitchen built around the fire.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#c2b9ac]">
              Ember began as a single brick hearth and a belief: the most profound flavours come from patience, local hands, and the quiet glow of embers.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#a3998b]">
              Under Chef Mira Sethi, we source hyper-seasonal heirloom produce directly from small-scale growers across Maharashtra and Goa, celebrating wood smoke not as a masking gimmick, but as an elemental seasoning.
            </p>

            <div className="mt-8 flex flex-wrap gap-6 border-t border-[#c5a059]/20 pt-6">
              <div>
                <span className="font-serif text-3xl font-medium text-[#c5a059]">2016</span>
                <span className="block text-xs uppercase tracking-wider text-[#8a8073]">Established</span>
              </div>
              <div className="h-10 w-px bg-[#c5a059]/20" />
              <div>
                <span className="font-serif text-3xl font-medium text-[#c5a059]">100%</span>
                <span className="block text-xs uppercase tracking-wider text-[#8a8073]">Hardwood Fired</span>
              </div>
              <div className="h-10 w-px bg-[#c5a059]/20" />
              <div>
                <span className="font-serif text-3xl font-medium text-[#c5a059]">14</span>
                <span className="block text-xs uppercase tracking-wider text-[#8a8073]">Regional Farms</span>
              </div>
            </div>

            <button
              onClick={() => {
                setActivePage('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-[#c5a059]/50 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#f4eee6] transition-colors hover:border-[#c5a059] hover:bg-[#c5a059]/10"
            >
              Discover Our Story <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. THE HEARTH SUPPER SEASONAL SPECIAL */}
      <section className="section-shell">
        <div className="grid overflow-hidden rounded-2xl border border-[#c5a059]/30 bg-[#1c1815] lg:grid-cols-2">
          <div className="relative min-h-80 overflow-hidden">
            <img
              src="/assets/ember-event-DEU43Uj2.jpg"
              alt="The Hearth Supper private dinner"
              loading="lazy"
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#1c1815]/90 hidden lg:block" />
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
            <div className="flex items-center gap-2">
              <Flame className="size-4 text-[#c5a059]" />
              <span className="eyebrow">Thursday Exclusive</span>
            </div>

            <h2 className="mt-4 font-serif text-4xl text-[#f4eee6] sm:text-5xl">
              The Hearth Supper
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-[#c2b9ac]">
              A communal six-course dining journey cooked entirely over open flame, available exclusively on Thursday evenings for just twelve guests at the kitchen counter.
            </p>

            <div className="mt-6 space-y-2 border-y border-[#c5a059]/15 py-4 text-xs text-[#a3998b]">
              <div className="flex items-center gap-2">
                <Clock className="size-3.5 text-[#c5a059]" />
                <span>Thursdays · Single sitting promptly at 8:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Wine className="size-3.5 text-[#c5a059]" />
                <span>Optional biodynamic & natural wine pairing available</span>
              </div>
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-serif text-3xl text-[#c5a059]">₹3,800</span>
              <span className="text-xs uppercase tracking-wider text-[#8a8073]">per guest</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setActivePage('reservations');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="rounded-lg bg-[#c5a059] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#161311] transition-all hover:bg-[#dfba74] active:scale-95"
              >
                Reserve Hearth Supper
              </button>
              <button
                onClick={() => {
                  setActivePage('events');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="rounded-lg border border-[#c5a059]/40 px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#f4eee6] transition-colors hover:border-[#c5a059] hover:bg-[#c5a059]/10"
              >
                Private Dining Options
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GUEST REVIEWS */}
      <section className="border-y border-[#c5a059]/20 bg-[#14110f]">
        <div className="section-shell">
          <div className="text-center">
            <span className="eyebrow">Guest Notes</span>
            <h2 className="mt-3 font-serif text-4xl text-[#f4eee6] sm:text-5xl">
              Loved around the table
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, idx) => (
              <blockquote
                key={idx}
                className="relative flex flex-col justify-between rounded-xl border border-[#c5a059]/20 bg-[#1a1613] p-7 transition-all hover:border-[#c5a059]/40"
              >
                <div>
                  <div className="flex gap-1 text-[#c5a059]">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="mt-5 font-serif text-xl leading-relaxed text-[#f4eee6]">
                    “{t.quote}”
                  </p>
                </div>
                <footer className="mt-6 border-t border-[#c5a059]/15 pt-4">
                  <strong className="block text-xs font-medium uppercase tracking-wider text-[#dfba74]">
                    {t.author}
                  </strong>
                  <span className="text-[11px] text-[#8a8073]">{t.title}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LOCATION & FAREWELL BANNER */}
      <section className="section-shell grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <span className="eyebrow">Find Us</span>
          <h2 className="mt-3 font-serif text-4xl text-[#f4eee6] sm:text-5xl">
            In the heart of the Old Quarter.
          </h2>
          <div className="mt-6 space-y-3 text-sm leading-relaxed text-[#c2b9ac]">
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-1 size-4 shrink-0 text-[#c5a059]" />
              <span>{RESTAURANT_INFO.address}</span>
            </p>
            <p className="flex items-start gap-2.5">
              <Clock className="mt-1 size-4 shrink-0 text-[#c5a059]" />
              <span>{RESTAURANT_INFO.hours.weekdays}<br />{RESTAURANT_INFO.hours.weekends}</span>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => {
                setActivePage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="rounded-lg border border-[#c5a059]/50 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#f4eee6] transition-colors hover:border-[#c5a059] hover:bg-[#c5a059]/10"
            >
              Directions & Contact
            </button>
            <button
              onClick={() => {
                setActivePage('reservations');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="rounded-lg bg-[#c5a059] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#161311] transition-all hover:bg-[#dfba74]"
            >
              Book a Table
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#c5a059]/25">
          <img
            src="/assets/ember-exterior-BXQHTK2e.jpg"
            alt="Ember Kitchens exterior facade on Hearth Lane"
            loading="lazy"
            className="aspect-[4/3] size-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </section>

      {/* Modal detail */}
      <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </div>
  );
}
