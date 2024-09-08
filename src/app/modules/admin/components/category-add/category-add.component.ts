import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/service/category.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/layout/confirmation-dialog/confirmation-dialog.component';
import { AlertDialogComponent } from 'src/app/layout/alert-dialog/alert-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  categoryFormGroup: FormGroup;
  isSubmitted = false;
  titleAlert: string = 'This field is required';
  id: number = 0;
  objCategories: Category = {
    id: 0,
    description: '',
    name: '',
  };
  constructor(
    private _Activatedroute: ActivatedRoute, 
    public categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private tostr : ToastrService,
  ) { }

  ngOnInit(): void {

    this._Activatedroute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });

    if (this.id > 0) {
      this.GetCategoryById(this.id);
    }

    this.categoryFormGroup = this.formBuilder.group(
      {
        id: [this.id],
        name: ['', Validators.required],
        description: ['', Validators.required]
      });
  }

  SaveCategory() {

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
        if (this.categoryFormGroup.invalid) {
          return;
        }

        var objCategory = {
          ID: this.categoryFormGroup.value.id,
          Name: this.categoryFormGroup.value.name,
          Description: this.categoryFormGroup.value.description,
        };

        if (objCategory.ID > 0) {
          this.categoryService.EditCategory(objCategory).subscribe(res => {
            this.tostr.success("Category edited successfully","Success");
            this.GetCategoryById(objCategory.ID);
          }, err => { console.log(err) });
        }
        else {
          this.categoryService.AddCategory(objCategory).subscribe(res => {
            this.tostr.success("Category added successfully","Success");
            this.GetCategoryById(res.id);
          }, err => { console.log(err) });
        }
      }
    });
  }

  GetCategoryById(categoryId: number) {
    this.categoryService.GetCategory(categoryId).subscribe(res => {
      this.objCategories.id = res.id;
      this.objCategories.name = res.name;
      this.objCategories.description = res.description;
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
