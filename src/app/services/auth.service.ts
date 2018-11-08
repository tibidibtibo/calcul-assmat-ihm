import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './token.storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ConstService } from './const.service';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private tokenService: TokenStorageService, private constantes: ConstService) {
  }

  authenticate(credentials) {
    return this.http.post(this.constantes.serverUrl + '/token/generate-token', credentials);
  }

  isAuthenticated() {
    return this.tokenService.getToken();
  }

  logout() {
    this.tokenService.signOut();
    this.router.navigate(['/']);
  }

}
