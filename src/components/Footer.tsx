import { useState } from 'react';
import { ActivePage } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Flame, MapPin, Phone, Mail, Instagram, ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export function Footer({ setActivePage }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3500);
  };

  const nav = (p: ActivePage) => {
    setActivePage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#c5a059]/20 bg-[#120f0d] text-[#f4eee6]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand Col */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full border border-[#c5a059]/40 bg-[#1c1815]">
                <Flame className="size-5 text-[#c5a059]" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-2xl font-medium tracking-wider text-[#c5a059] leading-tight">
                  EMBER
                </span>
                <span className="text-[10px] uppercase font-medium tracking-[0.32em] text-[#c2b9ac] mt-0.5">
                  KITCHENS
                </span>
              </div>
            </div>
            <p className="mt-4 font-serif text-lg italic text-[#a3998b]">
              Fire, salt & the quiet art of the table.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-[#8a8073]">
              A seasonal, wood-fired kitchen in Mumbai’s historic Old Quarter. Dedicated to local terroir, artisanal fishermen, and the timeless simplicity of open flame.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex size-9 items-center justify-center rounded-full border border-[#c5a059]/30 bg-[#181412] text-[#a3998b] transition-colors hover:border-[#c5a059] hover:text-[#dfba74]"
                aria-label="Instagram"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href={`mailto:${RESTAURANT_INFO.email}`}
                className="flex size-9 items-center justify-center rounded-full border border-[#c5a059]/30 bg-[#181412] text-[#a3998b] transition-colors hover:border-[#c5a059] hover:text-[#dfba74]"
                aria-label="Email"
              >
                <Mail className="size-4" />
              </a>
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="flex size-9 items-center justify-center rounded-full border border-[#c5a059]/30 bg-[#181412] text-[#a3998b] transition-colors hover:border-[#c5a059] hover:text-[#dfba74]"
                aria-label="Phone"
              >
                <Phone className="size-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-4">
            <div>
              <span className="eyebrow block">Navigation</span>
              <ul className="mt-4 space-y-2.5 text-xs">
                <li>
                  <button onClick={() => nav('home')} className="text-[#a3998b] hover:text-[#dfba74]">
                    Home Experience
                  </button>
                </li>
                <li>
                  <button onClick={() => nav('menu')} className="text-[#a3998b] hover:text-[#dfba74]">
                    Seasonal Menu
                  </button>
                </li>
                <li>
                  <button onClick={() => nav('reservations')} className="text-[#a3998b] hover:text-[#dfba74]">
                    Table Reservations
                  </button>
                </li>
                <li>
                  <button onClick={() => nav('order-online')} className="text-[#a3998b] hover:text-[#dfba74]">
                    Order Online & Delivery
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <span className="eyebrow block">Experiences</span>
              <ul className="mt-4 space-y-2.5 text-xs">
                <li>
                  <button onClick={() => nav('about')} className="text-[#a3998b] hover:text-[#dfba74]">
                    Chef & Story
                  </button>
                </li>
                <li>
                  <button onClick={() => nav('gallery')} className="text-[#a3998b] hover:text-[#dfba74]">
                    Atmosphere Gallery
                  </button>
                </li>
                <li>
                  <button onClick={() => nav('events')} className="text-[#a3998b] hover:text-[#dfba74]">
                    Private Dining & Events
                  </button>
                </li>
                <li>
                  <button onClick={() => nav('contact')} className="text-[#a3998b] hover:text-[#dfba74]">
                    Location & Directions
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Location & Hearth Journal Newsletter */}
          <div className="lg:col-span-4">
            <span className="eyebrow block">The Hearth Journal</span>
            <p className="mt-2 text-xs leading-relaxed text-[#a3998b]">
              Receive invitations to our monthly Hearth Suppers, cellar tastings, and seasonal menu previews.
            </p>

            <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full rounded-lg border border-[#c5a059]/30 bg-[#181412] px-3.5 py-2.5 text-xs text-[#f4eee6] outline-none placeholder:text-[#6e6457] focus:border-[#c5a059]"
              />
              <button
                type="submit"
                className="flex items-center justify-center rounded-lg bg-[#c5a059] px-4 py-2.5 text-xs font-medium text-[#161311] transition-colors hover:bg-[#dfba74]"
              >
                {subscribed ? <Check className="size-4" /> : <ArrowRight className="size-4" />}
              </button>
            </form>

            {subscribed && (
              <p className="mt-2 text-[11px] text-[#dfba74]">
                Thank you. You are on the Ember guest list.
              </p>
            )}

            <div className="mt-6 border-t border-[#c5a059]/15 pt-4 text-xs text-[#a3998b]">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-[#c5a059]" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <p className="mt-1 pl-5 text-[11px] text-[#736a5e]">
                {RESTAURANT_INFO.hours.weekdays}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#c5a059]/15 pt-8 text-xs text-[#6e6457] sm:flex-row">
          <p>© {new Date().getFullYear()} Ember Kitchens. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-[11px]">Wood-Fired · Farm-To-Hearth · Mumbai</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
