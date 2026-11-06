import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Utensils, 
  ChevronRight, 
  Info,
  Phone,
  Mail,
  User
} from 'lucide-react';
import { ReservationDetails } from '../types';

export const ReservationForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<ReservationDetails>({
    id: 'EK-1001',
    name: '',
    fullName: '',
    phone: '',
    email: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '19:30',
    guests: 2,
    seating: 'Open floor',
    seatingArea: 'main-hall',
    specialRequests: '',
    occasion: 'Dinner',
    createdAt: new Date().toISOString()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const seatingOptions = [
    { title: 'Open floor', desc: 'Main dining room under warm vaulted wooden beams' },
    { title: "Chef's counter", desc: 'Direct views of the live wood-fired hearth and chefs' },
    { title: 'Window', desc: 'Overlooking the quiet cobblestone of Hearth Lane' },
    { title: 'Courtyard Terrace', desc: 'Open air candlelit greenery with gentle warmth' },
    { title: 'Private room', desc: 'Dedicated intimate dining for special groups (up to 16)' }
  ];

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 sm:p-12 rounded-xl border border-[#c5a059]/30 bg-[#1c1815] text-center max-w-xl mx-auto shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 size-36 rounded-full bg-[#c5a059]/10 blur-2xl" />
            
            <div className="size-16 mx-auto rounded-full bg-gradient-to-br from-[#c5a059] to-[#dfba74] text-[#161311] flex items-center justify-center shadow-lg mb-6">
              <CheckCircle2 className="size-8 stroke-[2.2]" />
            </div>

            <p className="eyebrow">Table Request Confirmed</p>
            <h3 className="mt-2 font-serif text-3xl sm:text-4xl text-[#f4eee6]">
              We have reserved your seat.
            </h3>
            
            <div className="my-6 p-4 rounded-lg bg-[#14110f] border border-[#c5a059]/15 text-left text-sm space-y-2 text-[#a3998b]">
              <div className="flex justify-between">
                <span className="text-white/60">Guest</span>
                <span className="text-[#f4eee6] font-medium">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Date & Time</span>
                <span className="text-[#dfba74] font-medium">{formData.date} at {formData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Party</span>
                <span className="text-[#f4eee6]">{formData.guests} Guests ({formData.seating})</span>
              </div>
              {formData.occasion && (
                <div className="flex justify-between">
                  <span className="text-white/60">Occasion</span>
                  <span className="text-[#f4eee6]">{formData.occasion}</span>
                </div>
              )}
            </div>

            <p className="text-xs text-[#a3998b] leading-relaxed max-w-md mx-auto">
              A demonstration reservation confirmation token has been recorded in your browser. Our host team will also greet you warmly upon arrival at 14 Hearth Lane.
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="mt-8 px-6 py-2.5 rounded border border-[#c5a059]/40 hover:bg-[#c5a059]/10 text-xs uppercase tracking-wider font-medium text-[#dfba74] transition-colors"
            >
              Modify or Book Another Table
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onSubmit={handleSubmit}
            className="rounded-xl border border-[#c5a059]/25 bg-[#1c1815] p-6 sm:p-10 shadow-2xl space-y-6"
          >
            <div>
              <p className="eyebrow">Reservation Form</p>
              <h3 className="mt-2 font-serif text-3xl text-[#f4eee6]">Reserve Your Experience</h3>
              <p className="mt-1 text-sm text-[#a3998b]">
                For groups larger than 10, or private whole-hearth buyouts, please contact our events host directly.
              </p>
            </div>

            {/* Guest details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#a3998b] mb-1.5 font-medium">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Aarav Mehta"
                    className="w-full bg-[#14110f] border border-[#c5a059]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#f4eee6] placeholder:text-[#a3998b]/50 focus:border-[#c5a059] outline-none transition-colors"
                  />
                  <User className="absolute right-3 top-3 size-4 text-[#a3998b]/50 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#a3998b] mb-1.5 font-medium">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98200 00000"
                    className="w-full bg-[#14110f] border border-[#c5a059]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#f4eee6] placeholder:text-[#a3998b]/50 focus:border-[#c5a059] outline-none transition-colors"
                  />
                  <Phone className="absolute right-3 top-3 size-4 text-[#a3998b]/50 pointer-events-none" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-[#a3998b] mb-1.5 font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@email.com"
                    className="w-full bg-[#14110f] border border-[#c5a059]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#f4eee6] placeholder:text-[#a3998b]/50 focus:border-[#c5a059] outline-none transition-colors"
                  />
                  <Mail className="absolute right-3 top-3 size-4 text-[#a3998b]/50 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Date, Time & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#a3998b] mb-1.5 font-medium">
                  Date
                </label>
                <input
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-[#14110f] border border-[#c5a059]/20 rounded-lg px-3 py-2.5 text-sm text-[#f4eee6] focus:border-[#c5a059] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#a3998b] mb-1.5 font-medium">
                  Time
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-[#14110f] border border-[#c5a059]/20 rounded-lg px-3 py-2.5 text-sm text-[#f4eee6] focus:border-[#c5a059] outline-none transition-colors"
                >
                  <option value="12:30">12:30 PM (Lunch)</option>
                  <option value="13:30">01:30 PM (Lunch)</option>
                  <option value="14:00">02:00 PM (Lunch)</option>
                  <option value="19:00">07:00 PM (Dinner)</option>
                  <option value="19:30">07:30 PM (Dinner)</option>
                  <option value="20:00">08:00 PM (Dinner)</option>
                  <option value="20:30">08:30 PM (Dinner)</option>
                  <option value="21:15">09:15 PM (Hearth Supper)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#a3998b] mb-1.5 font-medium">
                  Party Size
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) })}
                  className="w-full bg-[#14110f] border border-[#c5a059]/20 rounded-lg px-3 py-2.5 text-sm text-[#f4eee6] focus:border-[#c5a059] outline-none transition-colors"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Seating preference selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#a3998b] mb-2 font-medium">
                Seating Atmosphere Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {seatingOptions.map((opt) => (
                  <button
                    key={opt.title}
                    type="button"
                    onClick={() => setFormData({ ...formData, seating: opt.title as any })}
                    className={`text-left p-3 rounded-lg border transition-all ${
                      formData.seating === opt.title
                        ? 'bg-[#c5a059]/15 border-[#c5a059] text-[#dfba74]'
                        : 'bg-[#14110f] border-[#c5a059]/15 text-[#a3998b] hover:border-[#c5a059]/40'
                    }`}
                  >
                    <p className="font-serif text-base text-[#f4eee6] font-medium">{opt.title}</p>
                    <p className="text-[11px] text-[#a3998b] leading-tight mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion and special requests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#a3998b] mb-1.5 font-medium">
                  Occasion
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value as any })}
                  className="w-full bg-[#14110f] border border-[#c5a059]/20 rounded-lg px-3 py-2.5 text-sm text-[#f4eee6] focus:border-[#c5a059] outline-none transition-colors"
                >
                  <option value="Dinner">Casual Evening Dinner</option>
                  <option value="Birthday">Birthday Celebration</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Romantic Date">Romantic Date</option>
                  <option value="Business">Business / Executive Meeting</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#a3998b] mb-1.5 font-medium">
                  Dietary or Accessibility Notes
                </label>
                <input
                  type="text"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="Allergies, high chair, anniversary champagne"
                  className="w-full bg-[#14110f] border border-[#c5a059]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#f4eee6] placeholder:text-[#a3998b]/50 focus:border-[#c5a059] outline-none transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#c5a059] to-[#dfba74] text-[#161311] font-medium text-xs uppercase tracking-widest hover:brightness-110 active:scale-[0.99] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Confirm Reservation Request</span>
              <ChevronRight className="size-4" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
