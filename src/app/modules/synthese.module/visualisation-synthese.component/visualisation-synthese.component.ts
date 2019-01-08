import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap';
import { ConstService } from './../../../services/const.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from './../../../services/http.service';
import { FormGroup } from '@angular/forms';
import { Component, TemplateRef } from "@angular/core";

@Component({
  selector: "visualisation-synthese",
  templateUrl: "./visualisation-synthese.component.html",
  styleUrls: ["./visualisation-synthese.component.css"]
})
export class VisualisationSyntheseComponent {

  constructor(private httpService: HttpService, private fb: FormBuilder, private constantes: ConstService,
    private modalService: BsModalService) {
    this.createForm();
    this.onChangeMois();
  }

  public form: FormGroup;
  public monthsList: Array<Object> = this.constantes.MONTHS_LIST;
  public modalRef: BsModalRef;
  public loading: boolean = false;
  public monthSelected = this.constantes.getPreviousMonth()[0]
  public yearSelected = this.constantes.getPreviousMonth()[1]
  // public monthSelected = this.constantes.getMonthYearAsString(new Date())[0]
  // public yearSelected = this.constantes.getMonthYearAsString(new Date())[1]
  public toDelete;

  public resultat: Object;

  private createForm() {
    this.form = this.fb.group({
      mois: [null, [Validators.required, Validators.minLength(2)]],
      annee: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  public onChangeMois() {
    this.loading = true;

    this.httpService
      .findCertificationByMonth(this.monthSelected, this.yearSelected)
      .subscribe(
        (data: Object) => {
          this.resultat = data;
          this.loading = false;
        },
        error => {
          this.resultat = null;
          this.loading = false;
        }
      );
  }

  private reset() {
    this.monthSelected = this.constantes.getPreviousMonth()[0];
    this.yearSelected = this.constantes.getPreviousMonth()[1];
    this.loading = false;
    this.onChangeMois();
  }

  public deleteCertification(template: TemplateRef<any>) {
    this.toDelete = {
      year: this.yearSelected,
      month: this.monthSelected,
      deleteFunction: this.deleteCertificationService,
      deleteEnCours: false
    };
    this.openDeleteModal(template);
  }

  private openDeleteModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private deleteCertificationService(month, year, httpService) {
      return httpService.deleteCertification(month, year);
    }

  public confirmDeletion(deleteFunction, month, year) {
      this.toDelete.deleteEnCours = true;
      deleteFunction(month, year, this.httpService).subscribe(
        ok => {
          this.reset();
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
