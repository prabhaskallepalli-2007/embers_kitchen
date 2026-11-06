import { Dish, GalleryPhoto } from '../types';

export const RESTAURANT_INFO = {
  name: 'Ember Kitchens',
  tagline: 'Fire, salt & the quiet art of the table.',
  eyebrow: 'Est. 2016 · Wood-fired & seasonal',
  address: '14 Hearth Lane, Old Quarter, Mumbai 400001',
  phone: '+91 98200 12345',
  eventsPhone: '+91 98200 67890',
  email: 'reservations@emberkitchens.in',
  eventsEmail: 'events@emberkitchens.in',
  instagram: '@emberkitchens.mumbai',
  hours: {
    weekdays: 'Tuesday – Friday · 12:00 PM – 3:30 PM & 6:30 PM – 11:30 PM',
    weekends: 'Saturday – Sunday · 12:00 PM – 11:30 PM (All Day Service)',
    closed: 'Monday · Hearth Rest & Sourcing Day'
  },
  deliveryPartners: {
    zomato: 'https://www.zomato.com/mumbai',
    swiggy: 'https://www.swiggy.com/restaurants'
  }
};

export const MENU_ITEMS: Dish[] = [
  {
    id: 1,
    name: 'Smoked Beet Tartare',
    category: 'Starters',
    price: 360,
    description: 'Whipped maitake cream, pomegranate reduction and cold-pressed dill oil.',
    detailedDescription: 'Roasted over slow hickory coals for three hours until tender and caramelized, diced with shallots, caper brine, and served on crisp lavash.',
    vegetarian: true,
    badge: 'Chef Special',
    image: '/assets/ember-dishes-C-W2nbT_.jpg',
    fireNotes: 'Slow smoke · 3 hours over hickory',
    woodType: 'Hickory Embers',
    pairing: 'Piedmont Barbera or Crisp Pet-Nat',
    allergens: ['Dairy', 'Gluten']
  },
  {
    id: 2,
    name: 'Coal-Roasted Prawns',
    category: 'Starters',
    price: 520,
    description: 'Konkan sea prawns in smoked chilli butter, preserved lime and charred garlic.',
    detailedDescription: 'Wild-caught butterflied prawns touched directly by flame on our cast-iron plancha, basted with cultured butter and roasted red peppers.',
    vegetarian: false,
    badge: 'Guest Favorite',
    image: '/assets/ember-dishes-C-W2nbT_.jpg',
    fireNotes: 'High direct heat · Charred shells',
    woodType: 'Tamarind Charcoal',
    pairing: 'Dry Riesling or Minerally Chenin Blanc',
    allergens: ['Shellfish', 'Dairy']
  },
  {
    id: 3,
    name: 'Charred Duck Breast',
    category: 'Mains',
    price: 640,
    description: 'Smoked cherry glaze, grilled mission fig and roasted root purée.',
    detailedDescription: 'Aged spice-cured duck breast rendered slowly skin-side down over sweet applewood embers, finished pink with balsamic cherry reduction.',
    vegetarian: false,
    badge: 'Bestseller',
    image: '/assets/ember-hero-55PNAzbN.jpg',
    fireNotes: 'Two-stage hearth sear',
    woodType: 'Sweet Applewood',
    pairing: 'Burgundian Pinot Noir or Syrah',
    allergens: ['Dairy']
  },
  {
    id: 4,
    name: 'Fire Risotto',
    category: 'Mains',
    price: 480,
    description: 'Ash-roasted wild mushrooms, 24-month parmesan, sage and winter black truffle.',
    detailedDescription: 'Acquerello carnaroli rice simmered in roasted mushroom hearth broth, whipped with mountain butter, finished with ash-roasted morels.',
    vegetarian: true,
    badge: 'Bestseller',
    image: '/assets/ember-dishes-C-W2nbT_.jpg',
    fireNotes: 'Ash-steeped broth infusion',
    woodType: 'Oak & Olive Wood',
    pairing: 'Nebbiolo or Barrel-aged Chardonnay',
    allergens: ['Dairy']
  },
  {
    id: 5,
    name: 'Ember Whole Fish',
    category: 'Mains',
    price: 720,
    description: 'Charred Meyer lemon, wild fennel, caper berries and green herb chimney oil.',
    detailedDescription: 'Daily catch from Sassoon Dock, stuffed with fresh oregano, parsley, and garlic, grilled in our hand-forged fish cage over gentle white embers.',
    vegetarian: false,
    badge: 'Chef Special',
    image: '/assets/ember-dishes-C-W2nbT_.jpg',
    fireNotes: 'Indirect gentle white embers',
    woodType: 'Olive Wood & Lemon Wood',
    pairing: 'Etna Bianco or Chablis',
    allergens: ['Fish']
  },
  {
    id: 6,
    name: 'Ember Lamb Shank',
    category: 'Mains',
    price: 690,
    description: 'Eight-hour cast-iron hearth roast, smoked aubergine purée and rosemary jus.',
    detailedDescription: 'Locally pastured shank slowly braised inside clay cookware directly resting in the hearth oven with whole shallots, marrow, and pomegranate molasses.',
    vegetarian: false,
    badge: 'Signature',
    image: '/assets/ember-hero-55PNAzbN.jpg',
    fireNotes: '8-hour slow Dutch oven braise',
    woodType: 'Dense Oak Charcoal',
    pairing: 'Full-bodied Cabernet Sauvignon',
    allergens: ['Dairy']
  },
  {
    id: 7,
    name: 'Hearth Charred Broccolini',
    category: 'Sides & Flatbreads',
    price: 290,
    description: 'Whipped ricotta, toasted almonds, lemon zest and Aleppo pepper oil.',
    detailedDescription: 'Crisp broccolini blistered over flaming hardwood grates, resting on a bed of fresh ricotta cheese whipped with sea salt and roasted cumin.',
    vegetarian: true,
    badge: 'Popular Side',
    image: '/assets/ember-hero-55PNAzbN.jpg',
    fireNotes: 'High-heat flame blister',
    woodType: 'Grapevine Wood',
    pairing: 'Sauvignon Blanc',
    allergens: ['Dairy', 'Nuts']
  },
  {
    id: 8,
    name: 'Cast-Iron Sourdough Focaccia',
    category: 'Sides & Flatbreads',
    price: 240,
    description: '72-hour wild fermentation, roasted garlic cloves, smoked sea salt & herb butter.',
    detailedDescription: 'Baked to golden blistered perfection in heritage cast-iron pans directly inside our wood oven floor, brushed with cold-pressed olive oil.',
    vegetarian: true,
    badge: 'Wood Oven',
    image: '/assets/ember-dishes-C-W2nbT_.jpg',
    fireNotes: 'Direct 450°C stone oven bake',
    woodType: 'Hard Maple & Oak',
    pairing: 'Table red wine',
    allergens: ['Gluten', 'Dairy']
  },
  {
    id: 9,
    name: 'Molten Cacao',
    category: 'Desserts',
    price: 320,
    description: 'Single-origin 74% dark chocolate, smoked fleur de sel, caramel gelato and gold leaf.',
    detailedDescription: 'Warm molten chocolate cake with a velvety molten core infused with subtle bourbon barrel smoke, served alongside house-spun salted caramel gelato.',
    vegetarian: true,
    badge: 'Bestseller',
    image: '/assets/ember-dishes-C-W2nbT_.jpg',
    fireNotes: 'Smoked sea salt finish',
    woodType: 'Whiskey Barrel Staves',
    pairing: 'Tawny Port or Espresso Martini',
    allergens: ['Dairy', 'Eggs', 'Gluten']
  },
  {
    id: 10,
    name: 'Ember Citrus Tart',
    category: 'Desserts',
    price: 280,
    description: 'Burnt blood orange curd, caramelized almond praline and fresh basil granita.',
    detailedDescription: 'Crisp sable pastry shell filled with blowtorched citrus curd, capped with fragrant basil ice granita to cleanse and invigorate the palate.',
    vegetarian: true,
    badge: 'Pastry Special',
    image: '/assets/ember-dishes-C-W2nbT_.jpg',
    fireNotes: 'Blowtorched caramelization',
    woodType: 'Light Hearth Embers',
    pairing: 'Sauternes or Moscato d’Asti',
    allergens: ['Dairy', 'Eggs', 'Nuts', 'Gluten']
  },
  {
    id: 11,
    name: 'Smoked Rosemary Old Fashioned',
    category: 'Cocktails & Cellar',
    price: 550,
    description: 'Bourbon infused with charred orange peel, demerara, bitters & torch-smoked rosemary.',
    detailedDescription: 'Served in a heavy cut-crystal glass filled with a single crystal clear hand-carved ice sphere and infused under a smoke cloche table-side.',
    vegetarian: true,
    badge: 'Signature Bar',
    image: '/assets/ember-interior-hoYVSs9w.jpg',
    fireNotes: 'Table-side rosemary smoking',
    woodType: 'Applewood Smoke Cloche',
    allergens: []
  },
  {
    id: 12,
    name: 'Charred Plum & Gin Highball',
    category: 'Cocktails & Cellar',
    price: 490,
    description: 'Hearth-roasted Indian plums, botanical dry gin, thyme tonic, and charred star anise.',
    detailedDescription: 'Plums roasted on hearth grates until bursting with juices, shaken with juniper-rich artisanal gin and effervescent tonic.',
    vegetarian: true,
    badge: 'Aperitif',
    image: '/assets/ember-interior-hoYVSs9w.jpg',
    fireNotes: 'Charred fruit reduction',
    woodType: 'Mesquite Charcoal',
    allergens: []
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 1,
    src: '/assets/ember-hero-55PNAzbN.jpg',
    alt: 'Wood-fired seasonal vegetables sizzling on our hand-forged cast-iron grates',
    title: 'The Hearth in Bloom',
    category: 'Food & Flame',
    caption: 'Seasonal root vegetables and heirloom greens slow-roasted over applewood.'
  },
  {
    id: 2,
    src: '/assets/ember-interior-hoYVSs9w.jpg',
    alt: 'The candlelit Ember dining room with intimate tables and brass detailing',
    title: 'The Candlelit Hall',
    category: 'Dining Room',
    caption: 'Soft ambient illumination designed to foreground intimacy and culinary conversation.'
  },
  {
    id: 3,
    src: '/assets/ember-chef-fpcKDRrx.jpg',
    alt: 'Chef Mira Sethi plating dishes beside the roaring open hearth',
    title: 'Hands at the Hearth',
    category: 'Hearth & Kitchen',
    caption: 'Every plate is crafted directly facing our guests along the open kitchen counter.'
  },
  {
    id: 4,
    src: '/assets/ember-event-DEU43Uj2.jpg',
    alt: 'Private dining celebration with friends sharing wood-fired feasts',
    title: 'Evenings of Celebration',
    category: 'Evenings',
    caption: 'Private dinners, anniversaries, and seasonal supper clubs around the warm table.'
  },
  {
    id: 5,
    src: '/assets/ember-exterior-BXQHTK2e.jpg',
    alt: 'Ember Kitchens exterior facade in Mumbai Old Quarter at dusk',
    title: '14 Hearth Lane at Dusk',
    category: 'Dining Room',
    caption: 'Restored colonial brick architecture nestled quietly on Hearth Lane.'
  },
  {
    id: 6,
    src: '/assets/ember-dishes-C-W2nbT_.jpg',
    alt: 'Selection of four Ember signature dishes served on handmade ceramic tableware',
    title: 'The Seasonal Harvest',
    category: 'Food & Flame',
    caption: 'Smoked beet tartare, coal prawns, fire risotto, and single-origin molten cacao.'
  }
];

