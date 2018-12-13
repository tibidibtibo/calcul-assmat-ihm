import { Component, Input, SimpleChange, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "synthese-resultat",
  templateUrl: "./syntheseResultat.component.html",
  styleUrls: ["./syntheseResultat.component.css"]
})
export class SyntheseResultatComponent {

  @Input() resultat: Object;

  @Output()
  resultatEvent = new EventEmitter<Object>();

  constructor() {
  }

  reset() {
    this.resultatEvent.emit(null);
  }
}
