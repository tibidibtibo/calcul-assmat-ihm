import { Employe } from './../models/employe';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstService } from './const.service';

const URL_SEPARATOR: string = "/";

@Injectable()
export class HttpService {

  constructor(private http: HttpClient, private constantes: ConstService) { }

  public isBackAlive() {
    return this.http.get(this.constantes.serverUrl + "/token/alive");
  }

  public calcul(monthSelected: string, yearSelected: number, employeSelected, formData) {

    let URLArray = [this.constantes.serverUrl, "calcul/file", yearSelected.toString(), monthSelected, employeSelected.id];
    const URL = URLArray.join(URL_SEPARATOR);

    return this.http
      .post(URL, formData)
  }

  public getAllEnfants() {
    return this.http.get(this.buildUrl("/parametrage/enfants"), {});
  }

  public getAllEmployes() {
    return this.http.get<Array<Employe>>(this.buildUrl("/parametrage/employes"), {});
  }

  public deleteParamEnfant(enfantId) {
    // TODO : corriger methode path param
    return this.http.delete(this.buildUrl("/parametrage/enfants/"+ enfantId))
  }

  public deleteParamEmploye(employeId) {
    return this.http.delete(this.buildUrl("/parametrage/test/"+ employeId))
  }

  public getHistorique() {
    return this.http.get(this.buildUrl("/archives/all"), {});
  }


  private buildUrl(param: string): string {
    return this.constantes.serverUrl + param;
  }
}
