import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../shared/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl + '/products');
  }
}
