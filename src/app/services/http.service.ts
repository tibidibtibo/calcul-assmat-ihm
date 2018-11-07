import { AuthService } from './auth.service';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstService } from './const.service';

const URL_SEPARATOR: string = "/";

@Injectable()
export class HttpService {

  constructor(private http: HttpClient, private authService: AuthService, private constantes: ConstService) { }

  isBackAlive() {
    return this.http.get(this.constantes.serverUrl + "/token/alive");
  }

  calcul(monthSelected: string, yearSelected: number, employeSelected, formData) {

    let headers = this.getAuthenticatedDefaultHeaders();
    let params = new HttpParams();

    let URLArray = [this.constantes.serverUrl, "calcul/file", yearSelected.toString(), monthSelected, employeSelected.id];
    const URL = URLArray.join(URL_SEPARATOR);

    return this.http
      .post(URL, formData, { headers: headers, params: params })
  }

  getAllEmployes() {
    let headers = this.getAuthenticatedDefaultHeaders();
    let params = new HttpParams();
    return this.http.get(this.constantes.serverUrl + "/parametrage/employes", { headers: headers, params: params });
  }

  getHistorique() {
    let headers = this.getAuthenticatedDefaultHeaders();
    let params = new HttpParams();
    return this.http.get(this.constantes.serverUrl + "/archives/all", { headers: headers, params: params });
  }

  private getAuthenticatedDefaultHeaders() {
    let headers = new HttpHeaders()
      .set("Accept", "application/json")
      .set("Access-Control-Allow-Origin", "*");
      // .set("Authorization", this.authService.getBAHeader());
    return headers;
  }
}
