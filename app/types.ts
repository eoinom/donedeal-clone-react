// Centralized TypeScript types for DoneDeal.ie clone

export interface Car {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  location: string;
  postedAt: string;
  dealerId?: string;
  mileage?: number;
  fuelType?: string;
  description?: string;
}

export interface Dealer {
  id: string;
  name: string;
  logo: string;
  featured: boolean;
  stock: number;
  location?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Ad {
  id: string;
  carId: string;
  datePosted: string;
  price: number;
  featured?: boolean;
}
