export interface FibreProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  features: string[];
  specifications: {
    speed: string;
    distance: string;
    wavelength: string;
    connector: string;
  };
  inStock: boolean;
  rating: number;
  reviews: number;
}
