import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isVisible = false;
  cartCount: number = 0;
  subscriptions = new Subscription();

  isLoggedIn: boolean = false;
  constructor(private cartService: CartService, private auth: AuthService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.cartService.cartItemsCountChanged.subscribe(
        (count) => (this.cartCount = count)
      )
    );

    this.subscriptions.add(
      this.auth.userSubject.subscribe((user) => {
        if (user) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
    );
  }

  onLogout() {
    this.auth.logout();
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
