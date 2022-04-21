import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isSidebarOpen = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSidebarOpen() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onLogin() {
    this.router.navigate(['login']);
  }

}
