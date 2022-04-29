import { AuthService } from './../auth/auth.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/user.model';
import { Cart } from '../shared/cart.model';
import { tap } from 'rxjs/operators';

export interface ICartResponse {
  user: string;
  _id: string;
  products: [];
  totalAmount: number;
  totalProducts: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new BehaviorSubject<Cart>(null);
  configUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  initialCart(token: string) {
    console.log(token);
    this.http.get<ICartResponse>(this.configUrl + '/cart', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .subscribe(res => {
      this.cart.next(res);
      console.log(res);
    })
  }

  getCart(token: string) {
    return this.http.get<ICartResponse>(this.configUrl + '/cart', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .pipe(
        tap(data => {
          this.cart.next(data);
        })
      )
  }

  // testUser: User;
  // userSub: Subscription;

  // getCart() {
  //   this.userSub = this.authService.user.subscribe(user => {
  //     this.testUser = user;
  //     console.log(this.testUser);
  //   })

  //   if(!this.testUser) {
  //     return;
  //   }

  //   this.http.get<ICartResponse>(this.configUrl + '/cart', {
  //     headers: {
  //       'Authorization': `Bearer ${this.testUser.token}`
  //     }
  //   })
  //   .subscribe(res => {
  //     this.cart.next(res);
  //     console.log(res);
  //   })

  // }
}
