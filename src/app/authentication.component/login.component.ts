import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenStorageService } from './../services/token.storage.service';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = { username: '', password: '' };
  error;

  constructor(private authService: AuthService, private token: TokenStorageService, private router: Router) {
  }

  login(): void {
    this.error = null;
    this.authService.authenticate(this.credentials).subscribe(
      (data: any) => {
        this.token.saveToken(data.token);
        this.router.navigate(['/']);
      },
      error => {
        this.error = {
          libelle: "Une erreur s'est produite. Veuillez réessayer.",
          message: error.message
        }
      }
    );
  }

}
