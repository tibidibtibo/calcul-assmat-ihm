import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from './http.service';
import { AppService } from './app.service';

import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private httpService: HttpService, private appService: AppService, private router: Router) {
    this.isBackAlive();
  }

  logout(): void {
    this.appService.logout( () => {
      this.router.navigateByUrl('/login');
    })
  }

  isBackAlive(): void {
    this.httpService.isBackAlive().subscribe(ok => {
      console.log(ok);
    }, error => {
      console.log(error);
    });
  }

}
