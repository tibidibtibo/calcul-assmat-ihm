import { Component } from "@angular/core";

@Component({
  selector: "synthese",
  templateUrl: "./synthese.component.html",
  styleUrls: ["./synthese.component.css"]
})
export class SyntheseComponent {

  constructor() {
  }

  public resultat: Object;
  public error: Object;

  onChangeResultat(newResultat: Object) {
    this.resultat = newResultat;
  }

  onChangeError(newError: Object) {
    this.error = newError;
  }
}
