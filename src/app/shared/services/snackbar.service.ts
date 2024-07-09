import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private _snackbar = inject(MatSnackBar);

  constructor() { }

  snackbar(msg:string){
    this._snackbar.open(msg,"close",{
      horizontalPosition:"left",
      verticalPosition:"top",
      duration:3000
    })
  }
}
