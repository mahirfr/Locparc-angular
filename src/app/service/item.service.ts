import { Injectable } from '@angular/core';
import { Item } from '../model/Item';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>("http://localhost:8080/api/items/")
      .pipe(
        catchError(error => {
          // Handle the error appropriately
          console.log('HTTP error:', error);
          return throwError(() => new Error('Une erreur est survenue, ressayez plus tard'));
        })
      );
  }

  getAvailableItems(keyword: string): Observable<Item[]> {
    return this.http.get<Item[]>("http://localhost:8080/api/items/available/" + keyword)
      .pipe(
        catchError(error => {
          console.log('HTTP error:', error);
          return throwError(() => new Error('Une erreur est survenue, ressayez plus tard'));
        })
      );
  }


}
