import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from './../cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Output() errorEvent = new EventEmitter<string>();
  @Input() cartItem;
  isLoading = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    console.log(this.cartItem);
  }

  onAddToCart(productId: string) {
    this.errorEvent.emit('');
    this.isLoading = true;
    this.cartService.addToCart(productId).subscribe(response => {
      this.isLoading = false;
    }, error => {
      this.errorEvent.emit(error);
      this.isLoading = false;
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    })
  }

  onRemoveFromCart(productId: string) {
    this.errorEvent.emit('');
    this.isLoading = true;
    this.cartService.removeFromCart(productId).subscribe(response => {
      this.isLoading = false;
    }, error => {
      this.errorEvent.emit(error);
      this.isLoading = false;
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    })
  }


}
