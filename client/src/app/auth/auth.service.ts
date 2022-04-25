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

  constructor(private http: HttpClient) { }
  
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

  }

  private handleAuthentication(token: string) {
    const decodedToken: any = jwt_decode(token);
    const tokenExpirationDate = Date.now() + decodedToken.tokenExpiresIn * 1000;
    const user = new User(
      decodedToken._id,
      decodedToken.firstName,
      decodedToken.lastName,
      decodedToken.city,
      decodedToken.address,
      decodedToken.postalCode,
      decodedToken.email,
      decodedToken.username,
      decodedToken.password,
      token,
      tokenExpirationDate
    );
    this.user.next(user);
    
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpirationDate', JSON.stringify(tokenExpirationDate));
  }
}
