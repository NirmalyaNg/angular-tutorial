export interface OrderData {
  userId?: string;
  _id?: string;
  username: string;
  email: string;
  products: { productId: string; quantity: number; title: string }[];
  amount: number;
  address: {
    line: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  status?: string;
}
