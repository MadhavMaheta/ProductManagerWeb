import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Token } from '../models/token';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly rootURL = "https://localhost:7175/";
  readonly token = localStorage.getItem('currentUserToken');
  constructor(private http: HttpClient) { };
 
  Login(formData: any){
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Token>(this.rootURL + 'auth', formData, httpOptions);
  }

  Register(formData: any){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.rootURL + 'User/RegisterUser', formData, httpOptions);
  }

  GetAccountData(id : number){
    const httpOptions = { headers: new HttpHeaders({ 'Authorization':'Bearer ' + this.token }) };
    return this.http.get<User>(this.rootURL + 'User/GetUser/'+id, httpOptions);
  }
}
