import { ConstService } from './../../../services/const.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReferentielService } from './../../../services/referentiel.service';
import { Component, TemplateRef } from "@angular/core";
import { HttpService } from "../../../services/http.service";
import { forkJoin } from 'rxjs/observable/forkJoin';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: "gestion-saisie",
  templateUrl: "./gestion-saisie.component.html",
  styleUrls: ["./gestion-saisie.component.css"]
})
export class GestionSaisieComponent {

  constructor(private httpService: HttpService, private refService: ReferentielService,
    private fb: FormBuilder,private constantes: ConstService, private modalService: BsModalService) {
    this.initListeSaisie(this.monthSelected, this.yearSelected);
    this.createForm();
  }

  public form: FormGroup;
  public modalRef: BsModalRef;

  public toDelete;
  public loading: boolean = false;
  public monthsList = this.constantes.MONTHS_LIST;
  public monthSelected = ((new Date()).getMonth() + 1).toString().padStart(2, "0");
  public yearSelected = (new Date()).getFullYear();
  public donneesSaisies = null;
  public referentielEmployeEtEnfant = null;

  private initListeSaisie(monthSelected, yearSelected) {
    this.loading = true;
    var referentielsCall = this.refService.loadEnfantEtEmployes();
    var findSaisieCall = this.httpService.findSaisieMonth(monthSelected, yearSelected);

    forkJoin(findSaisieCall, referentielsCall).subscribe(data => {
      this.referentielEmployeEtEnfant = this.refService.employesEtEnfantsToObjects(data[1]);
      this.donneesSaisies = this.refService.consoliderSaisies(data[0], this.referentielEmployeEtEnfant);
      this.loading = false;
    }, ko => {
      this.loading = false;
    });
  }

  private createForm() {
    this.form = this.fb.group({
      mois: [null, [Validators.required, Validators.minLength(2)]],
      annee: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  public onSubmit() {
    this.initListeSaisie(this.monthSelected, this.yearSelected);
  }

  public deleteSaisie(saisie, template: TemplateRef<any>) {
    this.toDelete = {
      id: saisie.id,
      nom: saisie.refEnfant.nom + " / " + saisie.refEmploye.nom,
      date: saisie.dateSaisie,
      deleteFunction: this.deleteSaisieCall,
      deleteEnCours: false
    };
    this.openDeleteModal(template);
  }

  public deleteSaisieCall(saisieId, httpService) {
    return httpService.supprimerSaisie(saisieId);
  }

  public editSaisie(saisie) {
    // TODO
  }

  private openDeleteModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public confirmDeletion(deleteFunction, paramId) {
    this.toDelete.deleteEnCours = true;
    deleteFunction(paramId, this.httpService).subscribe(
        ok => {
          this.initListeSaisie(this.monthSelected, this.yearSelected);
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
