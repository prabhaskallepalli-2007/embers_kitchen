import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Clock, 
  Send, 
  CheckCircle2, 
  Compass,
  Car,
  Train
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-0">
      {/* Page Header */}
      <section className="bg-[#120f0d] border-b border-[#c5a059]/15 py-16 sm:py-20 px-5 sm:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow">Contact &amp; Visit</p>
          <h1 className="mt-3 font-serif text-5xl sm:text-6xl text-[#f4eee6]">
            Come find the fire.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#a3998b] leading-relaxed">
            Located on Hearth Lane in Mumbai's historic quarter. We look forward to greeting you at the table.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section-shell grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Image & Details */}
        <div className="space-y-8">
          <div className="rounded-xl overflow-hidden border border-[#c5a059]/20 shadow-xl">
            <img
              src="/assets/ember-exterior-BXQHTK2e.jpg"
              alt="Ember Kitchens exterior facade on Hearth Lane"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-[#c5a059]/15 bg-[#1c1815]">
              <div className="flex items-center gap-2.5 text-[#dfba74] mb-2">
                <MapPin className="size-4.5" />
                <span className="eyebrow">Address</span>
              </div>
              <p className="text-sm text-[#f4eee6] font-serif text-base">14 Hearth Lane, Old Quarter</p>
              <p className="text-xs text-[#a3998b] mt-0.5">Mumbai, Maharashtra 400001</p>
            </div>

            <div className="p-5 rounded-xl border border-[#c5a059]/15 bg-[#1c1815]">
              <div className="flex items-center gap-2.5 text-[#dfba74] mb-2">
                <Clock className="size-4.5" />
                <span className="eyebrow">Service Hours</span>
              </div>
              <p className="text-sm text-[#f4eee6]">Tuesday – Sunday</p>
              <p className="text-xs text-[#a3998b] mt-0.5">12:00 PM – 11:00 PM (Mon Closed)</p>
            </div>

            <div className="p-5 rounded-xl border border-[#c5a059]/15 bg-[#1c1815]">
              <div className="flex items-center gap-2.5 text-[#dfba74] mb-2">
                <Phone className="size-4.5" />
                <span className="eyebrow">Telephone</span>
              </div>
              <p className="text-sm text-[#f4eee6]">+91 98200 12345</p>
              <p className="text-xs text-[#a3998b] mt-0.5">Concierge desk open daily from 10 AM</p>
            </div>

            <div className="p-5 rounded-xl border border-[#c5a059]/15 bg-[#1c1815]">
              <div className="flex items-center gap-2.5 text-[#dfba74] mb-2">
                <Mail className="size-4.5" />
                <span className="eyebrow">Email &amp; Social</span>
              </div>
              <p className="text-sm text-[#f4eee6]">hello@emberkitchens.demo</p>
              <p className="text-xs text-[#a3998b] mt-0.5">@emberkitchens.demo</p>
            </div>
          </div>
        </div>

        {/* Right Column: Send an Enquiry */}
        <div>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 rounded-xl border border-[#c5a059]/30 bg-[#1c1815] text-center shadow-2xl"
              >
                <div className="size-14 mx-auto rounded-full bg-[#c5a059] text-[#161311] flex items-center justify-center mb-4">
                  <CheckCircle2 className="size-8" />
                </div>
                <h3 className="font-serif text-3xl text-[#f4eee6]">Message Sent</h3>
                <p className="mt-2 text-sm text-[#a3998b] leading-relaxed">
                  Thank you for reaching out to Ember Kitchens. Our hospitality desk will reply shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 border border-[#c5a059]/40 hover:bg-[#c5a059]/10 text-xs uppercase tracking-wider text-[#dfba74] rounded"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="rounded-xl border border-[#c5a059]/20 bg-[#1c1815] p-6 sm:p-10 shadow-2xl space-y-5"
              >
                <div>
                  <p className="eyebrow">Direct Message</p>
                  <h3 className="mt-1 font-serif text-3xl text-[#f4eee6]">We'd love to hear from you.</h3>
                  <p className="text-xs text-[#a3998b] mt-1">
                    Questions regarding wine cellar availability, dietary accommodations, or press inquiries.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a3998b] mb-1.5 font-medium">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Vikram Malhotra"
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
                      placeholder="vikram@example.com"
                      className="w-full bg-[#14110f] border border-[#c5a059]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#f4eee6] placeholder:text-[#a3998b]/50 focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a3998b] mb-1.5 font-medium">
                      Inquiry Subject
                    </label>
                    <select className="w-full bg-[#14110f] border border-[#c5a059]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#f4eee6] focus:border-[#c5a059] outline-none">
                      <option>General Inquiries</option>
                      <option>Sommelier &amp; Wine Cellar Inquiries</option>
                      <option>Press &amp; Editorial</option>
                      <option>Culinary Careers &amp; Apprenticeships</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a3998b] mb-1.5 font-medium">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="How may we assist your visit to Ember Kitchens?"
                      className="w-full bg-[#14110f] border border-[#c5a059]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#f4eee6] placeholder:text-[#a3998b]/50 focus:border-[#c5a059] outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#c5a059] to-[#dfba74] text-[#161311] font-semibold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow flex items-center justify-center gap-2"
                >
                  <Send className="size-3.5" />
                  <span>Send Message</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Styled Interactive Map & Directions Guide */}
      <section className="border-t border-[#c5a059]/15 bg-[#14110f] py-16 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl border border-[#c5a059]/20 bg-[#1c1815] overflow-hidden p-8 sm:p-12 relative">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-2 text-[#dfba74]">
                <Compass className="size-5" />
                <span className="eyebrow">Arriving at 14 Hearth Lane</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#f4eee6]">
                Directions &amp; Valet Service
              </h3>
              <p className="text-sm text-[#a3998b] leading-relaxed">
                Tucked into the historic cobblestone lane off Colaba Causeway. Complimentary valet parking is stationed at our main entrance from 6:30 PM nightly.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs text-[#a3998b]">
                <div className="flex items-start gap-2.5">
                  <Car className="size-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>Complimentary valet parking available on Hearth Lane</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Train className="size-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>8 minutes from Churchgate &amp; CST stations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
