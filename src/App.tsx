import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActivePage, ReservationDetails } from './types';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Full Views
import { HomeView } from './views/HomeView';
import { MenuView } from './views/MenuView';
import { ReservationsView } from './views/ReservationsView';
import { OrderOnlineView } from './views/OrderOnlineView';
import { AboutView } from './views/AboutView';
import { GalleryViewer } from './components/GalleryViewer';
import { EventsPage } from './components/EventsPage';
import { ContactPage } from './components/ContactPage';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [quickReserveParams, setQuickReserveParams] = useState<{ date?: string; guests?: number }>({});

  const handleQuickReserve = (date: string, guests: number) => {
    setQuickReserveParams({ date, guests });
    setActivePage('reservations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#161311] text-[#f4eee6] selection:bg-[#c5a059] selection:text-[#161311] flex flex-col font-sans">
        {/* Navigation Bar with Audio toggle, Cart count & Drawer trigger */}
        <Navbar activePage={activePage} setActivePage={handleNav} />

        {/* Dynamic Route View with Framer Motion Page Transition */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {activePage === 'home' && (
                <HomeView
                  setActivePage={handleNav}
                  onQuickReserve={handleQuickReserve}
                />
              )}

              {activePage === 'menu' && (
                <div className="pt-20">
                  <MenuView setActivePage={handleNav} />
                </div>
              )}

              {activePage === 'reservations' && (
                <div className="pt-20">
                  <ReservationsView
                    initialDate={quickReserveParams.date}
                    initialGuests={quickReserveParams.guests}
                  />
                </div>
              )}

              {activePage === 'order-online' && (
                <div className="pt-20">
                  <OrderOnlineView setActivePage={handleNav} />
                </div>
              )}

              {activePage === 'about' && (
                <AboutView setActivePage={handleNav} />
              )}

              {activePage === 'gallery' && (
                <div className="pt-24 pb-20">
                  <section className="border-b border-[#c5a059]/20 bg-[#14110f] px-5 py-12 sm:px-8 sm:py-16 text-center">
                    <div className="mx-auto max-w-3xl">
                      <span className="eyebrow">Moments from the Hearth</span>
                      <h1 className="mt-3 font-serif text-5xl text-[#f4eee6] sm:text-6xl">
                        Atmosphere &amp; Flame
                      </h1>
                      <p className="mt-4 text-base text-[#a3998b]">
                        A photographic glimpse into our kitchen craft, historic colonial architecture, and candlelit evening gatherings.
                      </p>
                    </div>
                  </section>
                  <div className="section-shell mt-8">
                    <GalleryViewer />
                  </div>
                </div>
              )}

              {activePage === 'events' && (
                <div className="pt-20">
                  <EventsPage />
                </div>
              )}

              {activePage === 'contact' && (
                <div className="pt-20">
                  <ContactPage />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Global Footer */}
        <Footer setActivePage={handleNav} />
      </div>
    </CartProvider>
  );
}
