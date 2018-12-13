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
    httpService.findSaisieMonth(this.monthSelected, this.yearSelected)
    .subscribe( data => {
      console.log(data)
      this.donneesSaisies = data;
    })
  }

  public monthSelected = ((new Date()).getMonth() + 1).toString().padStart(2, "0");
  public yearSelected = (new Date()).getFullYear();
  public donneesSaisies = null;
}
