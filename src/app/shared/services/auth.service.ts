import { inject, Injectable } from '@angular/core';
import { Icred } from '../models/Icred-interface';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLoginstatus : boolean = false;
  loginSub$:BehaviorSubject<boolean> = new BehaviorSubject(false);

  private _router = inject(Router);
  private _snackbar = inject(SnackbarService);
  constructor() { }

  isAuthenticated():Promise<boolean>{
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        if(localStorage.getItem("token")){
          this.userLoginstatus = true;
          this.loginSub$.next(true);
          resolve(this.userLoginstatus);
        }else{
          this.userLoginstatus = false;
          this.loginSub$.next(false);
          this._router.navigate([''])
        }
        
      })
    })
  }

  loginToApp(cred:Icred){
    if(cred.email === 'jhon@gmail.com' && cred.password=== 'jhon@123'){
      this.userLoginstatus = true;
      localStorage.setItem("token","Bearer token after login");
      localStorage.setItem("userRole",'buyer');
      this.loginSub$.next(true);
      this._router.navigate(['home'])
    }
    else if(cred.email === 'june@gmail.com' && cred.password=== 'june@123'){
      this.userLoginstatus = true;
      localStorage.setItem("token","Bearer token after login");
      localStorage.setItem("userRole",'admin');
      this.loginSub$.next(true);
      this._router.navigate(['home'])
    }
    else if(cred.email === 'may@gmail.com' && cred.password=== 'may@123'){
      this.userLoginstatus = true;
      localStorage.setItem("token","Bearer token after login");
      localStorage.setItem("userRole",'sa');
      this.loginSub$.next(true);
      this._router.navigate(['home'])
    }
    else{
       this._snackbar.snackbar(`Invalid username and password`);
    }
    
  }

  logOutFromApp(){
    this.userLoginstatus = false;
    localStorage.removeItem("token");
    localStorage.removeItem('userRole')
    this.loginSub$.next(false);
    this._router.navigate(['']);
  }
}
