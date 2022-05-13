import { User } from './../shared/user.model';
import { CartService } from './../cart/cart.service';
import { AuthService } from './../auth/auth.service';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isSidebarOpen = false;
  isAuth = false;
  user: User;
  userSub: Subscription;
  cartSub: Subscription;
  cartTotalProducts: number;

  constructor(private router: Router, private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    console.log(this.isAuth);
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuth = !!user;
      this.user = user;
      if(this.isAuth) {
        this.cartSub = this.cartService.getCart().subscribe(cart => {
          this.cartService.cart.subscribe(cart => {
            this.cartTotalProducts = cart.totalProducts;
          })
        })
      }
    })
    console.log('header on init triggered')
  }

  onSidebarOpen() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.cartSub.unsubscribe();
  }

}
