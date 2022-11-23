import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly rootURL = "https://localhost:7241/api/";
  constructor(private http: HttpClient) { };
  readonly token = localStorage.getItem('currentUserToken');

  GetCategories() {
    const httpOptions = { headers: new HttpHeaders({'Authorization':'Bearer ' + this.token }) };
    return this.http.get<Category[]>(this.rootURL + 'Categories',httpOptions);
  }

  GetCategory(id: number): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({'Authorization':'Bearer ' + this.token }) };
    return this.http.get<Category>(this.rootURL + 'Categories/' + id);
  }

  AddCategory(formData: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer ' + this.token}) };
    return this.http.post<any>(this.rootURL + 'Categories', formData, httpOptions);
  }

  EditCategory(formData: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer ' + this.token }) };
    return this.http.put<any>(this.rootURL + 'Categories/' + formData.ID, formData, httpOptions);
  }
}
