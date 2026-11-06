import React from 'react';
import { Dish } from '../types';

interface DishImageProps {
  dish: Dish;
  className?: string;
}

export const DishImage: React.FC<DishImageProps> = ({ dish, className = '' }) => {
  // Crop offsets in the composite 2x2 dishes image
  const positionClass = {
    1: 'left-0 top-0',       // Beet Tartare
    2: 'bottom-0 left-0',    // Prawns
    3: 'left-0 top-0',       // Duck
    4: 'right-0 top-0',      // Risotto
    5: 'bottom-0 left-0',    // Whole Fish
    6: 'left-0 top-0',       // Lamb Shank
    7: 'bottom-0 right-0',   // Molten Cacao
    8: 'bottom-0 right-0',   // Citrus
    9: 'left-0 top-0',       // Drink 1
    10: 'right-0 top-0',     // Drink 2
  }[dish.id] || 'left-0 top-0';

  return (
    <div className={`relative overflow-hidden bg-[#1f1a16] ${className}`}>
      <img
        src="/assets/ember-dishes-C-W2nbT_.jpg"
        alt={dish.name}
        loading="lazy"
        width={1200}
        height={1200}
        className={`absolute size-[200%] max-w-none object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${positionClass}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
