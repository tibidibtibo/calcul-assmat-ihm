import { Component, Input, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { ConstService } from './../../../../services/const.service';
import { DateService } from './../../../../services/date.service';
import { HttpService } from './../../../../services/http.service';
import { ReferentielService } from '../../../../services/referentiel.service';

@Component({
  selector: "parametrage-employe",
  templateUrl: "./parametrage-employe.component.html"
  // styleUrls: ["./parametrage-employe.component.css"]
})
export class ParametrageEmployeComponent {

  @Input() public employes;
  @Input() public modelEmploye;
  public modalRef: BsModalRef;
  public toDelete;

  constructor(
    public httpService: HttpService,
    private modalService: BsModalService,
    private refService: ReferentielService,
    private dateService: DateService,
    private constantes: ConstService
  ) {

  }

  private deleteEmployeService(employeId, httpService) {
    return httpService.deleteParamEmploye(employeId);
  }

  // PUBLIC

  public reinitEmployes() {
    // TODO : send event
    // this.initModelEmployes(this.employes);
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
