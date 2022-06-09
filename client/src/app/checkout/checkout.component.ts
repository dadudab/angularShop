import { Component, OnDestroy, OnInit, ViewChild, ViewChildren, ViewRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart/cart.service';
import { Cart } from '../shared/cart.model';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  cartSub: Subscription;
  userSub: Subscription;
  orderData: Object;
  cart: Cart;
  user: User;
  isPayment = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initCartAndUser();
    console.log(this.user);
  }

  initCartAndUser() {
    this.cartSub = this.cartService.cart.subscribe(cart => {
      this.cart = cart;
    })
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    })
  }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }

    // console.log(form.value);
    const orderData = {
      merchantData: {
        email: form.value.email,
        phoneNumber: form.value.phoneNumber
      },
      shippingData: {
        city: form.value.city,
        address: form.value.address,
        postalCode: form.value.postalCode
      }
    }
    this.orderData = orderData;
    this.isPayment = true;
  }

  
  
  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
