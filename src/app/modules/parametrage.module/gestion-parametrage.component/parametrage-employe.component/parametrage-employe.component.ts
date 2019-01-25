import { BehaviorSubject } from 'rxjs';
import { Employe } from './../../../../models/employe';
import { Component, Input, TemplateRef, OnInit } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap';

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
  public employes;
  public modelEmploye = {};
  public modalRef: BsModalRef;
  public toDelete;
  public modelLoaded: boolean = false;

  // Init
  ngOnInit() {
    this._asyncEmployesInputs.subscribe(data => {
      this.employes = data;
      this.initModelEmployes(this.employes);
    });

  }

  // Constructor
  constructor(
    public httpService: HttpService,
    private modalService: BsModalService,
  ) { }

  // Privates Methods
  private initModelEmployes(employes: Array<Employe>) {
    employes.forEach((employe: Employe) => {
      this.modelEmploye[employe.id] = Employe.fork(employe);
    });
    this.modelLoaded = true;
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
