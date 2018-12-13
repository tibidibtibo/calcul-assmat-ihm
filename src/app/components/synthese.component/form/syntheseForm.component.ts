import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { HttpService } from "../../../services/http.service";
import { ConstService } from "../../../services/const.service";


@Component({
  selector: "synthese-form",
  templateUrl: "./syntheseForm.component.html"
  // styleUrls: ["./syntheseForm.component.css"]
})
export class SyntheseFormComponent {

  @Input() resultat: Object;

  @Output()
  resultatEvent = new EventEmitter<Object>();
  @Output()
  errorEvent = new EventEmitter<Object>();

  @ViewChild("fileInput")
  fileInput: ElementRef;
  public form: FormGroup;
  public monthsList: Array<Object> = this.constantes.MONTHS_LIST;

  public loading: boolean = false;
  public monthSelected = ((new Date()).getMonth()).toString().padStart(2, "0");
  public yearSelected = (new Date()).getFullYear();

  constructor(private httpService: HttpService, private fb: FormBuilder, private constantes: ConstService) {
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

    if(this.fileInput) {

      const formModel = this.prepareSave();

      this.loading = true;

      this.httpService
      .calcul(this.monthSelected, this.yearSelected, formModel)
      .subscribe(
        (data: Object) => {
          console.log(data)
          this.resultatEvent.emit(data);
          this.errorEvent.emit(null);
          this.loading = false;
          this.resultat = data;
        },
        error => {
          this.resultatEvent.emit(null);
          this.errorEvent.emit(error);
          this.loading = false;
          this.resultat = null;
        }
        );
      }
  }

  clearFile() {
    this.form.get("fichier").setValue(null);
    this.fileInput.nativeElement.value = "";
  }

  reset() {
    this.monthSelected = null;
    this.resultat = null;
    this.resultatEvent.emit(null);
    this.errorEvent.emit(null);
    this.loading = false;
    this.clearFile();
  }
}
