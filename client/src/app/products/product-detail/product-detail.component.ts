import { ProductService } from './../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/product.model';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  // productId: string;
  product: Product;
  isLoading = false;
  error: string = null;

  constructor(
    private route: ActivatedRoute, 
    private cartService: CartService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.product = this.route.snapshot.data.product;
    console.log(this.product);
  }

  onAddToCart(productId: string) {
    this.error = null;
    this.isLoading = true;
    this.cartService.addToCart(productId).subscribe(response => {
      console.log(response);
      this.isLoading = false;
    }, error => {
      this.error = error;
      this.isLoading = false;
      console.log(error);
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    })
  }

  onBackToProducts() {
    this.router.navigate(['/products']);
  }
}
