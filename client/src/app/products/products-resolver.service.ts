import { ProductService } from './product.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Product } from "../shared/product.model";
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class ProductsResolver implements Resolve<Product[]> {

   constructor(private productService: ProductService) {  }

   resolve(
      route: ActivatedRouteSnapshot, 
      state: RouterStateSnapshot
   ): Product[] | Observable<Product[]> | Promise<Product[]> {
      return this.productService.getProducts();
   }
}
