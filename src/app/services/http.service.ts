import { Employe } from './../models/employe';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstService } from './const.service';
import { PARAMETERS } from '@angular/core/src/util/decorators';

const URL_SEPARATOR: string = "/";

@Injectable()
export class HttpService {

  constructor(private http: HttpClient, private constantes: ConstService) { }

  isBackAlive() {
    return this.http.get(this.constantes.serverUrl + "/token/alive");
  }

  calcul(monthSelected: string, yearSelected: number, employeSelected, formData) {

    let URLArray = [this.constantes.serverUrl, "calcul/file", yearSelected.toString(), monthSelected, employeSelected.id];
    const URL = URLArray.join(URL_SEPARATOR);

    return this.http
      .post(URL, formData)
  }

  getAllEnfants() {
    return this.http.get(this.buildUrl("/parametrage/enfants"), {});
  }

  getAllEmployes() {
    return this.http.get<Array<Employe>>(this.buildUrl("/parametrage/employes"), {});
  }

  getHistorique() {
    return this.http.get(this.buildUrl("/archives/all"), {});
  }

  buildUrl(param: string): string {
    return this.constantes.serverUrl + param;
  }
}
