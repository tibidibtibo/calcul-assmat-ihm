import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token.storage.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public form: FormGroup;
  public credentials = { username: '', password: '' };
  public error;
  public loading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private token: TokenStorageService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  login(): void {
    this.loading = true;
    this.error = null;
    this.authService.authenticate(this.credentials).subscribe(
      (data: any) => {
        this.token.saveToken(data.token);
        this.loading = false;
        this.router.navigate(['/']);
      },
      error => {
        this.error = {
          libelle: "Une erreur s'est produite. Veuillez réessayer.",
          message: error.message
        }
        this.loading = false;
      }
    );
  }

}
