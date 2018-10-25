import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {

  credentials = { username: '', password: '' };
  error = null;

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {
  }

  login() {
    this.error = null;
    this.authService.authenticate(this.credentials, () => {
      this.router.navigateByUrl('/');
    });
    // this.error = "Une erreur s'est produite. Veuillez réessayer."
    return false;
  }

}
