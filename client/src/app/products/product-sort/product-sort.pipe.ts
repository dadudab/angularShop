import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/shared/product.model';

@Pipe({
  name: 'productSort'
})
export class ProductSortPipe implements PipeTransform {

  notSortedProducts: Product[];

  transform(products: Product[], selectedSortOption: string): any {

    if(!selectedSortOption || selectedSortOption === '') {
      return products;
    }
    
    if(selectedSortOption === 'priceLowestToHighest') {
      const sortedProducts = products.sort((a, b) => a.price - b.price);
      return sortedProducts;
    }

    if(selectedSortOption === 'priceHighestToLowest') {
      const sortedProducts = products.sort((a, b) => b.price - a.price);
      return sortedProducts;
    }

    return products;
  }
}
