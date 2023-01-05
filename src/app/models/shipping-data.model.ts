export interface ShippingData {
  name: string;
  address: {
    line1: string;
    postal_code: string;
    city: string;
    state: string;
    country: string;
  };
}
