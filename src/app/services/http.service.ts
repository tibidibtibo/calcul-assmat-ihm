import { AuthService } from './auth.service';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstService } from './const.service';

const URL_SEPARATOR: string = "/";

@Injectable()
export class HttpService {


  constructor(private http: HttpClient, private authService: AuthService, private constantes: ConstService) { }

  calcul(monthSelected: string, employeSelected, formData) {

    const annee = "2018";

    let headers = new HttpHeaders()
      .set("Accept", "application/json")
      .set("Access-Control-Allow-Origin", "*")
      .set("Authorization", this.authService.getBAHeader());
    let params = new HttpParams();

    let URLArray = [ this.constantes.serverUrl, "calcul/file", annee, monthSelected, employeSelected.id];
    const URL = URLArray.join(URL_SEPARATOR);
    console.log(URL);

    return this.http
          .post(URL, formData, { headers: headers, params: params })
  }

  isBackAlive() {

    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Auth-Token')
      .set("Access-Control-Allow-Origin", "*");

    return this.http.get(this.constantes.serverUrl + "/auth/alive", { headers: headers });
  }

  getAllEmployes() {
    let headers = new HttpHeaders()
      .set("Accept", "application/json")
      .set("Access-Control-Allow-Origin", "*")
      .set("Authorization", this.authService.getBAHeader());
    let params = new HttpParams();

    return this.http.get(this.constantes.serverUrl + "/parametrage/employes", { headers: headers, params: params });
  }
}
