export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Filters {
  electronics: boolean;
  jewelery: boolean;
  mensClothing: boolean;
  womensClothing: boolean;
  under50: boolean;
  fiftyTo100: boolean;
  oneHundredTo200: boolean;
  over200: boolean;
  rating4Plus: boolean;
  rating3Plus: boolean;
}

export interface FilterCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

export interface ProductCardProps {
  product: Product;
}