import { Cart } from './../shared/cart.model';
import { Subscription } from 'rxjs';
import { CartService } from './cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartSub: Subscription;
  cart: Cart;
  isLoading = false;
  error: string = null;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // this.error = null;
    // this.isLoading = true;
    // this.cartService.getCart().subscribe(response => {
    //   // this.error = null;
    //   // this.isLoading = true;
    //   this.cart = response;
    //   console.log(response);
    //   this.isLoading = false;
    // }, error => {
    //   this.error = error.error.message;
    //   this.isLoading = false;
    // })
    this.getInitCart();
  }

  getInitCart() {
    this.error = null;
    this.isLoading = true;
    this.cartService.getCart().subscribe(response => {
      this.cart = response;
      this.isLoading = false;
    }, error => {
      this.error = error.error.message;
      this.isLoading = false;
    })
  }

  onAddToCart(id: string) {
    this.cartService.addToCart(id).subscribe(res => {
      this.cart = res;
    })
  }
}
