import { SaisieComponent } from './saisie.module/saisie.component';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component/home.component';
import { PageNotFoundComponent } from './page-not-found.component/page-not-found.component';
import { LoginComponent } from './authentication.component/login.component';
import { SyntheseComponent } from './synthese.component/synthese.component';
import { HistoriqueComponent } from './historique.component/historique.component';
import { ParametrageComponent } from './parametrage.component.ts/parametrage.component';

import { AuthGuardService } from './services/auth-guard.service';
import { NouvelleSaisieComponent } from './saisie.module/nouvelle-saisie.component/nouvelle-saisie.component';
import { GestionSaisieComponent } from './saisie.module/gestion-saisie.component/gestion-saisie.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'synthese', component: SyntheseComponent, canActivate: [AuthGuardService] },
  {
    path: 'saisie',
    component: SaisieComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'nouvelle',
        component: NouvelleSaisieComponent
      },
      {
        path: 'gestion',
        component: GestionSaisieComponent
      }
    ]
  },
  { path: 'historique', component: HistoriqueComponent, canActivate: [AuthGuardService] },
  { path: 'parametrage', component: ParametrageComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

export let AppRoutesModule = RouterModule.forRoot(routes);
