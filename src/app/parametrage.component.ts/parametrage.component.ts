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

  constructor(httpService: HttpService) {
    httpService.getAllEmployes().subscribe(employes => {
      this.onOkEmployes(employes);
      httpService.getAllEnfants().subscribe(enfants => {
        this.onOkEnfants(enfants, employes);
      });
    });
  }

  public onOkEmployes(employes) {
    this.employes = employes;
  }

  public onOkEnfants(enfants, enployes) {
    console.log(enfants);
    var listeEnfants = [];
    if(enfants) {
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
