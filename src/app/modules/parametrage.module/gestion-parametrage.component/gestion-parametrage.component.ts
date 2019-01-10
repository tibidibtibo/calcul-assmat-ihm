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
  public typesGarde = [
    { code: "TEMPS_PLEIN", libelle: "Temps plein" },
    { code: "PERISCOLAIRE", libelle: "Périscolaire" }
  ];

  constructor(
    public httpService: HttpService,
    private modalService: BsModalService,
    private refService: ReferentielService
  ) {
    this.loadData();
  }

  private loadData() {

    this.refService.loadEnfantEtEmployes().subscribe(data => {
      this.initModelEmployes(data.employes);
      this.initModelEnfants(data.enfants, data.employes);

      this.employes = data.employes;
      this.enfants = data.enfants;

    });

  }

  private initModelEmployes(employes: Array<Employe>) {
    employes.forEach((employe: Employe) => {
      this.modelEmploye[employe.id] = this.forkEmployeModel(employe);
    });
  }

  private forkEmployeModel(employe: Employe) {
    return Employe.fork(employe);
  }

  private initModelEnfants(enfants, enployes) {
    enfants.forEach(enfant => {
      var listeEmployesEnfant = [];
      enfant.employesIds.forEach(empId => {
        listeEmployesEnfant.push(
          enployes.find(employe => {
            return employe.id === empId;
          })
        );
      });
      this.modelEnfant[enfant.id] = this.forkEnfantModel(
        enfant,
        listeEmployesEnfant
      );
    });
  }

  private forkEnfantModel(enfant, listeEmployesEnfant) {
    var newEnfant = Enfant.fork(enfant);
    newEnfant.employes = listeEmployesEnfant;
    return newEnfant;
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
    this.initModelEnfants(this.enfants, this.employes);
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
}
