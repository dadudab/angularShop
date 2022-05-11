import { exhaustMap, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if(!user) {
          return next.handle(request);
        }
        // console.log(user.token);
        const modifiedRequest = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${user.token}`)
        });
        return next.handle(modifiedRequest);
      })
    )
  }
}
