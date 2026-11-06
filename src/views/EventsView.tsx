import { useState } from 'react';
import { motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { hearthAudio } from '../utils/audioSynth';
import { Calendar, Users, Wine, Check, ArrowRight, Sparkles, Download } from 'lucide-react';

export function EventsView() {
  const [eventType, setEventType] = useState('Private Celebration');
  const [guestCount, setGuestCount] = useState(12);
  const [date, setDate] = useState('');
  const [hostName, setHostName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    hearthAudio.playChime();
    setSubmitted(true);
  };

  const handleDownloadBrochure = () => {
    const brochureText = `EMBER KITCHENS — PRIVATE DINING & EVENTS DOSSIER\n\n` +
      `Location: ${RESTAURANT_INFO.address}\n` +
      `Contact: ${RESTAURANT_INFO.eventsEmail} | ${RESTAURANT_INFO.phone}\n\n` +
      `CAPACITIES & SPACES:\n` +
      `1. The Hearth Table (Private Wing) — 10 to 14 guests seated\n` +
      `2. The Cellar Vault — 8 to 12 guests seated\n` +
      `3. Full Dining Room Buyout — 45 to 60 guests cocktail or seated\n` +
      `4. Offsite Hearth Fire Installations — Bespoke private estate dining\n\n` +
      `CUSTOM MENUS:\n` +
      `- 5-Course Hearth Exploration: ₹4,200 per guest\n` +
      `- 7-Course Signature Fire & Salt: ₹5,800 per guest\n` +
      `- Natural & Biodynamic Wine Flight Pairing: ₹2,400 per guest\n\n` +
      `Kindly allow 48 hours for private date holds.`;

    const blob = new Blob([brochureText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Ember-Kitchens-Private-Events-Dossier.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="border-b border-[#c5a059]/20 bg-[#14110f] px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <span className="eyebrow">Private Gatherings</span>
          <h1 className="mt-3 font-serif text-5xl text-[#f4eee6] sm:text-6xl">
            Celebrate around the embers.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[#a3998b]">
            Host intimate celebrations, corporate banquets, and bespoke culinary masterclasses with private access to our wood hearth and sommelier.
          </p>
        </div>
      </section>

      {/* Spaces Grid */}
      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Space 1 */}
          <div className="overflow-hidden rounded-xl border border-[#c5a059]/25 bg-[#1a1613]">
            <img
              src="/assets/ember-event-DEU43Uj2.jpg"
              alt="The Hearth Table private room"
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <span className="eyebrow block text-xs">10 – 14 Guests</span>
              <h3 className="mt-1 font-serif text-2xl text-[#f4eee6]">The Hearth Wing</h3>
              <p className="mt-3 text-xs leading-relaxed text-[#c2b9ac]">
                A secluded dining alcove flanked by our secondary fireplace. Features a dedicated chef serving communal multi-course feasts straight from cast-iron pans.
              </p>
              <div className="mt-4 border-t border-[#c5a059]/15 pt-3 text-xs text-[#dfba74]">
                Starting from ₹4,200 per guest
              </div>
            </div>
          </div>

          {/* Space 2 */}
          <div className="overflow-hidden rounded-xl border border-[#c5a059]/25 bg-[#1a1613]">
            <img
              src="/assets/ember-interior-hoYVSs9w.jpg"
              alt="Full Dining Hall"
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <span className="eyebrow block text-xs">Up to 60 Guests</span>
              <h3 className="mt-1 font-serif text-2xl text-[#f4eee6]">Full Restaurant Buyout</h3>
              <p className="mt-3 text-xs leading-relaxed text-[#c2b9ac]">
                Exclusive reign over the entire Ember estate, including the open show kitchen, candlelit dining room, and curbside brass bar for larger celebrations.
              </p>
              <div className="mt-4 border-t border-[#c5a059]/15 pt-3 text-xs text-[#dfba74]">
                Custom quotation upon inquiry
              </div>
            </div>
          </div>

          {/* Space 3 */}
          <div className="overflow-hidden rounded-xl border border-[#c5a059]/25 bg-[#1a1613]">
            <img
              src="/assets/ember-hero-55PNAzbN.jpg"
              alt="Offsite Hearth Catering"
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <span className="eyebrow block text-xs">Private Estates</span>
              <h3 className="mt-1 font-serif text-2xl text-[#f4eee6]">Offsite Fire Catering</h3>
              <p className="mt-3 text-xs leading-relaxed text-[#c2b9ac]">
                Our mobile hearth team travels to private villas in Alibaug, Lonavala, and South Mumbai, setting up custom iron tripods, ember trenches, and live fire bars.
              </p>
              <div className="mt-4 border-t border-[#c5a059]/15 pt-3 text-xs text-[#dfba74]">
                Available for 20 to 120 guests
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form & Brochure */}
      <section className="border-t border-[#c5a059]/20 bg-[#14110f]">
        <div className="section-shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-6">
            <span className="eyebrow">Event Concierge</span>
            <h2 className="font-serif text-4xl text-[#f4eee6]">
              Design your bespoke evening
            </h2>
            <p className="text-sm leading-relaxed text-[#c2b9ac]">
              Our Events Director will curate custom wine pairings, acoustic playlists, floral arrangements, and personalized printed menus bearing your guests' names.
            </p>

            <div className="rounded-xl border border-[#c5a059]/25 bg-[#1a1613] p-5">
              <div className="flex items-center gap-3">
                <Download className="size-5 text-[#c5a059]" />
                <div>
                  <h4 className="font-serif text-lg text-[#f4eee6]">Private Events Dossier</h4>
                  <p className="text-xs text-[#a3998b]">Detailed floor plans, seating layouts and pricing guide.</p>
                </div>
              </div>
              <button
                onClick={handleDownloadBrochure}
                className="mt-4 w-full rounded-lg border border-[#c5a059]/40 bg-[#14110f] py-2.5 text-xs font-medium text-[#dfba74] hover:border-[#c5a059] hover:bg-[#c5a059]/10"
              >
                Download Events Dossier (.txt)
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="rounded-xl border border-[#c5a059]/40 bg-[#1a1613] p-8 text-center sm:p-12">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#c5a059]/20 text-[#c5a059]">
                  <Check className="size-7" />
                </div>
                <h3 className="mt-4 font-serif text-3xl text-[#f4eee6]">Inquiry Received</h3>
                <p className="mt-2 text-sm text-[#c2b9ac]">
                  Thank you, <strong className="text-[#f4eee6]">{hostName}</strong>. Our Private Dining Concierge will reach out within 24 hours to finalize your date and menu tasting.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-lg bg-[#c5a059] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#161311]"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-xl border border-[#c5a059]/30 bg-[#1a1613] p-6 sm:p-8"
              >
                <h3 className="font-serif text-2xl text-[#f4eee6]">Private Event Inquiry</h3>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-[#a3998b]">
                      Event Type
                    </label>
                    <select
                      value={eventType}
                      onChange={e => setEventType(e.target.value)}
                      className="w-full rounded-lg border border-[#c5a059]/30 bg-[#14110f] px-3.5 py-2.5 text-xs text-[#f4eee6] outline-none focus:border-[#c5a059]"
                    >
                      <option>Private Celebration</option>
                      <option>Corporate Dinner</option>
                      <option>Cocktail Reception</option>
                      <option>Full Restaurant Buyout</option>
                      <option>Offsite Hearth Catering</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-[#a3998b]">
                      Estimated Guests
                    </label>
                    <input
                      type="number"
                      min={6}
                      max={120}
                      value={guestCount}
                      onChange={e => setGuestCount(Number(e.target.value))}
                      className="w-full rounded-lg border border-[#c5a059]/30 bg-[#14110f] px-3.5 py-2.5 text-xs text-[#f4eee6] outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-[#a3998b]">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full rounded-lg border border-[#c5a059]/30 bg-[#14110f] px-3.5 py-2.5 text-xs text-[#f4eee6] outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-[#a3998b]">
                      Host / Organizer Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={hostName}
                      onChange={e => setHostName(e.target.value)}
                      placeholder="e.g. Radhika Singhal"
                      className="w-full rounded-lg border border-[#c5a059]/30 bg-[#14110f] px-3.5 py-2.5 text-xs text-[#f4eee6] outline-none placeholder:text-[#6e6457] focus:border-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-[#a3998b]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="radhika@example.com"
                      className="w-full rounded-lg border border-[#c5a059]/30 bg-[#14110f] px-3.5 py-2.5 text-xs text-[#f4eee6] outline-none placeholder:text-[#6e6457] focus:border-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-[#a3998b]">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98200 00000"
                      className="w-full rounded-lg border border-[#c5a059]/30 bg-[#14110f] px-3.5 py-2.5 text-xs text-[#f4eee6] outline-none placeholder:text-[#6e6457] focus:border-[#c5a059]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs uppercase tracking-wider text-[#a3998b]">
                      Vision & Special Requests
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="Tell us about the celebration vibe, dietary preferences, wine interests, or custom requests."
                      className="w-full rounded-lg border border-[#c5a059]/30 bg-[#14110f] px-3.5 py-2.5 text-xs text-[#f4eee6] outline-none placeholder:text-[#6e6457] focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full rounded-lg bg-[#c5a059] py-3.5 text-xs font-semibold uppercase tracking-wider text-[#161311] transition-all hover:bg-[#dfba74] active:scale-98"
                >
                  Submit Private Event Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