export const SEATING_OPTIONS = [
  {
    id: 'chef-counter',
    name: "Chef's Hearth Counter",
    subtitle: 'Front-row view of the fire & open kitchen',
    capacity: '1 – 4 Guests',
    tag: 'Immersive Experience',
    description: 'Direct interaction with Chef Mira and our team as dishes are prepared over open wood flames.',
    image: '/assets/ember-chef-fpcKDRrx.jpg'
  },
  {
    id: 'window-hearth',
    name: 'Window Hearth Seating',
    subtitle: 'Overlooking historic Hearth Lane',
    capacity: '2 – 4 Guests',
    tag: 'Intimate & Romantic',
    description: 'Warm streetscape vistas filtered through soft linen curtains and brass candlelight.',
    image: '/assets/ember-exterior-BXQHTK2e.jpg'
  },
  {
    id: 'main-hall',
    name: 'Main Dining Room',
    subtitle: 'Spacious leather banquettes & velvet booths',
    capacity: '2 – 8 Guests',
    tag: 'Classic Comfort',
    description: 'The social heart of Ember. Balanced acoustic warmth, ambient music, and generous spacing.',
    image: '/assets/ember-interior-hoYVSs9w.jpg'
  },
  {
    id: 'private-cellar',
    name: 'The Private Wine Cellar',
    subtitle: 'Exclusive dining room surrounded by curated vintages',
    capacity: '6 – 16 Guests',
    tag: 'Private Gatherings',
    description: 'Dedicated sommelier, bespoke multi-course hearth tasting menu, and private soundscape.',
    image: '/assets/ember-event-DEU43Uj2.jpg'
  }
];

export const TESTIMONIALS = [
  {
    quote: "The charred duck breast is the finest I have tasted across Mumbai. Warm, unhurried, and masterfully balanced with smoke.",
    author: "Priya Sengupta",
    title: "Food Critic & Culinary Writer",
    rating: 5
  },
  {
    quote: "Our ten-year anniversary dinner felt effortless, quiet, and deeply personal. Sitting by the hearth counter was unforgettable.",
    author: "Rohan & Meera Merchant",
    title: "Regular Patrons",
    rating: 5
  },
  {
    quote: "The private dining team accommodated our 14-guest corporate dinner with precision. The wine pairings were a revelation.",
    author: "Kavya Deshmukh",
    title: "Design Studio Director",
    rating: 5
  }
];
