import { Product } from './product.model';

export interface Cart {
  createdAt: string;
  updatedAt: string;
  products: Product[];
  userId: string;
  __v: number;
  _id: string;
}
