import { AuthGuard } from './auth/auth.guard';
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
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewProductComponent } from './dashboard/new-product/new-product.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'products', component: ProductsComponent, resolve: { products: ProductsResolver} },
  { path: 'products/:productId', component: ProductDetailComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: 'new-product', component: NewProductComponent }
  ]},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
