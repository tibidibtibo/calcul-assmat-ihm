import { Component, Input } from "@angular/core";

@Component({
  selector: "synthese-error",
  templateUrl: "./syntheseError.component.html",
  styleUrls: ["./syntheseError.component.css"]
})
export class SyntheseErrorComponent {

  @Input() error: Object;

  constructor() {
  }
}
