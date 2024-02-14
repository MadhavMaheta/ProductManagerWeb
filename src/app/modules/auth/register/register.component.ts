import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/layout/alert-dialog/alert-dialog.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public authService: AuthService,private formBuilder: FormBuilder,private dialog: MatDialog) { }
  registerFormGroup: FormGroup;
  titleAlert: string = 'This field is required';
  isSubmitted = false;

  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group(
      {
        name: ['', Validators.required],
        password: ['', Validators.required],
        eMail: ['', [Validators.required, Validators.email]]
      });
  }

  Register() {
    this.isSubmitted = true;
    if (this.registerFormGroup.invalid) {
      return;
    }

    var objRegister = {
      Name: this.registerFormGroup.value.name,
      Password: this.registerFormGroup.value.password,
      Email : this.registerFormGroup.value.eMail
    };

    this.authService.Register(objRegister).subscribe(res => {
      this.registerFormGroup.reset();
      this.openAlertDialog("Registered successfully","OK");
    }, err => { console.log(err); });
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
