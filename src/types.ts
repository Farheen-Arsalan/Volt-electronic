export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'smartphones' | 'laptops' | 'audio' | 'gaming' | 'cameras' | 'wearables' | 'tv-home';
  categoryLabel: string;
  price: number; // in AED
  originalPrice?: number; // in AED
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  additionalImages?: string[];
  badge?: 'Deal' | 'New' | 'Best Seller' | 'Dubai Exclusive' | 'Limited Stock';
  inStock: boolean;
  stockCount: number;
  isDeal?: boolean;
  description: string;
  specs: Record<string, string>;
  warranty: string;
  colors?: string[];
  sku: string;
}

export interface Category {
  id: string;
  slug: Product['category'];
  name: string;
  iconName: string;
  count: number;
  featuredImage: string;
  tagline: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface FilterState {
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  dealsOnly: boolean;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'discount';
  searchQuery: string;
}

export interface ToastNotification {
  id: string;
  type: 'cart' | 'wishlist' | 'info' | 'success';
  title: string;
  message: string;
  product?: Product;
}

export interface DubaiShowroom {
  name: string;
  location: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: {
    weekdays: string;
    weekends: string;
    friday: string;
  };
}
