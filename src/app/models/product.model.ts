export interface Product {
  _id?: string;
  title: string;
  price: number;
  description: string;
  rating?: {
    rate: number;
    count: number;
  };
  user?: string;
  category: string;
  image: string;
  quantity?: number;
  createdAt?: string;
  updatedAt?: string;
}
