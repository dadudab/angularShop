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
  productName: string;
  isLoading = false;
  error: string = null;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.productName = this.product.name;
    this.cutProductName(this.productName);
  }

  onAddToCart(productId: string) {
    this.isLoading = true;
    this.cartService.addToCart(productId).subscribe(res => {
      console.log(res);
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.isLoading = false;
      this.error = error.error.message;
    })
  }

  cutProductName(name: string) {
    if(name.length > 28) {
      console.log('too long name');
      this.productName = name.slice(0, 28) + '...';
    }
    else {
      console.log('ok name');
    }
  }
}
