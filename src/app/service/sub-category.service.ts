import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubCategory } from '../model/Category/SubCategory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private http: HttpClient) { }

  create(subCategory: SubCategory): Observable<SubCategory> {
    return this.http.post<SubCategory>("http://localhost:8080/api/items/sub-categories", subCategory);
  }

  getById(id: number) {
    return this.http.get('http://localhost:8080/api/items/sub-categories/' + id);
  }

}
