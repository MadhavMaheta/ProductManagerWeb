import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Products[] = [];
  constructor(
    public productService: ProductService, 
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.GetProducts();
  }

  GetProducts() {
    this.productService.GetProductsWithImage().subscribe(
      res => { 
        this.products = res as Products[];        
        this.products.forEach((data) =>{
          if(data?.imageData?.length > 0){
            let objectURL = 'data:image/png;base64,' + data.imageData;
            data.imageData = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
        });
      },
      error => { console.log(error); });
  }

  RouteToProductDetail(id:number){
    this.router.navigate(['product-detail',id]);
  }
}
