import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstService } from './const.service';

@Injectable()
export class AuthService {

  public authenticated: string = null;

  constructor(private http: HttpClient, private constantes: ConstService) {
  }

  getBAHeader(): string {
    return this.authenticated;
  }

  authenticate(credentials, callback) {

    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    headers
      .set('Content-Type', 'multipart/form-data')
      .set('Accept', 'multipart/form-data')
      .set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Auth-Token')

    this.http.get(this.constantes.serverUrl + '/auth/user', { headers: headers }).subscribe(response => {
      if (response['name']) {
        this.authenticated = 'Basic ' + btoa(credentials.username + ':' + credentials.password);
      } else {
        this.authenticated = null;
      }
      return callback && callback();
    });

  }

  logout(callback) {
    this.http
      .post(this.constantes.serverUrl + '/logout', {})
      .finally(() => {
        this.authenticated = null;
        callback();
      })
      .subscribe();
  }

}
