import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/products/product.service';
import { categories } from 'src/app/shared/categories';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product: Product;
  productName: string;
  productPrice: number;
  productDescription: string;
  productCategory: string;
  availableCategories: object[];
  productFile;
  productFileBase64;
  productFileName: string;
  productImageUrl: string;
  isLoading = false;
  error: string = null;
  isSuccess;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.product = this.route.snapshot.data.product;
    console.log(this.product);

    this.productName = this.product.name;
    this.productPrice = this.product.price;
    this.productDescription = this.product.description;
    this.productCategory = this.product.categories[0];
    this.availableCategories = categories;
    this.productImageUrl = this.product.image.imageUrl;
  }

  onSelectedFile(event) {
    this.productImageUrl = '';
    this.productFile = event.target.files[0];
    this.productFileName = this.productFile.name;
    console.log(this.productFileName);
    const reader = new FileReader();
    reader.onload = () => {
      this.productFileBase64 = reader.result;
    }
    reader.readAsDataURL(this.productFile);
  }

  onUpdateProduct(form: NgForm) {
    if(!form.valid) {
      return;
    }

    let image = {};
    
    if(this.productImageUrl) {
      image = this.product.image;
    }
    if(!this.productImageUrl) {
      image = {
        imageUrl: null,
        imageId: null,
        imageString: this.productFileBase64
      };
    }

    const updatedProduct = {
      name: this.productName,
      price: this.productPrice,
      categories: [this.productCategory],
      description: this.productDescription,
      image
    }

    this.isLoading = true;
    this.error = null;
    this.isSuccess = false;

    this.productService.updateProduct(updatedProduct, this.product._id)
      .subscribe(response => {
        this.isLoading = false;
        this.isSuccess = true;
        this.router.navigate(['/dashboard/my-products']);
      }, error => {
        console.log(error);
        this.error = error;
        this.isLoading = false;
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      })
  }

}
