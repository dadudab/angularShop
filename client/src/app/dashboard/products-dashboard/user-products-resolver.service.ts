import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { ProductService } from "src/app/products/product.service";
import { Product } from "src/app/shared/product.model";

@Injectable({
   providedIn: 'root'
})
export class UserProductsResolver implements Resolve<Product[]> {
   
   userId: string;
   
   constructor(private productService: ProductService, private authService: AuthService) { }
   
   resolve(
      route: ActivatedRouteSnapshot, 
      state: RouterStateSnapshot
      ): Product[] | Observable<Product[]> | Promise<Product[]> {
         
         this.authService.user.subscribe(user => {
            this.userId = user.id;
         })
         return this.productService.getUserProducts(this.userId);
   }
}
