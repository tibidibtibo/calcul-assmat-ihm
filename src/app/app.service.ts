import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {

  authenticated: string = null;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials, callback) {

    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    headers
      .set('Content-Type', 'multipart/form-data')
      .set('Accept', 'multipart/form-data')
      .set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Auth-Token')

    this.http.get('http://localhost:7777/auth/user', { headers: headers }).subscribe(response => {
      if (response['name']) {
        console.log(response);
        this.authenticated = 'Basic ' + btoa(credentials.username + ':' + credentials.password);
      } else {
        console.log(response);
        this.authenticated = null;
      }
      return callback && callback();
    });

  }

  logout(callback) {
    this.http
      .post('logout', {})
      .finally(() => {
        this.authenticated = null;
        callback();
      })
      .subscribe();
  }

}
