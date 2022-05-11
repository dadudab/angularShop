import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductSaleComponent } from './products/product-sale/product-sale.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsResolver } from './products/products-resolver.service';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'products', component: ProductsComponent, resolve: { products: ProductsResolver} },
  { path: 'products/:productId', component: ProductDetailComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
