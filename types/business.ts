export interface Business {
  id: string;
  name: string;
  address: string;
  image: string;
  isOpen: boolean;
  distance: number;
  type: 'restaurant' | 'masjid' | 'grocery' | 'meat' | 'cafe';
  isHalalVerified?: boolean;
  category?: string;
}