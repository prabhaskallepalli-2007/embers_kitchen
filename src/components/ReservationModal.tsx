import { motion, AnimatePresence } from 'motion/react';
import { Check, Calendar, Clock, Users, MapPin, Download, Copy, X } from 'lucide-react';
import { ReservationDetails } from '../types';
import { RESTAURANT_INFO, SEATING_OPTIONS } from '../data/restaurantData';
import { useState } from 'react';

interface ReservationModalProps {
  reservation: ReservationDetails | null;
  onClose: () => void;
}

export function ReservationModal({ reservation, onClose }: ReservationModalProps) {
  const [copied, setCopied] = useState(false);

  if (!reservation) return null;

  const seating = SEATING_OPTIONS.find(s => s.id === reservation.seatingArea) || SEATING_OPTIONS[0];

  const handleDownloadIcs = () => {
    // Generate .ics calendar invite
    const title = `Dinner at Ember Kitchens (Ref: ${reservation.id})`;
    const description = `Reservation for ${reservation.guests} guests in ${seating.name}. Special notes: ${reservation.specialRequests || 'None'}`;
    const location = RESTAURANT_INFO.address;

    // Convert date string YYYY-MM-DD and time HH:MM to iCal format
    const cleanDate = reservation.date.replace(/-/g, '');
    const cleanTime = reservation.time.replace(/:/g, '') + '00';
    const startStr = `${cleanDate}T${cleanTime}`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Ember Kitchens//Table Reservation//EN',
      'BEGIN:VEVENT',
      `UID:${reservation.id}@emberkitchens.in`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${startStr}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Ember-Reservation-${reservation.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = () => {
    const summary = `Ember Kitchens Reservation Confirmed!\nBooking Code: ${reservation.id}\nGuest: ${reservation.name}\nDate: ${reservation.date} at ${reservation.time}\nParty: ${reservation.guests} guests (${seating.name})\nAddress: ${RESTAURANT_INFO.address}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl border border-[#c5a059]/40 bg-[#1c1714] p-6 text-[#f4eee6] shadow-2xl sm:p-8"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-[#c5a059]/20 bg-[#14110f] text-[#a3998b] hover:text-white"
          >
            <X className="size-4" />
          </button>

          {/* Success Badge */}
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#c5a059]/20 text-[#c5a059] ring-8 ring-[#c5a059]/10">
            <Check className="size-7" />
          </div>

          <div className="mt-5 text-center">
            <span className="eyebrow block">Table Confirmed</span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Your seat by the hearth is set.</h2>
            <p className="mt-2 text-sm text-[#a3998b]">
              We look forward to welcoming you, <span className="text-[#f4eee6] font-medium">{reservation.name}</span>.
            </p>
          </div>

          {/* Ticket Card */}
          <div className="mt-6 rounded-lg border border-[#c5a059]/30 bg-[#14110f] p-5">
            <div className="flex items-center justify-between border-b border-[#c5a059]/15 pb-3">
              <span className="text-xs uppercase tracking-wider text-[#a3998b]">Booking Reference</span>
              <span className="font-mono text-base font-semibold tracking-wider text-[#dfba74]">{reservation.id}</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-xs sm:grid-cols-3">
              <div className="space-y-1">
                <span className="flex items-center gap-1.5 text-[#a3998b]">
                  <Calendar className="size-3.5 text-[#c5a059]" /> Date
                </span>
                <p className="font-medium text-[#f4eee6]">{reservation.date}</p>
              </div>

              <div className="space-y-1">
                <span className="flex items-center gap-1.5 text-[#a3998b]">
                  <Clock className="size-3.5 text-[#c5a059]" /> Time
                </span>
                <p className="font-medium text-[#f4eee6]">{reservation.time}</p>
              </div>

              <div className="space-y-1">
                <span className="flex items-center gap-1.5 text-[#a3998b]">
                  <Users className="size-3.5 text-[#c5a059]" /> Party
                </span>
                <p className="font-medium text-[#f4eee6]">{reservation.guests} Guests</p>
              </div>
            </div>

            <div className="mt-4 border-t border-[#c5a059]/15 pt-3 text-xs">
              <span className="text-[#a3998b]">Seating Area: </span>
              <strong className="text-[#f4eee6]">{seating.name}</strong>
              {reservation.occasion && (
                <span className="ml-2 rounded-full bg-[#c5a059]/20 px-2 py-0.5 text-[10px] text-[#dfba74]">
                  {reservation.occasion}
                </span>
              )}
            </div>

            <div className="mt-3 flex items-start gap-2 border-t border-[#c5a059]/15 pt-3 text-[11px] text-[#a3998b]">
              <MapPin className="mt-0.5 size-3.5 shrink-0 text-[#c5a059]" />
              <span>{RESTAURANT_INFO.address}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              onClick={handleDownloadIcs}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#c5a059]/40 bg-[#161311] px-4 py-3 text-xs font-medium text-[#f4eee6] transition-colors hover:border-[#c5a059] hover:bg-[#c5a059]/10"
            >
              <Download className="size-4 text-[#c5a059]" /> Add to Calendar (.ics)
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#c5a059]/40 bg-[#161311] px-4 py-3 text-xs font-medium text-[#f4eee6] transition-colors hover:border-[#c5a059] hover:bg-[#c5a059]/10"
            >
              <Copy className="size-4 text-[#c5a059]" />
              {copied ? 'Copied to Clipboard' : 'Copy Booking Details'}
            </button>
          </div>

          <p className="mt-5 text-center text-[11px] text-[#8e8477]">
            We hold tables for 15 minutes past reservation time. If running late, kindly call {RESTAURANT_INFO.phone}.
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
