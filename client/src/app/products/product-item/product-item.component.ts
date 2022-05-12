import { Router } from '@angular/router';
import { CartService } from './../../cart/cart.service';
import { Product } from 'src/app/shared/product.model';
import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;
  isLoading = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  onAddToCart(productId: string) {
    this.isLoading = true;
    this.cartService.addToCart(productId).subscribe(res => {
      console.log(res);
      this.cartService.addToCartError.next(null);
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.cartService.addToCartError.next(error.error.message);
      this.isLoading = false;
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
    })
  }
}
