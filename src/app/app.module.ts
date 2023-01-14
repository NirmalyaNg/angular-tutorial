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
import { AdminComponent } from './components/admin/admin.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './components/admin/admin-sidebar/admin-sidebar.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminAddProductComponent } from './components/admin/admin-add-product/admin-add-product.component';
import { AdminCategoriesComponent } from './components/admin/admin-categories/admin-categories.component';
import { AdminAddCategoryComponent } from './components/admin/admin-add-category/admin-add-category.component';

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
    AdminComponent,
    AdminDashboardComponent,
    AdminSidebarComponent,
    AdminProductsComponent,
    AdminUsersComponent,
    AdminAddProductComponent,
    AdminCategoriesComponent,
    AdminAddCategoryComponent,
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
