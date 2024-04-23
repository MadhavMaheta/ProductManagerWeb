import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { ChangePassword } from '../models/changePassword';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  readonly rootURL = "https://localhost:7175/";
  readonly token = localStorage.getItem('currentUserToken');
  constructor(private http: HttpClient) { };

  UpdateAccount(user: User){
    const httpOptions = { headers: new HttpHeaders({ 'Authorization':'Bearer ' + this.token }) };
    return this.http.patch<User>(this.rootURL + 'User/UpdateUser',user, httpOptions);
  }

  ChangePassword(changePassword: ChangePassword){
    const httpOptions = { headers: new HttpHeaders({ 'Authorization':'Bearer ' + this.token }) };
    return this.http.patch<User>(this.rootURL + 'User/ChangeUserPassword',changePassword, httpOptions);
  }
}
