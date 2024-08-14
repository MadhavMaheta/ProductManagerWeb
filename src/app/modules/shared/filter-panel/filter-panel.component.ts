import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent implements OnInit {

  selectedMultiDDValues : number[] = [];
  @Input() multiSelectDropdownValues : Category[] = [];
  @Output() selectedMultiDDValuesOutputNew = new EventEmitter<number[]>();
  constructor() { }

  ngOnInit(): void {
  }

  OnSelectionChange(result : any)
  {
    this.selectedMultiDDValues = result;
  }

  FilterData()
  {
    console.log('filter' + this.selectedMultiDDValues);
    this.selectedMultiDDValuesOutputNew.emit(this.selectedMultiDDValues);
  }
}
