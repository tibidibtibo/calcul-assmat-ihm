import { Component } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const URL = 'http://localhost:7777/api/calcul/2018/09/maternelle';

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

  fileToUpload: File = null;

  constructor(private http: HttpClient) { }

  fileChange(event, monthSelected): void {

    const fileList: FileList = event.target.files;


    if (fileList.length > 0) {
      this.fileToUpload = fileList[0];
      console.log("Envoi du fichier : " + this.fileToUpload.name + " - Mois sélectionné : " + monthSelected);

      let headers = new HttpHeaders();
      headers.set('Content-Type', null);
      headers.set('Accept', "multipart/form-data");

      let params = new HttpParams();

      console.log(this.fileToUpload);
      const formData = new FormData();
      formData.append('file', this.fileToUpload, this.fileToUpload.name);

      console.log(formData);

      this.http.post(URL + monthSelected, formData, { params, headers })
        .toPromise()
        .then(res => {
          console.log(res);
          this.uploadResponse = res.toString();
        });
    }
  }
}
