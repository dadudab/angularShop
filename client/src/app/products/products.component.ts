import { Subscription } from 'rxjs';
import { CartService } from './../cart/cart.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input, DoCheck, OnDestroy, AfterContentInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  error: string;
  errorSub: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    console.log('on init called');
    this.errorSub = this.cartService.addToCartError.subscribe(error => {
      console.log(error);
      this.error = error;
    })
  }

  ngOnDestroy(): void {
    this.cartService.addToCartError.next(null);
    this.errorSub.unsubscribe();
  }
}
