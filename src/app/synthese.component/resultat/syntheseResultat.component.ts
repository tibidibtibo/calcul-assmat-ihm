import { Component, Input, SimpleChange } from "@angular/core";

@Component({
  selector: "synthese-resultat",
  templateUrl: "./syntheseResultat.component.html",
  styleUrls: ["./syntheseResultat.component.css"]
})
export class SyntheseResultatComponent {

  @Input() resultat: Object;

  constructor() {
  }

  reset() {
    this.resultat = null;
  }
}
