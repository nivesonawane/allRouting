import { Component, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/shared/models/product-interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  productId !: string;
  productObj !: Iproduct;

  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _productService = inject(ProductsService);
  private _matdialog = inject(MatDialog);

  constructor() { }

  ngOnInit(): void {
    this._route.params.subscribe(res => {
      this.productId = res['productId'];
      if(this.productId){
         this.productObj = this._productService.fetchProduct(this.productId);
      }
    })
  }

  onDeleteProd(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = "350px";
    dialogConfig.data = `Are you sure you want to delete ${this.productObj.pname}`;

    let dialogRef = this._matdialog.open(ConfirmDialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this._productService.removeProduct(this.productObj);
        this._router.navigate(['/products']);
      }
    })
  }

}
