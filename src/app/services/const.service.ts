import { Injectable } from "@angular/core";

@Injectable()
export class ConstService {

  public serverUrl: string = "http://localhost:7777";

  public MONTHS_LIST: Array<string> = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ];

  /**
   * Retourne le mois et l'année à M-1
   */
  public getPreviousMonth() {
    var now = new Date();
    now.setMonth(now.getMonth()-1);
    return this.getMonthYearAsString(now);
  }

  /**
   * Retourne un tableau contenant le mois (avec le padding de 0) et l'année.
   * Exemple : [02, 2019]
   * @param date
   */
  public getMonthYearAsString(date) {
    return [(date.getMonth() + 1).toString().padStart(2, "0"), date.getFullYear()];
  }

}
