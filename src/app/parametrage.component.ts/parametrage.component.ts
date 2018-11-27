import { Employe } from './../models/employe';
import { Component, TemplateRef } from "@angular/core";

import { HttpService } from './../services/http.service';

import { forkJoin } from 'rxjs/observable/forkJoin';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: "parametrage",
  templateUrl: "./parametrage.component.html",
  styleUrls: ["./parametrage.component.css"]
})
export class ParametrageComponent {

  public enfants;
  public employes: Array<Employe>;
  public modelEmploye = {};
  public modalRef: BsModalRef;
  public toDelete;

  constructor(private httpService: HttpService, private modalService: BsModalService) {
    this.loadData();
  }

  private loadData() {
    var employesCall = this.httpService.getAllEmployes();
    var enfantsCall = this.httpService.getAllEnfants();

    forkJoin(employesCall, enfantsCall).subscribe((results: any) => {

      this.employes = results[0];
      this.initModelEmployes(this.employes);

      this.initModelEnfants(results[1], this.employes);
    });
  }

  private initModelEmployes(employes: Array<Employe>) {
    this.employes.forEach((employe: Employe) => {
      this.modelEmploye[employe.id] = this.forkEmployeModel(employe);
    });
  }

  private forkEmployeModel(employe: Employe) {
    return Employe.fork(employe);
  }

  private initModelEnfants(enfants, enployes) {
    var listeEnfants = [];
    if (enfants) {
      enfants.forEach(enfant => {
        // var enf
        enfant.employesIds.forEach(empId => {
          // TODO:  match enfant / id
        });
      });
      this.enfants = enfants;
    }
  }

  private openDeleteModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // INTERFACE
  // ---------

  public reinitEmployes() {
    this.initModelEmployes(this.employes);
  }

  public saveEmploye(employeId) {
    console.log(this.modelEmploye[employeId]);
  }

  public deleteEmploye(employeId, template: TemplateRef<any>) {
    console.log(this.modelEmploye[employeId]);
    this.toDelete = {
      id: employeId,
      name: this.modelEmploye[employeId].prenom + " " + this.modelEmploye[employeId].nom
    }
    this.openDeleteModal(template);
  }

  public confirmDeletion() {
    // TODO appel service suppression
    this.modalRef.hide();
  }

  public declineDeletion() {
    this.modalRef.hide();
  }
}
