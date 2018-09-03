import { Component } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from "rxjs";

const URL = 'http://localhost:3000/calcul/';

const MONTHS = [
  {
    "code": "01",
    "libelle": "Janvier"
  },
  {
    "code": "02",
    "libelle": "Février"
  },
  {
    "code": "03",
    "libelle": "Mars"
  },
  {
    "code": "04",
    "libelle": "Avril"
  },
  {
    "code": "05",
    "libelle": "Mai"
  },
  {
    "code": "06",
    "libelle": "Juin"
  },
  {
    "code": "07",
    "libelle": "Juillet"
  },
  {
    "code": "08",
    "libelle": "Août"
  },
  {
    "code": "09",
    "libelle": "Septembre"
  },
  {
    "code": "10",
    "libelle": "Octobre"
  },
  {
    "code": "11",
    "libelle": "Novembre"
  },
  {
    "code": "12",
    "libelle": "Décembre"
  }
];

@Component({
  selector: 'excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.css']
})

export class ExcelUploadComponent {

  public uploadResponse: String = "";
  public monthsList: Array<Object> = MONTHS;
  public
  constructor(private http: HttpClient) { }

  fileChange(event, monthSelected): void {


    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file = fileList[0];
      console.log("Envoi du fichier : " + file.name + " - Mois sélectionné : " + monthSelected);

      const formData = new FormData();
      formData.append('file', file, file.name);

      this.http.post(URL + monthSelected, formData, {})
        .toPromise()
        .then(res => {
          console.log(res);
          this.uploadResponse = res.toString();
        });
    }
  }
}
