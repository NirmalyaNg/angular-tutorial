import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isVisible = false;
  cartCount: number = 0;
  subscriptions = new Subscription();
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.cartService.cartItemsCountChanged.subscribe(
        (count) => (this.cartCount = count)
      )
    );
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
