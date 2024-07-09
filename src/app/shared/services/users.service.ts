import { inject, Injectable } from '@angular/core';
import { Iuser } from '../models/users-interface';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersArr:Array<Iuser> = [
    {
      userName:"Jhon",
      userId:"123",
      userRole:"Candidate",
      userDesc:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut dolore, illum fugiat beatae consequuntur eligendi.'
    },
    {
      userName:"May",
      userId:"124",
      userRole:"Admin",
      userDesc:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut dolore, illum fugiat beatae consequuntur eligendi.'
    },
    {
      userName:"Stephen",
      userId:"125",
      userRole:"Candidate",
      userDesc:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut dolore, illum fugiat beatae consequuntur eligendi.'
    },
    {
      userName:"Charles",
      userId:"126",
      userRole:"Candidate",
      userDesc:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut dolore, illum fugiat beatae consequuntur eligendi.'
    }
  ]

  private _snackbar = inject(SnackbarService);
  constructor() { }

  fetchAllusers():Array<Iuser>{
    return this.usersArr;
  }

  fetchUser(id:string):Iuser{
    return this.usersArr.find(user => user.userId === id) as Iuser;
  }

  addNewUser(newUser:Iuser){
    this.usersArr.unshift(newUser);
    this._snackbar.snackbar(`The user name ${newUser.userName} added successfully`);
  }

  updateUser(updatedUser:Iuser){
    let getIndex = this.usersArr.findIndex(user => user.userId === updatedUser.userId);
    let oldUser = this.usersArr[getIndex];
    this.usersArr[getIndex] = updatedUser;
    this._snackbar.snackbar(`The user name ${oldUser.userName} updated to ${updatedUser.userName}`)
  }

  removeUser(userObj:Iuser){
    let removeIndex = this.usersArr.findIndex(user => user.userId === userObj.userId);
    this.usersArr.splice(removeIndex,1);
    this._snackbar.snackbar(`The user name ${userObj.userName} removed successfully`);
  }
}
