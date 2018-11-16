import { Component } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

import { HttpService } from './../services/http.service';

@Component({
  selector: "saisie",
  templateUrl: "./saisie.component.html",
  styleUrls: ["./saisie.component.css"]
})
export class SaisieComponent {

  public saisieForm: FormGroup;
  public enfants = [];
  public model: any = {};
  public inputNbDejeuner = this.getNumArray(2);
  public inputNbGouters = this.getNumArray(2);
  public inputNbAREcole = this.getNumArray(4);
  public currentDate = new Date();

  constructor(private httpService: HttpService, private fb: FormBuilder) {
    this.httpService.getAllEnfants().subscribe(
      (data: any) => {
        if (data && data.length > 0) {

          data.forEach(enfant => {
            this.model[enfant.id] = {};
          });

          this.enfants = data;
          this.createForm(data);
        }
      }
    );
  }

  createForm(enfants: any) {
    var group = {};
    enfants.forEach(enfant => {

      var saisieControl = this.fb.control({ value: null });
      var heureArriveeControl = this.fb.control(this.initVoidInput(), [Validators.required]);
      var heureDepartControl = this.fb.control(this.initVoidInput(), [Validators.required]);
      var nbDejControl = this.fb.control(this.initVoidInput(), [Validators.required]);
      var nbGouterControl = this.fb.control(this.initVoidInput(), [Validators.required]);
      var nbArControl = this.fb.control(this.initVoidInput(), [Validators.required]);

      group['saisie_' + enfant.id] = saisieControl;
      group['heurearrivee_' + enfant.id] = heureArriveeControl;
      group['heuredepart_' + enfant.id] = heureDepartControl;
      group['nbDejeuner_' + enfant.id] = nbDejControl;
      group['nbGouter_' + enfant.id] = nbGouterControl;
      group['nbArEcole_' + enfant.id] = nbArControl;
      // group['submit'] = [] // TODO disable submit

      saisieControl.statusChanges.subscribe(
        () => {
          if(!saisieControl.value) {
            heureArriveeControl.disable();
            heureDepartControl.disable();
            nbDejControl.disable();
            nbGouterControl.disable();
            nbArControl.disable();
          } else {
            heureArriveeControl.enable();
            heureDepartControl.enable();
            nbDejControl.enable();
            nbGouterControl.enable();
            nbArControl.enable();
          }
        }
      );
    });

    this.saisieForm = this.fb.group(group);
  }

  private initVoidInput() {
    return { value: null, disabled: true };
  }

  public onSubmit() {
    console.log(this.model)
  }

  public getNumArray(size: number) {
    return Array.from(new Array(size), (val, index) => index);
  }
}
