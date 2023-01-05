import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService, private cart: CartService) {}

  ngOnInit(): void {
    this.auth.autoLogin();
    this.cart.setCartItemsOnLoad();
  }
}
