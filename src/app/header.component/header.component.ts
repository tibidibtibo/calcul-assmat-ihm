import { Component } from '@angular/core';
import { AppService } from './../app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
  // styleUrls: ['./app.component.css']
})

export class HeaderComponent {

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
    this.app.authenticate(undefined, undefined);
  }

  logout() {
    this.app.logout( () => {
      this.router.navigateByUrl('/login');
    });
  }
}
