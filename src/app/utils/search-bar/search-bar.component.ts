import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/service/item.service';
import { FormControl } from '@angular/forms';
import { CategoriesService } from 'src/app/service/categories.service';
import { Category } from 'src/app/model/Category/Category';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchQuery: string = "";
  itemControl = new FormControl("");
  categories: Category[] = [];
  searchResults: any[] = [];
  items: any[] = [];

  constructor(private itemService    : ItemService,
              private categoryService: CategoriesService) { }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(
      categories => this.categories = categories
    );
  }

  search() {
    // this.searchResults = this.items.filter(
    //   item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    // );
    // If input not empty get items
    if (this.searchQuery.length >= 1) 
      this.itemService.getAvailableItems(this.searchQuery.toLowerCase()).subscribe(
        items => this.searchResults = items
      )
  }



}
