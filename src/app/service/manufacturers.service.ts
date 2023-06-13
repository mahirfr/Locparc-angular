import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manufacturer } from '../model/Manufacturer/Manufacturer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManufacturersService {

  URL: string = "http://localhost:8080/api/items/manufacturers";
  
  constructor(private http: HttpClient) { }
  
  // TODO: call an api to get all manufacturers 
  getAllManufacturers(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(this.URL);
  }
  
}