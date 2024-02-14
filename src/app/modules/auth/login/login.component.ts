import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map } from 'rxjs';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  isSubmitted = false;
  titleAlert: string = 'This field is required';
  id: number = 0;
  objLogin: Login = {
    name: '',
    password: ''
  };
  constructor(public authService: AuthService, private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group(
      {
        name: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  Login() {
    this.isSubmitted = true;
    if (this.loginFormGroup.invalid) {
      return;
    }

    var objCategory = {
      id:0,
      username: this.loginFormGroup.value.name,
      password: this.loginFormGroup.value.password,
      role:"Admin",
      roleId:0
    };

    this.authService.Login(objCategory).subscribe(res => {
      debugger;
      localStorage.setItem('currentUserToken', res.jwtToken);
      this.router.navigate(['']);
    }, err => { console.log(err); });
  }
}
