import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../shared/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  configUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  createOrder(orderData: Object) {
    return this.http.post<Order>(`${this.configUrl}/new`, orderData)
    // .subscribe(response => {
    //   console.log(response);
    // }, error => {
    //   console.log(error);
    // })
  }

  getUserOrders() {
    return this.http.get<Order[]>(`${this.configUrl}/my-orders`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  handleErrorMessage(error: HttpErrorResponse)  {
    if(error.error.message) {
      return throwError('Something went wrong');
    }
    return error.error.message;
  }

  handleError(error: HttpErrorResponse) {
    return of(null);
  }
}
