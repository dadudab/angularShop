import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Product } from "src/app/shared/product.model";
import { ProductService } from "../product.service";

@Injectable({
   providedIn: 'root'
})
export class ProductResolver implements Resolve<Product> {
   
   constructor(private productService: ProductService) { }

   resolve(route: ActivatedRouteSnapshot, 
      state: RouterStateSnapshot): Product | Observable<Product> | Promise<Product> {
       
         const productId = route.params.productId;
         return this.productService.getProductById(productId);
   }
}
