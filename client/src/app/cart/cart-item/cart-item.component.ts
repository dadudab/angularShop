import { CartService } from './../cart.service';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem;
  isLoading = false;
  error: string = null;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    console.log(this.cartItem);
  }

  onAddToCart(productId: string) {
    this.isLoading = true;
    this.error = null;
    this.cartService.addToCart(productId).subscribe(response => {
      console.log(response);
      this.isLoading = false;
    }, error => {
      this.error = error.error.message;
      this.isLoading = false;
    })
  }

  onRemoveFromCart(productId: string) {
    this.isLoading = true;
    this.error = null;
    this.cartService.removeFromCart(productId).subscribe(response => {
      this.isLoading = false;
    }, error => {
      this.error = error.error.message;
      this.isLoading = false;
    })
  }

}
