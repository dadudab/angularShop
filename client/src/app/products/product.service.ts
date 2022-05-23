import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Product } from '../shared/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  configUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.configUrl + '/products');
  }

  getProductById(id: string) {
    return this.http.get<Product>(this.configUrl + '/products/' + id).pipe(
      catchError(error => {
        console.log('Handling error locally and rethrowing it...', error);
        if(!error.error.message) {
          return throwError('Something went wrong');
        }
        return throwError(error.error.message);
      }), 
    )
  }

  addNewProduct(product) {
    return this.http.post<Product>(this.configUrl + '/products/new', product).pipe(
      catchError(error => this.handleError(error))
    )
  }

  getUserProducts(userId: string) {
    return this.http.get<Product[]>(`${this.configUrl}/users/${userId}/products`)
      .pipe(catchError(error => this.handleError(error)));
  }

  handleError(error: HttpErrorResponse) {
    // if(!error.error.message) {
    //   return throwError('Something went wrong.. Try again later');
    // }
    // return throwError(error.error.message);
    return of(null);
  }
}
