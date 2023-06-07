import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/service/item.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CategoriesService } from 'src/app/service/categories.service';
import { Category } from 'src/app/model/Category/Category';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
	searchQuery: string = "";
	categories: Category[] = [];
	searchResults: any[] = [];
	items: any[] = [];
	selectedSubCategories: string[] = [];
	searchForm: FormGroup;
	checked = false; 

	constructor(private itemService: ItemService,
		private categoryService: CategoriesService,
		private formBuilder: FormBuilder) {
		this.searchForm = this.formBuilder.group({
			selectedSubCategories: [] // Initialize with an empty array
		});
	}

	ngOnInit() {

		this.categoryService.getAllCategories().subscribe(
			categories => this.categories = categories
		);

	}

	onSelectedValuesChange() {
		this.selectedSubCategories = this.searchForm.get('selectedSubCategories')?.value;
		// console.log(this.selectedSubCategories)
		if (this.searchQuery.length === 0 && this.selectedSubCategories.length >= 1) {
			// get all items of that category 
			this.itemService.getAvailableItemsBySubCategories(this.selectedSubCategories).subscribe(
				items => this.searchResults = items
			);

		} else if (this.searchQuery.length >= 1 && this.selectedSubCategories.length >= 1) {
			// get all items of that category and of that name 
			this.itemService.getAvailableItemsByNameAndSubcategories(this.searchQuery.toLowerCase(), this.selectedSubCategories).subscribe(
				items => this.searchResults = items
			);
		} else if (this.searchQuery.length >= 1 && this.selectedSubCategories.length === 0) {
			this.itemService.getAvailableItemsBySubCategories(this.selectedSubCategories).subscribe(
				items => this.searchResults = items
			);
		} else {
			this.searchResults = [];
		}
	}

	search() {
		// If input not empty get items
		if (this.searchQuery.length >= 1 && this.selectedSubCategories.length === 0) {
			this.itemService.getAvailableItemsByName(this.searchQuery.toLowerCase()).subscribe(
				items => this.searchResults = items
			);
		} else if (this.searchQuery.length >= 1 && this.selectedSubCategories.length >= 1) {
			this.itemService.getAvailableItemsByNameAndSubcategories(this.searchQuery.toLowerCase(), this.selectedSubCategories).subscribe(
				items => this.searchResults = items
			);
		} else if (this.searchQuery.length === 0 && this.selectedSubCategories.length >= 1) {
			this.itemService.getAvailableItemsBySubCategories(this.selectedSubCategories).subscribe(
				items => this.searchResults = items
			);
		} else {
			this.searchResults = [];
		}
	}



}
