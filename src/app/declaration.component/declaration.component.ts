import { AppService } from './../app.service';
import { Component } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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
  selector: 'declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.css']
})

export class DeclarationComponent {

  public uploadResponse: String = "";
  public monthsList: Array<Object> = MONTHS;

  fileToUpload: File = null;

  constructor(private app: AppService, private http: HttpClient) {
    http.get('http://localhost:7777/calcul/file/2018/09/maternelle/').subscribe(data => console.log(data));
   }

  authenticated() {
    return this.app.authenticated;
  }

  fileChange(event, monthSelected): void {

    const fileList: FileList = event.target.files;


    if (fileList.length > 0) {
      this.fileToUpload = fileList[0];
      console.log("Envoi du fichier : " + this.fileToUpload.name + " - Mois sélectionné : " + monthSelected);

      var headers = new HttpHeaders()
        .set('Content-Type', 'multipart/form-data')
        .set('Accept', 'multipart/form-data')
        .set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Auth-Token')
        .set('Authorization', 'Basic ' + btoa('assmat:assmat'));
        // .set('Access-Control-Allow-Origin', '*')
        // .set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
      let params = new HttpParams();

      console.log(this.fileToUpload);
      const formData = new FormData();
      formData.append('file', this.fileToUpload, this.fileToUpload.name);

      console.log(formData);

      const URL = 'http://localhost:7777/calcul/file/2018/' + monthSelected + '/maternelle/';

      this.http.post(URL, formData, { params, headers, withCredentials: true })
        .subscribe(data => {
          console.log(data);
        });
        // .toPromise()
        // .then(res => {
        //   console.log(res);
        //   this.uploadResponse = res.toString();
        // });
    }
  }

}
