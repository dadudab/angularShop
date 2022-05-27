import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() selectedCategories: string[];
  products: Product[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.data.subscribe(data => {
    //   this.products = data.products;
    //   console.log(this.products);
    // })
    console.log(this.selectedCategories);
    this.products = this.route.snapshot.data.products;
  }
}
