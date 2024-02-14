import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  myAccountGroup: FormGroup;
  id: number = 0;
  user : User;
  constructor(private _Activatedroute: ActivatedRoute,private formBuilder: FormBuilder,public authService: AuthService) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });

    this.myAccountGroup = this.formBuilder.group(
      {
        id: [this.id],
        name: ['', Validators.required],
        email: ['',Validators.required],
        password:['',Validators.required]
      });
      this.BindAccountData(this.id);
  }

  BindAccountData(id){
    this.authService.GetAccountData(id).subscribe(res=>{
      this.user = res;
      this.myAccountGroup.setValue({
        name: this.user.name,
        email: this.user.email,
        password:this.user.password,  
        id: this.user.id
      });
    });
  }
}
