import { Pipe, PipeTransform } from '@angular/core';
import { categories } from 'src/app/shared/categories';
import { Product } from 'src/app/shared/product.model';

@Pipe({
  name: 'categoryFilter',
  pure: false
})
export class CategoryFilterPipe implements PipeTransform {

  transform(products: Product[], selectedCategories: string[]) {
    const filteredProducts: Product[] = [];
  
    if(!selectedCategories || selectedCategories.length === 0) {
      return products;
    } 

    for(let category of selectedCategories) {
      for(let product of products) {
        if(product.categories[0] === category) {
          filteredProducts.push(product);
        }
      }
    }
    return filteredProducts;
  }

}
