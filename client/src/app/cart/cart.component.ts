import { Cart } from './../shared/cart.model';
import { Subscription } from 'rxjs';
import { CartService } from './cart.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy{

  cartSub: Subscription;
  cart: Cart;
  isLoading = false;
  error: string = null;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getInitCart();
    console.log(this.cart);
  }

  getInitCart() {
    this.error = null;
    this.isLoading = true;
    this.cartSub = this.cartService.cart.subscribe(response => {
      this.cart = response;
      this.isLoading = false;
    }, error => {
      this.error = error.error.message;
      this.isLoading = false;
    })
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }
}
