import { useState, useEffect } from 'react';
import { ActivePage } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu as MenuIcon, X, Flame } from 'lucide-react';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

const NAV_LINKS: { label: string; page: ActivePage }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Menu', page: 'menu' },
  { label: 'Reservations', page: 'reservations' },
  { label: 'Order Online', page: 'order-online' },
  { label: 'Our Story', page: 'about' },
  { label: 'Gallery', page: 'gallery' },
  { label: 'Events & Catering', page: 'events' },
  { label: 'Contact', page: 'contact' },
];

export function Navbar({ activePage, setActivePage }: NavbarProps) {
  const { totalCount, subtotal } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#14110f]/95 backdrop-blur-md border-b border-[#c5a059]/20 shadow-xl'
            : 'bg-gradient-to-b from-[#14110f]/95 via-[#14110f]/80 to-transparent backdrop-blur-[4px]'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <button
            onClick={() => handleNav('home')}
            className="group flex items-center gap-2.5 sm:gap-3 text-left outline-none shrink-0"
          >
            <div className="flex size-9 items-center justify-center rounded-full border border-[#c5a059]/40 bg-[#1c1815] transition-transform duration-300 group-hover:scale-105 group-hover:border-[#c5a059]">
              <Flame className="size-5 text-[#c5a059] transition-colors group-hover:text-[#dfba74]" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-xl sm:text-2xl font-medium tracking-wider text-[#c5a059] group-hover:text-[#dfba74] transition-colors leading-tight">
                EMBER
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-medium tracking-[0.32em] text-[#c2b9ac] group-hover:text-[#f4eee6] transition-colors mt-0.5">
                KITCHENS
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-3.5 xl:gap-6 lg:flex ml-10 xl:ml-14">
            {NAV_LINKS.map(link => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNav(link.page)}
                  className={`relative whitespace-nowrap px-1 py-2 text-xs uppercase tracking-[0.15em] transition-colors ${
                    isActive ? 'text-[#c5a059] font-medium' : 'text-[#a3998b] hover:text-[#f4eee6]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5a059] shadow-[0_0_8px_#c5a059]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Book CTA */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 ml-6 xl:ml-10">
            {/* Cart / Order Selection Trigger */}
            <button
              onClick={() => {
                // If there are items, direct to the cart; if empty (Order), direct to the menu
                if (totalCount > 0) {
                  handleNav('order-online');
                } else {
                  handleNav('menu');
                }
              }}
              className={`relative flex h-9 items-center gap-2 rounded-full border px-3.5 text-xs transition-all ${
                totalCount > 0
                  ? 'border-[#c5a059] bg-[#c5a059]/15 text-[#dfba74] shadow-[0_0_12px_rgba(197,160,89,0.2)]'
                  : 'border-[#c5a059]/30 bg-[#1c1815] text-[#f4eee6] hover:border-[#c5a059] hover:bg-[#c5a059]/10'
              }`}
              aria-label={totalCount > 0 ? `View Cart with ${totalCount} items` : 'Explore Menu to Order'}
            >
              <ShoppingBag className="size-3.5 text-[#c5a059]" />
              <span className="font-medium">
                {totalCount > 0 ? 'Cart' : 'Order'}
              </span>
              {totalCount > 0 ? (
                <span className="flex items-center gap-1.5">
                  <span className="rounded-full bg-[#c5a059] px-1.5 py-0.5 text-[10px] font-bold text-[#161311] leading-none">
                    {totalCount}
                  </span>
                  <span className="hidden font-serif text-[#dfba74] xl:inline">· ₹{subtotal}</span>
                </span>
              ) : null}
            </button>

            {/* Book Table Primary CTA */}
            <button
              onClick={() => handleNav('reservations')}
              className="hidden rounded-lg bg-[#c5a059] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#161311] shadow-md transition-all hover:bg-[#dfba74] hover:shadow-[0_0_15px_rgba(197,160,89,0.3)] active:scale-95 sm:block"
            >
              Book Table
            </button>

            {/* Mobile / Tablet Hamburger Menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex size-9 items-center justify-center rounded-lg border border-[#c5a059]/30 bg-[#1c1815] text-[#f4eee6] lg:hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X className="size-5" /> : <MenuIcon className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-down Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden">
          <div className="absolute top-20 inset-x-0 border-b border-[#c5a059]/20 bg-[#171412] px-6 py-8 shadow-2xl">
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map(link => {
                const isOrderLink = link.page === 'order-online';
                const label = isOrderLink && totalCount > 0 ? `Cart (${totalCount})` : link.label;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNav(link.page)}
                    className={`text-left text-sm uppercase tracking-wider py-1.5 flex items-center justify-between ${
                      activePage === link.page ? 'text-[#c5a059] font-medium' : 'text-[#a3998b]'
                    }`}
                  >
                    <span>{label}</span>
                    {isOrderLink && totalCount > 0 && (
                      <span className="font-serif text-xs text-[#dfba74]">₹{subtotal}</span>
                    )}
                  </button>
                );
              })}

              <button
                onClick={() => handleNav('reservations')}
                className="mt-4 w-full rounded-lg bg-[#c5a059] py-3 text-center text-xs font-semibold uppercase tracking-wider text-[#161311]"
              >
                Book a Table
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
