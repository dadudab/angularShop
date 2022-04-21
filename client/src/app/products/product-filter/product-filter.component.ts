import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  filteringOptions = [
    { value: 'rtv', name: 'Rtv'},
    { value: 'garden', name: 'Garden' },
    { value: 'pc', name: 'pc' },
    { value: 'garden', name: 'Garden' },
    { value: 'garden', name: 'Garden' },
    { value: 'garden', name: 'Garden' },
    
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
