import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isVisible = false;
  cartCount: number = 0;
  subscriptions = new Subscription();

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  constructor(
    private cartService: CartService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.cartService.cartItemsCount.subscribe(
        (count) => (this.cartCount = count)
      )
    );

    this.subscriptions.add(
      this.auth.userSubject.subscribe((user) => {
        this.isLoggedIn = !!user;
        this.isAdmin = !!user && user.isAdmin;
      })
    );
  }

  onLogout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
