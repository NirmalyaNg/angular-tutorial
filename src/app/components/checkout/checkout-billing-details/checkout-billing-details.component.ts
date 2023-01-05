import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ShippingData } from 'src/app/models/shipping-data.model';
import { CartService } from 'src/app/services/cart.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-checkout-billing-details',
  templateUrl: './checkout-billing-details.component.html',
  styleUrls: ['./checkout-billing-details.component.css'],
})
export class CheckoutBillingDetailsComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  cartItems: Product[] = [];
  checkoutForm: FormGroup;
  constructor(private cart: CartService, private payment: PaymentService) {}

  ngOnInit(): void {
    this.checkoutForm = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
    });
    this.subscriptions.add(
      this.cart.cartItems.subscribe((items) => {
        this.cartItems = items;
      })
    );
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MM8RbSI3Qm34sTTLP3JLHV1NYQK6oHEXwhEozxa3UQMpOrH3TrfFxAT6AjQP3duZabqS5ZfuiIdmeXuQLYiZWZI00gYeao8Jw',
      locale: 'auto',
      token: (stripeToken: any) => {
        const shippingData: ShippingData = {
          name: this.checkoutForm.value.name,
          address: {
            line1: this.checkoutForm.value.address,
            postal_code: this.checkoutForm.value.pincode,
            city: this.checkoutForm.value.city,
            state: this.checkoutForm.value.state,
            country: this.checkoutForm.value.country,
          },
        };
        this.payment
          .makePayment(stripeToken.id, amount, shippingData)
          .subscribe((res) => {
            this.checkoutForm.reset();
            console.log(res);
          });
      },
    });

    paymentHandler.open({
      name: 'EKart Payment',
      description: `${this.getCartCount()} Products Added`,
      amount: this.getTotalPrice() * 100,
      currency: 'inr',
    });
  }

  handleSubmit() {
    if (this.checkoutForm.invalid) {
      return;
    }
    this.makePayment(this.getTotalPrice());
  }

  getTotalPrice() {
    return +this.cartItems
      .map((item) => item.price)
      .reduce((p1, p2) => p1 + p2, 0)
      .toFixed(2);
  }

  getCartCount() {
    return this.cartItems
      .map((item) => item.quantity)
      .reduce((q1, q2) => q1 + q2, 0);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
