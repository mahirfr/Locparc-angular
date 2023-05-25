import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/service/item.service';
import { MatCheckboxModule } from '@angular/material/checkbox'; 

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchQuery: string = "";
  searchResults: any[] = [];
  items: any[] = [];

  constructor(
              private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getAllAvailableItems().subscribe(
      items => this.items = items
    );
  }

  search() {
    // this.searchResults = this.items.filter(
    //   item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    // );
    if (this.searchQuery.length >= 1)
      this.itemService.getAvailableItems(this.searchQuery.toLowerCase()).subscribe(
        items => this.searchResults = items
      )
    return null;
  }

}
