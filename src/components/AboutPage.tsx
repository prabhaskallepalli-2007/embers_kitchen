import React from 'react';
import { motion } from 'motion/react';
import { Flame, Sparkles, Heart, Award, ArrowRight } from 'lucide-react';
import { PageRoute } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <section className="bg-[#120f0d] border-b border-[#c5a059]/15 py-16 sm:py-20 px-5 sm:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow">Our Story</p>
          <h1 className="mt-3 font-serif text-5xl sm:text-6xl text-[#f4eee6]">
            A kitchen built around the fire.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#a3998b] leading-relaxed">
            Local produce, patient craft and a dining room designed for unhurried evenings in Mumbai's historic old quarter.
          </p>
        </div>
      </section>

      {/* Section 1: Philosophy */}
      <section className="section-shell grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="rounded-xl overflow-hidden border border-[#c5a059]/20 shadow-xl">
          <img
            src="/assets/ember-interior-hoYVSs9w.jpg"
            alt="Ember Kitchens candlelit dining room"
            className="aspect-[4/5] object-cover size-full"
          />
        </div>

        <div className="space-y-6">
          <p className="eyebrow">Since 2016</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#f4eee6]">
            One hearth. A thousand evenings.
          </h2>
          <p className="text-base text-[#a3998b] leading-relaxed">
            Ember began with Chef Mira Sethi's conviction that fire is not a cooking technique, but an elemental ingredient. Our menu follows the seasonal micro-farms, regional fisherfolk, and salt-pans of Western India, bringing familiar coastal flavors a quieter, more considered expression.
          </p>
          <p className="text-base text-[#a3998b] leading-relaxed">
            Every table has an unencumbered sightline to the open brick hearth. Every plate carries gentle wood smoke, charred botanicals, or the lingering warmth of live charcoal.
          </p>
          <div className="pt-2 flex items-center gap-6 text-sm text-[#dfba74]">
            <div>
              <span className="font-serif text-3xl font-medium block text-[#f4eee6]">100%</span>
              <span className="text-xs uppercase tracking-wider text-[#a3998b]">Native Hardwood Charred</span>
            </div>
            <div className="w-[1px] h-10 bg-[#c5a059]/20" />
            <div>
              <span className="font-serif text-3xl font-medium block text-[#f4eee6]">48 hrs</span>
              <span className="text-xs uppercase tracking-wider text-[#a3998b]">Slow Marinades</span>
            </div>
            <div className="w-[1px] h-10 bg-[#c5a059]/20" />
            <div>
              <span className="font-serif text-3xl font-medium block text-[#f4eee6]">12</span>
              <span className="text-xs uppercase tracking-wider text-[#a3998b]">Hearth Counter Seats</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Chef Spotlight */}
      <section className="border-y border-[#c5a059]/15 bg-[#14110f] py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <p className="eyebrow">Head Chef &amp; Founder</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#f4eee6]">
              Chef Mira Sethi
            </h2>
            <p className="text-base text-[#a3998b] leading-relaxed">
              After rigorous years in progressive kitchens across Copenhagen, Singapore, and Mumbai, Mira returned to establish a restaurant where precision never feels formal, and true luxury means quiet attention to detail.
            </p>
            <p className="text-base text-[#a3998b] leading-relaxed">
              “When you cook over wood and ember, there are no temperature dials to save you. You must watch the coals breathe, feel the radiating thermal wave, and trust your intuition. That vulnerability is what makes the food sing.”
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('reservations')}
                className="px-6 py-3 rounded bg-gradient-to-r from-[#c5a059] to-[#dfba74] text-[#161311] text-xs uppercase tracking-widest font-semibold hover:brightness-110 transition-all shadow"
              >
                Meet us at the table
              </button>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#c5a059]/20 shadow-xl order-1 lg:order-2">
            <img
              src="/assets/ember-chef-fpcKDRrx.jpg"
              alt="Chef Mira Sethi tending the hearth"
              className="aspect-[4/5] object-cover size-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
