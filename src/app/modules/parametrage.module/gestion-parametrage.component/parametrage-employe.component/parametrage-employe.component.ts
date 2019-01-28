import { ModelEmploye } from './../../../../models/characters/ModelEmploye';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, Input, TemplateRef, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { Employe } from './../../../../models/employe';
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
  public modalRef: BsModalRef;
  public toDelete;
  public modelLoaded: boolean = false;

  // Init
  ngOnInit() {
    this._asyncEmployesInputs.subscribe(data => {
      this.employes = data;

      // this.initModelEmployes(this.employes);
      this.employeForm = this.createFormGroup(this.employes);

      this.modelLoaded = true;
      console.log(this.employeForm)
    });

  }

  // Constructor
  constructor(public httpService: HttpService, private modalService: BsModalService, private formBuilder: FormBuilder) { }

  // Privates Methods
  private createFormGroup(employes: Array<ModelEmploye>): FormGroup {
    var mainFormGroup = this.formBuilder.group({
      employes: this.formBuilder.array(this.buildEmployeFormArray(employes))
    });
    return mainFormGroup;
  }

  private buildEmployeFormArray(employes: Array<ModelEmploye>): Array<FormGroup> {
    var groups: Array<FormGroup> = [];
    employes.forEach((employe: ModelEmploye) => {
      var employeFormGroup: FormGroup = this.employeToFormGroup(employe);
      employeFormGroup.valueChanges.subscribe(change => {
        console.log(change)
        // TODO : onsubmit
      });
      groups.push(employeFormGroup);
    });
    return groups;
  }

  private employeToFormGroup(employe: ModelEmploye): FormGroup {
    return new FormGroup({
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
      })
    });
  }

  private initModelEmployes(employes: Array<Employe>) {
    employes.forEach((employe: Employe) => {
      this.modelEmploye[employe.id] = Employe.fork(employe);
    });
    // console.log(this.modelEmploye)
    // this.modelLoaded = true;
  }

  private deleteEmployeService(employeId, httpService) {
    return httpService.deleteParamEmploye(employeId);
  }

  // Public methods

  public reinitEmployes() {
    this.initModelEmployes(this.employes);
  }

  public saveEmploye(employeId, savedTemplate: TemplateRef<any>) {
    this.httpService.updateParamEmploye(employeId, this.modelEmploye[employeId]).subscribe(ok => {
      this.modalRef = this.modalService.show(savedTemplate);
      // this.loadData(); // TODO : event reload
    }, ko => {
      console.log(ko);
    })
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

  public confirmDeletion(deleteFunction, paramId) {
    this.toDelete.deleteEnCours = true;
    deleteFunction(paramId, this.httpService).subscribe(
      ok => {
        // this.loadData(); // TODO : event reload
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

  private openDeleteModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
