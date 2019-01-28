import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request || !request.url) {
      return next.handle(request);
    }

    if (request.url.includes("/login")) {
      return next.handle(request);
    }

    const token = sessionStorage.getItem('access_token');
    if (!!token) {
      request = request.clone({
        setParams: {
          access_token: token
        }
      });
    }
    return next.handle(request);
  }
}
