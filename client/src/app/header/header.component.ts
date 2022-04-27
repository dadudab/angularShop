import { AuthService } from './../auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isSidebarOpen = false;
  isAuth = false;
  userSub: Subscription;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.isAuth);
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuth = !!user;
      console.log(user);
    })
  }

  onSidebarOpen() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
