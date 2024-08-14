import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  thumbnail: any;
  productId: number = 0;
  objProducts: Products = {
    id: 0,
    description: '',
    name: '',
    inStock: false,
    price: 0,
    categoryId: 0
  };
  quantityCount : number= 1;
  isDecrementDisabled = false;
  subscription: Subscription;
  
  constructor(private _Activatedroute: ActivatedRoute, public productService: ProductService,private sanitizer: DomSanitizer,
    private router: Router, private location: Location) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
    });
    this.GetProductById(this.productId);
  }

  GetProductById(prodId: number) {
    this.productService.GetProduct(prodId).subscribe(res => {
      this.objProducts.id = res.id;
      this.objProducts.name = res.name;
      this.objProducts.price = res.price;
      this.objProducts.description = res.description;
      this.objProducts.inStock = res.inStock;
      this.objProducts.categoryId = res.categoryId;
      this.GetProductImage();
    }, err => {
      console.log(err);
    });
  }

  async GetProductImage() {
    this.productService.GetProductImage(this.productId).subscribe(
      res => { 
        let objectURL = 'data:image/png;base64,' + res;
        this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error => { console.log(error); });
  }

  increment(){
    this.quantityCount = this.quantityCount + 1;
    this.isDecrementDisabled = false;
  }
  decrement(){
    if(this.quantityCount > 1){
      this.quantityCount = this.quantityCount- 1;
    }
    else{
      this.isDecrementDisabled  = true;
    }
  }
  Checkout(){
    localStorage.setItem("productId",this.productId.toString());
    localStorage.setItem("productQuantity",this.quantityCount.toString());
    this.router.navigate(['checkout']);
  }
  GoToBackPage()
  {
    this.location.back();
  }
}
