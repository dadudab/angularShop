import { Cart } from './shared/cart.model';
import { CartService } from './cart/cart.service';
import { AuthService } from './auth/auth.service';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'client';
  // theme = 'light-theme';

  constructor(private authService: AuthService
    // @Inject(DOCUMENT) private document: Document,
    // private renderer: Renderer2  
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    // this.initializeTheme();
  }

  // initializeTheme() {
  //   this.renderer.addClass(this.document.body, this.theme);
  // }

  // switchTheme() {
  //   this.document.body.classList.replace(this.theme, 
  //     this.theme === 'light-theme' ? (this.theme = 'dark-theme') : (this.theme = 'light-theme'));
  // }

}
