import { Component } from "@angular/core";
import { HttpService } from "../../services/http.service";

@Component({
  selector: "synthese",
  templateUrl: "./synthese.component.html"
})
export class SyntheseComponent {

  constructor(private httpService: HttpService) {
  }

}
