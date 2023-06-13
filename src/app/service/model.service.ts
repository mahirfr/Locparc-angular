import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model } from '../model/Manufacturer/Model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:8080/api/items/models');
  }

  getById(id: number): Observable<any> {
    return this.http.get('http://localhost:8080/api/items/models/' + id);
  }

  create(model: Model): Observable<Model> {
    return this.http.post<Model>('http://localhost:8080/api/items/models', model);
  }

  delete(id: number) {
    return this.http.delete('http://localhost:8080/api/items/models/' + id);
  }
  
}
