import { AuthService } from './../auth/auth.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  token: string;

  cart = new BehaviorSubject<Cart>(null);
  configUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCart() {
    return this.http.get<ICartResponse>(this.configUrl + '/cart')
      .pipe(
        tap(data => {
          this.cart.next(data);
        })
      )
  }

  addToCart(productId: string) {
    return this.http.post<ICartResponse>(`${this.configUrl}/cart/${productId}/add`, null)
      .pipe(
        tap(data => {
        this.cart.next(data);
      }))
  }
}
