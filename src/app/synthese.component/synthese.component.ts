import { Component, ViewChild, ElementRef } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

import { HttpService } from '../services/http.service';
import { AuthService } from "../services/auth.service";

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

@Component({
  selector: "synthese",
  templateUrl: "./synthese.component.html",
  styleUrls: ["./synthese.component.css"]
})
export class SyntheseComponent {

  @ViewChild('fileInput') fileInput: ElementRef;

  public uploadResponse;
  public monthsList: Array<Object> = MONTHS;
  public employes: Array<Object> = [];
  public errorMsg;
  public form: FormGroup;
  public loading: boolean = false;
  public monthSelected: string = "";

  constructor(private authService: AuthService, private httpService: HttpService, private fb: FormBuilder) {
    this.createForm();

    this.httpService.getAllEmployes()
      .subscribe(
        data => {
          console.log(data);
        }
      );
  }

  authenticated() {
    return this.authService.authenticated;
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
