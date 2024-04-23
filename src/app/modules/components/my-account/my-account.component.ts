import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
        newPassword: ['', Validators.required],
        confrimNewPassword: ['', Validators.required],
        oldPassword: ['', Validators.required]
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
    const objPassword: ChangePassword = {
      userId: this.changePasswordGroup.value.id,
      confrimPassword: this.changePasswordGroup.value.confrimNewPassword
    };

    this.accountService.ChangePassword(objPassword).subscribe(res => {
      this.BindAccountData();
    });
  }
}
