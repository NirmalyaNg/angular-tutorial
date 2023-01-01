export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
  category: string;
  image: string;
  quantity?: number;
}
