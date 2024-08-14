import { Component, OnDestroy, OnInit } from '@angular/core';
import { Products } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';
import { Order, OrderItem } from 'src/app/models/order';
import { OrderService } from 'src/app/service/order.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/layout/alert-dialog/alert-dialog.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.css']
})
export class OrderCheckoutComponent implements OnInit {
  constructor(private productService : ProductService,private orderService : OrderService, private dialog: MatDialog, private location: Location) { }
  totalPrice : number = 0;
  productQuantity : number = 0;
  product : Products = {
    id: 0,
    description: '',
    name: '',
    inStock: false,
    price: 0,
    categoryId: 0
  };
  order : Order;
  orderItems : OrderItem[];

  ngOnInit(): void {
    var productId = Number(localStorage.getItem("productId"));
    this.productQuantity = Number(localStorage.getItem("productQuantity"));
    
    this.productService.GetProduct(productId).subscribe( 
      res => { 
        this.product.id = res.id;
        this.product.name = res.name;
        this.product.price = res.price;
        this.product.description = res.description;
        this.product.inStock = res.inStock;
        this.product.categoryId = res.categoryId;
        this.totalPrice = this.productQuantity * this.product.price;
       },
      error => { console.log(error); });;
      console.log(this.product);
  }

  CheckOut(){
    debugger;
    this.order = {
      orderTotal : this.totalPrice,
      orderItems : []
    };
    this.order.orderItems.push({itemPrice : this.product.price , productId : this.product.id , quantity : this.productQuantity});

    this.orderService.PlaceOrder(this.order).subscribe(res => {
      this.openAlertDialog("Order placed successfully","OK");
    },
    error => { console.log(error);});
  }

  openAlertDialog(message : string, buttonText: string) {
    const dialogRef = this.dialog.open(AlertDialogComponent,{
      data:{
        message: message,
        buttonText: {
          cancel: buttonText
        }
      },
    });
  }
  GoToBackPage()
  {
    this.location.back();
  }
}
