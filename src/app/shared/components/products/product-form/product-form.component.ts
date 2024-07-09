import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Iproduct } from 'src/app/shared/models/product-interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { UuidService } from 'src/app/shared/services/uuid.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productId !: string;
  productObj !: Iproduct;
  isinEditMode !: boolean;
  productForm !: FormGroup;

  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _productservice = inject(ProductsService);
  private _uuid = inject(UuidService);

  constructor() { }

  ngOnInit(): void {
    this.createProductForm();
    this.productId = this._route.snapshot.params['productId'];
    if(this.productId){
       this.isinEditMode = true;
       this.productObj = this._productservice.fetchProduct(this.productId);
       this.productForm.patchValue(this.productObj);
    }
    else{
      this.isinEditMode = false;
    }

    this._route.queryParams.subscribe((res:Params) => {
      if(res['canChange'] === '0'){
        this.productForm.disable();
      }
      else{
        this.productForm.enable();
      }
    })
  }

  createProductForm(){
    this.productForm = new FormGroup({
      pname:new FormControl(null,Validators.required),
      pstatus: new FormControl(null,Validators.required),
      canReturn:new FormControl(null,Validators.required),
      pFeature:new FormControl(null,Validators.required),
      pimgUrl:new FormControl(null,Validators.required)
    })
  }

  onAddprod(){
    if(this.productForm.valid){
       let newProduct = {...this.productForm.value,id:this._uuid.generateUuid()};
       this._productservice.addNewProduct(newProduct);
       this._router.navigate(['/products'])
    }
  }

  onUpdateProduct(){
    if(this.productForm.valid){
      let updatedProd = {...this.productForm.value,id:this.productId};
      this._productservice.updateProduct(updatedProd);
      this._router.navigate(['/products'])
    }
  }
}
