import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  readonly rootURL = "https://localhost:7175/api/";
  constructor(private http: HttpClient) { };
  readonly token = localStorage.getItem('currentUserToken');

  PlaceOrder(order: Order): Observable<Order> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer ' + this.token }) };
    return this.http.post<any>(this.rootURL + 'Orders/PlaceOrder', order, httpOptions);
  }
}
