import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

import { forkJoin } from 'rxjs/observable/forkJoin';
import { ConstService } from './const.service';

@Injectable()
export class ReferentielService {

  constructor(private httpService: HttpService, private constantes: ConstService) { }

  // INTERFACE

  public loadParametrageEnfant() {
    return this.httpService.getAllEnfants();
  }

  public loadParametrageEmploye() {
    return this.httpService.getAllEmployes();
  }

  public loadParametrageEnfantsEtEmployes() {
    return forkJoin(this.loadParametrageEnfant(), this.loadParametrageEmploye())
      .map((results: any) => {
        return {
          enfants: results[0],
          employes: results[1]
        };
      });
  }

  public employesEtEnfantsToObjects(listesReferentiels) {
    if (listesReferentiels) {
      return {
        employes: this.listToObjectById(listesReferentiels.employes),
        enfants: this.listToObjectById(listesReferentiels.enfants)
      }
    }
  }

  // UTILS
  private listToObjectById(liste) {
    var objectToReturn = {};
    if (liste) {
      liste.forEach(element => {
        objectToReturn[element.id] = element;
      });
    }
    return objectToReturn;
  }
}
