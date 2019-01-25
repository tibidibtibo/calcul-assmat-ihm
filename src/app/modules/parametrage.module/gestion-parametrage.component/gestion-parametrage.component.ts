import { ConstService } from './../../../services/const.service';
import { Component, TemplateRef } from "@angular/core";

import { forkJoin } from "rxjs/observable/forkJoin";

import { Enfant } from './../../../models/enfant';
import { HttpService } from './../../../services/http.service';
import { Employe } from './../../../models/employe';
import { ReferentielService } from "../../../services/referentiel.service";

@Component({
  selector: "gestion-parametrage",
  templateUrl: "./gestion-parametrage.component.html",
  styleUrls: ["./gestion-parametrage.component.css"]
})
export class GestionParametrageComponent {

  public refEnfants;
  public employes: Array<Employe>;
  public typesGarde;
  public employesLoaded: boolean = false;
  public enfantsLoaded: boolean = false;

  constructor(
    public httpService: HttpService,
    private refService: ReferentielService,
  ) {
    this.loadData();
  }

  private loadData() {

    var refTypeGardeCall = this.httpService.getTypesGarde();
    var paramsCall = this.refService.loadParametrageEnfantsEtEmployes();

    forkJoin(paramsCall, refTypeGardeCall).subscribe(data => {

      this.employes = data[0].employes;
      this.typesGarde = data[1];

      this.refEnfants = [data[0].enfants, this.employes, this.typesGarde];

      this.enfantsLoaded = (this.refEnfants && this.typesGarde && this.employes) ? true : false;
      this.employesLoaded = (this.employes ) ? true : false;
    });

  }
}
