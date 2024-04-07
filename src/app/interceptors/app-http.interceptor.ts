import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authservice :AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!request.url.includes("/auth/login")){
      let newrequest= request.clone({
        headers : request.headers.set('Authorization','Bearer '+ this.authservice.accessToken)
      })

      return next.handle(newrequest);
    }
   else return next.handle(request);
  }
}
