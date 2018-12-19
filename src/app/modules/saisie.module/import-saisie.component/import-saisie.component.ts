import { ConstService } from "./../../../services/const.service";
import { HttpService } from "./../../../services/http.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "import-saisie",
  templateUrl: "./import-saisie.component.html",
  styleUrls: ["./import-saisie.component.css"]
})
export class ImportSaisieComponent {

  // Variables
  @ViewChild("fileInput")
  public fileInput: ElementRef;
  public resultat: Object;
  public form: FormGroup;
  public monthsList: Array<Object> = this.constantes.MONTHS_LIST;
  public loading: boolean = false;
  public monthSelected = new Date()
    .getMonth()
    .toString()
    .padStart(2, "0");
  public yearSelected = new Date().getFullYear();
  public modeImport = true;

  // Constructor
  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private constantes: ConstService
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      mois: [null, [Validators.required, Validators.minLength(2)]],
      annee: [null, [Validators.required, Validators.minLength(4)]],
      fichier: null
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get("fichier").setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append("fichier", this.form.get("fichier").value);
    return input;
  }

  onSubmit() {
    if (this.fileInput) {
      const formModel = this.prepareSave();

      this.loading = true;

      this.httpService
      .importSaisie(this.monthSelected, this.yearSelected, formModel)
      .subscribe(ok => {
        this.loading = false;
        this.modeImport = false;
      }, ko => {
        this.loading = false;
        });
    }
  }

  clearFile() {
    this.form.get("fichier").setValue(null);
    this.fileInput.nativeElement.value = "";
  }

  reset() {
    this.monthSelected = null;
    this.resultat = null;
    this.loading = false;
    this.clearFile();
  }
}
