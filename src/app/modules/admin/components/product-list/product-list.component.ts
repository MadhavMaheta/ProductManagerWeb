import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Products } from 'src/app/models/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { filter, lastValueFrom } from 'rxjs';
import { TableColumn } from 'src/app/models/table-column';
import { TableButton } from 'src/app/models/table-button';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/models/category';
import { Filter } from 'src/app/models/filter';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {

  public products: Products[] = [];
  displayedColumns = ['id', 'name', 'description', 'price', 'inStock', 'action'];
  dataSource = new MatTableDataSource(this.products);
  columns: TableColumn[];
  buttons: TableButton[];
  products1: Products[];
  categoryList: Category[];

  totalRows = 0;
  pageSize = 5;
  currentPage = 0;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public productService: ProductService,
    public categoryService: CategoryService,
    private currencyPipe: CurrencyPipe,
    private router: Router) {
    
      this.GetCategories();
      this.GetProducts();

    this.columns = [
      { columnDef: 'id', header: 'Id', cell: (element: Products) => `${element.id}` },
      { columnDef: 'name', header: 'Name', cell: (element: Products) => `${element.name}` },
      { columnDef: 'description', header: 'Description', cell: (element: Products) => `${element.description}` },
      { columnDef: 'price', header: 'Price', cell: (element: Products) => `${element.currencyPrice}` },
      { columnDef: 'inStock', header: 'InStock', cell: (element: Products) => `${element.inStock}` },
    ];

    this.buttons = [
      { styleClass: 'btn btn-primary px-2', icon: 'edit', payload: (element: Products) => `${element.id}`, action: 'edit' },
      { styleClass: 'btn btn-danger px-2', icon: 'delete', payload: (element: Products) => `${element.id}`, action: 'delete' },
    ];
  }

  async GetProducts() {
    this.productService.GetProducts().subscribe(
      res => 
        { 
          this.products = res as Products[]; 
          this.ProcessProductData();
          this.dataSource = new MatTableDataSource(res as Products[]); 
          this.dataSource.paginator = this.paginator; 
        },
        error => { console.log(error); });
  }

  async GetProductsList(filter : Filter) {
    this.productService.GetProductsList(filter).subscribe(
      res => 
        { 
          this.products = res as Products[];
          this.ProcessProductData();
          this.dataSource = new MatTableDataSource(res as Products[]); 
          this.dataSource.paginator = this.paginator;
        },
        error => { console.log(error); });
  }

  async GetCategories() {
    this.categoryService.GetCategories().subscribe(
      res => { this.categoryList = res as Category[]; },
      error => { console.log(error); });
  }

  buttonClick(result: any) {
    if (result[0] == 'add') {
      this.router.navigate(['products/add']);
    }
    else {
      this.router.navigate(['products/edit', result[1]]);
    }
  }
  
  pageEventGenericTable(result: PageEvent) {
    this.pageSize = result.pageSize;
    this.currentPage = result.pageIndex;
    this.GetProducts();
  }

  FilterData(result : any)
  {
    var filter = {
      categories : result,
    };
    
    this.GetProductsList(filter);
  }

  ProcessProductData()
  {
    this.products = this.products.map(item => ({
      ...item,
      currencyPrice: this.currencyPipe.transform(item.price , 'Rs.') ?? ''
    }));

  }
}
