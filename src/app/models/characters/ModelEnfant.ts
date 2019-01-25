import { ModelHorairesEcole } from "../parametrage/ModelHorairesEcole";
import { ModelEmployeInfo } from "../parametrage/ModelEmployeInfo";

export class ModelEnfant {
  public id: string;
  public nom: string;
  public typeGarde: string;
  public horairesEcole: Array<ModelHorairesEcole>;
  public employes: Array<ModelEmployeInfo>;
}
