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
import { HeureNormale } from '../../../../models/parametrage/HeureNormale';

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
  public toDelete;
  public employeSelected = {};
  public modelLoaded: boolean = false;
  public mapJours = this.constantes.MAP_JOURS;
  public TYPE_PERISCOLAIRE;
  public TYPE_TEMPS_PLEIN;

  // Constructor
  constructor(private formBuilder: FormBuilder,
    public httpService: HttpService,
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
    var formGroup = this.formBuilder.group({
      id: new FormControl(enfant.id),
      nom: new FormControl(enfant.nom),
      typeGarde: new FormControl(enfant.typeGarde)
    });

    if(enfant.employes && enfant.employes.length > 0) {
      formGroup.addControl('employes', this.formBuilder.array(this.buildFormEmployes(enfant.employes)));
    }

    if (enfant.horairesEcole && enfant.horairesEcole.length > 0) {
      formGroup.addControl('horairesEcole', this.formBuilder.array(this.buildFormHorairesEcole(enfant.horairesEcole)));
    }
    return formGroup;
  }

  private buildFormHorairesEcole(horaires: Array<ModelHorairesEcole>): Array<FormGroup> {
    var groups: Array<FormGroup> = [];
    horaires.forEach((horaire: ModelHorairesEcole) => {
      var groupHoraire: FormGroup = new FormGroup({
        jour: new FormControl(horaire.jour),
        am: new FormControl(horaire.horairesJournaliersEcole.am),
        dm: new FormControl(horaire.horairesJournaliersEcole.dm),
        aa: new FormControl(horaire.horairesJournaliersEcole.aa),
        da: new FormControl(horaire.horairesJournaliersEcole.da)
      });
      groups.push(groupHoraire);
    })
    return groups;
  }
  private buildFormEmployes(employes: Array<ModelEmployeInfo>): Array<FormGroup> {
    var groups: Array<FormGroup> = [];
    employes.forEach((employe: ModelEmployeInfo) => {
      var group: FormGroup = this.buildEmployeGroup(employe);
      groups.push(group);
    })
    return groups;
  }

  private buildEmployeGroup(employe: ModelEmployeInfo): FormGroup {
    return new FormGroup({
      arEcoleKm: new FormControl(employe.arEcoleKm),
      heuresNormalesMensualisees: new FormControl(employe.heuresNormalesMensualisees),
      salaireNetMensualise: new FormControl(employe.salaireNetMensualise),
      heuresNormales: this.formBuilder.array(this.buildHeuresNormalesForm(employe.heuresNormales))
    });
  }

  private buildHeuresNormalesForm(heuresNormales: Array<HeureNormale>): Array<FormGroup> {
    var heuresForm: Array<FormGroup> = [];
    heuresNormales.forEach(heure => {
      var heureGroup: FormGroup = this.buildHeureForm(heure);
      heuresForm.push(heureGroup);
    });
    return heuresForm;
  }

  private buildHeureForm(heure: HeureNormale): FormGroup {
    return this.formBuilder.group({
      jour: new FormControl(heure.jour),
      heures: new FormControl(heure.heures)
    });
  }

  // Public methods
  public reinitEnfants() {
    this.modelLoaded = false;
    this.modelEnfant = ModelParamEnfant.buildMapParamEnfants(this.enfants);
    this.modelLoaded = true;
  }

  public saveEnfant(enfant) {
    // TODO TDU
    console.log(enfant);
    // this.httpService.updateParamEnfant(enfantId, this.modelEnfant[enfantId]).subscribe(ok => {
    //   console.log(ok);
    // }, ko => {
    //   console.log(ko);
    // })
  }

  public deleteEnfant(enfant: FormGroup) {
    // TODO
    // this.httpService.deleteParamEnfant(enfant.controls.id.value).subscribe(
    //   ok => {
    //   }, ko => {
    //   }
    // );
  }

  public onChangeTypeGarde(enfant: FormGroup) {
    // TODO
    // if (this.modelEnfant[enfantId].typeGarde === this.TYPE_PERISCOLAIRE.code) {
    //   this.modelEnfant[enfantId].resetHorairesEcole(this.constantes.MAP_JOURS);
    // } else if (this.modelEnfant[enfantId].typeGarde === this.TYPE_TEMPS_PLEIN.code) {
    //   this.modelEnfant[enfantId].removeHorairesEcole();
    // }
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
