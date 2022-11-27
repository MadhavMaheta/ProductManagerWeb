import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly rootURL = "https://localhost:7241/api/";
  constructor(private http: HttpClient) { };
 
  Login(formData: any){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Token>(this.rootURL + 'Auth', formData, httpOptions);
  }

  Register(formData: any){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.rootURL + 'Users/Register', formData, httpOptions);
  }

}
