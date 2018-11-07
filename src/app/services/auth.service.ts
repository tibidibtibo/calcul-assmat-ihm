import { TokenStorageService } from './token.storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstService } from './const.service';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenStorageService, private constantes: ConstService) {
  }

  authenticate(credentials) {
    return this.http.post(this.constantes.serverUrl + '/token/generate-token', credentials);
  }

  isAuthenticated() {
    return this.tokenService.getToken();
  }

  logout() {
    return this.http
      .get(this.constantes.serverUrl + '/logout');

  }

}
