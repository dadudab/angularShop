import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { categories } from 'src/app/shared/categories';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  @Output() selectedCategoriesEvent = new EventEmitter<string[]>();
  categories: object[];
  selectedCategories: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.categories = categories;
  }

  onChangeFilter(value: string) {
    const existingIndex = this.selectedCategories.findIndex(option => option === value);

    if(existingIndex === -1) {
      this.selectedCategories.push(value);
    }
    else {
      // this.selectedOptions.slice(existingIndex, 1);
      // this.selectedOptions.filter(option => option !== value);
      const updatedArray = this.selectedCategories.filter(option => option !== value);
      this.selectedCategories = updatedArray;
    }
    // console.log(this.selectedCategories);
    this.selectedCategoriesEvent.emit(this.selectedCategories);
  }
}
