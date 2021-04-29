import { Router, ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { ApiIproduct } from 'src/app/interfaces/api-iproduct';
import { CartItem } from 'src/app/interfaces/cart-item';
import { ApiProductService } from 'src/app/services/api-product.service';
import { CartServiceService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-api-products',
  templateUrl: './api-products.component.html',
  styleUrls: ['./api-products.component.css']
})
export class ApiProductsComponent implements OnInit {
ApiProducts:ApiIproduct[];
searchMode: boolean;
  constructor(private _apiPrdServ:ApiProductService, private cartService: CartServiceService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
   this.searchMode = this._route.snapshot.paramMap.has('keyword');

   if(this.searchMode){
     this.handleSearchMode();
   }
   else{
    this._apiPrdServ.getAllProducts().subscribe((res)=>{
      //  console.log(res);
      this.ApiProducts=res;
     },(err)=>{
       console.log(err);
  
     })
   }

  }

  handleSearchMode() {
    const keyword: string = this._route.snapshot.paramMap.get('keyword');

    this._apiPrdServ.searchForProduct(keyword).subscribe(
      (data) => {
        this.ApiProducts = data;
      },
      (error) => {
        console.log(error);
        
      }
    );
  }

  addToCart(theProduct: ApiIproduct) {

    console.log(`Adding to cart: ${theProduct.Title}, ${theProduct.price}`);

    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }

}
