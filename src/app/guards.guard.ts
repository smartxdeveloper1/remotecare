import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {BackendService} from './backend.service'
@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {
private role:String
constructor(
  private router:Router,
  private service:BackendService
){}

  canActivate(route:ActivatedRouteSnapshot): boolean{
    if(this.service.isLoggedIn()){
    
      
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
  }
  


