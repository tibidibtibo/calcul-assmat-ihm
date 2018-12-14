import { Component, TemplateRef } from "@angular/core";

import { forkJoin } from "rxjs/observable/forkJoin";

import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { Employe } from "../../models/employe";
import { HttpService } from "../../services/http.service";
import { Enfant } from "../../models/enfant";

@Component({
  selector: "parametrage",
  templateUrl: "./parametrage.component.html",
  styleUrls: ["./parametrage.component.css"]
})
export class ParametrageComponent {
  public enfants;
  public employes: Array<Employe>;
  public modelEmploye = {};
  public modelEnfant = {};
  public modalRef: BsModalRef;
  public toDelete;

  constructor(
    public httpService: HttpService,
    private modalService: BsModalService
  ) {
    this.loadData();
  }

  private loadData() {

    // FIXME : remplacer cet appel par la méthode referentielsService
    var employesCall = this.httpService.getAllEmployes();
    var enfantsCall = this.httpService.getAllEnfants();

    forkJoin(employesCall, enfantsCall).subscribe((results: any) => {

      this.employes = results[0];
      this.enfants = results[1];

      this.initModelEmployes(this.employes);
      this.initModelEnfants(this.enfants, this.employes);
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
    enfants.forEach(enfant => {
      var listeEmployesEnfant = [];
      enfant.employesIds.forEach(empId => {
        listeEmployesEnfant.push(
          enployes.find(employe => {
            return employe.id === empId;
          })
        );
      });
      this.modelEnfant[enfant.id] = this.forkEnfantModel(
        enfant,
        listeEmployesEnfant
      );
    });
  }

  private forkEnfantModel(enfant, listeEmployesEnfant) {
    var newEnfant = Enfant.fork(enfant);
    newEnfant.employes = listeEmployesEnfant;
    return newEnfant;
  }

  private openDeleteModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private deleteEnfantService(enfantId, httpService) {
    return httpService.deleteParamEnfant(enfantId);
  }

  private deleteEmployeService(employeId, httpService) {
    return httpService.deleteParamEmploye(employeId);
  }

  // INTERFACE
  // ---------

  public reinitEmployes() {
    this.initModelEmployes(this.employes);
  }

  public reinitEnfants() {
    this.initModelEnfants(this.enfants, this.employes);
  }

  public saveEmploye(employeId, savedTemplate: TemplateRef<any>) {
    console.log(this.modelEmploye[employeId]);
    this.httpService.updateParamEmploye(employeId, this.modelEmploye[employeId]).subscribe( ok => {
      this.modalRef = this.modalService.show(savedTemplate);
      this.loadData();
    }, ko => {
      console.log(ko);
    })
  }

  public saveEnfant(enfantId) {
    console.log(this.modelEnfant[enfantId]);
    this.httpService.updateParamEnfant(enfantId, this.modelEnfant[enfantId]).subscribe( ok => {
      console.log(ok);
    }, ko => {
      console.log(ko);
    })
  }

  public okModalSave() {
    this.modalRef.hide();
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
          this.loadData();
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
}
