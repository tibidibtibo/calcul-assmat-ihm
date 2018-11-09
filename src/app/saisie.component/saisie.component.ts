import { Component } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

import { HttpService } from './../services/http.service';

@Component({
  selector: "saisie",
  templateUrl: "./saisie.component.html",
  styleUrls: ["./saisie.component.css"]
})
export class SaisieComponent {

  enfants = [];
  model: any = {};

  constructor(private httpService: HttpService) {
    this.httpService.getAllEnfants().subscribe(
      (data: any) => {
        this.enfants = data;
        console.log(data)
      }
    );
  }

  onSubmit() {
    console.log(this.model)
  }
}
