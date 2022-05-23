import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.css']
})
export class ProductsDashboardComponent implements OnInit {

  userProducts: Product[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userProducts = this.route.snapshot.data.userProducts;
    console.log(this.userProducts);
  }

  
}
