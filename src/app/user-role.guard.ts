import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {
  private _router = inject(Router);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userRoleArr:Array<string> = route.data['userRole'];
    let loginUserRole:string = localStorage.getItem('userRole') as string;
    if(userRoleArr.includes(loginUserRole)){
      return true;
    }
    else{
      return this._router.createUrlTree(['home']);
    }
  }
  
}
