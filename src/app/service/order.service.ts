import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Order } from '../model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>("http://localhost:8080/api/orders/")
      .pipe(
        catchError(error => {
          return throwError(() => new Error('Une erreur est survenue, ressayez plus tard'));
        })
      );
  }

  // TODO: get pending orders
  getPendingOrders(): Observable<Order[]> {
    return this.http.get<Order[]>("http://localhost:8080/api/orders/pending")
      .pipe(
        catchError(error => {
          return throwError(() => new Error('Une erreur est survenue, ressayez plus tard'));
        })
      );
  }



  // TODO: get order by id 
  getOrderById(id?: number): Observable<Order> {
    return this.http.get<Order>("http://localhost:8080/api/orders/" + id)
      .pipe(
        catchError(error => {
          return throwError(() => new Error('Une erreur est survenue, ressayez plus tard'));
        })
      );
  }

}
