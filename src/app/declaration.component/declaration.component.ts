import { AppService } from "./../app.service";
import { Component, ViewChild } from "@angular/core";

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

const MONTHS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12"
];

@Component({
  selector: "declaration",
  templateUrl: "./declaration.component.html",
  styleUrls: ["./declaration.component.css"]
})
export class DeclarationComponent {
  public uploadResponse: String = "";
  public monthsList: Array<Object> = MONTHS;

  @ViewChild("file")
  fileToUpload;

  monthSelected: string = "";

  constructor(private app: AppService, private http: HttpClient) {}

  authenticated() {
    return this.app.authenticated;
  }

  fileChange(): void {
    console.log(
      "Envoi du fichier : " + this.fileToUpload.name + " - Mois sélectionné : " + this.monthSelected
    );

    let headers = new HttpHeaders()
      .set("Accept", "application/json")
      .set("Access-Control-Allow-Origin", "*")
      .set("Authorization", this.app.getBAHeader());
    let params = new HttpParams();

    console.log(this.fileToUpload);
    const formData = new FormData();
    formData.append("file", this.fileToUpload, this.fileToUpload.name);

    console.log(formData);

    const URL =
      this.app.url + "/calcul/file/2018/" + this.monthSelected + "/maternelle/";

    this.http
      .post(URL, formData, { headers: headers, params: params })
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }
}
