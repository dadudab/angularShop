import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { Order } from "src/app/shared/order.model";
import { OrderService } from "../order.service";

@Injectable({
   providedIn: 'root'
})
export class UserOrderResolver implements Resolve<any> {

   constructor(private orderService: OrderService) {  }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.orderService.getUserOrders();
   }
}
