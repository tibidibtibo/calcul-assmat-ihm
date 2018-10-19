import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {

  url: string = "http://localhost:7777";

  authenticated: string = null;

  constructor(private http: HttpClient) {
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

    this.http.get(this.url + '/auth/user', { headers: headers }).subscribe(response => {
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
      .post(this.url + '/logout', {})
      .finally(() => {
        this.authenticated = null;
        callback();
      })
      .subscribe();
  }

}
