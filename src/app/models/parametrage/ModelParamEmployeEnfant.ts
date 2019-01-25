import { HeureNormale } from "./HeureNormale";
import { HeureNormaleSimple } from "./HeureNormaleSimple";
import { ModelEmployeInfo } from "./ModelEmployeInfo";

export class ModelParamEmployeEnfant {
  public arEcoleKm: number;
  public heuresNormalesMensualisees: number;
  public salaireNetMensualise: number;
  public heuresNormales: Array<HeureNormale>;
  public mapHeuresNormales: Object;

  constructor(employe: ModelEmployeInfo) {
    this.arEcoleKm = employe.arEcoleKm;
    this.heuresNormalesMensualisees = employe.heuresNormalesMensualisees;
    this.salaireNetMensualise = employe.salaireNetMensualise;
    this.heuresNormales = employe.heuresNormales;
    this.mapHeuresNormales = HeureNormaleSimple.buildMapHeuresNormales(employe.heuresNormales);
  }
}
