import { HttpService } from './../services/http.service';
import { Component } from "@angular/core";

@Component({
  selector: "historique",
  templateUrl: "./historique.component.html",
  styleUrls: ["./historique.component.css"]
})
export class HistoriqueComponent {

  data: Array<Object> = [];

  constructor(httpService: HttpService) {
    httpService.getHistorique().subscribe(
      (data: Array<Object>) => {
        this.data = data;
        console.log(data)
      }, error => {
        console.log(error)
      }
    );
  }

}
