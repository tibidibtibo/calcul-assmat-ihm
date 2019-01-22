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

  public enfants;
  public employes: Array<Employe>;
  public modelEnfant = {};
  public modelEmploye = {};
  public typesGarde;
  public TYPE_PERISCOLAIRE;
  public TYPE_TEMPS_PLEIN;

  constructor(
    public httpService: HttpService,
    private refService: ReferentielService,
    private constantes: ConstService
  ) {
    this.loadData();
  }

  private loadData() {

    var refTypeGardeCall = this.httpService.getTypesGarde();
    var paramsCall = this.refService.loadParametrageEnfantsEtEmployes();

    forkJoin(paramsCall, refTypeGardeCall).subscribe(data => {
      this.initModelEmployes(data[0].employes);
      this.initModelEnfants(data[0].enfants);

      this.employes = data[0].employes;
      this.enfants = data[0].enfants;

      this.typesGarde = data[1];
      this.TYPE_PERISCOLAIRE = this.constantes.findByCode(this.typesGarde, "PERISCOLAIRE");
      this.TYPE_TEMPS_PLEIN = this.constantes.findByCode(this.typesGarde, "TEMPS_PLEIN");
    });

  }

  private initModelEmployes(employes: Array<Employe>) {
    employes.forEach((employe: Employe) => {
      this.modelEmploye[employe.id] = Employe.fork(employe);
    });
  }

  private initModelEnfants(enfants) {
    enfants.forEach(enfant => {
      this.modelEnfant[enfant.id] = Enfant.fork(enfant);
      this.modelEnfant[enfant.id].mapEmployes = this.initEmployeInfoModel(enfant);
      this.modelEnfant[enfant.id].mapHorairesEcole = this.initHorairesEcoleModel(enfant);
    });
  }

  private initEmployeInfoModel(enfant) {
    var mapEmployes = {};
    if (enfant.employes && enfant.employes.length > 0) {
      enfant.employes.forEach(employe => {
        mapEmployes[employe.paramEmploye.id] = {
          arEcoleKm: employe.arEcoleKm,
          heuresNormales: employe.heuresNormales,
          mapHeuresNormales: this.initHeuresNormales(employe.heuresNormales),
          heuresNormalesMensualisees: employe.heuresNormalesMensualisees,
          salaireNetMensualise: employe.salaireNetMensualise
        }
      });
    }
    return mapEmployes;
  }

  public initHeuresNormales(heuresNormales) {
    var mapHeuresNormales = {};
    if (heuresNormales && heuresNormales.length > 0) {
      heuresNormales.forEach(heureNormale => {
        mapHeuresNormales[heureNormale.jour] = {
          heures: heureNormale.heures
        }
      });
    }
    return mapHeuresNormales;
  }

  public initHorairesEcoleModel(enfant) {
    var mapHoraires = {};
    if (enfant.horairesEcole && enfant.horairesEcole.length > 0) {
      enfant.horairesEcole.forEach(horaire => {
        mapHoraires[horaire.jour] = {
          am: horaire.horairesJournaliersEcole.am,
          dm: horaire.horairesJournaliersEcole.dm,
          aa: horaire.horairesJournaliersEcole.aa,
          da: horaire.horairesJournaliersEcole.da
        }
      });
    }
    return mapHoraires;
  }

  public reinitEnfants() {
    this.initModelEnfants(this.enfants);
  }

  public reinitEmployes() {
    this.initModelEmployes(this.employes);
  }
}
