export interface OrderData {
  userId?: string;
  _id?: string;
  username: string;
  email: string;
  products: {
    image: string;
    productId: string;
    quantity: number;
    title: string;
    price: number;
  }[];
  amount: number;
  address: {
    line: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}
