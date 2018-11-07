import { TokenStorageService } from './token.storage.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public tokenService: TokenStorageService, public router: Router) {}

  canActivate(): boolean {
    if (!this.tokenService.getToken()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
