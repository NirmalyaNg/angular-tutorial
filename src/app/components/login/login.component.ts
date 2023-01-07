import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showsignupSuccess = false;
  constructor(
    private auth: AuthService,
    private router: Router,
    private cart: CartService
  ) {
    // Executed when signup is successful and user is redirected from signup page
    if (
      this.router.getCurrentNavigation() &&
      this.router.getCurrentNavigation().extras.state
    ) {
      this.showsignupSuccess =
        !!this.router.getCurrentNavigation().extras.state.signupSuccess;
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onLogin() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.auth.login(email, password).subscribe({
      next: (res: Cart) => {
        const localCart = localStorage.getItem('cart');
        if (!localCart && res.products.length >= 1) {
          // If cart is not present in local storage then emit the cart received from db(server)
          this.cart.setCartAfterLogin(res.products);
        } else {
          // If cart id present in local storage then save that to save and then emit updates
          this.cart.saveCartToDb(JSON.parse(localStorage.getItem('cart')));
        }
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
