import { AuthService } from './../auth/auth.service';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../shared/cart.model';
import { catchError, tap } from 'rxjs/operators';

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

  configUrl = 'http://localhost:3000';
  cart = new BehaviorSubject<Cart>(null);

  constructor(private http: HttpClient) { }

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

  removeFromCart(productId: string) {
    return this.http.delete<ICartResponse>(`${this.configUrl}/cart/${productId}/delete`)
      .pipe(tap(data => {
        this.cart.next(data);
      }))
  } 
}
