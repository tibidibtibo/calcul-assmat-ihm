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
    private fb: FormBuilder, private constantes: ConstService, private modalService: BsModalService) {
    this.initListeSaisie(this.monthSelected, this.yearSelected);
    this.createForm();
  }

  public form: FormGroup;
  public modalRef: BsModalRef;

  public toDelete;
  public certif;
  public certifOk = false;
  public loading: boolean = false;
  public monthsList = this.constantes.MONTHS_LIST;
  public monthSelected = this.constantes.getPreviousMonth()[0];
  public yearSelected = this.constantes.getPreviousMonth()[1];
  public donneesSaisies = null;
  public referentielEmployeEtEnfant = null;

  private initListeSaisie(monthSelected, yearSelected) {
    this.loading = true;
    var referentielsCall = this.refService.loadParametrageEnfantsEtEmployes();
    var findSaisieCall = this.httpService.findSaisieMonth(monthSelected, yearSelected);

    forkJoin(findSaisieCall, referentielsCall).subscribe(data => {
      this.referentielEmployeEtEnfant = this.refService.employesEtEnfantsToObjects(data[1]);

      this.donneesSaisies = data[0];
      this.donneesSaisies.sort(this.sortSaisies); // sort

      this.loading = false;
    }, ko => {
      this.loading = false;
    });
  }

  /**
   * Tri par date
   * @param a
   * @param b
   */
  private sortSaisies(a, b): number {
    return (new Date(a.dateSaisie)).getTime() - (new Date(b.dateSaisie)).getTime();
  }

  private createForm() {
    this.form = this.fb.group({
      mois: [null, [Validators.required, Validators.minLength(2)]],
      annee: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  public onChange() {
    if (this.monthSelected && this.yearSelected) {
      this.initListeSaisie(this.monthSelected, this.yearSelected);
    }
  }

  public deleteSaisie(saisie, template: TemplateRef<any>) {
    this.toDelete = {
      id: saisie.id,
      nom: saisie.refEnfant.nom + " / " + saisie.refEmploye.nom,
      date: saisie.dateSaisie,
      deleteFunction: this.deleteSaisieCall,
      deleteEnCours: false
    };
    this.openModal(template);
  }

  public deleteSaisieCall(saisieId, httpService) {
    return httpService.supprimerSaisie(saisieId);
  }

  public editSaisie(saisie) {
    // TODO
  }

  public certifSaisie(template: TemplateRef<any>) {
    var nbSaisies = this.donneesSaisies.filter(data => {
      return data.checked;
    }).length;

    this.certif = {
      certifEnCours: false,
      certifFunction: this.certifier,
      mois: this.monthSelected,
      annee: this.yearSelected,
      nbSaisies: nbSaisies
    };
    this.openModal(template);
  }

  private openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template)
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

  public decline() {
    this.modalRef.hide();
  }

  public confirmCertif(certifFunction) {

    this.certif.certifEnCours = true;

    certifFunction(this.httpService, this.donneesSaisies, this.monthSelected, this.yearSelected)
      .subscribe(ok => {
        this.certif.error = null;
        this.initListeSaisie(this.monthSelected, this.yearSelected);
        this.certif.certifEnCours = false;
        this.modalRef.hide();
        this.certifOk = true;
      }, ko => {
        this.certif.error = ko;
        this.certif.certifEnCours = false;
      });
  }

  public closeCertifOk() {
    this.certifOk = false;
    this.initListeSaisie(this.monthSelected, this.yearSelected);
  }

  public checkAll(state: boolean) {
    if (this.donneesSaisies) {
      this.donneesSaisies.forEach(element => {
        element.checked = state;
      });
    }
  }

  public countChecked() {
    if (this.donneesSaisies) {
      var checked = this.donneesSaisies.filter(element => {
        return element.checked;
      });
      return checked.length;
    }
    return 0;
  }

  public certifier(httpService, donneesSaisies, month, year) {
    if (donneesSaisies) {
      var certification = [];
      donneesSaisies.forEach(element => {
        if (element.checked === true) {
          certification.push(element);
        }
      });
      return httpService.certifierMois(certification, month, year);
    }
  }

  public checkSaisie(identifiant) {
    if (this.donneesSaisies) {
      this.donneesSaisies.forEach(element => {
        if (element.id === identifiant) {
          element.checked = !element.checked;
        }
      });
    }
  }

}
