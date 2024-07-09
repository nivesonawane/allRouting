import { Component, inject, OnInit } from '@angular/core';
import { Iproduct } from '../../models/product-interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
   allProducts !: Array<Iproduct>;

  private _productservice = inject(ProductsService); 
  constructor() { }

  ngOnInit(): void {
    this.allProducts = this._productservice.fetchAllProducts();
  }

}
