import { CartService } from './../cart/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/user.model';

export interface IAuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  configUrl = 'http://localhost:3000';
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }
  
  registerUser(userData: Object) {
    return this.http.post<IAuthResponse>(this.configUrl + '/users/register', userData)
      .pipe(
        tap(resData => {
          console.log(resData);
          this.handleAuthentication(resData.token);
        })
      )
  }

  loginUser(username: string, password: string) {
    return this.http.post<IAuthResponse>(this.configUrl + '/users/login', {
      username,
      password
    })
      .pipe(
        tap(resData => {
          console.log(resData);
          this.handleAuthentication(resData.token);
        })
      )
  }

  autoLogin() {
    const token = localStorage.getItem('token');
    const tokenExpirationDate = +localStorage.getItem('tokenExpirationDate');

    if(!token || !tokenExpirationDate) {
      console.log('no token info');
      return;
    }

    const currentTime = Date.now();
    if(currentTime > tokenExpirationDate) {
      console.log('token expired');
      return;
    }

    const tokenExpiresIn = tokenExpirationDate - Date.now();
    console.log(tokenExpiresIn);
    const decodedToken: any = jwt_decode(token);
    const user = new User(
      decodedToken._id,
      decodedToken.firstName,
      decodedToken.lastName,
      decodedToken.city,
      decodedToken.address,
      decodedToken.postalCode,
      decodedToken.email,
      decodedToken.username,
      // decodedToken.password,
      token,
      tokenExpirationDate
    );
    this.user.next(user);
    this.autoLogout(tokenExpiresIn);
    // this.cartService.initialCart(token);
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpirationDate');
    this.router.navigate(['/home']);
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(tokenExpiresIn: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
      console.log('auto logout');
    }, tokenExpiresIn);
  }

  private handleAuthentication(token: string) {
    const decodedToken: any = jwt_decode(token);
    const tokenExpirationDate = Date.now() + decodedToken.tokenExpiresIn * 1000;
    const tokenExpiresIn = decodedToken.tokenExpiresIn * 1000;

    const user = new User(
      decodedToken._id,
      decodedToken.firstName,
      decodedToken.lastName,
      decodedToken.city,
      decodedToken.address,
      decodedToken.postalCode,
      decodedToken.email,
      decodedToken.username,
      // decodedToken.password,
      token,
      tokenExpirationDate
    );
    this.user.next(user);
    this.autoLogout(tokenExpiresIn);
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpirationDate', JSON.stringify(tokenExpirationDate));
    // this.cartService.initialCart(token);
  }
}
