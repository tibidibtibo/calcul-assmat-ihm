import { Employe } from './../models/employe';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConstService } from './const.service';

const URL_SEPARATOR: string = "/";

@Injectable()
export class HttpService {

  constructor(private http: HttpClient, private constantes: ConstService) { }

  private buildUrl(param: string): string {
    return this.constantes.serverUrl + param;
  }

  // INTERFACE

  // alive
  public isBackAlive() {
    return this.http.get(this.constantes.serverUrl + "/token/alive");
  }

  // CALCUL
  public calcul(monthSelected: string, yearSelected: number, formData) {

    let URLArray = [this.constantes.serverUrl, "calcul/file", yearSelected.toString(), monthSelected];
    const URL = URLArray.join(URL_SEPARATOR);

    return this.http
      .post(URL, formData)
  }

  // SAISIE
  public sendSaisie(saisie) {
    return this.http.post(this.buildUrl("/saisie"), saisie);
  }

  public findSaisieMonth(month, year) {
    return this.http.get(this.buildUrl("/saisie/" + year + "/" + month))
  }

  public importSaisie(monthSelected: string, yearSelected: number, formData) {

    let URLArray = [this.constantes.serverUrl, "saisie/file", yearSelected.toString(), monthSelected];
    const URL = URLArray.join(URL_SEPARATOR);

    return this.http
    .post(URL, formData)
  }

  public supprimerSaisie(identifiant: string) {
    return this.http.delete(this.buildUrl("/saisie/" + identifiant));
  }

  // PARAMS
  // Enfants
  public getAllEnfants() {
    return this.http.get(this.buildUrl("/parametrage/enfants"), {});
  }

  public deleteParamEnfant(enfantId) {
    return this.http.delete(this.buildUrl("/parametrage/enfants/" + enfantId))
  }

  public updateParamEnfant(enfantId, data) {
    return this.http.put(this.buildUrl("/parametrage/enfants/" + enfantId), {
      body: data
    })
  }

  // Employés
  public getAllEmployes() {
    return this.http.get<Array<Employe>>(this.buildUrl("/parametrage/employes"), {});
  }

  public deleteParamEmploye(employeId) {
    return this.http.delete(this.buildUrl("/parametrage/employes/" + employeId))
  }

  public updateParamEmploye(employeId, data) {
    return this.http.put(this.buildUrl("/parametrage/employes/" + employeId), data)
  }

  // HISTORIQUE
  public getHistorique() {
    return this.http.get(this.buildUrl("/archives/all"), {});
  }


}
