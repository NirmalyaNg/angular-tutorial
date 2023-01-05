import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.url.includes('/auth') ||
      req.url.includes('/products') ||
      req.url.includes('/categories') ||
      req.url.includes('/cart')
    ) {
      return next.handle(req);
    }

    return this.auth.userSubject.pipe(
      take(1),
      exhaustMap((user) => {
        const modifiedReq = req.clone({
          headers: req.headers.append('Authorization', `Bearer ${user.token}`),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
