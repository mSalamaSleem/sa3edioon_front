import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiIproduct } from 'src/app/interfaces/api-iproduct';
import { ApiProductService } from 'src/app/services/api-product.service';
import { CartItem } from 'src/app/interfaces/cart-item';
import { CartServiceService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-api-product-details',
  templateUrl: './api-product-details.component.html',
  styleUrls: ['./api-product-details.component.css']
})
export class ApiProductDetailsComponent implements OnInit {
  productDetails: ApiIproduct;
  // tslint:disable-next-line:variable-name
  constructor(private _apiPrdServ: ApiProductService, private _activedRoute: ActivatedRoute, private cartService: CartServiceService) { }

  ngOnInit(): void {

    let id = this._activedRoute.snapshot.params["id"];
    this._apiPrdServ.viewProduct(id).subscribe((res) => {
      this.productDetails = res;
      console.log(this.productDetails);
    });


  }
  // tslint:disable-next-line:typedef
  addToCart() {
    // console.log(`Adding to cart: ${this.prd.Title}, ${this.prd.price}`);
    const theCartItem = new CartItem(this.productDetails);
    this.cartService.addToCart(theCartItem);
  }
}
