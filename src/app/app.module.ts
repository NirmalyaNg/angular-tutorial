import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CartComponent } from './components/cart/cart.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductComponent } from './components/products/product/product.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ProductCategoriesComponent } from './components/products/product-categories/product-categories.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';
import { CartTotalComponent } from './components/cart/cart-total/cart-total.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { CheckoutBillingDetailsComponent } from './components/checkout/checkout-billing-details/checkout-billing-details.component';
import { CheckoutCartDetailsComponent } from './components/checkout/checkout-cart-details/checkout-cart-details.component';
import { OrdersComponent } from './components/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    LoginComponent,
    SignupComponent,
    CartComponent,
    HeaderComponent,
    ProductComponent,
    LoadingSpinnerComponent,
    ProductCategoriesComponent,
    FilterPipe,
    ProductDetailComponent,
    CartItemComponent,
    CartTotalComponent,
    CheckoutComponent,
    CheckoutBillingDetailsComponent,
    CheckoutCartDetailsComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
