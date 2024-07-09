import { Component, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/models/users-interface';
import { UsersService } from 'src/app/shared/services/users.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {
  userId !: string;
  userObj !: Iuser;

  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _userService = inject(UsersService);
  private _matdialog = inject(MatDialog);

  constructor() { }

  ngOnInit(): void {
    this._route.params.subscribe(res => {
      this.userId = res['userId'];
      if(this.userId){
        this.userObj = this._userService.fetchUser(this.userId);
      }
    })
  }

  onremove(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = "350px";
    dialogConfig.data = `Are you sure you want to ${this.userObj.userName} removed ?`;

    let dilogRef = this._matdialog.open(ConfirmDialogComponent,dialogConfig);
    dilogRef.afterClosed().subscribe(res => {
      if(res){
        this._userService.removeUser(this.userObj);
        this._router.navigate(['/home']);
      }
    })
  }
}
