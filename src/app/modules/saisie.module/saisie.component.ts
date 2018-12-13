import { Component } from "@angular/core";
import { HttpService } from "../../services/http.service";

@Component({
  selector: "saisie",
  templateUrl: "./saisie.component.html",
  styleUrls: ["./saisie.component.css"]
})
export class SaisieComponent {

  constructor(private httpService: HttpService) {

  }

}
