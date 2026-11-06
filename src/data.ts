import { MENU_ITEMS, TESTIMONIALS, GALLERY_PHOTOS, RESTAURANT_INFO, SEATING_OPTIONS } from './data/restaurantData';
import { Dish, Review, GalleryPhoto } from './types';

export const DISHES: Dish[] = MENU_ITEMS;

export const REVIEWS: Review[] = TESTIMONIALS.map((t) => ({
  quote: t.quote,
  author: t.author,
  source: t.title,
  rating: t.rating
}));

export const GALLERY_ITEMS: GalleryPhoto[] = GALLERY_PHOTOS;

export { RESTAURANT_INFO, SEATING_OPTIONS };
