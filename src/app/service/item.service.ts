import { Injectable } from '@angular/core';
import { Item } from '../model/Item';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ItemService {

	constructor(private http: HttpClient) { }

	URL = "http://localhost:8080/api/items";

	getAllItems(): Observable<Item[]> {
		return this.http.get<Item[]>(this.URL)
			.pipe(
				catchError(error => {
					// Handle the error appropriately
					console.log('HTTP error:', error);
					return throwError(() => new Error('Une erreur est survenue, ressayez plus tard'));
				})
			);
	}


	getAvailableItemsByName(itemName: string): Observable<Item[]> {
		return this.http.get<Item[]>(this.URL + "/available/search/" + itemName)
			.pipe(
				catchError(error => {
					console.log('HTTP error:', error);
					return throwError(() => new Error('Une erreur est survenue, ressayez plus tard'));
				})
			);
	}

	getAvailableItemsBySubCategories(subCategories: string[]): Observable<Item[]> {
		return this.http.get<Item[]>(this.URL + "/available/sub-category/" + subCategories)
			// .pipe(
			// 	catchError(error => {
			// 		console.log('HTTP error:', error);
			// 		return throwError(() => new Error('Une erreur est survenue, ressayez plus tard'));
			// 	})
			// );
	}

	getAvailableItemsByNameAndSubcategories(itemName: string, subCategories: string[]): Observable<Item[]> {
		return this.http.get<Item[]>(this.URL + "/available/" + itemName + "/" + subCategories)
			.pipe(
				catchError(error => {
					console.log('HTTP error:', error);
					return throwError(() => new Error('Une erreur est survenue, ressayez plus tard'));
				})
			);
	}


	// TODO: Add a post method to add an item
	create(item: Item): Observable<Item> {
		return this.http.post<Item>(this.URL + "/", item);
	}

	// TODO: Add a post method to add multiple items
	createMultiple(items: Item[]): Observable<Item[]> {
		return this.http.post<Item[]>(this.URL + "/multiple", items);
	}


	// TODO: Add a put method to update an item
	update(item: Item): Observable<Item> {
		return this.http.put<Item>(this.URL + "/", item);
	}

	// TODO: Add a delete method to delete an item
	delete(id: number): Observable<Item> {
		return this.http.delete<Item>(this.URL + "/" + id);
	}

}
