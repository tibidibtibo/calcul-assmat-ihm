import { Component } from '@angular/core';
import { AppService } from './../app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
  }

  authenticated() {
    return this.app.authenticated;
  }

  logout() {
    this.app.logout( () => {
      this.router.navigateByUrl('/login');
    });
  }
}
