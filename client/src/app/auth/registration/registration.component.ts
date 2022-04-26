import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, IAuthResponse } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onRegisterUser(form: NgForm) {
    if(!form.valid) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    const userData = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      city: form.value.city,
      address: form.value.address,
      postalCode: form.value.postalCode,
      email: form.value.email,
      username: form.value.username,
      password: form.value.password
    }

    this.authService.registerUser(userData).subscribe(response => {
      console.log(response);
      this.isLoading = false;
    }, error => {
      this.error = error.error.message;
      this.isLoading = false;
    })
  }
}
