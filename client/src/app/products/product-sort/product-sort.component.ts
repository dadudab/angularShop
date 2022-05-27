import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { sortOptions } from 'src/app/shared/sort-options';

@Component({
  selector: 'app-product-sort',
  templateUrl: './product-sort.component.html',
  styleUrls: ['./product-sort.component.css']
})
export class ProductSortComponent implements OnInit {

  sortOptions: object[];
  selectedSortOption: string = '';
  @Output() selectedSortOptionEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.sortOptions = sortOptions;
  }

  emitSortOption() {
    // console.log(this.selectedSortOption);
    this.selectedSortOptionEvent.emit(this.selectedSortOption);
  }
}
