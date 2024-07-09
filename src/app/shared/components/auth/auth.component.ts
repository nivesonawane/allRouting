import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Icred } from '../../models/Icred-interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  alreadyHasAccount : boolean = false;
  hide = true;
  loginForm !: FormGroup;
  show:boolean=false;

  private _authService = inject(AuthService);
  constructor() { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = new FormGroup({
      email: new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required)
    })
  }

  onLogin(){
    if(this.loginForm.valid){
      let val:Icred = this.loginForm.value;
      this._authService.loginToApp(val);
    }
  }
}
