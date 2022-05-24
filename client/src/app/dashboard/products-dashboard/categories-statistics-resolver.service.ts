import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ProductService } from "src/app/products/product.service";

@Injectable({
   providedIn: 'root'
})
export class CategoriesStatisticsResolver implements Resolve<any> {
   
   constructor(private productService: ProductService) { };

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       return this.productService.getCategoriesSats();
   }
}
