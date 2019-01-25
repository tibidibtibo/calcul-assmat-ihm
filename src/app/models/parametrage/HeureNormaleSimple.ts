import { HeureNormale } from "./HeureNormale";

export class HeureNormaleSimple {

  heures: number;

  constructor(heures: number) {
    this.heures = heures;
  }

  public static buildMapHeuresNormales(heuresNormales: Array<HeureNormale>): Object {
    var mapHeuresNormales: Object = {};
    if (heuresNormales && heuresNormales.length > 0) {
      heuresNormales.forEach(heure => {
        mapHeuresNormales[heure.jour] = new HeureNormaleSimple(heure.heures);
      })
    }
    return mapHeuresNormales;
  }
}
