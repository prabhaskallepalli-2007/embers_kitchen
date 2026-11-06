import { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MapPin, Phone, Mail, Clock, Car, ExternalLink, Send, Check } from 'lucide-react';

const FAQS = [
  {
    q: 'Is there a dress code at Ember Kitchens?',
    a: 'We embrace smart casual. We kindly request guests refrain from athletic sportswear, gym wear, or flip-flops during evening hearth service.'
  },
  {
    q: 'Do you offer vegetarian and vegan tasting menus?',
    a: 'Yes, absolutely. Over half of our seasonal plates are vegetarian, utilizing heirloom tubers, wood-roasted mushrooms, and house-cultured dairy. Please notify us during booking.'
  },
  {
    q: 'Is valet parking available?',
    a: 'Yes, complimentary valet parking is available right at the entrance of Ember Kitchens on Hearth Lane from 12:00 PM onwards.'
  },
  {
    q: 'What is your corkage and cellar policy?',
    a: 'We welcome special personal vintage bottles with a corkage fee of ₹1,500 per 750ml bottle, up to a maximum of two bottles per party.'
  },
  {
    q: 'Are children welcome at the restaurant?',
    a: 'Children aged 8 and above are warmly welcomed in the main dining room. For safety reasons around the open flames and flying embers, our front-row Chef’s Counter is reserved for guests 16 and older.'
  }
];

export function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSent(false);
    }, 4000);
  };

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="border-b border-[#c5a059]/20 bg-[#14110f] px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <span className="eyebrow">Connect & Visit</span>
          <h1 className="mt-3 font-serif text-5xl text-[#f4eee6] sm:text-6xl">
            Our doors are open.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[#a3998b]">
            Located on Hearth Lane in the historic Old Quarter of Mumbai. For table bookings, private dining, or culinary inquiries, reach out below.
          </p>
        </div>
      </section>

      {/* Contact Cards & Map */}
      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Info cards */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-xl border border-[#c5a059]/30 bg-[#1a1613] p-6 space-y-5">
              <h3 className="font-serif text-2xl text-[#f4eee6]">Location & Hours</h3>

              <div className="flex items-start gap-3 text-xs text-[#c2b9ac]">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#c5a059]" />
                <div>
                  <strong className="block text-sm text-[#f4eee6]">Address</strong>
                  <span>{RESTAURANT_INFO.address}</span>
                  <a
                    href="https://maps.google.com/?q=Mumbai+Old+Quarter"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 flex items-center gap-1 text-[#dfba74] hover:underline"
                  >
                    Open in Google Maps <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-[#c2b9ac]">
                <Clock className="mt-0.5 size-4 shrink-0 text-[#c5a059]" />
                <div>
                  <strong className="block text-sm text-[#f4eee6]">Opening Hours</strong>
                  <p>{RESTAURANT_INFO.hours.weekdays}</p>
                  <p>{RESTAURANT_INFO.hours.weekends}</p>
                  <p className="text-[11px] text-[#8a8073] mt-1">{RESTAURANT_INFO.hours.closed}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-[#c2b9ac]">
                <Phone className="mt-0.5 size-4 shrink-0 text-[#c5a059]" />
                <div>
                  <strong className="block text-sm text-[#f4eee6]">Direct Lines</strong>
                  <p>Reservations: {RESTAURANT_INFO.phone}</p>
                  <p>Events: {RESTAURANT_INFO.eventsPhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-[#c2b9ac]">
                <Car className="mt-0.5 size-4 shrink-0 text-[#c5a059]" />
                <div>
                  <strong className="block text-sm text-[#f4eee6]">Valet & Arrival</strong>
                  <p>Complimentary doorstep valet parking on Hearth Lane.</p>
                </div>
              </div>
            </div>

            {/* Quick Map visual card */}
            <div className="relative overflow-hidden rounded-xl border border-[#c5a059]/25 bg-[#161311]">
              <img
                src="/assets/ember-exterior-BXQHTK2e.jpg"
                alt="Ember Kitchens entrance"
                className="h-48 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161311] to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <p className="font-serif text-lg text-[#f4eee6]">Old Quarter, Mumbai</p>
                  <p className="text-[11px] text-[#a3998b]">Just off Heritage Circle</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Mumbai+Old+Quarter"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-[#c5a059] px-3 py-1.5 text-xs font-semibold text-[#161311]"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[#c5a059]/30 bg-[#1a1613] p-6 sm:p-8">
              <span className="eyebrow block">Drop Us a Line</span>
              <h3 className="mt-1 font-serif text-3xl text-[#f4eee6]">Send an inquiry</h3>
              <p className="mt-2 text-xs text-[#a3998b]">
                For press inquiries, private collaborations, or general questions, kindly submit below.
              </p>

              {sent ? (
                <div className="mt-8 rounded-lg bg-[#14110f] p-8 text-center border border-[#c5a059]/40">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#c5a059]/20 text-[#c5a059]">
                    <Check className="size-6" />
                  </div>
                  <h4 className="mt-3 font-serif text-2xl text-[#f4eee6]">Message Dispatched</h4>
                  <p className="mt-2 text-xs text-[#a3998b]">
                    Thank you, your message has been sent to our guest relations desk. We will respond promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs uppercase tracking-wider text-[#a3998b]">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Maya Deshmukh"
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
                        placeholder="maya@example.com"
                        className="w-full rounded-lg border border-[#c5a059]/30 bg-[#14110f] px-3.5 py-2.5 text-xs text-[#f4eee6] outline-none placeholder:text-[#6e6457] focus:border-[#c5a059]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-[#a3998b]">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      placeholder="Press Inquiry / Wine Cellar / Private Gathering"
                      className="w-full rounded-lg border border-[#c5a059]/30 bg-[#14110f] px-3.5 py-2.5 text-xs text-[#f4eee6] outline-none placeholder:text-[#6e6457] focus:border-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-wider text-[#a3998b]">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Write your note to our team..."
                      className="w-full rounded-lg border border-[#c5a059]/30 bg-[#14110f] px-3.5 py-2.5 text-xs text-[#f4eee6] outline-none placeholder:text-[#6e6457] focus:border-[#c5a059]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#c5a059] py-3 text-xs font-semibold uppercase tracking-wider text-[#161311] transition-all hover:bg-[#dfba74]"
                  >
                    <Send className="size-3.5" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-[#c5a059]/20 bg-[#14110f]">
        <div className="section-shell max-w-4xl">
          <div className="text-center">
            <span className="eyebrow">Guest Information</span>
            <h2 className="mt-3 font-serif text-4xl text-[#f4eee6]">Frequently Asked Questions</h2>
          </div>

          <div className="mt-10 space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-xl border border-[#c5a059]/20 bg-[#1a1613]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left font-serif text-lg text-[#f4eee6] transition-colors hover:text-[#dfba74]"
                >
                  <span>{faq.q}</span>
                  <span className="text-xl text-[#c5a059]">
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="border-t border-[#c5a059]/15 px-5 pb-5 pt-3 text-xs leading-relaxed text-[#c2b9ac]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
