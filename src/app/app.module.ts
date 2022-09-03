import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsService } from './products/products.service';
import { CartService } from './shopping-cart/cart.service';
import { ShoppingCartItemComponent } from './shopping-cart-item/shopping-cart-item.component';
import { CartTotalComponent } from './cart-total/cart-total.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    SingleProductComponent,
    ShoppingCartComponent,
    ShoppingCartItemComponent,
    CartTotalComponent,
  ],
  imports: [BrowserModule],
  providers: [ProductsService, CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
