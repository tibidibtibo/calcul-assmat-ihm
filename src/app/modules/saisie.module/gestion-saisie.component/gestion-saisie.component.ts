import { ConstService } from './../../../services/const.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReferentielService } from './../../../services/referentiel.service';
import { Component } from "@angular/core";
import { HttpService } from "../../../services/http.service";
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: "gestion-saisie",
  templateUrl: "./gestion-saisie.component.html",
  styleUrls: ["./gestion-saisie.component.css"]
})
export class GestionSaisieComponent {

  constructor(private httpService: HttpService, private refService: ReferentielService,
    private fb: FormBuilder,private constantes: ConstService) {
    this.initListeSaisie(this.monthSelected, this.yearSelected);
    this.createForm();
  }

  public form: FormGroup;

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

  createForm() {
    this.form = this.fb.group({
      mois: [null, [Validators.required, Validators.minLength(2)]],
      annee: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    this.initListeSaisie(this.monthSelected, this.yearSelected);
  }
}
