import { Component } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

import { HttpService } from './../services/http.service';
import { AuthService } from './../services/auth.service';

@Component({
  selector: "saisie",
  templateUrl: "./saisie.component.html"
  // styleUrls: ["./saisie.component.css"]
})
export class SaisieComponent {

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  public form: FormGroup;

  createForm() {
    this.form = this.fb.group({
      nom: ['', Validators.required]
    });
  }
}
