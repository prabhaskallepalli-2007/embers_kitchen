export type Category = 'All' | 'Starters' | 'Mains' | 'Sides & Flatbreads' | 'Desserts' | 'Cocktails & Cellar' | 'Drinks';

export type DietaryTag = 'Vegetarian' | 'Non-vegetarian' | 'Chef Special' | 'Bestseller' | 'Gluten-Free' | 'Wood-Fired';

export interface Dish {
  id: number;
  name: string;
  category: 'Starters' | 'Mains' | 'Sides & Flatbreads' | 'Desserts' | 'Cocktails & Cellar' | 'Drinks';
  price: number;
  description: string;
  detailedDescription?: string;
  vegetarian: boolean;
  badge?: string;
  image?: string;
  fireNotes?: string;
  woodType?: string;
  pairing?: string;
  allergens?: string[];
  spiceLevel?: 0 | 1 | 2 | 3;
  spiciness?: number;
  prepTime?: string;
  calories?: number;
  position?: string;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  instructions?: string;
}

export type SeatingArea = 'chef-counter' | 'window-hearth' | 'main-hall' | 'private-cellar' | 'Open floor' | "Chef's counter" | 'Window' | 'Courtyard Terrace' | 'Private room';

export interface ReservationDetails {
  id?: string;
  name?: string;
  fullName?: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seatingArea?: SeatingArea;
  seating?: string;
  specialRequests?: string;
  occasion?: string;
  createdAt?: string;
}

export interface GalleryPhoto {
  id: number | string;
  src: string;
  alt?: string;
  title: string;
  category: string;
  caption: string;
}

export type ActivePage = 'home' | 'menu' | 'reservations' | 'order-online' | 'about' | 'gallery' | 'events' | 'contact';
export type PageRoute = ActivePage;

export interface Review {
  quote: string;
  author: string;
  source: string;
  rating: number;
}
