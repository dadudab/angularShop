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
      // catchError(error => {
      //   console.log('Handling error locally and rethrowing it...', error);
      //   if(!error.error.message) {
      //     return throwError('Something went wrong');
      //   }
      //   return throwError(error.error.message);
      // }), 
      catchError(error => this.handleError(error))
    )
  }

  addNewProduct(product) {
    return this.http.post<Product>(this.configUrl + '/products/new', product)
      .pipe(catchError(error => {
        if(!error.error.message) {
          return throwError('Something went wrong');
        }
        return throwError(error.error.message);
      }))
  }

  getUserProducts(userId: string) {
    return this.http.get<Product[]>(`${this.configUrl}/users/${userId}/products`)
      .pipe(catchError(error => this.handleError(error)));
  }

  getCategoriesSats() {
    return this.http.get<any>(`${this.configUrl}/products/categories/statistics`)
      .pipe(catchError(error => this.handleError(error)));
  }

  updateProduct(product: any, productId: string) {
    return this.http.put<Product>(`${this.configUrl}/products/${productId}/update`, product)
      .pipe(catchError(error => this.handleErrorMessage(error)));
  }

  handleError(error: HttpErrorResponse) {
    // if(!error.error.message) {
    //   return throwError('Something went wrong.. Try again later');
    // }
    // return throwError(error.error.message);
    return of(null);
  }

  handleErrorMessage(error: HttpErrorResponse) {
    if(!error.error.message) {
      return throwError('Something went wrong');
    }
    return throwError(error.error.message);
  }
}
