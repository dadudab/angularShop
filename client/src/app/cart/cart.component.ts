import { Cart } from './../shared/cart.model';
import { Subscription } from 'rxjs';
import { CartService } from './cart.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy{

  cartSub: Subscription;
  cart: Cart;
  @Input() errorMessage: string;

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserCart();
  }

  getUserCart() {
    this.cartSub = this.cartService.cart.subscribe(cart => {
      this.cart = cart;
    })
  }

  onRedirectToProducts() {
    this.router.navigate(['/products']);
  }

  onRedirectToCheckout() {
    this.router.navigate(['/checkout']);
  }

  receiveError(event) {
    this.errorMessage = event;
    console.log(event)
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }
}
