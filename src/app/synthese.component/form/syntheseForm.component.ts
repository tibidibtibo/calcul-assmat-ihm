import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

import { HttpService } from "../../services/http.service";

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
  selector: "synthese-form",
  templateUrl: "./syntheseForm.component.html"
  // styleUrls: ["./syntheseForm.component.css"]
})
export class SyntheseFormComponent {

  @Output() resultatEvent = new EventEmitter<Object>();
  @Output() errorEvent = new EventEmitter<Object>();

  @ViewChild('fileInput') fileInput: ElementRef;
  public form: FormGroup;
  public monthsList: Array<Object> = MONTHS;
  public employes: Array<Object> = [];

  public loading: boolean = false;
  public monthSelected: string = "";

  constructor(private httpService: HttpService, private fb: FormBuilder) {
    this.createForm();

    // this.httpService.getAllEmployes()
      // .subscribe(data => {
      //     console.log(data);
      //   }, error => {
      //     console.log(error);
      //   }
      // );

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
          this.resultatEvent.emit(data);
          this.errorEvent.emit(null);
          this.loading = false;
        },
        error => {
          this.resultatEvent.emit(null);
          this.errorEvent.emit(error);
          this.loading = false;
        }
      );

  }

  clearFile() {
    this.form.get('fichier').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

  reset() {
    this.monthSelected = null;
    this.resultatEvent.emit(null);
    this.errorEvent.emit(null);
    this.loading = false;
    this.clearFile();
  }
}
