import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

import { forkJoin } from 'rxjs/observable/forkJoin';
import { ConstService } from './const.service';

@Injectable()
export class ReferentielService {

  constructor(private httpService: HttpService, private constantes: ConstService) { }

  // INTERFACE

  public employesEtEnfantsToObjects(listesReferentiels) {
    if(listesReferentiels) {
      return {
        employes: this.listToObjectById(listesReferentiels.employes),
        enfants: this.listToObjectById(listesReferentiels.enfants)
      }
    }
  }

  public consoliderSaisies(listeSaisies, referentiel) {
    var saisies = [];
    if(listeSaisies) {
      listeSaisies.forEach(saisie => {
        saisie.refEmploye = referentiel.employes[saisie.employe];
        saisie.refEnfant = referentiel.enfants[saisie.enfant];
        saisies.push(saisie);
      });
    }
    return saisies;
  }

  public loadEnfantEtEmployes() {

    var employesCall = this.httpService.getAllEmployes();
    var enfantsCall = this.httpService.getAllEnfants();

    return forkJoin(employesCall, enfantsCall)
      .map((results: any) => {

        return {
          employes: results[0],
          enfants: results[1]
        };

      })
      .map((params: any) => {

        var newListEnfants = [];
        params.enfants.forEach(enfant => {
          var listeEmployesEnfant = [];
          enfant.employes.forEach(empInfo => {
            listeEmployesEnfant.push(
              params.employes.find(employe => {
                return employe.id === empInfo.employeId;
              })
            );
          });
          enfant.employes = listeEmployesEnfant;
          newListEnfants.push(enfant);
        });

        return {
          enfants: newListEnfants,
          employes: params.employes
        };


      });
  }

  // UTILS

  private listToObjectById(liste) {
    var objectToReturn = {};
    if(liste) {
      liste.forEach(element => {
        objectToReturn[element.id] = element;
      });
    }
    return objectToReturn;
  }
}
