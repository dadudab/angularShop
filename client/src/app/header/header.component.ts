import { CartService } from './../cart/cart.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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
  userSub: Subscription;
  cartSub: Subscription;
  cartTotalProducts: number = 0;

  constructor(private router: Router, private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    console.log(this.isAuth);
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuth = !!user;
      console.log(user);
      if(this.isAuth) {
        this.cartService.getCart(user.token).subscribe(cart => {
          console.log(cart);
          this.cartService.cart.subscribe(cart => {
            this.cartTotalProducts = cart.totalProducts;
          })
        })
      }
    })
    
    // this.cartSub = this.cartService.cart.subscribe(cart => {
    //   console.log(this.cartTotalProducts);
    //   if(this.isAuth) {
    //     this.cartTotalProducts = cart.totalProducts;
    //     console.log(this.cartTotalProducts);
    //   }
    // })
  }

  // getUserCart(token: string) {
  //   this.cartService.getCart(token).subscribe(res => {
  //     this.
  //   })
  // }


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
