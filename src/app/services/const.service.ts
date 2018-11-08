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

}
