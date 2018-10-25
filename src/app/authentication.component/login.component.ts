import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {

  credentials = { username: '', password: '' };
  error = null;

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
  }

  login() {
    this.error = null;
    this.app.authenticate(this.credentials, () => {
      this.router.navigateByUrl('/');
    });
    // this.error = "Une erreur s'est produite. Veuillez réessayer."
    return false;
  }

}
