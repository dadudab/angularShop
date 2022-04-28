import { ProductService } from './../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId: string;
  product: Product;
  isLoading = false;
  error: string = null;

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.error = null;
    this.productId = this.route.snapshot.paramMap.get('productId');
    this.getProductById(this.productId);
  }

  getProductById(id) {
    this.productService.getProductById(id).subscribe(response => {
      this.product = response;
      console.log(this.product);
      this.isLoading = false;
      this.error = null;
    }, error => {
      console.log(error);
      this.error = error.error.message;
      this.isLoading = false;
    })
  }

  onBackToProducts() {
    this.router.navigate(['/products']);
  }
}
