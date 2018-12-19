import { ImportSaisieComponent } from './modules/saisie.module/import-saisie.component/import-saisie.component';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './components/home.component/home.component';
import { SyntheseComponent } from './components/synthese.component/synthese.component';
import { SaisieComponent } from './modules/saisie.module/saisie.component';
import { NouvelleSaisieComponent } from './modules/saisie.module/nouvelle-saisie.component/nouvelle-saisie.component';
import { GestionSaisieComponent } from './modules/saisie.module/gestion-saisie.component/gestion-saisie.component';
import { HistoriqueComponent } from './components/historique.component/historique.component';
import { ParametrageComponent } from './components/parametrage.component.ts/parametrage.component';
import { LoginComponent } from './components/authentication.component/login.component';
import { PageNotFoundComponent } from './components/page-not-found.component/page-not-found.component';

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
        path: 'import',
        component: ImportSaisieComponent
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
