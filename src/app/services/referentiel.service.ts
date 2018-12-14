import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

import { forkJoin } from 'rxjs/observable/forkJoin';
import { ConstService } from './const.service';

@Injectable()
export class ReferentielService {

  constructor(private httpService: HttpService, private constantes: ConstService) { }

  // INTERFACE

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
          enfant.employesIds.forEach(empId => {
            listeEmployesEnfant.push(
              params.employes.find(employe => {
                return employe.id === empId;
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

}
