import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css']
})
export class MultiSelectDropdownComponent implements OnInit {

  @Output() selectedMultiDDValuesOutput = new EventEmitter<number[]>();

  constructor() { }

  @Input() multiSelectDropdownValues : Category[] = [];
  toppings = new FormControl<number[]>([]);;

  ngOnInit(): void {
    this.toppings.valueChanges.subscribe(selectedToppings => {
      this.OnSelectionChange(selectedToppings ?? []);
    });
  }

  OnSelectionChange(selectedMultiDDValues : number[])
  {
    this.selectedMultiDDValuesOutput.emit(selectedMultiDDValues);
  }
}
