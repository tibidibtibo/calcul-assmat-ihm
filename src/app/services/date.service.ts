import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  public initTime(hours, minutes) {
    var date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
  }

  public toTime(strTime) {
    if(strTime) {
      var splitted = strTime.split(":");
      if(splitted && splitted.length === 2) {
        return this.initTime(splitted[0], splitted[1]);
      }
    }
    return null;
  }
}
