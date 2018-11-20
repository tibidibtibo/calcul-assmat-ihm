import { Component } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

import { HttpService } from './../services/http.service';

@Component({
  selector: "saisie",
  templateUrl: "./saisie.component.html",
  styleUrls: ["./saisie.component.css"]
})
export class SaisieComponent {

  public enfants = [];
  public model: any = {};
  public inputNbDejeuner = this.getNumArray(2);
  public inputNbGouters = this.getNumArray(2);
  public inputNbAREcole = this.getNumArray(4);
  public dateSaisie = new Date();

  constructor(private httpService: HttpService) {
    this.httpService.getAllEnfants().subscribe(
      (data: any) => {
        if (data && data.length > 0) {

          data.forEach(enfant => {
            this.model[enfant.id] = {
              saisie: false,
              heureArrivee: this.initTime(7, 45),
              heureDepart: this.initTime(17, 0)
            };
          });

          this.enfants = data;
        }
      }
    );
  }

  public onSubmit() {
    console.log(this.model)
  }

  public getNumArray(size: number) {
    return Array.from(new Array(size), (val, index) => index);
  }

  public initTime(hours, minutes) {
    var date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
  }

  public toggleEnfant(enfant) {
    console.log(enfant);
  }
}
