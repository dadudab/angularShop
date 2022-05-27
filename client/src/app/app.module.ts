import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductSaleComponent } from './products/product-sale/product-sale.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ErrorMessageComponent } from './shared/error-message/error-message/error-message.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner/loading-spinner.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewProductComponent } from './dashboard/new-product/new-product.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ProductsDashboardComponent } from './dashboard/products-dashboard/products-dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { UpdateProductComponent } from './dashboard/products-dashboard/update-product/update-product.component';
import { CategoryFilterPipe } from './products/product-filter/category-filter.pipe';
import { ProductSortComponent } from './products/product-sort/product-sort.component';
import { ProductSortPipe } from './products/product-sort/product-sort.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductsComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductFilterComponent,
    ProductSaleComponent,
    RegistrationComponent,
    LoginComponent,
    ProductDetailComponent,
    CartComponent,
    ErrorMessageComponent,
    CartItemComponent,
    LoadingSpinnerComponent,
    DashboardComponent,
    NewProductComponent,
    ProfileComponent,
    ProductsDashboardComponent,
    UpdateProductComponent,
    CategoryFilterPipe,
    ProductSortComponent,
    ProductSortPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
