import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isSidebarOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSidebarOpen() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
