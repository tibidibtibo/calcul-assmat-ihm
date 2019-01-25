import { ModelEmployeInfo } from './ModelEmployeInfo';
import { HorairesJournaliersEcole } from './HorairesJournaliersEcole';
import { ModelHorairesEcole } from './ModelHorairesEcole';
import { ModelParamEmploye } from './ModelParamEmploye';

export class ModelParamEnfant {

  arEcoleKm: number;
  heuresNormalesMensualisees: number;
  id: string;
  nom: string;
  salaireNetMensualise: number;
  typeGarde: string;

  mapHorairesEcole: Map<number, HorairesJournaliersEcole>;
  horairesEcole: Array<ModelHorairesEcole>;

  mapEmployes: Map<string, ModelParamEmploye>;
  employes: Array<ModelEmployeInfo>;
}

