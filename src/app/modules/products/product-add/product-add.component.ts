import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import { Products } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/layout/confirmation-dialog/confirmation-dialog.component';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/models/category';
import { AlertDialogComponent } from 'src/app/layout/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productFormGroup: FormGroup;
  isSubmitted = false;
  titleAlert: string = 'This field is required';
  id: number = 0;
  objProducts: Products = {
    id: 0,
    description: '',
    name: '',
    inStock: false,
    price: 0,
    categoryId: 0
  };
  categoriesList: Category[];
  
  constructor(private _Activatedroute: ActivatedRoute, public productService: ProductService, private formBuilder: FormBuilder,
    public categoryService: CategoryService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this._Activatedroute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });

    this.GetCategories();

    if (this.id > 0) {
      this.GetProductById(this.id);
    }

    this.productFormGroup = this.formBuilder.group(
      {
        id: [this.id],
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        inStock: [false],
        category: ['', Validators.required]
      });
  }

  async GetCategories() {
    this.categoryService.GetCategories().subscribe(
      res => { this.categoriesList = res as Category[]; },
      error => { console.log(error); });
  }

  // get f() { return this.productFormGroup.controls; }

  SaveProduct() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to save?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.isSubmitted = true;
        if (this.productFormGroup.invalid) {
          return;
        }

        var objProduct = {
          ID: this.productFormGroup.value.id,
          Name: this.productFormGroup.value.name,
          Description: this.productFormGroup.value.description,
          Price: this.productFormGroup.value.price,
          InStock: this.productFormGroup.value.inStock,
          CategoryId: this.productFormGroup.value.category,
        };

        if (objProduct.ID > 0) {
          this.productService.EditProduct(objProduct).subscribe(res => {
            this.openAlertDialog("Product edited successfully","OK");
            this.GetProductById(this.id);
          }, err => { console.log(err) });
        }
        else {
          this.productService.AddProduct(objProduct).subscribe(res => {
            this.openAlertDialog("Product added successfully","OK");
            this.GetProductById(res.id);
          }, err => { console.log(err) });
        }
      }
    });
  }

  GetProductById(prodId: number) {
    this.productService.GetProduct(prodId).subscribe(res => {
      this.objProducts.id = res.id;
      this.objProducts.name = res.name;
      this.objProducts.price = res.price;
      this.objProducts.description = res.description;
      this.objProducts.inStock = res.inStock;
      this.objProducts.categoryId = res.categoryId;
    }, err => {
      console.log(err);
    });
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
}
