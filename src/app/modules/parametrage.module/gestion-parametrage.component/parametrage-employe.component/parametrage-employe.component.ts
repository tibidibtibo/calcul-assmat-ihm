import { ModelEmploye } from './../../../../models/characters/ModelEmploye';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { BsModalService } from 'ngx-bootstrap';

import { HttpService } from './../../../../services/http.service';

@Component({
  selector: "parametrage-employe",
  templateUrl: "./parametrage-employe.component.html",
  styleUrls: ["../gestion-parametrage.component.css"]
})
export class ParametrageEmployeComponent implements OnInit {

  // Inputs
  private _asyncEmployesInputs = new BehaviorSubject<any>([]);
  @Input() set refEmployes(value) {
    this._asyncEmployesInputs.next(value);
  }
  get refEmployes() {
    return this._asyncEmployesInputs.getValue();
  }

  // Class variables
  public employeForm: FormGroup;
  public employes;
  public modelEmploye = {};
  public modelLoaded: boolean = false;

  // Init
  ngOnInit() {
    this._asyncEmployesInputs.subscribe(data => {
      this.employes = data;
      this.employeForm = this.createFormGroup(this.employes);
      this.modelLoaded = true;
    });
  }

  // Constructor
  constructor(public httpService: HttpService, private modalService: BsModalService, private formBuilder: FormBuilder) { }

  // Privates Methods
  private createFormGroup(employes: Array<ModelEmploye>): FormGroup {
    return this.formBuilder.group({
      employes: this.formBuilder.array(this.buildEmployeFormArray(employes))
    });
  }

  private buildEmployeFormArray(employes: Array<ModelEmploye>): Array<FormGroup> {
    var groups: Array<FormGroup> = [];
    employes.forEach((employe: ModelEmploye) => {
      var employeFormGroup: FormGroup = this.employeToFormGroup(employe);
      groups.push(employeFormGroup);
    });
    return groups;
  }

  private employeToFormGroup(employe: ModelEmploye): FormGroup {
    return new FormGroup({
      id: new FormControl(employe.id),
      nom: new FormControl(employe.nom),
      prenom: new FormControl(employe.prenom),
      fraisDejeuner: new FormControl(employe.fraisDejeuner),
      fraisGouter: new FormControl(employe.fraisGouter),
      indemnitesKm: new FormControl(employe.indemnitesKm),
      tauxCongesPayes: new FormControl(employe.tauxCongesPayes),
      tauxHoraireComplementaireBrut: new FormControl(employe.tauxHoraireComplementaireBrut),
      tauxHoraireComplementaireNet: new FormControl(employe.tauxHoraireComplementaireNet),
      tauxHoraireNormalBrut: new FormControl(employe.tauxHoraireNormalBrut),
      tauxHoraireNormalNet: new FormControl(employe.tauxHoraireNormalNet),
      indemnitesEntretien: new FormGroup({
        borne: new FormControl(employe.indemnitesEntretien.borne),
        indemniteInf: new FormControl(employe.indemnitesEntretien.indemniteInf),
        indemniteSup: new FormControl(employe.indemnitesEntretien.indemniteSup)
      }),
      deleteRequest: new FormControl(false)
    });
  }

  // Public methods

  public reinitEmployes() {
    this.employeForm = this.createFormGroup(this.employes);
  }

  public saveEmploye(employe: FormGroup) {

    this.httpService.updateParamEmploye(employe.value.id, employe.value).subscribe((response: ModelEmploye) => {
      this.updateData(response);
    }, ko => {
      console.log(ko);
    })
  }

  private updateData(employe: ModelEmploye) {
    var employeToUpdate = this.employes.find( emp => {
      return emp.id === employe.id;
    });
    let index = this.employes.indexOf(employeToUpdate);
    this.employes[index] = employe;
    this.employeForm = this.createFormGroup(this.employes);
  }

  public deleteEmploye(employe: FormGroup) {
    this.httpService.deleteParamEmploye(employe.controls.id.value).subscribe(
      ok => {
        var employeToRemove = this.employes.find( emp => {
          return emp.id === employe.controls.id.value;
        });
        this.employes.splice(this.employes.indexOf(employeToRemove), 1);
        this.employeForm = this.createFormGroup(this.employes);
      }, ko => {
      }
    );
    employe.controls.deleteRequest.setValue(false);
  }

  public askForDeleteEmploye(employe: FormGroup) {
    employe.controls.deleteRequest.setValue(true);
  }

  public cancelDeleteEmploye(employe: FormGroup) {
    employe.controls.deleteRequest.setValue(false);
  }

}
