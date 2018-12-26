import { ConstService } from './../../../services/const.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from './../../../services/http.service';
import { FormGroup } from '@angular/forms';
import { Component } from "@angular/core";

@Component({
  selector: "visualisation-synthese",
  templateUrl: "./visualisation-synthese.component.html",
  styleUrls: ["./visualisation-synthese.component.css"]
})
export class VisualisationSyntheseComponent {

  constructor(private httpService: HttpService, private fb: FormBuilder, private constantes: ConstService) {
    this.createForm();
  }

  public form: FormGroup;
  public monthsList: Array<Object> = this.constantes.MONTHS_LIST;

  public loading: boolean = false;
  public monthSelected = ((new Date()).getMonth()).toString().padStart(2, "0");
  public yearSelected = (new Date()).getFullYear();

  public resultat: Object;

  createForm() {
    this.form = this.fb.group({
      mois: [null, [Validators.required, Validators.minLength(2)]],
      annee: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  onChangeMois() {
    // this.httpService
    //   .calcul(this.monthSelected, this.yearSelected)
    //   .subscribe(
    //     (data: Object) => {
    //       this.loading = false;
    //     },
    //     error => {
    //       this.loading = false;
    //     }
    //   );
  }

  reset() {
    this.monthSelected = null;
    this.loading = false;
  }
}
