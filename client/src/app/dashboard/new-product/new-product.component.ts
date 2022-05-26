import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/products/product.service';
import { categories } from 'src/app/shared/categories';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  productCategories: object[];
  productName: string;
  productPrice: number;
  productDescription: string;
  productCategory: string;
  productFile;
  productFileBase64;
  uploadedImageName: string;
  isLoading = false;
  isSuccess = false;
  error: string = null; 

  constructor(
    private productService: ProductService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productCategories = categories;
    console.log(this.productCategory)
  }

  onSelectedFile(event) {
    this.productFile = event.target.files[0];
    this.uploadedImageName = this.productFile.name;
    console.log(this.uploadedImageName);
    const reader = new FileReader();
    reader.onloadend = () => {
      this.productFileBase64 = reader.result;
      console.log(this.productFileBase64);
    }
    reader.readAsDataURL(this.productFile);
  }

  onAddProduct(form: NgForm) {
    if(!form.valid) {
      return;
    }

    const product = {
      name: this.productName,
      price: this.productPrice,
      description: this.productDescription,
      categories: [this.productCategory],
      image: {
        imageUrl: null,
        imageString: this.productFileBase64,
        imageId: null
      }
    }

    this.isLoading = true;
    this.error = null;
    this.isSuccess = false;

    this.productService.addNewProduct(product).subscribe(response => {
      console.log(response);
      this.isLoading = false;
      this.isSuccess = true;
      this.router.navigate(['/dashboard/my-products']);
    }, error => {
      console.log(error);
      this.error = error;
      this.isLoading = false;
      this.isSuccess = false;
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    })
  }

}
