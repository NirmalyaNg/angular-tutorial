import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { ProductResolver } from './resolvers/product.resolver';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrdersResolver } from './resolvers/orders.resolver';
import { AuthGuard } from './guards/auth.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { DashboardResolver } from './resolvers/dashboard.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    resolve: { product: ProductResolver },
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'orders',
    component: OrdersComponent,
    resolve: { orders: OrdersResolver },
    canActivate: [AuthGuard],
  },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AuthAdminGuard],
    resolve: { dashboard: DashboardResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
