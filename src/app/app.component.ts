import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from './services/http.service';
import { AuthService } from './services/auth.service';

import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private authService: AuthService, private router: Router) {
  }

  logout(): void {
    this.authService.logout( () => {
      this.router.navigateByUrl('/login');
    })
  }

}
