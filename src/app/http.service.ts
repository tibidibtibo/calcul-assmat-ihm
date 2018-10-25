import { AppService } from './app.service';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient, private appService: AppService) { }

  calcul(monthSelected: string, formData) {

    let headers = new HttpHeaders()
      .set("Accept", "application/json")
      .set("Access-Control-Allow-Origin", "*")
      .set("Authorization", this.appService.getBAHeader());
    let params = new HttpParams();

    const URL =
      this.appService.url + "/calcul/file/2018/" + monthSelected + "/maternelle/";

    return this.http
      .post(URL, formData, { headers: headers, params: params })
  }

  isBackAlive() {
    let headers = new HttpHeaders()
      .set('Content-Type', 'multipart/form-data')
      .set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Auth-Token')
      .set("Accept", "application/json")
      .set("Access-Control-Allow-Origin", "*");

    return this.http.get(this.appService.url + "/parametrage/alive", { headers: headers});
  }
}
