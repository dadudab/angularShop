import { CartService } from './cart/cart.service';
import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'client';

  constructor(private authService: AuthService, private cartService: CartService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    // this.cartService.getCart();
  }
}
