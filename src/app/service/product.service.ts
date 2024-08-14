import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../models/product';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter } from '../models/filter';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly rootURL = "http://localhost:5241/api/";
  constructor(private http: HttpClient) { };
  readonly token = localStorage.getItem('currentUserToken');

  GetProducts() {
    const httpOptions = { headers: new HttpHeaders({'Authorization':'Bearer ' + this.token }) };
    return this.http.get<Products[]>(this.rootURL + 'Products/GetProducts',httpOptions);
  }

  GetProductsList(filter : Filter) {
    const httpOptions = { headers: new HttpHeaders({'Authorization':'Bearer ' + this.token }) };
    return this.http.post<Products[]>(this.rootURL + 'Products/GetProductList', filter,httpOptions);
  }

  GetProductsWithImage() { 
    return this.http.get<Products[]>(this.rootURL + 'Products/GetHomePageProducts');
  }

  GetProduct(id: number): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({'Authorization':'Bearer ' + this.token }) };
    return this.http.get<Products>(this.rootURL + 'Products/GetProduct/' + id,httpOptions);
  }

  GetProductImage(id: number) {
    const httpOptions = { headers: new HttpHeaders({'Authorization':'Bearer ' + this.token }) };
    return this.http.get<any>(this.rootURL + 'Products/GetProductImage/'+id,httpOptions);
  }

  AddProduct(formData: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer ' + this.token }) };
    return this.http.post<any>(this.rootURL + 'Products/PostProduct', formData, httpOptions);
  }

  EditProduct(formData: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer ' + this.token }) };
    return this.http.put<any>(this.rootURL + 'Products/PutProduct/' + formData.ID, formData, httpOptions);
  }

  UploadProductImage(productId : number, formData: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization':'Bearer ' + this.token}) };
    return this.http.post<any>(this.rootURL + 'Products/AddImage/' + productId, formData, httpOptions);
  }
}
