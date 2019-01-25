import { HeureNormale } from './HeureNormale';
import { ModelEmploye } from '../characters/ModelEmploye';
import { ModelParamEmployeEnfant } from './ModelParamEmployeEnfant';

export class ModelEmployeInfo {
  public heuresNormales: Array<HeureNormale>;
  public arEcoleKm: number;
  public heuresNormalesMensualisees: number;
  public salaireNetMensualise: number;
  public paramEmploye: ModelEmploye;

  constructor() {

  }

  public static buildMapEmployesInfo(employes: Array<ModelEmployeInfo>): Object {
    var mapEmployes: Object = {};
    if(employes && employes.length > 0) {
      employes.forEach(employe => {
        mapEmployes[employe.paramEmploye.id] = new ModelParamEmployeEnfant(employe);
      });
    }
    return mapEmployes;
  }
}
