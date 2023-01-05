import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShippingData } from '../models/shipping-data.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  makePayment(stripeToken: string, amount: number, shippingData: ShippingData) {
    return this.http.post('http://localhost:3000/api/checkout/payment', {
      tokenId: stripeToken,
      amount: Math.round(amount * 100),
      data: shippingData,
    });
  }
}
