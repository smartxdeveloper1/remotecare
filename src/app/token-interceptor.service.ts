import { Injectable } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http'
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService  implements HttpInterceptor{

  constructor(
    private service:BackendService
  ) { }
  intercept(req, next) {
    let authService = this.service.getToken();
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService}`
      }
    })
    return next.handle(tokenizedReq);
  }
}

