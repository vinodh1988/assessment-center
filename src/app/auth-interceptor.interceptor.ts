import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the token from session storage
    const token = sessionStorage.getItem('access_token');

    console.log("pass",token)

    // Exclude the /login URL from having the Authorization header
    const loginUrl = '/login';

    // Check if the request URL includes the login endpoint
    if (req.url.includes(loginUrl)) {
      return next.handle(req); // Don't modify the request for the login call
    }

    // Clone the request and add the Authorization header with the token if available
    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(clonedReq)
      return next.handle(clonedReq);
    }

    // If there's no token, pass the original request
    return next.handle(req);
  }
}
