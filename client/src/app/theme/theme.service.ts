import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  theme: string = 'light-theme';
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document) { 
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initTheme() {
    // this.theme = localStorage.getItem('theme');
    if(!localStorage.getItem('theme')) {
      localStorage.setItem('theme', this.theme);
      this.renderer.addClass(this.document.body, this.theme);
    } else {
      this.theme = localStorage.getItem('theme');
      this.renderer.addClass(this.document.body, this.theme);
    }
  }

  switchTheme() {
    if(localStorage.getItem('theme') === 'light-theme') {
      this.theme = 'dark-theme';
      localStorage.setItem('theme', 'dark-theme');
      this.document.body.classList.replace('light-theme', 'dark-theme');
    } else {
      this.theme = 'light-theme';
      localStorage.setItem('theme', 'light-theme');
      this.document.body.classList.replace('dark-theme', 'light-theme');
    }
  }
}
