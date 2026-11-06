import { useState } from 'react';
import { motion } from 'motion/react';
import { SeatingArea, ReservationDetails } from '../types';
import { SEATING_OPTIONS, RESTAURANT_INFO } from '../data/restaurantData';
import { ReservationModal } from '../components/ReservationModal';
import { hearthAudio } from '../utils/audioSynth';
import { Calendar, Clock, Users, Check, Sparkles, AlertCircle, Info, ShieldCheck } from 'lucide-react';

interface ReservationsViewProps {
  initialDate?: string;
  initialGuests?: number;
}

const LUNCH_SLOTS = ['12:00 PM', '12:45 PM', '1:30 PM', '2:15 PM'];
const DINNER_SLOTS = ['6:30 PM', '7:15 PM', '8:00 PM', '8:45 PM', '9:30 PM', '10:15 PM'];

const OCCASIONS = [
  'Casual Dining',
  'Romantic Date Night',
  'Anniversary',
  'Birthday Celebration',
  'Business Dinner',
  'Hearth Tasting Menu'
];

export function ReservationsView({ initialDate, initialGuests }: ReservationsViewProps) {
  const [seatingArea, setSeatingArea] = useState<SeatingArea>('chef-counter');
  const [date, setDate] = useState(() => {
    if (initialDate) return initialDate;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // If tomorrow is Monday (day 1), advance to Tuesday
    if (tomorrow.getDay() === 1) {
      tomorrow.setDate(tomorrow.getDate() + 1);
    }
    return tomorrow.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('7:15 PM');
  const [guests, setGuests] = useState(initialGuests || 2);
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationDetails | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Validate date is not Monday
  const handleDateChange = (val: string) => {
    const selected = new Date(val);
    if (selected.getDay() === 1) {
      setErrorMsg('Note: Ember Kitchens is closed on Mondays for hearth resting and direct farm sourcing. Please select Tuesday through Sunday.');
    } else {
      setErrorMsg('');
    }
    setDate(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    // Generate unique reservation ID
    const refCode = `EK-${Math.floor(1000 + Math.random() * 9000)}`;

    const details: ReservationDetails = {
      id: refCode,
      name,
      phone,
      email,
      date,
      time,
      guests,
      seatingArea,
      occasion,
      specialRequests,
      createdAt: new Date().toISOString()
    };

    hearthAudio.playChime();
    setConfirmedReservation(details);
  };

  const selectedSeating = SEATING_OPTIONS.find(s => s.id === seatingArea) || SEATING_OPTIONS[0];

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="border-b border-[#c5a059]/20 bg-[#14110f] px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <span className="eyebrow">Table Reservations</span>
          <h1 className="mt-3 font-serif text-5xl text-[#f4eee6] sm:text-6xl">
            Reserve your seat by the fire.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[#a3998b]">
            Choose between our immersive front-row Chef’s Counter, intimate window hearth, classic main dining hall, or private wine cellar.
          </p>
        </div>
      </section>

      {/* Main Reservation Flow */}
      <section className="section-shell">
        <form onSubmit={handleSubmit} className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Form Controls */}
          <div className="space-y-10 lg:col-span-8">
            {/* Step 1: Seating Area Selection */}
            <div>
              <div className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-full bg-[#c5a059] font-serif text-xs font-bold text-[#161311]">
                  1
                </span>
                <h2 className="font-serif text-2xl text-[#f4eee6]">Select Seating Experience</h2>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {SEATING_OPTIONS.map(opt => {
                  const isSelected = seatingArea === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSeatingArea(opt.id as SeatingArea)}
                      className={`group cursor-pointer overflow-hidden rounded-xl border transition-all ${
                        isSelected
                          ? 'border-[#c5a059] bg-[#221c18] shadow-[0_0_20px_rgba(197,160,89,0.25)] ring-1 ring-[#c5a059]'
                          : 'border-[#c5a059]/20 bg-[#1a1613] hover:border-[#c5a059]/50'
                      }`}
                    >
                      <div className="relative h-32 w-full overflow-hidden">
                        <img
                          src={opt.image}
                          alt={opt.name}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1613] via-transparent to-black/30" />
                        <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] text-[#dfba74] backdrop-blur-sm">
                          {opt.capacity}
                        </span>
                        {isSelected && (
                          <span className="absolute left-3 top-3 flex size-6 items-center justify-center rounded-full bg-[#c5a059] text-[#161311]">
                            <Check className="size-3.5" />
                          </span>
                        )}
                      </div>

                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif text-lg text-[#f4eee6]">{opt.name}</h3>
                          <span className="text-[10px] uppercase tracking-wider text-[#c5a059]">
                            {opt.tag}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[#a3998b]">{opt.subtitle}</p>
                        <p className="mt-2 text-[11px] leading-relaxed text-[#7a7063]">
                          {opt.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Date, Time & Party */}
            <div className="border-t border-[#c5a059]/15 pt-8">
              <div className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-full bg-[#c5a059] font-serif text-xs font-bold text-[#161311]">
                  2
                </span>
                <h2 className="font-serif text-2xl text-[#f4eee6]">Date, Party & Sitting</h2>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {/* Date Picker */}
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wider text-[#a3998b]">
                    Reservation Date
                  </label>
                  <div className="flex items-center gap-3 rounded-lg border border-[#c5a059]/30 bg-[#181412] px-3.5 py-3 text-sm text-[#f4eee6]">
                    <Calendar className="size-4 text-[#c5a059]" />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={e => handleDateChange(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                  {errorMsg && (
                    <p className="mt-2 flex items-start gap-1.5 text-xs text-amber-400">
                      <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
                      {errorMsg}
                    </p>
                  )}
                </div>

                {/* Party Size */}
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wider text-[#a3998b]">
                    Number of Guests
                  </label>
                  <div className="flex items-center gap-3 rounded-lg border border-[#c5a059]/30 bg-[#181412] px-3.5 py-3 text-sm text-[#f4eee6]">
                    <Users className="size-4 text-[#c5a059]" />
                    <select
                      value={guests}
                      onChange={e => setGuests(Number(e.target.value))}
                      className="w-full bg-transparent outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map(num => (
                        <option key={num} value={num} className="bg-[#181412] text-[#f4eee6]">
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div className="mt-6 space-y-4">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#a3998b]">
                    Lunch Sittings (12:00 PM – 3:30 PM)
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2.5">
                    {LUNCH_SLOTS.map(slot => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setTime(slot)}
                        className={`rounded-lg px-4 py-2 text-xs font-medium transition-all ${
                          time === slot
                            ? 'bg-[#c5a059] text-[#161311] shadow-[0_0_10px_rgba(197,160,89,0.3)]'
                            : 'border border-[#c5a059]/25 bg-[#181412] text-[#a3998b] hover:text-[#f4eee6] hover:border-[#c5a059]/50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="block text-xs uppercase tracking-wider text-[#a3998b]">
                    Dinner Hearth Sittings (6:30 PM – 11:00 PM)
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2.5">
                    {DINNER_SLOTS.map(slot => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setTime(slot)}
                        className={`rounded-lg px-4 py-2 text-xs font-medium transition-all ${
                          time === slot
                            ? 'bg-[#c5a059] text-[#161311] shadow-[0_0_10px_rgba(197,160,89,0.3)]'
                            : 'border border-[#c5a059]/25 bg-[#181412] text-[#a3998b] hover:text-[#f4eee6] hover:border-[#c5a059]/50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Contact & Personalization */}
            <div className="border-t border-[#c5a059]/15 pt-8">
              <div className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-full bg-[#c5a059] font-serif text-xs font-bold text-[#161311]">
                  3
                </span>
                <h2 className="font-serif text-2xl text-[#f4eee6]">Guest Details & Occasion</h2>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wider text-[#a3998b]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Aarav Mehta"
                    className="w-full rounded-lg border border-[#c5a059]/30 bg-[#181412] px-4 py-3 text-xs text-[#f4eee6] outline-none placeholder:text-[#6e6457] focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wider text-[#a3998b]">
                    Phone Number (for SMS confirmation) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 98200 00000"
                    className="w-full rounded-lg border border-[#c5a059]/30 bg-[#181412] px-4 py-3 text-xs text-[#f4eee6] outline-none placeholder:text-[#6e6457] focus:border-[#c5a059]"
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
                    placeholder="aarav@example.com"
                    className="w-full rounded-lg border border-[#c5a059]/30 bg-[#181412] px-4 py-3 text-xs text-[#f4eee6] outline-none placeholder:text-[#6e6457] focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wider text-[#a3998b]">
                    Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={e => setOccasion(e.target.value)}
                    className="w-full rounded-lg border border-[#c5a059]/30 bg-[#181412] px-4 py-3 text-xs text-[#f4eee6] outline-none focus:border-[#c5a059]"
                  >
                    {OCCASIONS.map(occ => (
                      <option key={occ} value={occ} className="bg-[#181412] text-[#f4eee6]">
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs uppercase tracking-wider text-[#a3998b]">
                    Dietary Restrictions or Special Requests
                  </label>
                  <textarea
                    rows={3}
                    value={specialRequests}
                    onChange={e => setSpecialRequests(e.target.value)}
                    placeholder="Please let us know of any severe allergies, dietary preferences (jain, vegan, gluten-free), or quiet corner requests."
                    className="w-full rounded-lg border border-[#c5a059]/30 bg-[#181412] px-4 py-3 text-xs text-[#f4eee6] outline-none placeholder:text-[#6e6457] focus:border-[#c5a059]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#c5a059] py-4 font-serif text-lg font-medium text-[#161311] shadow-xl transition-all hover:bg-[#dfba74] hover:shadow-[0_0_25px_rgba(197,160,89,0.35)] active:scale-[0.99]"
            >
              Confirm Table Reservation
            </button>
          </div>

          {/* Right Column: Reservation Summary Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 rounded-xl border border-[#c5a059]/30 bg-[#1a1613] p-6 shadow-xl">
              <span className="eyebrow block">Booking Summary</span>
              <h3 className="mt-2 font-serif text-2xl text-[#f4eee6]">Your Evening at Ember</h3>

              {/* Seating Preview */}
              <div className="mt-5 overflow-hidden rounded-lg border border-[#c5a059]/20">
                <img
                  src={selectedSeating.image}
                  alt={selectedSeating.name}
                  className="h-32 w-full object-cover"
                />
                <div className="bg-[#14110f] p-3">
                  <strong className="block text-xs text-[#f4eee6]">{selectedSeating.name}</strong>
                  <span className="text-[11px] text-[#a3998b]">{selectedSeating.subtitle}</span>
                </div>
              </div>

              {/* Specs */}
              <div className="mt-5 space-y-3 text-xs border-y border-[#c5a059]/15 py-4 text-[#c2b9ac]">
                <div className="flex justify-between">
                  <span className="text-[#a3998b]">Date:</span>
                  <span className="font-medium text-[#f4eee6]">{date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#a3998b]">Sitting:</span>
                  <span className="font-medium text-[#dfba74]">{time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#a3998b]">Guests:</span>
                  <span className="font-medium text-[#f4eee6]">{guests} Persons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#a3998b]">Occasion:</span>
                  <span className="font-medium text-[#f4eee6]">{occasion}</span>
                </div>
              </div>

              {/* Policies */}
              <div className="mt-5 space-y-2 text-[11px] leading-relaxed text-[#7a7063]">
                <p className="flex items-start gap-1.5">
                  <ShieldCheck className="size-3.5 shrink-0 text-[#c5a059]" />
                  <span>Instant reservation confirmation without deposit.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <Info className="size-3.5 shrink-0 text-[#c5a059]" />
                  <span>Tables held for 15 minutes past scheduled time.</span>
                </p>
              </div>

              <div className="mt-6 border-t border-[#c5a059]/15 pt-4 text-center">
                <span className="text-xs text-[#a3998b]">Need immediate assistance?</span>
                <p className="font-serif text-sm text-[#dfba74]">{RESTAURANT_INFO.phone}</p>
              </div>
            </div>
          </div>
        </form>
      </section>

      {/* Confirmation Modal */}
      <ReservationModal
        reservation={confirmedReservation}
        onClose={() => setConfirmedReservation(null)}
      />
    </div>
  );
}
