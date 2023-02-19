import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../models/product';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly rootURL = "https://localhost:7241/api/";
  constructor(private http: HttpClient) { };
  readonly token = localStorage.getItem('currentUserToken');

  GetProducts() {
    const httpOptions = { headers: new HttpHeaders({'Authorization':'Bearer ' + this.token }) };
    return this.http.get<Products[]>(this.rootURL + 'Products/GetProducts',httpOptions);
  }

  GetProduct(id: number): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({'Authorization':'Bearer ' + this.token }) };
    return this.http.get<Products>(this.rootURL + 'Products/GetProduct/' + id,httpOptions);
  }

  AddProduct(formData: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer ' + this.token }) };
    return this.http.post<any>(this.rootURL + 'Products/PostProduct', formData, httpOptions);
  }

  EditProduct(formData: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer ' + this.token }) };
    return this.http.put<any>(this.rootURL + 'Products/PutProduct' + formData.ID, formData, httpOptions);
  }
}
