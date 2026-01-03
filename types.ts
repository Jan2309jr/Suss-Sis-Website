
export enum Category {
  CAKES = 'Cakes',
  PASTRIES = 'Pastries',
  DESIGNER_CAKES = 'Designer / Theme Cakes',
  PASTA = 'Pasta',
  PIZZA = 'Pizza',
  BURGERS = 'Burgers',
  FRIES = 'Fries',
  RICE_BOWLS = 'Rice Bowls',
  BEVERAGES = 'Beverages',
  KIDS_MENU = 'Kids Menu',
  SAVORIES = 'Savories'
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  isVeg: boolean;
  image: string;
  isSeasonal?: boolean;
}

export interface CakeDesign {
  id: string;
  name: string;
  image: string;
  basePrice: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
  customInstructions?: string;
  weight?: string;
  isEggless?: boolean;
  cakeFlavor?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  loyaltyPoints: number;
  loyaltyTier: 'Silver' | 'Gold' | 'Platinum';
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Pending' | 'Cancelled' | 'Preparing';
  items: string[];
}

export interface CMSContent {
  home: {
    heroTitle: string;
    heroAccent: string;
    heroSubtitle: string;
    heroImage: string;
  };
  about: {
    title: string;
    founderName: string;
    founderBio: string;
    founderImage: string;
  };
  contact: {
    title: string;
    subtitle: string;
  };
}
