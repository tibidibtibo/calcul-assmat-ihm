import { Component, TemplateRef, Input, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { ConstService } from './../../../../services/const.service';
import { HttpService } from './../../../../services/http.service';
import { Enfant } from './../../../../models/enfant';

@Component({
  selector: "parametrage-enfant",
  templateUrl: "./parametrage-enfant.component.html",
  styleUrls: ["../gestion-parametrage.component.css"]
})
export class ParametrageEnfantComponent implements OnInit {

  // Inputs
  private _asyncEnfantsInputs = new BehaviorSubject<any>([]);
  @Input() set refEnfants(value) {
    this._asyncEnfantsInputs.next(value);
  }
  get refEnfants() {
    return this._asyncEnfantsInputs.getValue();
  }

  // Class attributs
  public enfants;
  public employes;
  public typesGarde;
  public modelEnfant = {};
  public modalRef: BsModalRef;
  public toDelete;
  public mapJours = this.constantes.MAP_JOURS;
  public employeSelected = {};
  public modelLoaded: boolean = false;
  public TYPE_PERISCOLAIRE;
  public TYPE_TEMPS_PLEIN;

  // Constructor
  constructor(
    public httpService: HttpService,
    private modalService: BsModalService,
    private constantes: ConstService
  ) { }

  // Init
  ngOnInit() {
    this._asyncEnfantsInputs.subscribe(data => {
      this.enfants = data[0];
      this.employes = data[1];
      this.typesGarde = data[2];
      this.initModelEnfants(this.enfants);
      this.TYPE_PERISCOLAIRE = this.constantes.findByCode(this.typesGarde, "PERISCOLAIRE");
      this.TYPE_TEMPS_PLEIN = this.constantes.findByCode(this.typesGarde, "TEMPS_PLEIN");
    });

  }

  // Private methods
  private initModelEnfants(enfants) {
    enfants.forEach(enfant => {
      this.modelEnfant[enfant.id] = Enfant.fork(enfant);
      this.modelEnfant[enfant.id].mapEmployes = this.initEmployeInfoModel(enfant);
      this.modelEnfant[enfant.id].mapHorairesEcole = this.initHorairesEcoleModelFromRef(enfant);
      this.modelLoaded = true;
    });
  }

  private initEmployeInfoModel(enfant) {
    var mapEmployes = {};
    if (enfant.employes && enfant.employes.length > 0) {
      enfant.employes.forEach(employe => {
        mapEmployes[employe.paramEmploye.id] = {
          arEcoleKm: employe.arEcoleKm,
          heuresNormales: employe.heuresNormales,
          mapHeuresNormales: this.initHeuresNormales(employe.heuresNormales),
          heuresNormalesMensualisees: employe.heuresNormalesMensualisees,
          salaireNetMensualise: employe.salaireNetMensualise
        }
      });
    }
    return mapEmployes;
  }

  private openDeleteModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private deleteEnfantService(enfantId, httpService) {
    return httpService.deleteParamEnfant(enfantId);
  }

  // Public methods
  public reinitEnfants() {
    this.initModelEnfants(this.enfants);
  }

  public initHeuresNormales(heuresNormales) {
    var mapHeuresNormales = {};
    if (heuresNormales && heuresNormales.length > 0) {
      heuresNormales.forEach(heureNormale => {
        mapHeuresNormales[heureNormale.jour] = {
          heures: heureNormale.heures
        }
      });
    }
    return mapHeuresNormales;
  }

  public initHorairesEcoleModelFromRef(enfant) {
    var mapHoraires = {};
    if (enfant.horairesEcole && enfant.horairesEcole.length > 0) {
      enfant.horairesEcole.forEach(horaire => {
        mapHoraires[horaire.jour] = {
          am: horaire.horairesJournaliersEcole.am,
          dm: horaire.horairesJournaliersEcole.dm,
          aa: horaire.horairesJournaliersEcole.aa,
          da: horaire.horairesJournaliersEcole.da
        }
      });
    }
    return mapHoraires;
  }


  public saveEnfant(enfantId) {
    // TODO TDU
    console.log(this.modelEnfant[enfantId]);
    this.httpService.updateParamEnfant(enfantId, this.modelEnfant[enfantId]).subscribe(ok => {
      console.log(ok);
    }, ko => {
      console.log(ko);
    })
  }

  public okModalSave() {
    this.modalRef.hide();
  }
  public deleteEnfant(enfantId, template: TemplateRef<any>) {
    this.toDelete = {
      id: enfantId,
      name: this.modelEnfant[enfantId].nom,
      deleteFunction: this.deleteEnfantService,
      deleteEnCours: false
    };
    this.openDeleteModal(template);
  }

  public confirmDeletion(deleteFunction, paramId) {
    this.toDelete.deleteEnCours = true;
    deleteFunction(paramId, this.httpService).subscribe(
      ok => {
        // this.loadData();
        this.toDelete.deleteEnCours = false;
        this.modalRef.hide();
      }, ko => {
        this.toDelete.deleteEnCours = false;
      }
    );
  }

  public declineDeletion() {
    this.modalRef.hide();
  }

  public onChangeTypeGarde(enfantId) {
    if (this.modelEnfant[enfantId].typeGarde === this.TYPE_PERISCOLAIRE.code) {
      this.modelEnfant[enfantId].horairesEcole = this.initVoidHorairesEcole();
      this.modelEnfant[enfantId].mapHorairesEcole = this.initHorairesEcoleModel();
    } else if (this.modelEnfant[enfantId].typeGarde === this.TYPE_TEMPS_PLEIN.code) {
      this.modelEnfant[enfantId].horairesEcole = null;
      this.modelEnfant[enfantId].mapHorairesEcole = null;
    }
  }

  public initHorairesEcoleModel() {
    var mapHoraires = {};
    Object.keys(this.constantes.MAP_JOURS).forEach(jour => {
      mapHoraires[jour] = {
        am: "",
        dm: "",
        aa: "",
        da: ""
      };
    });
    return mapHoraires;
  }

  public initVoidHorairesEcole() {
    var horaires = [];
    Object.keys(this.constantes.MAP_JOURS).forEach(jour => {
      horaires.push({
        jour: jour,
        horairesJournaliersEcole: {
          am: "",
          dm: "",
          aa: "",
          da: ""
        }
      });
    });
    return horaires;
  }

  public findEnfant(id, liste) {
    if (liste && liste.length > 0) {
      var found = liste.filter(enfant => {
        return enfant.id === id
      });
      return (found && found.length > 0) ? found[0] : null;
    }
    return null;
  }

  public addSelectedEmploye(enfantId, employeSelected) {
    // TODO
    console.log(enfantId + " / " + employeSelected);
  }

  public removeEmployeFromParam(enfantId, employeToRemove) {
    // TODO
    console.log(employeToRemove);
  }
}
