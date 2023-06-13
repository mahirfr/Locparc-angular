import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/Category/Category';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>("http://localhost:8080/api/items/categories", category);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>("http://localhost:8080/api/items/categories")
      // .pipe(error => {
      //   console.log('HTTP error:', error);
      //   return throwError(() => new Error('Une erreur est survenue, ressayez plus tard'));
      // });
  }

}
