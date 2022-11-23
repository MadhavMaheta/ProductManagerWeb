import {Component, Input, Output, EventEmitter, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TableColumn } from 'src/app/models/table-column';
import { TableButton } from 'src/app/models/table-button';


@Component({
  selector: 'app-mat-table-common',
  templateUrl: './mat-table-common.component.html',
  styleUrls: ['./mat-table-common.component.css']
})
export class MatTableCommonComponent implements OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() buttons: TableButton[] = [];
  @Input() data: any[] = [];
  @Input() filter: boolean = false;
  @Input() filterPlaceholder: string = 'Filter';
  @Input() pagination: number[] = [];
  @Input() pageSize: number;
  @Input() tableMinWidth: number = 500;
  @Output() filteredData = new EventEmitter<any[]>();
  @Output() buttonClick = new EventEmitter<string[]>();
  @Output() pageEventGenericTable = new EventEmitter<PageEvent>();

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      // if (changes.data) {
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.displayedColumns = [...this.columns.map(c => c.columnDef)];
        if (this.buttons.length > 0) this.displayedColumns = [...this.displayedColumns, 'actions'];
      // }
    }
  }

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
    this.filteredData.emit(this.dataSource.filteredData);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.dataSource.sort = this.sort;
  }

  pageChanged(event: PageEvent) {
    debugger;
    this.pageEventGenericTable.emit(event);
    // this.pageSize = event.pageSize;
    // this.currentPage = event.pageIndex;
  }
}
