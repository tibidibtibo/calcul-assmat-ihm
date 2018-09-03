import { Component, OnInit } from '@angular/core';

import { FileUploader, FileSelectDirective  } from 'ng2-file-upload';

const URL = 'http://localhost:3000/calcul/08';

@Component({
  selector: 'excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.css']
})

export class ExcelUploadComponent implements OnInit {

  public uploader:FileUploader = new FileUploader({url: URL});

  uploadResponse: string = "";

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         this.uploadResponse = response;
         console.log(this.uploadResponse);
         alert("!")
     };
 }
}
