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
import { AdminComponent } from './components/admin/admin.component';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { DashboardResolver } from './resolvers/dashboard.resolver';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminAddProductComponent } from './components/admin/admin-add-product/admin-add-product.component';
import { AdminCategoriesComponent } from './components/admin/admin-categories/admin-categories.component';
import { AdminAddCategoryComponent } from './components/admin/admin-add-category/admin-add-category.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminViewOrderComponent } from './components/admin/admin-view-order/admin-view-order.component';
import { OrderResolver } from './resolvers/order.resolver';

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
    component: AdminComponent,
    canActivate: [AuthGuard, AuthAdminGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        resolve: { dashboard: DashboardResolver },
      },
      { path: 'products', component: AdminProductsComponent },
      { path: 'users', component: AdminUsersComponent },
      {
        path: 'categories',
        component: AdminCategoriesComponent,
        children: [{ path: 'add', component: AdminAddCategoryComponent }],
      },
      { path: 'add-product', component: AdminAddProductComponent },
      { path: 'orders', component: AdminOrdersComponent },
      {
        path: 'orders/:id',
        component: AdminViewOrderComponent,
        resolve: { order: OrderResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
