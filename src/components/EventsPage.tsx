import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Sparkles, 
  Calendar, 
  GlassWater, 
  CheckCircle2, 
  ChevronRight,
  Send,
  Building,
  Heart,
  Cake,
  UtensilsCrossed
} from 'lucide-react';
import { PageRoute } from '../types';

export const EventsPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [eventType, setEventType] = useState('Private Dining');
  const [guestCount, setGuestCount] = useState('20 - 40 guests');

  const eventPillars = [
    {
      title: 'Private Dining',
      desc: 'Intimate gatherings in our secluded mezzanine and cellar salons for 10 to 24 guests.',
      icon: Users
    },
    {
      title: 'Birthdays & Anniversaries',
      desc: 'Bespoke hearth tasting menus, personalized printed menus, and sommelier vintage pairings.',
      icon: Cake
    },
    {
      title: 'Corporate & Board Dinners',
      desc: 'Discreet, high-touch culinary service with dedicated waitstaff and custom wine curation.',
      icon: Building
    },
    {
      title: 'Weddings & Receptions',
      desc: 'Exclusive full-restaurant buyout accommodating up to 90 seated guests around the live hearth.',
      icon: Heart
    },
    {
      title: 'Full-Service Offsite Catering',
      desc: 'We bring our mobile wood-fired hearths and team to estate celebrations and luxury villas.',
      icon: UtensilsCrossed
    },
  ];

  return (
    <div className="space-y-0">
      {/* Page Header */}
      <section className="bg-[#120f0d] border-b border-[#c5a059]/15 py-16 sm:py-20 px-5 sm:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow">Events &amp; Private Celebrations</p>
          <h1 className="mt-3 font-serif text-5xl sm:text-6xl text-[#f4eee6]">
            Gatherings worth remembering.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#a3998b] leading-relaxed">
            From intimate celebratory dinners to full-hearth buyouts and bespoke offsite wood-fired catering.
          </p>
        </div>
      </section>

      {/* Hero Atmosphere Image */}
      <section className="section-shell">
        <div className="rounded-2xl overflow-hidden border border-[#c5a059]/25 shadow-2xl relative">
          <img
            src="/assets/ember-event-DEU43Uj2.jpg"
            alt="Private dining setup with candlelight and custom tables"
            className="aspect-[16/7] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161311]/90 via-transparent to-transparent flex items-end p-6 sm:p-10">
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-widest text-[#dfba74] font-medium">Bespoke Dining Spaces</span>
              <h3 className="font-serif text-2xl sm:text-4xl text-[#f4eee6] mt-1">
                Curated around your occasion.
              </h3>
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {eventPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border border-[#c5a059]/15 bg-[#1c1815] flex flex-col justify-between"
              >
                <div>
                  <div className="size-10 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#dfba74] mb-4">
                    <Icon className="size-5" />
                  </div>
                  <h4 className="font-serif text-2xl text-[#f4eee6]">{pillar.title}</h4>
                  <p className="mt-2.5 text-xs text-[#a3998b] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="border-t border-[#c5a059]/15 bg-[#14110f] py-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-10">
            <p className="eyebrow">Plan Your Gathering</p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl text-[#f4eee6]">
              Tell us what you imagine.
            </h2>
            <p className="mt-3 text-sm text-[#a3998b]">
              Share a few details and our dedicated events concierge will connect with seasonal menus and availability.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 rounded-xl border border-[#c5a059]/30 bg-[#1c1815] text-center max-w-xl mx-auto shadow-2xl"
              >
                <div className="size-14 mx-auto rounded-full bg-[#c5a059] text-[#161311] flex items-center justify-center mb-4">
                  <CheckCircle2 className="size-8" />
                </div>
                <h3 className="font-serif text-3xl text-[#f4eee6]">Enquiry Noted</h3>
                <p className="mt-2 text-sm text-[#a3998b] leading-relaxed">
                  Thank you for considering Ember Kitchens. In this demonstration flow, your event proposal was safely formatted on screen.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 border border-[#c5a059]/40 hover:bg-[#c5a059]/10 text-xs uppercase tracking-wider text-[#dfba74] rounded"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="rounded-xl border border-[#c5a059]/20 bg-[#1c1815] p-6 sm:p-10 shadow-2xl space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a3998b] mb-1.5 font-medium">
                      Host Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Radhika Roy"
                      className="w-full bg-[#14110f] border border-[#c5a059]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#f4eee6] placeholder:text-[#a3998b]/50 focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a3998b] mb-1.5 font-medium">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="host@domain.com"
                      className="w-full bg-[#14110f] border border-[#c5a059]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#f4eee6] placeholder:text-[#a3998b]/50 focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a3998b] mb-1.5 font-medium">
                      Contact Phone
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98000 00000"
                      className="w-full bg-[#14110f] border border-[#c5a059]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#f4eee6] placeholder:text-[#a3998b]/50 focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a3998b] mb-1.5 font-medium">
                      Event Category
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-[#14110f] border border-[#c5a059]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#f4eee6] focus:border-[#c5a059] outline-none"
                    >
                      <option>Private Dining Room</option>
                      <option>Birthday or Milestone Celebration</option>
                      <option>Corporate Dinner &amp; Presentations</option>
                      <option>Wedding &amp; Reception Buyout</option>
                      <option>Offsite Hearth Catering</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a3998b] mb-1.5 font-medium">
                      Estimated Guest Count
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full bg-[#14110f] border border-[#c5a059]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#f4eee6] focus:border-[#c5a059] outline-none"
                    >
                      <option>10 - 18 guests (Mezzanine)</option>
                      <option>18 - 35 guests (Cellar Salon)</option>
                      <option>35 - 90 guests (Full Restaurant Buyout)</option>
                      <option>100+ guests (Offsite Estate Catering)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a3998b] mb-1.5 font-medium">
                      Desired Date
                    </label>
                    <input
                      type="date"
                      className="w-full bg-[#14110f] border border-[#c5a059]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#f4eee6] focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-[#a3998b] mb-1.5 font-medium">
                      Vision, Dietary Needs or Special Curation
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about the atmosphere, beverage pairings, or custom courses you desire..."
                      className="w-full bg-[#14110f] border border-[#c5a059]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#f4eee6] placeholder:text-[#a3998b]/50 focus:border-[#c5a059] outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#c5a059] to-[#dfba74] text-[#161311] font-semibold text-xs uppercase tracking-widest hover:brightness-110 active:scale-[0.99] transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="size-3.5" />
                  <span>Submit Event Proposal Request</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};
