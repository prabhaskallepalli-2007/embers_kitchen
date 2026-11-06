import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_PHOTOS } from '../data/restaurantData';
import { GalleryPhoto } from '../types';
import { X, ZoomIn } from 'lucide-react';

type GalleryFilter = 'All' | 'Food & Flame' | 'Hearth & Kitchen' | 'Dining Room' | 'Evenings';

export function GalleryView() {
  const [filter, setFilter] = useState<GalleryFilter>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const filteredPhotos = GALLERY_PHOTOS.filter(photo => {
    if (filter === 'All') return true;
    return photo.category === filter;
  });

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="border-b border-[#c5a059]/20 bg-[#14110f] px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <span className="eyebrow">Visual Moments</span>
          <h1 className="mt-3 font-serif text-5xl text-[#f4eee6] sm:text-6xl">
            Atmosphere & Embers
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[#a3998b]">
            A quiet glimpse into our Mumbai dining room, open hearth fire, and handcrafted seasonal plates.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {(['All', 'Food & Flame', 'Hearth & Kitchen', 'Dining Room', 'Evenings'] as GalleryFilter[]).map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-4 py-2 text-xs uppercase tracking-wider transition-all ${
                  filter === cat
                    ? 'bg-[#c5a059] text-[#161311] font-medium'
                    : 'border border-[#c5a059]/30 bg-[#1c1815] text-[#a3998b] hover:text-[#f4eee6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-shell">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              onClick={() => setActivePhoto(photo)}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-[#c5a059]/20 bg-[#181412]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="absolute bottom-0 inset-x-0 p-5 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="eyebrow block text-[10px]">{photo.category}</span>
                <h3 className="mt-1 font-serif text-xl text-[#f4eee6]">{photo.title}</h3>
                {photo.caption && (
                  <p className="mt-1 text-xs text-[#c2b9ac]">{photo.caption}</p>
                )}
              </div>

              <div className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-black/60 text-[#dfba74] opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                <ZoomIn className="size-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="relative z-10 max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl border border-[#c5a059]/30 bg-[#14110f]"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full bg-black/70 text-[#a3998b] hover:text-white"
              >
                <X className="size-4" />
              </button>

              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="max-h-[75vh] w-full object-contain"
              />

              <div className="p-6 bg-[#161311] border-t border-[#c5a059]/15">
                <span className="eyebrow block text-xs">{activePhoto.category}</span>
                <h3 className="mt-1 font-serif text-2xl text-[#f4eee6]">{activePhoto.title}</h3>
                {activePhoto.caption && (
                  <p className="mt-2 text-sm text-[#a3998b]">{activePhoto.caption}</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
