import { Component } from "@angular/core";

import { forkJoin } from "rxjs/observable/forkJoin";
import { HttpService } from "../../../services/http.service";

@Component({
  selector: "nouvelle-saisie",
  templateUrl: "./nouvelle-saisie.component.html",
  styleUrls: ["./nouvelle-saisie.component.css"]
})
export class NouvelleSaisieComponent {

  public loading = false;
  public error = null;
  public enfants = [];
  public employes = [];
  public model: any = {};
  public inputNbDejeuner = this.getNumArray(2);
  public inputNbGouters = this.getNumArray(2);
  public inputNbAREcole = this.getNumArray(5);
  public dateSaisie = new Date();

  constructor(private httpService: HttpService) {

    var employesCall = this.httpService.getAllEmployes();
    var enfantsCall = this.httpService.getAllEnfants();

    forkJoin(employesCall, enfantsCall).subscribe((results: any) => {

      // init employes object
      this.employes = results[0];

      // init enfants object
      var enfants = [];
      results[1].forEach(enfant => {

        // init model object
        this.model[enfant.id] = {
          dateSaisie: this.dateSaisie,
          enfant: enfant.id,
          saisie: false,
          heureArrivee: this.initTime(7, 45),
          heureDepart: this.initTime(17, 0)
        };

        // init view object
        enfants.push({
          id: enfant.id,
          nom: enfant.nom,
          employes: this.findEmployesById(enfant.employesIds, this.employes)
        })
      });
      this.enfants = enfants;
    });
  }

  public findEmployesById(idEmployesEnfant: any, employes: any) {
    return employes.map(employe => {
      return {
        id: employe.id,
        text: employe.prenom + " " + employe.nom
      };
    }).filter(employe => {
      var isEmp = idEmployesEnfant.find(id => {
        return id === employe.id
      })
      return isEmp;
    });
  }

  public selected(value: any, enfantId): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any, enfantId): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any, enfantId): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any, enfantId): void {
    console.log(enfantId)
  }

  public onSubmit() {
    var request = [];
    this.error = null;
    this.loading = true;
    if(this.model) {
      Object.keys(this.model).forEach(enfant => {
        if(this.model[enfant] && this.model[enfant].saisie) {
          request.push(this.model[enfant]);
        }
      });
      this.httpService.sendSaisie({ saisie: request}).subscribe(
        ok => {
          this.loading = false;
        }, ko => {
          this.error = {
            libelle: "Une erreur s'est produite. Veuillez réessayer.",
            message: ko.message
          }
          this.loading = false;
        }
      );
    }
  }

  public getNumArray(size: number) {
    return Array.from(new Array(size), (val, index) => index);
  }

  public initTime(hours, minutes) {
    var date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
  }

  public toggleEnfant(enfant) {
    if (enfant && enfant.id && this.model[enfant.id]) {
      this.model[enfant.id].saisie = !this.model[enfant.id].saisie;
    }
  }

}
