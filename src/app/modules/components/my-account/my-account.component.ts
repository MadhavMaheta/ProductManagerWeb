import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MustMatch } from 'src/app/functions/fieldMatchValidator';
import { passwordStrengthValidator } from 'src/app/functions/passwordStrengthValidator';
import { ChangePassword } from 'src/app/models/changePassword';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/service/account.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  myAccountGroup: FormGroup;
  changePasswordGroup: FormGroup;
  id: number = 0;
  user: User;
  constructor(private _Activatedroute: ActivatedRoute, private formBuilder: FormBuilder, public authService: AuthService
    , public accountService: AccountService) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });

    this.myAccountGroup = this.formBuilder.group(
      {
        id: [this.id],
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    this.BindAccountData();

    this.changePasswordGroup = this.formBuilder.group(
      {
        cpId: [this.id],
        newPassword: ['', [Validators.required, passwordStrengthValidator()]],
        confrimNewPassword: ['', Validators.required],
        oldPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('newPassword', 'confrimNewPassword')
    });
  }

  BindAccountData() {
    var myId = localStorage.getItem('loggedInUserId');
    this.authService.GetAccountData(Number(myId)).subscribe(res => {
      this.user = res;
      this.myAccountGroup.setValue({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        id: this.user.id
      });
    });
  }

  UpdateAccount() {
    const objUser: User = {
      id: this.myAccountGroup.value.id,
      name: this.myAccountGroup.value.name,
      email: this.myAccountGroup.value.email,
      password: ''
    };

    this.accountService.UpdateAccount(objUser).subscribe(res => {
      this.BindAccountData();
    });
  }

  ChangePassword() {
    if (this.changePasswordGroup.invalid) {
      return;
    }

    const objPassword: ChangePassword = {
      userId: this.changePasswordGroup.value.id,
      confrimPassword: this.changePasswordGroup.value.confrimNewPassword
    };

    this.accountService.ChangePassword(objPassword).subscribe(res => {
      this.BindAccountData();
    });
  }
}
