import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loginUserRole !: string;
  private _authService = inject(AuthService);
  constructor() { }

  ngOnInit(): void {
    this.loginUserRole = localStorage.getItem('userRole') !;
  }

  onLogOut(){
     this._authService.logOutFromApp();
  }
}
