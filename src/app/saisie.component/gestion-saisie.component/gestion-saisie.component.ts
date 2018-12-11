import { Component } from "@angular/core";

import { HttpService } from './../../services/http.service';

@Component({
  selector: "gestion-saisie",
  templateUrl: "./gestion-saisie.component.html",
  styleUrls: ["./gestion-saisie.component.css"]
})
export class GestionSaisieComponent {

  constructor(private httpService: HttpService) {
    // TODO : appel service recherche par mois/année
  }

}
