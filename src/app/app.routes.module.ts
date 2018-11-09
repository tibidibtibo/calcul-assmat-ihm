import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component/home.component';
import { PageNotFoundComponent } from './page-not-found.component/page-not-found.component';
import { LoginComponent } from './authentication.component/login.component';
import { SyntheseComponent } from './synthese.component/synthese.component';
import { SaisieComponent } from './saisie.component/saisie.component';
import { HistoriqueComponent } from './historique/historique.component';
import { ParametrageComponent } from './parametrage.component.ts/parametrage.component';

import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'synthese', component: SyntheseComponent, canActivate: [AuthGuardService] },
  { path: 'saisie', component: SaisieComponent, canActivate: [AuthGuardService] },
  { path: 'historique', component: HistoriqueComponent, canActivate: [AuthGuardService] },
  { path: 'parametrage', component: ParametrageComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

export let AppRoutesModule = RouterModule.forRoot(routes);
