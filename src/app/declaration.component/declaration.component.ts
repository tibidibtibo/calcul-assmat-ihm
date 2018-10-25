import { HttpService } from './../http.service';
import { AppService } from "./../app.service";
import { Component, ViewChild, ElementRef } from "@angular/core";

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

const MONTHS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12"
];

let mock = {
	"mois": "9",
	"annee": "2018",
	"nbJoursTravailles": 16,
	"nombreHeures": {
		"heuresReelles": 164.67,
		"heuresNormalesReelles": 154.91,
		"heuresNormalesMensualisees": 113.75,
		"heuresComplementaires": 11.25
	},
	"salaire": {
		"tauxHoraireNetHeureNormale": 2.9,
		"tauxHoraireNetHeureComplementaire": 2.9,
		"salaireNetMensualise": 329.86,
		"salaireNetHeuresComplementaires": 32.63,
		"congesPayes": 36.25,
		"salaireNetTotal": 398.74
	},
	"indemnites": {
		"indemnitesEntretien": 74.2,
		"indemnitesRepas": 3,
		"indemnitesKm": 39.31
	},
	"montantPaiementMensuel": 515.25
};

@Component({
  selector: "declaration",
  templateUrl: "./declaration.component.html",
  styleUrls: ["./declaration.component.css"]
})
export class DeclarationComponent {

  @ViewChild('fileInput') fileInput: ElementRef;

  public uploadResponse;
  public monthsList: Array<Object> = MONTHS;
  public errorMsg;
  public form: FormGroup;
  public loading: boolean = false;
  public monthSelected: string = "";

  constructor(private app: AppService, private httpService: HttpService, private fb: FormBuilder) {
    this.createForm();
  }

  authenticated() {
    return this.app.authenticated;
  }

  createForm() {
    this.form = this.fb.group({
      mois: ['', Validators.required],
      fichier: null
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('fichier').setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('fichier', this.form.get('fichier').value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();

    this.loading = true;

    this.httpService.calcul(this.monthSelected, formModel)
      .subscribe(
        data => {
          console.log(data);
          this.uploadResponse = data;
          this.loading = false;
        },
        error => {
          console.log(error);
          this.uploadResponse = null;
          this.loading = false;
          this.errorMsg = error;
        }
      );

  }

  clearFile() {
    this.form.get('fichier').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

  reset() {
    this.monthSelected = null;
    this.uploadResponse = null;
    this.loading = false;
    this.clearFile();
  }

}
