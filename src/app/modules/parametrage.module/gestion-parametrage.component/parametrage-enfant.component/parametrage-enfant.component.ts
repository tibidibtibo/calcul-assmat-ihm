import { Component, TemplateRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { ConstService } from './../../../../services/const.service';
import { HttpService } from './../../../../services/http.service';
import { ModelParamEnfant } from '../../../../models/parametrage/ModelParamEnfant';
import { ModelEnfant } from '../../../../models/characters/ModelEnfant';
import { ModelHorairesEcole } from '../../../../models/parametrage/ModelHorairesEcole';
import { ModelEmployeInfo } from '../../../../models/parametrage/ModelEmployeInfo';

@Component({
  selector: "parametrage-enfant",
  templateUrl: "./parametrage-enfant.component.html",
  styleUrls: ["../gestion-parametrage.component.css"]
})
export class ParametrageEnfantComponent implements OnInit {

  // Inputs
  private asyncEnfantsInputs = new BehaviorSubject<any>([]);
  @Input() set refEnfants(value) {
    this.asyncEnfantsInputs.next(value);
  }
  get refEnfants() {
    return this.asyncEnfantsInputs.getValue();
  }

  // Class attributs
  public enfantsForm: FormGroup;
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
  constructor(private formBuilder: FormBuilder,
    public httpService: HttpService,
    private modalService: BsModalService,
    private constantes: ConstService
  ) { }

  // Init
  ngOnInit() {
    this.asyncEnfantsInputs.subscribe(data => {
      this.enfants = data[0];
      this.employes = data[1];
      this.typesGarde = data[2];

      this.enfantsForm = this.createFormGroup(this.enfants);
      console.log(this.enfantsForm);
      this.modelEnfant = ModelParamEnfant.buildMapParamEnfants(this.enfants);
      console.log(this.modelEnfant);
      this.modelLoaded = true;

      this.TYPE_PERISCOLAIRE = this.constantes.findByCode(this.typesGarde, "PERISCOLAIRE");
      this.TYPE_TEMPS_PLEIN = this.constantes.findByCode(this.typesGarde, "TEMPS_PLEIN");
    });

  }

  // Private methods

  private createFormGroup(enfants: Array<ModelEnfant>): FormGroup {
    return this.formBuilder.group({
      enfants: this.formBuilder.array(this.buildEnfantsFormArray(enfants))
    });
  }

  private buildEnfantsFormArray(enfants: Array<ModelEnfant>): Array<FormGroup> {
    var groups: Array<FormGroup> = [];
    enfants.forEach((enfant: ModelEnfant) => {
      var enfantFormGroup: FormGroup = this.enfantToFormGroup(enfant);
      groups.push(enfantFormGroup);
    });
    return groups;
  }

  private enfantToFormGroup(enfant: ModelEnfant): FormGroup {
    var formGroup = new FormGroup({
      id: new FormControl(enfant.id),
      nom: new FormControl(enfant.nom),
      typeGarde: new FormControl(enfant.typeGarde),
      employes: this.formBuilder.array(this.buildFormEmployes(enfant.employes))
    });
    if(enfant.horairesEcole && enfant.horairesEcole.length > 0) {
      formGroup.addControl('horairesEcole', this.formBuilder.array(this.buildFormHorairesEcole(enfant.horairesEcole)));
    }
    return formGroup;
  }

  private buildFormHorairesEcole(horaires: Array<ModelHorairesEcole>): Array<FormGroup> {
    // TODO
    if(horaires)
    return null;
  }
  private buildFormEmployes(horaires: Array<ModelEmployeInfo>): Array<FormGroup> {
    // TODO
    return null;
  }

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
