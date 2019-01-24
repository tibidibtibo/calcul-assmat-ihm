import { Component, TemplateRef, Input } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { ConstService } from './../../../../services/const.service';
import { DateService } from './../../../../services/date.service';
import { HttpService } from './../../../../services/http.service';
import { ReferentielService } from '../../../../services/referentiel.service';

@Component({
  selector: "parametrage-enfant",
  templateUrl: "./parametrage-enfant.component.html",
  styleUrls: ["../gestion-parametrage.component.css"]
})
export class ParametrageEnfantComponent {

  @Input() public enfants;
  @Input() public employes;
  @Input() public modelEnfant;
  @Input() public typesGarde;
  @Input() public typePeriscolaire;
  @Input() public typeTempsPlein;

  public modalRef: BsModalRef;
  public toDelete;
  public mapJours = this.constantes.MAP_JOURS;
  public employeSelected = {};

  constructor(
    public httpService: HttpService,
    private modalService: BsModalService,
    private constantes: ConstService
  ) {

  }

  private openDeleteModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private deleteEnfantService(enfantId, httpService) {
    return httpService.deleteParamEnfant(enfantId);
  }

  public saveEnfant(enfantId) {
    // TODO TDU
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
        // this.loadData();
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
    if (this.modelEnfant[enfantId].typeGarde === this.typePeriscolaire.code) {
      this.modelEnfant[enfantId].horairesEcole = this.initVoidHorairesEcole();
      this.modelEnfant[enfantId].mapHorairesEcole = this.initHorairesEcoleModel();
    } else if (this.modelEnfant[enfantId].typeGarde === this.typeTempsPlein.code) {
      this.modelEnfant[enfantId].horairesEcole = null;
      this.modelEnfant[enfantId].mapHorairesEcole = null;
    }
  }

  public initHorairesEcoleModel() {
    var mapHoraires = {};
    Object.keys(this.constantes.MAP_JOURS).forEach(jour => {
      mapHoraires[jour] = {
          am: "",
          dm: "",
          aa: "",
          da: ""
        };
    });
    return mapHoraires;
  }

  public initVoidHorairesEcole() {
    var horaires = [];
    Object.keys(this.constantes.MAP_JOURS).forEach(jour => {
      horaires.push({
        jour: jour,
        horairesJournaliersEcole: {
          am: "",
          dm: "",
          aa: "",
          da: ""
        }
      });
    });
    return horaires;
  }

  public findEnfant(id, liste) {
    if(liste && liste.length > 0) {
      var found = liste.filter(enfant => {
        return enfant.id === id
      });
      return (found && found.length > 0) ? found[0] : null;
    }
    return null;
  }

  public addSelectedEmploye(enfantId, employeSelected) {
    // TODO
    console.log(enfantId + " / " + employeSelected);
  }

  public removeEmployeFromParam(enfantId, employeToRemove) {
    // TODO
    console.log(employeToRemove);
  }
}
