import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ShippingData } from 'src/app/models/shipping-data.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
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
  paymentInProgress = false;
  constructor(
    private cart: CartService,
    private payment: PaymentService,
    private order: OrderService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkoutForm = new FormGroup({
      name: new FormControl(
        {
          value: this.auth.userSubject.getValue().username,
          disabled: true,
        },
        Validators.required
      ),
      address: new FormControl('', Validators.required),
      city: new FormControl('Kolkata', Validators.required),
      country: new FormControl('India', Validators.required),
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
        const email: string = stripeToken.email;
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
        this.paymentInProgress = true;
        this.payment
          .makePayment(stripeToken.id, amount, shippingData)
          .subscribe({
            next: (res: any) => {
              this.checkoutForm.reset({
                city: 'Kolkata',
                country: 'India',
              });
              this.order.createOrder(this.getOrderData(res, email)).subscribe({
                next: (res2) => {
                  this.paymentInProgress = false;
                  this.router.navigate(['/orders']);
                },
                error: (err) => {
                  this.paymentInProgress = false;
                  console.log(err);
                },
              });
            },
            error: (err) => {
              this.paymentInProgress = false;
              alert('Payment Failed');
            },
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
      .map((item) => item.price * item.quantity)
      .reduce((p1, p2) => p1 + p2, 0)
      .toFixed(2);
  }

  getCartCount() {
    return this.cartItems
      .map((item) => item.quantity)
      .reduce((q1, q2) => q1 + q2, 0);
  }

  getOrderData(res: any, email: string) {
    return {
      email: email,
      amount: +(res.amount / 100).toFixed(2),
      username: this.auth.userSubject.getValue().username,
      products: this.cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        title: item.title,
      })),
      address: {
        city: res.shipping.address.city,
        country: res.shipping.address.country,
        line: res.shipping.address.line1,
        pincode: res.shipping.address.postal_code,
        state: res.shipping.address.state,
      },
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
