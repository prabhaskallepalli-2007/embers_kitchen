import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { GalleryPhoto } from '../types';

export const GalleryViewer: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Food & Flame', 'Dining Room', 'Hearth & Kitchen', 'Evenings'];

  const filteredItems: GalleryPhoto[] = GALLERY_ITEMS.filter(
    (item: GalleryPhoto) => activeFilter === 'All' || item.category === activeFilter
  );

  const handleNext = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % GALLERY_ITEMS.length);
  };

  const handlePrev = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  return (
    <div className="w-full">
      {/* Category filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all ${
              activeFilter === cat
                ? 'bg-[#c5a059] text-[#161311] font-semibold shadow'
                : 'border border-[#c5a059]/25 text-[#a3998b] hover:text-[#f4eee6] hover:border-[#c5a059]/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of gallery items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item: GalleryPhoto) => {
          const globalIdx = GALLERY_ITEMS.findIndex((g: GalleryPhoto) => g.id === item.id);
          return (
            <motion.div
              layout
              key={item.id}
              onClick={() => setSelectedIdx(globalIdx)}
              className="group relative h-72 sm:h-80 rounded-xl overflow-hidden border border-[#c5a059]/20 bg-[#1c1815] cursor-pointer shadow-lg hover:border-[#c5a059]/50 transition-colors"
            >
              <img
                src={item.src}
                alt={item.alt || item.title}
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Overlay vignette with text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#dfba74] font-medium block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-2xl text-[#f4eee6]">{item.title}</h4>
                  <p className="text-xs text-[#a3998b] line-clamp-1 mt-1">{item.caption}</p>
                </div>
                <div className="size-8 rounded-full bg-black/40 border border-[#c5a059]/30 flex items-center justify-center text-[#dfba74] opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="size-3.5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && selectedIdx >= 0 && selectedIdx < GALLERY_ITEMS.length && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIdx(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 max-w-5xl w-full bg-[#161311] border border-[#c5a059]/30 rounded-xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-4 sm:px-6 flex items-center justify-between border-b border-[#c5a059]/20 bg-[#120f0d]">
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase tracking-widest text-[#dfba74]">
                    {GALLERY_ITEMS[selectedIdx].category}
                  </span>
                  <span className="text-white/20">|</span>
                  <h3 className="font-serif text-xl text-[#f4eee6]">
                    {GALLERY_ITEMS[selectedIdx].title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedIdx(null)}
                  className="size-8 rounded-full bg-white/10 hover:bg-white/20 text-[#f4eee6] flex items-center justify-center transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Image Container */}
              <div className="relative max-h-[70vh] flex items-center justify-center bg-black/50 overflow-hidden">
                <img
                  src={GALLERY_ITEMS[selectedIdx].src}
                  alt={GALLERY_ITEMS[selectedIdx].title}
                  className="max-h-[68vh] w-auto object-contain rounded"
                />

                {/* Left/Right controls */}
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-4 size-10 rounded-full bg-black/70 border border-[#c5a059]/30 hover:bg-[#c5a059] hover:text-[#161311] text-[#f4eee6] flex items-center justify-center transition-colors shadow"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-4 size-10 rounded-full bg-black/70 border border-[#c5a059]/30 hover:bg-[#c5a059] hover:text-[#161311] text-[#f4eee6] flex items-center justify-center transition-colors shadow"
                  aria-label="Next photograph"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>

              {/* Footer caption */}
              <div className="p-4 sm:px-6 bg-[#120f0d] border-t border-[#c5a059]/15 flex items-center justify-between text-xs text-[#a3998b]">
                <p>{GALLERY_ITEMS[selectedIdx].caption}</p>
                <span>{selectedIdx + 1} of {GALLERY_ITEMS.length}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
