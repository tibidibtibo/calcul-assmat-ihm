import { ConstService } from './../../../services/const.service';
import { DateService } from './../../../services/date.service';
import { Component, TemplateRef } from "@angular/core";

import { forkJoin } from "rxjs/observable/forkJoin";

import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";

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
  public modelEmploye = {};
  public modelEnfant = {};
  public modalRef: BsModalRef;
  public toDelete;
  public typesGarde;
  public mapJours = this.constantes.MAP_JOURS;

  constructor(
    public httpService: HttpService,
    private modalService: BsModalService,
    private refService: ReferentielService,
    private dateService: DateService,
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

      console.log(data[1])
      this.typesGarde = data[1];
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

  private openDeleteModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private deleteEnfantService(enfantId, httpService) {
    return httpService.deleteParamEnfant(enfantId);
  }

  private deleteEmployeService(employeId, httpService) {
    return httpService.deleteParamEmploye(employeId);
  }

  // INTERFACE
  // ---------

  public reinitEmployes() {
    this.initModelEmployes(this.employes);
  }

  public reinitEnfants() {
    this.initModelEnfants(this.enfants);
  }

  public saveEmploye(employeId, savedTemplate: TemplateRef<any>) {
    this.httpService.updateParamEmploye(employeId, this.modelEmploye[employeId]).subscribe(ok => {
      this.modalRef = this.modalService.show(savedTemplate);
      this.loadData();
    }, ko => {
      console.log(ko);
    })
  }

  public saveEnfant(enfantId) {
    console.log(this.modelEnfant[enfantId]);
    this.httpService.updateParamEnfant(enfantId, this.modelEnfant[enfantId]).subscribe(ok => {
      console.log(ok);
    }, ko => {
      console.log(ko);
    })
  }

  public okModalSave() {
    this.modalRef.hide();
  }

  public deleteEmploye(employeId, template: TemplateRef<any>) {
    this.toDelete = {
      id: employeId,
      name:
        this.modelEmploye[employeId].prenom +
        " " +
        this.modelEmploye[employeId].nom,
      deleteFunction: this.deleteEmployeService,
      deleteEnCours: false
    };
    this.openDeleteModal(template);
  }

  public deleteEnfant(enfantId, template: TemplateRef<any>) {
    this.toDelete = {
      id: enfantId,
      name: this.modelEnfant[enfantId].nom,
      deleteFunction: this.deleteEnfantService,
      deleteEnCours: false
    };
    this.openDeleteModal(template);
  }

  public confirmDeletion(deleteFunction, paramId) {
    this.toDelete.deleteEnCours = true;
    deleteFunction(paramId, this.httpService).subscribe(
      ok => {
        this.loadData();
        this.toDelete.deleteEnCours = false;
        this.modalRef.hide();
      }, ko => {
        this.toDelete.deleteEnCours = false;
      }
    );
  }

  public declineDeletion() {
    this.modalRef.hide();
  }

  public onChangeTypeGarde(enfantId) {
    //TODO
    console.log(this.modelEnfant[enfantId]);
  }
}
