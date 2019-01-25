import { HorairesJournaliersEcole } from './HorairesJournaliersEcole';

export class ModelHorairesEcole {

  public jour: number;
  public horairesJournaliersEcole: HorairesJournaliersEcole;

  constructor(jour: number, horaires: HorairesJournaliersEcole) {
    this.jour = jour;
    this.horairesJournaliersEcole = horaires;
  }

  public static buildMapHorairesEcole(horairesEcole: Array<ModelHorairesEcole>): Object {

    var mapHoraires: Object = {};
    if(horairesEcole && horairesEcole.length > 0) {
      horairesEcole.forEach(horaire => {
        mapHoraires[horaire.jour] = horaire.horairesJournaliersEcole;
      })
    }
    return mapHoraires;

  }
}
