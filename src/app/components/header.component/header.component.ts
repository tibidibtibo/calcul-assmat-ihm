import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/finally';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { ServerAlive } from '../../models/serverAlive';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(private authService: AuthService, private httpService: HttpService, private router: Router) {
    this.isBackAlive();
    this.launchAliveIntervalCheck();
  }

  isCollapsed: boolean = true;
  serverConnected: boolean = false;

  authenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }

  isBackAlive(): void {
    this.httpService.isBackAlive().subscribe((ok: ServerAlive) => {
      if(ok && ok.alive) {
        this.serverConnected = ok.alive;
      }
    }, error => {
      this.serverConnected = false;
      console.log(error);
    });
  }

  launchAliveIntervalCheck() {
    Observable.interval(10000).subscribe(x => {
      this.isBackAlive();
    });
  }
}
