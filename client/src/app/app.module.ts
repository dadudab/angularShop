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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
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
