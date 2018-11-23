import { forkJoin } from 'rxjs/observable/forkJoin';
import { HttpService } from './../services/http.service';
import { Component } from "@angular/core";

@Component({
  selector: "parametrage",
  templateUrl: "./parametrage.component.html",
  styleUrls: ["./parametrage.component.css"]
})
export class ParametrageComponent {

  public enfants;
  public employes;
  public modelEmploye = {};

  constructor(httpService: HttpService) {

    var employesCall = httpService.getAllEmployes();
    var enfantsCall = httpService.getAllEnfants();

    forkJoin(employesCall, enfantsCall).subscribe((results: any) => {
      this.employes = results[0];
      this.employes.forEach(employe => {
        this.modelEmploye[employe.id] = employe;
      });
      this.onOkEnfants(results[1], this.employes);
    });
  }

  public onOkEnfants(enfants, enployes) {
    console.log(enfants);
    var listeEnfants = [];
    if (enfants) {
      enfants.forEach(enfant => {
        // var enf
        enfant.employesIds.forEach(empId => {
          // TODO:  match enfant / id
        });
      });
      this.enfants = enfants;
    }
  }

}
