import { motion } from 'motion/react';
import { ActivePage } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Flame, Trees, Wheat, HeartHandshake, ArrowRight } from 'lucide-react';

interface AboutViewProps {
  setActivePage: (page: ActivePage) => void;
}

export function AboutView({ setActivePage }: AboutViewProps) {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="border-b border-[#c5a059]/20 bg-[#14110f] px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <span className="eyebrow">Our Origins</span>
          <h1 className="mt-3 font-serif text-5xl text-[#f4eee6] sm:text-6xl">
            Born from wood smoke and devotion.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[#a3998b]">
            Ember Kitchens was founded on a simple truth: before gas ranges and digital ovens, human cooking was an intimate conversation with fire.
          </p>
        </div>
      </section>

      {/* Main Philosophy & Chef Narrative */}
      <section className="section-shell">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-sm leading-relaxed text-[#c2b9ac]">
            <span className="eyebrow">The Custodian of Flame</span>
            <h2 className="font-serif text-4xl text-[#f4eee6] sm:text-5xl">
              Chef Mira Sethi
            </h2>
            <p className="text-base text-[#f4eee6]">
              “We don't use smoke to overpower. We use flame to reveal the quiet sweetness trapped inside a parsnip, the crisp maritime salinity of mackerel, or the deep umami of slow-roasted onions.”
            </p>
            <p>
              Trained across rustic Basque grillhouses and coastal Konkan hearths, Chef Mira returned to Mumbai with a singular ambition: build a kitchen that eliminates every unnecessary modern gadget, putting fire, cast iron, and artisanal ingredients front and centre.
            </p>
            <p>
              At Ember, the kitchen begins every morning at 6:00 AM with the lighting of the hearth. By evening service, a steady bed of silver embers radiates even, mellow heat across our three cast iron tiers.
            </p>

            <div className="pt-4">
              <button
                onClick={() => {
                  setActivePage('reservations');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-[#c5a059] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#161311] transition-all hover:bg-[#dfba74]"
              >
                Reserve Chef’s Counter <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-2xl border border-[#c5a059]/30 shadow-2xl">
              <img
                src="/assets/ember-chef-fpcKDRrx.jpg"
                alt="Chef Mira Sethi tending the wood embers"
                className="aspect-[4/3] size-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <p className="mt-3 text-center text-xs text-[#8a8073]">
              Chef Mira at the custom triple-tier hearth, Old Quarter, Mumbai.
            </p>
          </div>
        </div>
      </section>

      {/* The 4 Pillars */}
      <section className="border-y border-[#c5a059]/20 bg-[#14110f]">
        <div className="section-shell">
          <div className="text-center">
            <span className="eyebrow">The Four Tenets</span>
            <h2 className="mt-3 font-serif text-4xl text-[#f4eee6] sm:text-5xl">
              What guides our table
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-[#c5a059]/20 bg-[#1a1613] p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-[#c5a059]/15 text-[#c5a059]">
                <Trees className="size-5" />
              </div>
              <h3 className="mt-4 font-serif text-xl text-[#f4eee6]">Curated Hardwoods</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#a3998b]">
                We burn only seasoned Babool, Konkan Tamarind charcoal, and orchard applewood—never chemical briquettes or treated fuel.
              </p>
            </div>

            <div className="rounded-xl border border-[#c5a059]/20 bg-[#1a1613] p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-[#c5a059]/15 text-[#c5a059]">
                <Wheat className="size-5" />
              </div>
              <h3 className="mt-4 font-serif text-xl text-[#f4eee6]">Direct Terroir</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#a3998b]">
                Heirloom root vegetables, hand-churned grass-fed butter, and wild catch from artisanal day-boats operating out of Sassoon Docks.
              </p>
            </div>

            <div className="rounded-xl border border-[#c5a059]/20 bg-[#1a1613] p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-[#c5a059]/15 text-[#c5a059]">
                <Flame className="size-5" />
              </div>
              <h3 className="mt-4 font-serif text-xl text-[#f4eee6]">Patient Coals</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#a3998b]">
                True fire cooking is not fast grilling. Our short ribs spend eight quiet hours resting in terracotta above waning ash.
              </p>
            </div>

            <div className="rounded-xl border border-[#c5a059]/20 bg-[#1a1613] p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-[#c5a059]/15 text-[#c5a059]">
                <HeartHandshake className="size-5" />
              </div>
              <h3 className="mt-4 font-serif text-xl text-[#f4eee6]">Communal Soul</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#a3998b]">
                Dining at Ember is unpretentious and warm. Plates are crafted for tearing, sharing, dipping, and savoring together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Wood Varieties Showcase */}
      <section className="section-shell">
        <div className="max-w-2xl">
          <span className="eyebrow">The Aromatics of Fire</span>
          <h2 className="mt-3 font-serif text-4xl text-[#f4eee6] sm:text-5xl">
            Our wood library
          </h2>
          <p className="mt-3 text-sm text-[#a3998b]">
            Different woods yield radically different aromas, heat profiles, and finish notes on the palate.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-[#c5a059]/25 bg-[#181412] p-6">
            <span className="eyebrow block text-[10px]">Maharashtra Babool</span>
            <h3 className="mt-2 font-serif text-2xl text-[#f4eee6]">Dense Acacia Hardwood</h3>
            <p className="mt-3 text-xs leading-relaxed text-[#c2b9ac]">
              Burns intensely hot and clean, generating radiant infrared coals ideal for searing our aged lamb chops and whole line-caught sea bass.
            </p>
          </div>

          <div className="rounded-xl border border-[#c5a059]/25 bg-[#181412] p-6">
            <span className="eyebrow block text-[10px]">Konkan Tamarind Coals</span>
            <h3 className="mt-2 font-serif text-2xl text-[#f4eee6]">Slow-Burn Tamarind</h3>
            <p className="mt-3 text-xs leading-relaxed text-[#c2b9ac]">
              Sourced from sustainable orchard pruning in the coastal Konkan belt. Gives a subtle tart, nutty whisper to our charred eggplant and sourdough flatbreads.
            </p>
          </div>

          <div className="rounded-xl border border-[#c5a059]/25 bg-[#181412] p-6">
            <span className="eyebrow block text-[10px]">Himachal Orchard Applewood</span>
            <h3 className="mt-2 font-serif text-2xl text-[#f4eee6]">Sweet Fruitwood Embers</h3>
            <p className="mt-3 text-xs leading-relaxed text-[#c2b9ac]">
              Gentle, fragrant, and rounded. Reserved for smoking raw milk ricotta, heirloom beetroots, and our smoked dark chocolate pot de crème.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
