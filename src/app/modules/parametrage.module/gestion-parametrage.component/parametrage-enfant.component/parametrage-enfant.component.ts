import { Component, TemplateRef, Input, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { ConstService } from './../../../../services/const.service';
import { HttpService } from './../../../../services/http.service';
import { ModelParamEnfant } from '../../../../models/parametrage/ModelParamEnfant';
import { ModelEnfant } from '../../../../models/characters/ModelEnfant';

@Component({
  selector: "parametrage-enfant",
  templateUrl: "./parametrage-enfant.component.html",
  styleUrls: ["../gestion-parametrage.component.css"]
})
export class ParametrageEnfantComponent implements OnInit {

  // Inputs
  private _asyncEnfantsInputs = new BehaviorSubject<any>([]);
  @Input() set refEnfants(value) {
    this._asyncEnfantsInputs.next(value);
  }
  get refEnfants() {
    return this._asyncEnfantsInputs.getValue();
  }

  // Class attributs
  public enfants: Array<ModelEnfant>;
  public employes;
  public typesGarde;
  public modelEnfant: Object;
  public modalRef: BsModalRef;
  public toDelete;
  public mapJours = this.constantes.MAP_JOURS;
  public employeSelected = {};
  public modelLoaded: boolean = false;
  public TYPE_PERISCOLAIRE;
  public TYPE_TEMPS_PLEIN;

  // Constructor
  constructor(
    public httpService: HttpService,
    private modalService: BsModalService,
    private constantes: ConstService
  ) { }

  // Init
  ngOnInit() {
    this._asyncEnfantsInputs.subscribe(data => {
      this.enfants = data[0];
      this.employes = data[1];
      this.typesGarde = data[2];

      this.modelEnfant = ModelParamEnfant.buildMapParamEnfants(this.enfants);
      this.modelLoaded = true;

      this.TYPE_PERISCOLAIRE = this.constantes.findByCode(this.typesGarde, "PERISCOLAIRE");
      this.TYPE_TEMPS_PLEIN = this.constantes.findByCode(this.typesGarde, "TEMPS_PLEIN");
    });

  }

  // Private methods

  private openDeleteModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private deleteEnfantService(enfantId, httpService) {
    return httpService.deleteParamEnfant(enfantId);
  }

  // Public methods
  public reinitEnfants() {
    this.modelLoaded = false;
    this.modelEnfant = ModelParamEnfant.buildMapParamEnfants(this.enfants);
    this.modelLoaded = true;
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
        // this.loadData(); // FIXME : reload
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
    if (this.modelEnfant[enfantId].typeGarde === this.TYPE_PERISCOLAIRE.code) {
      this.modelEnfant[enfantId].resetHorairesEcole(this.constantes.MAP_JOURS);
    } else if (this.modelEnfant[enfantId].typeGarde === this.TYPE_TEMPS_PLEIN.code) {
      this.modelEnfant[enfantId].removeHorairesEcole();
    }
  }

  public addSelectedEmploye(enfantId, employeSelected) {
    // TODO
    console.log(enfantId + " / " + employeSelected);
  }

  public removeEmployeFromParam(enfantId, employeToRemove) {

    // FIXME : gestion erreurs DOM

    // Remove from object
    delete this.modelEnfant[enfantId].mapEmployes[employeToRemove.paramEmploye.id]

    // Remove from list
    this.modelEnfant[enfantId].employes = this.modelEnfant[enfantId].employes.filter(employe => {
      return employe.paramEmploye.id === employeToRemove.paramEmploye.id;
    });

  }
}
