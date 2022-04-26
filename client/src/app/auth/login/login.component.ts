import { Observable } from 'rxjs';
import { AuthService, IAuthResponse } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLoginUser(form: NgForm) {
    if(!form.valid) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    const username = form.value.username;
    const password = form.value.password;

    this.authService.loginUser(username, password).subscribe(response => {
      this.isLoading = false;
    }, error => {
      this.error = error.error.message;
      this.isLoading = false;
    })
  }
}
