import { CartService } from './../../cart/cart.service';
import { Product } from 'src/app/shared/product.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  onAddToCart(productId: string) {
    this.cartService.addToCart(productId).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }
}
