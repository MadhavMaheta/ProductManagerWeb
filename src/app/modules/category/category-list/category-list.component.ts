import { TableColumn } from 'src/app/models/table-column';
import { TableButton } from 'src/app/models/table-button';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  public categories: Category[] = [];
  displayedColumns = ['id', 'name', 'description', 'action'];
  dataSource = new MatTableDataSource(this.categories);
  columns: TableColumn[];
  buttons: TableButton[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public categoryService: CategoryService,private router: Router) {
    this.GetCategories();

    this.columns = [
      { columnDef: 'id',   header: 'Id',   cell: (element: Category) => `${element.id}` },
      { columnDef: 'name',     header: 'Name',     cell: (element: Category) => `${element.name}` },
      { columnDef: 'description',     header: 'Description',     cell: (element: Category) => `${element.description}` },
    ];

    this.buttons = [
      { styleClass: 'btn btn-primary px-2',     icon: 'edit',    payload: (element: Category) => `${element.id}`, action: 'edit' },
      { styleClass: 'btn btn-danger px-2',     icon: 'delete',    payload: (element: Category) => `${element.id}`, action: 'delete' },
    ];
  }

  ngOnInit(): void {
  }

  async GetCategories() {
    this.categoryService.GetCategories().subscribe(
      res => { this.categories = res as Category[]; this.dataSource = new MatTableDataSource(res as Category[]); this.dataSource.paginator = this.paginator; },
      error => { console.log(error); });
  }

  buttonClick(result: any) {
    if(result[0] == 'add')
    {
      this.router.navigate(['category/add']);
    }
    else{
      this.router.navigate(['category/edit',result[1]]);
    }
  }

  pageEventGenericTable(result : any){
    debugger;
  }
}
