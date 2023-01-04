import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  handler: any = null;
  constructor() {}

  ngOnInit(): void {
    this.invokeStripe();
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MM8RbSI3Qm34sTTLP3JLHV1NYQK6oHEXwhEozxa3UQMpOrH3TrfFxAT6AjQP3duZabqS5ZfuiIdmeXuQLYiZWZI00gYeao8Jw',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
      },
    });

    paymentHandler.open({
      name: 'EKart Payment',
      description: '4 Products Added',
      amount: amount * 100,
      billingAddress: true,
      shippingAddress: true,
      currency: 'inr',
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(script);
    }
  }
}
