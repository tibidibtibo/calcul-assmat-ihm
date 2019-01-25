import { ModelEmployeInfo } from './ModelEmployeInfo';
import { HorairesJournaliersEcole } from './HorairesJournaliersEcole';
import { ModelHorairesEcole } from './ModelHorairesEcole';
import { ModelParamEmployeEnfant } from './ModelParamEmployeEnfant';
import { ModelEnfant } from '../characters/ModelEnfant';

export class ModelParamEnfant {

  // attributs
  id: string;
  nom: string;
  typeGarde: string;
  mapHorairesEcole: Object;
  horairesEcole: Array<ModelHorairesEcole>;
  mapEmployes: Object;
  employes: Array<ModelEmployeInfo>;

  // Constructor
  constructor(enfant: ModelEnfant) {
    this.id = enfant.id;
    this.nom = enfant.nom;
    this.typeGarde = enfant.typeGarde;
    this.horairesEcole = enfant.horairesEcole;
    this.mapHorairesEcole = ModelHorairesEcole.buildMapHorairesEcole(enfant.horairesEcole);
    this.employes = enfant.employes;
    this.mapEmployes = ModelEmployeInfo.buildMapEmployesInfo(enfant.employes);
  }

  public static buildMapParamEnfants(enfants: Array<ModelEnfant>) {
    var mapParamEnfant = {};
    enfants.forEach(enfant => {
      var modelParamEnfant: ModelParamEnfant = new ModelParamEnfant(enfant);
      mapParamEnfant[enfant.id] = modelParamEnfant;
    });
    return mapParamEnfant;
  }

  public resetHorairesEcole(jours: Object) {
      this.horairesEcole = this.initVoidHorairesEcole(jours);
      this.mapHorairesEcole = this.initHorairesEcoleModel(jours);
  }

  public removeHorairesEcole() {
      this.horairesEcole = null;
      this.mapHorairesEcole = null;
  }

  public initHorairesEcoleModel(jours: Object) {
    var mapHoraires = {};
    Object.keys(jours).forEach(jour => {
      mapHoraires[jour] = new HorairesJournaliersEcole();
    });
    return mapHoraires;
  }

  public initVoidHorairesEcole(jours: Object) {
    var horaires = [];
    Object.keys(jours).forEach(jour => {
      horaires.push(new ModelHorairesEcole(Number(jour), new HorairesJournaliersEcole()));
    });
    return horaires;
  }


}

