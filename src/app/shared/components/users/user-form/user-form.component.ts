import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/models/users-interface';
import { UsersService } from 'src/app/shared/services/users.service';
import { UuidService } from 'src/app/shared/services/uuid.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userId !: string;
  userObj !: Iuser;
  isinEditMode !: boolean;
  userForm !: FormGroup;

  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _userService = inject(UsersService);
  private _uuid = inject(UuidService);

  constructor() { }

  ngOnInit(): void {
    this.createUserForm();
    this.userId = this._route.snapshot.params['userId'];
    if(this.userId){
      this.isinEditMode = true;
      this.userObj = this._userService.fetchUser(this.userId);
      this.userForm.patchValue(this.userObj);
    }
    else{
      this.isinEditMode = false;
    }

    this._route.queryParams.subscribe((res:Params) => {
      if(res['canEdit'] === "Candidate"){
        this.userForm.disable();
      }
      else{
        this.userForm.enable();
      }
    })
  }

  createUserForm(){
    this.userForm = new FormGroup({
      userName:new FormControl(null,Validators.required),
      userRole:new FormControl(null,Validators.required),
      userDesc:new FormControl(null,Validators.required)
    })
  }

  onAddUser(){
    if(this.userForm.valid){
      let newUser = {...this.userForm.value,userId:this._uuid.generateUuid()};
      this._userService.addNewUser(newUser);
      this._router.navigate(['/users']);
    }
  }

  onUpdateUser(){
    if(this.userForm.valid){
      let updatedUser = {...this.userForm.value,userId:this.userId};
      this._userService.updateUser(updatedUser);
      this._router.navigate(['/users']);
    }
  }
}
