import { Component, TemplateRef, Input } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { ConstService } from './../../../../services/const.service';
import { DateService } from './../../../../services/date.service';
import { HttpService } from './../../../../services/http.service';
import { ReferentielService } from '../../../../services/referentiel.service';

@Component({
  selector: "parametrage-enfant",
  templateUrl: "./parametrage-enfant.component.html"
  // styleUrls: ["./parametrage-enfant.component.css"]
})
export class ParametrageEnfantComponent {

  @Input() public enfants;
  @Input() public employes;
  @Input() public modelEnfant;
  public modalRef: BsModalRef;
  public toDelete;
  public mapJours = this.constantes.MAP_JOURS;
  public TYPE_PERISCOLAIRE;
  public TYPE_TEMPS_PLEIN;

  constructor(
    public httpService: HttpService,
    private modalService: BsModalService,
    private refService: ReferentielService,
    private dateService: DateService,
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
    //TODO
    console.log(this.modelEnfant[enfantId]);

    if (this.modelEnfant[enfantId].typeGarde === this.TYPE_PERISCOLAIRE.code) {

      // this.modelEnfant[enfantId].horairesEcole = this.initVoidHorairesEcole();
      // this.modelEnfant[enfantId].mapHorairesEcole = this.initHorairesEcoleModel(enfant);

    }

    // if(this.modelEnfant[enfantId].typeGarde)
  }

  public initVoidHorairesEcole() {
    var horaires = [];
    Object.keys(this.constantes.MAP_JOURS).forEach(jour => {
      // horaires.push()
      // console.log(jour)
    });
    return horaires;
  }
}
